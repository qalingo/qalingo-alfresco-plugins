function main() {
	
	var type = args.type;
	var docquery;
	if(type.indexOf('-') > 0) {
		var type1, type2;
		
		type1 = type.substring(0,type.indexOf('-'));
		type2 = type.substring(type.indexOf('-')+1,type.length);
		
		docquery = "select e.hta:idTypeParam, e.hta:idParamStandard, e.hta:libelleParamStandard from hta:standardDataListe as e where e.hta:idTypeParam='"+type1+"' or e.hta:idTypeParam='"+type2+"' order by e.hta:libelleParamStandard";
	}
	else {
		docquery = "select e.hta:idTypeParam, e.hta:idParamStandard, e.hta:libelleParamStandard from hta:standardDataListe as e where e.hta:idTypeParam='"+type+"' order by e.hta:libelleParamStandard";
	}
	
	
    var def = {
        query : docquery,
        language : "cmis-alfresco"
    };

    var results = search.query(def);
    if (results != null) {
        
    	model.standardDataList = results ;
		
    }
    
}

main();