const PREFERENCES_ROOT = "hoteia.filter";

function main() {
	
	
	var docquery;
	
	// Reprendre le résultat du filtre 
	

	//Get the preferences for the person
	var prefsUser = preferenceService.getPreferences(person.properties.userName, PREFERENCES_ROOT);

	var markplace = prefsUser["hoteia"]["filter"]["marketplace"] ;
	var market = prefsUser["hoteia"]["filter"]["market"] ;
	var marketArea = prefsUser["hoteia"]["filter"]["marketarea"] ;
	var localization = prefsUser["hoteia"]["filter"]["localization"] ;
	var retaillers = prefsUser["hoteia"]["filter"]["retailer"] ;	
	var typefiche = prefsUser["hoteia"]["filter"]["typefiche"] ;
			
	var	docquery = "select e.* from hta:master as e JOIN hta:commonAspect as c ON e.cmis:objectId = c.cmis:objectId where c.hta:codeMarketPlace ='"+markplace +"'" ;
	
	if(typefiche != "all" && typefiche.length > 0) {
		docquery = docquery + " and e.hta:type='"+typefiche +"'" ;
	}
		
	if(market.length > 0 && market != "MASTER_MARKET" ) {
		docquery = docquery + " and c.hta:codeMarket='"+market +"'" ;
	}
	
	if(marketArea.length > 0 && marketArea != "MASTER_MARKETAREA" ) {
		docquery = docquery + " and c.hta:codeMarketArea='"+marketArea +"'" ;
	}
	
	if(localization != null && localization != "MASTER_LOCALIZATION" && localization.length > 0) {
		docquery = docquery + " and c.hta:codeLocalizations='"+localization +"'" ;
	}
	
	logger.log(retaillers);
	if(retaillers != null && retaillers != "MASTER_RETAILER" && retaillers.length > 0) {
		docquery = docquery + " and c.hta:codeRetailers='"+retaillers +"'" ;
	}
	
	
	logger.log(docquery);
	
    var def = {
        query : docquery,
        language : "cmis-alfresco"
    };

    var results = search.query(def);
    if (results != null) {
        
    	model.qalingoFichesLists = results ;
		
    }
    
    model.siteShortName = markplace;
    
}

main();