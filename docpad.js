/*
Copyright 2014-2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*eslint-env node*/

var path = require ("path");
var fs = require ("fs");
var docsHelpers = require ("./helpers-docpad/helpers-docpad.js");

var rootPath = process.cwd();
var messagesDir = path.join (rootPath, "src", "static", "messages");
var stylusIncludesDir = path.join (rootPath, "src", "documents", "css", "includes");
var docsHelpersDir = path.join (rootPath, "helpers-docpad");
var partialsDir = path.join ("src", "layouts", "partials");

var siteStructure = JSON.parse (fs.readFileSync ("site-structure.json"));
var messages = JSON.parse (fs.readFileSync (path.join (messagesDir,"messages.json")));

module.exports = {
    rootPath: rootPath,
    ignorePaths: [ docsHelpersDir, messagesDir, stylusIncludesDir],
    renderSingleExtensions: true,
    templateData: {
        siteStructure: siteStructure,
        messages: messages
    },
    plugins: {
        handlebars: {
            helpers: {
                rewriteMdLinks: docsHelpers.helpers.rewriteMdLinks,
                getGithubLocation: docsHelpers.helpers.makeGithubLocationHelper,
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
                    enabled: true
                }
            },

            //  Pass false to skip compressing entirely. Pass an object to specify custom
            //  compressor options: http://lisperator.net/uglifyjs/compress .
            compress: {},

            //  Pass false to skip mangling names.
            mangle: {}
        }
    }
};
