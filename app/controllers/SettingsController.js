// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: SettingsController
// ==========================================================================

KivaApp.SettingsController = M.Controller.extend({

	message:''
	,balance:''
	,init: function() {

	//	KivaApp.Tabs.activeTab =  NO;
	//	KivaApp.Tabs.settingsTab.isActive = YES;

		var current_page = [M.ViewManager.currentPage, KivaApp.Tabs.settingsTab]
		KivaApp.FlowController.buildStack(current_page);

		var get_message = kv.phoneGap.localStorage.aes.getItem('login_message');  
		KivaApp.SettingsController.set('message', get_message);

		var lender_id = kv.phoneGap.localStorage.aes.getItem('user_account.lender_id');
		KivaApp.SettingsController.set('lender_id', lender_id);

		M.ViewManager.getView('settingsPage', 'analytics_opt_in_button').setValue(kv.phoneGap.localStorage.aes.getItem('analytics_opt_in'));
	}
	 
	,getID: function() {
		var form = M.ViewManager.getView('settingsPage', 'form');
		var lender_id;
  		//if(form.validate()) {
			var values = form.getValues();
		//	console.log(values['lender_ID']);
			var n = kv.phoneGap.localStorage.aes.setItem('user_account.lender_id', values['lender_id']);
			
		//}
		
	}

	,connect: function(){
		kv.oauth.fetchRequestToken(function(data) {
			kv.phoneGap.localStorage.aes.setItem('oauth.request_token.token', data.oauth_token);
			kv.phoneGap.localStorage.aes.setItem('oauth.request_token.token_secret', data.oauth_token_secret);

			$('#'+KivaApp.KivaWebView.content.container.webview.id).html('<iframe id="kv_webview" style="border: 0; width: 100%; height: 100%;" src="'+kv.oauth.authorizeUrl+'&oauth_token='+data.oauth_token+'&display=mobile&hasHeader=false&scope=user_balance,user_email,user_loan_balances,user_anon_lender_loans,user_anon_lender_teams,user_basket_edit,user_basket_list,user_basket_checkout"/>');
				var current_page = ['kivaWebView', KivaApp.Tabs.lendTab];
				KivaApp.FlowController.buildStack(current_page);
				KivaApp.SettingsController.switchToPage('kivaWebView');
		});
	}

	,connectCallback: function(oauth_verifier){
		var accountUrl = 'https://api.kivaws.org/v1/my/account.json';

		var oauth_token = kv.phoneGap.localStorage.aes.getItem('oauth.request_token.token');
		var oauth_token_secret = kv.phoneGap.localStorage.aes.getItem('oauth.request_token.token_secret');

		kv.oauth.fetchAccessToken(oauth_token, oauth_token_secret, oauth_verifier, function(data) {
			kv.phoneGap.localStorage.aes.setItem('oauth.access_token.token', data.oauth_token);
			kv.phoneGap.localStorage.aes.setItem('oauth.access_token.token_secret', data.oauth_token_secret);
			kv.oauth.fetchResource(accountUrl, data.oauth_token, data.oauth_token_secret, function(data) {
				alert('Hello '+data.user_account.first_name+' '+data.user_account.last_name);
				kv.phoneGap.localStorage.aes.setItem('user_account.lender_id', data.user_account.lender_id);
				kv.phoneGap.localStorage.aes.setItem('user_account.first_name', data.user_account.first_name);
				kv.phoneGap.localStorage.aes.setItem('user_account.last_name', data.user_account.last_name);
							KivaApp.FlowController.popStack();
				KivaApp.SettingsController.switchToPage('kivaConnectWebView'); 
				// make a switch to page for a mostly empty page like the login page

				
			});
		});
	}
	
	,sendUsage: function(analytics_opt_in) {
		analytics_opt_in = M.ViewManager.getView('settingsPage', 'analytics_opt_in_button').getValue();
		kv.phoneGap.localStorage.aes.setItem('analytics_opt_in', analytics_opt_in);
	}
	,savePin: function(){
		var pin_pattern = /[abc0-9]+/i;
		var message = '';
		var enter_pin = M.ViewManager.getView('settingsPage', 'enter_pin').value;
		var confirm_pin = M.ViewManager.getView('settingsPage', 'confirm_pin').value;
		console.log(enter_pin );
		if(enter_pin === confirm_pin){
			var regex = pin_pattern.exec(enter_pin).input;
			if(enter_pin.length === 4 && regex.length === 4) {
				message = 'Your PIN is saved';
				kv.phoneGap.localStorage.aes.setItem('login_enabled', 'true');
				console.log(kv.phoneGap.localStorage.aes.getItem('login_enabled').value);
				kv.phoneGap.localStorage.aes.setItem('login', enter_pin);
			} else {
				message = 'Please enter a four-digit PIN with only numbers and letters';
			}
		} else {
			message = 'PINs do not match - please try again.'
		}
		M.ViewManager.getView('settingsPage', 'message').setValue(message);
	}
	,changeLoginVisibility: function(){
		var show_login = M.ViewManager.getView('settingsPage', 'show_pin_info').getValue();
		if(show_login === '1'){
			M.ViewManager.currentPage.content.login_pin_container.setCssProperty('visibility', 'visible');
			kv.phoneGap.localStorage.aes.setItem('login_enabled', 'true');
			console.log(show_login);
		} else if (show_login === '0'){
			M.ViewManager.currentPage.content.login_pin_container.setCssProperty('visibility', 'hidden');
			kv.phoneGap.localStorage.aes.setItem('login_enabled', 'false')
		}
	}
	,getBalance: function() {
		if (oauth_token = kv.phoneGap.localStorage.aes.getItem('oauth.access_token.token')) {
			var oauth_token_secret = kv.phoneGap.localStorage.aes.getItem('oauth.access_token.token_secret');
			var balanceUrl = 'https://api.kivaws.org/v1/my/balance.json';
			kv.oauth.fetchResource(balanceUrl, oauth_token, oauth_token_secret, function(data) {
				KivaApp.SettingsController.set('balance', "Account: $"+data.user_balance.balance);
			});
		} else {
			KivaApp.SettingsController.set('balance', '');
		}
	}
});


