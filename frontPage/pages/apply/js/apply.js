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
  });
  // 提交
  $("#sub_button").click(function () {
    var pro_content = $("#content").html();
    $.post(apihost + '/front/user/course/apply/up', JSON.stringify({
      body: pro_content,
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

  function initData(){
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
      if(res.body.htmlContent){
        $("#content").html(res.body.htmlContent)
      }
    })
  }
});