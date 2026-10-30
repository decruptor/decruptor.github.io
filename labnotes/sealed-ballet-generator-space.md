# Sealed: exhausting the Ballet generator space

A physical crypto-payment card product shipped paper backups whose
passphrases look machine-generated: twenty characters from a 36-character
alphabet, grouped in fives. If the passphrases come from a seeded generator —
seeded by time, a counter, or a serial number — the whole space collapses to
seed enumeration. Two sibling cards with published passphrases make the
hypothesis cheap to test: any candidate generator must reproduce both knowns
before it earns an expensive check against the target card. We enumerated the
plausible space to exhaustion.

## What we asked

Is the target card's passphrase an output of a seeded generator in an
enumerable family, given two exact known outputs of the same process?

## What we ran

The oracle came first and is the reason the compute is affordable. A validated
BIP38 implementation decrypts a solved sibling card end-to-end to its exact
published private key and address (verified), and a confirmation-code checker
validates the second card's printed passphrase (verified; a negative control
one character off is correctly rejected). A candidate check costs about half a
second; a generator replay costs microseconds. So every scan gates on
reproducing BOTH known passphrases exactly, and only a two-known fit ever
touches the target oracle.

On CPU we ran deterministic key-material-to-passphrase recipes (3,344
hash/HMAC/encoding constructions — no hit) and seeded-PRNG replay at roughly
15,000 seeds per second per core — too slow for the real hypothesis:
millisecond timestamps across the cards' issuance era, about 2.3e10 seeds,
times several generator families. So we ported the scan to a GPU, behind a
validation gate: 22 of 22 bit-exact GPU-versus-CPU state-dump comparisons
across eleven generator variants and both seed-key lengths, planted controls
caught at ratio 1.0, null windows producing zero false hits (measured).
Production coverage: the millisecond window 2019-11-01 to 2020-07-31 times six
generator variants; a batch-of-12 sliding-window model that drops the
assumption that the passphrase is the generator's first 20-draw output; and
integer counters 0 to 1e9 times six variants. Total: about 2.1e11 seed-variant
tests. As a cross-check, the GPU re-ran a completed CPU phase and reproduced
its zero-hit outcome exactly.

## What we found

Nothing, everywhere the hypothesis could live. Zero generator reproductions of
the two knowns across the entire enumerated space, control-verified at every
stage. The verdict for the target card is sealed: passphrase space about
2^103.4 against a half-second oracle is not an economic attack, and no
generator shortcut exists in the enumerated families.

The batch structure itself is verified on-chain: all three cards were funded
in one transaction, so the sibling cards' parameters were inside the same null
compute — no extension run is owed. A caveat matters: the second card's
unknown is the inverse of the target's. Its passphrase is publicly printed;
its encrypted-key block was never published, which puts that key
information-theoretically out of reach regardless of any generator break. A
generator break would have unlocked the target card only.

## What it proves

No seeded generator in the enumerated space — timestamp-seeded and
counter-seeded replay across the plausible families, including the
batch-slot-generalized model — produces these passphrases.

## What it doesn't prove

The enumeration covers the space we could define: the millisecond window, the
counter range, and standard library generator families. A custom generator, a
seed outside the window, or a family we did not model is untouched. The lane
is now watch-only: a collector photograph of another same-batch card, or an
on-chain sweep, would add free RNG samples — but no further compute is
justified on current evidence.

## Artifact

No public repository for this scan yet; the sweep parameters, the
control-verification method and the null result are fully described above, so
the search is repeatable from the note alone.
