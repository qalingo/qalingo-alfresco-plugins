/**
* DataList "Sample" action
*
* @namespace Alfresco
* @class Alfresco.service.DataListActions
*/
(function()
{
   /**
* Sample datalist action
*
* @method onActionChecked
* @param file {object} Object literal representing one or more file(s) or folder(s) to be actioned
*/
    Alfresco.service.DataListActions.prototype.onActionChecked = function DL_onActionChecked(items)
    {
    	var fnSuccess = function onActionChecked_success(p_data)
    	{
    	
        	
        	Alfresco.util.PopupManager.displayMessage(
        	{
        		text: this.msg("message.duplicate.success", items.length),
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
                message: this.msg("message.duplicate.failure"),
        		displayTime: 5
            },
            webscript:
            {
                name: "/com/alfea/hoteia/checkSiteStructure?nodeRef={nodeRef}",
                stem: Alfresco.constants.PROXY_URI,
                method: Alfresco.util.Ajax.GET,
                params:
                {
                    nodeRef: items.nodeRef
                }
            },
            config:
            {
            }
			
		});
   };
})();