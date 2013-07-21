// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: Tabs
// ==========================================================================

//need to set the active tab to null when navigate away from one of the tabs
// can probably do this on those pages...
// anything not on this page

KivaApp.Tabs = M.TabBarView.design({


	childViews: 'lendTab portfolioTab inviteTab settingsTab'
	,transition: M.TRANSITION.NONE
	,anchorLocation: M.BOTTOM
	
	,lendTab: M.TabBarItemView.design({
		value: 'Lend'
		,page: 'loansPage'
		,isActive: YES
	})
	
	,portfolioTab: M.TabBarItemView.design({
		value: 'Portfolio'
		,page: 'portfolioLoansPage'
	})
	
	,inviteTab: M.TabBarItemView.design({
		value: 'Invite'
		,page: 'inviteFriendsPage'
	})
	
	,settingsTab: M.TabBarItemView.design({
		value: 'Settings'
		,page: 'settingsPage'
	})

});


