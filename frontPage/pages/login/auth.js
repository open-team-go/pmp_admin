var Auth = {
	vars: {
		lowin: document.querySelector('.lowin'),
		lowin_wrapper: document.querySelector('.lowin-wrapper'),
		lowin_login: document.querySelector('.lowin-login'),
		lowin_wrapper_height: 0,
		login_btn: document.querySelector('.login-btn'),
		password_group: document.querySelector('.password-group'),
		password_group_height: 0,
		box: document.getElementsByClassName('lowin-box'),
		option: {}
	},
	setHeight(height) {
		Auth.vars.lowin_wrapper.style.minHeight = height + 'px';
	},
	init(option) {
		Auth.setHeight(Auth.vars.box[0].offsetHeight);

		Auth.vars.password_group.style.height = Auth.vars.password_group.offsetHeight + 'px';
		Auth.vars.password_group_height = Auth.vars.password_group.offsetHeight;
		Auth.vars.lowin_wrapper_height = Auth.vars.lowin_wrapper.offsetHeight;

		Auth.vars.option = option;

		Auth.vars.login_btn.addEventListener("click", function(e) {
			e.preventDefault();
			Auth.login(e);
		});

	},
	login(e) {
		var data = $('#login').getform();
		$.post(apihost+'/front/user/login',JSON.stringify({
			"body":data,
			"header":{}
		}),function(res){
			if(res.header.code!=='SUCCESS'){
				layer.msg(res.header.msg)
				return false
			}
			localStorage.token = res.body
			window.location.replace(staticHost+'/index.html')
		})
	},
}