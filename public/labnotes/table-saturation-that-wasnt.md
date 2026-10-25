# Table saturation that wasn't

Two different "pathologies" were diagnosed in our GPU kangaroo solver within
two days. Both diagnoses were wrong, and both were produced by the same
measurement bug. This note is the methods post-mortem: how a host-side poll
interval masqueraded as two unrelated solver defects, and what finally
displaced both explanations.

## What we asked

Is a production-relevant Pollard-rho configuration (a distinguished-point
granularity of 2^-6 against a 2^21-entry shared table, driven by a herd of
385,000 parallel walks) valid, or does the table saturate and invalidate the
step counts?

## What we ran

The first conclusion on record said the configuration was invalid: the table
saturates under the herd, so observed solves were "post-saturation walking."
A second session replaced it with a different pathology: merge detection
firing 64-88x late, apparently supported by an apparent 3.06e9-step solve, a
600-second no-solve run, and a long run producing no candidate. Both
conclusions rested on the same instrument. The host loop polled the candidate
buffer every 1.5 seconds and — the load-bearing discovery — never stopped the
kernel on a time budget, because the budget parameter was only ever parsed in
a diagnostic build. So every "solve" was timestamped by the first poll after
the true detection (the "3.06e9-step solve" was 1.5 seconds of walking at
2,023 million steps per second past the real event), and every "budgeted
no-solve" was a budget-blind run that would have lasted forever and was
killed by shell timeouts instead. The CPU path detects candidates inline each
round, which is why CPU numbers always matched theory while GPU numbers
looked wildly off.

The decisive experiment was to fix the instrument, not the solver: rerun the
same configuration with 0.02-second polls. The same herd then solved in
49,283,072 steps — 2.36 times the naive birthday expectation, and consistent
with a herd merge-lag model that a 385,000-walk lockstep herd pays by
construction (median 1.10 times the model over 20 independent trials, all 20
passing end-to-end verification). At solve time the table held about 6e5
inserts against 8.39e6 slots: not saturated. A zero verification-failure
count across all runs separately killed the remaining hardware hypothesis.

## What we found

There was never a saturation pathology and never a detection pathology. There
was a 1.5-second quantization in the measurement path. The one real effect
found that day was different and benign: a two-fold rate drop when the shared
table genuinely saturates, from full-shard probing per distinguished-point
event — a property to configure around, not a defect.

## What it proves

Instrument before phenomenon. When a solver reports something impossible,
the first suspect is the loop that reports it. Concretely: timestamp events
in the kernel, not at the next poll; make every budget parameter actually
parsed on every build; use counters whose unbiasedness you have validated
against an exact reference (ours agreed within 0.3% on CPU). The same-day
control discipline caught a second harness bug on an unrelated target —
end-to-end planted controls exposed a formatting error feeding every candidate
to the derivation function, invisible to per-function selftests. And the day's
real positive result was measurement too: a same-card comparison of
RetiredCoder's hand-written SASS kernels against equivalent CUDA-C code
showed a 3.29x gap, which now sets the optimization agenda.

## What it doesn't prove

The corrected numbers validate one configuration at one herd size on one GPU
architecture. The quantization lesson generalizes; the specific step counts
do not.

## Artifact

No public repository for this post-mortem yet — the instrument fixes, the
planted-control discipline and the corrected numbers are campaign-internal for
now. The related GPU validation record that *is* public lives in
[ecdlp-ladder](https://github.com/decruptor/ecdlp-ladder)
(`test_transcript.txt`, `GPU80.md`).
