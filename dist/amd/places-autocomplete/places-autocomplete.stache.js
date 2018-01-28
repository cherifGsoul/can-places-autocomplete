/*can-places-autocomplete@0.0.1-dev#places-autocomplete/places-autocomplete.stache!steal-stache@3.1.3#steal-stache*/
define([
    'module',
    'can-stache',
    'can-stache/src/mustache_core',
    'can-view-import@3.2.8#can-view-import',
    'can-stache-bindings@3.11.10#can-stache-bindings',
    './places-autocomplete-callback/places-autocomplete-callback'
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