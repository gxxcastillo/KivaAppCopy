M.KvHeaderView = M.View.extend({
	type: 'M.KvHeaderView'
	,render: function(){
		this.html = '<div id="' + this.id + ' data-role="' + this.anchorLocation + '" style="' + this.style()+ '">';
		this.html += this.value;
		this.renderChildViews();
		this.html += '</div>';
		return this.html;

	}
	,renderChildViews: function(){
		this.html = '';
		if(this.value){
			this.html += '<h1>'+this.value+'</h1>';
		} else if (this.childViews){
			var childViews = this.getChildViewsAsArray();
			var viewPositions = {};
			for(var i in childViews) {
                var view = this[childViews[i]];
                view._name = childViews[i];
                if( viewPositions[view.anchorLocation] ) {
                    M.Logger.log('ToolbarView has two items positioned at M.' +
                        view.anchorLocation + 
                        '.  Only one item permitted in each location', M.WARN);
                    return;
                }
                viewPositions[view.anchorLocation] = YES;
                switch (view.anchorLocation) {
                    case M.LEFT:
                        this.html += '<div class="ui-btn-left">';
                        this.html += view.render();
                        this.html += '</div>';
                        break;
                    case M.CENTER:
                        this.html += '<h1>';
                        this.html += view.render();
                        this.html += '</h1>';
                        break;
                    case M.RIGHT:
                        this.html += '<div class="ui-btn-right">';
                        this.html += view.render();
                        this.html += '</div>';
                        break;
                    default:
                        M.Logger.log('ToolbarView children must have an anchorLocation of M.LEFT, M.CENTER, or M.RIGHT', M.WARN);
                        return;
                }
            } 
		}
	}
	,renderUpdate: function(){

	}
	,theme: function() {

	}
	,style: function() {
		var html = '';
        if(this.cssClass) {
            html += ' class="' + this.cssClass + '"';
        }
        return html;
	}

	,registerEvents: function(){
		this.bindToCaller(this, M.View.registerEvents());
	}
	
});