const { TimelineService } = require("wdio-timeline-reporter/timeline-service")
exports.config = {
    specs: ["./**/specs/**.js"],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 5,
            browserName: "chrome",
            "goog:chromeOptions": {
                args:
                    process.argv.indexOf("--headless") > -1
                        ? ["--headless"]
                        : process.argv.indexOf("--debug") > -1
                        ? ["window-size=1440,800", "--auto-open-devtools-for-tabs"]
                        : ["window-size=1440,800"]
            },
            acceptInsecureCerts: true
        }
    ],
    logLevel: "error",
    bail: 0,
    baseUrl: "http://localhost:4004/fiori-apps.html#Books-manage",
    waitforTimeout: 60000,
    connectionRetryTimeout: process.argv.indexOf("--debug") > -1 ? 1200000 : 120000,
    connectionRetryCount: 3,
    services: ["ui5", [TimelineService]],

    framework: "mocha",
    reporters: ["spec", [
        "timeline",
        {
            outputDir: "target",
            embededImages: true,
            screenshotStrategy: "before:click",
        }
    ]],

    mochaOpts: {
        ui: "bdd",
        timeout: process.argv.indexOf("--debug") > -1 ? 600000 : 60000
    }
    
}
