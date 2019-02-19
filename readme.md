# @absolunet/nwayo-extension-styleguide

[![npm](https://img.shields.io/npm/v/@absolunet/nwayo-extension-styleguide.svg)](https://www.npmjs.com/package/@absolunet/nwayo-extension-styleguide)
[![npm dependencies](https://david-dm.org/absolunet/nwayo-extension-styleguide/status.svg)](https://david-dm.org/absolunet/nwayo-extension-styleguide)
[![npms](https://badges.npms.io/%40absolunet%2Fnwayo-extension-styleguide.svg)](https://npms.io/search?q=%40absolunet%2Fnwayo-extension-styleguide)
[![Travis CI](https://api.travis-ci.org/absolunet/nwayo-extension-styleguide.svg?branch=master)](https://travis-ci.org/absolunet/nwayo-extension-styleguide/builds)
[![Code style ESLint](https://img.shields.io/badge/code_style-@absolunet/node-659d32.svg)](https://github.com/absolunet/eslint-config-node)

> Styleguide generation for [nwayo](https://absolunet.github.io/nwayo)

## Install

```sh
$ npm install @absolunet/nwayo-extension-styleguide
```


## Build

```sh
$ nwayo run styleguide:build
```


## Usage

### nwayo.yaml
```yaml
extensions:
  '@absolunet/styleguide':
    enabled: true
    options:
      main:                            # ID
        name: My wonderful site        # Display name
        bundle: site                   # Bundle to base everything from
        output: ../pub/styleguide      # Output path
        icons-component: site          # Which component to use for iconography
        scripts-collections:           # List of scripts collections to use
          - dependencies-head-sync
          - dependencies
          - main
        styles-collections:            # List of styles collections to use
          - main
        sections:                      # Ordered list of components to crawl for styleguide files
          - name: General
            component: site
          - name: Home widgets
            component: widget
      blog:                            # Second styleguide [...]
        name: My wonderful blog
        # [...]
```

### styleguide.jshtml
- Under `[...]/nwayo/[COMPONENT]/extensions/styleguide/`
- A [JsRender](https://www.jsviews.com) template of your styleguide for this component

```handlebars
{{sgIntro ~title="Base for site"}}
	<p>This are the base styles for <a href="/">this site</a></p>
{{/sgIntro}}

{{sgContent}}
	{{sgTitle}}Common{{/sgTitle}}

	{{sgSubtitle}}Color palettes{{/sgSubtitle}}

	{{sgSubsubtitle}}Brands{{/sgSubsubtitle}}
	{{sgBox ~border=true}}
		{{include tmpl="color" ~hex=~konstan('color.brand.red')   ~name="Red" /}}
		{{include tmpl="color" ~hex=~konstan('color.brand.green') ~name="Green" /}}
	{{/sgBox}}

	{{sgSubsubtitle}}Texts, borders and backgrounds{{/sgSubsubtitle}}
	{{sgBox ~border=true}}
		{{include tmpl="color" ~hex=~konstan('color.charcoal') ~name="Charcoal" /}}
	{{/sgBox}}


	{{sgSubtitle}}Fonts{{/sgSubtitle}}
	{{sgBox ~border=true}}
		{{include tmpl="font" ~name="Roboto Regular" ~family="~konstan('font.base')" ~weight="400" /}}
		{{include tmpl="font" ~name="Roboto Black"   ~family="~konstan('font.base')" ~weight="900" /}}
		{{include tmpl="font" ~name="Mali Regular"   ~family="~konstan('font.alt')"  ~weight="400" /}}
	{{/sgBox}}


	{{sgSubtitle}}Typography{{/sgSubtitle}}
	{{sgBox ~class="page-main"}}
		{{sgCell ~nb="2" ~spacing=true}}
			<h1>&lt;h1&gt; Title</h1>
			<h2>&lt;h2&gt; Title</h2>
			<h3>&lt;h3&gt; Title</h3>
		{{/sgCell}}
		{{sgCell ~nb="2" ~spacing=true}}
			<h4>&lt;h4&gt; Title</h4>
			<h5>&lt;h5&gt; Title</h5>
			<h6>&lt;h6&gt; Title</h6>
		{{/sgCell}}
	{{/sgBox}}

	{{sgSubtitle}}Widget{{/sgSubtitle}}
	{{sgBox}}
		<aside class="widget" style="background-image:url(/images/our-product.jpg)">
			<div class="widget-content">
				<h6 class="title">Our product<sup>™</sup></h6>
				<p class="text">Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod</p>
				<a href="/en/our-product" class="button">Buy</a>
			</div>
		</aside>
	{{/sgBox}}
{{/sgContent}}
```




## JsRender custom tags

### {{sgIntro}}
Styleguide intro

#### ~title
`String` Title of the intro block

```handlebars
{{sgIntro ~title="Base for site"}}
	<p>This are the base styles for <a href="/">this site</a></p>
{{/sgIntro}}
```



### {{sgContent}}
Whole styleguide content wrapper

```handlebars
{{sgContent}}
	Everything except the intro goes here
{{/sgContent}}
```



### {{sgTitle}}
Section title (level 1)

```handlebars
{{sgTitle}}Section{{/sgTitle}}
```



### {{sgSubtitle}}
Section subtitle (level 2)

```handlebars
{{sgSubtitle}}Subsection{{/sgSubtitle}}
```



### {{sgSubsubtitle}}
Section sub-subtitle (level 3)

```handlebars
{{sgSubsubtitle}}Subsubsection{{/sgSubsubtitle}}
```



### {{sgBox}}
Content box

#### ~border *(Optional)*
`Boolean` If the box has a border

#### ~style *(Optional)*
`String` Predefined style (`dark`)

#### ~class *(Optional)*
`String` Additional custom class

```handlebars
{{sgBox ~border=true ~style="dark"}}
	<ol class="reversed">
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ol>
{{/sgBox}}

{{sgBox ~class="message-box"}}
	<div class="success">Hooray</div>
	<div class="warning">Caution</div>
	<div class="error">Booo</div>
{{/sgBox}}
```



### {{sgCell}}
Content box cell

#### ~spacing *(Optional)*
`Boolean` If the box should have gutter spacing

#### ~nb
`Number` Number of cell per row (2 to 6)

```handlebars
{{sgBox}}
	{{sgCell ~nb="2"}}
		<button class="primary">Primary</button>
	{{/sgCell}}
	{{sgCell ~nb="2"}}
		<button class="secondary">Secondary</button>
	{{/sgCell}}
{{/sgBox}}
```




## JsRender templates

### color
Color palette item

#### ~hex
`String` Hexadecimal color code

#### ~name
`String` Readable name

```handlebars
{{include tmpl="color" ~hex="#cc0000" ~name="brand-red" /}}
```



### font
Font item

#### ~name
`String` Readable name

#### ~family
`String` font-family css property

#### ~weight *(Optional)*
`String` font-weight css property

#### ~style *(Optional)*
`String` font-style css property

```handlebars
{{include tmpl="font" ~name="Roboto Black Italic" ~family="Roboto" ~weight="900" ~style="italic" /}}
```




## JsRender helpers

### ~konstan(key)
Get item from konstan

#### key
`String` Dot-notation key

```handlebars
{{include tmpl="color" ~hex=~konstan('color.brand.red') ~name="Red" /}}
```




## License

MIT © [Absolunet](https://absolunet.com)
