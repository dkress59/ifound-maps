module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
		},
		"parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
			"no-tabs": 0, // airbnb
			"max-len": ["error", {"code": 128} ], // airbnb
			"indent": ["error", "tab"],
			"react/jsx-indent": [2, "tab"],
			"react/jsx-indent-props": [2, "tab"],
			"curly": ["error", "multi"],
			"nonblock-statement-body-position": ["error", "below"],
			"semi": [ "error", "never"],
			"quotes": [2, "single"],
			"no-multiple-empty-lines": [
				"error",
				{
					"max": 2,
					"maxEOF": 1
				}
			]
		}
};
