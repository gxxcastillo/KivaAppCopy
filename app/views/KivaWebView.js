// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: KivaWebView
// ==========================================================================
m_require('app/views/BalanceHeader.js');
m_require('app/views/Tabs.js');

KivaApp.KivaWebView = M.PageView.design({


	childViews: 'header content footer'
	,value: 'Kiva Web'

	//returning an instance of toolbar that will render each time the page is loaded :) 
	,header: M.ToolbarView.design(KivaApp.BalanceHeader.getHeader())
	
	,content: M.ScrollView.design({
		childViews: 'container',
		container: M.ContainerView.design({
			childViews: 'webview'
			,cssClass: 'container'
			,webview: M.WebView.design({
				cssClass: 'KivaWebView'
   				
				,events: {
					load: {
						target: KivaApp.KivaWebController
						,action: 'gotoCheckout'
					}
				}
			}) 
		}) 
	})

	,footer: KivaApp.Tabs
});

