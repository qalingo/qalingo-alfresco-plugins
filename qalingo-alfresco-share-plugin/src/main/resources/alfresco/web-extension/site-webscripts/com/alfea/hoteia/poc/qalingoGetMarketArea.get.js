function main()
{	
	var marketarea = args.marketarea ;
	var remoteURL = "/marketarea/set/";
	logger.log(remoteURL);
    var connector = remote.connect("qalingo");

    var json = connector.get(remoteURL+marketarea);
    var result = eval("(" + json + ")");
    
    model.marketAreas = result.marketAreas;
    model.marketPlaces = result.marketPlaces;
    model.markets = result.markets;
    
}

main();