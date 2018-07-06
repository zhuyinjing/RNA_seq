webpackJsonp([5],{"/D4Y":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("KUXU"),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("leftMenu",{staticStyle:{float:"left",width:"300px","margin-top":"10px"}}),t._v(" "),a("div",{staticClass:"content"},[a("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"report"}}},[t._v("项目 "+t._s(t.$store.state.projectName))]),t._v(" "),a("el-breadcrumb-item",[t._v("富集分析详情")])],1),t._v(" "),a("h2",[t._v("富集分析详情 "+t._s(t.$store.state._case)+" vs "+t._s(t.$store.state._control)+" ")]),t._v(" "),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"输入基因列表",name:"输入基因列表"}},[a("div",{staticClass:"geneListTableDiv"},[a("table",{staticClass:"gridtable",attrs:{id:"geneListTable"}},[a("tr",[a("th",[t._v("Id")]),a("th",[t._v("Name")])]),t._v(" "),t._l(t.idList,function(e,s){return a("tr",[a("td",{class:{bgcolor:s%2!=0}},[t._v(t._s(e.id))]),t._v(" "),a("td",{class:{bgcolor:s%2!=0}},[t._v(t._s(e.name))])])})],2)])]),t._v(" "),a("el-tab-pane",{attrs:{label:"KEGG",name:"KEGG"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example0"}},[a("thead",[a("tr",[a("td"),t._v(" "),a("td",[t._v("ID")]),t._v(" "),a("td",[t._v("Term")]),t._v(" "),a("td",[t._v("GeneRatio")]),t._v(" "),a("td",[t._v("BgRatio")]),t._v(" "),a("td",[t._v("log2foldE")]),t._v(" "),a("td",[t._v("pvalue")]),t._v(" "),a("td",[t._v("p.adjust")]),t._v(" "),a("td",[t._v("qvalue")]),t._v(" "),a("td",[t._v("geneID")]),t._v(" "),a("td",[t._v("Count")])])])])]),t._v(" "),a("el-tab-pane",{attrs:{label:"转录因子",name:"转录因子"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example1"}},[a("thead",[a("tr",[a("td"),t._v(" "),a("td",[t._v("ID")]),t._v(" "),a("td",[t._v("Biosample_term_name")]),t._v(" "),a("td",[t._v("Biosample_type")]),t._v(" "),a("td",[t._v("Biosample_life_stage")]),t._v(" "),a("td",[t._v("Biosample_sex")]),t._v(" "),a("td",[t._v("Biosample_age")]),t._v(" "),a("td",[t._v("Experiment_target")]),t._v(" "),a("td",[t._v("GeneRatio")]),t._v(" "),a("td",[t._v("BgRatio")]),t._v(" "),a("td",[t._v("log2foldE")]),t._v(" "),a("td",[t._v("pvalue")]),t._v(" "),a("td",[t._v("p.adjust")]),t._v(" "),a("td",[t._v("qvalue")]),t._v(" "),a("td",[t._v("geneID")]),t._v(" "),a("td",[t._v("Count")])])])])]),t._v(" "),a("el-tab-pane",{attrs:{label:"GO（level3）",name:"level3.GO"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example2"}},[a("thead",[a("tr",[a("td"),t._v(" "),a("td",[t._v("ID")]),t._v(" "),a("td",[t._v("Term")]),t._v(" "),a("td",[t._v("Ontology")]),t._v(" "),a("td",[t._v("GeneRatio")]),t._v(" "),a("td",[t._v("BgRatio")]),t._v(" "),a("td",[t._v("log2foldE")]),t._v(" "),a("td",[t._v("pvalue")]),t._v(" "),a("td",[t._v("p.adjust")]),t._v(" "),a("td",[t._v("qvalue")]),t._v(" "),a("td",[t._v("geneID")]),t._v(" "),a("td",[t._v("Count")])])])])]),t._v(" "),a("el-tab-pane",{attrs:{label:"GO（level4）",name:"level4.GO"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example3"}},[a("thead",[a("tr",[a("td"),t._v(" "),a("td",[t._v("ID")]),t._v(" "),a("td",[t._v("Term")]),t._v(" "),a("td",[t._v("Ontology")]),t._v(" "),a("td",[t._v("GeneRatio")]),t._v(" "),a("td",[t._v("BgRatio")]),t._v(" "),a("td",[t._v("log2foldE")]),t._v(" "),a("td",[t._v("pvalue")]),t._v(" "),a("td",[t._v("p.adjust")]),t._v(" "),a("td",[t._v("qvalue")]),t._v(" "),a("td",[t._v("geneID")]),t._v(" "),a("td",[t._v("Count")])])])])]),t._v(" "),a("el-tab-pane",{attrs:{label:"GO（level5）",name:"level5.GO"}},[a("table",{staticClass:"display",attrs:{cellpadding:"0",width:"100%",cellspacing:"0",border:"0",id:"example4"}},[a("thead",[a("tr",[a("td"),t._v(" "),a("td",[t._v("ID")]),t._v(" "),a("td",[t._v("Term")]),t._v(" "),a("td",[t._v("Ontology")]),t._v(" "),a("td",[t._v("GeneRatio")]),t._v(" "),a("td",[t._v("BgRatio")]),t._v(" "),a("td",[t._v("log2foldE")]),t._v(" "),a("td",[t._v("pvalue")]),t._v(" "),a("td",[t._v("p.adjust")]),t._v(" "),a("td",[t._v("qvalue")]),t._v(" "),a("td",[t._v("geneID")]),t._v(" "),a("td",[t._v("Count")])])])])])],1)],1)],1)},staticRenderFns:[]};var l=function(t){a("taWc"),a("qCo0")},i=a("VU/8")(s.a,r,!1,l,"data-v-185b0702",null);e.default=i.exports},KUXU:function(t,e,a){"use strict";(function(t){var s=a("Oj91");e.a={data:()=>({activeName:"输入基因列表",head0:[],tbval0:[],tbval1:[],tbval2:[],tbval3:[],tbval4:[],TFvalue:null,idList:null}),components:{leftMenu:s.a},watch:{$route:"resetTable"},mounted(){this.handleClick2()},methods:{resetTable(){t.fn.dataTable.isDataTable("#example0")&&(t("#example0").DataTable().destroy(),t("#example1").DataTable().destroy(),t("#example2").DataTable().destroy(),t("#example3").DataTable().destroy(),t("#example4").DataTable().destroy()),this.handleClick2()},handleClick(t,e){"转录因子"===t.label&&(this.TFvalue||this.$message({message:"由于网络传输速度较慢，数据正在加载，请稍等...",type:"warning"}))},handleClick2(){this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=id_list&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(t=>{"success"===t.data.message_type&&(this.idList=t.data.message)}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=KEGG&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(e=>{if("success"===e.data.message_type){var a=t("#example0").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[5],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[6],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[7],mRender:function(t){return Number(t).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[9]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:e.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(e,a,s){t("td:eq(0)",e).addClass("details-control").html("")}});var s=[];t("#example0 tbody").on("click","tr td.details-control",function(){var e,r=t(this).closest("tr"),l=a.row(r),i=t.inArray(r.attr("id"),s);l.child.isShown()?(r.removeClass("details"),l.child.hide(),s.splice(i,1)):(r.addClass("details"),l.child((e=l.data(),"<div>geneID: "+e[8].replace(/\//g," ")+"</div>")).show(),-1===i&&s.push(r.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=TF&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(e=>{if("success"===e.data.message_type){this.TFvalue=e.data.message;var a=t("#example1").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[10],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[11],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[12],mRender:function(t){return Number(t).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[14]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:e.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10},{mData:11},{mData:12},{mData:13},{mData:14}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(e,a,s){t("td:eq(0)",e).addClass("details-control").html("")}});var s=[];t("#example1 tbody").on("click","tr td.details-control",function(){var e,r=t(this).closest("tr"),l=a.row(r),i=t.inArray(r.attr("id"),s);l.child.isShown()?(r.removeClass("details"),l.child.hide(),s.splice(i,1)):(r.addClass("details"),l.child((e=l.data(),"<div>geneID: "+e[13].replace(/\//g," ")+"</div>")).show(),-1===i&&s.push(r.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=level_3.GO&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(e=>{if("success"===e.data.message_type){var a=t("#example2").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[6],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[7],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[8],mRender:function(t){return Number(t).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[10]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:e.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(e,a,s){t("td:eq(0)",e).addClass("details-control").html("")}});var s=[];t("#example2 tbody").on("click","tr td.details-control",function(){var e,r=t(this).closest("tr"),l=a.row(r),i=t.inArray(r.attr("id"),s);l.child.isShown()?(r.removeClass("details"),l.child.hide(),s.splice(i,1)):(r.addClass("details"),l.child((e=l.data(),"<div>geneID: "+e[9].replace(/\//g," ")+"</div>")).show(),-1===i&&s.push(r.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=level_4.GO&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(e=>{if("success"===e.data.message_type){var a=t("#example3").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[6],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[7],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[8],mRender:function(t){return Number(t).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[10]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:e.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(e,a,s){t("td:eq(0)",e).addClass("details-control").html("")}});var s=[];t("#example3 tbody").on("click","tr td.details-control",function(){var e,r=t(this).closest("tr"),l=a.row(r),i=t.inArray(r.attr("id"),s);l.child.isShown()?(r.removeClass("details"),l.child.hide(),s.splice(i,1)):(r.addClass("details"),l.child((e=l.data(),"<div>geneID: "+e[9].replace(/\//g," ")+"</div>")).show(),-1===i&&s.push(r.attr("id")))})}}),this.axios.get("/server/enrich?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&type=level_5.GO&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(e=>{if("success"===e.data.message_type){var a=t("#example4").DataTable({aoColumnDefs:[{bSortable:!1,aTargets:[0]},{aTargets:[6],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[7],mRender:function(t){return Number(t).toFixed(3)}},{aTargets:[8],mRender:function(t){return Number(t).toFixed(3)}},{bSortable:!1,visible:!1,aTargets:[10]}],aLengthMenu:[[25,50,100,-1],["每页25条","每页50条","每页100条","显示所有数据"]],iDisplayLength:25,aaData:e.data.message.slice(1),aoColumns:[{mData:null},{mData:0},{mData:1},{mData:2},{mData:3},{mData:4},{mData:5},{mData:6},{mData:7},{mData:8},{mData:9},{mData:10}],oLanguage:{oAria:{sSortAscending:" - click/return to sort ascending",sSortDescending:" - click/return to sort descending"},sZeroRecords:"对不起，查询不到任何相关数据",sEmptyTable:"未有相关数据",sLoadingRecords:"正在加载数据-请等待...",sProcessing:"<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",sUrl:""},fnCreatedRow:function(e,a,s){t("td:eq(0)",e).addClass("details-control").html("")}});var s=[];t("#example4 tbody").on("click","tr td.details-control",function(){var e,r=t(this).closest("tr"),l=a.row(r),i=t.inArray(r.attr("id"),s);l.child.isShown()?(r.removeClass("details"),l.child.hide(),s.splice(i,1)):(r.addClass("details"),l.child((e=l.data(),"<div>geneID: "+e[9].replace(/\//g," ")+"</div>")).show(),-1===i&&s.push(r.attr("id")))})}})},initTable(){}}}}).call(e,a("7t+N"))},qCo0:function(t,e){},taWc:function(t,e){}});
//# sourceMappingURL=5.db104bc801223b113caf.js.map