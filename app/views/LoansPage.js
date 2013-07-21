// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: LoansPage
// ==========================================================================
m_require('app/views/BalanceHeader.js');
m_require('app/views/Tabs.js');
m_require('app/views/ListViewTemplate.js');

KivaApp.LoansPage = M.PageView.design({

events: {
	pageshow: {
		target: KivaApp.LoansListController
			,action: 'init'
		}
	}

	,value: 'Loans'

	,childViews: 'header content footer'
		
	//returning an instance of toolbar that will render each time the page is loaded :) 
	,header: M.ToolbarView.design(KivaApp.BalanceHeader.getHeader())

			
	,content: M.ScrollView.design({
		childViews: "filter loans"
			
		,filter: M.ButtonView.design({
			anchorLocation:M.CENTER
			,cssClass: 'kv_button'
			,value: 'Filter Loans'
			,events : {
				tap : {
					target: KivaApp.LoansListController
					,action: 'goToFilter'
				}
			}
		})
			
		,loans: M.ListView.design({
			
			listItemTemplateView: KivaApp.ListViewTemplate
				
			,contentBinding: {
				target: KivaApp.LoansListController
				,property: 'loans_list'
			}	
		}) 	
	})
	,footer: KivaApp.Tabs
});

