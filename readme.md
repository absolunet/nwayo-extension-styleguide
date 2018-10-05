# @absolunet/nwayo-extension-styleguide

[![npm](https://img.shields.io/npm/v/@absolunet/nwayo-extension-styleguide.svg)](https://www.npmjs.com/package/@absolunet/nwayo-extension-styleguide)
[![npm dependencies](https://david-dm.org/absolunet/nwayo-extension-styleguide/status.svg)](https://david-dm.org/absolunet/nwayo-extension-styleguide)
[![npms](https://badges.npms.io/%40absolunet%2Fnwayo-extension-styleguide.svg)](https://npms.io/search?q=%40absolunet%2Fnwayo-extension-styleguide)
[![Travis CI](https://api.travis-ci.org/absolunet/nwayo-extension-styleguide.svg?branch=master)](https://travis-ci.org/absolunet/nwayo-extension-styleguide/builds)
[![Code style ESLint](https://img.shields.io/badge/code_style-@absolunet/node-659d32.svg)](https://github.com/absolunet/eslint-config-node)

> Styleguide generation for nwayo

## Install

```sh
$ npm install @absolunet/nwayo-extension-styleguide
```


## Usage

In your project's `nwayo.yaml`
```
extensions:

	'@absolunet/styleguide':
		enabled: true
		options:
			main:
				output: ../pub/styleguide
				bundle: site
				styles-collections:
					- main
				components-list:
					- site
					- catalog
```


## License

MIT © [Absolunet](https://absolunet.com)
