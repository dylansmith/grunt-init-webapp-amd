define(function(require) {
    'use strict';

    describe('Config', function() {

        var config = require('config'),
            _ = require('lodash'),
            test = {
                common: {
                    foo: 'foo-common',
                    bar: 'bar-common'
                },
                dev: {
                    bar: 'bar-dev'
                },
                prod: {
                    bar: 'bar-prod',
                    baz: 'baz-prod'
                }
            };

        afterEach(function() {
            config.init(test, 'dev');
        });

        it('should default to the "dev" environment', function() {
            config.getenv().should.equal('dev');
        });

        it('#init should be chainable', function() {
            config.init(test, 'dev').should.equal(config);
        });

        it('#setenv should set the current environment', function() {
            config.setenv('prod');
            config.getenv().should.equal('prod');
        });

        it('#setenv should be chainable', function() {
            config.setenv('prod').should.equal(config);
        });

        it('#getenv should return the current environment', function() {
            config.getenv().should.equal(config.env);
        });

        it('#getAll should return a copy of all config values', function() {
            var vals = config.getAll();
            vals.foo.should.equal(test.common.foo);
            vals.bar.should.equal(test.dev.bar);
            expect(vals.baz).to.be(undefined);
            vals.foo = 'modified';
            config.get('foo').should.not.equal('modified');
        });

        describe('#get', function() {

            it('should return common values without an environmental override', function() {
                config.get('foo').should.equal(test.common.foo);
            });

            it('should override common values with environmental values', function() {
                _(['dev', 'prod']).forEach(function(env) {
                    config.setenv(env);
                    config.get('bar').should.not.equal(test.common.bar);
                    config.get('bar').should.equal(test[env].bar);
                });
            });

            it('should return an environmental value if a common value does not exist', function() {
                expect(test.common.baz).to.equal(undefined);
                expect(test.prod.baz).to.be.ok;
                config.setenv('prod');
                config.get('baz').should.equal(test.prod.baz);
            });

            it('should return undefined where no environmental or common value exists', function() {
                expect(test.common.baz).to.equal(undefined);
                expect(test.dev.baz).to.equal(undefined);
                expect(config.get('baz')).to.equal(undefined);
            });

        });

        describe('#set', function() {

            it('should create a new property value if the property does not exist', function() {
                expect(config.get('nope')).to.equal(undefined);
                config.set('nope', 'yep');
                config.get('nope').should.equal('yep');
            });

            it('should udpate a property value if the property exists', function() {
                config.get('foo').should.equal(test.common.foo);
                config.set('foo', 'newfoo');
                config.get('foo').should.equal('newfoo');
            });

            it('should be chainable', function() {
                config.set('foo', 'newfoo').should.equal(config);
            });

        });

    });

});
