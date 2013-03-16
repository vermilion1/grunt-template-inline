# grunt-template-inline

> Put templates content to JS object

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-template-inline --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-template-inline');
```

## The "template_inline" task

### Overview
In your project's Gruntfile, add a section named `template_inline` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  template_inline: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.namespace
Type: `String`
Default value: `'JST'`

The namespace in which the precompiled templates will be assigned.

#### options.processName
Type: `Function`
Default value: `null`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.

#### options.processContent
Type: `Function`
Default value: `null`

This option accepts a function which takes one argument (the file content) and returns a string which will be used as template string.


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  template_inline: {
    options: {},
    files: {
      'dest/template.js': ['src/testing.html', 'src/123.html'],
    },
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  template_inline: {
    options: {
      namespace: 'custom',
      processName: function (filename) {
        return filename.split(/src\//)[1];
      },
      processContent: function (source) {
        return 'test - ' + source;
      }
    },
    files: {
      'dest/template.js': ['src/testing.html', 'src/123.html'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
