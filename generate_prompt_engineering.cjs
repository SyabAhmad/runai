const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

const missionData = {
  prompt_engineering: {
    titles: [
      "Zero-Shot Prompts",
      "Few-Shot Prompts",
      "Chain of Thought",
      "System Prompts",
      "Prompt Templates",
      "Output Formatting",
      "Few-Shot Examples",
      "Prompt Optimization",
      "Prompt Chaining",
      "Error Handling Prompts",
    ],
    descriptions: [
      "Create zero-shot prompts that enable models to perform tasks without specific examples.",
      "Design few-shot prompts with examples to guide model behavior for specific tasks.",
      "Implement chain-of-thought prompting to break down complex reasoning into steps.",
      "Write effective system prompts that set the overall behavior and personality of the model.",
      "Build reusable prompt templates with placeholders for dynamic content insertion.",
      "Structure prompts to ensure outputs follow specific formatting requirements.",
      "Select and organize the most relevant examples for few-shot learning scenarios.",
      "Optimize prompts through iterative testing and refinement for better performance.",
      "Create multi-step prompt chains where each response feeds into the next prompt.",
      "Design prompts that handle errors gracefully and provide helpful recovery suggestions.",
    ],
    hints: [
      ["Zero-shot works without examples", "Be specific about the task", "Include clear instructions"],
      ["Provide 2-5 relevant examples", "Show input-output format clearly", "Examples should be diverse"],
      ["Break complex tasks into steps", "Use 'Let's think step by step'", "Show intermediate reasoning"],
      ["Define role and behavior", "Set constraints and guidelines", "Establish response style"],
      ["Use placeholders like {variable}", "Make templates reusable", "Include formatting instructions"],
      ["Specify output format explicitly", "Use examples to show format", "Include validation criteria"],
      ["Choose representative examples", "Balance simplicity and complexity", "Test example effectiveness"],
      ["Iterate based on outputs", "Compare different phrasings", "Measure performance metrics"],
      ["Each step builds on previous output", "Use clear handoff instructions", "Maintain context"],
      ["Anticipate common errors", "Provide recovery strategies", "Include fallback responses"],
    ],
    solutions: [
      `def create_zero_shot_prompt(task, context=""):
    """
    Create a zero-shot prompt for a specific task
    """
    prompt = f"""You are an expert assistant. {task}

Context: {context}

Please provide a detailed and accurate response."""

    return prompt

# Example usage
task = "Explain quantum computing to a 10-year-old"
prompt = create_zero_shot_prompt(task)
print(prompt)`,
      `def create_few_shot_prompt(examples, task_description, query):
    """
    Create a few-shot prompt with examples
    """
    prompt_parts = [f"Task: {task_description}\\n"]

    # Add examples
    for i, example in enumerate(examples, 1):
        prompt_parts.append(f"Example {i}:")
        prompt_parts.append(f"Input: {example['input']}")
        prompt_parts.append(f"Output: {example['output']}\\n")

    # Add query
    prompt_parts.append(f"Input: {query}")
    prompt_parts.append("Output:")

    return "\\n".join(prompt_parts)

# Example usage
examples = [
    {"input": "What is 2+2?", "output": "2+2 equals 4"},
    {"input": "What is 3+5?", "output": "3+5 equals 8"}
]
prompt = create_few_shot_prompt(examples, "Solve math problems", "What is 7+3?")
print(prompt)`,
      `def create_chain_of_thought_prompt(problem, steps=None):
    """
    Create a chain-of-thought prompting template
    """
    if steps is None:
        steps = ["Analyze the problem", "Break it into components", "Solve step by step", "Verify the solution"]

    prompt = f"""Solve this problem using step-by-step reasoning:

Problem: {problem}

Let's think step by step:
1. {steps[0]}
2. {steps[1]}
3. {steps[2]}
4. {steps[3]}

Final answer:"""

    return prompt

# Example usage
problem = "If a train travels 120 km in 2 hours, what is its average speed?"
prompt = create_chain_of_thought_prompt(problem)
print(prompt)`,
      `def create_system_prompt(role, capabilities, constraints, style):
    """
    Create a comprehensive system prompt
    """
    system_prompt = f"""You are {role}.

Capabilities:
{capabilities}

Constraints:
{constraints}

Style: {style}

Always respond in character and follow all guidelines."""

    return system_prompt

# Example usage
role = "a helpful coding tutor"
capabilities = "- Explain programming concepts clearly\\n- Provide code examples\\n- Debug code issues"
constraints = "- Stay focused on programming topics\\n- Use simple language\\n- Be encouraging"
style = "Patient, encouraging, and use analogies"

prompt = create_system_prompt(role, capabilities, constraints, style)
print(prompt)`,
      `def create_prompt_template(template_string, variables):
    """
    Create a reusable prompt template with placeholders
    """
    def fill_template(**kwargs):
        result = template_string
        for key, value in kwargs.items():
            result = result.replace(f"{{{key}}}", str(value))
        return result

    return fill_template

# Example usage
template = """Generate a {language} function that {description}

Requirements:
- Function name: {function_name}
- Parameters: {parameters}
- Return type: {return_type}

Code:"""

fill_template = create_prompt_template(template, ["language", "description", "function_name", "parameters", "return_type"])

prompt = fill_template(
    language="Python",
    description="calculates the factorial of a number",
    function_name="factorial",
    parameters="n: int",
    return_type="int"
)
print(prompt)`,
      `def create_formatted_output_prompt(task, output_format, example=None):
    """
    Create a prompt that ensures specific output formatting
    """
    format_instructions = f"""Please respond with output in exactly this format:
{output_format}"""

    if example:
        format_instructions += f"""

Example:
{example}"""

    prompt = f"""{task}

{format_instructions}

Response:"""

    return prompt

# Example usage
task = "Extract contact information from this text"
output_format = """Name: [name]
Email: [email]
Phone: [phone]"""

example = """Name: John Doe
Email: john@example.com
Phone: +1-555-0123"""

prompt = create_formatted_output_prompt(task, output_format, example)
print(prompt)`,
      `def select_few_shot_examples(task, candidate_examples, max_examples=3):
    """
    Select the most relevant examples for few-shot learning
    """
    # Simple relevance scoring based on task keywords
    task_keywords = set(task.lower().split())

    scored_examples = []
    for example in candidate_examples:
        example_text = (example.get('input', '') + ' ' + example.get('output', '')).lower()
        example_keywords = set(example_text.split())

        # Calculate overlap score
        overlap = len(task_keywords.intersection(example_keywords))
        diversity = len(example_keywords - task_keywords)  # Unique words

        score = overlap * 0.7 + diversity * 0.3
        scored_examples.append((score, example))

    # Sort by score and select top examples
    scored_examples.sort(reverse=True, key=lambda x: x[0])
    selected_examples = [example for _, example in scored_examples[:max_examples]]

    return selected_examples

# Example usage
task = "translate english to french"
candidates = [
    {"input": "Hello world", "output": "Bonjour le monde"},
    {"input": "Good morning", "output": "Bonjour"},
    {"input": "How are you?", "output": "Comment allez-vous?"}
]

selected = select_few_shot_examples(task, candidates)
print("Selected examples:", selected)`,
      `def optimize_prompt(base_prompt, variations, evaluation_criteria):
    """
    Iteratively optimize a prompt through testing variations
    """
    def evaluate_prompt(prompt, test_cases):
        scores = []
        for test_case in test_cases:
            # Simulate evaluation (in practice, this would call the LLM)
            score = simulate_evaluation(prompt, test_case)
            scores.append(score)
        return sum(scores) / len(scores)

    def simulate_evaluation(prompt, test_case):
        # Mock evaluation - in practice, use actual LLM responses
        prompt_length = len(prompt)
        has_clear_instructions = 'clear' in prompt.lower()
        matches_criteria = any(criterion in prompt.lower() for criterion in evaluation_criteria)

        score = (prompt_length < 500) * 0.3 + has_clear_instructions * 0.4 + matches_criteria * 0.3
        return score

    # Test base prompt
    best_prompt = base_prompt
    best_score = evaluate_prompt(base_prompt, [])

    # Test variations
    for variation in variations:
        test_prompt = f"{base_prompt} {variation}"
        score = evaluate_prompt(test_prompt, [])

        if score > best_score:
            best_score = score
            best_prompt = test_prompt

    return best_prompt

# Example usage
base = "Explain this concept:"
variations = ["Simply", "With examples", "Step by step", "Using analogies"]
criteria = ["clear", "examples", "step-by-step"]

optimized = optimize_prompt(base, variations, criteria)
print("Optimized prompt:", optimized)`,
      `def create_prompt_chain(steps):
    """
    Create a chain of prompts where each step builds on the previous
    """
    def execute_chain(initial_input):
        results = []
        current_input = initial_input

        for step in steps:
            prompt = step['prompt_template'].format(input=current_input)
            # In practice, this would call the LLM
            response = simulate_llm_response(prompt)
            results.append(response)
            current_input = response

        return results

    return execute_chain

# Example usage
steps = [
    {
        'name': 'analyze',
        'prompt_template': 'Analyze this text: {input}\\nKey points:'
    },
    {
        'name': 'summarize',
        'prompt_template': 'Summarize these key points: {input}\\nSummary:'
    },
    {
        'name': 'translate',
        'prompt_template': 'Translate this summary to French: {input}\\nTranslation:'
    }
]

def simulate_llm_response(prompt):
    # Mock LLM response
    if 'analyze' in prompt:
        return "- Point 1\\n- Point 2\\n- Point 3"
    elif 'summarize' in prompt:
        return "This text discusses three main points."
    elif 'translate' in prompt:
        return "Ce texte discute trois points principaux."
    return "Mock response"

chain = create_prompt_chain(steps)
results = chain("Some input text")
print("Chain results:", results)`,
      `def create_error_handling_prompt(task, common_errors, recovery_strategies):
    """
    Create a prompt that handles errors gracefully
    """
    error_handling = """
If you encounter any issues or cannot complete the task:

Common errors and solutions:
"""

    for error, solution in zip(common_errors, recovery_strategies):
        error_handling += f"- {error}: {solution}\\n"

    error_handling += """
If none of these apply, provide a clear explanation of the limitation and suggest alternatives."""

    prompt = f"""{task}

{error_handling}

Response:"""

    return prompt

# Example usage
task = "Calculate the square root of -1"
errors = ["Invalid mathematical operation", "Complex number handling"]
strategies = ["Explain that square root of negative numbers requires complex numbers", "Return the result in complex form: 1i"]

prompt = create_error_handling_prompt(task, errors, strategies)
print(prompt)`,
    ],
    outcomes: [
      "Zero-shot prompts created successfully!",
      "Few-shot prompts designed effectively!",
      "Chain-of-thought prompting implemented!",
      "System prompts configured properly!",
      "Prompt templates built for reusability!",
      "Output formatting structured correctly!",
      "Few-shot examples selected optimally!",
      "Prompt optimization completed!",
      "Prompt chaining working seamlessly!",
      "Error handling prompts added!",
    ]
  }
};

