$(function () {
  initData();
  $('#submit').on('click', function () {
    var bootstrapValidator = $("#form1").data('bootstrapValidator');
    bootstrapValidator.validate();
    if(!bootstrapValidator.isValid()) return;

    var data = $("#form1").getform();
    var data2 = $("#form2").getform();
    var body = Object.assign({}, data, data2)
    if(body.birthday){
      body.birthday = Math.floor(new Date(body.birthday).getTime()/1000)
    }
    if(body.graduationTime){
      body.graduationTime = Math.floor(new Date(body.graduationTime).getTime()/1000)
    }
    updateInfo(body)
  })

  $('.input-date').datepicker({
    language: 'zh-CN', //语言
    autoclose: true, //选择后自动关闭
    clearBtn: true,//清除按钮
  })

  $('#form1').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      userName: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      },
      phoneNo: {
        validators: {
          notEmpty: {
            message: '手机号不能为空'
          },
          regexp: {
            regexp: /^1\d{10}$/,
            message: '手机号格式不正确'
          },
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: '邮箱不能为空'
          },
          emailAddress: {
            message: '邮箱格式不正确'
          }
        }
      },
      identityNo: {
        validators: {
          notEmpty: {
            message: '身份证不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][1-9]|30|31)\d{3}[0-9Xx]$/,
            message: '身份证格式不正确'
          },
        }
      }
    }
  });

})

function initData() {
  $.post(apihost + '/front/user/info/get', JSON.stringify({
    body: {},
    "header": {
      "authentication": localStorage.token || '',
    }
  }), function (res) {
    if (res.header.code != "SUCCESS") {
      layer.msg(res.header.msg)
      // 错误码处理
      parsingErrorCode(res)
      return false
    }
    if(res.body.birthday){
      res.body.birthday = dateFormat("YYYY-mm-dd",res.body.birthday)
    }
    if(res.body.graduationTime){
      res.body.graduationTime = dateFormat("YYYY-mm-dd",res.body.graduationTime)
    }
    $('#form1').setform(res.body)
    $('#form2').setform(res.body)
  })
}

function updateInfo(data) {
  $.post(apihost + '/front/user/info/perfect', JSON.stringify({
    body: data,
    "header": {
      "authentication": localStorage.token || '',
    }
  }), function (res) {
    if (res.header.code != "SUCCESS") {
      layer.msg(res.header.msg)
      // 错误码处理
      parsingErrorCode(res)
      return false
    }
    layer.msg('更新成功');
  })
}