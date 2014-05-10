{
	"marketAreas":
	[
		<#list marketAreas as marketArea>
		{
			"code":"${marketArea.code!}",	
			"name":"${marketArea.name!}",
			"selected":"${marketArea.selected?string!}"	
		}
		<#if marketArea_has_next>,</#if>
		</#list>
	],
	"marketPlaces":
	[
		<#list marketPlaces as marketPlace>
		{
			"code":"${marketPlace.code!}",	
			"name":"${marketPlace.name!}",
			"selected":"${marketPlace.selected?string!}"	
		}
		<#if marketPlace_has_next>,</#if>
		</#list>
	],
	"markets":
	[
		<#list markets as market>
		{
			"code":"${market.code!}",	
			"name":"${market.name!}",
			"selected":"${market.selected?string!}"	
		}
		<#if market_has_next>,</#if>
		</#list>
	]
}