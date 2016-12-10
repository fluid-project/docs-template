/*
Copyright 2016 OCAD University
Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.
You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        // Project package file destination.
        pkg: grunt.file.readJSON("package.json"),

        eslint: {
            all: ["**/*.js"]
        },
        jsonlint: {
            all: ["package.json", ".eslintrc.json", "tests/**/*.json", "src/**/*.json", "!src/lib/**", "!tests/lib/**"]
        },
        copy: {
            // Copy external front end dependencies into appropriate directories
            frontEndDependencies: {
                files: [
                    // Infusion & UIO
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/dist/",
                        src: "*",
                        dest: "./src/static/lib/infusion"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/build/src/components/tableOfContents/",
                        src: "**/*",
                        dest: "./src/static/lib/infusion/src/components/tableOfContents/"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/dist/assets/src/framework/preferences/css",
                        src: "*",
                        dest: "./src/static/lib/infusion/src/framework/preferences/css"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/src/framework/preferences",
                        src: ["**/*", "!**/js/**"],
                        dest: "./src/static/lib/infusion/src/framework/preferences"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/src/framework/core/css",
                        src: "fluid.css",
                        dest: "./src/static/lib/infusion/src/framework/core/css"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/src/lib/jquery/ui/css",
                        src: "**",
                        dest: "./src/static/lib/infusion/src/lib/jquery/ui/css"
                    },
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/src/lib/fonts",
                        src: "*",
                        dest: "./src/static/lib/infusion/src/lib/fonts"
                    },
                    // Normalize
                    {
                        expand: true,
                        cwd: "./node_modules/infusion/src/lib/normalize/css/",
                        src: "*",
                        dest: "./src/static/lib/infusion/src/lib/normalize/css"
                    },
                    // Foundation
                    {
                        expand: true,
                        cwd: "./node_modules/foundation-sites/dist",
                        src: "**", dest: "./src/static/lib/foundation"
                    }
                ]
            }
        }
    });

    // Load the plugin(s):
    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-jsonlint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-exec");

    // Custom tasks:
    grunt.registerTask("default", ["lint","installFrontEnd"]);
    grunt.registerTask("lint", "Apply eslint and jsonlint", ["eslint", "jsonlint"]);
    grunt.registerTask("installFrontEnd", "Install front-end dependencies from the node_modules directory after 'npm install'", ["copy:frontEndDependencies"]);
};
