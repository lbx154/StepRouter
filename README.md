


# StepRouter: From Effort Priors to Utility Posteriors

<p align="center">
Utility-based routing of intermediate reasoning steps for large language models
</p>

---

## 📄 Paper

**StepRouter: From Effort Priors to Utility Posteriors**

Anonymous Authors  
ICML 2026 Submission

- 📄 Paper: *link coming soon*

---

## 🧠 Overview

Large language models increasingly rely on intermediate reasoning steps
(e.g., Chain-of-Thought, lemmas, or TODO-style subgoals).
However, not all intermediate steps are equally useful.
Indiscriminately accumulating reasoning steps often leads to
**context dilution** and degraded reasoning performance.

**StepRouter** addresses this problem by learning to estimate
the **utility of reasoning steps** and routing only the most useful
ones to the solver.

The core idea is simple:

1. Generate a pool of candidate reasoning steps.
2. Estimate the **utility** of each step using a lightweight scorer.
3. Route only the **top-k useful steps** to the downstream LLM.

This mechanism consistently improves reasoning accuracy
while reducing token consumption across multiple benchmarks.

---

## 🧩 Method

<p align="center">
<img src="figures/steprouter_overview.png" width="700">
</p>

**StepRouter Pipeline**

1. A backbone LLM generates a **sketch** and extracts a pool of candidate steps.
2. A lightweight **utility scorer** ranks steps by estimated usefulness.
3. The **top-20% steps** are routed to the solver.
4. The solver produces the final answer conditioned on selected steps.

### Utility Supervision

The utility scorer is trained using outcome-induced supervision:

- Solve the problem **with and without** a candidate step.
- Use an LLM judge to measure the improvement in solution quality.
- Train a lightweight ranking model to predict **step utility**.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
pip install -r requirements.txt
````

### 2. Train the StepRouter scorer

```bash
python scripts/train_scorer.py
```

### 3. Run inference with routing

```bash
python scripts/run_routing.py \
    --model qwen3-8b \
    --dataset aime
```

### 4. Example output

```
Input Problem:
Find all positive integers n such that ...

Selected Steps:
1. gcd(d, d+1) = 1
2. d | 39

Final Answer:
49
```

---

## 📊 Benchmarks

StepRouter is evaluated on three reasoning domains:

* **AIME** — competition mathematics reasoning
* **GPQA-Diamond** — graduate-level science QA
* **LiveCodeBench** — code generation

The method consistently improves reasoning accuracy while reducing
token consumption compared to direct solving and strong baselines.

---

## 📁 Repository Structure

```
StepRouter/
│
├── steprouter/
│   ├── scorer.py
│   ├── routing.py
│   └── utils.py
│
├── scripts/
│   ├── train_scorer.py
│   └── run_routing.py
│
├── data/
│
├── figures/
│   └── steprouter_overview.png
│
└── README.md
```

---

## 📚 Citation

If you find this work useful, please cite:

```
@article{steprouter2026,
  title={StepRouter: From Effort Priors to Utility Posteriors},
  author={Anonymous Authors},
  journal={ICML},
  year={2026}
}
```

---

## ⭐ TODO

* [ ] Release training data
* [ ] Release pretrained scorers
* [ ] Release evaluation scripts
* [ ] Add additional benchmarks

---

## 📬 Contact

More updates (datasets, checkpoints, and evaluation scripts) will be released soon.




