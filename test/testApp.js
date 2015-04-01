var path = require('path');

var assert = require('yeoman-generator').assert;
var helper = require('yeoman-generator').test;
var nock = require('nock');
var rimraf = require('rimraf');
var registryUrl = require('registry-url');


var join = path.join;

var testRoot = __dirname,
  appRoot = join(__dirname, '../app');


var NPM_REGISTRY = registryUrl(),
  NAME_CASE = {
    KEBAB: 'kebab',
    CAMEL: 'camel',
    SNAKE: 'snake'
  },
  MODULE_NAME = {
    AVAILABLE: 'a_m',
    UNAVAILABLE: 'u_m'
  },
  GITHUB_API_BASE = 'https://api.github.com',
  GITHUB_USER = {
    EXIST: 'user_exist',
    NOT_EXIST: 'someuser_not_exist',
    EXIST_NO_EMAIL: 'someuser_no_email'
  };

function mockNet() {
  nock.disableNetConnect();

  nock(NPM_REGISTRY)
    .get('/a_m')
    .reply(404)
    .get('/aM')
    .reply(404)
    .get('/a-m')
    .reply(404)

    .get('/u_m')
    .reply(200)
    .get('/uM')
    .reply(200)
    .get('/u-m')
    .reply(200);


  nock(GITHUB_API_BASE)
    .get('/users/' + GITHUB_USER.EXIST)
    .reply(200, {
      login: 'someuser_exist',
      url: 'https://api.github.com/users/someuser_exist',
      html_url: 'https://github.com/someuser_exist',
      type: 'User',
      name: 'Some User',
      email: 'someuser@gmail.com'
    })

    .get('/users/' + GITHUB_USER.EXIST_NO_EMAIL)
    .reply(200, {
      login: 'someuser_no_email',
      url: 'https://api.github.com/users/someuser_no_email',
      html_url: 'https://github.com/someuser_no_email',
      type: 'User',
      name: 'Some User No Email'
    })

    .get('/users/' + GITHUB_USER.NOT_EXIST)
    .reply(404);
}


function runGenerator(opts, cb) {

  if (typeof opts === 'function') { cb = opts; opts = {}; }

  var prompts = {
    moduleName: MODULE_NAME.AVAILABLE,
    moduleNameConfirm: false,
    username: GITHUB_USER.EXIST,
    usernameConfirm: false,
    dependencies: ['lodash', 'debug'],
    modules: ['jscsModule', 'releaseModule', 'istanbulModule'],
    coverallsModule: false,
    email: 'Default.Email@google.com',
    name: 'Default User Name',
    description: 'description',
    keywords: 'key,words',
    license: 'MIT',
    cli: true
  }
  for (var key in opts) { if (key in prompts) { prompts[key] = opts[key]; } }

  helper.run(appRoot)
    .inDir(join(testRoot, 'tmp'))
    .withOptions({
      'skipInstall': true,
      'name-case': opts.nameCase || 'kebab',
      'test-framework': opts.testFramework || 'mocha'
    })
    .withPrompt(prompts)
    .on('end', function() {
      cb();
    })
}



describe('nody:app', function () {
  beforeEach(function() { mockNet(); });
  afterEach( function() { nock.cleanAll(); nock.enableNetConnect(); });
  after(function() { rimraf.sync(join(testRoot, 'tmp')); });

  it('default run', function(done) {
    runGenerator(function() {

      assert.file([
        '.gitignore',
        '.editorconfig',
        'package.json',
        'gulpfile.js',
        'cli.js',
        '.jscsrc',
        '.jshintrc',
        '.travis.yml',
        'src/a-m.js',
        'test/test-a-m.js',
        'example/simple.js',
        'README.md',
        'CHANGELOG.md'
      ]);

      assert.fileContent('package.json', 'gulp-mocha')
      assert.noFileContent('package.json', 'gulp-jasmine')
      assert.noFileContent('package.json', 'coveralls')

      done();
    })
  });

  it('run without cli', function(done) {
    runGenerator({cli: false}, function() {
      assert.noFile(['cli.js'])
      done();
    })
  });

  it('run with jasmine test framewrok', function(done) {
    runGenerator({testFramework: 'jasmine'}, function() {
      assert.fileContent('package.json', 'gulp-jasmine')
      assert.noFileContent('package.json', 'gulp-mocha')
      done();
    })
  });

  it('run with coveralls module', function(done) {
    runGenerator({coverallsModule: true}, function() {
      assert.fileContent('package.json', 'coveralls')
      done();
    })
  });



  context('Module name', function() {
    it('run with available module name', function(done) {
      runGenerator({moduleName: MODULE_NAME.AVAILABLE}, function() {
        assert.file(['src/a-m.js', 'test/test-a-m.js']);
        done();
      })
    });

    it('run with unavailable module name', function(done) {
      runGenerator({moduleName: MODULE_NAME.UNAVAILABLE}, function() {
        assert.file(['src/u-m.js', 'test/test-u-m.js']);
        done();
      })
    });
  });


  context('Github username', function() {
    it('run with existed github username', function(done) {
      runGenerator({username: GITHUB_USER.EXIST}, function() {
        assert.fileContent('package.json', /Some User/)
        assert.fileContent('package.json', /someuser@gmail.com/)
        done();
      })
    });

    it('run with not existed github username', function(done) {
      runGenerator({username: GITHUB_USER.NOT_EXIST}, function() {
        assert.fileContent('package.json', /Default User Name/)
        assert.fileContent('package.json', /Default.Email@google.com/)
        done();
      })
    });

    it('run with existed github username which has not email', function(done) {
      runGenerator({username: GITHUB_USER.EXIST_NO_EMAIL}, function() {
        assert.fileContent('package.json', /Some User No Email/)
        assert.fileContent('package.json', /Default.Email@google.com/)
        done();
      })
    });
  });



  context('Name case option', function() {
    it('switch name case to kebab', function(done) {
      runGenerator({ nameCase: 'kebab' }, function() {
        assert.file(['src/a-m.js', 'test/test-a-m.js']);
        assert.fileContent('README.md', /^# a-m/)
        assert.fileContent('src/a-m.js', /a-m/)
        assert.fileContent('test/test-a-m.js', /var aM = require/)
        done();
      });
    });

    it('switch name case to camel', function(done) {
      runGenerator({ nameCase: 'camel' }, function() {
        assert.file(['src/aM.js', 'test/testAM.js']);
        assert.fileContent('README.md', /^# aM/)
        assert.fileContent('src/aM.js', /aM/)
        assert.fileContent('test/testAM.js', /var aM = require/)
        done();
      });
    });

    it('switch name case to snake', function(done) {
      runGenerator({ nameCase: 'snake' }, function() {
        assert.file(['src/a_m.js', 'test/test_a_m.js']);
        assert.fileContent('README.md', /^# a_m/)
        assert.fileContent('src/a_m.js', /a_m/)
        assert.fileContent('test/test_a_m.js', /var aM = require/)
        done();
      });
    });
  });

})