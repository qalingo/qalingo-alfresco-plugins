function main()
{
	var remoteURL = "/com/alfea/hoteia/poc/qalingoFiches.json";
	
    var connector = remote.connect("alfresco");

    var json = connector.get(remoteURL);
    var result = eval("(" + json + ")");

    model.qalingoFichesList = result.qalingoFichesLists;
}

main();