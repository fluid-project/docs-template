/*
Copyright 2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// This project's repository on GitHub. Used to build URLs for "Edit on GitHub" links
// Change this value to match your site.
var githubDocRoot = "https://github.com/fluid-project/docs-template/blob/master/src/documents/";

var path = require("path");
var fs = require("fs");
var docsHelpers = require("./helpers-docpad/helpers-docpad.js");
var siteStructure = JSON.parse(fs.readFileSync("site-structure.json"));
var messages = JSON.parse(fs.readFileSync(path.join("src","static","messages","messages.json")));

// We locate the images within the src/documents directory so that images can
// be viewed on GitHub, as well as in the DocPad output. We need to
// instruct DocPad to treat the images specially so that they are not
// processed. We tell DocPad to ignore the images using "ignorePaths" and we
// then copy them ourselves with a "writeAfter" event handler.
var rootPath = process.cwd();
var docsHelpersPath = path.join (rootPath, "helpers-docpad");
var partialsDir = path.join ("src", "layouts", "partials");

// var imagesSrcDir = path.join(rootPath, "src", "documents", "images");
// var imagesDestDir = path.join ("out", "images");

module.exports = {
    rootPath: rootPath,
    filesPaths: [
        "static"
    ],
    ignorePaths: [ docsHelpersPath ],
    renderSingleExtensions: true,
    templateData: {
        siteStructure: siteStructure,
        messages: messages
    },
    plugins: {
        handlebars: {
            helpers: {
                rewriteMdLinks: docsHelpers.helpers.rewriteMdLinks,
                getGithubLocation: docsHelpers.helpers.makeGithubLocationHelper(githubDocRoot),
                getRelativeUrl: docsHelpers.helpers.getRelativeUrl,
                ifEqual: docsHelpers.helpers.ifEqual,
                getCategoryNames: docsHelpers.helpers.getCategoryNames
            },
            partials: {
                head: fs.readFileSync(path.join (partialsDir,"head.html.handlebars"), "utf8"),
                header: fs.readFileSync(path.join (partialsDir,"header.html.handlebars"), "utf8"),
                sidebar: fs.readFileSync(path.join (partialsDir,"sidebar.html.handlebars"), "utf8"),
                content: fs.readFileSync(path.join (partialsDir,"content.html.handlebars"), "utf8"),
                footer: fs.readFileSync(path.join (partialsDir,"footer.html.handlebars"), "utf8"),
                scripts: fs.readFileSync(path.join (partialsDir,"scripts.html.handlebars"), "utf8"),
                head404: fs.readFileSync(path.join (partialsDir,"404-head.html.handlebars"), "utf8"),
                sidebarIcon: fs.readFileSync(path.join ("src","static","images","icons","icon-sidebar.svg"), "utf8")
            }
        },
        highlightjs: {
            aliases: {
                stylus: "css"
            }
        },
        stylus: {
            stylusLibraries: {
                nib: true
            },
            stylusOptions: {
                compress: false,
                "include css": true
            }
        },
        uglify: {
            //  Disable UglifyJS on the development environment.
            environments: {
                development: {
                    enabled: false
                }
            },

            //  Pass false to skip compressing entirely. Pass an object to specify custom
            //  compressor options: http://lisperator.net/uglifyjs/compress .
            compress: {},

            //  Pass false to skip mangling names.
            mangle: {}
        }
    },

    environments: {
        development: {
            stylusOptions: {
                // Disable compression on the development environment
                compress: false
            }
        }
    }
};
