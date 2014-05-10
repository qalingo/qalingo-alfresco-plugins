function main()
{	
	var marketPlace = args.marketplace ;
	var remoteURL = "/marketplace/set/";
	logger.log(remoteURL);
    var connector = remote.connect("qalingo");

    var json = connector.get(remoteURL+marketPlace);
    var result = eval("(" + json + ")");
    
    model.marketAreas = result.marketAreas;
    model.marketPlaces = result.marketPlaces;
    model.markets = result.markets;
    
}

main();