import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import './places-autocomplete.less';
import view from './places-autocomplete.stache';

export const ViewModel = DefineMap.extend({
  country: 'string',
  suggestions: {
    Type: DefineList,
    Value() {
      return new DefineList();
    }
  },
  selectedPlace: {
    Type: DefineMap,
    Value() {
      return new DefineMap();
    }
  },
  selectPlace(suggestion) {
    this.selectedPlace = suggestion;
  },
  get suggestion() {
    if (this.selectedPlace.description) {
      return this.selectedPlace.description;
    }
  },
  get placeId() {
    if (this.selectedPlace.placeId) {
      return this.selectedPlace.placeId;
    }
  }
});

export default Component.extend({
  tag: 'can-places-autocomplete',
  ViewModel,
  view,
  leakScope: true
});
