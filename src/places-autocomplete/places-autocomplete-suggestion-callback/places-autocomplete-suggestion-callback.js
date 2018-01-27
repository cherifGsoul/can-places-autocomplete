import canViewCallbacks from "can-view-callbacks";
import DefineMap from "can-define/map/map";
import CanControl from "can-control";

let PlacesAutocompleteSuggestion = CanControl.extend({
  '{element} click': function(el, ev) {
    ev.preventDefault();
    console.log(el)
  }
});

canViewCallbacks.attr('can-places-autocomplete-suggestion', (el, attrData) => {
  console.log(attrData.scope._context);
  var data = new DefineMap({
    selectedSuggestion: attrData.scope.compute('selectedSuggestion')
  });
  new PlacesAutocompleteSuggestion(el, data);
});