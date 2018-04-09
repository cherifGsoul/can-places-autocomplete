import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import PlaceModel from "./place-model";
import { find } from "lodash/core";

export default DefineMap.extend({
	suggestions: {
		Type: DefineList,
		default() {
			return new DefineList([])
		}
	},
	place: {
		type: {
		  placeId: "string",
			description: "string",
		  index: "number",
		  active: "boolean",
		  formattedSuggestion: "string"
		},
		set(place) {
			this.clearSuggestions();
			return place;
		}
	},

	placesComponentRestriction: "any",

	get activeSuggestion() {
		let activeSuggestion = find(this.suggestions, (suggestion) => {
			return suggestion.active;
		});
		return activeSuggestion;
	},

	get description() {
		let description = '';
		if (this.place) {
			description = this.place.description;
		}

		if (this.activeSuggestion) {
			description = this.activeSuggestion.description;
		}
		return description;
	},

	selectActiveDescriptionAt(idx) {
		let activeDescription = _.find(this.suggestions, (suggestion) => {
			return suggestion.index === idx;
		}).description;
		this.activateSuggestionAt(idx);
	},

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

	selectActiveSuggestion() {
		this.place = this.activeSuggestion;
	},

	clearSuggestions() {
		this.suggestions = new DefineList();
	},

	selectPlace(suggestion) {
		this.place = suggestion;
	}
});
