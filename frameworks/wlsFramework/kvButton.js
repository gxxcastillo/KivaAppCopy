M.KvButtonView = M.View.extend({
	 //special button for going to last page
	type: 'M.KvButtonView'

	,value: 'test?'
	/*
	,testButton: M.ButtonView.design({
		value: 'test'
		,events: {
			tap: {
				target: this
				,action: function(){
					alert('Does this work?');
				}
			}
		}
	}) */
	,render: function(){
		//this.html = '<div id="' + this.id + '">';
		this.html = '<a data-type="button" id="' + this.id + '" ' + this.style() + 'href="#">' + this.value + '</a>';
		//this.html += '</div>';
		M.ViewManager.register(this);
		return this.html;
	}

	,renderUpdate: function(){}

	,theme: function(){}

/*	,style: function(){
		var _html = '';
		if(this.cssClass) {
			_html += 'class="' + this.cssClass + '"';
		}
		return _html;
	} */
	,registerEvents: function(){
		this.internalEvents = {
			tap: {
				target: this
				, action: 'goBack'
			}
		}
		this.bindToCaller(this, M.View.registerEvents)();
	}

	,goBack: function() {
		if(this.page){
			M.ViewManager.setCurrentPage(M.ViewManager.getPage(this.page));
		//	history.back();
		//	newPage = 
		//	M.Controller.switchToPage(newPage, M.TRANSITION.NONE, NO, YES);
		}
	}

});