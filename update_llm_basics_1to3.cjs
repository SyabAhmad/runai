const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

// Update LLM Basics chapter with detailed missions
function updateLLMBasicsMissions() {
  const chapter = 'llm_basics';

  // Mission 1: Transformer Architecture
  updateMission(chapter, 'mission_01',
    "Transformer Architecture",
    "Implement the core Transformer architecture with encoder-decoder structure and self-attention layers. Create a complete transformer block with multi-head attention and feed-forward networks.",
    [
      "Transformers use self-attention instead of RNNs",
      "Encoder processes input, decoder generates output",
      "Multi-head attention allows parallel processing"
    ],
    `import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    """Multi-head attention mechanism"""
    def __init__(self, embed_dim, num_heads):
        super().__init__()
        assert embed_dim % num_heads == 0, "embed_dim must be divisible by num_heads"

        self.embed_dim = embed_dim
        self.num_heads = num_heads
        self.head_dim = embed_dim // num_heads

        self.q_linear = nn.Linear(embed_dim, embed_dim)
        self.k_linear = nn.Linear(embed_dim, embed_dim)
        self.v_linear = nn.Linear(embed_dim, embed_dim)
        self.out_linear = nn.Linear(embed_dim, embed_dim)

    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)

        # Linear transformations and reshape
        Q = self.q_linear(query).view(batch_size, -1, self.num_heads, self.head_dim).transpose(1, 2)
        K = self.k_linear(key).view(batch_size, -1, self.num_heads, self.head_dim).transpose(1, 2)
        V = self.v_linear(value).view(batch_size, -1, self.num_heads, self.head_dim).transpose(1, 2)

        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.head_dim)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        attention_weights = F.softmax(scores, dim=-1)
        attention_output = torch.matmul(attention_weights, V)

        # Concatenate heads and put through final linear layer
        attention_output = attention_output.transpose(1, 2).contiguous().view(
            batch_size, -1, self.embed_dim
        )

        output = self.out_linear(attention_output)
        return output, attention_weights

class FeedForwardNetwork(nn.Module):
    """Position-wise feed-forward network"""
    def __init__(self, embed_dim, ff_dim, dropout=0.1):
        super().__init__()
        self.linear1 = nn.Linear(embed_dim, ff_dim)
        self.linear2 = nn.Linear(ff_dim, embed_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        return self.linear2(self.dropout(F.relu(self.linear1(x))))

class TransformerEncoderLayer(nn.Module):
    """Single transformer encoder layer"""
    def __init__(self, embed_dim, num_heads, ff_dim, dropout=0.1):
        super().__init__()
        self.self_attention = MultiHeadAttention(embed_dim, num_heads)
        self.feed_forward = FeedForwardNetwork(embed_dim, ff_dim, dropout)
        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Self-attention with residual connection and layer norm
        attn_output, _ = self.self_attention(x, x, x, mask)
        x = self.norm1(x + self.dropout(attn_output))

        # Feed-forward with residual connection and layer norm
        ff_output = self.feed_forward(x)
        x = self.norm2(x + self.dropout(ff_output))

        return x

class TransformerEncoder(nn.Module):
    """Complete transformer encoder"""
    def __init__(self, vocab_size, embed_dim, num_layers, num_heads, ff_dim, max_length, dropout=0.1):
        super().__init__()
        self.embed_dim = embed_dim

        self.token_embedding = nn.Embedding(vocab_size, embed_dim)
        self.position_embedding = nn.Embedding(max_length, embed_dim)

        self.layers = nn.ModuleList([
            TransformerEncoderLayer(embed_dim, num_heads, ff_dim, dropout)
            for _ in range(num_layers)
        ])

        self.dropout = nn.Dropout(dropout)
        self.norm = nn.LayerNorm(embed_dim)

    def forward(self, x, mask=None):
        # Add token and position embeddings
        seq_length = x.size(1)
        positions = torch.arange(seq_length, device=x.device).unsqueeze(0)
        x = self.token_embedding(x) + self.position_embedding(positions)
        x = self.dropout(x)

        # Pass through encoder layers
        for layer in self.layers:
            x = layer(x, mask)

        return self.norm(x)

class TransformerDecoderLayer(nn.Module):
    """Single transformer decoder layer"""
    def __init__(self, embed_dim, num_heads, ff_dim, dropout=0.1):
        super().__init__()
        self.self_attention = MultiHeadAttention(embed_dim, num_heads)
        self.cross_attention = MultiHeadAttention(embed_dim, num_heads)
        self.feed_forward = FeedForwardNetwork(embed_dim, ff_dim, dropout)

        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.norm3 = nn.LayerNorm(embed_dim)

        self.dropout = nn.Dropout(dropout)

    def forward(self, x, encoder_output, tgt_mask=None, src_mask=None):
        # Self-attention
        self_attn_output, _ = self.self_attention(x, x, x, tgt_mask)
        x = self.norm1(x + self.dropout(self_attn_output))

        # Cross-attention
        cross_attn_output, _ = self.cross_attention(x, encoder_output, encoder_output, src_mask)
        x = self.norm2(x + self.dropout(cross_attn_output))

        # Feed-forward
        ff_output = self.feed_forward(x)
        x = self.norm3(x + self.dropout(ff_output))

        return x

class TransformerDecoder(nn.Module):
    """Complete transformer decoder"""
    def __init__(self, vocab_size, embed_dim, num_layers, num_heads, ff_dim, max_length, dropout=0.1):
        super().__init__()
        self.embed_dim = embed_dim

        self.token_embedding = nn.Embedding(vocab_size, embed_dim)
        self.position_embedding = nn.Embedding(max_length, embed_dim)

        self.layers = nn.ModuleList([
            TransformerDecoderLayer(embed_dim, num_heads, ff_dim, dropout)
            for _ in range(num_layers)
        ])

        self.dropout = nn.Dropout(dropout)
        self.norm = nn.LayerNorm(embed_dim)
        self.output_linear = nn.Linear(embed_dim, vocab_size)

    def forward(self, x, encoder_output, tgt_mask=None, src_mask=None):
        # Add token and position embeddings
        seq_length = x.size(1)
        positions = torch.arange(seq_length, device=x.device).unsqueeze(0)
        x = self.token_embedding(x) + self.position_embedding(positions)
        x = self.dropout(x)

        # Pass through decoder layers
        for layer in self.layers:
            x = layer(x, encoder_output, tgt_mask, src_mask)

        x = self.norm(x)
        output = self.output_linear(x)

        return output

class Transformer(nn.Module):
    """Complete Transformer model (Encoder-Decoder)"""
    def __init__(self, src_vocab_size, tgt_vocab_size, embed_dim=512, num_layers=6,
                 num_heads=8, ff_dim=2048, max_length=100, dropout=0.1):
        super().__init__()
        self.encoder = TransformerEncoder(
            src_vocab_size, embed_dim, num_layers, num_heads, ff_dim, max_length, dropout
        )
        self.decoder = TransformerDecoder(
            tgt_vocab_size, embed_dim, num_layers, num_heads, ff_dim, max_length, dropout
        )

    def forward(self, src, tgt, src_mask=None, tgt_mask=None):
        encoder_output = self.encoder(src, src_mask)
        decoder_output = self.decoder(tgt, encoder_output, tgt_mask, src_mask)
        return decoder_output

    def encode(self, src, src_mask=None):
        """Encode source sequence only"""
        return self.encoder(src, src_mask)

    def decode(self, tgt, encoder_output, tgt_mask=None, src_mask=None):
        """Decode target sequence given encoder output"""
        return self.decoder(tgt, encoder_output, tgt_mask, src_mask)

def create_transformer_model(src_vocab_size=10000, tgt_vocab_size=10000):
    """Create a transformer model with default parameters"""
    model = Transformer(
        src_vocab_size=src_vocab_size,
        tgt_vocab_size=tgt_vocab_size,
        embed_dim=512,
        num_layers=6,
        num_heads=8,
        ff_dim=2048,
        max_length=100
    )

    return model

# Example usage
if __name__ == "__main__":
    # Create a small transformer for demonstration
    model = create_transformer_model(src_vocab_size=1000, tgt_vocab_size=1000)

    # Example forward pass
    src = torch.randint(0, 1000, (2, 10))  # batch_size=2, seq_len=10
    tgt = torch.randint(0, 1000, (2, 8))   # batch_size=2, seq_len=8

    output = model(src, tgt)
    print(f"Input shape: src={src.shape}, tgt={tgt.shape}")
    print(f"Output shape: {output.shape}")
    print("Transformer model created successfully!")`,
    "Implemented complete Transformer architecture with encoder-decoder structure!"
  );

  // Mission 2: Attention Mechanism
  updateMission(chapter, 'mission_02',
    "Attention Mechanism",
    "Build the attention mechanism that allows models to focus on relevant parts of the input sequence. Implement scaled dot-product attention, multi-head attention, and self-attention patterns.",
    [
      "Attention computes relevance scores between tokens",
      "Query, Key, Value matrices are learned",
      "Scaled dot-product attention prevents vanishing gradients"
    ],
    `import torch
import torch.nn as nn
import torch.nn.functional as F
import math
import numpy as np

class AttentionMechanisms:
    """Comprehensive implementation of various attention mechanisms"""

    @staticmethod
    def scaled_dot_product_attention(query, key, value, mask=None, dropout=None):
        """
        Compute scaled dot-product attention

        Args:
            query: (batch_size, num_heads, seq_len_q, head_dim)
            key: (batch_size, num_heads, seq_len_k, head_dim)
            value: (batch_size, num_heads, seq_len_v, head_dim)
            mask: (batch_size, num_heads, seq_len_q, seq_len_k) or None
            dropout: dropout probability or None

        Returns:
            output: (batch_size, num_heads, seq_len_q, head_dim)
            attention_weights: (batch_size, num_heads, seq_len_q, seq_len_k)
        """
        # Calculate attention scores: Q * K^T
        scores = torch.matmul(query, key.transpose(-2, -1))

        # Scale by square root of key dimension
        scores = scores / math.sqrt(key.size(-1))

        # Apply mask if provided (for causal attention or padding)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        # Apply softmax to get attention weights
        attention_weights = F.softmax(scores, dim=-1)

        # Apply dropout if specified
        if dropout is not None:
            attention_weights = F.dropout(attention_weights, p=dropout)

        # Apply attention to values: weights * V
        output = torch.matmul(attention_weights, value)

        return output, attention_weights

    @staticmethod
    def multi_head_attention(query, key, value, num_heads, embed_dim, mask=None, dropout=None):
        """
        Multi-head attention mechanism

        Args:
            query: (batch_size, seq_len_q, embed_dim)
            key: (batch_size, seq_len_k, embed_dim)
            value: (batch_size, seq_len_v, embed_dim)
            num_heads: number of attention heads
            embed_dim: embedding dimension (must be divisible by num_heads)
            mask: attention mask
            dropout: dropout probability

        Returns:
            output: (batch_size, seq_len_q, embed_dim)
            attention_weights: (batch_size, num_heads, seq_len_q, seq_len_k)
        """
        batch_size = query.size(0)
        head_dim = embed_dim // num_heads

        assert embed_dim % num_heads == 0, "embed_dim must be divisible by num_heads"

        # Linear transformations for Q, K, V
        w_q = nn.Linear(embed_dim, embed_dim)
        w_k = nn.Linear(embed_dim, embed_dim)
        w_v = nn.Linear(embed_dim, embed_dim)
        w_o = nn.Linear(embed_dim, embed_dim)

        # Apply linear transformations
        Q = w_q(query)  # (batch_size, seq_len_q, embed_dim)
        K = w_k(key)    # (batch_size, seq_len_k, embed_dim)
        V = w_v(value)  # (batch_size, seq_len_v, embed_dim)

        # Reshape for multi-head attention
        Q = Q.view(batch_size, -1, num_heads, head_dim).transpose(1, 2)  # (batch_size, num_heads, seq_len_q, head_dim)
        K = K.view(batch_size, -1, num_heads, head_dim).transpose(1, 2)  # (batch_size, num_heads, seq_len_k, head_dim)
        V = V.view(batch_size, -1, num_heads, head_dim).transpose(1, 2)  # (batch_size, num_heads, seq_len_v, head_dim)

        # Apply scaled dot-product attention
        attn_output, attention_weights = AttentionMechanisms.scaled_dot_product_attention(
            Q, K, V, mask, dropout
        )  # (batch_size, num_heads, seq_len_q, head_dim)

        # Concatenate heads
        attn_output = attn_output.transpose(1, 2).contiguous().view(
            batch_size, -1, embed_dim
        )  # (batch_size, seq_len_q, embed_dim)

        # Final linear transformation
        output = w_o(attn_output)  # (batch_size, seq_len_q, embed_dim)

        return output, attention_weights

class SelfAttention(nn.Module):
    """Self-attention layer"""
    def __init__(self, embed_dim, num_heads, dropout=0.1):
        super().__init__()
        self.multi_head_attention = AttentionMechanisms.multi_head_attention
        self.num_heads = num_heads
        self.embed_dim = embed_dim
        self.dropout = dropout

        # Linear layers for Q, K, V transformations
        self.q_linear = nn.Linear(embed_dim, embed_dim)
        self.k_linear = nn.Linear(embed_dim, embed_dim)
        self.v_linear = nn.Linear(embed_dim, embed_dim)
        self.out_linear = nn.Linear(embed_dim, embed_dim)

        self.dropout_layer = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # For self-attention, query, key, and value are all the same
        query = self.q_linear(x)
        key = self.k_linear(x)
        value = self.v_linear(x)

        # Apply multi-head attention
        attn_output, attention_weights = self.multi_head_attention(
            query, key, value, self.num_heads, self.embed_dim, mask, self.dropout
        )

        # Apply output linear transformation and dropout
        output = self.out_linear(attn_output)
        output = self.dropout_layer(output)

        return output, attention_weights

class CrossAttention(nn.Module):
    """Cross-attention layer (used in decoder)"""
    def __init__(self, embed_dim, num_heads, dropout=0.1):
        super().__init__()
        self.multi_head_attention = AttentionMechanisms.multi_head_attention
        self.num_heads = num_heads
        self.embed_dim = embed_dim
        self.dropout = dropout

        # Linear layers for Q, K, V transformations
        self.q_linear = nn.Linear(embed_dim, embed_dim)
        self.k_linear = nn.Linear(embed_dim, embed_dim)
        self.v_linear = nn.Linear(embed_dim, embed_dim)
        self.out_linear = nn.Linear(embed_dim, embed_dim)

        self.dropout_layer = nn.Dropout(dropout)

    def forward(self, query, key_value, mask=None):
        # Query comes from decoder, key and value come from encoder
        query_proj = self.q_linear(query)
        key_proj = self.k_linear(key_value)
        value_proj = self.v_linear(key_value)

        # Apply multi-head attention
        attn_output, attention_weights = self.multi_head_attention(
            query_proj, key_proj, value_proj, self.num_heads, self.embed_dim, mask, self.dropout
        )

        # Apply output linear transformation and dropout
        output = self.out_linear(attn_output)
        output = self.dropout_layer(output)

        return output, attention_weights

def create_causal_mask(seq_length):
    """Create causal mask for decoder self-attention"""
    mask = torch.triu(torch.ones(seq_length, seq_length), diagonal=1).bool()
    return ~mask  # True for positions that should be attended to

def demonstrate_attention_mechanisms():
    """Demonstrate different attention mechanisms"""
    print("Attention Mechanisms Demonstration")
    print("=" * 50)

    # Set random seed for reproducibility
    torch.manual_seed(42)
    np.random.seed(42)

    # Create sample input
    batch_size, seq_length, embed_dim = 2, 10, 64
    num_heads = 8

    x = torch.randn(batch_size, seq_length, embed_dim)
    print(f"Input shape: {x.shape}")

    # 1. Scaled Dot-Product Attention
    print("\\n1. Scaled Dot-Product Attention:")
    query = torch.randn(batch_size, num_heads, seq_length, embed_dim // num_heads)
    key = torch.randn(batch_size, num_heads, seq_length, embed_dim // num_heads)
    value = torch.randn(batch_size, num_heads, seq_length, embed_dim // num_heads)

    output, weights = AttentionMechanisms.scaled_dot_product_attention(query, key, value)
    print(f"Output shape: {output.shape}")
    print(f"Attention weights shape: {weights.shape}")

    # 2. Multi-Head Attention
    print("\\n2. Multi-Head Attention:")
    mha_output, mha_weights = AttentionMechanisms.multi_head_attention(
        x, x, x, num_heads, embed_dim
    )
    print(f"Multi-head output shape: {mha_output.shape}")
    print(f"Multi-head weights shape: {mha_weights.shape}")

    # 3. Self-Attention Layer
    print("\\n3. Self-Attention Layer:")
    self_attn = SelfAttention(embed_dim, num_heads)
    sa_output, sa_weights = self_attn(x)
    print(f"Self-attention output shape: {sa_output.shape}")
    print(f"Self-attention weights shape: {sa_weights.shape}")

    # 4. Causal Mask (for autoregressive models)
    print("\\n4. Causal Mask for Decoder:")
    causal_mask = create_causal_mask(seq_length)
    print(f"Causal mask shape: {causal_mask.shape}")
    print("Causal mask (showing first 5x5):")
    print(causal_mask[:5, :5])

    # 5. Cross-Attention
    print("\\n5. Cross-Attention Layer:")
    cross_attn = CrossAttention(embed_dim, num_heads)
    # Simulate encoder output and decoder input
    encoder_output = torch.randn(batch_size, seq_length, embed_dim)
    decoder_input = torch.randn(batch_size, seq_length // 2, embed_dim)

    ca_output, ca_weights = cross_attn(decoder_input, encoder_output)
    print(f"Cross-attention output shape: {ca_output.shape}")
    print(f"Cross-attention weights shape: {ca_weights.shape}")

    return {
        'scaled_dot_product': {'output': output, 'weights': weights},
        'multi_head': {'output': mha_output, 'weights': mha_weights},
        'self_attention': {'output': sa_output, 'weights': sa_weights},
        'cross_attention': {'output': ca_output, 'weights': ca_weights},
        'causal_mask': causal_mask
    }

# Run demonstration
attention_demo = demonstrate_attention_mechanisms()
print("\\nAttention mechanisms demonstration completed!")
print("All attention mechanisms implemented successfully!")`,
    "Built comprehensive attention mechanism with scaled dot-product and multi-head attention!"
  );

  // Mission 3: Tokenization
  updateMission(chapter, 'mission_03',
    "Tokenization",
    "Create a tokenization system to convert text into numerical tokens for model processing. Implement subword tokenization, special token handling, and vocabulary management.",
    [
      "Tokenization breaks text into meaningful units",
      "Subword tokenization balances vocabulary size and coverage",
      "Special tokens handle padding, start, and end"
    ],
    `import re
import collections
from typing import List, Dict, Tuple, Set
import json

class BaseTokenizer:
    """Base tokenizer class with common functionality"""
    def __init__(self, vocab_size: int = 30000):
        self.vocab_size = vocab_size
        self.special_tokens = {
            '<PAD>': 0,    # Padding token
            '<UNK>': 1,    # Unknown token
            '<SOS>': 2,    # Start of sequence
            '<EOS>': 3,    # End of sequence
            '<MASK>': 4,   # Mask token (for BERT-style models)
        }
        self.vocab = {}
        self.inverse_vocab = {}

    def _preprocess_text(self, text: str) -> str:
        """Basic text preprocessing"""
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace
        text = re.sub(r'\\s+', ' ', text.strip())
        return text

    def fit(self, texts: List[str]):
        """Build vocabulary from training texts"""
        raise NotImplementedError

    def encode(self, text: str) -> List[int]:
        """Convert text to token IDs"""
        raise NotImplementedError

    def decode(self, token_ids: List[int]) -> str:
        """Convert token IDs back to text"""
        raise NotImplementedError

    def save_vocab(self, filepath: str):
        """Save vocabulary to file"""
        vocab_data = {
            'vocab': self.vocab,
            'special_tokens': self.special_tokens,
            'vocab_size': self.vocab_size
        }
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(vocab_data, f, ensure_ascii=False, indent=2)

    def load_vocab(self, filepath: str):
        """Load vocabulary from file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            vocab_data = json.load(f)
        self.vocab = vocab_data['vocab']
        self.special_tokens = vocab_data['special_tokens']
        self.vocab_size = vocab_data['vocab_size']
        self.inverse_vocab = {v: k for k, v in self.vocab.items()}

class WordTokenizer(BaseTokenizer):
    """Word-level tokenizer"""
    def fit(self, texts: List[str]):
        """Build word-level vocabulary"""
        word_freq = collections.Counter()

        for text in texts:
            processed_text = self._preprocess_text(text)
            words = processed_text.split()
            word_freq.update(words)

        # Sort by frequency and take top vocab_size words
        most_common = word_freq.most_common(self.vocab_size - len(self.special_tokens))

        # Build vocabulary
        self.vocab = dict(self.special_tokens)
        for idx, (word, _) in enumerate(most_common, start=len(self.special_tokens)):
            self.vocab[word] = idx

        self.inverse_vocab = {v: k for k, v in self.vocab.items()}

    def encode(self, text: str) -> List[int]:
        """Convert text to word token IDs"""
        processed_text = self._preprocess_text(text)
        words = processed_text.split()
        token_ids = []

        for word in words:
            token_id = self.vocab.get(word, self.special_tokens['<UNK>'])
            token_ids.append(token_id)

        return token_ids

    def decode(self, token_ids: List[int]) -> str:
        """Convert word token IDs back to text"""
        words = []
        for token_id in token_ids:
            if token_id in self.inverse_vocab:
                token = self.inverse_vocab[token_id]
                if token not in self.special_tokens.values():  # Don't include special tokens in output
                    words.append(token)
        return ' '.join(words)

class BytePairEncodingTokenizer(BaseTokenizer):
    """Byte Pair Encoding (BPE) tokenizer - simplified implementation"""
    def __init__(self, vocab_size: int = 30000):
        super().__init__(vocab_size)
        self.merges = {}  # Store BPE merges

    def _get_stats(self, vocab: Dict[str, int]) -> Dict[Tuple[str, str], int]:
        """Count frequency of symbol pairs"""
        pairs = collections.defaultdict(int)
        for word, freq in vocab.items():
            symbols = word.split()
            for i in range(len(symbols) - 1):
                pairs[symbols[i], symbols[i + 1]] += freq
        return pairs

    def _merge_vocab(self, pair: Tuple[str, str], vocab: Dict[str, int]) -> Dict[str, int]:
        """Merge the most frequent pair in vocabulary"""
        bigram = ' '.join(pair)
        replacement = ''.join(pair)
        new_vocab = {}

        for word in vocab:
            new_word = word.replace(bigram, replacement)
            new_vocab[new_word] = vocab[word]

        return new_vocab

    def fit(self, texts: List[str]):
        """Train BPE tokenizer"""
        # Pre-tokenize into characters
        vocab = collections.Counter()
        for text in texts:
            processed_text = self._preprocess_text(text)
            # Split into characters and add spaces between them
            char_sequence = ' '.join(list(processed_text))
            vocab[char_sequence] += 1

        # Initial vocabulary size (characters)
        num_merges = self.vocab_size - len(self.special_tokens) - len(vocab)

        # Perform BPE merges
        for i in range(num_merges):
            pairs = self._get_stats(vocab)
            if not pairs:
                break

            # Find most frequent pair
            best_pair = max(pairs, key=pairs.get)
            vocab = self._merge_vocab(best_pair, vocab)
            self.merges[best_pair] = i

        # Build final vocabulary
        self.vocab = dict(self.special_tokens)
        idx = len(self.special_tokens)
        for word in vocab.keys():
            if word not in self.vocab and idx < self.vocab_size:
                self.vocab[word] = idx
                idx += 1

        self.inverse_vocab = {v: k for k, v in self.vocab.items()}

    def encode(self, text: str) -> List[int]:
        """Encode text using BPE"""
        processed_text = self._preprocess_text(text)

        # Start with character-level tokenization
        word = ' '.join(list(processed_text))

        # Apply merges in order
        for pair, _ in sorted(self.merges.items(), key=lambda x: x[1]):
            bigram = ' '.join(pair)
            replacement = ''.join(pair)
            word = word.replace(bigram, replacement)

        # Split into tokens and convert to IDs
        tokens = word.split()
        token_ids = []

        for token in tokens:
            token_id = self.vocab.get(token, self.special_tokens['<UNK>'])
            token_ids.append(token_id)

        return token_ids

    def decode(self, token_ids: List[int]) -> str:
        """Decode BPE tokens back to text"""
        tokens = []
        for token_id in token_ids:
            if token_id in self.inverse_vocab:
                token = self.inverse_vocab[token_id]
                if token not in ['<PAD>', '<UNK>', '<SOS>', '<EOS>', '<MASK>']:
                    # Remove spaces between characters (BPE artifact)
                    token = token.replace(' ', '')
                    tokens.append(token)

        return ''.join(tokens)

class SentencePieceTokenizer(BaseTokenizer):
    """Simplified SentencePiece-style tokenizer (Unigram Language Model)"""
    def __init__(self, vocab_size: int = 30000, character_coverage: float = 0.9995):
        super().__init__(vocab_size)
        self.character_coverage = character_coverage
        self.scores = {}  # Store unigram scores

    def _extract_characters(self, texts: List[str]) -> Set[str]:
        """Extract unique characters from texts"""
        characters = set()
        for text in texts:
            characters.update(list(text))
        return characters

    def _initialize_vocab(self, characters: Set[str]) -> Dict[str, float]:
        """Initialize vocabulary with characters"""
        vocab = {}
        for char in characters:
            vocab[char] = 1.0 / len(characters)  # Uniform initial probability
        return vocab

    def _compute_unigram_scores(self, vocab: Dict[str, float], texts: List[str]):
        """Compute unigram language model scores using EM algorithm"""
        # Simplified implementation - in practice, this would use EM algorithm
        # For demonstration, we'll use character frequencies
        char_freq = collections.Counter()
        total_chars = 0

        for text in texts:
            for char in text:
                char_freq[char] += 1
                total_chars += 1

        # Update vocab with actual frequencies
        for char in vocab:
            vocab[char] = char_freq[char] / total_chars

        self.scores = vocab.copy()

    def fit(self, texts: List[str]):
        """Train SentencePiece tokenizer"""
        # Extract characters
        characters = self._extract_characters(texts)

        # Initialize vocabulary
        vocab_probs = self._initialize_vocab(characters)

        # Compute unigram scores
        self._compute_unigram_scores(vocab_probs, texts)

        # Build final vocabulary (simplified - real implementation is more complex)
        self.vocab = dict(self.special_tokens)

        # Sort by probability and add top tokens
        sorted_chars = sorted(vocab_probs.items(), key=lambda x: x[1], reverse=True)
        idx = len(self.special_tokens)

        for char, _ in sorted_chars:
            if idx >= self.vocab_size:
                break
            self.vocab[char] = idx
            idx += 1

        self.inverse_vocab = {v: k for k, v in self.vocab.items()}

    def encode(self, text: str) -> List[int]:
        """Encode text using unigram model"""
        processed_text = self._preprocess_text(text)
        token_ids = []

        for char in processed_text:
            token_id = self.vocab.get(char, self.special_tokens['<UNK>'])
            token_ids.append(token_id)

        return token_ids

    def decode(self, token_ids: List[int]) -> str:
        """Decode tokens back to text"""
        chars = []
        for token_id in token_ids:
            if token_id in self.inverse_vocab:
                token = self.inverse_vocab[token_id]
                if token not in self.special_tokens:
                    chars.append(token)
        return ''.join(chars)

def demonstrate_tokenizers():
    """Demonstrate different tokenization approaches"""
    print("Tokenizer Implementations")
    print("=" * 50)

    # Sample texts for training
    training_texts = [
        "Hello world! This is a test sentence.",
        "Natural language processing with transformers.",
        "Tokenization is the first step in NLP.",
        "Machine learning models need numerical inputs.",
        "Attention mechanisms revolutionized NLP."
    ]

    test_text = "Hello, world! This is a test."

    # 1. Word-level tokenizer
    print("\\n1. Word-Level Tokenizer:")
    word_tokenizer = WordTokenizer(vocab_size=1000)
    word_tokenizer.fit(training_texts)

    word_tokens = word_tokenizer.encode(test_text)
    word_decoded = word_tokenizer.decode(word_tokens)

    print(f"Original: {test_text}")
    print(f"Word tokens: {word_tokens}")
    print(f"Decoded: {word_decoded}")

    # 2. BPE tokenizer
    print("\\n2. Byte Pair Encoding (BPE) Tokenizer:")
    bpe_tokenizer = BytePairEncodingTokenizer(vocab_size=1000)
    bpe_tokenizer.fit(training_texts)

    bpe_tokens = bpe_tokenizer.encode(test_text)
    bpe_decoded = bpe_tokenizer.decode(bpe_tokens)

    print(f"Original: {test_text}")
    print(f"BPE tokens: {bpe_tokens}")
    print(f"Decoded: {bpe_decoded}")

    # 3. SentencePiece-style tokenizer
    print("\\n3. SentencePiece-Style (Unigram) Tokenizer:")
    sp_tokenizer = SentencePieceTokenizer(vocab_size=1000)
    sp_tokenizer.fit(training_texts)

    sp_tokens = sp_tokenizer.encode(test_text)
    sp_decoded = sp_tokenizer.decode(sp_tokens)

    print(f"Original: {test_text}")
    print(f"Unigram tokens: {sp_tokens}")
    print(f"Decoded: {sp_decoded}")

    # Compare vocabulary sizes
    print("\\n4. Vocabulary Comparison:")
    print(f"Word tokenizer vocab size: {len(word_tokenizer.vocab)}")
    print(f"BPE tokenizer vocab size: {len(bpe_tokenizer.vocab)}")
    print(f"Unigram tokenizer vocab size: {len(sp_tokenizer.vocab)}")

    return {
        'word_tokenizer': word_tokenizer,
        'bpe_tokenizer': bpe_tokenizer,
        'sp_tokenizer': sp_tokenizer,
        'test_results': {
            'original': test_text,
            'word_tokens': word_tokens,
            'bpe_tokens': bpe_tokens,
            'unigram_tokens': sp_tokens
        }
    }

# Run demonstration
tokenizer_demo = demonstrate_tokenizers()
print("\\nTokenization demonstration completed!")
print("All tokenization methods implemented successfully!")`,
    "Created comprehensive tokenization system with subword and special token handling!"
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
updateLLMBasicsMissions();
console.log("LLM Basics missions 1-3 update completed!");