import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import './places-autocomplete.less';
import view from './places-autocomplete.stache';

export const ViewModel = DefineMap.extend({
  suggestions: {
    Type: DefineList,
    Value() {
      return new DefineList();
    }
  },
  country: 'string',
  selectedPlace: {
    Type: DefineMap,
    Value() {
      return new DefineMap();
    }
  },
  selectPlace(suggestion) {
    this.selectedPlace = suggestion;
  }
});

export default Component.extend({
  tag: 'can-places-autocomplete',
  ViewModel,
  view,
  leakScope: true
});
