{
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
	]
}