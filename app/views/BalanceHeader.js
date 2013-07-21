// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: BalanceHeader
// ==========================================================================

//Having problems with this rendering multiple times when used in multiple pages *fixes 3/11*

//To-do: either edit toolbar.js or create a custom view that renders correctly
//FIXED in the-m-project files

KivaApp.BalanceHeader = {
	getHeader: function() {
		KivaApp.SettingsController.getBalance();

		return {
			
			anchorLocation: M.TOP
			,cssClass: 'header'
			,childViews: 'back logo loan_info_box'
			
			,back: M.ButtonView.design({
				cssClass: 'back-button'
			   	,events: {
					tap: {
						target: KivaApp.FlowController
						,action: 'pageBack'
			
					}
				}

				,anchorLocation: M.LEFT

				,contentBinding: {
					target: KivaApp.FlowController
					,property: 'back_button_text'
					,valuePattern: '<%= back_button_text %>'
				}

				//,icon: 'arrow-l' //temporary until styling is done for back button
			}) 
			
			,logo: M.ImageView.design({
				anchorLocation: M.CENTER
				,value: 'theme/images/KIVA_LOGO_WHITE.png'
				,cssClass: 'kv_logo'
			})

			,loan_info_box: M.ContainerView.design({
				anchorLocation: M.RIGHT
				,cssClass: 'loan-info-box'
				,childViews: 'balance basket'
				,balance: M.LabelView.design({
					contentBinding: {
						target: KivaApp.SettingsController
						,property: 'balance'
						,valuePattern: '<%= balance %>'	
					}
				})
				//Updated basket button to have the number of loans showing 
				//instead of having a label and a button
				,basket: M.ButtonView.design({
					computedValue: {
						contentBinding: {
							target: KivaApp.LoanItemController
							,property: 'basket_num'
							,valuePattern: '<%= basket_num %>'
						}
						,operation: function(basket_num) {
							var to_return = basket_num !=null ? 'Basket: ' + basket_num : 'Basket: ' + 0;
							to_return = basket_num == 1 ? to_return + ' loan' : to_return +' loans' 
							return to_return;
						}
					}

					,events: {
						tap: {
							target: KivaApp.LoanItemController 
							,action: 'checkOut'
						}
					}
				}) 
			})
			
		};
	}
}
