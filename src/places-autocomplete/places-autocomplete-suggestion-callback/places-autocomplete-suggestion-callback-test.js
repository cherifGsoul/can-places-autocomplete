import QUnit from 'steal-qunit';
import module from './places-autocomplete-suggestion-callback';

QUnit.module('can-places-autocomplete/places-autocomplete/places-autocomplete-suggestion-callback');

QUnit.test('Initialized the module', function(){
  QUnit.equal(typeof module, 'function');
  QUnit.equal(module(), 'This is the places-autocomplete-suggestion-callback module');
});
