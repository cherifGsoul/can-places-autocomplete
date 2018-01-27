import QUnit from 'steal-qunit';
import plugin from './can-places-autocomplete';

QUnit.module('can-places-autocomplete');

QUnit.test('Initialized the plugin', function(){
  QUnit.equal(typeof plugin, 'function');
  QUnit.equal(plugin(), 'This is the can-places-autocomplete plugin');
});
