{
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