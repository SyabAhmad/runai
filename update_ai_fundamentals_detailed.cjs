const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

// Comprehensive AI Engineering mission data with proper, detailed content
const detailedMissionData = {
  ai_fundamentals: {
    titles: [
      "Understanding AI Paradigms",
      "Machine Learning Fundamentals",
      "Supervised Learning Deep Dive",
      "Unsupervised Learning Algorithms",
      "Neural Network Architecture",
      "Loss Functions and Optimization",
      "Model Training Pipeline",
      "Data Splitting Strategies",
      "Overfitting Prevention Techniques",
      "Model Evaluation Metrics"
    ],
    descriptions: [
      "Build a comprehensive explanation of the relationships between Artificial Intelligence, Machine Learning, and Deep Learning. Create a function that returns a detailed comparison including historical context, key differences, real-world applications, and learning approaches.",
      "Implement core machine learning concepts by creating functions that demonstrate the differences between supervised, unsupervised, and reinforcement learning. Include examples of algorithms, use cases, and when to choose each approach.",
      "Develop a complete supervised learning pipeline that includes data preprocessing, model training, and prediction. Implement linear regression from scratch with gradient descent optimization and evaluate its performance on a sample dataset.",
      "Create an unsupervised learning system that implements K-means clustering and hierarchical clustering algorithms. Include data preprocessing, cluster visualization, and evaluation metrics like silhouette score.",
      "Design and implement a basic neural network architecture from scratch. Include forward propagation, backpropagation, activation functions, and weight initialization. Train it on a simple classification task.",
      "Implement and compare different loss functions (MSE, MAE, Cross-Entropy, Hinge Loss) for various machine learning tasks. Create a function that selects the appropriate loss function based on the problem type.",
      "Build a complete model training pipeline that includes data loading, preprocessing, model initialization, training loop with early stopping, validation, and model saving. Use proper error handling and logging.",
      "Create robust data splitting functions that implement train/validation/test splits with stratification, cross-validation, and time series splitting. Include proper randomization and ensure no data leakage.",
      "Implement multiple overfitting prevention techniques including L1/L2 regularization, dropout, early stopping, data augmentation, and ensemble methods. Create a comprehensive regularization toolkit.",
      "Develop a complete model evaluation framework that calculates accuracy, precision, recall, F1-score, ROC-AUC, confusion matrix, and other relevant metrics. Include visualization capabilities."
    ],
    hints: [
      ["Start by researching the historical timeline of AI development", "Consider how each field builds upon the previous one", "Think about real-world examples like self-driving cars (AI), recommendation systems (ML), and image recognition (DL)"],
      ["Focus on the learning approach: with/without labels, teacher vs self-learning", "Consider the goal: prediction vs pattern discovery vs sequential decision making", "Think about data requirements and computational complexity"],
      ["Implement gradient descent step by step: forward pass, loss calculation, backward pass, parameter update", "Use numpy for matrix operations and avoid loops where possible", "Add learning rate decay and convergence checking"],
      ["Implement distance metrics (Euclidean, Manhattan, Cosine)", "Initialize centroids randomly but try multiple initializations", "Use elbow method and silhouette analysis for optimal k selection"],
      ["Start with a simple 2-layer network: input → hidden → output", "Implement sigmoid/tanh/ReLU activation functions", "Use proper weight initialization to avoid vanishing gradients"],
      ["MSE for regression, Cross-Entropy for classification", "Consider the mathematical properties: convexity, differentiability", "Think about outlier sensitivity and computational efficiency"],
      ["Structure your code with separate functions for each step", "Implement proper logging and progress tracking", "Add checkpoint saving and model serialization"],
      ["Use sklearn's train_test_split with stratify parameter", "Implement k-fold cross-validation from scratch", "Consider time-based splitting for temporal data"],
      ["L1 regularization (Lasso) encourages sparsity", "L2 regularization (Ridge) prevents large weights", "Dropout randomly deactivates neurons during training"],
      ["Confusion matrix shows true positives, false positives, etc.", "ROC curve plots true positive rate vs false positive rate", "F1-score balances precision and recall"]
    ],
    solutions: [
      `def explain_ai_relationships():
    """
    Comprehensive explanation of AI, ML, and DL relationships
    """
    ai_ml_dl_relationships = {
        "artificial_intelligence": {
            "definition": "Broad field encompassing creation of machines that perform tasks requiring human intelligence",
            "scope": "General intelligence, problem-solving, reasoning, learning, perception",
            "historical_context": "Term coined in 1956 at Dartmouth Conference",
            "examples": ["Chess playing computers", "Autonomous vehicles", "Medical diagnosis systems"],
            "approaches": ["Rule-based systems", "Expert systems", "Machine learning", "Neural networks"]
        },
        "machine_learning": {
            "definition": "Subset of AI focusing on algorithms that learn patterns from data without explicit programming",
            "relationship_to_ai": "ML provides the learning capability that enables AI systems to improve performance",
            "key_characteristics": ["Data-driven learning", "Pattern recognition", "Statistical modeling", "Adaptability"],
            "types": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"],
            "algorithms": ["Decision Trees", "Neural Networks", "Support Vector Machines", "Ensemble Methods"]
        },
        "deep_learning": {
            "definition": "Subset of ML using artificial neural networks with multiple layers (deep architectures)",
            "relationship_to_ml": "DL extends traditional ML by automatically learning hierarchical feature representations",
            "key_innovations": ["Multi-layer neural networks", "Automatic feature learning", "End-to-end learning"],
            "architectures": ["Convolutional Neural Networks (CNN)", "Recurrent Neural Networks (RNN)", "Transformers"],
            "applications": ["Computer vision", "Natural language processing", "Speech recognition", "Generative AI"]
        },
        "relationships_and_differences": {
            "ai_vs_ml": "AI is the goal (intelligent machines), ML is one approach to achieve AI",
            "ml_vs_dl": "ML includes traditional algorithms, DL focuses on deep neural networks",
            "ai_as_umbrella": "AI encompasses ML, DL, and other approaches like symbolic reasoning",
            "complementary_nature": "DL has revolutionized ML capabilities, enabling breakthroughs in AI applications"
        },
        "current_state_and_future": {
            "convergence": "Modern AI systems often combine multiple approaches (hybrid AI)",
            "data_centric": "All three fields increasingly depend on large-scale data and computational power",
            "ethical_considerations": "As AI/ML/DL systems become more powerful, responsible development becomes crucial"
        }
    }

    return ai_ml_dl_relationships

# Usage example
relationships = explain_ai_relationships()
print("AI encompasses:", relationships['artificial_intelligence']['scope'])
print("ML enables:", relationships['machine_learning']['key_characteristics'])
print("DL revolutionizes:", relationships['deep_learning']['applications'])`,
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

    return ml_paradigms

# Usage example
paradigms = machine_learning_fundamentals()
print("Supervised learning requires:", paradigms['supervised_learning']['data_requirement'])
print("Unsupervised learning discovers:", paradigms['unsupervised_learning']['goal'])
print("Reinforcement learning maximizes:", paradigms['reinforcement_learning']['goal'])`,
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
        n_test = int(n_samples * test_size)
        n_val = int(n_samples * val_size)

        # Shuffle indices
        indices = np.random.permutation(n_samples)

        # Split indices
        test_indices = indices[:n_test]
        val_indices = indices[n_test:n_test + n_val]
        train_indices = indices[n_test + n_val:]

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
    }

# Usage example with synthetic data
np.random.seed(42)
X = np.random.randn(1000, 3)  # 1000 samples, 3 features
true_weights = np.array([2.0, -1.5, 3.0])
y = np.dot(X, true_weights) + 0.1 * np.random.randn(1000)  # Add noise

results = linear_regression_pipeline(X, y)
print(f"Learned weights: {results['weights']}")
print(f"True weights: {true_weights}")`,
      `import numpy as np
import matplotlib.pyplot as plt
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

    return results

# Usage example
clustering_results = unsupervised_learning_system()
print("Clustering pipeline completed!")
print(f"Best K-means silhouette score: {max([r['silhouette_score'] for r in clustering_results['kmeans_results'].values()]):.3f}")`,
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

    return results

# Usage example
nn_results = neural_network_from_scratch()
print("Neural network training completed!")
print(f"Test accuracy: {nn_results['test_accuracy']:.4f}")`,
      `import numpy as np

def loss_functions_comparison():
    """
    Implementation and comparison of different loss functions
    """
    class LossFunctions:
        def __init__(self):
            self.losses = {}

        def mean_squared_error(self, y_true, y_pred):
            """MSE - Good for regression, penalizes large errors"""
            return np.mean((y_true - y_pred) ** 2)

        def mean_absolute_error(self, y_true, y_pred):
            """MAE - Good for regression, less sensitive to outliers"""
            return np.mean(np.abs(y_true - y_pred))

        def huber_loss(self, y_true, y_pred, delta=1.0):
            """Huber Loss - Combines MSE and MAE, robust to outliers"""
            errors = y_true - y_pred
            abs_errors = np.abs(errors)
            quadratic = np.minimum(abs_errors, delta)
            linear = abs_errors - quadratic
            return np.mean(0.5 * quadratic ** 2 + delta * linear)

        def binary_cross_entropy(self, y_true, y_pred):
            """Binary Cross-Entropy - For binary classification"""
            epsilon = 1e-15
            y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
            return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

        def categorical_cross_entropy(self, y_true, y_pred):
            """Categorical Cross-Entropy - For multi-class classification"""
            epsilon = 1e-15
            y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
            return -np.mean(np.sum(y_true * np.log(y_pred), axis=1))

        def hinge_loss(self, y_true, y_pred):
            """Hinge Loss - For SVM, encourages correct classification margin"""
            # Convert y_true from {0,1} to {-1,1}
            y_true_hinge = 2 * y_true - 1
            return np.mean(np.maximum(0, 1 - y_true_hinge * y_pred))

        def kullback_leibler_divergence(self, y_true, y_pred):
            """KL Divergence - Measures difference between distributions"""
            epsilon = 1e-15
            y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
            return np.mean(y_true * np.log(y_true / y_pred))

        def get_loss_derivative(self, loss_name, y_true, y_pred):
            """Calculate derivatives for backpropagation"""
            if loss_name == 'mse':
                return -(y_true - y_pred)
            elif loss_name == 'mae':
                return -np.sign(y_true - y_pred)
            elif loss_name == 'binary_crossentropy':
                epsilon = 1e-15
                y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
                return -(y_true / y_pred) + ((1 - y_true) / (1 - y_pred))
            else:
                raise ValueError(f"Derivative not implemented for {loss_name}")

    def loss_function_recommendations():
        """Provide recommendations for choosing loss functions"""
        recommendations = {
            "regression_problems": {
                "mse": "Standard choice, penalizes large errors quadratically",
                "mae": "More robust to outliers, less sensitive to large errors",
                "huber": "Good compromise between MSE and MAE, tunable robustness",
                "when_to_use_mse": "Normally distributed errors, no outliers",
                "when_to_use_mae": "Outliers present, want robust estimation",
                "when_to_use_huber": "Unknown outlier distribution, want balance"
            },
            "binary_classification": {
                "binary_crossentropy": "Standard choice, works with sigmoid activation",
                "hinge": "SVM-style, encourages margin separation",
                "when_to_use_bce": "Probabilistic outputs needed, standard neural networks",
                "when_to_use_hinge": "Maximum margin classification desired"
            },
            "multiclass_classification": {
                "categorical_crossentropy": "Standard choice with softmax activation",
                "sparse_categorical_crossentropy": "When labels are integers, more memory efficient"
            },
            "specialized_problems": {
                "kl_divergence": "Distribution matching, variational autoencoders",
                "custom_losses": "Domain-specific requirements, specialized applications"
            }
        }

        return recommendations

    def compare_losses_on_datasets():
        """Compare different loss functions on various datasets"""
        np.random.seed(42)

        # Generate regression data with outliers
        X_reg = np.random.randn(1000, 1)
        y_reg = 2 * X_reg.squeeze() + 0.1 * np.random.randn(1000)

        # Add outliers
        outlier_indices = np.random.choice(1000, 50, replace=False)
        y_reg[outlier_indices] += np.random.randn(50) * 5

        # Generate classification data
        X_class = np.random.randn(1000, 2)
        y_class = (X_class[:, 0] + X_class[:, 1] > 0).astype(int)

        loss_fn = LossFunctions()

        # Test regression losses
        print("Regression Loss Comparison:")
        y_pred_reg = 2 * X_reg.squeeze() + 0.1 * np.random.randn(1000)  # Imperfect predictions

        mse_loss = loss_fn.mean_squared_error(y_reg, y_pred_reg)
        mae_loss = loss_fn.mean_absolute_error(y_reg, y_pred_reg)
        huber_loss = loss_fn.huber_loss(y_reg, y_pred_reg)

        print(f"MSE Loss: {mse_loss:.4f}")
        print(f"MAE Loss: {mae_loss:.4f}")
        print(f"Huber Loss: {huber_loss:.4f}")

        # Test classification losses
        print("\\nBinary Classification Loss Comparison:")
        # Simulate neural network outputs (sigmoid probabilities)
        y_pred_class = 1 / (1 + np.exp(-(X_class[:, 0] + X_class[:, 1] + 0.1 * np.random.randn(1000))))

        bce_loss = loss_fn.binary_cross_entropy(y_class, y_pred_class)
        hinge_loss_val = loss_fn.hinge_loss(y_class, y_pred_class)

        print(f"Binary Cross-Entropy Loss: {bce_loss:.4f}")
        print(f"Hinge Loss: {hinge_loss_val:.4f}")

        return {
            'regression_losses': {'mse': mse_loss, 'mae': mae_loss, 'huber': huber_loss},
            'classification_losses': {'bce': bce_loss, 'hinge': hinge_loss_val}
        }

    # Main execution
    print("Loss Functions Analysis")
    print("=" * 50)

    # Get recommendations
    recommendations = loss_function_recommendations()
    print("\\nRecommendations for Regression:")
    for loss, desc in recommendations['regression_problems'].items():
        if not loss.startswith('when_to_use'):
            print(f"- {loss.upper()}: {desc}")

    # Compare losses
    comparison_results = compare_losses_on_datasets()

    return {
        'recommendations': recommendations,
        'comparison_results': comparison_results
    }

# Usage example
loss_analysis = loss_functions_comparison()
print("\\nLoss function analysis completed!")`,
      `import numpy as np
import os
import pickle
import time
from typing import Dict, List, Any

def complete_training_pipeline(X, y, model_type='linear_regression', config=None):
    """
    Complete model training pipeline with all best practices
    """
    if config is None:
        config = {
            'learning_rate': 0.01,
            'epochs': 1000,
            'batch_size': 32,
            'early_stopping_patience': 50,
            'validation_split': 0.2,
            'checkpoint_dir': './checkpoints',
            'log_interval': 10
        }

    class TrainingPipeline:
        def __init__(self, config):
            self.config = config
            self.history = {
                'train_loss': [],
                'val_loss': [],
                'train_metric': [],
                'val_metric': [],
                'epochs': []
            }
            self.best_model = None
            self.best_val_loss = float('inf')
            self.early_stopping_counter = 0

        def setup_data(self, X, y):
            """Setup data splits and preprocessing"""
            print("Setting up data...")

            # Train-validation split
            n_samples = X.shape[0]
            n_val = int(n_samples * self.config['validation_split'])
            indices = np.random.permutation(n_samples)

            train_indices = indices[n_val:]
            val_indices = indices[:n_val]

            X_train, X_val = X[train_indices], X[val_indices]
            y_train, y_val = y[train_indices], y[val_indices]

            # Preprocessing
            self.scaler_params = self._fit_scaler(X_train)
            X_train_scaled = self._transform_data(X_train)
            X_val_scaled = self._transform_data(X_val)

            return X_train_scaled, X_val_scaled, y_train, y_val

        def _fit_scaler(self, X):
            """Fit data scaler"""
            mean = np.mean(X, axis=0)
            std = np.std(X, axis=0)
            std = np.where(std == 0, 1, std)  # Avoid division by zero
            return {'mean': mean, 'std': std}

        def _transform_data(self, X):
            """Transform data using fitted scaler"""
            return (X - self.scaler_params['mean']) / self.scaler_params['std']

        def create_model(self, input_dim, output_dim):
            """Create model based on type"""
            if model_type == 'linear_regression':
                return LinearRegressionModel(input_dim, output_dim)
            elif model_type == 'neural_network':
                return NeuralNetworkModel(input_dim, 64, output_dim)
            else:
                raise ValueError(f"Unknown model type: {model_type}")

        def train_epoch(self, model, X_batch, y_batch):
            """Train for one epoch"""
            if hasattr(model, 'train_step'):
                return model.train_step(X_batch, y_batch)
            else:
                # Simple gradient descent for linear regression
                y_pred = model.predict(X_batch)
                loss = np.mean((y_pred - y_batch) ** 2)

                # Gradient
                grad = np.dot(X_batch.T, (y_pred - y_batch)) / len(X_batch)

                # Update
                model.weights -= self.config['learning_rate'] * grad

                return loss

        def validate(self, model, X_val, y_val):
            """Validate model"""
            y_pred = model.predict(X_val)
            val_loss = np.mean((y_pred - y_val) ** 2)

            # Additional metrics
            mae = np.mean(np.abs(y_pred - y_val))
            rmse = np.sqrt(val_loss)

            return val_loss, {'mae': mae, 'rmse': rmse}

        def save_checkpoint(self, model, epoch, val_loss):
            """Save model checkpoint"""
            if not os.path.exists(self.config['checkpoint_dir']):
                os.makedirs(self.config['checkpoint_dir'])

            checkpoint = {
                'epoch': epoch,
                'model_state': model.get_state(),
                'val_loss': val_loss,
                'scaler_params': self.scaler_params,
                'config': self.config
            }

            filepath = os.path.join(self.config['checkpoint_dir'], f'checkpoint_epoch_{epoch}.pkl')
            with open(filepath, 'wb') as f:
                pickle.dump(checkpoint, f)

        def load_checkpoint(self, filepath):
            """Load model checkpoint"""
            with open(filepath, 'rb') as f:
                checkpoint = pickle.load(f)
            return checkpoint

        def train(self, X, y):
            """Main training loop"""
            print("Starting training pipeline...")

            # Setup data
            X_train, X_val, y_train, y_val = self.setup_data(X, y)

            # Create model
            model = self.create_model(X_train.shape[1], y_train.shape[1] if len(y_train.shape) > 1 else 1)

            # Training loop
            start_time = time.time()

            for epoch in range(self.config['epochs']):
                # Create batches
                for i in range(0, len(X_train), self.config['batch_size']):
                    X_batch = X_train[i:i+self.config['batch_size']]
                    y_batch = y_train[i:i+self.config['batch_size']]

                    # Train step
                    train_loss = self.train_epoch(model, X_batch, y_batch)

                # Validation
                val_loss, val_metrics = self.validate(model, X_val, y_val)

                # Record history
                self.history['train_loss'].append(train_loss)
                self.history['val_loss'].append(val_loss)
                self.history['train_metric'].append({'loss': train_loss})
                self.history['val_metric'].append(val_metrics)
                self.history['epochs'].append(epoch)

                # Early stopping
                if val_loss < self.best_val_loss:
                    self.best_val_loss = val_loss
                    self.best_model = model.get_state()
                    self.early_stopping_counter = 0

                    # Save checkpoint
                    self.save_checkpoint(model, epoch, val_loss)
                else:
                    self.early_stopping_counter += 1

                if self.early_stopping_counter >= self.config['early_stopping_patience']:
                    print(f"Early stopping at epoch {epoch}")
                    break

                # Logging
                if (epoch + 1) % self.config['log_interval'] == 0:
                    elapsed = time.time() - start_time
                    print(f"Epoch {epoch+1}, Train Loss: {train_loss:.6f}, Val Loss: {val_loss:.6f}, Time: {elapsed:.2f}s")

            print("Training completed!")

            # Load best model
            model.set_state(self.best_model)

            return model, self.history

    # Simple model classes
    class LinearRegressionModel:
        def __init__(self, input_dim, output_dim):
            self.weights = np.random.randn(input_dim, output_dim) * 0.01

        def predict(self, X):
            return np.dot(X, self.weights)

        def get_state(self):
            return {'weights': self.weights.copy()}

        def set_state(self, state):
            self.weights = state['weights']

    class NeuralNetworkModel:
        def __init__(self, input_dim, hidden_dim, output_dim):
            self.W1 = np.random.randn(input_dim, hidden_dim) * 0.01
            self.b1 = np.zeros(hidden_dim)
            self.W2 = np.random.randn(hidden_dim, output_dim) * 0.01
            self.b2 = np.zeros(output_dim)

        def predict(self, X):
            hidden = np.maximum(0, np.dot(X, self.W1) + self.b1)  # ReLU
            return np.dot(hidden, self.W2) + self.b2

        def train_step(self, X, y):
            # Simple gradient descent (simplified)
            y_pred = self.predict(X)
            loss = np.mean((y_pred - y) ** 2)

            # Very basic update (not proper backprop)
            hidden = np.maximum(0, np.dot(X, self.W1) + self.b1)
            grad_W2 = np.dot(hidden.T, (y_pred - y)) / len(X)
            grad_W1 = np.dot(X.T, np.dot((y_pred - y), self.W2.T) * (hidden > 0)) / len(X)

            self.W2 -= config['learning_rate'] * grad_W2
            self.W1 -= config['learning_rate'] * grad_W1

            return loss

        def get_state(self):
            return {'W1': self.W1.copy(), 'b1': self.b1.copy(), 'W2': self.W2.copy(), 'b2': self.b2.copy()}

        def set_state(self, state):
            self.W1 = state['W1']
            self.b1 = state['b1']
            self.W2 = state['W2']
            self.b2 = state['b2']

    # Run pipeline
    pipeline = TrainingPipeline(config)
    model, history = pipeline.train(X, y)

    return {
        'model': model,
        'history': history,
        'config': config,
        'scaler_params': pipeline.scaler_params
    }

# Usage example
np.random.seed(42)
X = np.random.randn(1000, 5)
y = np.dot(X, np.array([1, 2, -1, 0.5, -0.5])) + 0.1 * np.random.randn(1000)
y = y.reshape(-1, 1)

training_results = complete_training_pipeline(X, y)
print("Training pipeline completed!")
print(f"Final validation loss: {training_results['history']['val_loss'][-1]:.6f}")`,
      `import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold, TimeSeriesSplit
from typing import Dict, List, Tuple, Any

def robust_data_splitting_strategies():
    """
    Comprehensive data splitting strategies with proper validation
    """
    class DataSplitter:
        def __init__(self, random_state=42):
            self.random_state = random_state

        def train_test_split_standard(self, X, y, test_size=0.2, stratify=None):
            """Standard train-test split"""
            return train_test_split(X, y, test_size=test_size, random_state=self.random_state, stratify=stratify)

        def train_val_test_split(self, X, y, val_size=0.2, test_size=0.2, stratify=None):
            """Three-way split with validation set"""
            # First split: separate test set
            X_temp, X_test, y_temp, y_test = train_test_split(
                X, y, test_size=test_size, random_state=self.random_state, stratify=stratify
            )

            # Second split: separate validation set from remaining data
            val_ratio = val_size / (1 - test_size)
            stratify_temp = y_temp if stratify is not None else None

            X_train, X_val, y_train, y_val = train_test_split(
                X_temp, y_temp, test_size=val_ratio, random_state=self.random_state, stratify=stratify_temp
            )

            return X_train, X_val, X_test, y_train, y_val, y_test

        def k_fold_cross_validation(self, X, y, k=5, stratify=None):
            """K-fold cross-validation splits"""
            if stratify is not None:
                kf = StratifiedKFold(n_splits=k, shuffle=True, random_state=self.random_state)
                splits = list(kf.split(X, stratify))
            else:
                from sklearn.model_selection import KFold
                kf = KFold(n_splits=k, shuffle=True, random_state=self.random_state)
                splits = list(kf.split(X))

            return splits

        def time_series_split(self, X, y, n_splits=5):
            """Time series split for temporal data"""
            tscv = TimeSeriesSplit(n_splits=n_splits)
            splits = list(tscv.split(X))
            return splits

        def group_k_fold(self, X, y, groups, k=5):
            """Group K-fold for grouped data (e.g., multiple samples per user)"""
            from sklearn.model_selection import GroupKFold
            gkf = GroupKFold(n_splits=k)
            splits = list(gkf.split(X, y, groups=groups))
            return splits

        def stratified_group_k_fold(self, X, y, groups, k=5):
            """Stratified Group K-fold combining grouping and stratification"""
            from sklearn.model_selection import StratifiedGroupKFold
            sgkf = StratifiedGroupKFold(n_splits=k, random_state=self.random_state)
            splits = list(sgkf.split(X, y, groups=groups))
            return splits

        def validate_split_quality(self, X_train, X_val, X_test, y_train, y_val, y_test, task_type='regression'):
            """Validate split quality and check for data leakage"""
            validation_results = {
                'split_sizes': {
                    'train': len(X_train),
                    'validation': len(X_val),
                    'test': len(X_test)
                },
                'split_ratios': {
                    'train': len(X_train) / len(X_train) + len(X_val) + len(X_test),
                    'validation': len(X_val) / len(X_train) + len(X_val) + len(X_test),
                    'test': len(X_test) / len(X_train) + len(X_val) + len(X_test)
                }
            }

            # Check for data leakage (duplicate samples across splits)
            train_hashes = [hash(tuple(row)) for row in X_train]
            val_hashes = [hash(tuple(row)) for row in X_val]
            test_hashes = [hash(tuple(row)) for row in X_test]

            train_val_overlap = len(set(train_hashes) & set(val_hashes))
            train_test_overlap = len(set(train_hashes) & set(test_hashes))
            val_test_overlap = len(set(val_hashes) & set(test_hashes))

            validation_results['data_leakage'] = {
                'train_val_overlap': train_val_overlap,
                'train_test_overlap': train_test_overlap,
                'val_test_overlap': val_test_overlap
            }

            if task_type == 'classification':
                # Check class distribution
                train_classes, train_counts = np.unique(y_train, return_counts=True)
                val_classes, val_counts = np.unique(y_val, return_counts=True)
                test_classes, test_counts = np.unique(y_test, return_counts=True)

                validation_results['class_distribution'] = {
                    'train': dict(zip(train_classes, train_counts)),
                    'validation': dict(zip(val_classes, val_counts)),
                    'test': dict(zip(test_classes, test_counts))
                }

                # Check for class imbalance
                validation_results['class_imbalance'] = {
                    'train_ratio': min(train_counts) / max(train_counts),
                    'val_ratio': min(val_counts) / max(val_counts) if len(val_counts) > 0 else 1.0,
                    'test_ratio': min(test_counts) / max(test_counts)
                }

            return validation_results

    def demonstrate_splitting_strategies():
        """Demonstrate different splitting strategies"""
        np.random.seed(42)

        # Create sample data
        X = np.random.randn(1000, 5)
        y_regression = X[:, 0] * 2 + X[:, 1] * -1 + np.random.randn(1000) * 0.1
        y_classification = (X[:, 0] + X[:, 1] > 0).astype(int)

        # Create group data (simulating users with multiple samples)
        groups = np.random.randint(0, 50, 1000)  # 50 groups

        splitter = DataSplitter()

        print("Data Splitting Strategies Demonstration")
        print("=" * 50)

        # 1. Standard train-test split
        print("\\n1. Standard Train-Test Split:")
        X_train, X_test, y_train, y_test = splitter.train_test_split_standard(X, y_regression, test_size=0.3)
        print(f"Train: {len(X_train)}, Test: {len(X_test)}")

        # 2. Three-way split
        print("\\n2. Three-way Train-Validation-Test Split:")
        X_tr, X_val, X_te, y_tr, y_val, y_te = splitter.train_val_test_split(X, y_regression)
        print(f"Train: {len(X_tr)}, Val: {len(X_val)}, Test: {len(X_te)}")

        # 3. Stratified split for classification
        print("\\n3. Stratified Split for Classification:")
        X_tr_s, X_te_s, y_tr_s, y_te_s = splitter.train_test_split_standard(
            X, y_classification, test_size=0.3, stratify=y_classification
        )
        print(f"Stratified split completed")

        # 4. K-fold cross-validation
        print("\\n4. K-Fold Cross-Validation:")
        cv_splits = splitter.k_fold_cross_validation(X, y_classification, k=5, stratify=y_classification)
        print(f"Created {len(cv_splits)} cross-validation folds")

        # 5. Time series split
        print("\\n5. Time Series Split:")
        ts_splits = splitter.time_series_split(X, y_regression, n_splits=3)
        print(f"Created {len(ts_splits)} time series splits")

        # 6. Group K-fold
        print("\\n6. Group K-Fold:")
        group_splits = splitter.group_k_fold(X, y_regression, groups, k=5)
        print(f"Created {len(group_splits)} group-aware folds")

        # 7. Validate split quality
        print("\\n7. Split Quality Validation:")
        validation_results = splitter.validate_split_quality(
            X_tr, X_val, X_te, y_tr, y_val, y_te, task_type='regression'
        )
        print(f"Split sizes: {validation_results['split_sizes']}")
        print(f"Data leakage check: {validation_results['data_leakage']}")

        return {
            'splitter': splitter,
            'validation_results': validation_results,
            'splits': {
                'standard': (X_train, X_test, y_train, y_test),
                'three_way': (X_tr, X_val, X_te, y_tr, y_val, y_te),
                'stratified': (X_tr_s, X_te_s, y_tr_s, y_te_s)
            }
        }

    # Run demonstration
    results = demonstrate_splitting_strategies()

    return results

# Usage example
splitting_demo = robust_data_splitting_strategies()
print("\\nData splitting strategies demonstration completed!")`,
      `import numpy as np
from sklearn.linear_model import Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor
import copy

def comprehensive_regularization_toolkit():
    """
    Complete toolkit for overfitting prevention techniques
    """
    class RegularizationToolkit:
        def __init__(self):
            self.techniques = {}
            self.best_models = {}

        def l1_regularization(self, X_train, y_train, X_val, y_val, alphas=None):
            """L1 Regularization (Lasso) - Feature selection and sparsity"""
            if alphas is None:
                alphas = [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]

            best_alpha = None
            best_score = -np.inf
            best_model = None

            for alpha in alphas:
                model = Lasso(alpha=alpha, random_state=42, max_iter=10000)
                model.fit(X_train, y_train)

                score = model.score(X_val, y_val)
                if score > best_score:
                    best_score = score
                    best_alpha = alpha
                    best_model = copy.deepcopy(model)

            self.techniques['l1'] = {
                'best_alpha': best_alpha,
                'best_score': best_score,
                'model': best_model,
                'sparsity': np.sum(best_model.coef_ == 0)
            }

            return best_model

        def l2_regularization(self, X_train, y_train, X_val, y_val, alphas=None):
            """L2 Regularization (Ridge) - Weight decay and stability"""
            if alphas is None:
                alphas = [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]

            best_alpha = None
            best_score = -np.inf
            best_model = None

            for alpha in alphas:
                model = Ridge(alpha=alpha, random_state=42)
                model.fit(X_train, y_train)

                score = model.score(X_val, y_val)
                if score > best_score:
                    best_score = score
                    best_alpha = alpha
                    best_model = copy.deepcopy(model)

            self.techniques['l2'] = {
                'best_alpha': best_alpha,
                'best_score': best_score,
                'model': best_model
            }

            return best_model

        def elastic_net(self, X_train, y_train, X_val, y_val, alphas=None, l1_ratios=None):
            """Elastic Net - Combination of L1 and L2"""
            from sklearn.linear_model import ElasticNet

            if alphas is None:
                alphas = [0.001, 0.01, 0.1, 1.0]
            if l1_ratios is None:
                l1_ratios = [0.1, 0.5, 0.9]

            best_params = None
            best_score = -np.inf
            best_model = None

            for alpha in alphas:
                for l1_ratio in l1_ratios:
                    model = ElasticNet(alpha=alpha, l1_ratio=l1_ratio, random_state=42, max_iter=10000)
                    model.fit(X_train, y_train)

                    score = model.score(X_val, y_val)
                    if score > best_score:
                        best_score = score
                        best_params = {'alpha': alpha, 'l1_ratio': l1_ratio}
                        best_model = copy.deepcopy(model)

            self.techniques['elastic_net'] = {
                'best_params': best_params,
                'best_score': best_score,
                'model': best_model
            }

            return best_model

        def dropout_regularization(self, model_class, X_train, y_train, X_val, y_val, dropout_rates=None):
            """Dropout regularization for neural networks"""
            if dropout_rates is None:
                dropout_rates = [0.1, 0.2, 0.3, 0.5]

            # This is a simplified implementation
            # In practice, this would be integrated into the neural network architecture
            best_rate = None
            best_score = -np.inf

            for rate in dropout_rates:
                # Simulate dropout effect (simplified)
                model = model_class()
                # Apply dropout during training (would be done in the actual NN)

                # For demonstration, we'll just use a simple model
                from sklearn.ensemble import RandomForestRegressor
                model = RandomForestRegressor(n_estimators=50, random_state=42)
                model.fit(X_train, y_train)

                score = model.score(X_val, y_val)
                if score > best_score:
                    best_score = score
                    best_rate = rate

            self.techniques['dropout'] = {
                'best_rate': best_rate,
                'best_score': best_score
            }

            return best_rate

        def early_stopping(self, model, X_train, y_train, X_val, y_val,
                          patience=10, min_delta=0.001):
            """Early stopping to prevent overfitting"""
            best_score = -np.inf
            best_model = None
            patience_counter = 0
            best_epoch = 0

            # Simplified early stopping (would be integrated into training loop)
            for epoch in range(100):  # Simulate epochs
                # In practice, this would train the model for one epoch
                model.fit(X_train, y_train)
                score = model.score(X_val, y_val)

                if score > best_score + min_delta:
                    best_score = score
                    best_model = copy.deepcopy(model)
                    patience_counter = 0
                    best_epoch = epoch
                else:
                    patience_counter += 1

                if patience_counter >= patience:
                    break

            self.techniques['early_stopping'] = {
                'best_epoch': best_epoch,
                'best_score': best_score,
                'stopped_early': patience_counter >= patience
            }

            return best_model

        def data_augmentation(self, X_train, y_train, augmentation_factor=2):
            """Data augmentation for small datasets"""
            augmented_X = [X_train]
            augmented_y = [y_train]

            for _ in range(augmentation_factor - 1):
                # Add noise
                noise = np.random.normal(0, 0.1, X_train.shape)
                augmented_X.append(X_train + noise)
                augmented_y.append(y_train)

                # Feature scaling variation
                scale_factor = np.random.uniform(0.9, 1.1, X_train.shape[1])
                augmented_X.append(X_train * scale_factor)
                augmented_y.append(y_train)

            X_augmented = np.vstack(augmented_X)
            y_augmented = np.concatenate(augmented_y)

            return X_augmented, y_augmented

        def ensemble_methods(self, X_train, y_train, X_val, y_val, n_estimators=10):
            """Ensemble methods to reduce overfitting"""
            from sklearn.ensemble import BaggingRegressor, AdaBoostRegressor

            # Bagging
            bagging = BaggingRegressor(
                estimator=Ridge(alpha=1.0),
                n_estimators=n_estimators,
                random_state=42
            )
            bagging.fit(X_train, y_train)
            bagging_score = bagging.score(X_val, y_val)

            # Boosting
            boosting = AdaBoostRegressor(
                estimator=Ridge(alpha=1.0),
                n_estimators=n_estimators,
                random_state=42
            )
            boosting.fit(X_train, y_train)
            boosting_score = boosting.score(X_val, y_val)

            best_score = max(bagging_score, boosting_score)
            best_model = bagging if bagging_score >= boosting_score else boosting
            method = 'bagging' if bagging_score >= boosting_score else 'boosting'

            self.techniques['ensemble'] = {
                'method': method,
                'bagging_score': bagging_score,
                'boosting_score': boosting_score,
                'best_score': best_score,
                'model': best_model
            }

            return best_model

    def regularization_comparison(X_train, y_train, X_val, y_val):
        """Compare different regularization techniques"""
        toolkit = RegularizationToolkit()

        print("Regularization Techniques Comparison")
        print("=" * 50)

        # Test L1 regularization
        print("\\n1. L1 Regularization (Lasso):")
        l1_model = toolkit.l1_regularization(X_train, y_train, X_val, y_val)
        print(f"Best alpha: {toolkit.techniques['l1']['best_alpha']}")
        print(f"Best score: {toolkit.techniques['l1']['best_score']:.4f}")
        print(f"Sparsity (zero coefficients): {toolkit.techniques['l1']['sparsity']}")

        # Test L2 regularization
        print("\\n2. L2 Regularization (Ridge):")
        l2_model = toolkit.l2_regularization(X_train, y_train, X_val, y_val)
        print(f"Best alpha: {toolkit.techniques['l2']['best_alpha']}")
        print(f"Best score: {toolkit.techniques['l2']['best_score']:.4f}")

        # Test Elastic Net
        print("\\n3. Elastic Net:")
        en_model = toolkit.elastic_net(X_train, y_train, X_val, y_val)
        print(f"Best params: {toolkit.techniques['elastic_net']['best_params']}")
        print(f"Best score: {toolkit.techniques['elastic_net']['best_score']:.4f}")

        # Test Ensemble methods
        print("\\n4. Ensemble Methods:")
        ensemble_model = toolkit.ensemble_methods(X_train, y_train, X_val, y_val)
        ensemble_info = toolkit.techniques['ensemble']
        print(f"Best method: {ensemble_info['method']}")
        print(f"Best score: {ensemble_info['best_score']:.4f}")

        # Data augmentation
        print("\\n5. Data Augmentation:")
        X_aug, y_aug = toolkit.data_augmentation(X_train, y_train, augmentation_factor=3)
        print(f"Original dataset: {X_train.shape[0]} samples")
        print(f"Augmented dataset: {X_aug.shape[0]} samples")

        return toolkit

    # Create sample data
    np.random.seed(42)
    X = np.random.randn(500, 10)
    y = X[:, 0] * 2 + X[:, 1] * -1.5 + X[:, 2] * 3 + np.random.randn(500) * 0.1

    # Split data
    split_idx = int(0.8 * len(X))
    X_train, X_val = X[:split_idx], X[split_idx:]
    y_train, y_val = y[:split_idx], y[split_idx:]

    # Run regularization comparison
    regularization_results = regularization_comparison(X_train, y_train, X_val, y_val)

    return regularization_results

# Usage example
regularization_toolkit = comprehensive_regularization_toolkit()
print("\\nRegularization toolkit demonstration completed!")`,
      `import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import matplotlib.pyplot as plt
import seaborn as sns

def comprehensive_evaluation_framework():
    """
    Complete model evaluation framework with all key metrics and visualizations
    """
    class ModelEvaluator:
        def __init__(self):
            self.metrics = {}
            self.confusion_matrices = {}
            self.classification_reports = {}

        def evaluate_regression(self, y_true, y_pred, model_name="Model"):
            """Comprehensive regression evaluation"""
            mae = mean_absolute_error(y_true, y_pred)
            mse = mean_squared_error(y_true, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_true, y_pred)

            # Additional metrics
            mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100  # Mean Absolute Percentage Error
            explained_variance = 1 - (np.var(y_true - y_pred) / np.var(y_true))

            regression_metrics = {
                'MAE': mae,
                'MSE': mse,
                'RMSE': rmse,
                'R²': r2,
                'MAPE': mape,
                'Explained_Variance': explained_variance
            }

            self.metrics[model_name] = regression_metrics

            return regression_metrics

        def evaluate_classification(self, y_true, y_pred, y_prob=None, model_name="Model"):
            """Comprehensive classification evaluation"""
            # Basic metrics
            accuracy = accuracy_score(y_true, y_pred)
            precision = precision_score(y_true, y_pred, average='weighted')
            recall = recall_score(y_true, y_pred, average='weighted')
            f1 = f1_score(y_true, y_pred, average='weighted')

            # Confusion matrix
            cm = confusion_matrix(y_true, y_pred)
            self.confusion_matrices[model_name] = cm

            # ROC AUC (if probabilities available)
            roc_auc = None
            if y_prob is not None:
                if len(np.unique(y_true)) == 2:  # Binary classification
                    roc_auc = roc_auc_score(y_true, y_prob[:, 1])
                else:  # Multi-class
                    roc_auc = roc_auc_score(y_true, y_prob, multi_class='ovr', average='weighted')

            classification_metrics = {
                'Accuracy': accuracy,
                'Precision': precision,
                'Recall': recall,
                'F1_Score': f1,
                'ROC_AUC': roc_auc
            }

            # Per-class metrics
            if len(np.unique(y_true)) > 2:
                precision_per_class = precision_score(y_true, y_pred, average=None)
                recall_per_class = recall_score(y_true, y_pred, average=None)
                f1_per_class = f1_score(y_true, y_pred, average=None)

                classification_metrics['per_class'] = {
                    'precision': precision_per_class,
                    'recall': recall_per_class,
                    'f1': f1_per_class
                }

            self.metrics[model_name] = classification_metrics

            return classification_metrics

        def plot_confusion_matrix(self, model_name, class_names=None):
            """Plot confusion matrix"""
            if model_name not in self.confusion_matrices:
                print(f"No confusion matrix found for {model_name}")
                return

            cm = self.confusion_matrices[model_name]

            plt.figure(figsize=(8, 6))
            if class_names is None:
                class_names = [f'Class {i}' for i in range(len(cm))]

            sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                       xticklabels=class_names, yticklabels=class_names)
            plt.title(f'Confusion Matrix - {model_name}')
            plt.ylabel('True Label')
            plt.xlabel('Predicted Label')
            plt.tight_layout()
            plt.show()

        def plot_residuals(self, y_true, y_pred, model_name="Model"):
            """Plot residuals for regression analysis"""
            residuals = y_true - y_pred

            fig, axes = plt.subplots(1, 3, figsize=(15, 5))

            # Residuals vs Predicted
            axes[0].scatter(y_pred, residuals, alpha=0.5)
            axes[0].axhline(y=0, color='r', linestyle='--')
            axes[0].set_xlabel('Predicted Values')
            axes[0].set_ylabel('Residuals')
            axes[0].set_title(f'Residuals vs Predicted - {model_name}')

            # Residuals distribution
            axes[1].hist(residuals, bins=30, alpha=0.7, edgecolor='black')
            axes[1].axvline(x=0, color='r', linestyle='--')
            axes[1].set_xlabel('Residuals')
            axes[1].set_ylabel('Frequency')
            axes[1].set_title('Residuals Distribution')

            # Q-Q plot for normality check
            from scipy import stats
            stats.probplot(residuals, dist="norm", plot=axes[2])
            axes[2].set_title('Q-Q Plot')

            plt.tight_layout()
            plt.show()

        def compare_models(self, metric='F1_Score'):
            """Compare models based on a specific metric"""
            if not self.metrics:
                print("No models to compare")
                return

            comparison = {}
            for model_name, metrics in self.metrics.items():
                if metric in metrics:
                    comparison[model_name] = metrics[metric]

            if comparison:
                best_model = max(comparison, key=comparison.get)
                print(f"\\nModel Comparison (based on {metric}):")
                for model, score in sorted(comparison.items(), key=lambda x: x[1], reverse=True):
                    marker = " 🏆" if model == best_model else ""
                    print(".4f")

            return comparison

        def generate_report(self, model_name):
            """Generate comprehensive evaluation report"""
            if model_name not in self.metrics:
                return f"No metrics found for {model_name}"

            metrics = self.metrics[model_name]
            report = f"""
Evaluation Report for {model_name}
{'='*50}

"""

            for metric, value in metrics.items():
                if isinstance(value, (int, float)) and not isinstance(value, bool):
                    if metric == 'ROC_AUC' and value is None:
                        report += f"{metric}: Not available (probabilities needed)\\n"
                    else:
                        report += ".4f"
                elif isinstance(value, dict):
                    report += f"{metric}:\\n"
                    for sub_metric, sub_value in value.items():
                        report += f"  {sub_metric}: {sub_value}\\n"
                else:
                    report += f"{metric}: {value}\\n"

            return report

    def demonstrate_evaluation_framework():
        """Demonstrate the evaluation framework"""
        evaluator = ModelEvaluator()

        np.random.seed(42)

        # Generate regression data
        X_reg = np.random.randn(500, 3)
        y_reg_true = 2*X_reg[:, 0] - 1.5*X_reg[:, 1] + 3*X_reg[:, 2] + np.random.randn(500) * 0.1
        y_reg_pred = y_reg_true + np.random.randn(500) * 0.2  # Add some prediction error

        # Generate classification data
        X_class = np.random.randn(500, 4)
        y_class_true = (X_class[:, 0] + X_class[:, 1] > 0).astype(int)
        y_class_pred = (X_class[:, 0] + X_class[:, 1] + np.random.randn(500) * 0.3 > 0).astype(int)
        y_class_prob = np.random.rand(500, 2)  # Mock probabilities
        y_class_prob = y_class_prob / y_class_prob.sum(axis=1, keepdims=True)

        print("Comprehensive Model Evaluation Framework")
        print("=" * 50)

        # Evaluate regression
        print("\\n1. Regression Evaluation:")
        reg_metrics = evaluator.evaluate_regression(y_reg_true, y_reg_pred, "Linear Regression")
        print("Regression Metrics:")
        for metric, value in reg_metrics.items():
            print(".4f")

        # Evaluate classification
        print("\\n2. Classification Evaluation:")
        class_metrics = evaluator.evaluate_classification(
            y_class_true, y_class_pred, y_class_prob, "Logistic Regression"
        )
        print("Classification Metrics:")
        for metric, value in class_metrics.items():
            if isinstance(value, (int, float)) and not isinstance(value, bool):
                print(".4f")
            else:
                print(f"{metric}: {value}")

        # Generate reports
        print("\\n3. Detailed Reports:")
        print(evaluator.generate_report("Linear Regression"))
        print(evaluator.generate_report("Logistic Regression"))

        # Compare models
        print("\\n4. Model Comparison:")
        evaluator.compare_models("F1_Score")

        return evaluator

    # Run demonstration
    evaluation_demo = demonstrate_evaluation_framework()

    return evaluation_demo

# Usage example
evaluation_framework = comprehensive_evaluation_framework()
print("\\nComprehensive evaluation framework demonstration completed!")`,
    ],
    outcomes: [
      "Successfully analyzed AI, ML, and DL paradigms with comprehensive examples!",
      "Mastered machine learning fundamentals and paradigm comparisons!",
      "Implemented complete supervised learning pipeline with proper validation!",
      "Built comprehensive unsupervised learning system with clustering algorithms!",
      "Created neural network from scratch with proper training and evaluation!",
      "Compared and implemented various loss functions for different scenarios!",
      "Developed complete training pipeline with all best practices!",
      "Created robust data splitting strategies with proper validation!",
      "Built comprehensive regularization toolkit for overfitting prevention!",
      "Developed complete model evaluation framework with metrics and visualizations!",
    ]
  }
};

function updateAIFundamentalsMissions() {
  const chapter = 'ai_fundamentals';
  const chapterDir = path.join(baseDir, chapter);

  // Update titles, descriptions, hints, and solutions
  for (let i = 1; i <= 10; i++) {
    const missionId = `mission_${String(i).padStart(2, "0")}`;
    const missionDir = path.join(chapterDir, missionId);

    const title = missionData[chapter].titles[i-1];
    const description = missionData[chapter].descriptions[i-1];
    const hints = missionData[chapter].hints[i-1];
    const solution = missionData[chapter].solutions[i-1];
    const outcome = missionData[chapter].outcomes[i-1];

    // Update games.json with proper content
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
  }

  console.log(`${chapter}: Updated with comprehensive, detailed missions!`);
}

// Run the update
updateAIFundamentalsMissions();
console.log("AI Fundamentals chapter missions update completed!");

// Function to update AI fundamentals missions
function updateAIFundamentalsMissions() {
  const chapter = 'ai_fundamentals';
  const chapterDir = path.join(baseDir, chapter);

  // Update titles, descriptions, hints, and solutions
  for (let i = 1; i <= 10; i++) {
    const missionId = `mission_${String(i).padStart(2, "0")}`;
    const missionDir = path.join(chapterDir, missionId);

    const title = missionData[chapter].titles[i-1];
    const description = missionData[chapter].descriptions[i-1];
    const hints = missionData[chapter].hints[i-1];
    const solution = missionData[chapter].solutions[i-1];
    const outcome = missionData[chapter].outcomes[i-1];

    // Update games.json with proper content
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
  }

  console.log(`${chapter}: Updated with comprehensive, detailed missions!`);
}

// Run the update
updateAIFundamentalsMissions();
console.log("AI Fundamentals chapter missions update completed!");