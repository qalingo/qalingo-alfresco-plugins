
function main() {
	
	var nodeRef = args.nodeRef;
	
	var doc = utils.getNodeFromString(nodeRef);
	var displayMessage;
	var stateDocument = doc.properties["hta:state"] ;
	
	//Draft -> Staging
	if(stateDocument == "0") {
		doc.properties["hta:state"] = "1";
	}
	//Staging -> Reel
	else if(stateDocument == "1") {
		doc.properties["hta:state"] = "2";
	}
	//Reel -> Archive
	else if(stateDocument == "2") {
		doc.properties["hta:state"] = "3";
	}
	
	doc.save();
	
	model.displayMessage = displayMessage;
	model.contentNode = doc ;
}

main() ;