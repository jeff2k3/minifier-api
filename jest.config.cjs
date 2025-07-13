module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/app/$1' // Mapeia src/ para app/
    },
    modulePaths: ['<rootDir>/app'],
    moduleDirectories: ['node_modules', 'app'],
    testEnvironment: 'node',
};
