import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import PlaceModel from "./place-model";
import { find } from "lodash/core";

export default DefineMap.extend({
	/**
	 * 
	 */
	componentRestrictions: "any",

	/**
	 *
	 **/
	suggestions: {
		type: [{
		  placeId: "string",
		 	description: "string",
		  index: "number",
		  active: "boolean",
		  formattedSuggestion: "string"
		}],
		default() {
			return new DefineList([]);
		},
		value(suggestions) {
			
			suggestions.listenTo(suggestions.lastSet, suggestions.resolve);

			suggestions.listenTo("place", () => {
				this.clearSuggestions();
			});

			suggestions.resolve(new DefineList());
		}
	},

	/**
	 *
	 **/
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
	 *
	 **/
	description: {
		type: 'string',
		value: function(description) {
			
			description.listenTo("place", (ev, place) => {
				description.resolve(place.description)
			});

			description.listenTo("activeSuggestion", (ev,suggestion) => {
				if (suggestion) {
					description.resolve(suggestion.description);
				}
			});

			description.resolve(null);
		}
	},

	/**
	 *
	 **/
	get activeSuggestion() {
		let activeSuggestion = find(this.suggestions, (suggestion) => {
			return suggestion.active;
		});
		return activeSuggestion;
	},

	/**
	 *
	 **/
	selectActiveDescriptionAt(idx) {
		let activeDescription = find(this.suggestions, (suggestion) => {
			return suggestion.index === idx;
		}).description;
		this.activateSuggestionAt(idx);
	},

	/**
	 *
	 **/
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
	 *
	 **/
	selectActiveSuggestion() {
		this.place = this.activeSuggestion;
	},

	/**
	 *
	 **/
	clearSuggestions() {
		this.suggestions = new DefineList();
	},

	/**
	 *
	 **/
	selectPlace(suggestion) {
		this.place = suggestion;
	}
});
