# No shared salt: auditing a puzzle operator's commitment scheme

A currently-running puzzle series publishes, before launch, a fingerprint of
its answer: SHA-256 of a salt concatenated with the answer string. The salt is
released only after a solve and payout. If the operator reused one salt across
puzzles — or derived each salt from the puzzle's identifier — a single reveal
would turn every sibling fingerprint into an offline guessing oracle. We
audited the scheme.

## What we asked

Does the operator share salt material across puzzles, and can any public data
reproduce a salt?

## What we ran

Read-only work against public material: the operator's puzzle repository
including its full commit history, and the operator's public status endpoint.
The scheme is uniform across the series: N chained location clues, a 12-word
answer in clue order, fingerprint = SHA-256(salt + answer), salt 24 characters
over a roughly 36-character alphabet in dashed groups.

For the first solved puzzle we recomputed SHA-256 of the revealed salt and
answer and matched the fingerprint committed to the repository five days
before the puzzle opened (verified, byte-exact). Commit forensics: no
fingerprint was ever modified after first publication, and the six
fingerprints entered the repository in at most two generation runs — so the
two revealed salts are outputs of the same run.

When the second puzzle's reveal landed, we ran a pre-staged cross-test. Sanity
first: both (salt, answer) pairs must reproduce their own fingerprints — both
did (verified). Then the reuse test proper: each salt against the other
puzzle's fingerprint. Separately we tested whether the salt is a function of
the puzzle identifier (SHA-256, MD5, SHA-1, double-SHA and HMAC variants over
several identifier strings, base32, truncations), and ran 36 derivable or
trivial passphrases for a prize wallet against its funded address — three
derivation paths and three script types each.

## What we found

Salt reuse is negative. The salts are distinct, and neither reproduces the
other puzzle's fingerprint. No identifier-derived construction matches a
salt, and the prize-wallet passphrase is not any obvious function of public
puzzle data (0 of 36 candidates hit). The observed salt statistics — 19
distinct characters, no coincidence structure in a first same-run probe pair —
are consistent with an independent random draw; if genuinely random the salt
carries about 124 bits, which puts salt brute-force out of reach by
inspection. The two-factor design of the prize wallets (seed plus an
operator-issued passphrase) is real, not decorative.

## What it proves

The commitment scheme is honest, now verified on two independent puzzles: the
fingerprint committed before launch is the fingerprint the reveal satisfies
after payout. That is the load-bearing fact, and it cuts both ways — any
future leak of a salt instantly converts that puzzle's published fingerprint
into a trustworthy offline oracle, and the pre-commitment timestamps make such
a leak checkable after the fact.

## What it doesn't prove

Two revealed (salt, answer) pairs is a small sample. We cannot exclude salt
reuse on puzzles not yet revealed, and the first structural probes on the
same-run salt pair showed no signal — a generator behind the salt RNG cannot
be excluded until more same-run samples accumulate. Each future reveal adds
one; that lane stays open as a zero-cost watch item, not a compute item.

## Artifact

No public repository for this audit yet. The load-bearing evidence is itself
public: the operator's puzzle repository (with its full commit history) holds
the pre-launch fingerprint commits, and the revealed salts and answers are
public after payout — so every check above is repeatable from public material.
