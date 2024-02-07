{{#title Client libraries for Atomic Data}}
# Client libraries for Atomic Data

## Javascript libraries

- [`@tomic/lib`](js.md): Core library for fetching, creating and updating Atomic Data.
- [`@tomic/react`](usecases/react.md)
- [`@tomic/svelte`](svelte.md)

## `atomic-lib` (Rust)

Library that powers `atomic-server` and `atomic-cli`. Features:

- An in-memory store
- Parsing (JSON-AD) / Serialization (JSON-AD, JSON-LD, TTL, N-Triples)
- Commit validation and processing
- Constructing Collections
- Path traversal
- Basic validation

[repository + issue tracker](https://github.com/atomicdata-dev/atomic-server).

## Applications

### `atomic-cli`

A tool for generating / querying Atomic Data from the command line. Install with `cargo install atomic-cli`.

```
atomic 0.20.0
Joep Meindertsma <joep@ontola.io>
Create, share, fetch and model linked atomic data!

USAGE:
    atomic-cli [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    destroy    Permanently removes a Resource. Uses Commits.
    edit       Edit a single Atom from a Resource using your text editor. Uses Commits.
    get        Traverses a Path and prints the resulting Resource or Value.
    help       Prints this message or the help of the given subcommand(s)
    list       List all bookmarks
    new        Create a Resource
    remove     Remove a single Atom from a Resource. Uses Commits.
    set        Update an Atom's value. Uses Commits.
    tpf        Finds Atoms using Triple Pattern Fragments.

Visit https://github.com/atomicdata-dev/atomic-data-browser for more info
```

[repository + issue tracker](https://github.com/atomicdata-dev/atomic-data-browser).


### Raycast extension: Full-text search from your desktop

[Install here](https://www.raycast.com/atomicdata-dev/atomic-data-browser).
