/*[global-shim-start]*/
(function(exports, global, doEval) {
	// jshint ignore:line
	var origDefine = global.define;

	var get = function(name) {
		var parts = name.split("."),
			cur = global,
			i;
		for (i = 0; i < parts.length; i++) {
			if (!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var set = function(name, val) {
		var parts = name.split("."),
			cur = global,
			i,
			part,
			next;
		for (i = 0; i < parts.length - 1; i++) {
			part = parts[i];
			next = cur[part];
			if (!next) {
				next = cur[part] = {};
			}
			cur = next;
		}
		part = parts[parts.length - 1];
		cur[part] = val;
	};
	var useDefault = function(mod) {
		if (!mod || !mod.__esModule) return false;
		var esProps = { __esModule: true, default: true };
		for (var p in mod) {
			if (!esProps[p]) return false;
		}
		return true;
	};

	var hasCjsDependencies = function(deps) {
		return (
			deps[0] === "require" && deps[1] === "exports" && deps[2] === "module"
		);
	};

	var modules =
		(global.define && global.define.modules) ||
		(global._define && global._define.modules) ||
		{};
	var ourDefine = (global.define = function(moduleName, deps, callback) {
		var module;
		if (typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for (i = 0; i < deps.length; i++) {
			args.push(
				exports[deps[i]]
					? get(exports[deps[i]])
					: modules[deps[i]] || get(deps[i])
			);
		}
		// CJS has no dependencies but 3 callback arguments
		if (hasCjsDependencies(deps) || (!deps.length && callback.length)) {
			module = { exports: {} };
			args[0] = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args[1] = module.exports;
			args[2] = module;
		} else if (!args[0] && deps[0] === "exports") {
			// Babel uses the exports and module object.
			module = { exports: {} };
			args[0] = module.exports;
			if (deps[1] === "module") {
				args[1] = module;
			}
		} else if (!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		result = module && module.exports ? module.exports : result;
		modules[moduleName] = result;

		// Set global exports
		var globalExport = exports[moduleName];
		if (globalExport && !get(globalExport)) {
			if (useDefault(result)) {
				result = result["default"];
			}
			set(globalExport, result);
		}
	});
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function() {
		// shim for @@global-helpers
		var noop = function() {};
		return {
			get: function() {
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load) {
				doEval(__load.source, global);
			}
		};
	});
})(
	{},
	typeof self == "object" && self.Object == Object ? self : window,
	function(__$source__, __$global__) {
		// jshint ignore:line
		eval("(function() { " + __$source__ + " \n }).call(__$global__);");
	}
);

/*can-places-autocomplete@0.0.1-dev#places-autocomplete/places-autocomplete-callback/places-autocomplete-callback*/
define('can-places-autocomplete/places-autocomplete/places-autocomplete-callback/places-autocomplete-callback', [
    'can-view-callbacks',
    'can-control',
    'can-define/map/map',
    'can-util/js/is-function/is-function',
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
/*can-places-autocomplete@0.0.1-dev#places-autocomplete/places-autocomplete.stache!steal-stache@3.1.3#steal-stache*/
define('can-places-autocomplete/places-autocomplete/places-autocomplete.stache', [
    'module',
    'can-stache',
    'can-stache/src/mustache_core',
    'can-view-import@3.2.8#can-view-import',
    'can-stache-bindings@3.11.10#can-stache-bindings',
    'can-places-autocomplete/places-autocomplete/places-autocomplete-callback/places-autocomplete-callback'
], function (module, stache, mustacheCore) {
    var renderer = stache('places-autocomplete/places-autocomplete.stache', [
        {
            'tokenType': 'start',
            'args': [
                'can-import',
                true,
                1
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'from',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                './places-autocomplete-callback/places-autocomplete-callback',
                1
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'from',
                1
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'can-import',
                true,
                1
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n\n',
                1
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'can-slot',
                false,
                3
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'name',
                3
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'places-autocomplete-input',
                3
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'name',
                3
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'can-slot',
                false,
                3
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n  ',
                3
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'input',
                true,
                4
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'can-places-autocomplete-callback',
                4
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'can-places-autocomplete-callback',
                4
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'value:from',
                4
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'suggestion',
                4
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'value:from',
                4
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'input',
                true,
                4
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n',
                4
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'can-slot',
                5
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                ' ',
                5
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#if(suggestions.length)',
                5
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n  \n    ',
                5
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'can-slot',
                false,
                7
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'name',
                7
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'places-autocomplete-suggestions',
                7
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'name',
                7
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'can-slot',
                false,
                7
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n      ',
                7
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false,
                8
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                8
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'places-autocomplete__suggestions',
                8
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                8
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                8
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n        ',
                8
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#each(suggestions, suggestion=value)',
                9
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '  \n          ',
                9
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false,
                10
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                10
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'suggestion.description',
                10
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                10
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '  \n        ',
                10
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/each',
                11
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n      ',
                11
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                12
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n    ',
                12
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'can-slot',
                13
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n  ',
                13
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\n',
                14
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                15
            ]
        },
        {
            'tokenType': 'done',
            'args': [15]
        }
    ]);
    return function (scope, options, nodeList) {
        var moduleOptions = { module: module };
        if (!(options instanceof mustacheCore.Options)) {
            options = new mustacheCore.Options(options || {});
        }
        return renderer(scope, options.add(moduleOptions), nodeList);
    };
});
/*can-places-autocomplete@0.0.1-dev#places-autocomplete/places-autocomplete*/
define('can-places-autocomplete/places-autocomplete/places-autocomplete', [
    'exports',
    'can-component',
    'can-define/map/map',
    'can-define/list/list',
    'can-places-autocomplete/places-autocomplete/places-autocomplete.stache',
    'can-places-autocomplete/places-autocomplete/places-autocomplete.less'
], function (exports, _canComponent, _map, _list, _placesAutocomplete) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.ViewModel = undefined;
    var _canComponent2 = _interopRequireDefault(_canComponent);
    var _map2 = _interopRequireDefault(_map);
    var _list2 = _interopRequireDefault(_list);
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
});
/*can-places-autocomplete@0.0.1-dev#places-autocomplete/geo-utils/geo-utils*/
define('can-places-autocomplete/places-autocomplete/geo-utils/geo-utils', ['exports'], function (exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var geocodeForAddress = exports.geocodeForAddress = function geocodeForAddress(address) {
        var geocoder = new google.maps.Geocoder();
        var isOk = google.maps.GeocoderStatus.OK;
        return new Promise(function (resolve, reject) {
            geocoder.geocode({ address: address }, function (results, status) {
                if (status !== isOk) {
                    reject(status);
                }
                resolve(results);
            });
        });
    };
    var getLatLng = exports.getLatLng = function getLatLng(result) {
        return new Promise(function (resolve, reject) {
            try {
                var latLng = {
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng()
                };
                resolve(latLng);
            } catch (e) {
                reject(e);
            }
        });
    };
    var geocodeForPlaceId = exports.geocodeForPlaceId = function geocodeForPlaceId(placeId) {
        var geocoder = new google.maps.Geocoder();
        var isOk = google.maps.GeocoderStatus.OK;
        return new Promise(function (resolve, reject) {
            geocoder.geocode({ placeId: placeId }, function (results, status) {
                if (status !== isOk) {
                    reject(status);
                }
                resolve(results);
            });
        });
    };
});
/*can-places-autocomplete@0.0.1-dev#can-places-autocomplete*/
define('can-places-autocomplete', [
    'can-places-autocomplete/places-autocomplete/places-autocomplete',
    'can-places-autocomplete/places-autocomplete/geo-utils/geo-utils'
], function () {
    'use strict';
});
/*[global-shim-end]*/
(function(global) { // jshint ignore:line
	global._define = global.define;
	global.define = global.define.orig;
}
)(typeof self == "object" && self.Object == Object ? self : window);