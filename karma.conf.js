module.exports = function(config) {
	config.set({
		frameworks: ["openui5", "qunit"],
		hostname: "localhost",
		basePath: "",
		colors: true,
		captureTimeout: 30000,
		browserNoActivityTimeout: 900000,
		logLevel: "error",
		browserConsoleLogOptions: {
			level: "error"
		},
		files: [{
			pattern: "test/**/*Page.js",
			included: true
		}, {
			pattern: "test/**/*.spec.js",
			included: true
		}, {
			pattern: "test/opa5/config.js",
			included: true
		}, {
			pattern: "src/**",
			included: false
		}, {
			pattern: "test/**",
			included: false
		}],
		junitReporter: {
			outputDir: "target",
			outputFile: "karma-test-results.xml",
			useBrowserName: false
		},
		coverageReporter: {
			type: "html", // use "covertura" for CI
			dir: "target/coverage",
			subdir: ".", // don't use browser name as subdirectory
			includeAllSources: true
		},
		openui5: {
			path: "https://sapui5.hana.ondemand.com/1.52.21/resources/sap-ui-core.js",
			useMockServer: true
		},
		client: {
			openui5: {
				config: {
					theme: "sap_belize",
					libs: "sap.m",
					"xx-bindingSyntax": "complex",
					"xx-componentPreload": "false",
					resourceRoots: {
						"my.app": "/base/src",
						"test": "/base/test"
					}
				},
				mockserver: {
					config: {
						autoRespond: true,
						autoRespondAfter: 1 // simulate async
					},
					rootUri: "/my/service/",
					metadataURL: "/base/test/odata/metadata.xml",
					mockdataSettings: {
					}
				}
			}
		}
	});
};
