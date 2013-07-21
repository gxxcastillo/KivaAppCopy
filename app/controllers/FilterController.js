// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: FilterController
// ==========================================================================

KivaApp.FilterController = M.Controller.extend({

	status_items:null // used for the status checklist - array
	,region_items:null //region checklist - array 
	,sector_items:null // type checklist - array
	,gender_items:null //gender checklist - array

	,init: function(firstLoad) {
		var current_page = [M.ViewManager.currentPage]
		KivaApp.FlowController.buildStack(current_page);
		// the following three methods are used to set the top values
		this.showStatus();
		this.showRegion();
		this.showGender();
		this.showSector();
		if(!firstLoad){
			var filter_choices = this.unpackStorage();
			KivaApp.FilterPage.set

			
		}
	}
	,unpackStorage: function(){
		var filter_choices = {};
		var options = ['status', 'region', 'gender', 'sector'];
		for(var index in options){
			var saved_value = kv.phoneGap.localStorage.aes.getItem('filter_choices_'+options[index]);
			if (saved_value!=""){
				filter_choices[options[index]] =  kv.phoneGap.localStorage.aes.getItem('filter_choices_'+options[index]).split(';');				
			}
		}
		return filter_choices;	
	}

	// sets teh value of status_items to array of options based on the options available through kiva
	,showStatus: function(){
		this.set('status_items', [
			{ value: 'fundraising', label: 'Fundraising' }
			,{ value: 'funded', label: 'Funded' }
			,{ value: 'in_repayment', label: 'In Repayment' }
			,{ value: 'paid', label: 'Paid' }
			,{ value: 'ended_with_loss', label: 'Ended with Loss' }
		]);
	}

	//sets teh value of region_items to an array of options based on kiva options
	,showRegion: function(){
		this.set('region_items', [
			{ value: 'na', label: 'North America' }
			,{ value: 'ca', label: 'Central America' }
			,{ value: 'sa', label: 'South America' }
			,{ value: 'af', label: 'Africa' }
			,{ value: 'as', label: 'Asia' }
			,{ value: 'me', label: 'Middle East' }
			,{ value: 'ee', label: 'Eastern Europe' }
		]);
	}

	//2-27-13 - sets value of gender_items - male & female
	,showGender: function(){
		this.set('gender_items', [
			{ value:'female', label:'Female' }
			,{ value:'male', label: 'Male' }
		]);
	}

	//sets value of sector_items to values based on kiva options
	,showSector: function(){
		this.set('sector_items', [
			{ value: 'Agriculture', label: 'Agriculture' }
			,{ value: 'Arts', label: 'Arts'	}
			,{ value: 'Clothing', label: 'Clothing'	}
			,{ value: 'Education', label: 'Education' }
			,{ value: 'Food', label: 'Food' }
			,{ value: 'Health', label: 'Health'	}
			,{ value: 'Housing', label: 'Housing' }
			,{ value: 'Manufacturing', label: 'Manufacturing' }
			,{ value: 'Personal Use', label: 'Personal Use' }
			,{ value: 'Retail', label: 'Retail' }
			,{ value: 'Services', label: 'Services' }
			,{ value: 'Transportation', label: 'Transportation' }
			,{ value: 'Wholesale', label: 'Wholesale' }
		]);
	}
	 
	 //use getSelection
	,getSelection: function() {	
		var filter_choices = this.setFilter();
		this.storeChoices();
		this.filter(filter_choices);
	 }

	 ,storeChoices: function(){
	 	var options = ['status', 'region', 'gender', 'sector'];
	 	for (var index in options){
			kv.phoneGap.localStorage.aes.setItem('filter_choices_'+options[index], this.setChoices(M.ViewManager.getView('filterPage', options[index]).getSelection(YES)));
		}
	 }

	 ,setFilter: function(){
	 	var filter_choices = new Object();
	 	var options = ['status', 'region', 'gender', 'sector'];
	 	for (var index in options){
	 		console.log(options[index]);
		 	filter_choices[options[index]] = M.ViewManager.getView('filterPage', options[index]).getSelection(YES);
	 	}
	 	return filter_choices;
	 }
	 ,setChoices: function(choices){
	 	var selection = "";
	 	if(choices!=""){
	 		selection = choices[0].value;
	 		for (var i=1; i<choices.length; i++){
		 		selection +=";"+ choices[i].value;
		 		console.log(selection);
	 		}	
	 	}
	 	return selection;
	 }


	, filter: function(selection_hash){

		// send the selection_hash to loanslistcontroller
		KivaApp.LoansListController.set('filter_selections', selection_hash);
		
		//need to ensure that loansjQXhr persists from this page to loansPage
		this.switchToPage('loansPage');

	}
	
	// 2-23-13 - this should be updated as an option that sends user back to loans page iwthout making any changes
	,cancelAction : function() {
		//instead of cancel, switch to clear all
	}
});
