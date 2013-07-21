// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: KivaApp
// View: OtherLendersView
// ==========================================================================

KivaApp.OtherLendersView = M.ListItemView.design({

	isSelectable: NO //temporary fix. 
	// need to figure out how to make grid view work like list view. 
	//can probably do this better if it's all in controller
	,childViews: 'photo name location'
	
	,photo: M.ImageView.design({
		cssClass: 'kv_photo'
		,computedValue: {
			valuePattern: '<%= image %>'
			,operation: function(image) {
				return 'http://www.kiva.org/img/w80h80/'  + image.id + '.jpg';
			}
		}
		
	})

	,name: M.LabelView.design({
		cssClass: 'kv_name'
		,valuePattern: '<%= name %>'
	})
	
	,location: M.LabelView.design({
		valuePattern: '<%= whereabouts %>'	
	})
});

