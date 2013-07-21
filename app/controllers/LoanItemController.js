// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: LoanItemController
// ==========================================================================

KivaApp.LoanItemController = M.Controller.extend({

	name: null
	,country: null
	,use: null
	,loan_amount: null
	,activity: null
	,status: null
	,sector: null
	,image_id: null
	,image_url: null
	,funded_amt: null
	,basket_num: null
	,loan_id:null
	,basket:[]
	,basket_item: null
	,submission_basket:[]
	,loan_lenders: []
	,lend: null
	,about_text:null
	,about_label:null
	,message:''
	,loan_index: null
	,past_loan_details: null

	,init: function(){
		var current_page = [M.ViewManager.currentPage]
		KivaApp.FlowController.buildStack(current_page);
	
		//get the id of the selected loan from local storage where it was put from LoanListController
		var loan_id = kv.phoneGap.localStorage.aes.getItem('name_id');
		KivaApp.LoanItemController.set('loan_id', loan_id);

		//here also check whether the loan is already in the basket, and if it is, set the button to "In Kiva Basket"
		var not_included = true;
		var check_id = KivaApp.LoanItemController.loan_id;
		var check_basket = this.submission_basket;
		for (var loan in check_basket){
			var obj = check_basket[loan];
			if (obj.id == check_id){
				not_included = false;
			}
		}
		
		
		//create loans object from which to query: might be faster to use teh loans object already created in 
		//LoansListController

		var hstack = KivaApp.FlowController.history_stack;
		if(hstack[hstack.length - 2 ] && hstack[hstack.length -2][0].value === "Portfolio") {
			KivaApp.LoanItemController.set('loans', KivaApp.PortfolioController.all_loans);
			var loans = KivaApp.LoanItemController.get('loans');
			for (var i in loans){
				if(loans[i].id.toString() === loan_id.toString()){
					KivaApp.LoanItemController.set("past_loan_details", loans[i].past_loan_details);
					break;
				}
			}
		} 

		this.loans = kiva.Loans.create();
		KivaApp.LoanItemController.set('loans', this.loans);
		
		// getting that specific loan from the loans object based on given id
		var loansjQXhr = this.loans.fetch([loan_id]);

		//giving the vars declared at top of document values based on the loan pulled from loans object
		var kv_control = KivaApp.LoanItemController; //this

		loansjQXhr.done(function () {
			var kivastr = KivaApp.LoanItemController.loans.members[0]; //specific loan

			KivaApp.LoanItemController.setValues(kivastr);

			if (not_included===false){
				KivaApp.LoanItemController.submission_basket.
				KivaApp.LoanItemController.set('lend', loan_amt + " Loan In Kiva Basket");
			}else if(kivastr.status==='fundraising'){
				kv_control.set('lend', 'Lend');
				M.ViewManager.currentPage.content.image_lend_grid.lend.select_box.setCssProperty('visibility', 'visible');
				M.ViewManager.currentPage.content.image_lend_grid.lend.lend_button.setCssProperty('visibility', 'visible');
				M.ViewManager.currentPage.content.grid_container.amount_funded_grid.setCssProperty('visibility', 'visible');
				KivaApp.LoanItemController.set('message', '');
			}else {
				M.ViewManager.currentPage.content.image_lend_grid.lend.select_box.setCssProperty('visibility', 'hidden');
				M.ViewManager.currentPage.content.image_lend_grid.lend.lend_button.setCssProperty('visibility', 'hidden');
				M.ViewManager.currentPage.content.grid_container.amount_funded_grid.setCssProperty('visibility', 'hidden');
				if(KivaApp.LoanItemController.past_loan_details){
					var loan_details_string = "My Loan: "+KivaApp.LoanItemController.formatMoney(KivaApp.LoanItemController.past_loan_details.lent_amount) + "\nRepaid: "+  KivaApp.LoanItemController.formatMoney(KivaApp.LoanItemController.past_loan_details.repaid_amount);	
					KivaApp.LoanItemController.set('message', loan_details_string);
				} else {
					KivaApp.LoanItemController.set('message', 'Not currently fundraising');	
				}
				
			}

		});
				
		// Add the lenders for the loan
		this.loan_lenders = kiva.Loans.Lenders.create();
		
		var loan_lendersjQXhr = this.loan_lenders.fetch({action: loan_id});

		loan_lendersjQXhr.done(function () {
          	kv_control.set('loan_lenders', KivaApp.LoanItemController.loan_lenders.members);
        });
		
	}

	,setValues: function(loan){
		var kv_control = KivaApp.LoanItemController;
		var about_str = 'About ' + loan.name;
		kv_control.set('about_label', about_str);
		kv_control.set('about_text', loan.description.texts.en);
		var tmp_img_url = 'http://www.kiva.org/img/s150/' + loan.image.id +'.jpg'
		kv_control.set('basket_item', loan);
		kv_control.set('name', loan.name);
		kv_control.set('activity', loan.activity);
		kv_control.set('status', kv_control.formatStatus(loan.status));
		kv_control.set('sector', loan.sector);
		var loan_amt = KivaApp.LoanItemController.formatMoney(loan.loan_amount);
		kv_control.set('loan_amount', loan_amt);
		kv_control.set('country', loan.location.country);
		kv_control.set('funded_amt', KivaApp.LoanItemController.formatMoney(loan.funded_amount));
		kv_control.set('image_id', loan.image.id);
		kv_control.set('image_url', tmp_img_url);
		kv_control.set('use', loan.use);
	}

	,formatStatus: function(status){
		var tmp = status.split("_");
		var capitalized = "";
		for (var index in tmp) {
			capitalized += tmp[index][0].toUpperCase() + tmp[index].substring(1) + " ";	
		} 
		return capitalized;
	}
	
	,checkOut: function(){
		KivaApp.LoanItemController.set('submission_basket', KivaApp.LoanItemController.submission_basket);
		if(this.submission_basket.length > 0){
			$('#'+KivaApp.KivaWebView.content.container.webview.id).html('<div id="webview_holder"><iframe id="kv_webview" style="border: 0; width: 100%; height: 100%;" />');

			$('#kv_webview').contents().find('html').html(
				'<form id="kv_webview_form" action="http://www.kiva.org/basket/set?display=mobile&hasHeader=false" method="POST">'
				+ '<input type="hidden" name="loans" value=\''
				+ JSON.stringify(KivaApp.LoanItemController.submission_basket)+'\'/>'
				+ '<input type="hidden" name="donation" value="0"/><input type="hidden" name="app_id" value="org.kiva.mobile"/></form></iframe></div>'
			).find('#kv_webview_form').submit(); 
			//add to history stack so back button will work
			var current_page = ['kivaWebView', KivaApp.Tabs.lendTab];
			KivaApp.FlowController.buildStack(current_page);
			this.switchToPage('kivaWebView');
		} else {
			//message to say that there are no loans in basket
			M.DialogView.alert({
				title: 'Empty Kiva Basket'
				,message: 'Check out with Kiva when you have selected some loans.'	
				,cssClass: 'kv_alert'
			})
			
		}
	}


	,addToBasket: function(id, loan_id) {
		var check_id = KivaApp.LoanItemController.loan_id;
		var status = KivaApp.LoanItemController.status;
		var not_included = true;
		var check_basket = this.submission_basket;
		for (var loan in check_basket){
			var obj = check_basket[loan];
			if (obj.id == check_id){
				not_included = false;
				this.set('loan_index', this.submission_basket.indexOf(obj));
				KivaApp.LoanItemController.set('lend', this.formatMoney(obj.amount) + " Loan In Kiva Basket");

			}
		} 

		var stat = this.loans.members[0].status;
		// get the list of loan amounts (which should just be one)
		if(stat === "fundraising"){
			var basket_loan = KivaApp.LoanItemController.basket_item;
			KivaApp.LoanItemController.basket.push(basket_loan);
			var selection_list = M.ViewManager.getView('loanItem', 'select_amount');
			//get the string of the amount without the $ 
			var selection = Number(selection_list.getSelection(YES).value);
			// get the number part alone and parse as a number instead of a string
		//	var new_select = Number(selection);	
			//create an object that will hold both the loan id and the loan amount
			
			if(not_included){
				var basket_loan_obj = new Object();
				//get the current loan id and set as a number, and set it to teh loan id of teh loan object to pass to kiva
				basket_loan_obj.id = Number(KivaApp.LoanItemController.loan_id);
				//make the basket loan object's amount equal to teh number parsed amount gotten from the view
				basket_loan_obj.amount = selection;
				// add this loan object to teh submission basket array that will be sent to kiva
				KivaApp.LoanItemController.submission_basket.push(basket_loan_obj);
				//return to the loans page immediately to make more loans
				var basket_amt = KivaApp.LoanItemController.basket.length;
				KivaApp.LoanItemController.set('basket_num', basket_amt);
				KivaApp.LoanItemController.set('basket', KivaApp.LoanItemController.basket);
				var status = KivaApp.LoanItemController.status;	
					
			} else {
				//change loand amount in basket
			//	submission_basket.getItem
				this.submission_basket[this.loan_index].amount = selection;
				console.log(this.submission_basket);

			}
			KivaApp.LoanItemController.set('lend', this.formatMoney(selection) + " Loan In Kiva Basket");
			
		}
	}
	
	//TODO - better function
	,formatMoney: function(amount_num){
		var amount = String(amount_num); 
		if(amount.length<4){
			return "$" + amount;
		}
		if(amount.length === 4){
			return "$" + amount.substring(0,1) + "," + amount.substring(1);
		}
		if(amount.length === 5){
			return "$" + amount.substring(0,2) + "," + amount.substring(2);
		}
	}



});
