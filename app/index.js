'use strict';

var yeoman = require('yeoman-generator');
var yoHelper = require('yo-helper');
var path = require('path');


module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.testFramework = this.options['test-framework'] || 'mocha';
    this.nameCase = this.options['name-case'] || 'camel';
    this.currentYear = new Date().getFullYear();
    this.currentDate = new Date().toISOString().slice(0,10); // YYY-MM-DD
  },

  prompting: {
    welcome: yoHelper.welcome(),

    askForModuleName: yoHelper.askForModuleName(function(data) {
      this.slugname = this.moduleName = data.moduleName;
      this.slugfile = /^(.*)\.js$/.test(data.moduleName) ? RegExp.$1 : data.moduleName;
      this.safeSlugname = yoHelper.normalize(this.slugfile, 'camel');
    }),

    askForGithubUser: yoHelper.askForGithubUser(function(data) {
      this.githubUser = data;
    }),

    askForDependencies: yoHelper.askForDependencies(
      [
        { name: 'lodash', description: 'A utility library'},
        { name: 'q', description: 'A library for promises'},
        { name: 'debug'}
      ],
      function(obj, str) {
        this.usedDependencies = obj;
        this.dependencies = str;
      }
    ),


    askForDevDependencies: function () {
      var cb = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules would you like to include?',
        choices: [{
          value: 'jscsModule',
          name: 'jscs (JavaScript Code Style checker)',
          checked: true
        }, {
          value: 'releaseModule',
          name: 'release (Bump npm versions with Gulp)',
          checked: true
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
        default: 'MIT'
      }, {
        type: 'confirm',
        name: 'cli',
        message: 'Do you need a CLI?'
      }, {
        type: 'confirm',
        name: 'skipInstall',
        message: 'Do you need skip npm install?',
        default: true
      }];

      this.prompt(prompts, function(props) {
        props.keywords = props.keywords.split(',').map(function (el) { return el.trim(); });
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
        this.template('_ignore/cli._tpl', 'cli.js')
      }
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.props['skipInstall'] || this.options['skip-install'],
      bowerInstall: false
    });
  }
});
