var BASE_URL = '../';

// 文件上传
jQuery(function () {
    var $ = jQuery,
        $list = $('#thelist'),
        $btn = $('#ctlBtns'),
        state = 'pending',
        uploader;

    if (!WebUploader.Uploader.support()) {
        alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error('WebUploader does not support the browser you are using.');
    }


    uploader = WebUploader.create({

        // 不压缩image
        resize: false,

        // swf文件路径
        swf: BASE_URL + '/js/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: BASE_URL + '/uploadUtil/uploadHandle',

        //文件上传请求的参数表，每次发送都会发送此对象中的参数。
        formData: {'tempDir': 'WEB-INF/tempDir'},


        fileVal: 'upload',// [默认值：'file'] 设置文件上传域的name。

        fileNumLimit: 3,
        fileSizeLimit: 5 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 1 * 1024 * 1024,   // 50 M

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: '#picker',
            label: '点击选择文件',
            multiple: false
        }
    });

    /*
    // 添加“添加文件”的按钮，
    uploader.addButton({
        id: '#picker',
        label: '继续添加'
    });
    */
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        $list.append('<div id="' + file.id + '" class="item">' +
            '<span class="info mr15">' + file.name + '</span>' +
            '<span id="' + file.id + '_state" class="state mr15 green">[等待上传...]</span>' +
            '<span class="crocodile green" id="' + file.id + 'cl" style="cursor:hand;">[取消]</span>' +
            '</div>');
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo($li).find('.progress-bar');
        }

        $('#' + file.id + "_state").text('[上传中]');

        $percent.css('width', percentage * 100 + '%');
    });

    uploader.on('uploadSuccess', function (file, response) {
        if (response.result) {
            alert(response.msg + "\n\n文件名:" + response.sourceName + "\n\nurl:" + response.url);
            /*
            $.messager.show({
                title:'提示',
                msg:response.msg,
                timeout:5000,
                showType:'slide'
            });
             */
            $('#sheLiShenQingShu').val(response.url);

        }
        $('#' + file.id + "_state").text('[已上传]');
    });

    uploader.on('uploadError', function (file) {
        $('#' + file.id + "_state").text('上传出错');
    });

    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').fadeOut();
    });

    uploader.on('all', function (type) {
        if (type === 'startUpload') {
            state = 'uploading';
        } else if (type === 'stopUpload') {
            state = 'paused';
        } else if (type === 'uploadFinished') {
            state = 'done';
        }

        if (state === 'uploading') {
            $btn.text('暂停上传');
        } else {
            $btn.text('开始上传');
        }
    });

    //取消上传文件并从队列中删除
    //目前未从服务器端删除已上传的文件，仅在客户端view层做删除后重新做页面局部render
    $list.on('click', '.crocodile', function () {
        var _id = this.id;
        var fileid = _id.substring(0, _id.length - 2);
        uploader.removeFile(fileid, true);
        $('#' + fileid).remove().fadeOut('slow');
        $('#sheLiShenQingShu').val('');//修复删除上传文件时，未同步删除隐藏域中返回的server端的url。updated by hety on June25,2015.

    });

    $btn.on('click', function () {
        if (state === 'uploading') {
            uploader.stop();
        } else {
            uploader.upload();
        }
        return false;//added by hety on June23 ,2015.修复webuploader包含在form中时，文件上传后会自动提交form的bug
    });


    /*
     * add by ELONG on June24 ,2015  uploader2
     * 法定代表人申请表上传
     *
     */
    var
        $list2 = $('#thelist2'),
        $btn2 = $('#ctlBtns2'),
        state = 'pending',
        uploader2;

    if (!WebUploader.Uploader.support()) {
        alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error('WebUploader does not support the browser you are using.');
    }


    uploader2 = WebUploader.create({

        // 不压缩image
        resize: false,

        // swf文件路径
        swf: BASE_URL + '/js/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: BASE_URL + '/uploadUtil/uploadHandle',

        //文件上传请求的参数表，每次发送都会发送此对象中的参数。
        formData: {'tempDir': 'WEB-INF/tempDir'},

        fileVal: 'upload',// [默认值：'file'] 设置文件上传域的name。

        fileNumLimit: 3,
        fileSizeLimit: 5 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 1 * 1024 * 1024,   // 50 M

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: '#picker2',
            label: '点击选择文件',
            multiple: false
        }
    });

    /*
    // 添加“添加文件”的按钮，
    uploader.addButton({
        id: '#picker',
        label: '继续添加'
    });
    */
    // 当有文件添加进来的时候
    uploader2.on('fileQueued', function (file) {
        $list2.append('<div id="' + file.id + '" class="item">' +
            '<span class="info mr15">' + file.name + '</span>' +
            '<span id="' + file.id + '_state" class="state mr15 green">[等待上传...]</span>' +
            '<span class="crocodile green" id="' + file.id + 'cl" style="cursor:hand;">[取消]</span>' +
            '<input id="faRen" type="hidden" value=""/>' +
            '</div>');
    });

    // 文件上传过程中创建进度条实时显示。
    uploader2.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo($li).find('.progress-bar');
        }

        $('#' + file.id + "_state").text('[上传中]');

        $percent.css('width', percentage * 100 + '%');
    });

    uploader2.on('uploadSuccess', function (file, response) {
        if (response.result) {
            /*
             alert("上传成功。\nurl:"+response.url);
            $.messager.show({
                title:'提示',
                msg:response.msg,
                timeout:5000,
                showType:'slide'
            });
             */
            $('#faRen').val(response.url);
        }
        $('#' + file.id + "_state").text('[已上传]');
    });

    uploader2.on('uploadError', function (file) {
        $('#' + file.id + "_state").text('上传出错');
    });

    uploader2.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').fadeOut();
    });

    uploader2.on('all', function (type) {
        if (type === 'startUpload') {
            state = 'uploading';
        } else if (type === 'stopUpload') {
            state = 'paused';
        } else if (type === 'uploadFinished') {
            state = 'done';
        }

        if (state === 'uploading') {
            $btn2.text('暂停上传');
        } else {
            $btn2.text('开始上传');
        }
    });

    //取消上传文件并从队列中删除
    //目前未从服务器端删除已上传的文件，仅在客户端view层做删除后重新做页面局部render
    $list2.on('click', '.crocodile', function () {
        var _id = this.id;
        var fileid = _id.substring(0, _id.length - 2);
        uploader2.removeFile(fileid, true);
        $('#' + fileid).remove().fadeOut('slow');

    });

    $btn2.on('click', function () {
        if (state === 'uploading') {
            uploader2.stop();
        } else {
            uploader2.upload();
        }
        return false;//added by hety on June23 ,2015.修复webuploader包含在form中时，文件上传后会自动提交form的bug
    });


    /*
     * add by ELONG on June24 ,2015  uploader3
     * 其它附件上传：多文件上传使用
     */
    var
        $list3 = $('#thelist3'),
        $btn3 = $('#ctlBtns3'),
        state = 'pending',
        uploader3;

    if (!WebUploader.Uploader.support()) {
        alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error('WebUploader does not support the browser you are using.');
    }


    uploader3 = WebUploader.create({

        // 不压缩image
        resize: false,

        // swf文件路径
        swf: BASE_URL + '/js/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: BASE_URL + '/uploadUtil/uploadHandle',

        //文件上传请求的参数表，每次发送都会发送此对象中的参数。
        formData: {'tempDir': 'WEB-INF/tempDir'},

        fileVal: 'upload',// [默认值：'file'] 设置文件上传域的name。

        fileNumLimit: 3,
        fileSizeLimit: 5 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 1 * 1024 * 1024,   // 50 M

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: '#picker3',
            label: '多文件选择',
            multiple: true
        }
    });

    /*
    // 添加“添加文件”的按钮，
    uploader3.addButton({
        id: '#picker3',
        label: '继续添加'
    });
    */
    // 当有文件添加进来的时候
    uploader3.on('fileQueued', function (file) {
        $list3.append('<div id="' + file.id + '" class="item">' +
            '<span class="info mr15">' + file.name + '</span>' +
            '<span id="' + file.id + '_state" class="state mr15 green">[等待上传...]</span>' +
            '<span class="crocodile green" id="' + file.id + 'cl" style="cursor:hand;">[取消]</span>' +
            '</div>');
    });

    // 文件上传过程中创建进度条实时显示。
    uploader3.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo($li).find('.progress-bar');
        }

        $('#' + file.id + "_state").text('[上传中]');

        $percent.css('width', percentage * 100 + '%');
    });

    uploader3.on('uploadSuccess', function (file, response) {
        if (response.result) {
            /*
             alert("上传成功。\nurl:"+response.url);
            $.messager.show({
                title:'提示',
                msg:response.msg,
                timeout:5000,
                showType:'slide'
            });
             */

        }
        $('#' + file.id + "_state").text('[已上传]');
    });

    uploader3.on('uploadError', function (file) {
        $('#' + file.id + "_state").text('上传出错');
    });

    uploader3.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').fadeOut();
    });

    uploader3.on('all', function (type) {
        if (type === 'startUpload') {
            state = 'uploading';
        } else if (type === 'stopUpload') {
            state = 'paused';
        } else if (type === 'uploadFinished') {
            state = 'done';
        }

        if (state === 'uploading') {
            $btn3.text('暂停上传');
        } else {
            $btn3.text('开始上传');
        }
    });

    //取消上传文件并从队列中删除
    //目前未从服务器端删除已上传的文件，仅在客户端view层做删除后重新做页面局部render
    $list3.on('click', '.crocodile', function () {
        var _id = this.id;
        var fileid = _id.substring(0, _id.length - 2);
        uploader3.removeFile(fileid, true);
        $('#' + fileid).remove().fadeOut('slow');

    });

    $btn3.on('click', function () {
        if (state === 'uploading') {
            uploader3.stop();
        } else {
            uploader3.upload();
        }
        return false;//added by hety on June23 ,2015.修复webuploader包含在form中时，文件上传后会自动提交form的bug
    });
});