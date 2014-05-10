function main() {
	
	var docquery = "select e.* from hta:typeDocumentsListe as e ";
	
	
    var def = {
        query : docquery,
        language : "cmis-alfresco"
    };

    var results = search.query(def);
    if (results != null) {
        
    	model.typeMasterDataList = results ;
		
    }
    
}

main();