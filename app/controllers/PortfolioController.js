// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: PortfolioController
// ==========================================================================

KivaApp.PortfolioController = M.Controller.extend({

	lender_loans: null
	,all_loans: null
	,past_loan_details_group: []

    //we are now just showing a list of past loans, plus kiva balance
	,init: function() {

	//	KivaApp.Tabs.activeTab =  NO;
	//	KivaApp.Tabs.portfolioTab.isActive = YES;
		
		var current_page = [M.ViewManager.currentPage, KivaApp.Tabs.portfolioTab]
		KivaApp.FlowController.buildStack(current_page);

	//	this.getLoanBalance(kv.phoneGap.localStorage.aes.getItem('name_id'));


		//first attempt to find the lender information as saved from settings page		
		var lender_id = kv.phoneGap.localStorage.aes.getItem('user_account.lender_id');
		
		//if lender id not yet saved, go to the settings page
		if(lender_id===null || lender_id === undefined || lender_id === ''){
			this.switchToPage('settingsPage');
			var login_message = kv.phoneGap.localStorage.aes.setItem('login_message', 'It looks like you need to login first');
			//save a message to display to user
		} else {
			//create lenders object
			this.lenders = kiva.Lenders.create();

			//for showing this lenders' loans
			var login_message = kv.phoneGap.localStorage.aes.setItem('login_message', 'Welcome back to Kiva.');
			//create variable for the lender based on lender id
			var lendersjQXhr = this.lenders.fetch({action: lender_id});
			this.lender_loans = kiva.Lenders.Loans.create();
            var lender_loansjQXhr = this.lender_loans.fetch({action: lender_id});

            this.getAllLoans(kv.phoneGap.localStorage.aes.getItem("lender_id"));


            lender_loansjQXhr.done(function () {
            	var kvstr=KivaApp.PortfolioController.lender_loans.members;
                KivaApp.PortfolioController.set('lender_loans', kvstr);

            });
			
			//sets all vars from top to values based on lender
			lendersjQXhr.done(function () {
				var kiva_str = KivaApp.PortfolioController.lenders.members[0];

			});

		}

    }
    	//move to portfolio controller to get information about previous loans
		// see kiva build for more information
	,getLoanBalance: function(loan_id) {
		if (oauth_token = kv.phoneGap.localStorage.aes.getItem('oauth.access_token.token')) {
        	var oauth_token_secret = kv.phoneGap.localStorage.aes.getItem('oauth.access_token.token_secret');
			var balanceUrl = 'https://api.kivaws.org/v1/my/loans/'+loan_id+'/balances.json'; 
            
            kv.oauth.fetchResource(balanceUrl, oauth_token, oauth_token_secret, function(data) {
            	var past_loan_details_group = KivaApp.PortfolioController.get("past_loan_details_group");
            	var all_loans = KivaApp.PortfolioController.get('all_loans');
         		console.log(all_loans);

				console.log("**************8");
			//	console.log(data.balances);
				var past_loan_details = {id: loan_id, lent_amount: data.balances.total_amount_purchased, repaid_amount: data.balances.amount_repaid_to_lender};
				
				for(var i in all_loans){
         			if(all_loans[i].id === loan_id){
         				all_loans[i].past_loan_details = past_loan_details;
         			}
         		}
         		KivaApp.PortfolioController.set('all_loans', all_loans);
            });
		}     

	}

    ,getAllLoans: function(lender_id) {
    	if (oauth_token = kv.phoneGap.localStorage.aes.getItem('oauth.access_token.token')) {
        	var oauth_token_secret = kv.phoneGap.localStorage.aes.getItem('oauth.access_token.token_secret');
			var balanceUrl = 'https://api.kivaws.org/v1/my/loans.json'; 
            kv.oauth.fetchResource(balanceUrl, oauth_token, oauth_token_secret, function(data) {
				var tmp_loan = null;
				var all_loans = [];
				console.log("**************8**************************");
				for(var loan in data.loans){
					tmp_loan = data.loans[loan];
				//	console.log(tmp_loan);
					KivaApp.PortfolioController.getLoanBalance(tmp_loan.id);
				//	tmp_loan.past_loan_details = KivaApp.LoanItemController.past_loan_details;
					console.log(tmp_loan);
					all_loans.push(tmp_loan);
				}
				KivaApp.PortfolioController.set('all_loans', all_loans);
				console.log(KivaApp.PortfolioController.all_loans);
            });
		}
    }
    
});
