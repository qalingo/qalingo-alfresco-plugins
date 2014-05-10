function main()
{	
	var market = args.market ;
	var remoteURL = "/market/set/";
	logger.log(remoteURL);
    var connector = remote.connect("qalingo");

    var json = connector.get(remoteURL+market);
    var result = eval("(" + json + ")");
    
    model.marketAreas = result.marketAreas;
    model.marketPlaces = result.marketPlaces;
    model.markets = result.markets;
    
}

main();