{
	"marketAreas":
	[
		<#list marketAreas as marketArea>
		{
			"code":"${marketArea.code!}",
			"description":"${marketArea.description!}",	
			"name":"${marketArea.name!}",
			"selected":"${marketArea.selected?string!}"
			
		}
		<#if marketArea_has_next>,</#if>
		</#list>
	]
}