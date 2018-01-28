import Component from 'can-component';
import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import './places-autocomplete.less';
import view from './places-autocomplete.stache';

/**
 * @module {Module} can-places-autocomplete/places-autocomplete/places-autocomplete
 * @parent can-places-autcomplete
 * 
 * @description Provides a custom element which wraps an google places autcomplete input
 * 
 * @body
 * Render `<can-places-autocomplete>` in the template:
 * 
 * ```
 * <can-places-autocomplete />
 * ```
 * 
 * Like this the custom element will use the default template for the autocomplete input and autocomplete suggestion
 * 
 * It can be customized by using `<can-template>` 
 * 
 */
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
