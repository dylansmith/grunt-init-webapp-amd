# grunt-init-webapp-amd

grunt-init template for scaffolding a project for browser-based development, using AMD as the
module format.

## Requirements

```bash
$ npm install -g grunt-cli
$ npm install -g grunt-init
$ npm install -g bower
```

## Installation

```bash
$ git clone https://github.com/dylansmith/grunt-init-webapp-amd ~/.grunt-init/webapp-amd
$ mkdir ~/my-project && cd ~/my-project
$ grunt-init webapp-amd
$ npm install && bower install
$ grunt
$ open public/index.dev.html
```

## Usage

### Runtime libraries

The following libraries are available via [bower](http://bower.io):

* [jquery](https://github.com/jquery/jquery)
* [backbone](https://github.com/jashkenas/backbone)
* [lodash](https://github.com/lodash/lodash)
* [bootstrap](https://github.com/twbs/bootstrap)
* [handlebars](https://github.com/wycats/handlebars.js)
* [modernizr](https://github.com/Modernizr/Modernizr)
* [requirejs](https://github.com/jrburke/requirejs-bower)
* [almond](https://github.com/jrburke/almond)

### Testing

Cross-browser testing with multiple assertion libraries and AMD support is available, and
tests are configured to run in PhantomJS, Chrome & Safari (more can be added). The following
testing tools are available:

* [karma](https://www.npmjs.org/package/grunt-karma)
* [mocha](https://www.npmjs.org/package/mocha)
* [sinon](https://www.npmjs.org/package/karma-sinon-chai)
* [chai](https://www.npmjs.org/package/karma-sinon-chai)
* [expect](https://www.npmjs.org/package/karma-expect)
* [should](https://www.npmjs.org/package/should)

### Reporting

The following reports are automatically generated during the build:

* Documentation: [jsdoc](https://www.npmjs.org/package/grunt-jsdoc)
* Documentation: [docco](https://www.npmjs.org/package/grunt-docco)
* Test coverage: [karma-coverage](https://www.npmjs.org/package/karma-coverage)
* Code analysis: [plato](https://www.npmjs.org/package/grunt-plato)

### Grunt tasks

The following grunt tasks are available:

    grunt build:css

> * LESS compilation with [less](https://www.npmjs.org/package/grunt-contrib-less)
> * Concatenation with [concat](https://www.npmjs.org/package/grunt-contrib-concat)
> * CSS auto-prefixing with [autoprefixer](https://www.npmjs.org/package/grunt-autoprefixer)

    grunt build:js

> * JS linting with [jshint](https://www.npmjs.org/package/grunt-contrib-jshint)
> * AMD packaging with [requirejs](https://www.npmjs.org/package/grunt-contrib-requirejs) and
[almond](https://www.npmjs.org/package/almond)
> * JS minification with [uglify](https://www.npmjs.org/package/grunt-contrib-uglify)

    grunt build:tmpl

> * Handlebars pre-compilation with [handlebars](https://www.npmjs.org/package/grunt-contrib-handlebars)
> * Compiled template minification with [uglify](https://www.npmjs.org/package/grunt-contrib-uglify)

    grunt imagemin

> image optimisation with [imagemin](https://www.npmjs.org/package/grunt-contrib-imagemin)

    grunt build

> Shorthand for `grunt clean build:tmpl build:css build:js newer:imagemin`

    grunt test

> Runs the test suite against PhantomJS and generates coverage reports.

    grunt test_all

> Runs the test suite against PhantomJS, Chrome and Safari and generates coverage reports.

    grunt reporting

> Generates documentation and code analysis reports
> Shorthand for `grunt jsdoc docco plato`

    grunt

> Shorthand for `grunt build test reporting`


## Other useful things

* an [.editorconfig](root/.editorconfig) file
* a comprehensive [.jshintrc](root/.jshintc) with comments
* modularised grunt configuration using
[load-grunt-tasks](https://www.npmjs.org/package/load-grunt-tasks) and
[load-grunt-config](https://www.npmjs.org/package/load-grunt-config)


## Demo application

The demo application is very basic Backbone app with the following structure:

* an [application object](root/src/js/app.js) that gets things going
* an observable [configuration object](root/src/js/config.js) that stores application state
* a [HomeView](root/src/js/views/home.js) that renders a [handlebars template](root/src/templates/home.hbs)
  when the app is initialised
* a [router](root/src/js/router.js) that allows the app to switch views, falling back to a 404 view
* an [application stylesheet](root/src/styles/app.less)

### Changing the theme

The application object responds to changes in the ```theme``` config key, updating a
```data-theme``` attribute on the body element with it's value, and a CSS definition sets
the body font to ```monospace``` when ```data-theme="mono"```.

In addition, the router responds to a ```#/theme/<theme_id>``` route, so navigating to this URL
will update the config and update the theme with the value of ```<theme_id>```.

### Other things to try

(Run the following in your browser console)

Get a reference to the application object:

```javascript
var app = require('app');
```

The following sets the "theme" key in the config, causing the application to set data-theme="mono"
on the body element. Since this is a CSS hook, the page font will change without re-rendering the
app (notice that the config output in the page has not updated):

```javascript
app.config.set('theme', 'mono');
```

Now re-render the app so that the config section will show the new "theme" key and value:

```javascript
app.render();
```

Now set the "theme" key to a falsy value; this will remove the data-theme attribute from
the body element and restore the original font without re-rendering the app:

```javascript
app.config.set('theme', '');
```

You can also access the config or other libraries using the global require function:
```javascript
var Backbone = require('backbone');
var config = require('config');
// etc...
```

To test the URL-based theming, add ```#/theme/mono``` to the page URL, and you should see the
mono theme applied.
