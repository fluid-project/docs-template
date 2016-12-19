/*
Copyright 2015-2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/
"use strict";
var uri = require("URIjs");
var path = require("path");

module.exports.helpers = {};

module.exports.getStaticFilesDir = function () {
    return path.resolve(path.join(__dirname, "src", "static"));
};

/**
Helper function to rewrite *.md links to *.html:
With this helper, we can write links to *.md files in our source files but
generate links to *.html in the DocPad output. This arrangement gives us
links that work both on the GitHub website and in the generated HTML.

@param {string} content - the content to process.
@return {string} - the content with *.md links rewritten to *.html.
*/
module.exports.helpers.rewriteMdLinks = function (content) {
    return content.replace(/(<a\s[^>]*href="[\w-/\.]+)\.md(["#])/gm, "$1.html$2");
};

/**
Helper function to build a URL for "Edit on GitHub" for the current document.

@param {string} theDocumentRelativePath - the relative path to the document.
@param {string} githubDocRoot - the URL to the document's github repository root.
@return {string} - the absolute URL to the document's location in its github
                   repository.
*/
module.exports.helpers.makeGithubLocationHelper = function (theDocumentRelativePath, githubDocRoot) {
    // in case we're on Windows, replace "\" in the path with "/"
    var relativePath = theDocumentRelativePath.replace(/\\/g, "/");
    return githubDocRoot + relativePath;
};

/**
Helper function to build relative URLs:
Used for links to static resources such as CSS files. So that the generated
DocPad output is independent of the URL that it is hosted at.

@param {string} forUrl - the target URL.
@param {string} relativeToUrl - the URL the target is relative to.
@return {string} - the relative path of the target URL.
*/
module.exports.helpers.getRelativeUrl = function (forUrl, relativeToUrl) {
    return uri(forUrl).relativeTo(relativeToUrl);
};

/**
Helper function to determine if two values are equal
Used to determine which table of contents category to display on a particular
page.

@param {object} a - an object to compare.
@param {object} b - an object to compare against.
@return {boolean} - `true` if a is equal to b, `false` otherwise.
*/
module.exports.helpers.ifEqual = function (a, b, options) {
    if (a === b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
};
