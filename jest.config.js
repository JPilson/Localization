module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    setupFiles: ["<rootDir>/test/unit/index.ts"],
    "testMatch": [
        "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}",
        "<rootDir>/test/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
        '<rootDir>/src/**/__tests__/*.spec.{js,jsx,ts,tsx}',
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx']
}