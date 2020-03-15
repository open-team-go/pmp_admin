$(function(){
  initData();  
})

function initData(){
  $.post(apihost+'/front/user/course',JSON.stringify({
    body:{},
    "header": {
      "authentication": localStorage.token || '',
    }
  }),function(res){
    if(res.header.code!="SUCCESS"){
      layer.msg(res.header.msg)
      return false
    }
    console.log(res)
    var html = ''
    html = res.body.map(function(item){
      return '<tr>\
      <td>'+item.courseName+'</td>\
      <td>'+item.roomName+'</td>\
      <td>'+item.educationAdminName+'</td>\
      <td>'+item.salesAdminName+'</td>\
      <td>'+item.applyUrl+'</td>\
      <td>\
        <a href="/course?id='+item.userRefCourseId+'" class="btn btn-success btn-xs detail">详情</a>\
        <a href="/pages/apply/index.html?id='+item.userRefCourseId+'" class="btn btn-primary btn-xs report">报名</a>\
      </td>\
    </tr>'
    })
    $('.table').append(html)
  })
}