import QUnit from 'steal-qunit';
import module from './geo-utils';

QUnit.module('can-places-autocomplete/places-autocomplete/geo-utils');

QUnit.test('Initialized the module', function(){
  QUnit.equal(typeof module, 'function');
  QUnit.equal(module(), 'This is the geo-utils module');
});
