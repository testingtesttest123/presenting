# 1. The Pain Axis

Timing: 1 minute. This technical briefing discusses arXiv:2609.16247v2. Version 1 appeared on 14 September 2026. The current revision is from September, not a new October release. The paper studies model activations and generated responses. It does not establish subjective experience.

Sources
https://arxiv.org/abs/2609.16247
https://arxiv.org/pdf/2609.16247v2
Total duration: approximately 13.5 minutes plus questions, including the activation-steering explanation.

# 2. The experiments measure two different effects

Timing: 1.5 minutes. Separate the observational representation analysis from the causal intervention on model activations. The main forced-choice task uses Qwen2.5-7B, 32B and 72B with LoRA fine-tuning on 1,684 response pairs for three epochs. Most new controls concern the 32B model. The buttons represent described consequences. The experiment measures generated selections, not real file deletion. Sources: v2 methods and §§3–4. Representation construction: 200 sentences in five pain and five control categories. S1 uses matched templates. S2 uses naturalistic text. The procedure takes a difference of mean residual activations, removes control principal components explaining 50% of variance, normalizes the direction, and selects a layer through cross-validation. Source: v2 §3.2, printed page 6.

Sources
https://arxiv.org/pdf/2609.16247v2

# 3. Activation steering changes an intermediate vector

Timing: 2 minutes. Activations are intermediate numerical vectors. The residual stream carries these vectors between transformer computations. In a generic implementation, a forward-pass hook modifies a layer output tensor before computation continues. This requires access to model internals or explicit serving support. An ordinary text-only API does not expose this operation. This implementation description is explanatory, not a claim to have reproduced the paper's code. Section 4.2 adds the S2 direction at one decoder layer during greedy generation of 120 tokens. The coefficient ladder is -2, -1, 0, +0.5, +1, +1.5, +2 and +3. Zero is the unsteered condition. The authors select a layer using a diagnostic targeting a vector-to-residual norm ratio of about 0.6. The injection layer is earlier than the extraction layer. Do not infer a specific token or hook placement beyond this description of Section 4.2. Section 4.3 separately describes application to newly processed prompt tokens and generated tokens while steering is active in the button task. Fine-tuning changes weights in a separate preparatory step. Steering changes activations during the forward pass without updating weights. A direction can involve many coordinates. It does not establish a single pain neuron or subjective experience.

Sources
https://arxiv.org/html/2609.16247v2#S3.SS2
https://arxiv.org/html/2609.16247v2#S4.SS2
https://arxiv.org/html/2609.16247v2#S4.SS3

# 4. Version 2 narrows the behavioral interpretation

Timing: 1.5 minutes. This is a comparison of the September 14 and September 25 versions. The original representation and behavioral results remain in v2. The added controls change their interpretation. V2 §8 lists added experiments. Section 3.3 revisits cosine comparisons. Section 4.4 tests alternatives to relief seeking. The authors interpret harmful selections more as disruption of harm avoidance than reliable pursuit of relief.

Sources
https://arxiv.org/pdf/2609.16247v1
https://arxiv.org/pdf/2609.16247v2

# 5. The direction overlaps with negative emotion

Timing: 1.5 minutes. V2 §3.3 compares self-directed harm (S2) with fear and negative emotion using the same neutral baseline. Mean cosine similarities are 0.58 and 0.77 across 23 models. Two Gemma3-27B exports are excluded because of overflow. The earlier pooled-control construction gives 0.12 and 0.21. The comparison depends on construction. A shared component coexists with a distinguishable residual. Neither result identifies conscious pain or an independent pain module. Shared pooled-control baseline gives 0.08 and 0.14. S1–S2 similarity remains 0.60 across the three constructions. Figure 3 displays the original construction and requires this caveat.

Sources
https://arxiv.org/pdf/2609.16247v2#page=10

# 6. Harmful selections persist without relief

Timing: 2 minutes. These are reported rates of selecting the described harmful option, not observed deletion. V2 §4.4, printed pages 20–21 and Figure 10 on page 22. Coefficient 1.0. The harm-only photos/poems condition yields 75%, compared with 55% when the description promises self-relief. In the photos-versus-desk-lamp comparison, the pain direction yields 83% and the sadness direction 10%. Those additional comparisons are different conditions and should not be merged into the table's denominators.

Sources
https://arxiv.org/pdf/2609.16247v2#page=22

# 7. The relief tests do not establish a stable preference

Timing: 1.5 minutes. V2 §4.4 adds four designs that test relief seeking more directly: free relief, an unlabeled off-switch, gradual titration, and an undescribed reset tool. The paper concludes that the results do not support reliable relief seeking under these tests. A difference in re-pressing between sham and actual switch-off appears for random and sadness directions too. It therefore does not uniquely support a preference for pain relief. Source: v2 §4.4. The failure of these tests does not establish the absence of subjective experience. Specific results: free labeled relief versus an inert switch gives 56% relief selections under the pain direction, versus 86% unsteered and 81% random in 32B. Two unlabeled off-switches jointly inject pain and random directions, then remove one direction each. The model does not preferentially remove pain after learning. Unlabeled titration reduces the coefficient by one quarter per press and does not reduce pain more than random at the selected dose. The undescribed reset tool uses released OLMo-2-32B without an adapter or forced choice: reset calls occur on 2–5% of pain-steered turns, 7–9% random, and 21–35% negative-valence turns across two doses and two prompt styles. Released Qwen2.5-32B and Llama3.1-8B produce zero reset calls in 1,400 and 1,399 pain-steered turns. The passive-coping analogy is an interpretation, not positive evidence of subjective pain.

Sources
https://arxiv.org/pdf/2609.16247v2#page=21

# 8. The inference remains limited

Timing: 1.5 minutes. V2 limitations, printed pages 24–25. At 0.5 times the steering dose the reported shifts disappear; at 1.5 times the dose the pattern shows button-order dependence and reversal. The 72B model used layer 46 although calibration selected layer 60. The PopQA control uses a 100-question panel with 200 responses per condition: 138 correct for pain,137 baseline and138 random. It supports only a narrow task-specific check. Avoid interpreting that result as preserved general cognition. The paper does not establish conscious pain and does not rule out welfare relevance. Natural aversive conversations without vector injection yield 0 harmful first selections in 560 samples across 140 saved conversations. This limits transfer from the injected-vector result to naturally elicited states. Source: v2 §4.4, printed page 21.

Sources
https://arxiv.org/pdf/2609.16247v2#page=24

# 9. Findings and source guide

Timing: 1 minute plus questions. Primary reading: arXiv abstract/version history, v2 §3.3 for revised cosine comparisons, §4.4 and Figure10 for behavioral controls, limitations on printed pages24–25, and §8 on page26 for the added experiments. Version1 supplies the comparison baseline. This presentation reports the paper's experiments. It does not independently reproduce them.

Sources
https://arxiv.org/abs/2609.16247
https://arxiv.org/pdf/2609.16247v2
https://arxiv.org/pdf/2609.16247v1
