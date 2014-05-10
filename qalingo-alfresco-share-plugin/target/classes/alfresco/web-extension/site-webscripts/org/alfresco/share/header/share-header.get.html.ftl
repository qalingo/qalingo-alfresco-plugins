<@markup id="css" >
   <#if config.global.header?? && config.global.header.legacyMode && config.global.header.dependencies?? && config.global.header.dependencies.css??>
      <#list config.global.header.dependencies.css as cssFile>
         <@link href="${url.context}/res${cssFile}" group="header"/>
      </#list>
   </#if>
</@>

<@markup id="js">
   <#if config.global.header?? && config.global.header.legacyMode && config.global.header.dependencies?? && config.global.header.dependencies.js??>
      <#list config.global.header.dependencies.js as jsFile>
         <@script src="${url.context}/res${jsFile}" group="header"/>
      </#list>
   </#if>
	<@script type="text/javascript" src="${url.context}/res/jquery/jquery-1.6.2-min.js" />
</@>

<@markup id="widgets">
   <@inlineScript group="dashlets">
      <#if page.url.templateArgs.site??>
         Alfresco.constants.DASHLET_RESIZE = ${siteData.userIsSiteManager?string} && YAHOO.env.ua.mobile === null;
      <#else>
         Alfresco.constants.DASHLET_RESIZE = ${((page.url.templateArgs.userid!"-") = (user.name!""))?string} && YAHOO.env.ua.mobile === null;
      </#if>
   </@>
   <@processJsonModel group="share"/>
</@>

