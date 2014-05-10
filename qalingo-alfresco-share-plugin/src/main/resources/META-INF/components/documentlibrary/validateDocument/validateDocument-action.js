(function() {
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionValidateDocument",
        fn: function alfeaHoteia_onActionValidateDocument(file) {
           
        	// Success callback function
        	var fnSuccess = function alfeaHoteia_onActionValidateDocument_success(p_data)
        	{
        	
	        	
	        	Alfresco.util.PopupManager.displayMessage(
	        	{
	        		text: this.msg("message.validateDocument.success", file.displayName),
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
                    message: this.msg("message.validateDocument.failure", file.displayName),
	        		displayTime: 5
                },
                webscript:
                {
                    name: "com/alfea/hoteia/validateDocument?nodeRef={nodeRef}",
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