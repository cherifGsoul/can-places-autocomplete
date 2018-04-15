import Component from "can-component";
import DefineMap from "can-define/map/map";
import DefineList from "can-define/list/list";
import view from "./can-places-autocomplete.stache";
import enterEvent from "can-event-dom-enter";
import domEvents from "can-dom-events";
import assign from "can-assign";
import { find } from "lodash";

domEvents.addEvent(enterEvent);

export const ViewModel = DefineMap.extend({
	/**
	 * @property {Object}
	 */
	autocompleteService: {
		type: "any"
	},

	/**
	 * @property {String}
	 */
	autocompleteOK: {
		type: "string"
	},

	/**
	 * @property
	 */
	componentRestrictions: {
		type: "any"
	},

	/**
	 * @property {Object<{placeId: String, description:String}>}
	 */
	place: {
		type: {
			placeId: "string",
			description: "string",
			index: "number",
			active: "boolean",
			formattedSuggestion: "string"
		}
	},

	/**
	 * @property
	 */
	suggestions: {
		type: [{
			placeId: "string",
			description: "string",
			index: "number",
			active: "boolean",
			formattedSuggestion: "string"
		}],

		default () {
			return new DefineList([]);
		},

		value(suggestions) {

			suggestions.listenTo(suggestions.lastSet, suggestions.resolve);

			suggestions.listenTo("place", (ev, place) => {
				this.clearSuggestions();
			});

			suggestions.resolve(suggestions.lastSet.get());
		}
	},

	description: {
		type: 'string',
		value: function (description) {
			description.listenTo("place", (ev, place) => {
				description.resolve(place.description)
			});

			description.listenTo("activeSuggestion", (ev, suggestion) => {
				if (suggestion) {
					description.resolve(suggestion.description);
				}
			});

			description.resolve(null);
		}
	},

	/**
	 * @property
	 */
	get activeSuggestion() {
		let activeSuggestion = find(this.suggestions, (suggestion) => {
			return suggestion.active;
		});
		return activeSuggestion;
	},

	/**
	 * @function
	 */
	connectedCallback() {
		if (!window.google) {
			throw new Error(
				'Google Maps JavaScript API library must be loaded.'
			);
		}

		if (!window.google.maps.places) {
			throw new Error(
				'Google Maps Places library must be loaded. Please add `libraries=places` to the src URL.'
			);
		}

		this.autocompleteService = new google.maps.places.AutocompleteService();
		this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
	},

	/**
	 * @function
	 * @param {String} value 
	 */
	fetchPredictions(value) {
		this.autocompleteService.getPlacePredictions({
			input: value,
			componentRestrictions: this.componentRestrictions
		}, this.autocompleteCallback.bind(this));
	},

	/**
	 * @function
	 * @param {Array} predictions 
	 */
	autocompleteCallback(predictions) {
		if (predictions && predictions.length) {
			const formattedSuggestion = structured_formatting => ({
				mainText: structured_formatting.main_text,
				secondaryText: structured_formatting.secondary_text,
			});

			this.suggestions = predictions.map((prediction, idx) => {
				return assign({}, {
					placeId: prediction.place_id,
					description: prediction.description,
					index: idx,
					active: false,
					formattedSuggestion: formattedSuggestion(prediction.structured_formatting)
				});

			});
		}
	},

	/**
	 * @function
	 */
	selectActiveDescriptionAt(idx) {
		let activeDescription = find(this.suggestions, (suggestion) => {
			return suggestion.index === idx;
		}).description;
		this.activateSuggestionAt(idx);
	},

	/**
	 * @function
	 */
	activateSuggestionAt(idx) {
		this.suggestions = this.suggestions.map((suggestion, index) => {
			if (idx === index) {
				suggestion.active = true;
			} else {
				suggestion.active = false;
			}
			return suggestion;
		});
	},

	/**
	 * @function
	 */
	selectActiveSuggestion() {
		this.place = this.activeSuggestion;
	},

	/**
	 * @function
	 */
	clearSuggestions() {
		this.suggestions = new DefineList();
	}
});

export default Component.extend({
	tag: 'can-places-autocomplete',
	view,
	ViewModel,
	events: {
		/**
		 * @function
		 */
		'{element} input': function (el, ev) {
			const { value } = ev.target;

			if (value.length) {
				this.viewModel.fetchPredictions(value);
			} else {
				this.viewModel.clearSuggestions();
			}
		},

		/**
		 * @function 
		 */
		"{element} enter": function () {
			if (this.viewModel.activeSuggestion !== undefined) {
				this.viewModel.selectActiveSuggestion();
			}
		},

		/**
		 * @function
		 */
		"{element} keyup": function (el, ev) {
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

		/**
		 * @function
		 */
		handleEscapeKey() {
			this.viewModel.clearSuggestions();
		},

		/**
		 * @function
		 */
		handleArrowUp() {
			if (this.viewModel.suggestions.length === 0) {
				return;
			}
			const activeSuggestion = this.viewModel.activeSuggestion;

			if (activeSuggestion === undefined) {
				this.viewModel.selectActiveDescriptionAt(this.viewModel.suggestions.length - 1);
			} else {
				let prevIndex;
				if (activeSuggestion.index === 0) {
					prevIndex = this.viewModel.suggestions.length - 1;
				} else {
					prevIndex = (activeSuggestion.index - 1) % this.viewModel.suggestions.length;
				}
				this.viewModel.selectActiveDescriptionAt(prevIndex);
			}
		},

		/**
		 * @function
		 */
		handleArrowDown() {
			if (this.viewModel.suggestions.length === 0) {
				return;
			}
			const activeSuggestion = this.viewModel.activeSuggestion;

			if (activeSuggestion === undefined) {
				this.viewModel.selectActiveDescriptionAt(0);
			} else {
				const nextIndex =
					(activeSuggestion.index + 1) % this.viewModel.suggestions.length;
				this.viewModel.selectActiveDescriptionAt(nextIndex);
			}
		}
	}
});
