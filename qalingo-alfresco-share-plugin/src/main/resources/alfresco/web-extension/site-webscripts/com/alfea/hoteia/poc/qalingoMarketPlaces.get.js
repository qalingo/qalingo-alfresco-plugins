function main()
{
	var remoteURL = "/marketplaces";
	logger.log(remoteURL);
    var connector = remote.connect("qalingo");

    var json = connector.get(remoteURL);
    var result = eval("(" + json + ")");
    
    model.marketAreas = result.marketAreas;
    model.marketPlaces = result.marketPlaces;
    model.markets = result.markets;
    
}

main();