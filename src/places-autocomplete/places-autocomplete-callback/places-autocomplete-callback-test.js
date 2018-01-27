import QUnit from 'steal-qunit';
import module from './places-autocomplete-callback';

QUnit.module('can-places-autocomplete/places-autocomplete-callback');

QUnit.test('Initialized the module', function(){
  QUnit.equal(typeof module, 'function');
  QUnit.equal(module(), 'This is the places-autocomplete-callback module');
});
