/*
 * @DESCRIPTION:
 * @AUTHOR:
 * @DATE:
 */
require.config({

    baseUrl: app.ctx + "",
    paths: {
        "jquery": ["static/js/jquery.min"],
        "webuploader": ["static/js/plugins/webuploader/webuploader.min"],
        "demoUploadMain": ["static/custom/upload_js/demo.upload"],
        "demoOtherUploadMain": ["static/custom/upload_js/demo.other.upload"]
    },
    shim: {
        "webuploader": ["jquery"]
    }
});

// Load the main app module to start the app
require(["demoUploadMain"]);
require(["demoOtherUploadMain"]);

