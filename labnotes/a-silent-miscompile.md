# A silent miscompile on new GPU hardware

This one is not a negative — it is a detection case study, published because
the failure mode is the worst kind: a compiler bug that produces plausible,
silently-corrupted data instead of a crash. It cost us days of "impossible"
GPU counters before it was root-caused, and the isolation method is reusable.

## What we asked

Why did a CUDA elliptic-curve kernel produce distinguished-point statistics
that were impossible for the audited source code — an aggregate DP rate 24
times design, table inserts exactly equal to DP hits, and lane-0 hits carrying
a zero field element — while the same walk code on a CPU reference build was
bit-exact and arithmetically perfect?

## What we ran

The suspicion had to be earned line by line. We built a one-warp diagnostic
kernel that dumps per-round state (every lane's intermediate field elements)
for the first rounds, plus a 32-lane CPU replica of the same computation, and
compared them field by field. Round zero: everything bit-identical except the
two values extracted by ternary selects at the end of the warp-wide
batch-inversion step. That isolated the fault to exactly two lines of code.
The lines in question select, per lane, between a shuffle result and a
constant:

```
pref = (lane==0)  ? KC->R1_mont : shfl_up(incl,1);
suff = (lane==31) ? KC->R1_mont : shfl_down(suff,1);
```

Toolchain: CUDA 13.0, nvcc/ptxas V13.0.88, `-arch=sm_120`, on RTX PRO 6000
Blackwell hardware (measured, on our toolchain versions).

## What we found

The compiler miscompiles a ternary that picks between a `__shfl_sync` result
and a `__constant__` load. At the SASS level the selected value comes out with
limb-wise corruption — one limb from the correct source lane, one from the
calling lane's own pre-shuffle value, one equal to the constant — while the
PTX intermediate representation looks semantically correct. The corruption
propagates exactly as the algorithm's structure predicts: wrong exclusive
prefix/suffix products garble every lane's field inverse in the batch
inversion, which produces zero or garbage affine coordinates, which produces
fake distinguished points, which the insertion path re-inserts forever — a
self-amplifying cascade that inflates every downstream counter. Nothing
crashes; the numbers merely stop meaning what they say.

The fix is arithmetic-identical and avoids the pattern: shuffle into a
temporary, then conditionally overwrite the edge lane. Post-fix validation
(measured): the first 18 distinguished points bit-identical between GPU and
CPU reference builds, DP rate within 0.03% of the 2^-14 design value against a
plus-or-minus 1% gate, and an end-to-end random-kappa discrete-log solve that
verifies against an independent replay. The corrected clean baseline runs
873-876 million group operations per second on one card — about 2.8 times the
old "baseline", which the cascade had depressed all along.

## What it proves

On this toolchain and hardware combination (CUDA 13.0.88 targeting sm_120),
`x = cond ? shfl_result : constant;` is not safe. The general lesson is the
deliverable: validate any new GPU kernel by bit-comparing per-step traces
against a CPU reference build for the same seed before trusting any GPU-only
counter. A miscompile does not fail loudly; it fails convincingly.

## What it doesn't prove

The trigger boundaries are not mapped — we did not determine which other
ternary shapes, shuffle widths, or architectures are affected, and we do not
know whether the vendor is aware of the defect. The safe pattern costs
nothing measurable and is what we now use everywhere.

## Artifact

[repo: ecdlp-ladder](https://github.com/decruptor/ecdlp-ladder) —
[`test_transcript.txt`](https://github.com/decruptor/ecdlp-ladder/blob/main/test_transcript.txt)
(the CPU-reference validation transcript, sections 1–7) and
[`GPU80.md`](https://github.com/decruptor/ecdlp-ladder/blob/main/GPU80.md)
(GPU validation notes and the kernel this bug was found in).
