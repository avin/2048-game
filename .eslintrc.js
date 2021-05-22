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
		// 'consistent-return': 0,
		// 'no-shadow': 0,
		// 'no-new': 0,
		'arrow-body-style': 0,
		'import/order': 0,
		'import/prefer-default-export': 0,
		// 'import/extensions': [
		//   'error',
		//   'ignorePackages',
		//   {
		//     js: 'never',
		//     jsx: 'never',
		//     ts: 'never',
		//     tsx: 'never',
		//   },
		// ],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/*.test.ts',
					'**/*.fixture.tsx',
					'./scripts/**',
					'./additional/**',
					'./src/cosmos.decorator.tsx',
					'./src/setupProxy.js',
				],
			},
		],
		// 'react/static-property-placement': 0,
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		// 'react/forbid-prop-types': 0,
		'react/require-default-props': 0,
		// 'react/jsx-wrap-multilines': ['error', { declaration: false }],
		// 'react/jsx-one-expression-per-line': 0,
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

		// Отключаем параноидальные правила TS
		'@typescript-eslint/no-unsafe-assignment': 0,
		'@typescript-eslint/no-unsafe-call': 0,
		'@typescript-eslint/no-unsafe-member-access': 0,
		'@typescript-eslint/no-empty-interface': 0,
		// '@typescript-eslint/ban-ts-comment': 0,

		// не дружит в react-hook-form
		'@typescript-eslint/unbound-method': 0,
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
