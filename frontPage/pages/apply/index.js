
$(function () {
  var isGet = false;
  var id = GetRequest().id || ''
  var defultUserInfo = {};

  $.ajax({
    method: "post",
    url: apihost + "/front/user/course/apply",
    contentType: "application/json",
    data: JSON.stringify({
      body: {
        htmlContent: "",
        userRefCourseId: id
      },
      header: {
        authentication: localStorage.token|| '',
        pageNum: 0,
        pageSize: 0
      }
    }),
    success: function (res) {
      var data = res.header;
      var qdata = res.body;
      var code = data.code;
      if (code == "SUCCESS") {
        isGet = true;
        if (qdata) {
          defultUserInfo = qdata;
        }
      } else {
        alert(data.msg);
      }
    }
  });

  $("#submit").click(function () {
    if (!isGet) {
      alert("请输入正确信息");
      return;
    }
    var formdata = {};
    var qbody = Object.assign({}, defultUserInfo, formdata);
    $.ajax({
      method: "post",
      url: host + "/front/user/perfect",
      contentType: "application/json",
      data: JSON.stringify({
        body: qbody,
        header: {
          authentication: "",
          pageNum: 0,
          pageSize: 0
        }
      }),
      success: function (res) {
        var data = res.header;
        var qdata = res.body;
        var code = data.code;
        if (code == "SUCCESS") {
          layer.msg("提交成功");
        } else {
          layer.msg(data.msg);
        }
      }
    });
  });

  $("[required]")
    .parent()
    .addClass("required");

  $.datepicker.regional["zh-CN"] = {
    clearText: "清除",
    clearStatus: "清除已选日期",
    closeText: "关闭",
    closeStatus: "不改变当前选择",
    prevText: "< 上月",
    prevStatus: "显示上月",
    prevBigText: "<<",
    prevBigStatus: "显示上一年",
    nextText: "下月>",
    nextStatus: "显示下月",
    nextBigText: ">>",
    nextBigStatus: "显示下一年",
    currentText: "今天",
    currentStatus: "显示本月",
    monthNames: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    monthNamesShort: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    monthStatus: "选择月份",
    yearStatus: "选择年份",
    weekHeader: "周",
    weekStatus: "年内周次",
    dayNames: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ],
    dayNamesShort: [
      "周日",
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六"
    ],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    dayStatus: "设置 DD 为一周起始",
    dateStatus: "选择 m月 d日, DD",
    dateFormat: "yy-mm-dd",
    firstDay: 1,
    initStatus: "请选择日期",
    isRTL: false
  };
  $.datepicker.setDefaults($.datepicker.regional["zh-CN"]);
  $("#datepicker1,#datepicker2").datepicker({
    changeMonth: true,
    changeYear: true
  });
});