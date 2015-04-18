# nody
[![NPM version](https://badge.fury.io/js/generator-nody.svg)](https://npmjs.org/package/generator-nody)
[![Build Status](https://travis-ci.org/qiu8310/generator-nody.svg)](https://travis-ci.org/qiu8310/generator-nody)
[![Code Climate](https://codeclimate.com/github/qiu8310/generator-nody/badges/gpa.svg)](https://codeclimate.com/github/qiu8310/generator-nody)
[![Test Coverage](https://codeclimate.com/github/qiu8310/generator-nody/badges/coverage.svg)](https://codeclimate.com/github/qiu8310/generator-nody)


> Based on [generator-node-gulp](https://github.com/youngmountain/generator-node-gulp)

This generator creates a new Node.js module, generating all the boilerplate you need to get started with best-of-breed from the gulp ecosystem. The generator also optionally installs additional gulp plugins, see the list below.


## Installation

Install the generator by running: `npm install -g generator-nody`.


## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
yo nody [options]
```

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._




## Options

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched to `jasmine`.

* `--name-case`
  
  Set name style. Defaults to `kebab`, Can be switched to `camel`, `snake`

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.
  
* `--skip-cache`
  
  Do not remember prompt answers. Default `false`. 
  
* `--force`
  
  Force overwrite file
  
* `--help`

  Show help
  
  
  

### devDependencies

- Mocha Unit Testing with [gulp-mocha](https://github.com/sindresorhus/gulp-mocha)
- Automagically lint your code with [gulp-jshint](https://github.com/spenceralger/gulp-jshint)
- Optional – Check JavaScript code style with [gulp-jscs](https://github.com/sindresorhus/gulp-jscs)
- Optional – Measuring code coverage with [gulp-istanbul](https://github.com/SBoudrias/gulp-istanbul)
- Optional – Upload LCOV data to [coveralls.io](http://coveralls.io) with [coveralls](https://github.com/cainus/node-coveralls)
- Optional – Bump npm versions with [gulp-bump](https://github.com/stevelacy/gulp-bump)
- Optional - Jasmine Unit Testing with [gulp-jasmine](https://github.com/sindresorhus/gulp-jasmine)

### dependencies


- [debug](https://github.com/visionmedia/debug)
- [Lo-Dash](http://lodash.com/)
- [q](https://github.com/kriskowal/q)


## Support

Should you have any problems or wishes for improvements, feel free to open an [issue](https://github.com/qiu8310/generator-nody/issues).


## Articles

Some recommended articles to get you started with node.
- [Node.js require(s) best practices](http://www.mircozeiss.com/node-js-require-s-best-practices/)


## Knowledges

* Yeoman support template file name
* If your template file need use `<%` keyword, you can use `<%%` for saving it
* Yeoman generator has `directory` function to copy recursively the files from source directory to root directory,
  make sure the destination dirs exists, and note that the function useing `copy`, not `template`
* Yeoman support sync get git email `this.git.email()` and name `this.git.name()` and async get git login name `this.github.username(cb)`
 


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)




[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/qiu8310/generator-nody/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

