<import resource="classpath:/alfresco/site-webscripts/org/alfresco/share/imports/share-header.lib.js">

const PREFERENCES_ROOT = "hoteia.filter";


var preferences = {};
var result = remote.call("/api/people/" + stringUtils.urlEncode(user.name) + "/preferences?pf=" + PREFERENCES_ROOT);
if (result.status == 200 && result != "{}")
{
  var prefs = eval('(' + result + ')');
  try
  {
	 // Populate the preferences object literal for easy look-up later
	 preferences = eval('(prefs.' + PREFERENCES_ROOT + ')');
	 if (typeof preferences != "object")
	 {
		preferences = {};
	 }
  }
  catch (e)
  {
  }
}

model.marketPlace = preferences.marketplace ;
model.market = preferences.market ;
model.marketArea = preferences.marketarea ;
model.local = preferences.localization ;
model.retailer = preferences.retailer ;
model.typefiche = preferences.typefiche ;

model.jsonModel = {
   rootNodeId: "share-header",
   services: getHeaderServices(),
   widgets: [
      {
         id: "SHARE_VERTICAL_LAYOUT",
         name: "alfresco/layout/VerticalWidgets",
         config: 
         {
            widgets: getHeaderModel()
         }
      }
   ]
};



