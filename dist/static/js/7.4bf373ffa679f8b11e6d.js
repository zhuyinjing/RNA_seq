webpackJsonp([7],{"/JQZ":function(t,e){},ZUBa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("uhAC"),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[a("el-aside",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.appmenuShow,expression:"$store.state.appmenuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"}},[a("appLeftMenu")],1),t._v(" "),a("el-main",[a("appImgMenuShowComp"),t._v(" "),a("div",[a("h2",[t._v("基因差异表达热图")]),t._v(" "),a("p",[t._v("差异表达基因热图，可以通过颜色深浅来直观显示不同实验条件下基因表达的差异，并且可以较直观的显示出不同实验条件下调基因调控模式（表达谱）的差异。默认的配色方案为绿色代表较低的表达水平，红色代表较高的表达水平，黑色代表中间表达水平。用户可以点击左上角的色条更改配色方案。HeatMap 左侧的树状结构表示基因聚类的结果，表达趋势越接近的基因，在树状结构图中的位置也更接近。HeatMap 上方的树状结构图表示样本聚类的结果，基因表达模式更接近的样本，在数据结构图中的位置更接近。HeatMap 的输入数据为样本间差异表达基因列表中前 100 个基因的 TPM 值，基因距离和样本距离的计算采用欧式距离，基因和样本间的 linkage 计算方法为 ward，使用工具为 Inchlib，参考文献:")]),t._v(" "),a("p",[t._v("Škuta, C., Bartůněk, P., Svozil, D. InCHlib – interactive cluster heatmap for web applications. Journal of Cheminformatics 2014, 6 (44), DOI: 10.1186/s13321-014-0044-4 ["),a("a",{attrs:{href:"http://www.jcheminf.com/content/6/1/44",target:"_blank"}},[t._v("全文链接")]),t._v("]]")]),t._v(" "),a("div",{staticStyle:{display:"flex"}},[a("div",{staticStyle:{float:"left",width:"900px"}},[a("div",{attrs:{id:"microarrays_dendrogram"}})]),t._v(" "),a("div",{staticClass:"margin-top-200",staticStyle:{float:"left",width:"800px"},attrs:{class:"margin-top-200"}},[a("div",{attrs:{id:"boxplot"}})])]),t._v(" "),a("div",{staticStyle:{clear:"both"}}),t._v(" "),t.textarea?a("div",{},[a("p",[t._v("WARN：下列基因在所选择的项目及样本中无表达信息，这可能是由于这些基因在所选择的样本中表达水平过低导致的")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:10,placeholder:""},model:{value:t.textarea,callback:function(e){t.textarea=e},expression:"textarea"}})],1):t._e()])],1)],1)},staticRenderFns:[]};var o=function(t){a("fjPg"),a("/JQZ")},i=a("VU/8")(r.a,n,!1,o,"data-v-3fc9a755",null);e.default=i.exports},fjPg:function(t,e){},uhAC:function(t,e,a){"use strict";(function(t){var r=a("f4AQ"),n=(a.n(r),a("GooH")),o=a("Ck+T"),i=a("nER5"),s=a.n(i);e.a={data:()=>({arr:[],value:[],sortValue:[],idShow:!1,visible:"hidden",height:5,data:[],textarea:null}),components:{appLeftMenu:n.a,appImgMenuShowComp:o.a},watch:{$route:"routerChange"},created(){this.$store.state.heatmapJson.heatmap_json_string=JSON.parse(this.$store.state.heatmapJson.heatmap_json_string),this.$store.state.heatmapJson.invalidGeneList&&(this.textarea=this.$store.state.heatmapJson.invalidGeneList.join("\n"))},mounted(){this.initchart()},methods:{routerChange(){this.$store.state.heatmapJson.heatmap_json_string=JSON.parse(this.$store.state.heatmapJson.heatmap_json_string),this.initchart()},initchart(){let e=this.$store.state.heatmapJson.stages,a=(this.$store.state.heatmapJson.genes,this.$store.state.heatmapJson.heatmap_json_string);window.boxplot=new s.a.Chart({chart:{renderTo:"boxplot",type:"boxplot",height:400,width:e.length>10?30*e.length:400},credits:{enabled:!1},title:{text:"当前基因表达量"},legend:{enabled:!1},exporting:{enabled:!1},xAxis:{categories:e,title:{text:"Sample Types"}},yAxis:{title:{text:"Read Counts"}},plotOptions:{boxplot:{color:"#000000",fillColor:"#F0F0E0",lineWidth:2,medianColor:"#0C5DA5",medianWidth:3,stemColor:"#A63400",stemDashStyle:"dot",stemWidth:1,whiskerColor:"#3D9200",whiskerLength:"20%",whiskerWidth:3}},series:[{name:"Read Counts",data:[]}]});var r=t("#microarrays_dendrogram"),n=r.offset(),o=n.top+100,i=(n.left,t("#microarrays"));window.dendrogram=new InCHlib({target:"microarrays_dendrogram",metadata:!0,column_metadata:!0,min_row_height:5,max_column_width:50,max_height:5,heatmap_colors:"GrBkRd",metadata_colors:"RdLrBu",column_dendrogram:!0,max_percentile:90,min_percentile:10,independent_columns:!1,heatmap_part_width:.7,width:900});var d=null,h=[],l=[];function m(t,a,n){l=a;var s=dendrogram.header;if(0===l.length)for(p=0;p<s.length;p++)l.push(p);i.hide();for(var d={},h=0;h<e.length;++h)d[e[h]]=[];var m,p,c,_,u,v=o+r.height()-dendrogram.footer_height,f=dendrogram.column_metadata.features[0];for(n=(n=n+400>v?v-400:n-100)<o?o:n,i.css({top:n}),m=0;m<t.length;m++)for(_=dendrogram.objects2leaves[t[m]],c=dendrogram.data.nodes[_].features,boxplot.setTitle({text:dendrogram.data.nodes[_].objects[0]}),p=0;p<l.length;p++)d[f[u=l[p]]].push(c[u]);for(t.length>1&&boxplot.setTitle({text:"多个基因"});boxplot.series.length>0;)boxplot.series[0].remove(!0);for(var w=[],x=0;x<e.length;++x)d[e[x]]&&d[e[x]].length?w.push(g(d[e[x]])):w.push([0,0,0,0,0]);boxplot.addSeries({data:w,name:"Average Signal"},!0),i.show()}function g(t){var e,a,r,n,o;t.sort(function(t,e){return t-e});var i=t.length;e=t[0],a=t[i-1];var s=dendrogram._hack_round(i/2),d=dendrogram._hack_round(i/4);return r=t[s],n=t[s-d],o=t[s+d],t.length<4&&(o=a),[e,n,r,o,a]}dendrogram.add_color_scale("GrBkRd",{start:{r:35,g:139,b:69},middle:{r:0,g:0,b:0},end:{r:215,g:25,b:28}}),dendrogram.events.row_onclick=function(t,e){d=t[0],m(h=t,l,e.pageY),dendrogram.highlight_rows(h),dendrogram.unhighlight_cluster()},dendrogram.events.dendrogram_node_onclick=function(t,e,a){var r;for(m(h=t,l,a.pageY),r=0;r<t.length;r++)if(t[r]==d)return;dendrogram.highlight_rows([])},dendrogram.events.column_dendrogram_node_highlight=function(t,e){m(h,t,0)},dendrogram.events.column_dendrogram_node_unhighlight=function(){m(h,l=[],0)},dendrogram.events.on_zoom=function(t){i.css({top:o})},dendrogram.events.empty_space_onclick=function(){dendrogram.highlight_rows([])},dendrogram.read_data(a),dendrogram.draw(),m(h,l,o),dendrogram.highlight_rows(h)}}}}).call(e,a("7t+N"))}});
//# sourceMappingURL=7.4bf373ffa679f8b11e6d.js.map