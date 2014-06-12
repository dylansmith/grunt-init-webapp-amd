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
