// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// Controller: FlowController
// ==========================================================================

KivaApp.FlowController = M.Controller.extend({

	back_button_text: 'loans' // used for back button on header
	,history_stack: null
	//goes back one page in history   
	,pageBack: function() {
		
		var history_stack = this.history_stack;
		if(history_stack.length > 1) {
			var current_page = history_stack.pop();
			var last_page = history_stack.pop();


			
			KivaApp.FlowController.checkLast();

			if(last_page.length === 2){

				last_page[1].switchPage()
			} else {
				this.switchToPage(last_page[0]);	
			}	
		} else { //history stack == 1?

		}
	}

	,checkLast: function() {
		if(this.history_stack.length>0){
			var last = KivaApp.FlowController.history_stack.length - 1;
			var last_page = KivaApp.FlowController.history_stack[last][0].value;
			if(this.history_stack.length === 1){
				KivaApp.FlowController.set('back_button_text', "");
			} else {
				KivaApp.FlowController.set('back_button_text', last_page);	
			}
			
			console.log(KivaApp.FlowController.history_stack);
		}
		
	}

	,buildStack: function(current_page){
		var last = KivaApp.FlowController.history_stack.length - 1;
		KivaApp.FlowController.history_stack.push(current_page);
		var last_page = "";
		if(KivaApp.FlowController.history_stack[last][0].value){
			last_page = KivaApp.FlowController.history_stack[last][0].value;	
		} else {
			last_page = KivaApp.FlowController.history_stack[last][0];
		}
		
		KivaApp.FlowController.set('back_button_text', last_page);
	}
	,popStack: function(current_page){
		KivaApp.FlowController.history_stack.pop();
	}
	 	
	 	
});
