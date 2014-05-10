(function() {
    YAHOO.Bubbling.fire("registerAction",
    {
        actionName: "onActionAddContent",
        fn: function hoteia_onActionAddContent(file) {
           
        	logger.log("PASSE ICI");
        	// Success callback function
        	var fnSuccess = function hoteia_onActionAddContent_success(p_data)
        	{
        	
        		var documentPicker;
    	        var getDocLibNodeRefUrl = Alfresco.constants.PROXY_URI + "slingshot/doclib/container/fichesproduits/documentlibrary";
    	        Alfresco.util.Ajax.jsonGet(
    	        {
    	           url: getDocLibNodeRefUrl,
    	           successCallback:
    	           {
    	              fn: function(response)
    	              {
    	                 var nodeRef = file.nodeRef;
    	                 documentPicker = new Alfresco.module.DocumentPicker(id + '-docPicker', Alfresco.ObjectRenderer);
    	                 documentPicker.setOptions(
    	                 {
    	                    displayMode: "items",
    	                    itemFamily: "node",
    	                    itemType: "cm:content",
    	                    multipleSelectMode: false,
    	                    parentNodeRef: nodeRef,
    	                    restrictParentNavigationToDocLib: true
    	                 });
    	                 documentPicker.onComponentsLoaded(); // Need to force the component loaded call to ensure setup gets completed.
    	              },
    	              scope: this
    	           }
    	        });
        		
        		documentPicker.onShowPicker();
        		
	        	Alfresco.util.PopupManager.displayMessage(
	        	{
	        		text: this.msg("message.addContent.success", file.displayName),
	        		displayTime: 5
	        	});
	        };
	        
        }
    });
})();