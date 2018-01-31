import QUnit from 'steal-qunit';
import { ViewModel } from './places-autocomplete-viewmodel';

// ViewModel unit tests
QUnit.module('can-places-autocomplete/places-autocomplete');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the can-places-autocomplete component');
});
