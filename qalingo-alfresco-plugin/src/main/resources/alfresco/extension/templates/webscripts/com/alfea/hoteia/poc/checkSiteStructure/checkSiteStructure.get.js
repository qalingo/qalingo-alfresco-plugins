function getSitemarketPlace(siteId) {
  var retour = false ;
  var listsite = siteService.listSites("","site-marketplace");
  
  for(var i=0;i<listsite.length;i++) {
    var siteMarketPlace =  listsite[i];
    
    if(siteMarketPlace.shortName.indexOf(siteId) == 0) {
    	retour = true ;
        break;
    }
  }
  
  return retour ;
}

function foundTypeProduct(siteName,typeProduct) {
  var retour = false;
  
  var urlDL = "Sites/"+siteName+"/documentLibrary";
   
        var siteDL = companyhome.childByNamePath(urlDL);
    	
        if(siteDL != null) {
          
          for(var j=0;j<siteDL.getChildren().length;j++) {
  		var productType =  siteDL.getChildren()[j];
            	if(productType.name.indexOf(typeProduct) == 0) {
              	  retour = true ;
                  break;
          	}
          }
        }
  
  
  return retour ;
}


function createFolder(siteName,folderName) {
  var newFolder = null ;
  var urlDL = "Sites/"+siteName+"/documentLibrary";
   
        var siteDL = companyhome.childByNamePath(urlDL);
    	
        if(siteDL != null) {
          newFolder = siteDL.createFolder(folderName);
          
        }
  
  return newFolder;
}

var nodeRef = args.nodeRef;
var param = utils.getNodeFromString(nodeRef);
var displayMessage = "";
var typeProducts = param.properties["hta:tpDocName"];

//Parcourir le dossier site
var urlDestination = "Sites";
logger.log("urlDestination : "+urlDestination) ;
var sitesPath = companyhome.childByNamePath(urlDestination);

for(var i=0;i<sitesPath.getChildren().length;i++) {
  var site =  sitesPath.getChildren()[i];
  
  if(getSitemarketPlace(site.name)) {
  	logger.log("------------- Verification");
    	
    	if(!foundTypeProduct(site.name,typeProducts))
        {
          logger.log("Type : "+typeProducts+" --> Existe pas !!!!!");
          
          //Copier le contenu
          var urlTemplateProduct = "Data dictionary/Products Templates/Qalingo" ;
          var templateProductPath = companyhome.childByNamePath(urlTemplateProduct);
          
          if(templateProductPath != null) {
            // Creation du dossier ....
            logger.log("Create Folder");
            var newSiteFolder = createFolder(site.name,typeProducts) ;
            
             for (var n = 0; n < templateProductPath.children.length; n++) {
		        logger.log(templateProductPath.children[n].name);
               		templateProductPath.children[n].copy(newSiteFolder, true);
             }
          }
  
        }
  }
}

model.displayMessage = displayMessage;
model.contentNode = param ;

