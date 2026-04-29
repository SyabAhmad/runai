const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..", "..", "..", "ai_engineering");

const chapters = [
  "ai_fundamentals",
  "llm_basics",
  "prompt_engineering",
  "rag_systems",
  "fine_tuning_models",
  "vector_databases",
  "ai_agents",
  "mlops_ai",
  "ai_security",
  "generative_ai_apps",
];

const missionData = {
  ai_fundamentals: {
    titles: [
      "AI vs ML vs DL",
      "Supervised vs Unsupervised",
      "Regression Basics",
      "Classification Tasks",
      "Clustering Introduction",
      "Neural Network Basics",
      "Loss Functions",
      "Gradient Descent",
      "Train-Validation-Test Split",
      "Overfitting & Underfitting",
    ],
    descriptions: [
      "Explain the key differences between Artificial Intelligence, Machine Learning, and Deep Learning with practical examples.",
      "Compare supervised and unsupervised learning approaches, discussing their use cases and when to apply each.",
      "Implement basic linear regression to predict continuous values from input features.",
      "Build a classification model to categorize data points into predefined classes.",
      "Apply clustering algorithms to group similar data points without labeled examples.",
      "Create a simple neural network architecture with input, hidden, and output layers.",
      "Implement common loss functions like MSE, cross-entropy, and MAE for different tasks.",
      "Code the gradient descent optimization algorithm with learning rate and convergence criteria.",
      "Properly split datasets into training, validation, and test sets with appropriate ratios.",
      "Identify and prevent overfitting using regularization techniques and validation monitoring.",
    ],
    hints: [
      ["AI is the broadest field encompassing all intelligent behavior", "ML focuses on algorithms that learn from data", "DL uses neural networks with multiple layers"],
      ["Supervised learning requires labeled training data", "Unsupervised learning finds patterns without labels", "Consider when you have or don't have ground truth labels"],
      ["Linear regression predicts continuous values", "Use mean squared error as the loss function", "The equation is y = mx + b"],
      ["Classification deals with discrete categories", "Common algorithms include logistic regression and decision trees", "Accuracy and F1-score are important metrics"],
      ["K-means and hierarchical clustering are popular algorithms", "No labeled data is needed", "Evaluate using silhouette score or elbow method"],
      ["Neurons receive inputs and produce outputs via activation functions", "Weights determine connection strength between neurons", "Backpropagation trains the network"],
      ["MSE measures average squared difference between predictions and actuals", "Cross-entropy works well for classification problems", "Loss functions guide model optimization"],
      ["Gradient descent finds the minimum of the loss function", "Learning rate controls step size", "Stochastic, mini-batch, and batch variants exist"],
      ["Training set: 60-80%, Validation: 10-20%, Test: 10-20%", "Never use test data for model selection", "Validation helps tune hyperparameters"],
      ["Overfitting occurs when model performs well on training but poorly on new data", "Regularization techniques include L1/L2 penalties", "Early stopping prevents overfitting"],
    ],
    solutions: [
      `def explain_ai_ml_dl():
    """
    AI (Artificial Intelligence): Broad field of creating machines that perform tasks requiring human intelligence
    ML (Machine Learning): Subset of AI focusing on algorithms that learn patterns from data
    DL (Deep Learning): Subset of ML using neural networks with multiple layers
    """
    return {
        "AI": "General intelligence and problem-solving",
        "ML": "Statistical learning from data",
        "DL": "Neural networks with deep architectures"
    }`,
      `def compare_learning_types():
    """
    Supervised Learning: Uses labeled data to learn input-output mappings
    - Examples: Classification, Regression
    - Use when: You have ground truth labels

    Unsupervised Learning: Finds patterns in unlabeled data
    - Examples: Clustering, Dimensionality reduction
    - Use when: No labels available, exploratory analysis
    """
    return {
        "supervised": ["labeled data", "predictive modeling", "classification/regression"],
        "unsupervised": ["unlabeled data", "pattern discovery", "clustering/dimensionality reduction"]
    }`,
      `import numpy as np

def linear_regression(X, y, learning_rate=0.01, epochs=1000):
    """
    Linear regression implementation using gradient descent
    """
    m, n = X.shape
    weights = np.zeros(n)
    bias = 0

    for _ in range(epochs):
        # Forward pass
        y_pred = np.dot(X, weights) + bias

        # Calculate gradients
        dw = (1/m) * np.dot(X.T, (y_pred - y))
        db = (1/m) * np.sum(y_pred - y)

        # Update parameters
        weights -= learning_rate * dw
        bias -= learning_rate * db

    return weights, bias`,
      `import numpy as np
from sklearn.linear_model import LogisticRegression

def binary_classification(X_train, y_train, X_test):
    """
    Binary classification using logistic regression
    """
    model = LogisticRegression()
    model.fit(X_train, y_train)

    # Make predictions
    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)

    return predictions, probabilities`,
      `import numpy as np
from sklearn.cluster import KMeans

def kmeans_clustering(X, n_clusters=3, random_state=42):
    """
    K-means clustering implementation
    """
    kmeans = KMeans(n_clusters=n_clusters, random_state=random_state, n_init=10)
    clusters = kmeans.fit_predict(X)

    # Calculate centroids
    centroids = kmeans.cluster_centers_

    return clusters, centroids`,
      `import numpy as np

def create_neural_network(input_size, hidden_size, output_size):
    """
    Simple neural network architecture
    """
    # Initialize weights and biases
    W1 = np.random.randn(input_size, hidden_size) * 0.01
    b1 = np.zeros((1, hidden_size))
    W2 = np.random.randn(hidden_size, output_size) * 0.01
    b2 = np.zeros((1, output_size))

    network = {
        'W1': W1, 'b1': b1,
        'W2': W2, 'b2': b2
    }

    return network

def forward_pass(network, X):
    """
    Forward propagation through the network
    """
    W1, b1 = network['W1'], network['b1']
    W2, b2 = network['W2'], network['b2']

    # Hidden layer
    Z1 = np.dot(X, W1) + b1
    A1 = np.maximum(0, Z1)  # ReLU activation

    # Output layer
    Z2 = np.dot(A1, W2) + b2
    A2 = 1 / (1 + np.exp(-Z2))  # Sigmoid activation

    return A2`,
      `import numpy as np

def mean_squared_error(y_true, y_pred):
    """
    Mean Squared Error loss function
    """
    return np.mean((y_true - y_pred) ** 2)

def cross_entropy_loss(y_true, y_pred):
    """
    Cross-entropy loss for classification
    """
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

def mean_absolute_error(y_true, y_pred):
    """
    Mean Absolute Error loss function
    """
    return np.mean(np.abs(y_true - y_pred))`,
      `import numpy as np

def gradient_descent(X, y, learning_rate=0.01, epochs=1000, tolerance=1e-6):
    """
    Batch gradient descent implementation
    """
    m, n = X.shape
    theta = np.zeros(n)
    prev_cost = float('inf')

    for epoch in range(epochs):
        # Compute predictions
        y_pred = np.dot(X, theta)

        # Compute cost (MSE)
        cost = np.mean((y_pred - y) ** 2)

        # Check for convergence
        if abs(prev_cost - cost) < tolerance:
            break

        # Compute gradients
        gradients = (2/m) * np.dot(X.T, (y_pred - y))

        # Update parameters
        theta -= learning_rate * gradients
        prev_cost = cost

    return theta`,
      `import numpy as np
from sklearn.model_selection import train_test_split

def split_dataset(X, y, test_size=0.2, val_size=0.2, random_state=42):
    """
    Split dataset into train, validation, and test sets
    """
    # First split: separate test set
    X_temp, X_test, y_temp, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )

    # Second split: separate validation set from remaining data
    val_ratio = val_size / (1 - test_size)
    X_train, X_val, y_train, y_val = train_test_split(
        X_temp, y_temp, test_size=val_ratio, random_state=random_state
    )

    return X_train, X_val, X_test, y_train, y_val, y_test`,
      `import numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import validation_curve

def prevent_overfitting(X_train, y_train, X_val, y_val):
    """
    Techniques to prevent overfitting
    """
    # L2 regularization (Ridge regression)
    alphas = [0.001, 0.01, 0.1, 1.0, 10.0]
    best_alpha = None
    best_score = -np.inf

    for alpha in alphas:
        model = Ridge(alpha=alpha)
        model.fit(X_train, y_train)
        score = model.score(X_val, y_val)
        if score > best_score:
            best_score = score
            best_alpha = alpha

    # Train final model with best regularization
    final_model = Ridge(alpha=best_alpha)
    final_model.fit(X_train, y_train)

    return final_model, best_alpha`,
    ],
    outcomes: [
      "Successfully distinguished AI, ML, and DL concepts!",
      "Mastered supervised vs unsupervised learning paradigms!",
      "Linear regression model implemented correctly!",
      "Classification system working perfectly!",
      "Clustering algorithm grouping data effectively!",
      "Neural network architecture created successfully!",
      "Loss functions implemented for different scenarios!",
      "Gradient descent optimization completed!",
      "Dataset splitting done according to best practices!",
      "Overfitting prevention techniques applied!",
    ]
  },
  llm_basics: {
    titles: [
      "Transformer Architecture",
      "Attention Mechanism",
      "Tokenization",
      "Embeddings",
      "Model Checkpoints",
      "Model Inference",
      "Temperature Sampling",
      "Top-p Sampling",
      "Context Window",
      "Few-Shot Learning",
    ],
    descriptions: [
      "Implement the core Transformer architecture with encoder-decoder structure and self-attention layers.",
      "Build the attention mechanism that allows models to focus on relevant parts of the input sequence.",
      "Create a tokenization system to convert text into numerical tokens for model processing.",
      "Generate word embeddings that capture semantic relationships between tokens.",
      "Save and load model checkpoints during training to preserve progress and enable resumption.",
      "Set up efficient inference pipelines for generating text from trained language models.",
      "Implement temperature sampling to control the randomness and creativity of text generation.",
      "Apply nucleus (top-p) sampling for more coherent and diverse text generation.",
      "Manage context windows to handle long documents while respecting model limitations.",
      "Configure few-shot learning prompts to enable models to perform new tasks with minimal examples.",
    ],
    hints: [
      ["Transformers use self-attention instead of RNNs", "Encoder processes input, decoder generates output", "Multi-head attention allows parallel processing"],
      ["Attention computes relevance scores between tokens", "Query, Key, Value matrices are learned", "Scaled dot-product attention prevents vanishing gradients"],
      ["Tokenization breaks text into meaningful units", "Subword tokenization balances vocabulary size and coverage", "Special tokens handle padding, start, and end"],
      ["Embeddings map tokens to dense vector representations", "Word2Vec and GloVe are traditional methods", "Contextual embeddings change based on usage"],
      ["Checkpoints save model weights and optimizer state", "Regular saving prevents loss of training progress", "Model versioning helps track improvements"],
      ["Batch processing improves inference speed", "Memory management prevents GPU out-of-memory", "Caching frequent computations accelerates responses"],
      ["Temperature > 1 increases randomness, < 1 decreases it", "Higher temperature = more creative, lower = more focused", "Temperature = 0 makes deterministic predictions"],
      ["Top-p sampling selects from highest probability tokens", "Dynamically adjusts vocabulary based on cumulative probability", "Balances diversity and coherence better than temperature"],
      ["Context windows limit how much text the model can process", "Sliding windows handle very long documents", "Chunking strategies maintain coherence"],
      ["Few-shot learning provides examples in the prompt", "Task description + examples + query format", "Models learn from patterns in the examples"],
    ],
    solutions: [
      `import torch
import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, embed_dim, num_heads, ff_dim, dropout=0.1):
        super().__init__()
        self.attention = nn.MultiheadAttention(embed_dim, num_heads, dropout=dropout)
        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.feed_forward = nn.Sequential(
            nn.Linear(embed_dim, ff_dim),
            nn.ReLU(),
            nn.Linear(ff_dim, embed_dim)
        )
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Self-attention with residual connection
        attn_output, _ = self.attention(x, x, x, attn_mask=mask)
        x = self.norm1(x + self.dropout(attn_output))

        # Feed-forward with residual connection
        ff_output = self.feed_forward(x)
        x = self.norm2(x + self.dropout(ff_output))

        return x`,
      `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(query, key, value, mask=None):
    """
    Compute scaled dot-product attention
    """
    # Calculate attention scores
    scores = torch.matmul(query, key.transpose(-2, -1))
    scores = scores / (key.size(-1) ** 0.5)  # Scale by sqrt(d_k)

    # Apply mask if provided
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Apply softmax to get attention weights
    attention_weights = F.softmax(scores, dim=-1)

    # Apply attention to values
    output = torch.matmul(attention_weights, value)

    return output, attention_weights`,
      `import re
from collections import Counter

class SimpleTokenizer:
    def __init__(self, vocab_size=10000):
        self.vocab_size = vocab_size
        self.word_to_id = {}
        self.id_to_word = {}
        self.special_tokens = {
            '<PAD>': 0,
            '<UNK>': 1,
            '<SOS>': 2,
            '<EOS>': 3
        }

    def fit(self, texts):
        """Build vocabulary from training texts"""
        words = []
        for text in texts:
            # Simple whitespace tokenization
            words.extend(re.findall(r'\b\w+\b', text.lower()))

        word_freq = Counter(words)
        most_common = word_freq.most_common(self.vocab_size - len(self.special_tokens))

        # Assign IDs to special tokens
        for token, idx in self.special_tokens.items():
            self.word_to_id[token] = idx
            self.id_to_word[idx] = token

        # Assign IDs to regular vocabulary
        for idx, (word, _) in enumerate(most_common, start=len(self.special_tokens)):
            self.word_to_id[word] = idx
            self.id_to_word[idx] = word

    def encode(self, text):
        """Convert text to token IDs"""
        tokens = re.findall(r'\b\w+\b', text.lower())
        return [self.word_to_id.get(token, self.special_tokens['<UNK>']) for token in tokens]

    def decode(self, token_ids):
        """Convert token IDs back to text"""
        return ' '.join([self.id_to_word.get(idx, '<UNK>') for idx in token_ids])`,
      `import torch
import torch.nn as nn

class EmbeddingLayer(nn.Module):
    def __init__(self, vocab_size, embed_dim, max_length):
        super().__init__()
        self.token_embedding = nn.Embedding(vocab_size, embed_dim)
        self.position_embedding = nn.Embedding(max_length, embed_dim)

    def forward(self, token_ids):
        """
        Add token and position embeddings
        """
        batch_size, seq_length = token_ids.size()

        # Token embeddings
        token_embeds = self.token_embedding(token_ids)

        # Position embeddings
        positions = torch.arange(seq_length, device=token_ids.device).unsqueeze(0)
        pos_embeds = self.position_embedding(positions)

        # Combine embeddings
        embeddings = token_embeds + pos_embeds

        return embeddings`,
      `import torch
import os

def save_checkpoint(model, optimizer, epoch, loss, filepath):
    """
    Save model checkpoint
    """
    checkpoint = {
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'loss': loss
    }

    # Save checkpoint
    torch.save(checkpoint, filepath)
    print(f"Checkpoint saved to {filepath}")

def load_checkpoint(model, optimizer, filepath):
    """
    Load model checkpoint
    """
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Checkpoint file not found: {filepath}")

    checkpoint = torch.load(filepath)

    model.load_state_dict(checkpoint['model_state_dict'])
    optimizer.load_state_dict(checkpoint['optimizer_state_dict'])

    epoch = checkpoint['epoch']
    loss = checkpoint['loss']

    print(f"Checkpoint loaded from {filepath} (epoch {epoch})")

    return epoch, loss`,
      `import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

class LLMInference:
    def __init__(self, model_name="gpt2", device="cpu"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name)
        self.model.to(device)
        self.model.eval()
        self.device = device

        # Set pad token if not present
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token

    def generate_text(self, prompt, max_length=50, num_return_sequences=1):
        """
        Generate text from prompt
        """
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length + len(inputs['input_ids'][0]),
                num_return_sequences=num_return_sequences,
                do_sample=True,
                temperature=0.7,
                top_p=0.9,
                pad_token_id=self.tokenizer.pad_token_id
            )

        generated_texts = []
        for output in outputs:
            text = self.tokenizer.decode(output[len(inputs['input_ids'][0]):], skip_special_tokens=True)
            generated_texts.append(text)

        return generated_texts`,
      `import torch
import torch.nn.functional as F

def temperature_sampling(logits, temperature=1.0):
    """
    Apply temperature scaling to logits before sampling
    """
    if temperature == 0:
        # Greedy sampling - take the highest probability token
        return torch.argmax(logits, dim=-1, keepdim=True)

    # Scale logits by temperature
    scaled_logits = logits / temperature

    # Convert to probabilities
    probabilities = F.softmax(scaled_logits, dim=-1)

    # Sample from the distribution
    next_token = torch.multinomial(probabilities, num_samples=1)

    return next_token`,
      `import torch
import torch.nn.functional as F

def top_p_sampling(logits, top_p=0.9):
    """
    Apply nucleus (top-p) sampling to logits
    """
    # Sort logits in descending order
    sorted_logits, sorted_indices = torch.sort(logits, descending=True, dim=-1)

    # Convert to probabilities
    probabilities = F.softmax(sorted_logits, dim=-1)

    # Calculate cumulative probabilities
    cumulative_probs = torch.cumsum(probabilities, dim=-1)

    # Find the cutoff point
    cutoff_mask = cumulative_probs > top_p

    # Set probabilities beyond cutoff to zero
    sorted_logits[cutoff_mask] = float('-inf')

    # Convert back to original order
    final_logits = torch.zeros_like(logits).scatter_(-1, sorted_indices, sorted_logits)

    # Sample from the filtered distribution
    next_token = torch.multinomial(F.softmax(final_logits, dim=-1), num_samples=1)

    return next_token`,
      `def manage_context_window(text, max_length=512, overlap=50):
    """
    Split long text into chunks that fit within context window
    """
    words = text.split()
    chunks = []

    start = 0
    while start < len(words):
        end = min(start + max_length, len(words))

        # Create chunk
        chunk = ' '.join(words[start:end])
        chunks.append(chunk)

        # Move start position with overlap for next chunk
        start = end - overlap

        # Break if we're not making progress
        if start >= len(words) - 1:
            break

    return chunks

def sliding_window_inference(model, long_text, window_size=512, stride=256):
    """
    Perform inference on long text using sliding window approach
    """
    chunks = manage_context_window(long_text, window_size, window_size - stride)
    results = []

    for chunk in chunks:
        # Process each chunk
        result = model.process(chunk)
        results.append(result)

    # Combine results (simplified - actual implementation would depend on task)
    return results`,
      `def create_few_shot_prompt(task_description, examples, query):
    """
    Create a few-shot learning prompt
    """
    prompt_parts = []

    # Task description
    prompt_parts.append(f"Task: {task_description}")
    prompt_parts.append("")

    # Examples
    for i, example in enumerate(examples, 1):
        prompt_parts.append(f"Example {i}:")
        prompt_parts.append(f"Input: {example['input']}")
        prompt_parts.append(f"Output: {example['output']}")
        prompt_parts.append("")

    # Query
    prompt_parts.append("Now answer this:")
    prompt_parts.append(f"Input: {query}")
    prompt_parts.append("Output:")

    return "\\n".join(prompt_parts)`,
    ],
    outcomes: [
      "Transformer architecture implemented successfully!",
      "Attention mechanism working correctly!",
      "Tokenization system created effectively!",
      "Embeddings generated with semantic relationships!",
      "Model checkpoints saved and loaded properly!",
      "Inference pipeline optimized for performance!",
      "Temperature sampling controlling creativity!",
      "Top-p sampling improving text quality!",
      "Context window management implemented!",
      "Few-shot learning prompts configured!",
    ]
  },
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
  },
  rag_systems: {
    titles: [
      "Document Loading",
      "Text Splitting",
      "Embedding Generation",
      "Vector Similarity",
      "Retrieval Setup",
      "Context Injection",
      "RAG Pipeline",
      "Query Reformulation",
      "Hybrid Search",
      "RAG Evaluation",
    ],
    descriptions: [
      "Implement document loading functionality to ingest various file formats into the system.",
      "Create text splitting strategies to break large documents into manageable chunks.",
      "Generate embeddings for text chunks to enable semantic similarity search.",
      "Implement vector similarity algorithms to find relevant documents.",
      "Set up a retrieval system that efficiently searches through document collections.",
      "Inject relevant context from retrieved documents into prompts for better responses.",
      "Build a complete RAG pipeline that combines retrieval and generation.",
      "Implement query reformulation techniques to improve retrieval quality.",
      "Create hybrid search combining keyword-based and semantic search methods.",
      "Develop evaluation metrics and methods to assess RAG system performance.",
    ],
    hints: [
      ["Support multiple file formats", "Handle text encoding properly", "Add metadata extraction"],
      ["Consider chunk size and overlap", "Respect sentence and paragraph boundaries", "Balance chunk size with context"],
      ["Use pre-trained embedding models", "Batch processing for efficiency", "Handle variable text lengths"],
      ["Cosine similarity is most common", "Consider Euclidean distance too", "Normalize vectors for better results"],
      ["Use vector databases like Pinecone or Weaviate", "Implement efficient indexing", "Add filtering capabilities"],
      ["Limit context length to fit model", "Prioritize most relevant chunks", "Include source attribution"],
      ["Connect retrieval to generation", "Implement proper error handling", "Add caching for performance"],
      ["Expand queries with synonyms", "Break complex queries into sub-queries", "Use query decomposition"],
      ["Combine BM25 with vector search", "Use reciprocal rank fusion", "Weight different search methods"],
      ["Use ground truth for evaluation", "Measure retrieval and generation quality", "A/B testing for improvements"],
    ],
    solutions: [
      `import os
from typing import List, Dict, Any
import PyPDF2
from docx import Document

class DocumentLoader:
    def __init__(self, supported_formats=None):
        if supported_formats is None:
            supported_formats = ['.txt', '.pdf', '.docx', '.md']
        self.supported_formats = supported_formats

    def load_document(self, file_path: str) -> Dict[str, Any]:
        """Load a single document and extract its content and metadata"""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        file_extension = os.path.splitext(file_path)[1].lower()

        if file_extension not in self.supported_formats:
            raise ValueError(f"Unsupported file format: {file_extension}")

        content = self._extract_content(file_path, file_extension)

        metadata = {
            'file_path': file_path,
            'file_name': os.path.basename(file_path),
            'file_size': os.path.getsize(file_path),
            'file_extension': file_extension,
            'last_modified': os.path.getmtime(file_path)
        }

        return {
            'content': content,
            'metadata': metadata
        }

    def _extract_content(self, file_path: str, file_extension: str) -> str:
        """Extract text content based on file type"""
        if file_extension == '.txt':
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        elif file_extension == '.pdf':
            with open(file_path, 'rb') as f:
                pdf_reader = PyPDF2.PdfReader(f)
                content = ""
                for page in pdf_reader.pages:
                    content += page.extract_text() + "\\n"
                return content
        elif file_extension == '.docx':
            doc = Document(file_path)
            content = ""
            for paragraph in doc.paragraphs:
                content += paragraph.text + "\\n"
            return content
        elif file_extension == '.md':
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        else:
            raise ValueError(f"No extractor available for {file_extension}")`,
      `import re
from typing import List, Dict, Any

class TextSplitter:
    def __init__(self, chunk_size: int = 1000, chunk_overlap: int = 200):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def split_text(self, text: str, metadata: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """Split text into overlapping chunks with metadata"""
        if metadata is None:
            metadata = {}

        # Split into sentences first for better chunking
        sentences = re.split(r'(?<=[.!?])\\s+', text.strip())

        chunks = []
        current_chunk = ""
        current_sentences = []

        for sentence in sentences:
            # Check if adding this sentence would exceed chunk size
            potential_chunk = current_chunk + " " + sentence if current_chunk else sentence

            if len(potential_chunk) > self.chunk_size and current_chunk:
                # Save current chunk
                chunks.append(self._create_chunk(current_chunk, current_sentences, metadata, len(chunks)))
                current_chunk = sentence
                current_sentences = [sentence]
            else:
                current_chunk = potential_chunk
                current_sentences.append(sentence)

        # Add the last chunk
        if current_chunk:
            chunks.append(self._create_chunk(current_chunk, current_sentences, metadata, len(chunks)))

        return chunks

    def _create_chunk(self, text: str, sentences: List[str], metadata: Dict[str, Any], chunk_id: int) -> Dict[str, Any]:
        """Create a chunk dictionary with metadata"""
        return {
            'text': text.strip(),
            'sentences': sentences,
            'chunk_id': chunk_id,
            'metadata': {
                **metadata,
                'chunk_length': len(text),
                'sentence_count': len(sentences)
            }
        }`,
      `import torch
from transformers import AutoTokenizer, AutoModel
from typing import List, Dict, Any
import numpy as np

class EmbeddingGenerator:
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2", device: str = "cpu"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.model.to(device)
        self.model.eval()
        self.device = device

    def generate_embeddings(self, texts: List[str], batch_size: int = 32) -> np.ndarray:
        """Generate embeddings for a list of texts"""
        embeddings = []

        for i in range(0, len(texts), batch_size):
            batch_texts = texts[i:i + batch_size]
            batch_embeddings = self._generate_batch_embeddings(batch_texts)
            embeddings.extend(batch_embeddings)

        return np.array(embeddings)

    def _generate_batch_embeddings(self, texts: List[str]) -> List[np.ndarray]:
        """Generate embeddings for a batch of texts"""
        # Tokenize texts
        inputs = self.tokenizer(texts, padding=True, truncation=True,
                              max_length=512, return_tensors="pt")

        # Move to device
        inputs = {k: v.to(self.device) for k, v in inputs.items()}

        with torch.no_grad():
            outputs = self.model(**inputs)

        # Use mean pooling over token embeddings
        embeddings = self._mean_pooling(outputs.last_hidden_state, inputs['attention_mask'])

        # Normalize embeddings
        embeddings = torch.nn.functional.normalize(embeddings, p=2, dim=1)

        return embeddings.cpu().numpy()

    def _mean_pooling(self, token_embeddings: torch.Tensor, attention_mask: torch.Tensor) -> torch.Tensor:
        """Apply mean pooling to token embeddings"""
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
        sum_embeddings = torch.sum(token_embeddings * input_mask_expanded, 1)
        sum_mask = torch.clamp(input_mask_expanded.sum(1), min=1e-9)
        return sum_embeddings / sum_mask`,
      `import numpy as np
from typing import List, Tuple, Dict, Any
import faiss

class VectorSimilaritySearch:
    def __init__(self, dimension: int):
        self.dimension = dimension
        self.index = None
        self.vectors = []
        self.metadata = []

    def build_index(self, vectors: np.ndarray, metadata: List[Dict[str, Any]] = None):
        """Build FAISS index for efficient similarity search"""
        if metadata is None:
            metadata = [{} for _ in range(len(vectors))]

        # Normalize vectors for cosine similarity
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        normalized_vectors = vectors / norms

        # Create FAISS index
        self.index = faiss.IndexFlatIP(self.dimension)  # Inner product (cosine similarity)
        self.index.add(normalized_vectors.astype('float32'))
        self.vectors = normalized_vectors
        self.metadata = metadata

    def search(self, query_vector: np.ndarray, k: int = 5) -> List[Tuple[float, Dict[str, Any]]]:
        """Search for k most similar vectors"""
        # Normalize query vector
        query_norm = np.linalg.norm(query_vector)
        if query_norm > 0:
            query_vector = query_vector / query_norm

        # Search
        query_vector = query_vector.reshape(1, -1).astype('float32')
        scores, indices = self.index.search(query_vector, k)

        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < len(self.metadata):
                results.append((float(score), self.metadata[idx]))

        return results

    def cosine_similarity(self, vec1: np.ndarray, vec2: np.ndarray) -> float:
        """Calculate cosine similarity between two vectors"""
        dot_product = np.dot(vec1, vec2)
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)
        return dot_product / (norm1 * norm2) if norm1 > 0 and norm2 > 0 else 0.0`,
      `import numpy as np
from typing import List, Dict, Any, Optional
from .vector_similarity import VectorSimilaritySearch

class RetrievalSystem:
    def __init__(self, embedding_generator, vector_search):
        self.embedding_generator = embedding_generator
        self.vector_search = vector_search
        self.documents = []

    def add_documents(self, documents: List[Dict[str, Any]]):
        """Add documents to the retrieval system"""
        texts = [doc['text'] for doc in documents]

        # Generate embeddings
        embeddings = self.embedding_generator.generate_embeddings(texts)

        # Build search index
        self.vector_search.build_index(embeddings, documents)
        self.documents = documents

    def retrieve(self, query: str, k: int = 5, threshold: float = 0.0) -> List[Dict[str, Any]]:
        """Retrieve relevant documents for a query"""
        # Generate query embedding
        query_embedding = self.embedding_generator.generate_embeddings([query])[0]

        # Search for similar documents
        results = self.vector_search.search(query_embedding, k=k)

        # Filter by threshold and format results
        relevant_docs = []
        for score, metadata in results:
            if score >= threshold:
                relevant_docs.append({
                    'score': score,
                    'document': metadata
                })

        return relevant_docs

    def retrieve_with_metadata_filter(self, query: str, filters: Dict[str, Any],
                                    k: int = 5) -> List[Dict[str, Any]]:
        """Retrieve documents with metadata filtering"""
        # First retrieve candidates
        candidates = self.retrieve(query, k=k*2)  # Get more candidates for filtering

        # Apply filters
        filtered_results = []
        for result in candidates:
            doc_metadata = result['document'].get('metadata', {})
            if self._matches_filters(doc_metadata, filters):
                filtered_results.append(result)

        return filtered_results[:k]

    def _matches_filters(self, doc_metadata: Dict[str, Any], filters: Dict[str, Any]) -> bool:
        """Check if document metadata matches the filters"""
        for key, value in filters.items():
            if key not in doc_metadata or doc_metadata[key] != value:
                return False
        return True`,
      `from typing import List, Dict, Any, Optional

class ContextInjector:
    def __init__(self, max_context_length: int = 4000, separator: str = "\\n\\n"):
        self.max_context_length = max_context_length
        self.separator = separator

    def inject_context(self, query: str, retrieved_docs: List[Dict[str, Any]],
                      system_prompt: str = "") -> str:
        """Inject relevant context into a prompt"""
        # Sort documents by relevance score
        sorted_docs = sorted(retrieved_docs, key=lambda x: x['score'], reverse=True)

        # Build context from top documents
        context_parts = []
        total_length = 0

        for doc_info in sorted_docs:
            doc_text = doc_info['document']['text']
            doc_score = doc_info['score']

            # Estimate token count (rough approximation)
            estimated_tokens = len(doc_text.split()) * 1.3

            if total_length + estimated_tokens > self.max_context_length:
                break

            # Format context entry
            context_entry = f"[Relevance: {doc_score:.3f}]\\n{doc_text}"
            context_parts.append(context_entry)
            total_length += estimated_tokens

        context = self.separator.join(context_parts)

        # Build final prompt
        if system_prompt:
            prompt = f"{system_prompt}\\n\\nContext:\\n{context}\\n\\nQuestion: {query}\\n\\nAnswer:"
        else:
            prompt = f"Context:\\n{context}\\n\\nQuestion: {query}\\n\\nAnswer:"

        return prompt

    def inject_context_with_citations(self, query: str, retrieved_docs: List[Dict[str, Any]]) -> str:
        """Inject context with citation references"""
        sorted_docs = sorted(retrieved_docs, key=lambda x: x['score'], reverse=True)

        context_parts = []
        citations = []

        for i, doc_info in enumerate(sorted_docs):
            doc_text = doc_info['document']['text']
            doc_score = doc_info['score']
            doc_source = doc_info['document'].get('metadata', {}).get('file_name', f'Document {i+1}')

            # Add citation marker
            citation_marker = f"[^{i+1}]"
            context_entry = f"{citation_marker} [Relevance: {doc_score:.3f}]\\n{doc_text}"
            context_parts.append(context_entry)

            # Add to citations list
            citations.append(f"{citation_marker} Source: {doc_source}")

        context = self.separator.join(context_parts)
        citations_text = "\\n".join(citations)

        prompt = f"""Context:
{context}

Citations:
{citations_text}

Question: {query}

Answer:"""

        return prompt`,
      `from typing import List, Dict, Any, Optional
import logging

class RAGPipeline:
    def __init__(self, document_loader, text_splitter, embedding_generator,
                 retrieval_system, context_injector, llm_client):
        self.document_loader = document_loader
        self.text_splitter = text_splitter
        self.embedding_generator = embedding_generator
        self.retrieval_system = retrieval_system
        self.context_injector = context_injector
        self.llm_client = llm_client
        self.logger = logging.getLogger(__name__)

    def ingest_documents(self, file_paths: List[str]):
        """Ingest documents into the RAG system"""
        all_chunks = []

        for file_path in file_paths:
            try:
                # Load document
                doc_data = self.document_loader.load_document(file_path)
                self.logger.info(f"Loaded document: {file_path}")

                # Split into chunks
                chunks = self.text_splitter.split_text(doc_data['content'], doc_data['metadata'])
                all_chunks.extend(chunks)
                self.logger.info(f"Split into {len(chunks)} chunks")

            except Exception as e:
                self.logger.error(f"Error processing {file_path}: {e}")
                continue

        # Add all chunks to retrieval system
        if all_chunks:
            self.retrieval_system.add_documents(all_chunks)
            self.logger.info(f"Added {len(all_chunks)} chunks to retrieval system")

    def query(self, query: str, k: int = 5, system_prompt: Optional[str] = None) -> Dict[str, Any]:
        """Process a query through the RAG pipeline"""
        try:
            # Retrieve relevant documents
            retrieved_docs = self.retrieval_system.retrieve(query, k=k)
            self.logger.info(f"Retrieved {len(retrieved_docs)} documents")

            # Inject context into prompt
            prompt = self.context_injector.inject_context(query, retrieved_docs, system_prompt)

            # Generate response
            response = self.llm_client.generate(prompt)

            return {
                'query': query,
                'response': response,
                'retrieved_documents': retrieved_docs,
                'prompt_used': prompt
            }

        except Exception as e:
            self.logger.error(f"Error processing query: {e}")
            return {
                'query': query,
                'error': str(e),
                'retrieved_documents': [],
                'response': "I apologize, but I encountered an error processing your query."
            }`,
      `from typing import List, Dict, Any, Optional
import re

class QueryReformulation:
    def __init__(self, synonym_dict: Optional[Dict[str, List[str]]] = None):
        self.synonym_dict = synonym_dict or {}
        self.query_expansion_templates = [
            "What is {query}?",
            "Explain {query}",
            "Tell me about {query}",
            "How does {query} work?",
            "What are the benefits of {query}?"
        ]

    def expand_query(self, query: str, max_expansions: int = 3) -> List[str]:
        """Expand a query into multiple related queries"""
        expanded_queries = [query]  # Include original query

        # Synonym expansion
        synonym_expanded = self._expand_with_synonyms(query)
        expanded_queries.extend(synonym_expanded[:max_expansions-1])

        # Template-based expansion
        template_expanded = []
        for template in self.query_expansion_templates:
            expanded = template.format(query=query)
            template_expanded.append(expanded)

        expanded_queries.extend(template_expanded[:max_expansions-len(expanded_queries)+1])

        return list(set(expanded_queries))  # Remove duplicates

    def decompose_query(self, query: str) -> List[str]:
        """Break down complex queries into simpler sub-queries"""
        # Simple rule-based decomposition
        sub_queries = []

        # Split on conjunctions
        parts = re.split(r'\\b(and|or|but|however)\\b', query)

        if len(parts) > 1:
            # Extract individual questions
            for i in range(0, len(parts), 2):
                if i < len(parts):
                    sub_query = parts[i].strip()
                    if sub_query and len(sub_query.split()) > 2:
                        sub_queries.append(sub_query)
        else:
            # Single query, try to split on question marks or key phrases
            sentences = re.split(r'[.!?]+', query)
            sub_queries = [s.strip() for s in sentences if s.strip() and len(s.split()) > 2]

        return sub_queries if sub_queries else [query]

    def _expand_with_synonyms(self, query: str) -> List[str]:
        """Expand query using synonym dictionary"""
        words = query.lower().split()
        expanded_queries = []

        for word in words:
            if word in self.synonym_dict:
                for synonym in self.synonym_dict[word]:
                    expanded_query = query.lower().replace(word, synonym)
                    expanded_queries.append(expanded_query.title())

        return expanded_queries`,
      `import numpy as np
from typing import List, Dict, Any, Tuple
from rank_bm25 import BM25Okapi
import re

class HybridSearch:
    def __init__(self, embedding_generator, vector_search):
        self.embedding_generator = embedding_generator
        self.vector_search = vector_search
        self.bm25 = None
        self.documents = []
        self.corpus = []

    def add_documents(self, documents: List[Dict[str, Any]]):
        """Add documents for hybrid search"""
        self.documents = documents

        # Prepare corpus for BM25
        self.corpus = []
        for doc in documents:
            # Tokenize for BM25
            tokens = self._tokenize_for_bm25(doc['text'])
            self.corpus.append(tokens)

        # Initialize BM25
        self.bm25 = BM25Okapi(self.corpus)

        # Add to vector search
        texts = [doc['text'] for doc in documents]
        embeddings = self.embedding_generator.generate_embeddings(texts)
        self.vector_search.build_index(embeddings, documents)

    def hybrid_search(self, query: str, k: int = 5, vector_weight: float = 0.7,
                     bm25_weight: float = 0.3) -> List[Dict[str, Any]]:
        """Perform hybrid search combining vector and keyword search"""
        # Vector search
        query_embedding = self.embedding_generator.generate_embeddings([query])[0]
        vector_results = self.vector_search.search(query_embedding, k=k*2)

        # BM25 search
        query_tokens = self._tokenize_for_bm25(query)
        bm25_scores = self.bm25.get_scores(query_tokens)

        # Normalize BM25 scores to 0-1 range
        if bm25_scores.max() > 0:
            bm25_scores = bm25_scores / bm25_scores.max()

        # Combine scores using reciprocal rank fusion
        combined_results = self._reciprocal_rank_fusion(vector_results, bm25_scores, k)

        # Apply weighted scoring
        final_results = []
        for result in combined_results:
            vector_score = result.get('vector_score', 0)
            bm25_score = result.get('bm25_score', 0)
            combined_score = vector_weight * vector_score + bm25_weight * bm25_score

            final_results.append({
                'score': combined_score,
                'document': result['document'],
                'vector_score': vector_score,
                'bm25_score': bm25_score
            })

        # Sort by combined score
        final_results.sort(key=lambda x: x['score'], reverse=True)
        return final_results[:k]

    def _tokenize_for_bm25(self, text: str) -> List[str]:
        """Tokenize text for BM25"""
        # Simple tokenization: lowercase, remove punctuation, split
        text = re.sub(r'[^\\w\\s]', '', text.lower())
        return text.split()

    def _reciprocal_rank_fusion(self, vector_results: List[Tuple[float, Dict]],
                               bm25_scores: np.ndarray, k: int) -> List[Dict]:
        """Combine vector and BM25 results using reciprocal rank fusion"""
        result_map = {}

        # Process vector results
        for rank, (score, doc) in enumerate(vector_results):
            doc_id = id(doc)  # Use object id as key
            if doc_id not in result_map:
                result_map[doc_id] = {'document': doc, 'vector_score': score, 'bm25_score': 0}
            result_map[doc_id]['vector_rank'] = rank + 1

        # Process BM25 results
        bm25_ranks = np.argsort(bm25_scores)[::-1]  # Sort in descending order
        for rank, doc_idx in enumerate(bm25_ranks[:len(vector_results)]):
            if doc_idx < len(self.documents):
                doc = self.documents[doc_idx]
                doc_id = id(doc)
                score = bm25_scores[doc_idx]

                if doc_id not in result_map:
                    result_map[doc_id] = {'document': doc, 'vector_score': 0, 'bm25_score': score}
                else:
                    result_map[doc_id]['bm25_score'] = score
                result_map[doc_id]['bm25_rank'] = rank + 1

        # Apply reciprocal rank fusion
        fused_results = []
        for doc_info in result_map.values():
            vector_rank = doc_info.get('vector_rank', len(result_map) + 1)
            bm25_rank = doc_info.get('bm25_rank', len(result_map) + 1)

            # RRF score
            rrf_score = 1 / (60 + vector_rank) + 1 / (60 + bm25_rank)
            doc_info['rrf_score'] = rrf_score
            fused_results.append(doc_info)

        # Sort by RRF score
        fused_results.sort(key=lambda x: x['rrf_score'], reverse=True)
        return fused_results[:k]`,
      `import numpy as np
from typing import List, Dict, Any, Optional
from sklearn.metrics import ndcg_score
import time

class RAGEvaluator:
    def __init__(self):
        self.metrics = {}

    def evaluate_retrieval(self, queries: List[str], ground_truth: List[List[int]],
                          retrieved_docs: List[List[Dict[str, Any]]], k: int = 10) -> Dict[str, float]:
        """Evaluate retrieval performance"""
        precision_scores = []
        recall_scores = []
        ndcg_scores = []

        for query_gt, query_results in zip(ground_truth, retrieved_docs):
            # Convert retrieved docs to binary relevance (1 if in ground truth, 0 otherwise)
            retrieved_relevance = [1 if i in query_gt else 0 for i in range(len(query_results))]

            # Pad or truncate to k
            retrieved_relevance = retrieved_relevance[:k] + [0] * max(0, k - len(retrieved_relevance))

            # Perfect relevance for NDCG calculation
            perfect_relevance = [1] * min(len(query_gt), k) + [0] * max(0, k - len(query_gt))

            # Calculate metrics
            precision_at_k = sum(retrieved_relevance) / k
            recall_at_k = sum(retrieved_relevance) / len(query_gt) if query_gt else 0
            ndcg_at_k = ndcg_score([perfect_relevance], [retrieved_relevance], k=k)

            precision_scores.append(precision_at_k)
            recall_scores.append(recall_at_k)
            ndcg_scores.append(ndcg_at_k)

        return {
            f'precision@{k}': np.mean(precision_scores),
            f'recall@{k}': np.mean(recall_scores),
            f'ndcg@{k}': np.mean(ndcg_scores)
        }

    def evaluate_generation(self, generated_answers: List[str],
                           reference_answers: List[str]) -> Dict[str, float]:
        """Evaluate generation quality using simple metrics"""
        rouge_scores = []
        bert_scores = []

        for gen_answer, ref_answer in zip(generated_answers, reference_answers):
            # Simple ROUGE-like overlap (word overlap)
            gen_words = set(gen_answer.lower().split())
            ref_words = set(ref_answer.lower().split())

            overlap = len(gen_words.intersection(ref_words))
            union = len(gen_words.union(ref_words))

            rouge_score = overlap / union if union > 0 else 0
            rouge_scores.append(rouge_score)

            # Simple BERT-like score (cosine similarity of embeddings would be better)
            # For now, use word overlap as proxy
            bert_scores.append(rouge_score)

        return {
            'rouge_score': np.mean(rouge_scores),
            'bert_score': np.mean(bert_scores)
        }

    def evaluate_end_to_end(self, queries: List[str], generated_answers: List[str],
                          retrieved_docs: List[List[Dict[str, Any]]],
                          ground_truth_answers: List[str] = None) -> Dict[str, Any]:
        """Comprehensive end-to-end evaluation"""
        results = {
            'retrieval_metrics': {},
            'generation_metrics': {},
            'latency': {},
            'success_rate': 0
        }

        # Evaluate retrieval if we have ground truth relevance
        if ground_truth_answers:
            # This would require ground truth relevance judgments
            # For now, skip detailed retrieval evaluation
            pass

        # Evaluate generation quality
        if ground_truth_answers:
            results['generation_metrics'] = self.evaluate_generation(
                generated_answers, ground_truth_answers
            )

        # Measure latency (would need actual timing)
        results['latency'] = {'average_response_time': 0.0}  # Placeholder

        # Calculate success rate (answers that are not errors)
        successful_answers = [ans for ans in generated_answers if not self._is_error_response(ans)]
        results['success_rate'] = len(successful_answers) / len(generated_answers)

        return results

    def _is_error_response(self, response: str) -> bool:
        """Check if response indicates an error"""
        error_indicators = [
            'i apologize', 'error', 'sorry', 'unable to', 'cannot',
            'encountered an error', 'failed to'
        ]
        return any(indicator in response.lower() for indicator in error_indicators)`,
    ],
    outcomes: [
      "Document loading system implemented!",
      "Text splitting strategies created!",
      "Embedding generation working!",
      "Vector similarity search active!",
      "Retrieval system set up!",
      "Context injection configured!",
      "RAG pipeline built successfully!",
      "Query reformulation techniques added!",
      "Hybrid search combining methods!",
      "RAG evaluation metrics developed!",
    ]
  },
  // Add other chapters...
};

