(function() {
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionStartCreateProduct",
        fn: function alfeaHoteia_onActionStartCreateProduct(file) {
           
        	// Success callback function
        	var fnSuccess = function alfeaHoteia_onActionStartCreateProduct_success(p_data)
        	{
        	
	        	
	        	Alfresco.util.PopupManager.displayMessage(
	        	{
	        		text: this.msg("message.startCreateProduct.success", file.displayName),
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
                    message: this.msg("message.startCreateProduct.failure", file.displayName),
	        		displayTime: 5
                },
                webscript:
                {
                    name: "com/alfea/hoteia/startCreateProduct?nodeRef={nodeRef}",
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