function generateChapterContent(chapterName) {
  const chapter = chapterName;
  const chapterDir = path.join(baseDir, chapter);

  if (!fs.existsSync(chapterDir)) {
    fs.mkdirSync(chapterDir, { recursive: true });
  }

  // Create guidelines
  const guidelines = {
    [chapter]: `## What You Will Learn\\n\\nMaster ${chapter.replace(/_/g, " ")} through hands-on practical missions.`
  };
  fs.writeFileSync(
    path.join(chapterDir, "guidelines.json"),
    JSON.stringify(guidelines, null, 2)
  );

  // Generate mission files
  for (let i = 1; i <= 10; i++) {
    const missionId = `mission_${String(i).padStart(2, "0")}`;
    const missionDir = path.join(chapterDir, missionId);

    if (!fs.existsSync(missionDir)) {
      fs.mkdirSync(missionDir, { recursive: true });
    }

    const missionIndex = i - 1;
    const title = missionData[chapter].titles[missionIndex];
    const description = missionData[chapter].descriptions[missionIndex];
    const hints = missionData[chapter].hints[missionIndex];
    const solution = missionData[chapter].solutions[missionIndex];
    const outcome = missionData[chapter].outcomes[missionIndex];

    // Generate games.json
    const gamesData = {
      title,
      initialState: {
        content: solution.split('\\n').slice(0, 5).join('\\n') + '\\n    # TODO: Complete the implementation'
      },
      validation: {
        type: "ai_code",
        rules: ["must_include:def", "must_include:return"]
      },
      id: missionId,
      type: "ai_code",
      xpReward: 50 + i * 10
    };

    // Generate descriptions.json
    const descriptionsData = {
      [missionId]: description
    };

    // Generate hints.json
    const hintsData = {
      [missionId]: hints
    };

    // Generate solutions.json
    const solutionsData = {
      [missionId]: solution
    };

    // Generate outcomes.json
    const outcomesData = {
      [missionId]: outcome
    };

    // Write all files
    fs.writeFileSync(
      path.join(missionDir, "games.json"),
      JSON.stringify(gamesData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "descriptions.json"),
      JSON.stringify(descriptionsData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "hints.json"),
      JSON.stringify(hintsData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "solutions.json"),
      JSON.stringify(solutionsData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "outcomes.json"),
      JSON.stringify(outcomesData, null, 2)
    );
  }

  console.log(`${chapter}: 10 missions with full content created`);
}

generateChapterContent('prompt_engineering');
console.log("Prompt engineering chapter content generation complete!");