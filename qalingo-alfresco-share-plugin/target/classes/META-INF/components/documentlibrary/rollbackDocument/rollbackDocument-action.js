(function() {
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionRollbackDocument",
        fn: function alfeaHoteia_onActionRollbackDocument(file) {
           
        	// Success callback function
        	var fnSuccess = function alfeaHoteia_onActionRollbackDocument_success(p_data)
        	{
        	
	        	
	        	Alfresco.util.PopupManager.displayMessage(
	        	{
	        		text: this.msg("message.rollbackDocument.success", file.displayName),
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
                    message: this.msg("message.rollbackDocument.failure", file.displayName),
	        		displayTime: 5
                },
                webscript:
                {
                    name: "com/alfea/hoteia/rollbackDocument?nodeRef={nodeRef}",
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