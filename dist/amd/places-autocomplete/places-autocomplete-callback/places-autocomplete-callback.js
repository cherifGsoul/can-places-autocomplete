/*can-places-autocomplete@0.0.1-dev#places-autocomplete/places-autocomplete-callback/places-autocomplete-callback*/
define([
    'can-view-callbacks',
    'can-control',
    'can-define/map',
    'can-util/js/is-function',
    'can-stache-bindings'
], function (_canViewCallbacks, _canControl, _map, _isFunction) {
    'use strict';
    var _canViewCallbacks2 = _interopRequireDefault(_canViewCallbacks);
    var _canControl2 = _interopRequireDefault(_canControl);
    var _map2 = _interopRequireDefault(_map);
    var _isFunction2 = _interopRequireDefault(_isFunction);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var Autocomplete = _canControl2.default.extend({
        init: function init() {
            if (!window.google) {
                throw new Error('Google Maps JavaScript API library must be loaded.');
            }
            if (!window.google.maps.places) {
                throw new Error('Google Maps Places library must be loaded. Please add `libraries=places` to the src URL.');
            }
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
            if ((0, _isFunction2.default)(this.options.suggestions)) {
                this.options.suggestions = this.options.suggestions();
            }
            if ((0, _isFunction2.default)(this.options.activeSuggestion)) {
                this.options.activeSuggestion = this.options.activeSuggestion();
            }
        },
        '{element} input': function elementInput(el, ev) {
            this.options.selectedPlace(new _map2.default());
            var value = ev.target.value;
            if (value.length) {
                this.fetchPredictions(value);
            } else {
                var suggestions = this.options.suggestions;
                suggestions.replace([]);
            }
        },
        '{element} enter': function elementEnter() {
            this.handleEnterKey();
            this.clearSuggestions();
        },
        '{element} keyup': function elementKeyup(el, ev) {
            switch (ev.key) {
            case 'Escape':
                ev.preventDefault();
                this.handleEscapeKey();
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
        '{country} change': function countryChange() {
            var value = this.element.value;
            if (value.length) {
                this.fetchPredictions(value);
            }
        },
        '{selectedPlace} change': function selectedPlaceChange() {
            this.clearSuggestions();
        },
        autocompleteCallback: function autocompleteCallback(predictions) {
            var suggestions = this.options.suggestions;
            var items = void 0;
            if (predictions && predictions.length) {
                var formattedSuggestion = function formattedSuggestion(structured_formatting) {
                    return {
                        mainText: structured_formatting.main_text,
                        secondaryText: structured_formatting.secondary_text
                    };
                };
                items = predictions.map(function (prediction, idx) {
                    return {
                        description: prediction.description,
                        placeId: prediction.place_id,
                        index: idx,
                        active: false,
                        formattedSuggestion: formattedSuggestion(prediction.structured_formatting)
                    };
                });
                suggestions.replace(items);
            }
        },
        fetchPredictions: function fetchPredictions(value) {
            var country = this.options.country;
            if ((0, _isFunction2.default)(country)) {
                country = country();
            }
            this.autocompleteService.getPlacePredictions({
                input: value,
                componentRestrictions: { country: country }
            }, this.autocompleteCallback.bind(this));
        },
        handleEnterKey: function handleEnterKey() {
            if (this.activeSuggestion() === undefined) {
                this.clearSuggestions();
            } else {
                this.options.selectedPlace(this.activeSuggestion());
            }
        },
        handleArrowUp: function handleArrowUp() {
            if (this.options.suggestions.length === 0) {
                return;
            }
            var activeSuggestion = this.activeSuggestion();
            if (activeSuggestion === undefined) {
                this.selectActiveSuggestionAt(this.options.suggestions.length - 1);
            } else {
                var prevIndex = void 0;
                if (activeSuggestion.index === 0) {
                    prevIndex = this.options.suggestions.length - 1;
                } else {
                    prevIndex = (activeSuggestion.index - 1) % this.options.suggestions.length;
                }
                this.selectActiveSuggestionAt(prevIndex);
            }
        },
        handleArrowDown: function handleArrowDown() {
            if (this.options.suggestions.length === 0) {
                return;
            }
            var activeSuggestion = this.activeSuggestion();
            if (activeSuggestion === undefined) {
                this.selectActiveSuggestionAt(0);
            } else {
                var nextIndex = (activeSuggestion.index + 1) % this.options.suggestions.length;
                this.selectActiveSuggestionAt(nextIndex);
            }
        },
        handleEscapeKey: function handleEscapeKey() {
            this.clearSuggestions();
        },
        clearSuggestions: function clearSuggestions() {
            var suggestions = this.options.suggestions;
            suggestions.replace([]);
        },
        selectActiveSuggestionAt: function selectActiveSuggestionAt(indx) {
            var suggestions = void 0;
            suggestions = this.options.suggestions.map(function (suggestion, index) {
                if (indx === index) {
                    suggestion.active = true;
                    return suggestion;
                } else {
                    suggestion.active = false;
                    return suggestion;
                }
            });
            this.options.suggestions.replace(suggestions);
        },
        activeSuggestion: function activeSuggestion() {
            var activeSuggestions = this.options.suggestions.filter(function (suggestion) {
                if (suggestion.active) {
                    return suggestion;
                }
            });
            return activeSuggestions[0];
        }
    });
    _canViewCallbacks2.default.attr('can-places-autocomplete-callback', function (el, attrData) {
        var data = new _map2.default({
            country: attrData.scope.compute('country'),
            suggestions: attrData.scope.compute('suggestions'),
            selectedPlace: attrData.scope.compute('selectedPlace')
        });
        new Autocomplete(el, data);
    });
});