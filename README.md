# Unjector [![Bower version](https://badge.fury.io/bo/unjector.svg)](https://badge.fury.io/bo/unjector)

Did you know that some of your customers have HTML injected into your website from their ISP? Some of the reasons
could include:
* Copyright infringement notices.
* Telling you that you have older (but compatible) modems or other equipment that comcast wants you to upgrade.
* Reaching the limit of your data cap.

It's appalling that Comcast is analyzing and injecting content into your webpage, if only there was a way
to fight back for the visitors of your website?

This package requires no additional dependencies and the minified version comes in at 2 kilobytes. Unlike Comcasts' injection, it does not pollute the global scope or cascade CSS modifications into your website. It is made to be as unobtrusive as possible.

By default it will turn these comcast popups:

![Comcast Popup](http://i.imgur.com/1zBuhFp.png)

into these specially injected popups:

![Injected Popup](http://i.imgur.com/gxrMYXG.png)

# Install

1. Install this package with Bower: `bower install unjector`
2. Add this script tag to your `head`:

```html
<script id='unjector' data-options='{}' src="../dist/unjector.min.js"></script>
```

# Configuration

More features are on the way.
