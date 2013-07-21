// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: PortfolioLoansPage
// ==========================================================================
//This is actually a new page identical to PastLoansPage, which is no longer in use
// Also used instead of PortfolioPage 

m_require('app/views/ListViewTemplate.js');
m_require('app/views/BalanceHeader.js');
m_require('app/views/Tabs.js');

KivaApp.PortfolioLoansPage = M.PageView.design({
	
	events: {
		pageshow: {
			target: KivaApp.PortfolioController
			,action: 'init'
		}
	}

	,childViews: 'header content footer'
	
	,value: 'Portfolio'
	
	//returning an instance of toolbar that will render each time the page is loaded :) 
	,header: M.ToolbarView.design(KivaApp.BalanceHeader.getHeader())
		
	,content: M.ContainerView.design({
	
		childViews: 'past_loans_label past_loans'
		
		,past_loans_label: M.LabelView.design({
			cssClass: 'kv_label'
			,value: 'Past Loans: '
		})

		,past_loans: M.ListView.design({
			listItemTemplateView: KivaApp.PortfolioListTemplate
			,contentBinding: {
				target: KivaApp.PortfolioController
				,property: 'all_loans'
			}   
		})
	})
	
	,footer: KivaApp.Tabs
});

