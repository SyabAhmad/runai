/**
 * Evaluates mission submissions against validation rules
 */
export function evaluateMission(mission, userInput) {
  const { validation } = mission;
  if (!validation) return { success: false, message: 'No validation rules defined' };
  const content = normalizeInput(userInput);

  switch (validation.type) {
    case 'sql':
      return evaluateSqlRules(content, validation.rules);
    case 'command':
      return evaluateCommandRules(content, validation.rules);
    case 'ai_code':
      return evaluateAiCodeRules(content, validation.rules, validation.tests);
    default:
      return { success: false, message: `Unknown validation type: ${validation.type}` };
  }
}

function normalizeInput(input) {
  if (typeof input === 'string') return input;
  if (input && typeof input.content === 'string') return input.content;
  return '';
}

function evaluateSqlRules(input, rules) {
  const lowerInput = normalizeForRuleMatch(input);
  for (const rule of rules) {
    if (rule.startsWith('must_include:')) {
      const keyword = normalizeForRuleMatch(rule.slice('must_include:'.length));
      if (!lowerInput.includes(keyword)) {
        return { success: false, message: `Missing required keyword: ${keyword}` };
      }
    }
  }
  return { success: true, message: 'SQL query is valid!' };
}

function evaluateCommandRules(input, rules) {
  const lowerInput = normalizeForRuleMatch(input);
  for (const rule of rules) {
    if (rule.startsWith('must_include:')) {
      const keyword = normalizeForRuleMatch(rule.slice('must_include:'.length));
      if (!lowerInput.includes(keyword)) {
        return { success: false, message: `Missing required flag: ${keyword}` };
      }
    }
  }
  return { success: true, message: 'Command is valid!' };
}

function evaluateAiCodeRules(input, rules, tests) {
  if (/\bTODO\b/i.test(input)) {
    return { success: false, message: 'Resolve all TODO items before submitting.' };
  }

  const executableInput = stripPythonComments(input);
  const lowerInput = normalizeForRuleMatch(executableInput);

  for (const rule of rules) {
    if (rule.startsWith('must_include:')) {
      const keyword = rule.slice('must_include:'.length).toLowerCase();
      if (!lowerInput.includes(normalizeForRuleMatch(keyword))) {
        return { success: false, message: `Missing required keyword: ${keyword}` };
      }
    } else if (rule.startsWith('must_not_include:')) {
      const keyword = rule.slice('must_not_include:'.length).toLowerCase();
      if (lowerInput.includes(normalizeForRuleMatch(keyword))) {
        return { success: false, message: `Should not include: ${keyword}` };
      }
    }
  }

  const testResult = runAiCodeTests(executableInput, tests);
  if (!testResult.success) return testResult;

  return { success: true, message: 'Code is valid!' };
}

function stripPythonComments(input) {
  return input
    .split(/\r?\n/)
    .map((line) => {
      const fullLineComment = /^\s*#/.test(line);
      if (fullLineComment) return '';

      // Remove trailing inline comments while keeping code before '#'.
      return line.replace(/\s+#.*$/, '');
    })
    .join('\n');
}

function normalizeForRuleMatch(value) {
  return String(value)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function runAiCodeTests(input, tests = []) {
  if (!Array.isArray(tests) || tests.length === 0) {
    return { success: true };
  }

  const nonEmptyLines = input.split(/\r?\n/).filter((line) => line.trim().length > 0).length;

  for (const test of tests) {
    if (!test || typeof test !== 'object') continue;

    const message = test.message || `Failed test: ${test.name || test.type || 'unnamed'}`;

    switch (test.type) {
      case 'must_match': {
        if (typeof test.pattern !== 'string') {
          return { success: false, message: `Invalid test pattern: ${test.name || 'must_match'}` };
        }
        let regex;
        try {
          regex = new RegExp(test.pattern, test.flags || 'i');
        } catch {
          return { success: false, message: `Invalid regex in test: ${test.name || 'must_match'}` };
        }
        if (!regex.test(input)) return { success: false, message };
        break;
      }

      case 'must_not_match': {
        if (typeof test.pattern !== 'string') {
          return { success: false, message: `Invalid test pattern: ${test.name || 'must_not_match'}` };
        }
        let regex;
        try {
          regex = new RegExp(test.pattern, test.flags || 'i');
        } catch {
          return { success: false, message: `Invalid regex in test: ${test.name || 'must_not_match'}` };
        }
        if (regex.test(input)) return { success: false, message };
        break;
      }

      case 'must_include_all': {
        if (!Array.isArray(test.values)) {
          return { success: false, message: `Invalid values in test: ${test.name || 'must_include_all'}` };
        }
        const lowerInput = input.toLowerCase();
        const allFound = test.values.every((value) => lowerInput.includes(String(value).toLowerCase()));
        if (!allFound) return { success: false, message };
        break;
      }

      case 'must_include_any': {
        if (!Array.isArray(test.values)) {
          return { success: false, message: `Invalid values in test: ${test.name || 'must_include_any'}` };
        }
        const lowerInput = input.toLowerCase();
        const oneFound = test.values.some((value) => lowerInput.includes(String(value).toLowerCase()));
        if (!oneFound) return { success: false, message };
        break;
      }

      case 'min_non_empty_lines': {
        const min = Number(test.value || 0);
        if (nonEmptyLines < min) return { success: false, message };
        break;
      }

      default:
        break;
    }
  }

  return { success: true };
}
