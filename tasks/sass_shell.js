/*
 * grunt-sass-shell
 * https://github.com/iamdue/grunt-sass-shell
 *
 * Copyright (c) 2016 Gyorgy Sagi
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var eachAsync = require('each-async');
var exec = require('child_process').exec;
var chalk = require('chalk');
var which = require('which');

module.exports = function (grunt) {

	var checkBinary = function (cmd, errMsg) {
		try {
			which.sync(cmd);
		} catch (err) {
			return grunt.warn(
				'\n' + errMsg + '\n' +
				'More info: https://github.com/iamdue/grunt-sass-shell\n'
			);
		}
	};


	grunt.registerMultiTask('sass_shell', 'Compile SASS to CSS faster then ever before with using libsass directly.', function () {

		checkBinary('sassc',
			'You need to have LibSass (sassc binary) installed and set in your PATH for this task to work.'
		);

		var opts = this.options({
			precision: 10,
			sourceMap: false,
			outputStyle: 'nested', //nested, expanded, compact, compressed,
			omitSourceMapUrl: false
		});

		var cmd = "sassc ";

		if(opts.style != ''){
			opts.outputStyle = opts.style;
		}

		if (opts.outputStyle != '') {
			cmd += '--style ' + opts.outputStyle + ' ';
		}

		if (opts.sourceMap) {
			cmd += '--sourcemap ';
		}

		if (opts.omitSourceMapUrl) {
			cmd += '--omit-map-comment ';
		}

		if (opts.loadPath !== undefined && opts.loadPath !== '') {
			cmd += '--load-path ' + opts.loadPath + ' ';
		}

		if (opts.precision) {
			cmd += '--precision ' + opts.precision + ' ';
		}

		eachAsync(this.files, function (el, i, next) {

			var src = el.src[0];

			if (!src){
				src = el.orig.src[0];
			}

			if(!src || path.basename(src)[0] === '_') {
				next();
				return;
			}

			var cmdToShell = cmd + src + ' ' + el.dest;

			var cp = exec(grunt.template.process(cmdToShell), {}, function (err, stdout, stderr) {
				if (err) {
					grunt.warn(err);
				}
				next();
			}.bind(this));

			var captureOutput = function (child, output) {
				if (grunt.option('color') === false) {
					child.on('data', function (data) {
						output.write(chalk.stripColor(data));
					});
				} else {
					child.pipe(output);
				}
			};

			grunt.verbose.writeln('Compile finished on command:', chalk.yellow(cmdToShell));

			if (grunt.option('verbose')) {
				captureOutput(cp.stdout, process.stdout);
				captureOutput(cp.stderr, process.stderr);
			}

			process.stdin.resume();
			process.stdin.setEncoding('utf8');
			process.stdin.pipe(cp.stdin);

		}.bind(this), this.async());

	});

};
