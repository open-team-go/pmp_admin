$(function () {
    initData()
    // 添加下一个项目
    $("#add_pro").click(function () {
        var pro_content = $("#example_pro").html();
        var pro = $('<div class="pro"></div>');
        pro.html(pro_content);
        $("#content").append(pro);
        var num = $(".pro").length;
        $(this).html("添加第" + (num + 1) + "个项目");
        $("#remove_pro").html("移除第" + (num) + "个项目").show();
    });
    // 移除上一个项目
    $("#remove_pro").click(function () {
        $(".pro").last().remove();
        var num = $(".pro").length;
        if (num <= 1) {
            $("#add_pro").html("添加第" + (num + 1) + "个项目");
            $(this).hide();
        }
    });
    // 提交
    $("#sub_button").click(function () {
        // 判定表格填写
        if (!confirmSubmit()) {
            return;
        }

        var params = GetRequest()
        var pro_content = $("#content").html();
        $.post(apihost + '/front/user/course/apply/up', JSON.stringify({
            body: {
                "htmlContent": pro_content,
                "userRefCourseId": params.id
            },
            "header": {
                "authentication": localStorage.token || '',
            }
        }), function (res) {
            if (res.header.code != "SUCCESS") {
                layer.msg(res.header.msg)
                return false
            }
            layer.msg('更新成功');
        })
    });

    function confirmSubmit() {
        var num = $(".pro").length;
        if (0 >= num) {
            return true;
        }
        if (num < 2) {
            layer.msg('最少需要填写两个项目经验');
            return false;
        }
        var flag = true;
        var title = "";
        var req = $(".req");
        req.each(function (item) {
            var _parent = $(this).parent();
            var _next = _parent.next();
            var _content = _next.find("input");
            if (!_content) {
                _content = _next.find("textaera");
            }
            if (_content) {
                var value = _content.val();
                title = _parent.text();
                if (!value) {
                    flag = false;
                    return false;
                }
            }
        })
        if (!flag) {
            layer.msg(title + "必填");
            return false;
        }
    }

    function initData() {
        var params = GetRequest()
        $.post(apihost + '/front/user/course/apply', JSON.stringify({
            body: {
                "htmlContent": "",
                "userRefCourseId": params.id
            },
            "header": {
                "authentication": localStorage.token || '',
            }
        }), function (res) {
            if (res.header.code != "SUCCESS") {
                layer.msg(res.header.msg)
                return false
            }
            if (res.body && res.body.htmlContent) {
                $("#content").html(res.body.htmlContent)
            }
        })
    }
});