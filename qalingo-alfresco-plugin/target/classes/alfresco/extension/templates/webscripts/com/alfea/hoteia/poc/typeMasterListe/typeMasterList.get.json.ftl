{
	"typeMasterDataList":
	[
		<#list typeMasterDataList as tp>
		{
			"id":"${tp.properties["hta:tpDocId"]!}",	
			"lib":"${tp.properties["hta:tpDocName"]!}"	
		}
		<#if tp_has_next>,</#if>
		</#list>
	]
}