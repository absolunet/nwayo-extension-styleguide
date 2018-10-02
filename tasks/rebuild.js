//--------------------------------------------------------
//-- Styleguide - Rebuild
//--------------------------------------------------------
'use strict';

const nwayo = require('@absolunet/nwayo-workflow');

const NwayoExtension = nwayo.classes.extension;


module.exports = (extension) => {
	NwayoExtension.createTask(extension.id, 'rebuild', () => {

		// console.log(extension.options);

	});
};
