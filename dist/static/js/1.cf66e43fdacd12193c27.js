webpackJsonp([1],{"6kd0":function(e,t){},"8+gK":function(e,t,a){"use strict";var s=a("FrPU"),o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{},[a("transition",{attrs:{name:"fade"}},[a("div",{},[a("table",{directives:[{name:"show",rawName:"v-show",value:e.tableShow,expression:"tableShow"}],staticClass:"display",attrs:{id:"example",cellspacing:"0",width:"100%"}},[a("thead",[a("tr",[a("th",[a("input",{staticClass:"inputcheckbox",attrs:{type:"checkbox",name:"select_all"},domProps:{checked:e.data.length===e.$store.state.checked.length},on:{click:e.checkedAll}})]),e._v(" "),a("th",[e._v("target_id")]),e._v(" "),a("th",[e._v("name")]),e._v(" "),a("th",[e._v("description")]),e._v(" "),a("th",[e._v("type")]),e._v(" "),a("th",[e._v("baseMean")]),e._v(" "),a("th",[e._v("log2FoldChange")]),e._v(" "),a("th",[e._v("pvalue")]),e._v(" "),a("th",[e._v("FDR")])])]),e._v(" "),a("tbody",e._l(e.data,function(t,s){return a("tr",[a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.$store.state.checked,expression:"$store.state.checked"}],staticClass:"inputcheckbox",attrs:{type:"checkbox",name:""},domProps:{value:s,checked:Array.isArray(e.$store.state.checked)?e._i(e.$store.state.checked,s)>-1:e.$store.state.checked},on:{change:function(t){var a=e.$store.state.checked,o=t.target,l=!!o.checked;if(Array.isArray(a)){var i=s,n=e._i(a,i);o.checked?n<0&&e.$set(e.$store.state,"checked",a.concat([i])):n>-1&&e.$set(e.$store.state,"checked",a.slice(0,n).concat(a.slice(n+1)))}else e.$set(e.$store.state,"checked",l)}}})]),e._v(" "),a("td",[e._v(e._s(t.target_id))]),e._v(" "),a("td",[e._v(e._s(t.name))]),e._v(" "),a("td",[e._v(e._s(t.description))]),e._v(" "),a("td",[e._v(e._s(t.type))]),e._v(" "),a("td",[e._v(e._s(e.numFormat(t.baseMean)))]),e._v(" "),a("td",[e._v(e._s(t.log2FoldChange))]),e._v(" "),a("td",[e._v(e._s(t.pvalue))]),e._v(" "),a("td",[e._v(e._s(t.padj))])])}))])])])],1)},staticRenderFns:[]};var l=function(e){a("X6KH")},i=a("VU/8")(s.a,o,!1,l,"data-v-12f94458",null);t.a=i.exports},FrPU:function(e,t,a){"use strict";(function(e){t.a={data:()=>({data:[],tableShow:!1,isCheckedAll:!1}),components:{},mounted(){this.getTabelValue()},watch:{$route:"getTabelValueReset"},methods:{numFormat(e){for(var t=(e=e.toString().split("."))[0].split("").reverse(),a=[],s=0,o=t.length;s<o;s++)s%3==0&&0!==s&&a.push(","),a.push(t[s]);return a.reverse(),a=e[1]?a.join("").concat("."+e[1]):a.join("")},checkedAll(){if(this.data.length!==this.$store.state.checked.length&&!0===this.isCheckedAll?this.isCheckedAll=!0:this.isCheckedAll=!this.isCheckedAll,this.isCheckedAll){this.$store.state.checked=[];for(let e=0;e<this.data.length;e++)this.$store.state.checked.push(e)}else this.$store.state.checked=[]},getTabelValueReset(){let t=document.getElementsByClassName("inputcheckbox");for(let e=0;e<t.length;e++)t[e].checked=!1;(this.data=[],this.$store.state.checked=[],this.tableShow=!1,e.fn.dataTable.isDataTable("#example"))&&e("#example").DataTable().destroy();this.getTabelValue()},initTable(t){let a=this;this.data=t,e(document).ready(function(){e("#example").DataTable({lengthMenu:[[25,50,100,-1],[25,50,100,"All"]],pageLength:25,columnDefs:[{targets:0,orderable:!1,className:"dt-body-center"}],order:[]}),a.tableShow=!0})},getTabelValue(){let e=sessionStorage.getItem("_case"),t=sessionStorage.getItem("_control");this.axios.get("/server/deg?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&_case="+e+"&_control="+t+"&sig_only=true").then(e=>{if("success"===e.data.message_type){for(let t=0;t<e.data.message.data.length;t++)e.data.message.data[t].baseMean=parseFloat(e.data.message.data[t].baseMean).toFixed(3)-0,e.data.message.data[t].log2FoldChange=parseFloat(e.data.message.data[t].log2FoldChange).toFixed(3)-0,e.data.message.data[t].pvalue=parseFloat(e.data.message.data[t].pvalue).toFixed(3)-0,e.data.message.data[t].padj=parseFloat(e.data.message.data[t].padj).toFixed(3)-0;this.initTable(e.data.message.data)}else this.$message.error(e.data.message)})},backProjectList(){this.$router.push({name:"report"})}}}}).call(t,a("7t+N"))},JlFv:function(e,t,a){"use strict";(function(e){var s=a("Oj91"),o=a("8+gK"),l=a("SH1Y"),i=a("K0Oa"),n=a("f4AQ"),r=(a.n(n),a("nER5")),c=a.n(r);t.a={data:()=>({arr:[],value:[],sortValue:[],idShow:!1,visible:"hidden",height:5,optionProject:["RNASeq"],project:"RNASeq",row_distance:"euclidean",row_linkage:"ward",column_distance:"euclidean",column_linkage:"ward",data:[],checked:[],optionsVisible:!1,textareaGeneList:null}),components:{leftMenu:s.a,degTable:o.a,degComp:l.a,imgMenuShowComp:i.a},watch:{$route:"routerChange"},created(){this.$store.state.heatmapJson.heatmap_json_string=JSON.parse(this.$store.state.heatmapJson.heatmap_json_string)},mounted(){this.initchart()},methods:{routerChange(){this.$store.state.heatmapJson.heatmap_json_string=JSON.parse(this.$store.state.heatmapJson.heatmap_json_string),this.initchart()},draw(){},initchart(){let t=this.$store.state.heatmapJson.stages,a=(this.$store.state.heatmapJson.genes,this.$store.state.heatmapJson.heatmap_json_string);window.boxplot=new c.a.Chart({chart:{renderTo:"boxplot",type:"boxplot",height:400,width:t.length>10?30*t.length:400},credits:{enabled:!1},title:{text:"当前基因表达量"},legend:{enabled:!1},exporting:{enabled:!1},xAxis:{categories:t,title:{text:"Sample Types"}},yAxis:{title:{text:"Read Counts"}},plotOptions:{boxplot:{color:"#000000",fillColor:"#F0F0E0",lineWidth:2,medianColor:"#0C5DA5",medianWidth:3,stemColor:"#A63400",stemDashStyle:"dot",stemWidth:1,whiskerColor:"#3D9200",whiskerLength:"20%",whiskerWidth:3}},series:[{name:"Read Counts",data:[]}]});var s=e("#microarrays_dendrogram"),o=s.offset(),l=o.top+100,i=(o.left,e("#microarrays"));window.dendrogram=new InCHlib({target:"microarrays_dendrogram",metadata:!0,column_metadata:!0,min_row_height:5,max_column_width:50,max_height:5,heatmap_colors:"GrBkRd",metadata_colors:"RdLrBu",column_dendrogram:!0,max_percentile:90,min_percentile:10,independent_columns:!1,heatmap_part_width:.7,width:900});var n=null,r=[],d=[];function v(e,a,o){d=a;var n=dendrogram.header;if(0===d.length)for(h=0;h<n.length;h++)d.push(h);i.hide();for(var r={},c=0;c<t.length;++c)r[t[c]]=[];var v,h,u,p,m,g=l+s.height()-dendrogram.footer_height,b=dendrogram.column_metadata.features[0];for(o=(o=o+400>g?g-400:o-100)<l?l:o,i.css({top:o}),v=0;v<e.length;v++)for(p=dendrogram.objects2leaves[e[v]],u=dendrogram.data.nodes[p].features,boxplot.setTitle({text:dendrogram.data.nodes[p].objects[0]}),h=0;h<d.length;h++)r[b[m=d[h]]].push(u[m]);for(e.length>1&&boxplot.setTitle({text:"多个基因"});boxplot.series.length>0;)boxplot.series[0].remove(!0);for(var k=[],f=0;f<t.length;++f)r[t[f]]&&r[t[f]].length?k.push(_(r[t[f]])):k.push([0,0,0,0,0]);boxplot.addSeries({data:k,name:"Average Signal"},!0),i.show()}function _(e){var t,a,s,o,l;e.sort(function(e,t){return e-t});var i=e.length;t=e[0],a=e[i-1];var n=dendrogram._hack_round(i/2),r=dendrogram._hack_round(i/4);return s=e[n],o=e[n-r],l=e[n+r],e.length<4&&(l=a),[t,o,s,l,a]}dendrogram.add_color_scale("GrBkRd",{start:{r:35,g:139,b:69},middle:{r:0,g:0,b:0},end:{r:215,g:25,b:28}}),dendrogram.events.row_onclick=function(e,t){n=e[0],v(r=e,d,t.pageY),dendrogram.highlight_rows(r),dendrogram.unhighlight_cluster()},dendrogram.events.dendrogram_node_onclick=function(e,t,a){var s;for(v(r=e,d,a.pageY),s=0;s<e.length;s++)if(e[s]==n)return;dendrogram.highlight_rows([])},dendrogram.events.column_dendrogram_node_highlight=function(e,t){v(r,e,0)},dendrogram.events.column_dendrogram_node_unhighlight=function(){v(r,d=[],0)},dendrogram.events.on_zoom=function(e){i.css({top:l})},dendrogram.events.empty_space_onclick=function(){dendrogram.highlight_rows([])},dendrogram.read_data(a),dendrogram.draw(),v(r,d,l),dendrogram.highlight_rows(r)}}}}).call(t,a("7t+N"))},X6KH:function(e,t){},Yts5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("JlFv"),o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[a("el-aside",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.menuShow,expression:"$store.state.menuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"},attrs:{width:"350px;"}},[a("leftMenu",{staticStyle:{"margin-top":"5px"}})],1),e._v(" "),a("el-main",[a("imgMenuShowComp"),e._v(" "),a("degComp"),e._v(" "),a("div",{},[a("div",{staticClass:"container"},[a("p",[e._v("差异表达基因热图，可以通过颜色深浅来直观显示不同实验条件下基因表达的差异，并且可以较直观的显示出不同实验条件下调基因调控模式（表达谱）的差异。默认的配色方案为绿色代表较低的表达水平，红色代表较高的表达水平，黑色代表中间表达水平。用户可以点击左上角的色条更改配色方案。HeatMap 左侧的树状结构表示基因聚类的结果，表达趋势越接近的基因，在树状结构图中的位置也更接近。HeatMap 上方的树状结构图表示样本聚类的结果，基因表达模式更接近的样本，在数据结构图中的位置更接近。HeatMap 的输入数据为样本间差异表达基因列表中前 100 个基因的 TPM 值，基因距离和样本距离的计算采用欧式距离，基因和样本间的 linkage 计算方法为 ward，使用工具为 Inchlib，参考文献:")]),e._v(" "),a("p",[e._v("Škuta, C., Bartůněk, P., Svozil, D. InCHlib – interactive cluster heatmap for web applications. Journal of Cheminformatics 2014, 6 (44), DOI: 10.1186/s13321-014-0044-4 ["),a("a",{attrs:{href:"http://www.jcheminf.com/content/6/1/44",target:"_blank"}},[e._v("全文链接")]),e._v("]]")]),e._v(" "),a("div",{staticStyle:{display:"flex"}},[a("div",{staticStyle:{float:"left",width:"900px"}},[a("div",{attrs:{id:"microarrays_dendrogram"}})]),e._v(" "),a("div",{staticClass:"margin-top-200",staticStyle:{float:"left",width:"800px"},attrs:{class:"margin-top-200"}},[a("div",{attrs:{id:"boxplot"}})])]),e._v(" "),a("div",{staticStyle:{clear:"both"}}),e._v(" "),a("br"),e._v(" "),a("el-dialog",{attrs:{title:"选项",visible:e.optionsVisible,center:""},on:{"update:visible":function(t){e.optionsVisible=t}}},[a("div",{},[a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxpval"}},[e._v("基因距离计算方法")])]),e._v(" "),a("el-input",{staticStyle:{display:"inline-block",width:"50%"},attrs:{type:"textarea",rows:5,placeholder:"请输入基因，多个基因可以用逗号、空格或者换行符分隔"},model:{value:e.textareaGeneList,callback:function(t){e.textareaGeneList=t},expression:"textareaGeneList"}})],1),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxpval"}},[e._v("基因距离计算方法")])]),e._v(" "),a("el-select",{staticClass:"input-style",attrs:{placeholder:"请选择"},model:{value:e.row_distance,callback:function(t){e.row_distance=t},expression:"row_distance"}},[a("el-option",{attrs:{value:"euclidean"}},[e._v("euclidean")]),e._v(" "),a("el-option",{attrs:{value:"dice"}},[e._v("dice")]),e._v(" "),a("el-option",{attrs:{value:"hamming"}},[e._v("hamming")]),e._v(" "),a("el-option",{attrs:{value:"jaccard"}},[e._v("jaccard")]),e._v(" "),a("el-option",{attrs:{value:"kulsinski"}},[e._v("kulsinski")]),e._v(" "),a("el-option",{attrs:{value:"matching"}},[e._v("matching")]),e._v(" "),a("el-option",{attrs:{value:"rogerstanimoto"}},[e._v("rogerstanimoto")]),e._v(" "),a("el-option",{attrs:{value:"russellrao"}},[e._v("russellrao")]),e._v(" "),a("el-option",{attrs:{value:"sokalmichener"}},[e._v("sokalmichener")]),e._v(" "),a("el-option",{attrs:{value:"sokalsneath"}},[e._v("sokalsneath")]),e._v(" "),a("el-option",{attrs:{value:"yule"}},[e._v("yule")]),e._v(" "),a("el-option",{attrs:{value:"braycurtis"}},[e._v("braycurtis")]),e._v(" "),a("el-option",{attrs:{value:"canberra"}},[e._v("canberra")]),e._v(" "),a("el-option",{attrs:{value:"chebyshev"}},[e._v("chebyshev")]),e._v(" "),a("el-option",{attrs:{value:"cityblock"}},[e._v("cityblock")]),e._v(" "),a("el-option",{attrs:{value:"correlation"}},[e._v("correlation")]),e._v(" "),a("el-option",{attrs:{value:"cosine"}},[e._v("cosine")]),e._v(" "),a("el-option",{attrs:{value:"mahalanobis"}},[e._v("mahalanobis")]),e._v(" "),a("el-option",{attrs:{value:"minkowski"}},[e._v("minkowski")]),e._v(" "),a("el-option",{attrs:{value:"seuclidean"}},[e._v("seuclidean")]),e._v(" "),a("el-option",{attrs:{value:"sqeuclidean"}},[e._v("sqeuclidean")])],1)],1),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxfdr"}},[e._v("基因linkage计算方法")])]),e._v(" "),a("el-select",{staticClass:"input-style",attrs:{placeholder:"请选择"},model:{value:e.row_linkage,callback:function(t){e.row_linkage=t},expression:"row_linkage"}},[a("el-option",{attrs:{value:"ward"}},[e._v("ward")]),e._v(" "),a("el-option",{attrs:{value:"single"}},[e._v("single")]),e._v(" "),a("el-option",{attrs:{value:"complete"}},[e._v("complete")]),e._v(" "),a("el-option",{attrs:{value:"average"}},[e._v("average")]),e._v(" "),a("el-option",{attrs:{value:"weighted"}},[e._v("weighted")]),e._v(" "),a("el-option",{attrs:{value:"centroid"}},[e._v("centroid")]),e._v(" "),a("el-option",{attrs:{value:"median"}},[e._v("median")])],1)],1),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"minfc"}},[e._v("样本距离计算方法")])]),e._v(" "),a("el-select",{staticClass:"input-style",attrs:{placeholder:"请选择"},model:{value:e.column_distance,callback:function(t){e.column_distance=t},expression:"column_distance"}},[a("el-option",{attrs:{value:"euclidean"}},[e._v("euclidean")]),e._v(" "),a("el-option",{attrs:{value:"dice"}},[e._v("dice")]),e._v(" "),a("el-option",{attrs:{value:"hamming"}},[e._v("hamming")]),e._v(" "),a("el-option",{attrs:{value:"jaccard"}},[e._v("jaccard")]),e._v(" "),a("el-option",{attrs:{value:"kulsinski"}},[e._v("kulsinski")]),e._v(" "),a("el-option",{attrs:{value:"matching"}},[e._v("matching")]),e._v(" "),a("el-option",{attrs:{value:"rogerstanimoto"}},[e._v("rogerstanimoto")]),e._v(" "),a("el-option",{attrs:{value:"russellrao"}},[e._v("russellrao")]),e._v(" "),a("el-option",{attrs:{value:"sokalmichener"}},[e._v("sokalmichener")]),e._v(" "),a("el-option",{attrs:{value:"sokalsneath"}},[e._v("sokalsneath")]),e._v(" "),a("el-option",{attrs:{value:"yule"}},[e._v("yule")]),e._v(" "),a("el-option",{attrs:{value:"braycurtis"}},[e._v("braycurtis")]),e._v(" "),a("el-option",{attrs:{value:"canberra"}},[e._v("canberra")]),e._v(" "),a("el-option",{attrs:{value:"chebyshev"}},[e._v("chebyshev")]),e._v(" "),a("el-option",{attrs:{value:"cityblock"}},[e._v("cityblock")]),e._v(" "),a("el-option",{attrs:{value:"correlation"}},[e._v("correlation")]),e._v(" "),a("el-option",{attrs:{value:"cosine"}},[e._v("cosine")]),e._v(" "),a("el-option",{attrs:{value:"mahalanobis"}},[e._v("mahalanobis")]),e._v(" "),a("el-option",{attrs:{value:"minkowski"}},[e._v("minkowski")]),e._v(" "),a("el-option",{attrs:{value:"seuclidean"}},[e._v("seuclidean")]),e._v(" "),a("el-option",{attrs:{value:"sqeuclidean"}},[e._v("sqeuclidean")])],1)],1),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"radio-inline control-label"},[e._v("样本linkage计算方法")])]),e._v(" "),a("el-select",{staticClass:"input-style",attrs:{placeholder:"请选择"},model:{value:e.column_linkage,callback:function(t){e.column_linkage=t},expression:"column_linkage"}},[a("el-option",{attrs:{value:"ward"}},[e._v("ward")]),e._v(" "),a("el-option",{attrs:{value:"single"}},[e._v("single")]),e._v(" "),a("el-option",{attrs:{value:"complete"}},[e._v("complete")]),e._v(" "),a("el-option",{attrs:{value:"average"}},[e._v("average")]),e._v(" "),a("el-option",{attrs:{value:"weighted"}},[e._v("weighted")]),e._v(" "),a("el-option",{attrs:{value:"centroid"}},[e._v("centroid")]),e._v(" "),a("el-option",{attrs:{value:"median"}},[e._v("median")])],1)],1)]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.optionsVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.optionsVisible=!1}}},[e._v("确 定")])],1)])],1)])],1)],1)},staticRenderFns:[]};var l=function(e){a("6kd0"),a("bOAg")},i=a("VU/8")(s.a,o,!1,l,"data-v-57c450b4",null);t.default=i.exports},bOAg:function(e,t){}});
//# sourceMappingURL=1.cf66e43fdacd12193c27.js.map