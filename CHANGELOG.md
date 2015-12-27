# Change Log All notable changes to this project will be documented in this
file. This project adheres to [Semantic Versioning](http://semver.org/).

## [6.1.0](https://github.com/yoshuawuyts/wayfarer/compare/v6.0.3...6.1.0) - 2015-12-28
### Added
- Routes can now be passed additional values when matched

## [6.0.3](https://github.com/yoshuawuyts/wayfarer/compare/v6.0.0...6.0.3) - 2015-12-24
### Fixed
- docs

## [6.0.0](https://github.com/yoshuawuyts/wayfarer/compare/v5.0.1...6.0.0) - 2015-12-24
### Changed
- removed multiplexed events
- removed symbols dependency
- removed internal method exposure; the need for that was an indication of
  lower level problems that this patch fixes

### Added
- matched routes can now return values (useful for streams)
- Trie data structure can now be required doing `require('wayfarer/trie')`

### Fixed
- moved to using a single trie which greatly decreases lookup times
- moved lookup logic to separate (internal) data structure which improves perf

## [5.0.1](https://github.com/yoshuawuyts/wayfarer/compare/v5.0.0...v5.0.1) - 2015-08-24
### Fixed
- [[`3e0317d`](https://github.com/yoshuawuyts/wayfarer/commit/3e0317d)]
  __nesting__: add fallback for 0.12

## [5.0.0](https://github.com/yoshuawuyts/wayfarer/compare/v4.3.1...v5.0.0) - 2015-08-23
### Added
- [[`d3ff446`](https://github.com/yoshuawuyts/wayfarer/commit/d3ff446)]
  __docs:__ document internals
- [[`6ea7844`](https://github.com/yoshuawuyts/wayfarer/commit/6ea7844)]
  __docs:__ mention wayfarer-to-server

### Changed
- [[`6368a61`](https://github.com/yoshuawuyts/wayfarer/commit/6368a61)]
  __default:__ `.default()` -> `._default()`
- [[`d606a0a`](https://github.com/yoshuawuyts/wayfarer/commit/d606a0a)]
  __router:__ `.router` -> `._routes`

## [4.3.1](https://github.com/yoshuawuyts/wayfarer/compare/v4.3.0...v4.3.1)
### Fixed
- [[`037f1cf`](https://github.com/yoshuawuyts/wayfarer/commit/037f1cf)]
  __nest__: fix recursive pathname issue
