/*can-places-autocomplete@0.0.1-dev#places-autocomplete/places-autocomplete*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ViewModel = undefined;
var _canComponent = require('can-component');
var _canComponent2 = _interopRequireDefault(_canComponent);
var _map = require('can-define/map/map');
var _map2 = _interopRequireDefault(_map);
var _list = require('can-define/list/list');
var _list2 = _interopRequireDefault(_list);
require('./places-autocomplete.less.css');
var _placesAutocomplete = require('./places-autocomplete.stache.js');
var _placesAutocomplete2 = _interopRequireDefault(_placesAutocomplete);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
var ViewModel = exports.ViewModel = _map2.default.extend({
    country: 'string',
    suggestions: {
        Type: _list2.default,
        Value: function Value() {
            return new _list2.default();
        }
    },
    selectedPlace: {
        Type: _map2.default,
        Value: function Value() {
            return new _map2.default();
        }
    },
    selectPlace: function selectPlace(suggestion) {
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
exports.default = _canComponent2.default.extend({
    tag: 'can-places-autocomplete',
    ViewModel: ViewModel,
    view: _placesAutocomplete2.default,
    leakScope: true
});