chapters.forEach((chapter) => {
  const chapterDir = path.join(baseDir, chapter);
  if (!fs.existsSync(chapterDir)) fs.mkdirSync(chapterDir, { recursive: true });

  // Create guidelines
  const guidelines = {
    [chapter]: `## What You Will Learn\n\nMaster ${chapter.replace(/_/g, " ")} through hands-on practical missions.`,
  };
  fs.writeFileSync(
    path.join(chapterDir, "guidelines.json"),
    JSON.stringify(guidelines, null, 2),
  );

  // Generate mission files
  for (let i = 1; i <= 10; i++) {
    const missionId = `mission_${String(i).padStart(2, "0")}`;
    const missionDir = path.join(chapterDir, missionId);
    if (!fs.existsSync(missionDir))
      fs.mkdirSync(missionDir, { recursive: true });

    const missionIndex = i - 1;
    const title = missionData[chapter].titles[missionIndex];
    const description = missionData[chapter].descriptions[missionIndex];
    const hints = missionData[chapter].hints[missionIndex];
    const solution = missionData[chapter].solutions[missionIndex];
    const outcome = missionData[chapter].outcomes[missionIndex];

    // Generate games.json
    const gamesData = {
      title,
      initialState: { content: solution.split('\\n').slice(0, 5).join('\\n') + '\\n    # TODO: Complete the implementation' },
      validation: {
        type: "ai_code",
        rules: ["must_include:def", "must_include:return"],
      },
      id: missionId,
      type: "ai_code",
      xpReward: 50 + i * 10,
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
      JSON.stringify(gamesData, null, 2),
    );

    fs.writeFileSync(
      path.join(missionDir, "descriptions.json"),
      JSON.stringify(descriptionsData, null, 2),
    );

    fs.writeFileSync(
      path.join(missionDir, "hints.json"),
      JSON.stringify(hintsData, null, 2),
    );

    fs.writeFileSync(
      path.join(missionDir, "solutions.json"),
      JSON.stringify(solutionsData, null, 2),
    );

    fs.writeFileSync(
      path.join(missionDir, "outcomes.json"),
      JSON.stringify(outcomesData, null, 2),
    );
  }

  console.log(`${chapter}: 10 missions with full content created`);
});

console.log("AI Engineering comprehensive content generation complete!");`);