const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

// Update AI fundamentals missions 2-5 with detailed content
function updateMissions2to5() {
  const chapter = 'ai_fundamentals';

  // Mission 2: Machine Learning Fundamentals
  updateMission(chapter, 'mission_02',
    "Machine Learning Fundamentals",
    "Implement core machine learning concepts by creating functions that demonstrate the differences between supervised, unsupervised, and reinforcement learning. Include examples of algorithms, use cases, and when to choose each approach.",
    [
      "Focus on the learning approach: with/without labels, teacher vs self-learning",
      "Consider the goal: prediction vs pattern discovery vs sequential decision making",
      "Think about data requirements and computational complexity"
    ],
    `import numpy as np

def machine_learning_fundamentals():
    """
    Comprehensive comparison of ML learning paradigms
    """
    ml_paradigms = {
        "supervised_learning": {
            "definition": "Learning from labeled training data to predict outputs for new inputs",
            "data_requirement": "Requires input-output pairs (labeled dataset)",
            "goal": "Learn mapping function f: X → Y",
            "algorithms": ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "SVM", "Neural Networks"],
            "use_cases": ["Spam detection", "Price prediction", "Medical diagnosis", "Image classification"],
            "evaluation": ["Accuracy", "Precision", "Recall", "F1-Score", "MSE", "MAE"],
            "advantages": ["Predictive accuracy", "Interpretability", "Well-established methods"],
            "limitations": ["Requires labeled data", "May overfit", "Can't handle novel classes"]
        },
        "unsupervised_learning": {
            "definition": "Finding hidden patterns and structures in unlabeled data",
            "data_requirement": "Only input data X (no labels required)",
            "goal": "Discover underlying structure in data",
            "algorithms": ["K-Means Clustering", "Hierarchical Clustering", "PCA", "t-SNE", "Gaussian Mixture Models", "Autoencoders"],
            "use_cases": ["Customer segmentation", "Anomaly detection", "Dimensionality reduction", "Recommendation systems"],
            "evaluation": ["Silhouette Score", "Calinski-Harabasz Index", "Explained Variance", "Reconstruction Error"],
            "advantages": ["No labeled data needed", "Discover hidden patterns", "Exploratory analysis"],
            "limitations": ["Harder to evaluate", "Results may be subjective", "Computational complexity"]
        },
        "reinforcement_learning": {
            "definition": "Learning through interaction with environment using rewards/penalties",
            "data_requirement": "State-action-reward sequences from environment interaction",
            "goal": "Maximize cumulative reward through optimal policy learning",
            "algorithms": ["Q-Learning", "SARSA", "Deep Q Networks", "Policy Gradient", "Actor-Critic"],
            "use_cases": ["Game playing", "Robotics", "Autonomous vehicles", "Resource management", "Recommendation systems"],
            "evaluation": ["Average reward", "Cumulative reward", "Convergence stability", "Sample efficiency"],
            "advantages": ["Handles sequential decision making", "Learns from interaction", "Adapts to changing environments"],
            "limitations": ["Sample inefficiency", "Reward design crucial", "Exploration-exploitation tradeoff"]
        },
        "comparison_and_selection": {
            "when_to_use_supervised": ["Clear input-output relationship exists", "Labeled training data available", "Prediction accuracy is primary goal"],
            "when_to_use_unsupervised": ["No labels available", "Exploring data structure", "Finding hidden patterns", "Preprocessing for supervised learning"],
            "when_to_use_reinforcement": ["Sequential decision making", "Environment interaction possible", "Delayed rewards", "Adaptive behavior needed"],
            "hybrid_approaches": ["Semi-supervised learning", "Self-supervised learning", "Inverse reinforcement learning"]
        }
    }

    return ml_paradigms`,
    "Mastered machine learning fundamentals and paradigm comparisons!"
  );

  // Mission 3: Supervised Learning Deep Dive
  updateMission(chapter, 'mission_03',
    "Supervised Learning Deep Dive",
    "Develop a complete supervised learning pipeline that includes data preprocessing, model training, and prediction. Implement linear regression from scratch with gradient descent optimization and evaluate its performance on a sample dataset.",
    [
      "Implement gradient descent step by step: forward pass, loss calculation, backward pass, parameter update",
      "Use numpy for matrix operations and avoid loops where possible",
      "Add learning rate decay and convergence checking"
    ],
    `import numpy as np

def linear_regression_pipeline(X, y, learning_rate=0.01, epochs=1000, test_size=0.2):
    """
    Complete supervised learning pipeline with linear regression
    """
    # Step 1: Data preprocessing
    def preprocess_data(X, y):
        # Add bias term (intercept)
        X_bias = np.c_[np.ones(X.shape[0]), X]

        # Feature scaling (standardization)
        X_mean = np.mean(X_bias, axis=0)
        X_std = np.std(X_bias, axis=0)
        X_std[X_std == 0] = 1  # Avoid division by zero
        X_scaled = (X_bias - X_mean) / X_std

        return X_scaled, y, X_mean, X_std

    # Step 2: Train-validation-test split
    def split_data(X, y, test_size=0.2, val_size=0.2):
        n_samples = X.shape[0]
        n_val = int(n_samples * val_size)

        # Shuffle indices
        indices = np.random.permutation(n_samples)

        # Split indices
        test_indices = indices[:int(n_samples * test_size)]
        val_indices = indices[int(n_samples * test_size):int(n_samples * test_size) + n_val]
        train_indices = indices[int(n_samples * test_size) + n_val:]

        return X[train_indices], X[val_indices], X[test_indices], y[train_indices], y[val_indices], y[test_indices]

    # Step 3: Linear regression training
    def train_linear_regression(X_train, y_train, learning_rate, epochs):
        n_samples, n_features = X_train.shape
        weights = np.zeros(n_features)

        # Training history
        losses = []

        for epoch in range(epochs):
            # Forward pass
            y_pred = np.dot(X_train, weights)

            # Compute loss (MSE)
            loss = np.mean((y_pred - y_train) ** 2)
            losses.append(loss)

            # Backward pass (gradient)
            gradient = (2/n_samples) * np.dot(X_train.T, (y_pred - y_train))

            # Update weights
            weights -= learning_rate * gradient

            # Early stopping if loss is not decreasing
            if epoch > 10 and abs(losses[-1] - losses[-2]) < 1e-6:
                break

        return weights, losses

    # Step 4: Prediction and evaluation
    def predict(X, weights):
        return np.dot(X, weights)

    def evaluate_model(y_true, y_pred):
        mse = np.mean((y_true - y_pred) ** 2)
        rmse = np.sqrt(mse)
        mae = np.mean(np.abs(y_true - y_pred))
        r2_score = 1 - (np.sum((y_true - y_pred) ** 2) / np.sum((y_true - np.mean(y_true)) ** 2))

        return {
            'MSE': mse,
            'RMSE': rmse,
            'MAE': mae,
            'R²': r2_score
        }

    # Execute pipeline
    print("Starting Linear Regression Pipeline...")

    # Preprocess data
    X_processed, y_processed, X_mean, X_std = preprocess_data(X, y)
    print(f"Data preprocessed: {X_processed.shape[0]} samples, {X_processed.shape[1]} features")

    # Split data
    X_train, X_val, X_test, y_train, y_val, y_test = split_data(X_processed, y_processed, test_size)
    print(f"Data split: Train {X_train.shape[0]}, Val {X_val.shape[0]}, Test {X_test.shape[0]}")

    # Train model
    weights, losses = train_linear_regression(X_train, y_train, learning_rate, epochs)
    print(f"Model trained for {len(losses)} epochs, final loss: {losses[-1]:.6f}")

    # Evaluate on validation set
    y_val_pred = predict(X_val, weights)
    val_metrics = evaluate_model(y_val, y_val_pred)
    print(f"Validation metrics: {val_metrics}")

    # Evaluate on test set
    y_test_pred = predict(X_test, weights)
    test_metrics = evaluate_model(y_test, y_test_pred)
    print(f"Test metrics: {test_metrics}")

    return {
        'weights': weights,
        'training_losses': losses,
        'validation_metrics': val_metrics,
        'test_metrics': test_metrics,
        'feature_means': X_mean,
        'feature_stds': X_std
    }`,
    "Implemented complete supervised learning pipeline with proper validation!"
  );

  // Mission 4: Unsupervised Learning Algorithms
  updateMission(chapter, 'mission_04',
    "Unsupervised Learning Algorithms",
    "Create an unsupervised learning system that implements K-means clustering and hierarchical clustering algorithms. Include data preprocessing, cluster visualization, and evaluation metrics like silhouette score.",
    [
      "Implement distance metrics (Euclidean, Manhattan, Cosine)",
      "Initialize centroids randomly but try multiple initializations",
      "Use elbow method and silhouette analysis for optimal k selection"
    ],
    `import numpy as np
from sklearn.datasets import make_blobs

def unsupervised_learning_system():
    """
    Complete unsupervised learning system with clustering algorithms
    """
    # K-means clustering implementation
    class KMeansClustering:
        def __init__(self, n_clusters=3, max_iters=100, tol=1e-4, n_init=10):
            self.n_clusters = n_clusters
            self.max_iters = max_iters
            self.tol = tol
            self.n_init = n_init
            self.centroids = None
            self.labels = None
            self.inertia = None

        def fit(self, X):
            best_centroids = None
            best_labels = None
            best_inertia = float('inf')

            for init in range(self.n_init):
                centroids = self._initialize_centroids(X)

                for iteration in range(self.max_iters):
                    # Assign clusters
                    labels = self._assign_clusters(X, centroids)

                    # Update centroids
                    new_centroids = self._update_centroids(X, labels)

                    # Check convergence
                    if np.allclose(centroids, new_centroids, atol=self.tol):
                        break

                    centroids = new_centroids

                # Calculate inertia
                inertia = self._calculate_inertia(X, centroids, labels)

                # Keep best initialization
                if inertia < best_inertia:
                    best_centroids = centroids
                    best_labels = labels
                    best_inertia = inertia

            self.centroids = best_centroids
            self.labels = best_labels
            self.inertia = best_inertia

            return self

        def _initialize_centroids(self, X):
            # Random initialization from data points
            indices = np.random.choice(X.shape[0], self.n_clusters, replace=False)
            return X[indices].copy()

        def _assign_clusters(self, X, centroids):
            distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
            return np.argmin(distances, axis=1)

        def _update_centroids(self, X, labels):
            centroids = np.zeros_like(self.centroids)
            for k in range(self.n_clusters):
                cluster_points = X[labels == k]
                if len(cluster_points) > 0:
                    centroids[k] = np.mean(cluster_points, axis=0)
            return centroids

        def _calculate_inertia(self, X, centroids, labels):
            distances = np.linalg.norm(X - centroids[labels], axis=1)
            return np.sum(distances ** 2)

        def predict(self, X):
            return self._assign_clusters(X, self.centroids)

    # Hierarchical clustering implementation
    class HierarchicalClustering:
        def __init__(self, n_clusters=3, linkage='single'):
            self.n_clusters = n_clusters
            self.linkage = linkage
            self.labels = None

        def fit(self, X):
            n_samples = X.shape[0]
            # Initialize each point as its own cluster
            clusters = [[i] for i in range(n_samples)]
            distances = self._compute_distance_matrix(X)

            while len(clusters) > self.n_clusters:
                # Find closest clusters
                min_dist = float('inf')
                merge_i, merge_j = -1, -1

                for i in range(len(clusters)):
                    for j in range(i + 1, len(clusters)):
                        dist = self._cluster_distance(clusters[i], clusters[j], distances)
                        if dist < min_dist:
                            min_dist = dist
                            merge_i, merge_j = i, j

                # Merge clusters
                clusters[merge_i].extend(clusters[merge_j])
                del clusters[merge_j]

            # Assign labels
            self.labels = np.zeros(n_samples, dtype=int)
            for cluster_id, cluster in enumerate(clusters):
                for point_id in cluster:
                    self.labels[point_id] = cluster_id

            return self

        def _compute_distance_matrix(self, X):
            n_samples = X.shape[0]
            distances = np.zeros((n_samples, n_samples))
            for i in range(n_samples):
                for j in range(i + 1, n_samples):
                    distances[i, j] = distances[j, i] = np.linalg.norm(X[i] - X[j])
            return distances

        def _cluster_distance(self, cluster1, cluster2, distances):
            if self.linkage == 'single':
                # Minimum distance between clusters
                min_dist = float('inf')
                for i in cluster1:
                    for j in cluster2:
                        min_dist = min(min_dist, distances[i, j])
                return min_dist
            elif self.linkage == 'complete':
                # Maximum distance between clusters
                max_dist = 0
                for i in cluster1:
                    for j in cluster2:
                        max_dist = max(max_dist, distances[i, j])
                return max_dist
            else:  # average
                total_dist = 0
                count = 0
                for i in cluster1:
                    for j in cluster2:
                        total_dist += distances[i, j]
                        count += 1
                return total_dist / count

    # Evaluation metrics
    def calculate_silhouette_score(X, labels):
        """Calculate silhouette score for clustering evaluation"""
        n_samples = X.shape[0]
        silhouette_scores = []

        for i in range(n_samples):
            # Points in same cluster as i
            same_cluster = X[labels == labels[i]]
            # Points in different clusters
            different_clusters = X[labels != labels[i]]

            # Calculate a(i): average distance to points in same cluster
            if len(same_cluster) > 1:
                same_cluster_distances = np.linalg.norm(same_cluster - X[i], axis=1)
                a_i = np.mean(same_cluster_distances[same_cluster_distances > 0])
            else:
                a_i = 0

            # Calculate b(i): minimum average distance to points in other clusters
            b_i = float('inf')
            unique_labels = np.unique(labels)
            for label in unique_labels:
                if label != labels[i]:
                    other_cluster = X[labels == label]
                    if len(other_cluster) > 0:
                        distances = np.linalg.norm(other_cluster - X[i], axis=1)
                        avg_distance = np.mean(distances)
                        b_i = min(b_i, avg_distance)

            # Calculate silhouette score for point i
            if a_i == 0 and b_i == float('inf'):
                s_i = 0
            elif a_i == 0:
                s_i = 1
            elif b_i == float('inf'):
                s_i = -1
            else:
                s_i = (b_i - a_i) / max(a_i, b_i)

            silhouette_scores.append(s_i)

        return np.mean(silhouette_scores)

    # Main clustering pipeline
    def clustering_pipeline(X, n_clusters_range=range(2, 8)):
        print("Starting Unsupervised Learning Clustering Pipeline...")

        # Generate sample data if none provided
        if X is None:
            X, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)
            print(f"Generated sample data: {X.shape[0]} samples, {X.shape[1]} features")

        # Evaluate different numbers of clusters for K-means
        kmeans_results = {}
        for n_clusters in n_clusters_range:
            kmeans = KMeansClustering(n_clusters=n_clusters)
            kmeans.fit(X)

            silhouette = calculate_silhouette_score(X, kmeans.labels)

            kmeans_results[n_clusters] = {
                'model': kmeans,
                'silhouette_score': silhouette,
                'inertia': kmeans.inertia
            }

            print(f"K-means with {n_clusters} clusters: Silhouette = {silhouette:.3f}, Inertia = {kmeans.inertia:.2f}")

        # Find best K-means result
        best_k = max(kmeans_results.keys(), key=lambda k: kmeans_results[k]['silhouette_score'])
        best_kmeans = kmeans_results[best_k]['model']

        # Perform hierarchical clustering
        hierarchical = HierarchicalClustering(n_clusters=best_k)
        hierarchical.fit(X)
        hierarchical_silhouette = calculate_silhouette_score(X, hierarchical.labels)

        print(f"Hierarchical clustering: Silhouette = {hierarchical_silhouette:.3f}")

        return {
            'kmeans_results': kmeans_results,
            'best_kmeans': best_kmeans,
            'hierarchical': hierarchical,
            'data': X
        }

    # Run the pipeline
    results = clustering_pipeline(None)  # Use generated data

    return results`,
    "Built comprehensive unsupervised learning system with clustering algorithms!"
  );

  // Mission 5: Neural Network Architecture
  updateMission(chapter, 'mission_05',
    "Neural Network Architecture",
    "Design and implement a basic neural network architecture from scratch. Include forward propagation, backpropagation, activation functions, and weight initialization. Train it on a simple classification task.",
    [
      "Start with a simple 2-layer network: input → hidden → output",
      "Implement sigmoid/tanh/ReLU activation functions",
      "Use proper weight initialization to avoid vanishing gradients"
    ],
    `import numpy as np

def neural_network_from_scratch():
    """
    Complete neural network implementation from scratch
    """
    class NeuralNetwork:
        def __init__(self, input_size, hidden_size, output_size, learning_rate=0.1):
            self.input_size = input_size
            self.hidden_size = hidden_size
            self.output_size = output_size
            self.learning_rate = learning_rate

            # Initialize weights and biases using Xavier initialization
            self.W1 = np.random.randn(input_size, hidden_size) * np.sqrt(2.0 / input_size)
            self.b1 = np.zeros((1, hidden_size))
            self.W2 = np.random.randn(hidden_size, output_size) * np.sqrt(2.0 / hidden_size)
            self.b2 = np.zeros((1, output_size))

        def sigmoid(self, x):
            return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

        def sigmoid_derivative(self, x):
            return x * (1 - x)

        def relu(self, x):
            return np.maximum(0, x)

        def relu_derivative(self, x):
            return np.where(x > 0, 1, 0)

        def forward(self, X):
            """Forward propagation"""
            # Hidden layer
            self.Z1 = np.dot(X, self.W1) + self.b1
            self.A1 = self.relu(self.Z1)

            # Output layer
            self.Z2 = np.dot(self.A1, self.W2) + self.b2
            self.A2 = self.sigmoid(self.Z2)

            return self.A2

        def backward(self, X, y, output):
            """Backward propagation"""
            m = X.shape[0]

            # Output layer error
            dZ2 = output - y
            dW2 = np.dot(self.A1.T, dZ2) / m
            db2 = np.sum(dZ2, axis=0, keepdims=True) / m

            # Hidden layer error
            dZ1 = np.dot(dZ2, self.W2.T) * self.relu_derivative(self.A1)
            dW1 = np.dot(X.T, dZ1) / m
            db1 = np.sum(dZ1, axis=0, keepdims=True) / m

            # Update weights and biases
            self.W2 -= self.learning_rate * dW2
            self.b2 -= self.learning_rate * db2
            self.W1 -= self.learning_rate * dW1
            self.b1 -= self.learning_rate * db1

        def train(self, X, y, epochs=1000, batch_size=32, verbose=True):
            """Train the neural network"""
            losses = []

            for epoch in range(epochs):
                # Mini-batch training
                for i in range(0, len(X), batch_size):
                    X_batch = X[i:i+batch_size]
                    y_batch = y[i:i+batch_size]

                    # Forward pass
                    output = self.forward(X_batch)

                    # Compute loss
                    loss = -np.mean(y_batch * np.log(output + 1e-8) + (1 - y_batch) * np.log(1 - output + 1e-8))
                    losses.append(loss)

                    # Backward pass
                    self.backward(X_batch, y_batch, output)

                if verbose and (epoch + 1) % 100 == 0:
                    print(f"Epoch {epoch + 1}/{epochs}, Loss: {loss:.6f}")

            return losses

        def predict(self, X):
            """Make predictions"""
            output = self.forward(X)
            return (output > 0.5).astype(int)

        def predict_proba(self, X):
            """Predict probabilities"""
            return self.forward(X)

    def create_classification_dataset(n_samples=1000, n_features=2, n_classes=2):
        """Create a synthetic classification dataset"""
        np.random.seed(42)

        # Create two classes with different distributions
        X_class1 = np.random.randn(n_samples // 2, n_features) + np.array([1, 1])
        X_class2 = np.random.randn(n_samples // 2, n_features) + np.array([-1, -1])

        X = np.vstack([X_class1, X_class2])
        y = np.hstack([np.zeros(n_samples // 2), np.ones(n_samples // 2)])

        # Add some noise
        X += 0.1 * np.random.randn(*X.shape)

        return X, y.reshape(-1, 1)

    def evaluate_neural_network(X_train, y_train, X_test, y_test):
        """Train and evaluate the neural network"""
        print("Creating Neural Network...")

        input_size = X_train.shape[1]
        hidden_size = 16
        output_size = 1

        nn = NeuralNetwork(input_size, hidden_size, output_size)

        print("Training Neural Network...")
        losses = nn.train(X_train, y_train, epochs=500, verbose=False)

        print("Evaluating Neural Network...")

        # Training predictions
        train_predictions = nn.predict(X_train)
        train_accuracy = np.mean(train_predictions == y_train)

        # Test predictions
        test_predictions = nn.predict(X_test)
        test_accuracy = np.mean(test_predictions == y_test)

        print(f"Training Accuracy: {train_accuracy:.4f}")
        print(f"Test Accuracy: {test_accuracy:.4f}")
        print(f"Final Loss: {losses[-1]:.6f}")

        return {
            'model': nn,
            'training_losses': losses,
            'train_accuracy': train_accuracy,
            'test_accuracy': test_accuracy
        }

    # Create dataset
    X, y = create_classification_dataset()
    print(f"Dataset created: {X.shape[0]} samples, {X.shape[1]} features")

    # Split data
    split_idx = int(0.8 * len(X))
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]

    # Train and evaluate
    results = evaluate_neural_network(X_train, y_train, X_test, y_test)

    return results`,
    "Created neural network from scratch with proper training and evaluation!"
  );
}

function updateMission(chapter, missionId, title, description, hints, solution, outcome) {
  const missionDir = path.join(baseDir, chapter, missionId);

  // Update games.json
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
    xpReward: 50 + parseInt(missionId.split('_')[1]) * 10
  };

  // Update other files
  const descriptionsData = { [missionId]: description };
  const hintsData = { [missionId]: hints };
  const solutionsData = { [missionId]: solution };
  const outcomesData = { [missionId]: outcome };

  // Write files
  fs.writeFileSync(path.join(missionDir, "games.json"), JSON.stringify(gamesData, null, 2));
  fs.writeFileSync(path.join(missionDir, "descriptions.json"), JSON.stringify(descriptionsData, null, 2));
  fs.writeFileSync(path.join(missionDir, "hints.json"), JSON.stringify(hintsData, null, 2));
  fs.writeFileSync(path.join(missionDir, "solutions.json"), JSON.stringify(solutionsData, null, 2));
  fs.writeFileSync(path.join(missionDir, "outcomes.json"), JSON.stringify(outcomesData, null, 2));

  console.log(`${missionId}: Updated with detailed mission content!`);
}

// Run the updates
updateMissions2to5();
console.log("AI Fundamentals missions 2-5 update completed!");