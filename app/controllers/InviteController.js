// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: InviteController
// ==========================================================================

KivaApp.InviteController = M.Controller.extend({
	contacts: null
	,contacts_names: null
	,sms_message:''

	,init: function() {

		onDeviceReady();
		var current_page = [M.ViewManager.currentPage, KivaApp.Tabs.inviteTab]
		KivaApp.FlowController.buildStack(current_page);
		this.set('sms_message', 'Join ' + kv.phoneGap.localStorage.aes.getItem('user_account.first_name') + ' as a Kiva lender!');
	
	}
	
	,sendRequestFB: function(){
		FB.ui({
			method: 'apprequests'
			,message: 'invites you to lend with Kiva'
		}
		
		,function(response){
			console.log('sendRequest response', response)
		});	
	}

	,contactSelect: function(selections){
		console.log(selections);

	}

	,sendSMS: function(){
		//first check to see if there is a contact selected
		//then communicate with phone to send contact
		var selections = M.ViewManager.getView('inviteFriendsPage', 'contacts').getSelection(YES);
		var message = M.ViewManager.getView('inviteFriendsPage', 'kiva_message').value;
		console.log(message);
		console.log(selections);

		for(var j in selections){
			for(var i in this.contacts){
				if(selections[j].value === this.contacts[i].displayName){
					console.log(selections[j].value);
					/*window.plugins.sms.send(selections[j].value, message, function(){
						console.log("message sent successfully");
					}, function(e){
						alert("Messsage failed: " + e)
					} );*/  // this is for Android only - for sms 
				}
			}	
		}

		
	}



});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
	// below is for development
	console.log("**********!!!!!!!*********");
	var options = ContactFindOptions();
	options.filter = "";
	options.multiple=true;
	var fields = ["*"];
	navigator.contacts.find(fields, onSuccess, onError, options);
	console.log(options);

	function onSuccess(contacts){
		KivaApp.InviteController.set('contacts', contacts);
		console.log(contacts);
		var contacts_names = [];
		var i;
		for(i=0; i<contacts.length; i++ ){
			var val = contacts[i].displayName;
			contacts_names.push({value: val});
		}
		console.log(contacts_names);	
		KivaApp.InviteController.set('contacts_names', contacts_names);	
	}
	function onError(contactError){
		alert('onError!');
	}

	// this method is for testing only
	function getContacts(){
		var conts = [
			{displayName: "Test User", phoneNumber: "1234567890"}
			,{displayName: "Joe User", phoneNumber: "1234567891"}
			,{displayName: "Jane User", phoneNumber: "1234567892"}
			,{displayName: "Roberta User", phoneNumber: "1234567893"}
		];
		var contacts = [], contact;
		for(var i in conts){
			console.log(conts[i]);
			contact = navigator.contacts.create(conts[i]);
			contacts.push(contact);
		}
		console.log(contacts);
	}
}

window.fbAsyncInit = function() {
	
	console.log('FB ASync Init');
	
	// init the FB JS SDK
	FB.init({
		appId      : '362418237189698', // App ID from the App Dashboard
		channelUrl : '//www.kiva.org/fb_channel.php', // Channel File for x-domain communication
		status     : true, // check the login status upon init?
		cookie     : true, // set sessions cookies to allow your server to access the session?
		xfbml      : true  // parse XFBML tags on this page?
	});

	FB.Event.subscribe('auth.statusChange', 'handleStatusChange');
	// Additional initialization code such as adding Event Listeners goes here
};

// Load the SDK's source Asynchronously
// Note that the debug version is being actively developed and might 
// contain some type checks that are overly strict. 
// Please report such bugs using the bugs tool.
(function(d, debug){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
	ref.parentNode.insertBefore(js, ref);
 }(document, false));


(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=362418237189698";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




