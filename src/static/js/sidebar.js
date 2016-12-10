/*
Copyright 2015-2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var docs = docs || {};

(function () {
    "use strict";
    docs.sidebar = {};

    /**
    Check whether the sidebar is hidden by checking the presence of a class on
    the body element.

    @param {object} theBody - jQuery object for the body element.
    @return {boolean} - `true` if the sidebar is hidden. `false` otherwise.
    */
    docs.sidebar.isHidden = function (theBody) {
        return theBody.hasClass("docs-template-sidebar-hidden");
    };

    /**
    This function toggles the visibility of the sidebar, and changes the label
    depending on whether the sidebar is visible or hidden.

    @param {object} theBody - jQuery object for the body element.
    @param {object} theToggleLabel - the element for the hide / show toggle label.
    */
    docs.sidebar.hideShow = function (theBody, theToggleLabel, theHideText, theShowText) {
        theBody.toggleClass("docs-template-sidebar-hidden");
        if (docs.sidebar.isHidden(theBody)) {
            theToggleLabel.html(theShowText);
        } else {
            theToggleLabel.html(theHideText);
        }
    };

    /**
    When resizing from small / mobile to larger, make the sidebar appear by
    default.
    */
    docs.sidebar.expandOnResize = function (oldSize, newSize, theBody, theToggleLabel) {
        if (oldSize === "small" && newSize !== "small") {
            if (docs.sidebar.isHidden(theBody)) {
                docs.sidebar.hideShow(theBody, theToggleLabel);
            }
        }
    };
})();
