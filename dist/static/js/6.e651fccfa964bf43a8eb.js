webpackJsonp([6],{"/D4Y":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("KUXU"),r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[a("el-aside",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.menuShow,expression:"$store.state.menuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"},attrs:{width:"350px;"}},[a("leftMenu",{staticStyle:{"margin-top":"5px"}})],1),e._v(" "),a("el-main",[a("imgMenuShowComp"),e._v(" "),a("degComp"),e._v(" "),a("div",{},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"KEGG",name:"KEGG"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example0"}},[a("thead",[a("tr",[a("td"),e._v(" "),a("td",[e._v("ID")]),e._v(" "),a("td",[e._v("Term")]),e._v(" "),a("td",[e._v("GeneRatio")]),e._v(" "),a("td",[e._v("BgRatio")]),e._v(" "),a("td",[e._v("log2foldE")]),e._v(" "),a("td",[e._v("pvalue")]),e._v(" "),a("td",[e._v("p.adjust")]),e._v(" "),a("td",[e._v("qvalue")]),e._v(" "),a("td",[e._v("geneID")]),e._v(" "),a("td",[e._v("Count")])])])])]),e._v(" "),a("el-tab-pane",{attrs:{label:"转录因子",name:"转录因子"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example1"}},[a("thead",[a("tr",[a("td"),e._v(" "),a("td",[e._v("ID")]),e._v(" "),a("td",[e._v("Biosample_term_name")]),e._v(" "),a("td",[e._v("Biosample_type")]),e._v(" "),a("td",[e._v("Biosample_life_stage")]),e._v(" "),a("td",[e._v("Biosample_sex")]),e._v(" "),a("td",[e._v("Biosample_age")]),e._v(" "),a("td",[e._v("Experiment_target")]),e._v(" "),a("td",[e._v("GeneRatio")]),e._v(" "),a("td",[e._v("BgRatio")]),e._v(" "),a("td",[e._v("log2foldE")]),e._v(" "),a("td",[e._v("pvalue")]),e._v(" "),a("td",[e._v("p.adjust")]),e._v(" "),a("td",[e._v("qvalue")]),e._v(" "),a("td",[e._v("geneID")]),e._v(" "),a("td",[e._v("Count")])])])])]),e._v(" "),a("el-tab-pane",{attrs:{label:"GO（level3）",name:"level3.GO"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example2"}},[a("thead",[a("tr",[a("td"),e._v(" "),a("td",[e._v("ID")]),e._v(" "),a("td",[e._v("Term")]),e._v(" "),a("td",[e._v("Ontology")]),e._v(" "),a("td",[e._v("GeneRatio")]),e._v(" "),a("td",[e._v("BgRatio")]),e._v(" "),a("td",[e._v("log2foldE")]),e._v(" "),a("td",[e._v("pvalue")]),e._v(" "),a("td",[e._v("p.adjust")]),e._v(" "),a("td",[e._v("qvalue")]),e._v(" "),a("td",[e._v("geneID")]),e._v(" "),a("td",[e._v("Count")])])])])]),e._v(" "),a("el-tab-pane",{attrs:{label:"GO（level4）",name:"level4.GO"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example3"}},[a("thead",[a("tr",[a("td"),e._v(" "),a("td",[e._v("ID")]),e._v(" "),a("td",[e._v("Term")]),e._v(" "),a("td",[e._v("Ontology")]),e._v(" "),a("td",[e._v("GeneRatio")]),e._v(" "),a("td",[e._v("BgRatio")]),e._v(" "),a("td",[e._v("log2foldE")]),e._v(" "),a("td",[e._v("pvalue")]),e._v(" "),a("td",[e._v("p.adjust")]),e._v(" "),a("td",[e._v("qvalue")]),e._v(" "),a("td",[e._v("geneID")]),e._v(" "),a("td",[e._v("Count")])])])])]),e._v(" "),a("el-tab-pane",{attrs:{label:"GO（level5）",name:"level5.GO"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example4"}},[a("thead",[a("tr",[a("td"),e._v(" "),a("td",[e._v("ID")]),e._v(" "),a("td",[e._v("Term")]),e._v(" "),a("td",[e._v("Ontology")]),e._v(" "),a("td",[e._v("GeneRatio")]),e._v(" "),a("td",[e._v("BgRatio")]),e._v(" "),a("td",[e._v("log2foldE")]),e._v(" "),a("td",[e._v("pvalue")]),e._v(" "),a("td",[e._v("p.adjust")]),e._v(" "),a("td",[e._v("qvalue")]),e._v(" "),a("td",[e._v("geneID")]),e._v(" "),a("td",[e._v("Count")])])])])])],1)],1)],1)],1)},staticRenderFns:[]};var l=function(e){a("6mcS"),a("/RiD")},n=a("VU/8")(s.a,r,!1,l,"data-v-08e97d21",null);t.default=n.exports},"/RiD":function(e,t){},"6mcS":function(e,t){},KUXU:function(e,t,a){"use strict";(function(e){var s=a("Oj91"),r=a("SH1Y"),l=a("K0Oa");t.a={data:()=>({activeName:"KEGG",head0:[],tbval0:[],tbval1:[],tbval2:[],tbval3:[],tbval4:[],TFvalue:null,idList:null,deg:null}),components:{leftMenu:s.a,degComp:r.a,imgMenuShowComp:l.a},watch:{$route:"resetTable"},created(){sessionStorage.getItem("deg"+this.$store.state._case+this.$store.state._control)&&(this.deg=JSON.parse(sessionStorage.getItem("deg"+this.$store.state._case+this.$store.state._control)))},mounted(){this.handleClick2()},methods:{resetTable(){this.activeName="输入基因列表",e.fn.dataTable.isDataTable("#example0")&&(e("#example0").DataTable().destroy(),e("#example1").DataTable().destroy(),e("#example2").DataTable().destroy(),e("#example3").DataTable().destroy(),e("#example4").DataTable().destroy()),this.handleClick2()},handleClick(e,t){"转录因子"===e.label&&(this.TFvalue||this.$message({message:"由于网络传输速度较慢，数据正在加载，请稍等...",type:"warning"}))},handleClick2(){let t=this;this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=KEGG&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(a=>{if("success"===a.data.message_type){e("#example0").dataTable().fnDestroy();var s=e("#example0").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[5],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[6],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[7],mRender:function(e){return Number(e).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[9]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:a.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(t,a,s){e("td:eq(0)",t).addClass("details-control").html("")}});var r=[];e("#example0 tbody").off("click","tr td.details-control"),e("#example0 tbody").on("click","tr td.details-control",function(){var a=e(this).closest("tr"),l=s.row(a),n=e.inArray(a.attr("id"),r);l.child.isShown()?(a.removeClass("details"),l.child.hide(),r.splice(n,1)):(a.addClass("details"),l.child(function(e){let a="",s=e[8].split("/");for(let e=0;e<s.length;e++)for(let r=0;r<t.deg.length;r++)if(t.deg[r].target_id===s[e]){a=t.deg[r].log2FoldChange>0?a.concat(' <span class="red">'+t.deg[r].name+"</span> "):a.concat(' <span class="green">'+t.deg[r].name+"</span> ");break}return a}(l.data())).show(),-1===n&&r.push(a.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=TF&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(a=>{if("success"===a.data.message_type){this.TFvalue=a.data.message,e("#example1").dataTable().fnDestroy();var s=e("#example1").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[10],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[11],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[12],mRender:function(e){return Number(e).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[14]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:a.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10},{mData:11},{mData:12},{mData:13},{mData:14}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(t,a,s){e("td:eq(0)",t).addClass("details-control").html("")}});var r=[];e("#example1 tbody").off("click","tr td.details-control"),e("#example1 tbody").on("click","tr td.details-control",function(){var a=e(this).closest("tr"),l=s.row(a),n=e.inArray(a.attr("id"),r);l.child.isShown()?(a.removeClass("details"),l.child.hide(),r.splice(n,1)):(a.addClass("details"),l.child(function(e){let a="",s=e[13].split("/");for(let e=0;e<s.length;e++)for(let r=0;r<t.deg.length;r++)if(t.deg[r].target_id===s[e]){a=t.deg[r].log2FoldChange>0?a.concat(' <span class="red">'+t.deg[r].name+"</span> "):a.concat(' <span class="green">'+t.deg[r].name+"</span> ");break}return a}(l.data())).show(),-1===n&&r.push(a.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=level_3.GO&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(a=>{if("success"===a.data.message_type){e("#example2").dataTable().fnDestroy();var s=e("#example2").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[6],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[7],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[8],mRender:function(e){return Number(e).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[10]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:a.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(t,a,s){e("td:eq(0)",t).addClass("details-control").html("")}});var r=[];e("#example2 tbody").off("click","tr td.details-control"),e("#example2 tbody").on("click","tr td.details-control",function(){var a=e(this).closest("tr"),l=s.row(a),n=e.inArray(a.attr("id"),r);l.child.isShown()?(a.removeClass("details"),l.child.hide(),r.splice(n,1)):(a.addClass("details"),l.child(function(e){let a="",s=e[9].split("/");for(let e=0;e<s.length;e++)for(let r=0;r<t.deg.length;r++)if(t.deg[r].target_id===s[e]){a=t.deg[r].log2FoldChange>0?a.concat(' <span class="red">'+t.deg[r].name+"</span> "):a.concat(' <span class="green">'+t.deg[r].name+"</span> ");break}return a}(l.data())).show(),-1===n&&r.push(a.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=level_4.GO&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(a=>{if("success"===a.data.message_type){e("#example3").dataTable().fnDestroy();var s=e("#example3").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[6],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[7],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[8],mRender:function(e){return Number(e).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[10]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:a.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(t,a,s){e("td:eq(0)",t).addClass("details-control").html("")}});var r=[];e("#example3 tbody").off("click","tr td.details-control"),e("#example3 tbody").on("click","tr td.details-control",function(){var a=e(this).closest("tr"),l=s.row(a),n=e.inArray(a.attr("id"),r);l.child.isShown()?(a.removeClass("details"),l.child.hide(),r.splice(n,1)):(a.addClass("details"),l.child(function(e){let a="",s=e[9].split("/");for(let e=0;e<s.length;e++)for(let r=0;r<t.deg.length;r++)if(t.deg[r].target_id===s[e]){a=t.deg[r].log2FoldChange>0?a.concat(' <span class="red">'+t.deg[r].name+"</span> "):a.concat(' <span class="green">'+t.deg[r].name+"</span> ");break}return a}(l.data())).show(),-1===n&&r.push(a.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=level_5.GO&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(a=>{if("success"===a.data.message_type){e("#example4").dataTable().fnDestroy();var s=e("#example4").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[6],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[7],mRender:function(e){return Number(e).toFixed(3)}},{aTargets:[8],mRender:function(e){return Number(e).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[10]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:a.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(t,a,s){e("td:eq(0)",t).addClass("details-control").html("")}});var r=[];e("#example4 tbody").off("click","tr td.details-control"),e("#example4 tbody").on("click","tr td.details-control",function(){var a=e(this).closest("tr"),l=s.row(a),n=e.inArray(a.attr("id"),r);l.child.isShown()?(a.removeClass("details"),l.child.hide(),r.splice(n,1)):(a.addClass("details"),l.child(function(e){let a="",s=e[9].split("/");for(let e=0;e<s.length;e++)for(let r=0;r<t.deg.length;r++)if(t.deg[r].target_id===s[e]){a=t.deg[r].log2FoldChange>0?a.concat(' <span class="red">'+t.deg[r].name+"</span> "):a.concat(' <span class="green">'+t.deg[r].name+"</span> ");break}return a}(l.data())).show(),-1===n&&r.push(a.attr("id")))})}})},initTable(){}}}}).call(t,a("7t+N"))}});
//# sourceMappingURL=6.e651fccfa964bf43a8eb.js.map