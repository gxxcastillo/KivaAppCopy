// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: LendButtonView
// ==========================================================================

KivaApp.LendButtonView = M.ContainerView.design({ 
	
	childViews: 'lend'
	,lend: M.ButtonView.design({
	
		cssClass: 'kv_call'
	
		,contentBinding: {
	
			target: KivaApp.LoanItemController
			,property: 'lend'
			,valuePattern: '<%= lend %>'	
		}
		
		,events: {
			tap: {
				target: KivaApp.LoanItemController
				,action: 'addToBasket'
			}
		}
	})

});

