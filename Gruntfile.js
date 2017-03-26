module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		karma: {
			verify: {
			
			},
			options: {
				frameworks: ["openui5", "qunit"],
				hostname: "localhost",
				basePath: "",
				colors: true,
				captureTimeout: 30000,
				browserNoActivityTimeout: 900000,
				files: [{
						pattern: "test/**/*.spec.js",
						served: true,
						included: true,
						watched: true
				}],
				preprocessors: {
					"src/**/*.js": [
						"coverage"
					]
				},
				reporters: [
					"progress", "dots", "junit", "coverage"
				],
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
				browsers: ["Chrome"],
				autoWatch: true,
				singleRun: true,
				openui5: {
					path: "https://sapui5.hana.ondemand.com/1.44.10/resources/sap-ui-core.js",
					useMockServer: false
				},
				client: {
					openui5: {
						config: {
							theme: "sap_belize",
							libs: "sap.m",
							"xx-bindingSyntax": "complex"
						},
						mockserver: {
							config: {
								autoRespond: true
							},
							rootUri: "/my/service/",
							metadataURL: "/base/test/mock.xml",
							mockdataSettings: {
							}
						}
					}
				}
			}
		},
		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: "src",
						prefix: "my/app"
					},
					dest: "dist"
				},
				components: "my/app"
			}
		},
		connect: {
			server: {
				options: {
					port: 8080
				}
			}
		},
		openui5_connect: {
			server: {
				options: {
					appresources: "src",
					testresources: "test",
					resources: "path/to/openui5/resources"
				}
			}
		},
		eslint: {
			target: [
				"src/**/*.js"
			]
		},
		watch: {
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-openui5");


	grunt.registerTask("lint", ["eslint"]);
	grunt.registerTask("serve", "Start local server", function() {
		grunt.task.run(["openui5_connect", "watch"]);
	});

}; 
