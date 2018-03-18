import Component from 'can-component';
import ViewModel from "./places-autocomplete-viewmodel";
import events from "./places-autocomplete-events";
import './places-autocomplete.less';
import view from './places-autocomplete.stache';

export default Component.extend({
  tag: 'can-places-autocomplete',
  ViewModel,
  view,
  events
});