# nody

> Based on [generator-node-gulp](https://github.com/youngmountain/generator-node-gulp)

This generator creates a new Node.js module, generating all the boilerplate you need to get started with best-of-breed from the gulp ecosystem. The generator also optionally installs additional gulp plugins, see the list below.



## Installation

Install the generator by running: `npm install -g generator-nody`.

## Options

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched to
  another supported testing framework like `jasmine`.

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.
  
* `--name-case`

  Defaults to `kebab`, Can be switched to `camel`, `snake`
  
  
  

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



## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
yo nody
```

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._



## Support

Should you have any problems or wishes for improvements, feel free to open an [issue](https://github.com/qiu8310/generator-nody/issues).


## Articles

Some recommended articles to get you started with node.
- [Node.js require(s) best practices](http://www.mircozeiss.com/node-js-require-s-best-practices/)



## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)


