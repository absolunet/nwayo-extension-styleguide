//--------------------------------------------------------
//-- Styleguide - Template
//--------------------------------------------------------
'use strict';

const jsrender = require('jsrender');
const fss      = require('@absolunet/fss');


const __ = {
	tmplMain: {},
	tmplComponents: {},
	tmplTags: {}
};






class Template {

	get container() {
		return __.tmplMain.container;
	}

	get section() {
		return __.tmplMain.section;
	}


	getComponentTemplate(component) {
		if (!__.tmplComponents[component]) {
			__.tmplComponents[component] = jsrender.templates(fss.readFile(`${__.extension.getComponentDirectory(component)}/${__.extension.id}.jshtml`, 'utf8'));
		}

		return __.tmplComponents[component];
	}


	init({ root, extension }) {
		const TEMPLATES_DIR = `${root}/resources/templates`;

		__.extension = extension;

		// Main templates
		fss.readdir(TEMPLATES_DIR).forEach((filename) => {
			if (filename.endsWith('.jshtml')) {
				const [file] = filename.split('.');
				__.tmplMain[file] = jsrender.templates(fss.readFile(`${TEMPLATES_DIR}/${filename}`, 'utf8'));
			}
		});

		// Items
		fss.readdir(`${TEMPLATES_DIR}/items`).forEach((filename) => {
			if (filename.endsWith('.jshtml')) {
				const [file] = filename.split('.');
				jsrender.templates(file, fss.readFile(`${TEMPLATES_DIR}/items/${filename}`, 'utf8'));
			}
		});


		// Tags
		fss.readdir(`${TEMPLATES_DIR}/tags`).forEach((filename) => {
			if (filename.endsWith('.jshtml')) {
				const [file] = filename.split('.');
				__.tmplTags[file] = jsrender.templates(fss.readFile(`${TEMPLATES_DIR}/tags/${filename}`, 'utf8'));
			}
		});


		jsrender.views.tags({
			sgTitle: function() {
				return __.tmplTags.title.render({
					content: this.tagCtx.render()
				});
			},

			sgSubtitle: function() {
				return __.tmplTags.subtitle.render({
					content: this.tagCtx.render()
				});
			},

			sgSubsubtitle: function() {
				return __.tmplTags.subsubtitle.render({
					content: this.tagCtx.render()
				});
			},

			sgBox: function() {
				return __.tmplTags.box.render({
					'content': this.tagCtx.render(),
					'border':  this.tagCtx.ctx.border,
					'style':   this.tagCtx.ctx.style,
					'class':   this.tagCtx.ctx.class
				});
			},

			sgCell: function() {
				return __.tmplTags.cell.render({
					content: this.tagCtx.render(),
					spacing: this.tagCtx.ctx.spacing,
					nb:      this.tagCtx.ctx.nb
				});
			},

			sgIntro: function() {
				return __.tmplTags.intro.render({
					content: this.tagCtx.render(),
					title:   this.tagCtx.ctx.title
				});
			},

			sgContent: function() {
				return __.tmplTags.content.render({
					content: this.tagCtx.render(),
					class:   this.tagCtx.ctx.class
				});
			}
		});

	}

}


module.exports = new Template();
