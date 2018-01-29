import Component from 'can-component';
import ViewModel from "./places-autocomplete-viewmodel";
import './places-autocomplete.less';
import view from './places-autocomplete.stache';
import PlaceModel from "./place-model";


export default {
	init() {
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
		this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK
	},

	fetchPredictions(value) {
		this.autocompleteService.getPlacePredictions({
			input: value,
			componentRestrictions: this.viewModel.componentRestrictions
		}, this.autocompleteCallback.bind(this));
	},

	autocompleteCallback(predictions) {
		if (predictions && predictions.length) {

			const formattedSuggestion = structured_formatting => ({
				mainText: structured_formatting.main_text,
				secondaryText: structured_formatting.secondary_text,
			});

			this.viewModel.suggestions = predictions.map((prediction, idx) => {
				return new PlaceModel({
					description: prediction.description,
					placeId: prediction.place_id,
					index: idx,
					active: false,
					formattedSuggestion: formattedSuggestion(prediction.structured_formatting)
				});
			});
		}
	},
	"{element} input": function (el, ev) {
		const {
			value
		} = ev.target;
		if (value.length) {
			this.fetchPredictions(value);
		} else {
			this.viewModel.clearSuggestions();
		}

	},
	"{element} enter": function () {
		if (this.viewModel.activeSuggestion !== undefined) {
			this.viewModel.selectActiveSuggestion();
			this.viewModel.clearSuggestions();
		}
	},
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
	handleEscapeKey() {
		this.viewModel.clearSuggestions();
	},
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
};
