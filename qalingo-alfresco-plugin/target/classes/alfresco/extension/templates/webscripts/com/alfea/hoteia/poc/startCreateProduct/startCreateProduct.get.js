function getParam(id) {
	var docquery = "select e.* from hta:typeDocumentsListe as e where e.hta:tpDocId='"+id+"'";
    var def = {
        query : docquery,
        language : "cmis-alfresco"
    };

    var results = search.query(def);
    
	return results ;
    
}


function main() {
	
	var nodeRef = args.nodeRef;
	
	var docMaster = utils.getNodeFromString(nodeRef);
	
	var siteName = docMaster.getSiteShortName();
	//Copier le document dans le dossier destination
	var fiche;
	var displayMessage;
	var docMasterType = docMaster.properties["hta:type"];
	var productFolder = getParam(docMasterType);
	var productFolderLib = productFolder[0].properties["hta:tpDocName"] ;
	var urlDestination = "Sites/"+siteName+"/documentLibrary/"+productFolderLib+"/Product";
	logger.log("urlDestination : "+urlDestination) ;
	var destinationPath = companyhome.childByNamePath(urlDestination);
	if(destinationPath != null) {
		
		fiche = docMaster.copy(destinationPath);
		logger.log(fiche.name);
		logger.log(fiche.specializeType("hta:product"));
		fiche.save();
		
		//Suppression Aspect Master
		if(fiche.hasAspect("hta:masterAspect") == true) {
			fiche.removeAspect("hta:masterAspect");
		}
		
		fiche.properties["hta:identifiant"] = "PRODUCT - "+productFolderLib;
		fiche.properties["hta:parentMasterId"] = docMaster.id;
		fiche.properties["hta:codeMarketPlace"] = docMaster.getSiteShortName().toUpperCase();
		fiche.properties["hta:state"] = "0";
		fiche.save();

		var nameFiche ;
		
		nameFiche = "PRODUCT - " + productFolderLib + " - " + fiche.properties["hta:codeMarketPlace"] ;
		
		fiche.properties["cm:name"] = nameFiche;
		fiche.save();
		
		displayMessage = "Fiche "+fiche.properties["cm:name"]+" created";
	}
	
	model.displayMessage = displayMessage;
	model.contentNode = fiche ;
}

main();