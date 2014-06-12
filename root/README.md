# grunt-init-browser

grunt-init template for scaffolding a project for browser-based development
using the following libraries:

* jQuery
* Backbone
* lodash (as a replacement for underscore)
* Bootstrap
* Handlebars
* Modernizr
* requirejs + almond

## Requirements

```bash
$ npm install -g grunt-cli
$ npm install -g grunt-init
$ npm install -g bower
```

## Installation

```bash
$ git clone https://github.com/dylansmith/grunt-init-browser ~/.grunt-init/browser
$ mkdir ~/my-project && cd ~/my-project
$ grunt-init browser
$ npm install && bower install
$ grunt
$ open public/index.dev.html
```

## Demo

The demo application has the following structure:

* an [application object](app/app.js) that gets things going
* an observable [configuration object](config/config.js) that stores application state
* a [HomeView](app/views/home.js) that renders a [handlebars template](app/templates/home.hbs)
  when the app is initialised
* a [router](app/router.js)
* an [application stylesheet](less/app.less)

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

