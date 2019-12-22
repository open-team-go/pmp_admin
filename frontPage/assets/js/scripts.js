
jQuery(document).ready(function () {

	var step = 1
	var apiHost = 'http://127.0.0.1:8080'

    /*
        Fullscreen background
    */
	$.backstretch("assets/img/backgrounds/1.jpg");

    /*
        Form
    */

	$('.date').datepicker({
		format: 'yyyy-mm-dd',
		language: 'zh-CN',
		autoclose: true,
		startView: 'years',
		todayBtn: true,
		todayHighlight: true,
		clearBtn: true,
		viewSelect: 'day'
	});

	$('.registration-form fieldset:first-child').fadeIn('slow');

	$('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function () {
		$(this).removeClass('input-error');
	});

	// next step
	$('.registration-form .btn-next').on('click', function () {
		var parent_fieldset = $(this).parents('fieldset');
		var next_step = true;

		parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function () {
			if ($(this).attr('required') && $(this).val() == "") {
				$(this).addClass('input-error');
				next_step = false;
			}
			else {
				$(this).removeClass('input-error');
			}
		});

		if (next_step) {
			step++
			parent_fieldset.fadeOut(400, function () {
				$(this).next().fadeIn();
			});
		}

	});

	// previous step
	$('.registration-form .btn-previous').on('click', function () {
		step--
		$(this).parents('fieldset').fadeOut(400, function () {
			$(this).prev().fadeIn();
		});
	});

	// submit
	$('.registration-form').on('submit', function (e) {
		e.preventDefault();
		var next_step = true;

		$(this).find('input[type="text"], input[type="password"], textarea').each(function () {
			if ($(this).attr('required') && $(this).val() == "") {
				$(this).addClass('input-error');
				next_step = false;
			}
			else {
				$(this).removeClass('input-error');
			}
		});

		if (next_step) {
			let jsonData = $(".registration-form").serializeObject()
			if (jsonData.birthday) {
				jsonData.birthday = new Date(jsonData.birthday).getTime() / 1000
			}
			if (jsonData.graduationTime) {
				jsonData.graduationTime = new Date(jsonData.graduationTime).getTime() / 1000
			}
			$.ajax({
				type: 'post',
				url: apiHost + '/front/user/register',
				contentType: 'application/json',
				data: JSON.stringify({
					body: jsonData,
					header: {}
				}),
				success: function (res) {
					if (res.header && res.header.code == "SUCCESS") {
						swal({
							title: "提交成功!",
							text: "恭喜您，感谢您的信任!",
							icon: "success",
							button: "确定",
						});
					} else {
						swal({
							title: "提交失败!",
							text: res.header.msg,
							icon: "error",
							button: "确定",
						});
					}
				}
			})
		}

	});
	initSerializeObject();
	getAdmin()
	getcourse()
	geteducation()

	function initSerializeObject() {
		$.fn.serializeObject = function () {
			var o = {};
			var a = this.serializeArray();
			$.each(a, function () {
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
			return o;
		};
	}

	function getAdmin() {
		$.ajax({
			type: 'post',
			url: apiHost + '/back/admin/search',
			contentType: 'application/json',
			data: JSON.stringify({
				body: {
					roleId: 4
				},
				header: {}
			}),
			success: function (res) {
				if (res.header && res.header.code == "SUCCESS") {
					if (res.body && res.body.length) {
						var html = res.body.map(function (item) {
							return '<option value="' + item.adminId + '">' + item.nickname + '</option>'
						}).join('')
						$('#adminId').html(html)
					}
				}
			}
		})
	}

	function getcourse() {
		$.ajax({
			type: 'post',
			url: apiHost + '/back/course/all',
			contentType: 'application/json',
			data: JSON.stringify({
				body: {},
				header: {}
			}),
			success: function (res) {
				if (res.header && res.header.code == "SUCCESS") {
					if (res.body && res.body.length) {
						var html = res.body.map(function (item) {
							return '<option value="' + item.courseId + '">' + item.courseName + '</option>'
						}).join('')
						$('#courseId').html(html)
					}
				}
			}
		})
	}

	function geteducation() {
		$.ajax({
			type: 'post',
			url: apiHost + '/back/user/education',
			contentType: 'application/json',
			data: JSON.stringify({
				body: {},
				header: {}
			}),
			success: function (res) {
				if (res.header && res.header.code == "SUCCESS") {
					if (res.body && res.body.length) {
						var html = res.body.map(function (item) {
							return '<option value="' + item.educationId + '">' + item.educationName + '</option>'
						}).join('')
						$('#educationId').html(html)
					}
				}
			}
		})
	}
});
