export default {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	collectCoverage: true,
	coverageReporters: ["json", "lcov", "text", "clover"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
}
