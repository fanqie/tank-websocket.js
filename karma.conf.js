module.exports = function(config) {
    config.set({
        frameworks: ['mocha','chai'],
        browsers: ['Chrome'],
        files: [
            'test/**/*.test.js',
            'lib/**/*.js',
        ],
        captureTimeout: 30000,
        browserDisconnectTimeout: 10000,
        reporters: ['progress'],
        singleRun: true
    })
}
