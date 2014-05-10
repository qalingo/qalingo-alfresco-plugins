function getMasterChild(masterId) {
	
	var docquery;
	var libelle = "";	
    var childs = new Array() ;
    var indice = 0;
	
	docquery = "select e.* from hta:fichesProduct as e"; 
		
    var def = {
        query : docquery,
        language : "cmis-alfresco"
    };

    var results = search.query(def);
    if (results != null) {
       
    	logger.log(results.length);
		
      for(var i=0;i<results.length;i++) {
      	var fiches = results[i] ;
        
        if(fiches.properties["hta:parentMasterId"].indexOf(masterId) > -1) {
        	childs[indice] = fiches ;
        	indice++;
        }
      
      }
		
    }
    
    return childs;
}

function main() {
	
	var nodeRef = args.nodeRef;
	
	var docMaster = utils.getNodeFromString(nodeRef);
	var displayMessage;
	
	var masterChilds = getMasterChild(docMaster.id) ;
    if (masterChilds != null) {
       
      logger.log(masterChilds.length);
	
      for(var i=0;i<masterChilds.length;i++) {
    	  var child = masterChilds[i] ;
    	  logger.log(child.properties["cm:name"]);
    	  
    	  var oldCodeProduct = docMaster.properties["hta:oldCodeProduct"];
    	  var oldNameProduct = docMaster.properties["hta:oldNameProduct"];
    	  var oldDescriptionProduct = docMaster.properties["hta:oldDescriptionProduct"];
    	  var oldSegmentSeoProduct = docMaster.properties["hta:oldSegmentSeoProduct"];
    	  var oldOgTitleProduct = docMaster.properties["hta:olsOgTitleProduct"];
    	  var oldOgDescriptionProduct = docMaster.properties["hta:oldOgDescriptionProduct"];
    	  var oldOgImageProduct = docMaster.properties["hta:oldOgImageProduct"];
    	  
    	  
    	  var codeProduct = child.properties["hta:codeProduct"];
    	  var nameProduct = child.properties["hta:nameProduct"];
    	  var descriptionProduct = child.properties["hta:descriptionProduct"];
    	  var segmentSeoProduct = child.properties["hta:segmentSeoProduct"];
    	  var ogTitleProduct = child.properties["hta:ogTitleProduct"];
    	  var ogDescriptionProduct = child.properties["hta:ogDescriptionProduct"];
    	  var ogImageProduct = child.properties["hta:ogImageProduct"];
    	  
    	  if(oldCodeProduct == codeProduct) {
    		  var codeProduct = docMaster.properties["hta:codeProduct"];
    		  child.properties["hta:codeProduct"] = codeProduct;
		  }
    	  
    	  if(oldNameProduct == nameProduct) {
    		  var nameProduct = docMaster.properties["hta:nameProduct"];
    		  child.properties["hta:nameProduct"] = nameProduct;
		  }

		  if(oldDescriptionProduct == descriptionProduct) {
			  var descriptionProduct = docMaster.properties["hta:descriptionProduct"];
			  child.properties["hta:descriptionProduct"] = descriptionProduct;
		  }

		  if(oldSegmentSeoProduct == segmentSeoProduct) {
			  var segmentSEOProduct = docMaster.properties["hta:segmentSeoProduct"];
			  child.properties["hta:segmentSeoProduct"] = segmentSEOProduct;
		  }

		  if(oldOgTitleProduct == ogTitleProduct) {
			  var ogTitleProduct = docMaster.properties["hta:ogTitleProduct"];
			  child.properties["hta:ogTitleProduct"] = ogTitleProduct;
		  } 

		  if(oldOgDescriptionProduct == ogDescriptionProduct) {
			  var ogDescriptionProduct = docMaster.properties["hta:ogDescriptionProduct"];
			  child.properties["hta:ogDescriptionProduct"] = ogDescriptionProduct;
		  }

		  if(oldOgImageProduct == ogImageProduct) {
			  var ogImageProduct = docMaster.properties["hta:ogImageProduct"];
			  child.properties["hta:ogImageProduct"] = ogImageProduct;
		  }
		  child.save();
    	  
      }
    }
	
	model.displayMessage = displayMessage;
	model.contentNode = docMaster ;
}

main() ;