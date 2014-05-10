{
	"qalingoFichesLists":
	[
		<#list qalingoFichesLists as qfiche>
		{
			"url":"/share/page/site/${siteShortName}/document-details?nodeRef=${qfiche.nodeRef}",	
			"name":"${qfiche.name!}"	
		}
		<#if qfiche_has_next>,</#if>
		</#list>
	]
}