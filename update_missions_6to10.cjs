const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

// Update AI fundamentals missions 6-10 with detailed content
function updateMissions6to10() {
  const chapter = 'ai_fundamentals';

  // Mission 6: Loss Functions and Optimization
  updateMission(chapter, 'mission_06',
    "Loss Functions and Optimization",
    "Implement and compare different loss functions (MSE, MAE, Cross-Entropy, Hinge Loss) for various machine learning tasks. Create a function that selects the appropriate loss function based on the problem type.",
    [
      "MSE for regression, Cross-Entropy for classification",
      "Consider the mathematical properties: convexity, differentiability",
      "Think about outlier sensitivity and computational efficiency"
    ],
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
    }`,
    "Implemented and compared various loss functions for different ML tasks!"
  );

  // Mission 7: Model Training Pipeline
  updateMission(chapter, 'mission_07',
    "Model Training Pipeline",
    "Build a complete model training pipeline that includes data loading, preprocessing, model initialization, training loop with early stopping, validation, and model saving. Use proper error handling and logging.",
    [
      "Structure your code with separate functions for each step",
      "Implement proper logging and progress tracking",
      "Add checkpoint saving and model serialization"
    ],
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
            # Simple forward pass
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
    }`,
    "Built complete model training pipeline with all best practices!"
  );

  // Mission 8: Data Splitting Strategies
  updateMission(chapter, 'mission_08',
    "Data Splitting Strategies",
    "Create robust data splitting functions that implement train/validation/test splits with stratification, cross-validation, and time series splitting. Include proper randomization and ensure no data leakage.",
    [
      "Use sklearn's train_test_split with stratify parameter",
      "Implement k-fold cross-validation from scratch",
      "Consider time-based splitting for temporal data"
    ],
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

    return results`,
    "Created robust data splitting strategies with proper validation!"
  );

  // Mission 9: Overfitting Prevention Techniques
  updateMission(chapter, 'mission_09',
    "Overfitting Prevention Techniques",
    "Implement multiple overfitting prevention techniques including L1/L2 regularization, dropout, early stopping, data augmentation, and ensemble methods. Create a comprehensive regularization toolkit.",
    [
      "L1 regularization (Lasso) encourages sparsity",
      "L2 regularization (Ridge) prevents large weights",
      "Dropout randomly deactivates neurons during training"
    ],
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

    return regularization_results`,
    "Built comprehensive regularization toolkit for overfitting prevention!"
  );

  // Mission 10: Model Evaluation Metrics
  updateMission(chapter, 'mission_10',
    "Model Evaluation Metrics",
    "Develop a complete model evaluation framework that calculates accuracy, precision, recall, F1-score, ROC-AUC, confusion matrix, and other relevant metrics. Include visualization capabilities.",
    [
      "Confusion matrix shows true positives, false positives, etc.",
      "ROC curve plots true positive rate vs false positive rate",
      "F1-score balances precision and recall"
    ],
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

    return evaluation_demo`,
    "Developed complete model evaluation framework with metrics and visualizations!"
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
updateMissions6to10();
console.log("AI Fundamentals missions 6-10 update completed!");