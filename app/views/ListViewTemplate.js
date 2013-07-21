// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: ListViewTemplate
// ==========================================================================
//Used for layout of loans list
KivaApp.ListViewTemplate = M.ListItemView.design({

	// tap event that takes use to Loan Item page for selected Borrower
	events: {
		tap: {
			target: KivaApp.LoansListController
			,action: 'listObjectClicked'
		}
	}

	,cssClass: 'kv-list'

	,childViews: 'photo'
	
	,photo: M.GridView.design({
		
		layout: M.TWO_COLUMNS

		,childViews: 'left_col right_col'
		,left_col: M.ContainerView.design({
			childViews: 'img'
			,img: M.ImageView.design({
	
				cssClass: 'kv_photo'
			
				,computedValue: {

					valuePattern: '<%= image %>'
					,operation: function(image) {
						return 'http://www.kiva.org/img/w80h80/'  + image.id + '.jpg';
					}
				}
			})
			
		})
		,right_col: M.ContainerView.design({
			childViews: 'name location use loan_amount'

			,name: M.LabelView.design({
	
				cssClass: 'kv_name'
				,valuePattern: '<%= name %>'       
			
			})
			
			,location: M.LabelView.design({
			
				computedValue: {

					valuePattern: '<%= location %>'
					,operation: function(location) { 
						return location.country; 
					} 	
				}
			})

			,use: M.LabelView.design({
				
				cssClass: 'kv_ital'
				,valuePattern: '<%= use %>'
			
			})
			
			,loan_amount: M.LabelView.design({
				computedValue: {
					valuePattern: '<%= loan_amount %>'
					,operation: function(loan_amount){
						return KivaApp.LoanItemController.formatMoney(loan_amount);
					}
				}	
			})
		})
		
	})
});

