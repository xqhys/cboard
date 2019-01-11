/*
 * @DESCRIPTION:
 * @AUTHOR:
 * @DATE:
 */
require(["jquery", "webuploader"], function ($, WebUploader) {

    $(function () {
        var $ = jQuery, $list = $('#thelist'), $btn = $('#ctlBtns'), state = 'pending', uploader;

        if (!WebUploader.Uploader.support()) {
            alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            throw new Error(
                'WebUploader does not support the browser you are using.');
        }

        uploader = WebUploader.create({
            auto:true,

            // 不压缩image
            resize: false,

            // swf文件路径,使用app.ctx IE8下点击不起作用
            swf: app.ctx + 'static/js/plugins/webuploader/Uploader.swf',

            // 文件接收服务端。
            server: app.ctx + 'common/uploadFile',

            // 文件上传请求的参数表，每次发送都会发送此对象中的参数。
            formData: {
                'tmpFlag': 'TELEGRAM'//可以传递不同业务的标识，用来区分不同业务下的文件上传
            },

            fileVal: 'uploadHolder',// [默认值：'file'] 设置文件上传域的name。

            fileNumLimit: 1,//最多只能上传一个
            fileSizeLimit: 10 * 1024 * 1024, // 10 M
            fileSingleSizeLimit: 10 * 1024 * 1024, // 10 M

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: '#picker',
                label: '点击选择文件',
                multiple: false
            }
        });
        //当文件被加入队列之前触发
        uploader.on('beforeFileQueued', function () {
            //判断队列中是否已经有待上传的文件
            var listDiv = $.trim($list.html());
            if (listDiv != '' && listDiv.length > 0) {
                alert('系统提示\n\n如需要重新选择文件,请先【取消】已选文件。');
                return false;
            }
            return true;
        });
        // 当有文件添加进来的时候
        uploader
            .on(
                'fileQueued',
                function (file) {
                    $list
                        .append('<div id="'
                            + file.id
                            + '" class="item">'
                            + '<span class="info mr15">'
                            + file.name
                            + '</span>'
                            + '<span id="'
                            + file.id
                            + '_state" class="state mr15 green">[等待上传...]</span>'
                            + '<span class="crocodile green" id="'
                            + file.id
                            + 'cl" style="cursor:hand;">[取消]</span>'
                            + '</div>');
                });

        // 文件上传过程中创建进度条实时显示。
        uploader
            .on(
                'uploadProgress',
                function (file, percentage) {
                    var $li = $('#' + file.id), $percent = $li
                        .find('.progress .progress-bar');

                    // 避免重复创建
                    if (!$percent.length) {
                        $percent = $(
                            '<div class="progress progress-striped active">'
                            + '<div class="progress-bar" role="progressbar" style="width: 0%">'
                            + '</div>' + '</div>')
                            .appendTo($li).find(
                                '.progress-bar');
                    }

                    $('#' + file.id + "_state").text('[上传中]');

                    $percent.css('width', percentage * 100
                        + '%');
                });

        uploader.on('uploadSuccess', function (file, response) {
            if (response.result) {
                $('#demoFileName').val(response.sourceName);
                $('#demoFileKey').val(response.key);
                $('#' + file.id + "_state").text('[已上传]');

            } else {
                alert('提示\n\n' + response.message);
                uploader.removeFile(file.id, true);
                $('#' + file.id).remove().fadeOut('slow');
            }
        });

        uploader.on('uploadError', function (file) {
            $('#' + file.id + "_state").text('上传出错,请按F5刷新后再试！');
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

        // 取消上传文件并从队列中删除
        // 目前未从服务器端删除已上传的文件，仅在客户端view层做删除后重新做页面局部render
        $list.on('click', '.crocodile', function () {
            var _id = this.id;
            var fileid = _id.substring(0, _id.length - 2);
            uploader.removeFile(fileid, true);
            $('#' + fileid).remove().fadeOut('slow');
            $('#demoFileName').val('');
            $('#demoFileKey').val('');
            objRegister = {};
        });

        $btn.on('click', function () {
//					checkOut();
            if (state === 'uploading') {
                uploader.stop();
            } else {
                //判断队列中是否有待上传文件
                var fileListHtml = $list.html();
                if (fileListHtml == '') {
                    alert('请选择待上传的文件，再进行上传。');
                }
                uploader.upload();
            }
            return false;
        });
    });
});