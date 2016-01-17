'use strict';

(function unjector() {

    /**
     * Unjector Utility Functions.
     */
    var util = {
        /**
         * Extend Object
         *
         * @param {object} src - Source Object
         * @param {object} dest - Destination Object
         * @returns {object}
         */
        extend: function(src, dest) {
            src = src || {};
            for (var prop in dest) {
                if (!dest.hasOwnProperty(prop)) {
                    return;
                }

                if (typeof src[prop] === 'object') {
                    src[prop] = util.extend(src[prop], dest[prop]);
                } else {
                    src[prop] = dest[prop];
                }
            }
            return src;
        },

        /**
         * Apply CSS to an element
         *
         * @param elem
         * @param styles
         * @returns {Element}
         */
        css: function(elem, styles) {
            return util.extend(elem.style, styles);
        }
    };

    /**
     * Element Styles
     */
    var style = {
        popup: {
            'height': 'auto',
            'paddingBottom': '125px'
        },
        note: {
            'color': 'red'
        },
        buttons: {
            'background': 'red',
            'color': 'white',
            'textDecoration': 'none',
            'padding': '10px 20px',
            'display': 'inline-block',
            'margin': '10px 5px 0 0'
        }
    };

    /**
     * Unjector Library
     */
    var lib = {
        globals: ['_ComcastAlert'],
        popupIds: ['comcast_content'],
        paragraphClasses: ['textcontent', 'textcontent1']
    };

    /**
     * Default Settings
     */
    var defaults = {
        text: 'Your Internet Service Provider (ISP) Comcast, has tracked your web surfing ' +
        'and injected its own content into your private browsing. They may be accusing ' +
        'you of hitting your data cap or having outdated hardware. If this is the case, ' +
        'you should consider filing a complaint with the Federal Communications Commission ' +
        '(FCC) as these actions are monopolistic and possibly illegal.',
        buttons: [{
            text: 'Click here to file a complaint with the FCC »',
            href: 'https://consumercomplaints.fcc.gov/hc/en-us/categories/200134970-Internet'
        }]
    };

    /**
     * Unjector Initialization Method.
     *
     * @param event
     */
    function Unject(event) {

        var settings;
        var unjectorElement = document.getElementById('unjector');

        if (unjectorElement) {
            var options = JSON.parse(unjectorElement.getAttribute('data-options'));
            settings = util.extend(defaults, options);
        } else {
            settings = defaults;
        }

        function getGlobal() {
            var global;
            for (var i = 0; i < lib.globals.length; i++) {
                var name = lib.globals[i];
                var globalObject = window[name];
                if (globalObject) {
                    global = globalObject;
                }
            }
            return global;
        }
        var global = getGlobal();

        function getPopup() {
            var popup;
            for (var i = 0; i < lib.popupIds.length; i++) {
                var id = lib.popupIds[i];
                var elem = document.getElementById(id);
                if (elem) {
                    popup = elem;
                }
            }
            return popup;
        }
        var popupElement = getPopup();

        function getLastParagraph() {
            var lastParagraph;
            for (var i = 0; i < lib.paragraphClasses.length; i++) {
                var className = lib.paragraphClasses[i];
                var elements = popupElement.getElementsByClassName(className);
                if (elements.length) {
                    lastParagraph = elements[elements.length - 1];
                }
            }
            return lastParagraph;
        }

        function createButton(text, href) {
            var buttonElement = document.createElement("a");
            buttonElement.textContent = text;
            buttonElement.setAttribute('href', href);
            buttonElement.setAttribute('target', '_blank');

            return buttonElement;
        }

        function createButtons(className) {
            var buttonContainer = document.createElement("div");
            buttonContainer.className = className;
            for (var i = 0; i < settings.buttons.length; i++) {
                var buttonContent = settings.buttons[i];
                var buttonElement = createButton(buttonContent.text, buttonContent.href);
                util.css(buttonElement, style.buttons);
                buttonContainer.appendChild(buttonElement);
            }
            return buttonContainer;
        }

        function restylePopup(elem) {
            util.css(elem, style.popup);
        }

        function addNote() {
            var lastParagraph = getLastParagraph();
            var paragraphParent = lastParagraph.parentElement;

            var note = document.createElement("p");
            note.className = lastParagraph.className;
            note.textContent = settings.text;
            util.css(note, style.note);

            paragraphParent.insertBefore(note, lastParagraph.nextSibling);

            var buttons = createButtons(lastParagraph.className);
            paragraphParent.insertBefore(buttons, note.nextSibling);
        }

        if (global && popupElement) {
            if (typeof console === 'undefined') {
                return;
            }
            console.warn('Unjector: It looks like Comcast has injected some code into the page!');
            addNote();
            restylePopup(popupElement);
        }
    }

    /**
     * Onload Hook.
     *
     * If there is already an onload function, add the
     * injector checker after it.
     */
    if (typeof window.onload != 'function') {
        window.onload = Unject;
    } else {
        var otherOnload = window.onload;
        window.onload = function(event) {
            otherOnload(event);
            Unject(event);
        };
    }

})();
