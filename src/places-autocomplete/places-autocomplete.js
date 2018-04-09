import Component from 'can-component';
import ViewModel from "./places-autocomplete-viewmodel";
import events from "./places-autocomplete-events";
import './places-autocomplete.less';
import view from './places-autocomplete.stache';

/**
 * @module {places-autocomplete}
 * @parent can-places-autocomplete 0
 *
 * @author Cherif BOUCHELAGHEM
 *
 * 
 * @description
 * google places autocomplete wrapper
 * 
 * @body
 * 
 * ## Component initialization
 * 
 * ```html
 * <can-places-autocomplete></can-places-autocomplete>
 *
 * <can-places-autocomplete placesComponentRestriction:from="placesRestriction"></can-places-autocomplete>
 */

export default Component.extend({
  tag: 'can-places-autocomplete',
  ViewModel,
  view,
  events
});