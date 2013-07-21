$('body').click(function(){
	track();

	function track(){
		//trackEvent(category, action, label, id, value, callback) 
		var $environment = M.Application.getConfig('environment');
		var $version = M.Application.getConfig('version');
		var $currentPage = M.ViewManager.getCurrentPage();

		var $platform = {
			Android: function() {
		        return navigator.userAgent.match(/Android/i);
		    }
		 	,iOS: function() {
        		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   	 		}
   	 	};	
		

		kv.track.trackEvent(
			'click'
			, $currentPage.value
			, 'KivaApp'
			, $platform + '.' + $version + '.' + $environment);
	}

});