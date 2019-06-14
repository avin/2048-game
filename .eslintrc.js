module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb-base', 'plugin:import/errors', 'prettier', 'plugin:react/recommended'],
	env: {
		browser: true,
		jest: true,
	},
	plugins: ['import', 'react'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'max-len': ['error', 120, {ignoreTemplateLiterals: true, ignoreRegExpLiterals: true}],
		'no-bitwise': 'off',
		'default-case': 'off',

		'no-mixed-operators': 'off',
		'no-await-in-loop': 'off',
		'func-names': ['error', 'never'],
		'no-underscore-dangle': [
			'error',
			{
				allow: ['__REDUX_DEVTOOLS_EXTENSION__'],
			},
		],
		'prefer-destructuring': [
			'error',
			{
				VariableDeclarator: {
					array: false,
					object: true,
				},
				AssignmentExpression: {
					array: true,
					object: false,
				},
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		'import/prefer-default-export': 'off',
		'import/no-named-as-default': 'off',
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: ['**/*.test.js', '**/*.spec.js', '**/test/*.js', '**/__tests__/*.js'] },
		],
		'no-param-reassign': 'off',
		'class-methods-use-this': 'off',
		'no-shadow': 'off',
		'consistent-return': 'off',
		'spaced-comment': ['error', 'always'],
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			pragma: 'h',
			version: '16.8',
		},
	},
};
