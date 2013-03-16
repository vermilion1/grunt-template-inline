/*
 * grunt-inline-template
 * https://github.com/vvermilion1/grunt-inline-template
 *
 * Copyright (c) 2013 Vitaliy Petrychuk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('template_inline', 'Compile templates to JS file', function () {
		var options = this.options({
			namespace: 'JST',
			processContent: function (src) {
				return src;
			},
			processName: function (name) {
				return name;
			}
		});
		var processName = options.processName || function (name) { return name; };
		var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
		var escapes = {
			"'": "'",
			'\\': '\\',
			'\r': 'r',
			'\n': 'n',
			'\t': 't',
			'\u2028': 'u2028',
			'\u2029': 'u2029'
		};

		grunt.verbose.writeflags(options, 'Options');

		this.files.forEach(function (f) {
			var output = f.src.filter(function (filepath) {
				var exists = grunt.file.exists(filepath);
				if (!exists) {
					grunt.log.warn('File "' + filepath + '" not found.');
				}
				return exists;
			})
			.map(function (filepath) {
				var src = options.processContent(grunt.file.read(filepath));
				var compiled = src.replace(escaper, function (match) {
					return '\\' + escapes[match];
				});
				var filename = processName(filepath);
				return "  '" + filename + "' : '" + compiled + "',";
			});

			output.unshift('this.' + options.namespace + ' = {');
			output.push('};');

			grunt.file.write(f.dest, output.join(grunt.util.normalizelf(grunt.util.linefeed)));
			grunt.log.writeln('File "' + f.dest + '" created.');

		});

	});
};
