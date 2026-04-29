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
  }
};

// Generate content for AI fundamentals chapter
function generateAIFundamentals() {
  const chapter = 'ai_fundamentals';
  const chapterDir = path.join(baseDir, chapter);

  if (!fs.existsSync(chapterDir)) {
    fs.mkdirSync(chapterDir, { recursive: true });
  }

  // Create guidelines
  const guidelines = {
    [chapter]: "## What You Will Learn\\n\\nMaster ai fundamentals through hands-on practical missions."
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

// Run the generator
generateAIFundamentals();
console.log("AI Fundamentals chapter content generation complete!");