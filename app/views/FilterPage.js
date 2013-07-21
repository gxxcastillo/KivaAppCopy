// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: FilterPage
// ==========================================================================
//view added 2-22-13

m_require('app/views/BalanceHeader.js');
m_require('app/views/Tabs.js');

KivaApp.FilterPage = M.PageView.design({

	events: {
		pageshow: {
			target: KivaApp.FilterController
			,action: 'init'
		}
	}
	,childViews: 'header content footer'    
	,cssClass: 'filter_page'

	//returning an instance of toolbar that will render each time the page is loaded :) 
	,header: M.ToolbarView.design(KivaApp.BalanceHeader.getHeader())
	

	,content: M.ScrollView.design({
		   
		childViews: 'search_button choices_grid'
		//this will be used to send the options selected to the controller and will redirect
		// to loans page filtered by the following options
		,search_button: M.ButtonView.design({
			value: 'Search'
			,cssClass: 'kv_button'
			,events: {
				tap : {
				   target: KivaApp.FilterController
				   ,action: 'getSelection'
				}
			}
		})

		// two-column grid to show the four different selection options
		,choices_grid: M.GridView.design({
   
			layout: M.TWO_COLUMNS
			,cssClass: 'filter-choices'
			//each column that will be used to hold the seleciotn options
			,childViews: 'left right'
		   
			,left: M.ContainerView.design({
				childViews: 'status region'

				//selectionlist allows for multiple options/ 
				// instead of having this immediately on page, could open up separate dialog
				// that allows multiple choices... either case the filter is kind of messy
				,status: M.SelectionListView.design({

					events: {
						change: {
							//placeholder function that just shows the selections made from the checklist
							action: function(itemValues, items){
								for(var i=0; i<itemValues.length; i++){
									console.log(itemValues[i] + 'selected.');
								}
							}
						}
					}
					// so multiple choices can be made
					,selectionMode: M.MULTIPLE_SELECTION
					//title of this section
					,label: 'Loan Status'
					// teh actual list of status items are gotten from teh controller
					,contentBinding: {
						target: KivaApp.FilterController
						,property: 'status_items'
					}
					
				})
				//more or less identical to option above
				,region: M.SelectionListView.design({
					events: {
						change: {
							//placeholder function
							action: function(itemValues, items){
								for(var i=0; i<itemValues.length; i++){
									console.log(itemValues[i] + 'selected.');
								}
							}
						}
					}
					,selectionMode: M.MULTIPLE_SELECTION
					,label: 'Borrower Region'
					, contentBinding: {
						target: KivaApp.FilterController
						,property: 'region_items'
					}

				})
			})
			//second column
			,right: M.ContainerView.design({
				childViews: 'gender sector'
				
				//gender currently handled diffrently from other otpins as there are only two optins
				//will change to match others
				,gender: M.SelectionListView.design({
					events: {
						change: {
							action: function(itemValues, items){
								for(var i=0; i<itemValues.length; i++){
									console.log(itemValues[i] + 'selected.');
								}
							}
						}
					}
						
					,label: 'Gender'
					,selectionMode: M.MULTIPLE_SELECTION
					,contentBinding: {
						target: KivaApp.FilterController
						,property: 'gender_items'
					}

				})
				
				,sector: M.SelectionListView.design({
					events: {
						change: {
							action: function(itemValues, items){
								for(var i=0; i<itemValues.length; i++){
									console.log(itemValues[i] + 'selected.');
								}
							}
						}
					}
					,selectionMode: M.MULTIPLE_SELECTION
					,label: 'Type of Business'
					,contentBinding: {
						target: KivaApp.FilterController
						,property: 'sector_items'
					}

				})
			})
		   
		})

		
	})
	,footer: KivaApp.Tabs
});

