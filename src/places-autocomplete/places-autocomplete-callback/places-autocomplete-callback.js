import canViewCallbacks from "can-view-callbacks";
import canEvent from "can-event";
import domEvents from "can-dom-events";
import canEnterEvent from "can-event-dom-enter";
import CanControl from "can-control";
import DefineMap from "can-define/map/map";
import "can-stache-bindings";
import isFunction from "can-util/js/is-function/is-function";

let Autocomplete = CanControl.extend({
  init(el, options) {
    if (!window.google) {
      throw new Error(
        'Google Maps JavaScript API library must be loaded.'
      )
    }
  
    if (!window.google.maps.places) {
      throw new Error(
        'Google Maps Places library must be loaded. Please add `libraries=places` to the src URL.'
      );
    }

    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
    
    if (isFunction(this.options.suggestions)) {
      this.options.suggestions = this.options.suggestions();
    }

    if (isFunction(this.options.activeSuggestion)) {
      this.options.activeSuggestion = this.options.activeSuggestion();
    }
  },
  '{element} input': function (el, ev) {
    this.options.selectedPlace(new DefineMap());
    const { value } = ev.target;
    if (value.length) {
     this.fetchPredictions(value)
    } else {
      let suggestions = this.options.suggestions;
      suggestions.replace([]);
    }
  },
  "{element} enter": function(el, ev) {
    this.handleEnterKey();
    this.clearSuggestions()
  },
  '{element} keyup': function(el, ev) {
    switch (ev.key) {
      case 'Escape':
        ev.preventDefault();
        this.handleEscapeKey()
        break;
      case 'ArrowUp':
        ev.preventDefault();
        this.handleArrowUp();
        break;
      case 'ArrowDown':
        ev.preventDefault();
        this.handleArrowDown();
        break;
    }
  },
  '{country} change': function(country) {
    const value = this.element.value;
    if (value.length) {
      this.fetchPredictions(value)
    }
  },
  '{selectedPlace} change': function(selectedPlace) {
    const place = isFunction(selectedPlace) ? selectedPlace() : selectedPlace;
    this.clearSuggestions();
  },
  autocompleteCallback(predictions) {
    let suggestions = this.options.suggestions;
    let items;

    if (predictions && predictions.length) {

      const formattedSuggestion = structured_formatting => ({
        mainText: structured_formatting.main_text,
        secondaryText: structured_formatting.secondary_text,
      });
      
      items = predictions.map((prediction, idx) => ({
        description: prediction.description,
        placeId: prediction.place_id,
        index: idx,
        active: false,
        formattedSuggestion: formattedSuggestion(prediction.structured_formatting)
      }));
      suggestions.replace(items)
    }
  },
  fetchPredictions(value) {
    let country = this.options.country;

    if (isFunction(country)) {
      country = country();
    }

    this.autocompleteService.getPlacePredictions({
      input: value,
      componentRestrictions: {
        country: country
      },
    }, this.autocompleteCallback.bind(this))
  },
  handleEnterKey() {
    if (this.activeSuggestion() === undefined) {
      this.clearSuggestions();
    } else {
      this.options.selectedPlace(this.activeSuggestion());
    }
  },
  handleArrowUp() {
    if (this.options.suggestions.length === 0) {
      return;
    }
    const activeSuggestion = this.activeSuggestion();
    if (activeSuggestion === undefined) {
      this.selectActiveSuggestionAt(this.options.suggestions.length - 1);
    } else {
      let prevIndex;
      if(activeSuggestion.index === 0) {
        prevIndex = this.options.suggestions.length - 1;
      } else {
        prevIndex = (activeSuggestion.index - 1) % this.options.suggestions.length;
      }
      this.selectActiveSuggestionAt(prevIndex);
    }
  },
  handleArrowDown() {
    if (this.options.suggestions.length === 0) {
      return;
    }
    const activeSuggestion = this.activeSuggestion();

    if (activeSuggestion === undefined) {
      this.selectActiveSuggestionAt(0);
    } else {
      const nextIndex =
        (activeSuggestion.index + 1) % this.options.suggestions.length;
        this.selectActiveSuggestionAt(nextIndex);
    }
  },
  handleEscapeKey() {
    this.clearSuggestions();
  },
  clearSuggestions() {
    let suggestions = this.options.suggestions;
    suggestions.replace([]);
  },
  selectActiveSuggestionAt(indx) {
    let suggestions;
    suggestions = this.options.suggestions.map((suggestion, index) => {
      if (indx === index) {
        return { ...suggestion, active: true }
      } else {
        return { ...suggestion, active: false }
      }
    });
    this.options.suggestions.replace(suggestions);
  },
  activeSuggestion() {
    const activeSuggestions = this.options.suggestions.filter(suggestion => {
      if (suggestion.active) {
        return suggestion;
      }
    });

    return activeSuggestions[0];
  }
});

canViewCallbacks.attr("can-places-autocomplete-callback", (el, attrData) => {
  var data = new DefineMap({
    country: attrData.scope.compute('country'),
    suggestions: attrData.scope.compute('suggestions'),
    selectedPlace: attrData.scope.compute('selectedPlace')
  });
  new Autocomplete(el, data);
}); 