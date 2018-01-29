import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import PlaceModel from "./place-model";
import _ from "lodash/core";

export default DefineMap.extend({
	suggestions: DefineList,

	place: {
		Type: PlaceModel,
		set() {
			this.suggestions.replace([]);
		}
	},

	placesComponentRestriction: "any",

	description: {
		type: "string"
	},

	placeId:{
		type: "string"
	},

	get activeSuggestion() {
		let activeSuggestion = _.find(this.suggestions, (suggestion) => {
			return suggestion.active;
		});
		return activeSuggestion;
	},

	selectActiveDescriptionAt(idx) {
		let activeDescription = _.find(this.suggestions, (suggestion) => {
			return suggestion.index === idx;
		}).description;
		this.activateSuggestionAt(idx);
		this.description = activeDescription;
	},

	activateSuggestionAt(indx) {
		this.suggestions = this.suggestions.map((suggestion, index) => {
			if (indx === index) {
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
	}
});
