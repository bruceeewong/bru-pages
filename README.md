# bru-pages

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> static web app

## Installation

```shell
$ yarn add bru-pages

# or npm
$ npm install bru-pages
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const bruPages = require('bru-pages')
const result = bruPages('zce')
// result => 'zce@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### bruPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; bruski <292803281@qq.com>



[downloads-image]: https://img.shields.io/npm/dm/bru-pages.svg
[downloads-url]: https://npmjs.org/package/bru-pages
[version-image]: https://img.shields.io/npm/v/bru-pages.svg
[version-url]: https://npmjs.org/package/bru-pages
[license-image]: https://img.shields.io/github/license/bruceeewong/bru-pages.svg
[license-url]: https://github.com/bruceeewong/bru-pages/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/bruceeewong/bru-pages.svg
[dependency-url]: https://david-dm.org/bruceeewong/bru-pages
[devdependency-image]: https://img.shields.io/david/dev/bruceeewong/bru-pages.svg
[devdependency-url]: https://david-dm.org/bruceeewong/bru-pages?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
