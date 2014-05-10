<script type="text/javascript">//<![CDATA[
   new Alfresco.widget.DashletResizer("${args.htmlid}", "${instance.object.id}");
//]]></script>


<div class="dashlet">
	 <div id="${args.htmlid}" class="body scrollableList"<#-- if args.height??> style="height: ${args.height}px;"</#if -->>
		<table>
			<#list qalingoFichesList as qliste>
				<tr>
						<div  class="simple-view">
							<td><a href=${qliste.url}><img title=${qliste.name} src="/share/res/components/images/filetypes/generic-file-32.png"></a></td>
							<td>
								<div class="yui-dt-liner">
									<div id="yui-gen27" class="detail">
										<a class="theme-color-1" href=${qliste.url}>${qliste.name}</a>
									</div>
									
								</div>	
							</td>
						</div>
					</div>
				</tr>	
			</#list>
		</table>
	</div>
</div>