<#include "/org/alfresco/components/form/controls/common/utils.inc.ftl" />

<#if field.control.params.optionSeparator??>
   <#assign optionSeparator=field.control.params.optionSeparator>
<#else>
   <#assign optionSeparator=",">
</#if>
<#if field.control.params.labelSeparator??>
   <#assign labelSeparator=field.control.params.labelSeparator>
<#else>
   <#assign labelSeparator="|">
</#if>

<#assign fieldValue=field.value>

<#if fieldValue?string == "" && field.control.params.defaultValueContextProperty??>
   <#if context.properties[field.control.params.defaultValueContextProperty]??>
      <#assign fieldValue = context.properties[field.control.params.defaultValueContextProperty]>
   <#elseif args[field.control.params.defaultValueContextProperty]??>
      <#assign fieldValue = args[field.control.params.defaultValueContextProperty]>
   </#if>
</#if>
<div class="form-field">
   <#if form.mode == "view">
      <div class="viewmode-field">
         <#if field.mandatory && !(fieldValue?is_number) && fieldValue?string == "">
            <span class="incomplete-warning"><img src="${url.context}/res/components/form/images/warning-16.png" title="${msg("form.field.incomplete")}" /><span>
         </#if>
         <span class="viewmode-label">${field.label?html}:</span>
         <#if fieldValue?string == "">
            <#assign valueToShow=msg("form.control.novalue")>
         <#else>
			<#assign valueToShow=fieldValue>
         </#if>
         <span id="labelLocalization" class="viewmode-value">${valueToShow?html}</span>
      </div>
   <#else>
      <label for="${fieldHtmlId}">${field.label?html}:<#if field.mandatory><span class="mandatory-indicator">${msg("form.required.fields.marker")}</span></#if></label>
         <select id="${fieldHtmlId}" name="${field.name}" tabindex="0"
               <#if field.description??>title="${field.description}"</#if>
               <#if field.control.params.size??>size="${field.control.params.size}"</#if> 
               <#if field.control.params.styleClass??>class="${field.control.params.styleClass}"</#if>
               <#if field.control.params.style??>style="${field.control.params.style}"</#if>
               <#if field.disabled  && !(field.control.params.forceEditable?? && field.control.params.forceEditable == "true")>disabled="true"</#if>>
		 </select>
         <@formLib.renderFieldHelp field=field />
   </#if>
</div>

<script>
/*
 * This code should be in a clean module
 */		
Alfresco.util.Ajax.jsonGet(
{
    url: Alfresco.constants.PROXY_URI + "com/alfea/hoteia/poc/standardDataList?type=LOCAL",
    successCallback:
    {
       fn: onLocalizationListSuccess,
       scope: this
    },
    failureCallback:
    {
       fn: onLocalizationListFailed,
       scope: this
    },
    scope: this,
    noReloadOnAuthFailure: true
 });
function onLocalizationListSuccess(p_response){
    
	var type = "${form.mode}" ;
	var mySelect = YAHOO.util.Dom.get("${fieldHtmlId}");
	var list = p_response.json.standardDataList;

	// Add a option for each received message
    for (var i = 0, len = list.length; i < len; ++i) {
		var param = list[i];
		
		
			if(type == "edit" || type == "create" ) {
				var newOption = document.createElement('option');
				newOption.text = param.lib;
				newOption.value = param.id;
				
				if("${fieldValue}" == param.id) {
					newOption.selected = true;
				}
				else {
					if("${fieldValue}" == "" && param.id == "NONE") {
						newOption.selected = true;
 						newOption.value = " ";
					}
				}
				
				
				try {
					mySelect.add(newOption, null); // standards compliant; doesn't work in IE
				}
				catch(ex) {
					mySelect.add(newOption); // IE only
				}
			}
			else
			{
				if("${fieldValue}" == param.id) {
					var mySpan = YAHOO.util.Dom.get("labelLocalization");
					mySpan.innerHTML=param.lib;
				}
			}
		
    }
}
function onLocalizationListFailed(){
	alert("Load localization list failed");
}
</script>
