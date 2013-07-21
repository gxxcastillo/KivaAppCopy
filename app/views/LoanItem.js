// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: LoanItem
// ==========================================================================
m_require('app/views/BalanceHeader.js');
m_require('app/views/Tabs.js');
m_require('app/views/OtherLendersView.js');

KivaApp.LoanItem = M.PageView.design({
  
    events: {
        pageshow: {
            target: KivaApp.LoanItemController
            ,action: 'init'
        }
    }

/*
// Martin: Incorrectly configured
// @see: http://panacodalabs.github.com/The-M-Docs/#core_concepts/content_binding

    ,contentBinding: {
    	target: KivaApp.LoanItemController
    	,property: '<%= name %>'
    	, valuePattern: 'name'
    }
*/
	// Willow: Fixed - just needed to switch propety and valuePattern 
	// for backbutton, each page needs a name - each LoanItem page will have the name of the Borrower 
    ,contentBinding: {
    	target: KivaApp.LoanItemController
    	,property: 'name'
    	,valuePattern: '<%= name %>'
    }

	,childViews: 'header content footer'

	,cssClass: 'loan-item'
	
	//returning an instance of toolbar that will render each time the page is loaded :) 
	,header: M.ToolbarView.design(KivaApp.BalanceHeader.getHeader())
	
	,content: M.ScrollView.design({
		
		childViews: 'image_lend_grid borrower_name use grid_container about loan_lenders_label loan_lenders'
		,image_lend_grid: M.GridView.design({
			
			layout: M.TWO_COLUMNS
			
			,childViews: 'image lend'

			,image: M.ContainerView.design({
			
				childViews: 'borrower_photo'
			
				,borrower_photo: M.ImageView.design({
			
					cssClass: 'kv_photo_big'
			
					,contentBinding: {
			
						target: KivaApp.LoanItemController
						,property: 'image_url'
						,valuePattern: '<%= image_url %>'
					}
				})
				
			})
			
			,lend: M.ContainerView.design({
				childViews: 'select_box message lend_button'

				, select_box: M.ContainerView.design({
					childViews: 'select_amount'
					,select_amount: M.SelectionListView.design({
        				
						selectionMode: M.SINGLE_SELECTION_DIALOG
						,childViews: 'twentyfive fifty seventyfive onehundred'
						
						,twentyfive: M.SelectionListItemView.design({
							value: '25'
							,label: '$25'
							,isSelected: YES
						})
						
						,fifty: M.SelectionListItemView.design({
							value: '50'
							,label: '$50'
						})
						
						,seventyfive: M.SelectionListItemView.design({
							value: '75'
							,label: '$75'
						})
						
						,onehundred: M.SelectionListItemView.design({
							value: '100'
							,label: '$100'
						})
					})
				})
				
				,message: M.LabelView.design({
					contentBinding: {
						target: KivaApp.LoanItemController
						, property: 'message'
						, valuePattern: 'message'
					}
				})

				,lend_button: KivaApp.LendButtonView 
				
			})

			
		})
		,borrower_name: M.LabelView.design({
		    	
    		cssClass: 'kv_name'
    		,contentBinding: {
    			target: KivaApp.LoanItemController
    			,property: 'name'
    			,valuePattern: '<%= name %>'
    		}
		})
		
		,use: M.LabelView.design({
			cssClass: 'kv_ital'
			,contentBinding: {
				target: KivaApp.LoanItemController
				,property: 'use'
				,valuePattern: '<%= use %>'
			}
		})	

		,grid_container: M.ContainerView.design({

			childViews: 'location_grid activity_grid status_grid loan_amount_grid amount_funded_grid'
	    	,cssClass: 'kv_grid'
			,location_grid: M.GridView.design({
				layout: M.TWO_COLUMNS
				,childViews: 'location_label location'
				,location_label: M.LabelView.design({
					value: 'Country: '
				})
				,location: M.LabelView.design({
					contentBinding: {
		    			target: KivaApp.LoanItemController
		    			,property: 'country'
		    			,valuePattern:'<%= country %>'
		    		}
				
					,cssClass: 'listText'
		    	})
			})
			
			,activity_grid: M.GridView.design({
				layout: M.TWO_COLUMNS
				,childViews: 'activity_label activity'
				,activity_label: M.LabelView.design({
					value: 'Business Type: '
				})
				
				,activity: M.LabelView.design({
		    		contentBinding: {
		    			target:KivaApp.LoanItemController
		    			,property:'activity'
		    			,valuePattern:'<%= activity %>'
		    		}
		    	})
			})
			
			,status_grid: M.GridView.design({
				layout: M.TWO_COLUMNS
				,childViews: 'status_label status'
				,status_label: M.LabelView.design({
					value: 'Loan Status: '
				})
				,status: M.LabelView.design({
		    		contentBinding: {
		    			target: KivaApp.LoanItemController
		    			,property: 'status'
		    			,valuePattern: '<%= status %>'
		    		}
		    	})
			})
			
			,loan_amount_grid: M.GridView.design({
				layout: M.TWO_COLUMNS
				,childViews: 'loan_amount_label loan_amount'
				,loan_amount_label: M.LabelView.design({
					value: 'Loan Amount: '
				})
				,loan_amount: M.LabelView.design({
		    	    contentBinding: {
		    			target: KivaApp.LoanItemController
		    			,property: 'loan_amount'
		    	    	,valuePattern: '<%= loan_amount %>'	
		    	    }
		    	    
					,cssClass: 'listText'
		    	})	
			})
			
			,amount_funded_grid: M.GridView.design({
				layout: M.TWO_COLUMNS
				,childViews: 'amount_funded_label amount_funded'
				,amount_funded_label: M.LabelView.design({
					value: 'Amount Funded'
				})
				,amount_funded: M.LabelView.design({
					contentBinding: {
						target: KivaApp.LoanItemController
						,property: 'funded_amt'
						,valuePattern: '<%= funded_amt %>'
					}
				})
			})
		})
		
		,about: M.ContainerView.design({
			childViews: 'about_label about_text'
			,about_label: M.LabelView.design({
				cssClass: 'kv_label'
				,contentBinding: {
					target: KivaApp.LoanItemController
					,property: 'about_label'
					,valuePattern: '<%= about_label %>'
				}
			})
			,about_text: M.LabelView.design({
				contentBinding: {
					target: KivaApp.LoanItemController
					,property: 'about_text'
					,valuePattern: '<%= about_text %>'
				}
			})
		})
		
		,loan_lenders_label: M.LabelView.design({
			cssClass: 'kv_label'
			,value: 'Other Lenders: '
		})
		,loan_lenders: M.ListView.design({
			listItemTemplateView: KivaApp.OtherLendersView
			,contentBinding: {
				target: KivaApp.LoanItemController
				,property: 'loan_lenders'
			}
		})
	})
	
	,footer: KivaApp.Tabs
});

