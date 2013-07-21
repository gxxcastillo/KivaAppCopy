// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp 
// ==========================================================================

var KivaApp  = KivaApp || {};

KivaApp.app = M.Application.design({

	entryPage : 'login'

	,login : KivaApp.Login

	,loansPage : KivaApp.LoansPage
	
	,inviteFriendsPage : KivaApp.InviteFriendsPage
		
	,settingsPage : KivaApp.SettingsPage
	
	,loanItem: KivaApp.LoanItem
	
	,header: KivaApp.BalanceHeader

	,portfolioLoansPage: KivaApp.PortfolioLoansPage

	,filterPage: KivaApp.FilterPage 

	,kivaWebView: KivaApp.KivaWebView

	,lendButton: KivaApp.LendButtonView

	,kivaConnectWebView: KivaApp.KivaConnectWebView
   
});

// Load analytics libraries
$(document).ready(function() {
	var intervalID = window.setTimeout(function() {
		
		if (kv.phoneGap.localStorage.aes.getItem('analytics_opt_in')) {
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
			ga('create', 'UA-175897-18', 'kiva.org');
			ga('send', 'pageview');
		
			if (M.Application.getConfig('environment') == 'prod') {
				(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
				 typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
				 b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
				mixpanel.init("b8e55bcf326863e5ed1cf7c318eac71d");
			} else {
				(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
				 typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
				 b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
				mixpanel.init("ef11776f0e2ecdfc7f64b4dc3e3bf84b");
			}
		}
	}, 1000);
});
