module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"airbnb",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended", // 설치한 경우
		"plugin:import/warnings", // 설치한 경우
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"react/require-default-props": 0, // defaultProps 관련 규칙
		"linebreak-style": 0,
		"import/prefer-default-export": 0,
		"prettier/prettier": 0,
		"import/extensions": 0,
		"no-use-before-define": 0,
		"import/no-unreolved": 0,
		"import/no-extraneous-dependencies": 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용s
		"no-shadow": 0,
		"no-param-reassign": 0,
		"react/prop-types": 0,
		"react/jsx-props-no-spreading": "off",
		"react/function-component-definition": [
			2,
			{
				namedComponents: "arrow-function",
				unnamedComponents: "arrow-function",
			},
		],
		"react/jsx-filename-extension": [
			2,
			{
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		],
		"jsx-a11y/no-noninteractive-element-interactions": 0,
		"react/react-in-jsx-scope": "off",

		"jsx-a11y/label-has-associated-control": [
			"error",
			{
				required: {
					some: ["nesting", "id"],
				},
			},
		],
		"jsx-a11y/label-has-for": [
			"error",
			{
				required: {
					some: ["nesting", "id"],
				},
			},
		],
		"@typescript-eslint/no-non-null-assertion": "off",
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
			typescript: {},
		},
	},
};
