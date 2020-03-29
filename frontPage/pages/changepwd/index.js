$(function () {

  $('#submit').on('click', function () {
    var bootstrapValidator = $("#changePwd").data('bootstrapValidator');
    bootstrapValidator.validate();
    if (!bootstrapValidator.isValid()) return;
    var body = $('#changePwd').getform();
    updateInfo(body)
  })

  $('#changePwd').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      oldPassword: {
        validators: {
          notEmpty: {
            message: '当前密码不能为空'
          },
        }
      },
      newPassword: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          different: {
            field: 'oldPassword',
            message: '不能和当前密码相同'
          },
          stringLength: {
            min: 6,
            max: 16,
            message: '密码长度6-16位'
          },
        }
      },
      confirmPassword: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          identical: {
            field: 'newPassword',
            message: '密码不一致'
          },
          different: {
            field: 'oldPassword',
            message: '不能和当前密码相同'
          }
        }
      },
    }
  });

})

function updateInfo(data) {
  $.post(apihost + '/front/user/password/login', JSON.stringify({
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
    location.href = "/pages/login/index.html"
  })
}