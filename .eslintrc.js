module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.eslint.json',
	},
	extends: [
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
		'plugin:css-modules/recommended',
		'plugin:react-perf/recommended',
	],
	plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'css-modules', 'react-perf'],
	env: {
		browser: true,
		jest: true,
	},
	rules: {
		'spaced-comment': ['warn', 'always', { markers: ['/'] }],
		curly: ['error', 'all'],
		'no-unused-vars': [1, { args: 'none', ignoreRestSiblings: true }],
		'no-underscore-dangle': [
			1,
			{
				allow: ['__REDUX_DEVTOOLS_EXTENSION__', '_paq'],
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
					array: false,
					object: false,
				},
			},
			{
				enforceForRenamedProperties: false,
			},
		],
		'jsx-a11y/control-has-associated-label': 0,
		'jsx-a11y/label-has-associated-control': 0,
		'no-console': ['warn', { allow: ['warn', 'error', 'info', 'dir'] }],
		'no-param-reassign': 0,
		'no-void': 0,
		'class-methods-use-this': 0,
		'arrow-body-style': 0,
		'import/order': 0,
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': 0,
		'import/no-duplicates': 0,
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'react/require-default-props': 0,
		'react/jsx-props-no-spreading': 0,
		'react/prop-types': 0,
		'react-perf/jsx-no-new-object-as-prop': [
			'error',
			{
				nativeAllowList: ['style'],
			},
		],

		'@typescript-eslint/ban-types': [
			'error',
			{
				extendDefaults: true,
				types: {
					'{}': false,
				},
			},
		],

		'@typescript-eslint/no-unsafe-assignment': 0,
		'@typescript-eslint/no-unsafe-call': 0,
		'@typescript-eslint/no-unsafe-member-access': 0,
		'@typescript-eslint/no-empty-interface': 0,
		'@typescript-eslint/no-loop-func': 0,
	},
	overrides: [
		{
			files: ['*.fixture.tsx'],
			rules: {
				'react-perf/jsx-no-new-object-as-prop': 0,
			},
		},
	],
	settings: {
		react: {
			version: require('react/package.json').version,
		},
		'import/resolver': 'webpack',
	},
};
