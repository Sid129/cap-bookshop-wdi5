const { TimelineService } = require("wdio-timeline-reporter/timeline-service")
exports.config = {
    // ====================
    // wdi5 Configuration
    // ====================
    //
    wdi5: {
        screenshotPath: require("path").join("some", "dir", "for", "screenshots"), // [optional] {string}, default: ""
        screenshotsDisabled: true, // [optional] {boolean}, default: false; if set to true, screenshots won't be taken and not written to file system
        logLevel: "error", // [optional] error | verbose | silent, default: "error"
        skipInjectUI5OnStart: false, // [optional] {boolean}, default: false; true when UI5 is not on the start page, you need to later call <wdioUI5service>.injectUI5() manually
        waitForUI5Timeout: 60000, // [optional] {number}, default: 15000; maximum waiting time in milliseconds while checking for UI5 availability
        btpWorkZoneEnablement: false // [optional] {boolean}, default: false; whether to instruct wdi5 to inject itself in both the SAP Build Workzone, standard edition, shell and app
    },
    
    specs: ["./specs/**.js"],
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