<@markup id="html">

	<#if page.url.templateArgs.site??> 
		<div id="qalingo-header" style="width: 101%; overflow: auto; margin-left: -10px; background-color: #1A1A1A; color: #CCCCCC;">
			<div style="float: right;">
				<input id="siteID" type="hidden" value="${page.url.templateArgs.site}" />
				<input id="prefMarketPlace" type="hidden" value="${marketPlace}" />
				<input id="prefMarket" type="hidden" value="${market}" />
				<input id="prefMarketArea" type="hidden" value="${marketArea}" />
				<input id="prefLocal" type="hidden" value="${local}" />
				<input id="prefRetailer" type="hidden" value="${retailer}" />
				<input id="prefTypeFiche" type="hidden" value="${typefiche}" />
				<div style="float: left;">
					Type&nbsp;<select id="typeFiche-list" name="typeFiche-list" class="set-type-fiche"></select>
				</div>
				<div style="float: left; padding-left: 15px;">
					Market&nbsp;<select id="market-list" name="market-list" class="set-market"><option>test</option></select>
				</div>
				<div style="float: left; padding-left: 15px;">
					Market Area&nbsp;<select id="market-area-list" name="market-area-list" class="set-market-area"><option>test</option></select>
				</div>
				<div style="float: left; padding-left: 15px;">
					Localization&nbsp;<select id="localization-list" name="localization-list" class="set-localization"><option>test</option></select>
				</div>
				<div style="float: left; padding-left: 15px;">
					Retailer&nbsp;<select id="retailer-list" name="retailer-list" class="set-retailer"><option>test</option></select>
				</div>
			</div>
		</div>
	</#if>
	
		<script type="text/javascript">
		
		
		Alfresco.util.Ajax.jsonGet(
		{
		    url: Alfresco.constants.PROXY_URI + "com/alfea/hoteia/poc/typeMasterList",
		    successCallback:
		    {
		       fn: onTypeMasterListSuccess,
		       scope: this
		    },
		    failureCallback:
		    {
		       fn: onTypeMasterListFailed,
		       scope: this
		    },
		    scope: this,
		    noReloadOnAuthFailure: true
		 });
		function onTypeMasterListSuccess(p_response){
		    
			var mySelect = document.getElementById('typeFiche-list');
			var prefTypeFiche = document.getElementById('prefTypeFiche').value;
			
			var list = p_response.json.typeMasterDataList;
			
			var newOptionAll = document.createElement('option');
			newOptionAll.text = "All";
			newOptionAll.value = "all";
			
			try {
				mySelect.add(newOptionAll, null); // standards compliant; doesn't work in IE
			}
			catch(ex) {
				mySelect.add(newOptionAll); // IE only
			}
			
		
			// Add a option for each received message
		    for (var i = 0, len = list.length; i < len; ++i) {
				var param = list[i];
				
				
				var newOption = document.createElement('option');
				newOption.text = param.lib;
				newOption.value = param.id;
				
				if(prefTypeFiche == param.id) {
					newOption.selected = true;
				}
				else {
					if(prefTypeFiche == "" && param.id == "NONE") {
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
		}
		function onTypeMasterListFailed(){
			alert("Load type master list failed");
		}
		
		
		
		
		/* JAVASCRIPT FOR ALFRESCO JQUERY VERSION 1.6.2 */
		jQuery(document).ready(function(){
			plugins.HeaderContext.init();
		});	
		
				
		(function( plugins ) {
    
			plugins.HeaderContext = {

			SET_MARKETPLACE_AJAX : null,
		
			init : function() {
				if($('#qalingo-header').length > 0){
					
					var preferences = new Alfresco.service.Preferences();
					
					var marketplaceCode = document.getElementById('siteID').value; 
										
					var prefMarketPlace = document.getElementById('prefMarketPlace').value;
					var prefMarket = document.getElementById('prefMarket').value;
					var prefMarketArea = document.getElementById('prefMarketArea').value;
					var prefLocal = document.getElementById('prefLocal').value;
					var prefRetailer = document.getElementById('prefRetailer').value;
					
					if(marketplaceCode == prefMarketPlace) {
						plugins.HeaderContext.setMarketAjax(prefMarket);
						plugins.HeaderContext.setMarketAreaAjax(prefMarketArea);
						plugins.HeaderContext.setLocalizationAjax(prefMarketArea, prefRetailer, prefLocal);
						plugins.HeaderContext.setRetailerAjax(prefMarketArea, prefRetailer , prefLocal);
					}
					else {
						
						preferences.set("hoteia.filter.marketplace",marketplaceCode);
						preferences.set("hoteia.filter.market","MASTER_MARKET");
						preferences.set("hoteia.filter.marketarea","MASTER_MARKETAREA");
						preferences.set("hoteia.filter.localization","MASTER_LOCALIZATION");
						preferences.set("hoteia.filter.retailer","MASTER_RETAILER");
						
					    plugins.HeaderContext.setMarketPlaceAjax(marketplaceCode);
					    
					}
					
					$('.set-type-fiche').change(function() {
						
						preferences.set("hoteia.filter.typefiche",$( this ).val());
						setTimeout(function () { window.location.reload(); }, 15);
					});
					
					$('.set-market').change(function() {
						
						$( ".set-market option:selected" ).each(function() {
							plugins.HeaderContext.setMarketAjax($( this ).val());
						});
						preferences.set("hoteia.filter.market",$( this ).val());
					});

					$('.set-market-area').change(function() {
						$( ".set-market-area option:selected" ).each(function() {
							plugins.HeaderContext.setMarketAreaAjax($( this ).val());
						});
						preferences.set("hoteia.filter.marketarea",$( this ).val());
					});
					
					$('.set-localization').change(function() {
						var marketAreaCode = $( ".set-market-area option:selected" ).val();
						var retailerCode = $( ".set-retailer option:selected" ).val();
						var localizationCode = $( ".set-localization option:selected" ).val();
						plugins.HeaderContext.setLocalizationAjax(marketAreaCode, retailerCode, localizationCode);
						preferences.set("hoteia.filter.localization",localizationCode);
						setTimeout(function () { window.location.reload(); }, 5);
					});
				
					$('.set-retailer').change(function() {
						var marketAreaCode = $( ".set-market-area option:selected" ).val();
						var retailerCode = $( ".set-retailer option:selected" ).val();
						var localizationCode = $( ".set-localization option:selected" ).val();
						plugins.HeaderContext.setRetailerAjax(marketAreaCode, retailerCode, localizationCode);
						preferences.set("hoteia.filter.retailer",retailerCode);
						setTimeout(function () { window.location.reload(); }, 5);
						
					});
				
				}			
			},
			
			setMarketPlaceAjax : function(marketplaceCode) {
				$.ajax({
					url: "http://remote-rest.demo.qalingo.com/rest/cms/marketplace/set/" + marketplaceCode,
					success : function(data) {
						plugins.HeaderContext.reloadHtml(data);
					},
					error: function (jqXHR, textStatus, errorThrown){
						//alert('error: ' + jqXHR.status + ' : ' + textStatus + ' : ' + errorThrown);
					}
				});
			},
			
			setMarketAjax : function(marketCode) {
				$.ajax({
					url: "http://remote-rest.demo.qalingo.com/rest/cms/market/set/" + marketCode,
					success : function(data) {
						plugins.HeaderContext.reloadHtml(data);
					},
					error: function (jqXHR, textStatus, errorThrown){
						//alert('error: ' + jqXHR.status + ' : ' + textStatus + ' : ' + errorThrown);
					}
				});
			},
			
			setMarketAreaAjax : function(marketAreaCode) {
				$.ajax({
					url: "http://remote-rest.demo.qalingo.com/rest/cms/marketarea/set/" + marketAreaCode,
					success : function(data) {
						plugins.HeaderContext.reloadHtml(data);
					},
					error: function (jqXHR, textStatus, errorThrown){
						//alert('error: ' + jqXHR.status + ' : ' + textStatus + ' : ' + errorThrown);
					}
				});
			},
			
			setLocalizationAjax : function(marketAreaCode, retailerCode, localizationCode) {
				$.ajax({
					url: "http://remote-rest.demo.qalingo.com/rest/cms/localization/set/" + marketAreaCode + "/" + retailerCode + "/" + localizationCode,
					success : function(data) {
							plugins.HeaderContext.reloadHtml(data);
					},
					
					error: function (jqXHR, textStatus, errorThrown){
						//alert('error: ' + jqXHR.status + ' : ' + textStatus + ' : ' + errorThrown);
					}
				});
			},
			
			setRetailerAjax : function(marketAreaCode, retailerCode, localizationCode) {
				$.ajax({
					url: "http://remote-rest.demo.qalingo.com/rest/cms/retailer/set/" + marketAreaCode + "/" + retailerCode + "/" + localizationCode,
					success : function(data) {
						plugins.HeaderContext.reloadHtml(data);
					},
					error: function (jqXHR, textStatus, errorThrown){
						//alert('error: ' + jqXHR.status + ' : ' + textStatus + ' : ' + errorThrown);
					}
				});
			},
			
			reloadHtml : function(data) {
				
				plugins.HeaderContext.loadMarketPlacesHtml(data.marketPlaces);
				plugins.HeaderContext.loadMarketsHtml(data.markets);
				plugins.HeaderContext.loadMarketAreasHtml(data.marketAreas);
				plugins.HeaderContext.loadLocalizationsHtml(data.localizations);
				plugins.HeaderContext.loadRetailersHtml(data.retailers);
			},

			loadMarketPlacesHtml : function(marketPlaces) {
				if(marketPlaces != null){
					$.each(marketPlaces, function(i, marketPlace){
						if(marketPlace.selected){
						}
					});
				}
			},
			
			loadMarketsHtml : function(markets) {
				html = '';
				if(markets != null){
					$.each(markets, function(i, market){
						
						  if(market.selected) {	
							html = html + '<option value="' + market.code + '" selected>' + market.name + '</option>';
						} else {
							html = html + '<option value="' + market.code + '">' + market.name + '</option>';
						}
					});
				}
				$('#market-list').html(html);
			},
			
			loadMarketAreasHtml : function(marketAreas) {
				html = '';
				if(marketAreas != null){
					$.each(marketAreas, function(i, marketArea){
						
						  if(marketArea.selected) {	
							html = html + '<option value="' + marketArea.code + '" selected>' + marketArea.name + '</option>';
						} else {
							html = html + '<option value="' + marketArea.code + '">' + marketArea.name + '</option>';
						}
					});
				}
				$('#market-area-list').html(html);
			},
			
			loadLocalizationsHtml : function(localizations) {
				html = '';
				if(localizations != null){
					$.each(localizations, function(i, localization){
						
					      if(localization.selected) { 		
							html = html + '<option value="' + localization.code + '" selected>' + localization.name + '</option>';
						} else {
							html = html + '<option value="' + localization.code + '">' + localization.name + '</option>';
						}
					});
				}
				$('#localization-list').html(html);
			},
		
			loadRetailersHtml : function(retailers) {
				html = '';
				if(retailers != null){
					$.each(retailers, function(i, retailer){
						
						  if(retailer.selected) {	
							html = html + '<option value="' + retailer.code + '" selected>' + retailer.name + '</option>';
						} else {
							html = html + '<option value="' + retailer.code + '">' + retailer.name + '</option>';
						}
					});
				}
				$('#retailer-list').html(html);
			},
			
		};
		
		})( window.plugins = window.plugins || {} );

	</script>

	
   <div id="share-header"></div>
</@>
