module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		eslint: {
			target: [
				"src/**/*.js"
			]
		},
		karma: {
			dev: {
				browsers: ["Chrome"],
				autoWatch: true,
				singleRun: false,
				openui5: {
					path: "https://sapui5.hana.ondemand.com/1.44.10/resources/sap-ui-core-dbg.js",
					useMockServer: false
				},
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
				browsers: ["ChromeHeadless"],
				autoWatch: false,
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
		copy: {
			build: {
				expand: true,
				cwd: "src/",
				src: "**",
				dest: "target/dist"
			},
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ["env"]
			},
			dist: {
				files: [{
					expand: true,
					cwd: "target/dist",
					src: ["**/*.js"],
					dest: "target/dist",
					ext: ".js"
				}]
			}
		},
		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: "target/dist",
						prefix: "",
						src: [
							"**/*.js",
							"**/*.fragment.html",
							"**/*.fragment.json",
							"**/*.fragment.xml",
							"**/*.view.html",
							"**/*.view.json",
							"**/*.view.xml",
							"**/*.properties"
						],
					},
					dest: "target/dist"
				},
				components: true
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
		watch: {
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-openui5");

	grunt.registerTask("lint", ["eslint"]);
	grunt.registerTask("test", ["karma"]);
	grunt.registerTask("build", ["copy:build", "babel", "openui5_preload"]);
	grunt.registerTask("serve", "Start local server", function() {
		grunt.task.run(["openui5_connect", "watch"]);
	});
}; 
