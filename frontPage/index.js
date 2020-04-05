$(function () {
  initData();
  $('#myModal .save').on('click', function () {
    $('#myModal').modal('hide')
    var data = $('#course').getform();
    AddCourse(data)
  })
})

function AddCourse(body) {
  $.post(apihost + '/front/user/course/add', JSON.stringify({
    body: body,
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
    location.reload()
  })
}

function confirmDelCourse(courseId){
  if(!window.confirm("确认删除选课")){
    return
  }
  $.post(apihost + '/front/user/course/del', JSON.stringify({
    body: {id:courseId},
    "header": {
      "authentication": localStorage.token || '',
    }
  }), function (res) {
    if (res.header.code == "SUCCESS") {
      layer.msg("删除成功")
      location.reload()
    }else{
      // 错误码处理
      parsingErrorCode(res)
    }
  })
}

function initData() {
  $.post(apihost + '/front/user/course', JSON.stringify({
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

    var html = ''
    html = res.body.map(function (item) {
      var applyUrl = item.applyUrl ? (staticHost + item.applyUrl + "?id=" + item.userRefCourseId) : "";
      return '<tr>\
      <td>' + item.courseName + '</td>\
      <td>' + (item.roomName || '--') + '</td>\
      <td>' + (item.educationAdminName || '--') + '</td>\
      <td>' + (item.salesAdminName || '--') + '</td>\
      <td>' + (applyUrl?('<a href="' + applyUrl + '" class="btn btn-primary btn-xs report">报名</a>'):'')+
              (item.roomName?'':('<a href="javascript:void(0)" onclick="confirmDelCourse('+item.courseId+')" class="btn btn-primary btn-xs report">删除</a>'))
      '</td>\
    </tr>'  
    })
    $('.table').append(html)
  })
//        <a href="javascript:void(0)" class="btn btn-success btn-xs detail">详情</a>\
  $.post(apihost + '/front/user/course/select', JSON.stringify({
    body: {},
    "header": {
      "authentication": localStorage.token || '',
    }
  }), function (res) {
    if (res.header.code == "SUCCESS") {
      var data = res.body
      var html = data.map(function (item) {
        return `<option value="${item.courseId}">${item.courseName}</option>`
      }).join('')
      $('#myModal').find('select[name=id]').html(html)
    }else{
      // 错误码处理
      parsingErrorCode(res)
    }
  })

  $.post(apihost + '/front/user/admin/select', JSON.stringify({
    body: {},
    "header": {
      "authentication": localStorage.token || '',
    }
  }), function (res) {
    if (res.header.code == "SUCCESS") {
      var data = res.body
      var html = data.map(function (item) {
        return `<option value="${item.adminId}">${item.nickname}</option>`
      }).join('')
      $('#myModal').find('select[name=adminId]').html(html)
    }else{
      // 错误码处理
      parsingErrorCode(res)
    }
  })

}

