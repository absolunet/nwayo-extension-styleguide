//--------------------------------------------------------
//-- Styleguide - Build
//--------------------------------------------------------
'use strict';

const get      = require('lodash.get');
const path     = require('path');
const fss      = require('@absolunet/fss');
const nwayo    = require('@absolunet/nwayo-workflow');
const template = require('../helpers/template');

const { toolbox, util } = nwayo.helpers;

const TASK        = 'build';
const ROOT        = fss.realpath(`${path.dirname(__filename)}/..`);
const STATIC_PATH = `${ROOT}/resources/static`;






module.exports = (extension) => {
	const log = (id, message) => {
		extension.log(TASK, `${id} - ${message}`);
	};

	template.init({
		root:      ROOT,
		extension: extension
	});


	extension.createTask(TASK, () => {
		return toolbox.fakeStream((callback) => {

			// Foreach styleguide
			Object.keys(extension.options).forEach((id) => {
				const options = extension.options[id];

				// Cleanup
				fss.removePattern(`${options.output}/*`);
				fss.ensureDir(options.output);

				// Copy static assets
				const outputStatic = `${options.output}/static`;
				fss.copy(STATIC_PATH, outputStatic);


				// Gather collections
				const scripts = options['scripts-collections'].map((collection) => {
					return util.getScriptsUrl(options.bundle, collection);
				});

				const styles = options['styles-collections'].map((collection) => {
					return util.getStylesUrl(options.bundle, collection);
				});

				// Get konstan
				const konstan = util.getKonstan(options.bundle);


				// Write sections
				options.sections.forEach(({ name, component }) => {
					fss.writeFile(`${options.output}/section-${component}.html`, template.section.render({
						projectName: options.name,
						sectionName: name,
						scripts:     scripts,
						styles:      styles,
						content:     template.getComponentTemplate(component).render({}, {
							konstan: (key) => { return get(konstan, key); }
						})
					}));
					log(id, `section-${component}.html built`);
				});


				// Write container
				fss.writeFile(`${options.output}/index.html`, template.container.render({
					projectName: options.name,
					iconsUrl:    util.getIconsUrl(options.bundle, options['icons-component']),
					sections:    options.sections
				}));
				log(id, 'index.html built');


				// Write readme.md
				fss.outputFile(`${options.output}/readme.md`, `# ${extension.getGeneratedBanner(id, 'text')}\n`);

				callback();
			});
		});
	});
};
