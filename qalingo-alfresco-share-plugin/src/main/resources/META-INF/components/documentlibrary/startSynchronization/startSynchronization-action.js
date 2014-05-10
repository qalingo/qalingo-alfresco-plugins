(function() {
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionStartSynchronization",
        fn: function alfeaHoteia_onActionStartSynchronization(file) {
           
        	// Success callback function
        	var fnSuccess = function alfeaHoteia_onActionStartSynchronization_success(p_data)
        	{
        	
	        	
	        	Alfresco.util.PopupManager.displayMessage(
	        	{
	        		text: this.msg("message.startSynchronization.success", file.displayName),
	        		displayTime: 5
	        	});
	        };
        	
        	this.modules.actions.genericAction(
            {
                success:
                {
                	event:
                    {
                       name: "metadataRefresh"
                    },
                    
                    callback:
                	{
                		fn: fnSuccess,
                		scope: this
                	}
                	
                },
                failure:
                {
                    message: this.msg("message.startSynchronization.failure", file.displayName),
	        		displayTime: 5
                },
                webscript:
                {
                    name: "com/alfea/hoteia/startSynchronization?nodeRef={nodeRef}",
                    stem: Alfresco.constants.PROXY_URI,
                    method: Alfresco.util.Ajax.GET,
                    params:
                    {
                        nodeRef: file.nodeRef
                    }
                },
                config:
                {
                }

            });
        }
    });
})();