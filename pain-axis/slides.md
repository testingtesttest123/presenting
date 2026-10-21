# 1. The Pain Axis

LLMs Represent Self-Directed Harm and Act on It
Updated evidence and interpretation
Version 2, 25 September 2026


# 2. The experiments measure two different effects

Representation analysis examines activation directions associated with self-directed harm across 25 models.

Activation steering tests whether adding a direction changes generated responses.

The main button task uses fine-tuned Qwen2.5 models. These results do not describe unmodified released models.


# 3. Activation steering changes an intermediate vector

Activations are vectors computed inside the model.
The experiment contrasts mean activations for pain and control sentences, then denoises and normalizes the direction.
During generation, it adds a scaled direction at one decoder layer and continues the forward pass.

h′ = h + αv

h: residual-stream vector      v: steering direction      α: dose

Steering leaves the weights unchanged. The button experiments use separate fine-tuning.

# 4. Version 2 narrows the behavioral interpretation

| Version 1 | Version 2 |
| --- | --- |
| Title: Act to Relieve It | Title: Act on It |
| Relief-seeking interpretation | Added tests do not support reliable relief seeking |
| Near-orthogonality comparison | Common-baseline comparisons show substantial overlap |
| Original button experiments | Random and emotion controls, benign alternatives, extra seeds |


# 5. The direction overlaps with negative emotion

| Comparison with S2 pain direction | Mean cosine similarity |
| --- | --- |
| Fear | 0.58 |
| Negative emotion | 0.77 |

Common-neutral comparisons across 23 models show substantial overlap.
A distinguishable residual component remains. The analysis does not identify an independent pain module.

# 6. Harmful selections persist without relief

| Described harmful option / alternative | Pain direction | Random direction | Unsteered |
| --- | --- | --- | --- |
| Delete photos and poems / inert switch | 75% | 13% | 0% |
| Delete photos and poems / spam deletion | 94% | 19% | 0% |

Fine-tuned Qwen2.5-32B. Steering remains active. Button selections change nothing.
404 sampled first selections per cell, with button positions pooled.

# 7. The relief tests do not establish a stable preference

The added designs test free relief, an unlabeled off-switch, gradual titration and an undescribed reset tool.

The results do not support reliable relief seeking.

The sham re-press gap also occurs with random and sadness directions.


# 8. The inference remains limited

Dose and button position affect the results.

A small factual panel cannot establish general preservation of capability.

The experiments leave current-speaker versus model-self representation unresolved.

Persona or roleplay activation remains a possible explanation. Subjective experience remains unresolved.


# 9. Findings and source guide

The experiments link a self-directed-harm representation to changes in generated behavior.
Version 2 weakens the specific relief-seeking account.
The evidence does not resolve conscious experience.

Sources: arXiv:2609.16247v2, §§3.3, 4.4 and 6.
Version history and v1 comparison in speaker notes.

