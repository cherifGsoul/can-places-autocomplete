import DefineMap from "can-define/map/map";

export default DefineMap.extend('PlaceModel', {
  description: "string",
  placeId: "string",
  index: "number",
  active: "boolean",
  formattedSuggestion: "string"
});