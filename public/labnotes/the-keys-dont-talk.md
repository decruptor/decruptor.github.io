# The keys don't talk: a dependency audit of the Bitcoin puzzle transaction

The 256-output Bitcoin puzzle transaction is the most-solved key sequence in
the wild: 83 of its private keys are publicly known. A standing community
hypothesis is that the keys share structure — one generator, one template, one
entropy source — so structure learned from solved keys transfers to unsolved
ones. We audited that with a positive control gating every negative.

## What we asked

Are the 83 solved keys independent uniform draws in their ranges, or do they
carry cross-key structure a state-recovery attack could use?

## What we ran

The dataset came from on-chain ground truth, not community lists: all 256
addresses taken from the funding transaction's scriptPubKeys, re-encoded to
base58check and required to equal the published address (256/256 passed).
Every solved key was re-verified by from-scratch elliptic-curve derivation
(key → public key → hash160 → address), required to match both the community
address and the on-chain output plus a range check: zero failures in 83
(verified).

Two canonical generator conventions were defined (a continuous bitstream; per-key
fresh words with the top bits taken), with the structural observation that does
the heavy lifting: any key wider than the generator word spans at least two
complete words, so the solved keys expose full generator words — up to 106 —
with zero convention conflicts. On that frame we ran a uniformity battery
(six statistics, Monte-Carlo calibrated on 20,000 replicates of the null), a
recurrence battery (nine statistic classes: residues, mantissas, XOR/Hamming
distances, differences, linear relations over triples, shared prefixes, gcds),
and full state recovery per PRNG family: LCG mod 2^32 and 2^64, xorshift64*,
the 128-bit GF(2)-linear xorshift, xorshift128+ as used by JavaScript's
Math.random (SMT-solved), and java.util.Random — every family in
every applicable cell. A planted 64-bit LCG cut into keys by the same machinery
had to fire the battery before any real-data negative was believed — it did,
recovered exactly in both conventions; twelve of twelve planted families
recovered, the planted JavaScript state bit-exact.

## What we found

No dependency. The keys are consistent with independent uniform draws: the
battery-wide minimum p-value lands at the 39th and 59th percentiles
of the null's own minimum-p distribution — nothing fires. Every PRNG family is
rejected: no (a,c) pair fits any cell's full words, the xorshift chains break
immediately, the GF(2) systems are inconsistent, the SMT queries are
unsatisfiable, no 48-bit Java state reproduces the chain. MT19937 alone stays
formally open — at most 3,850 known bits against a 19,937-bit state,
underdetermined by structure; small and time-based seeds were already excluded
by an earlier brute force.

The dataset also corrected two pieces of folklore (verified on-chain): the
transaction was funded in January 2015, not 2019 — 2019 is when attention
surged; and puzzle n was funded exactly n x 0.001 BTC, 32.896 BTC total.
"320 BTC" is the later top-ups' prize pool. The "keys
roughly double" rule of thumb does not survive as a global property
(correlation 0.058, p = 0.66): the celebrated doubling pairs reduce to puzzle
4's key being its own exact minimum.

## What it proves

The keys are not truncations of a single-width LCG, xorshift, xorshift128+ or
java.util.Random stream under either canonical convention. That closes the
cheapest, most-attempted attack class on this puzzle.

## What it doesn't prove

Eighty-three keys is low statistical power; a per-key keyed map (say SHA-256
of a secret concatenated with n) is indistinguishable from random by
construction. MT19937 and wider-state generators remain open; the negative
covers these conventions, not all possible generators.

## Artifact

No public repository for this audit yet. The dataset is public by construction —
all 256 addresses come from the funding transaction's scriptPubKeys on-chain, and
every check described above is re-derivable from the chain without our scripts.
Solved-key count as of 2026-10-25: 83.
