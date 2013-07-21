// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: SettingsPage
// ==========================================================================
//need to get the lender id here
//store it using phonegap

m_require('app/views/BalanceHeader.js');
m_require('app/views/Tabs.js');

KivaApp.SettingsPage = M.PageView.design({

	events: {
		pageshow: {
			target: KivaApp.SettingsController
			,action: 'init'
		}
	}
		
	,cssClass: 'SettingsPage'

	,childViews: 'header content footer'
		
	//returning an instance of toolbar that will render each time the page is loaded :) 
	,header: M.ToolbarView.design(KivaApp.BalanceHeader.getHeader())
	
	,value: 'Settings'
		
	,content: M.ScrollView.design({
				
		childViews: 'message form connect_button analytics_opt_in_container show_pin_info login_pin_container'
		,message: M.LabelView.design({
			contentBinding: {
				target: KivaApp.SettingsController								
				,property: 'message'
				,valuePattern: '<%= message %>'
			}
		})
				
/*		,form: M.FormView.design({
					
			childViews: 'lender_id'
			,lender_id: M.TextFieldView.design({
				label: 'Please enter your lender ID'
				,validators: [M.PresenceValidator, M.DateValidator]
				// The applying of this class is automatically triggered if the validation of the view goes wrong. 
				,cssClassOnError: 'err'

				//  initialText: KivaApp.SettingsController.lender_id
			})			
		})
		
		,save_container: M.ContainerView.design({
			
			childViews: 'save_button save_label'
			,save_button: M.ButtonView.design({
				cssClass: 'kv_button'
				,value: 'Save'
				,events: {
					tap: {
						target: KivaApp.SettingsController
						,action: 'getID'
					}
				}
			})
			
			,save_label: M.LabelView.design({
				value: 'Find your Kiva lender ID at: https://www.kiva.org/mylenderid.'
			})
		})
*/
				 
 	 	,connect_button: M.ButtonView.design({
	    		value: (kv.phoneGap.localStorage.aes.getItem('user_account.lender_id')) ? 'Connected - Reconnect?' : 'Connect'
			,events: {
				tap: {
					target: KivaApp.SettingsController
					,action: 'connect'
				}
			}
		})

		//send anonymous usage button
		,analytics_opt_in_container: M.ContainerView.design({
			childViews: 'analytics_opt_in_button'

			,analytics_opt_in_button: M.ToggleSwitchView.design({
			
				label: 'Allow anonymous usage information to be sent to Kiva.'
				,onLabel: 'yes'
				,offLabel: 'no'
				,offValue: '0'
				,onValue: '1'
				,events:{
					change:{
						action: function() {
							KivaApp.SettingsController.sendUsage()
						}
					}
				},
			})
		})
		,show_pin_info: M.ToggleSwitchView.design({
			label: 'Show Optional Login Information'
			,onValue: 1
			,onLabel:'yes'
			,offValue: 0
			,offLabel: 'no'
			,events: {
				change: {
					target: KivaApp.SettingsController
					,action: 'changeLoginVisibility'
				}
			}
		})
		,login_pin_container: M.ContainerView.design({
			childViews: 'pin_label enter_pin confirm_pin save_pin'
			,pin_label: M.LabelView.design({
				value: 'Optional four-digit login PIN'
			})
			,enter_pin: M.TextFieldView.design({
				inputType: M.INPUT_PASSWORD
			})
			,confirm_pin: M.TextFieldView.design({
				inputType: M.INPUT_PASSWORD
			})
			,save_pin: M.ButtonView.design({
				value: 'Save Pin'
				,events: {
					tap: {
						target: KivaApp.SettingsController
						,action: 'savePin'
					}
				}
			})
		})
	})

	,footer: KivaApp.Tabs
});
