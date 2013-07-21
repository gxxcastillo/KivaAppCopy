// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: LoginController
// ==========================================================================

KivaApp.LoginController = M.Controller.extend({

	message: ''

	,init: function(isFirstLoad) {
		if (!location.href.match(/\?pin_override/i)) {
			if(kv.phoneGap.localStorage.aes.getItem('login_enabled') === 'true'){
				if(isFirstLoad) {
					var message = '';
					if(kv.phoneGap.localStorage.aes.getItem('login')!=undefined) {
						message = "Welcome back";
						if (first_name = kv.phoneGap.localStorage.aes.getItem('user_account.first_name')) {
							message += ' '+first_name;
						}
					//	M.ViewManager.getView('login', 'pin').setValue(kv.phoneGap.localStorage.aes.getItem('user_account.lender_id'));
					} else {
						message = "Please enter your four-digit pass code"
					}
					M.ViewManager.getView('login', 'message').setValue(message);
					this.message = message;
				} else {
					this.switchToPage('loansPage');
				}
			} else {
				this.switchToPage('loansPage');
			}
		} else {
			this.switchToPage('loansPage');
		}
	}
	,goToLoans: function(){
		if(this.validatesPin()){
			this.switchToPage('loansPage');
		} else {
			M.ViewManager.getView('login', 'message').setValue('Please try again');
		}
		
	}
	,validatesPin: function(){
		if(M.ViewManager.getView('login', 'pin').value === kv.phoneGap.localStorage.aes.getItem('login')) {
			console.log(M.ViewManager.getView('login', 'pin').value);
			return true;
		}
		return false;
	}


});
