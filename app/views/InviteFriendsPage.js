// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: InviteFriendsPage
// ==========================================================================
m_require('app/views/BalanceHeader.js');
m_require('app/views/Tabs.js');

KivaApp.InviteFriendsPage = M.PageView.design({

	events: {
		pageshow: {
			target: KivaApp.InviteController
			,action: 'init'
		}
	}
	
	,value: 'Invite'

	,childViews: 'header content footer'
	
	,header: M.ToolbarView.design(KivaApp.BalanceHeader.getHeader())
		
	,content: M.ScrollView.design({
		
		childViews: 'message fb_area sms_area'
		
		,message: M.ContainerView.design({
			childViews: 'welcome_message msg kiva_message'
			,welcome_message: M.LabelView.design({
				cssClass: 'kv_label'
				,value: 'Tell your friends about Kiva!'
			})

			,msg: M.LabelView.design({
				value: 'Message:'
			})
		
			,kiva_message: M.LabelView.design({
				cssClass: 'kv-invite'
				,contentBinding: {
					target: KivaApp.InviteController
					,valuePattern: '<%= sms_message %>'
					,property: 'sms_message'
				}
			})

		})

		,fb_area: M.ContainerView.design({
			
			childViews: 'fb_label fb_button'
			
			,cssClass: 'kv-invite-border'

			,fb_label: M.LabelView.design({        
				value: 'Facebook'
			})

			,fb_button: M.ButtonView.design({
			 
				cssClass: 'fb-button'
				,value: 'Send'
				,icon: 'fb'
				,events:{
					tap: {
						target: KivaApp.InviteController
						,action: 'sendRequestFB'
					}
				} 
			})

		})

		,sms_area: M.ContainerView.design({
			
			childViews: 'sms_label contact_list sms_button'
			
			,cssClass: 'kv-invite-border'
			//eventually this will be set up to access the phone's contacts - phoneGap will be used
			
			,sms_label: M.LabelView.design({
				value: 'Send a Text Message'
			})
			
			,contact_list: M.ScrollView.design({
				childViews: 'contacts'

				,contacts: M.SelectionListView.design({
					selectionMode: M.MULTIPLE_SELECTION
					//selectionMode: M.MULTIPLE_SELECTION_DIALOG // (drop-down list) this is what we want but doesn't work in emulator
					,contentBinding: {
						target: KivaApp.InviteController
						,property: 'contacts_names'
					}
					,events: {
						change: {
							target: KivaApp.InviteController
							,action: 'contactSelect'
						}
					}
					,label: 'Contacts'

				})
				
			})
			
			,sms_button: M.ButtonView.design({
				cssClass: 'kv_call'
				,value: 'Send Text'
				,events: {
					tap: {
						target: KivaApp.InviteController
						,action: 'sendSMS'
					}
				}
			})
		})
	})

	,footer: KivaApp.Tabs
});

