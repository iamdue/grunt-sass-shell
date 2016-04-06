# grunt-sass-shell

> If your SASS compiles slow, then try this plugin, compile SASS to CSS faster then ever before with using libsass from commandline directly.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sass-shell --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript or with the matchdep npm package (grunt-*) syntax:

```js
grunt.loadNpmTasks('grunt-sass-shell');
```

## The "sass_shell" task

### Overview
In your project's Gruntfile, add a section named `sass_shell` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sass_shell: {
    options: {
      // Task-specific options go here.
      // example
      outputStyle: 'expanded',
      sourceMap: true,
      precision: 3,
      loadPath: 'test/fixtures/partials'
    },
    files: {
      // Target-specific file lists and/or options go here.
      'test/tmp/include-paths.css' : 'test/fixtures/include-paths.scss'
    },
  },
});
```

### Options
This plugin only support the options that sassc binary does. These are the following:

#### outputStyle
Alias: `style`
Type: `String`
Default value: `'nested'`

Output style. Can be `nested`, `compact`, `compressed`, `expanded`.

#### precision
Type: `String`
Default value: `'3'`

How many digits of precision to use when outputting decimal numbers.

#### loadPath
Type: `String|Array`

Add a (or multiple) Sass import path.

#### sourceMap
Type: `String`  
Default: `false`

If set to true a sourceMap uri will be injected to the end of the destination file.

Type: `Number`  
Default: `5`

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  sass_shell: {
	options: {},
    files: {
	  'test/tmp/compile.css' : 'test/fixtures/test.scss'
	}
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  sass_shell: {
    testWithoutMap: {
      options: {
          style: 'expanded', // or outputStyle
          sourceMap: false
        },
        files: {
          'test/tmp/compile.css' : 'test/fixtures/test.scss',
          'test/tmp/compile2.css' : 'test/fixtures/test.scss'
        }
      },
      testWithMap: {
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        },
        files: {
          'test/tmp/source-map.css' : 'test/fixtures/test.scss',
          'test/tmp/source-map-simple.css' : 'test/fixtures/test.scss'
        }
      },
      testWithPrecision: {
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
          precision: 3
        },
        files: {
          'test/tmp/precision.css' : 'test/fixtures/precision.scss',
        }
      },
      testWithIncludePaths: {
        options: {
          outputStyle: 'nested',
          loadPath: 'test/fixtures/partials',
          sourceMap: false
        },
        files: {
          'test/tmp/include-paths.css' : 'test/fixtures/include-paths.scss'
        }
      }
    }
  },
});
```

## Contributing
If you want to contribute, send a mail to me: gyorgy.sagi@w5.hu .

## Release History
0.1.0 - 2016.04.06 - First release

## License

MIT © [Gyorgy Sagi](http://w5labs.com)
