var system = require('system');
var args = system.args;
var resourceWait = 300;
var maxRenderWait = 10000;
var url = '';
var page = require('webpage').create(),
    count = 0,
    forcedRenderTimeout,
    renderTimeout;
if (args.length === 1) {
    phantom.exit();
} else {
    url = args[args.length - 1];
}

page.viewportSize = {
    width: 1280,
    height: 1024
};

function doRender() {
    var content = page.content;
    console.log(content);
    phantom.exit();
}

page.onResourceRequested = function (req) {
    count += 1;
    clearTimeout(renderTimeout);
};
page.onError = function (msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function
                ? ' (in function "' + t.function + '")'
                : ''));
        });
    }
};
page.onResourceReceived = function (res) {
    if (!res.stage || res.stage === 'end') {
        count -= 1;
        if (count === 0) {
            renderTimeout = setTimeout(doRender, resourceWait);
        }
    }
};

page.open(url, function (status) {
    if (status !== "success") {
        phantom.exit();
    } else {
        forcedRenderTimeout = setTimeout(function () {
            doRender();
        }, maxRenderWait);
    }
});