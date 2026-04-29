const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

// Complete AI Engineering mission data
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
            words.extend(re.findall(r'\\b\\w+\\b', text.lower()))

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
        tokens = re.findall(r'\\b\\w+\\b', text.lower())
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
  }
};

// Generate content for specified chapters
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

// Generate all chapters
const chapters = Object.keys(missionData);
chapters.forEach(chapter => {
  generateChapterContent(chapter);
});

console.log("AI Engineering comprehensive content generation complete!");