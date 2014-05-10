{
	"standardDataList":
	[
		<#list standardDataList as std>
		{
			"id":"${std.properties["hta:idParamStandard"]!}",	
			"lib":"${std.properties["hta:libelleParamStandard"]!}"	
		}
		<#if std_has_next>,</#if>
		</#list>
	]
}