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
				preprocessors: {
				},
				reporters: [
					"progress", "dots"
				],
			},
			ci: {
				browsers: ["ChromeHeadless"],
				autoWatch: false,
				singleRun: true,
				preprocessors: {
					"src/**/*.js": [
						"coverage"
					]
				},
				reporters: [
					"progress", "dots", "junit", "coverage"
				],
			},
			options: {
				configFile: "karma.conf.js",
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
					dest: "target/dist"
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
	grunt.registerTask("test", "Run Karma tests", function(mode) {
		mode = mode || "dev";
		grunt.task.run("karma:" + mode);
	});
	grunt.registerTask("build", ["copy:build", "babel", "openui5_preload"]);
	grunt.registerTask("serve", "Start local server", function() {
		grunt.task.run(["openui5_connect", "watch"]);
	});
}; 
