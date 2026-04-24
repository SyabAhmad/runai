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
  const lowerInput = input.toLowerCase();
  for (const rule of rules) {
    if (rule.startsWith('must_include:')) {
      const keyword = rule.split(':')[1].toLowerCase();
      if (!lowerInput.includes(keyword)) {
        return { success: false, message: `Missing required keyword: ${keyword}` };
      }
    }
  }
  return { success: true, message: 'SQL query is valid!' };
}

function evaluateCommandRules(input, rules) {
  const lowerInput = input.toLowerCase();
  for (const rule of rules) {
    if (rule.startsWith('must_include:')) {
      const keyword = rule.split(':')[1].toLowerCase();
      if (!lowerInput.includes(keyword)) {
        return { success: false, message: `Missing required flag: ${keyword}` };
      }
    }
  }
  return { success: true, message: 'Command is valid!' };
}

function evaluateAiCodeRules(input, rules, tests) {
  const lowerInput = input.toLowerCase();
  for (const rule of rules) {
    if (rule.startsWith('must_include:')) {
      const keyword = rule.split(':')[1].toLowerCase();
      if (!lowerInput.includes(keyword)) {
        return { success: false, message: `Missing required keyword: ${keyword}` };
      }
    } else if (rule.startsWith('must_not_include:')) {
      const keyword = rule.split(':')[1].toLowerCase();
      if (lowerInput.includes(keyword)) {
        return { success: false, message: `Should not include: ${keyword}` };
      }
    }
  }
  return { success: true, message: 'Code is valid!' };
}
