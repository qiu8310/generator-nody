'use strict';

var yeoman = require('yeoman-generator');
var yoHelper = require('yo-helper');

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);

    this.option('skip-install', {
      desc: 'Skips the automatic execution of `bower` and `npm` after scaffolding has finished.',
      type: Boolean,
      defaults: false
    });

    this.option('name-case', {
      desc: 'Set name style. Can be set to `camel`, `snake` or `kebab`',
      type: String,
      defaults: 'kebab'
    });

    this.option('test-framework', {
      desc: 'Set test framework. Can be set to `mocha` or `jasmine`.',
      type: String,
      defaults: 'mocha'
    });

    //console.log('=============================');
    //console.log(this._args);
    //console.log(this.options);
    //console.log(this.appname);
  },

  initializing: function () {
    this.testFramework = this.options['test-framework'] || 'mocha';
    this.nameCase = this.options['name-case'] || 'kebab';
    this.currentYear = new Date().getFullYear();
    this.currentDate = new Date().toISOString().slice(0,10); // YYY-MM-DD
  },

  prompting: {
    welcome: yoHelper.welcome(),

    askForModuleName: yoHelper.askForModuleName(function(data) {
      this.slugname = this.moduleName = data.moduleName;
      this.npmname = data.pkgName;
      this.slugfile = /^(.*)[\._\-]js$/.test(data.moduleName) ? RegExp.$1 : data.moduleName;
      this.safeSlugname = yoHelper.normalize(this.slugfile, 'camel');
    }),

    askForUserData: yoHelper.askForUserData(function(data) {
      this.userData = data;
    }),


    askForDevDependencies: function () {
      var cb = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules would you like to include?',
        choices: [{
          value: 'esnext',
          name: 'esnext (Write esnext script)',
          checked: true
        }, {
          value: 'docModule',
          name: 'jsdoc (JavaScript doc generator)',
          checked: true
        }, {
          value: 'bowerModule',
          name: 'bower (For browser user)',
          checked: false
        }, {
          value: 'jscsModule',
          name: 'jscs (JavaScript Code Style checker)',
          checked: true
        }, {
          value: 'releaseModule',
          name: 'release (Bump npm versions with Gulp)',
          checked: false
        }, {
          value: 'istanbulModule',
          name: 'istanbul (JS code coverage tool)',
          checked: true
        }]
      }];

      this.prompt(prompts, function (props) {
        var hasMod = function (mod) {
          return props.modules.indexOf(mod) !== -1;
        };

        this.esnext = hasMod('esnext');
        this.docModule = hasMod('docModule');
        this.bowerModule = hasMod('bowerModule');
        this.jscsModule = hasMod('jscsModule');
        this.releaseModule = hasMod('releaseModule');
        this.istanbulModule = hasMod('istanbulModule');
        this.coverallsModule = true;

        if (this.istanbulModule) {

          var promptCoveralls = [{
            type: 'confirm',
            name: 'coverallsModule',
            message: 'Would you like add coveralls',
            default: true
          }];

          this.prompt(promptCoveralls, function (props) {
            if (props && props.coverallsModule) {
              this.coverallsModule = props.coverallsModule;
            } else {
              this.coverallsModule = false;
            }
            cb();

          }.bind(this));

        } else {
          cb();
        }

      }.bind(this));
    },


    askForDependencies: yoHelper.askForDependencies(
      [
        { name: 'lodash', description: 'A utility library', checked: false},
        { name: 'ylog', description: 'A logger module', checked: false},
        { name: 'fs-extra', description: 'Extend the vanilla Node.js fs package', checked: false},
        { name: 'request', description: 'Simplified HTTP request client', checked: false},
        { name: 'bluebird', description: 'A full featured promise library with unmatched performance', checked: false},
        { name: 'q', description: 'A library for promises (CommonJS/Promises/A,B,D)', checked: false},
        { name: 'async', description: 'Higher-order functions for asynchronous code', checked: false}
      ],
      function(obj, str) {
        this.usedDependencies = obj;
        this.dependencies = str;
      }
    ),


    askForModuleInfo: function() {
      var done = this.async();

      var prompts = [{
        name: 'description',
        message: 'Description',
        default: 'The best module ever.'
      },{
        name: 'keywords',
        message: 'Key your keywords (comma to split)'
      }, {
        name: 'license',
        message: 'License',
        default: 'MIT',
        store: true
      }, {
        type: 'confirm',
        name: 'cli',
        message: 'Do you need a CLI?'
      }/*, {
        type: 'confirm',
        name: 'skipInstall',
        message: 'Do you need skip npm install?',
        default: false,
        store: true
      }*/];

      this.prompt(prompts, function(props) {
        props.keywords = props.keywords.trim() ? props.keywords.trim().split(/\s*,\s*/) : [];
        this.props = props;
        done();
      }.bind(this));
    }
  },

  configuring: function() {
    var cfg = {srcDir: 'src'};
    cfg.slugname = this.slugname;
    this.config.set(cfg);
  },

  writing: {
    auto: yoHelper.writing(),
    custom: function() {
      if (this.props.cli) {
        this.directory('bin');
        this.template('_ignore/cli._tpl', 'bin/' + this.slugfile + '.js');
      }
      if (this.docModule && this.userData.github) {
        this.template('_ignore/_publish_docs.sh._tpl', 'publish_docs.sh');
      }
      if (this.docModule) {
        this.copy('_ignore/_jsdoc.json', 'jsdoc.json');
      }
      if (this.bowerModule) {
        this.template('_ignore/_bower.json._tpl', 'bower.json');
        this.directory('browser');
      }
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false,
      npm: true
    });
  }
});
