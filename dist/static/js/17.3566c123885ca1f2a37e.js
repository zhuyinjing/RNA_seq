webpackJsonp([17],{DQaT:function(e,t){},T11f:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("jsl9"),i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[a("el-aside",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.menuShow,expression:"$store.state.menuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"},attrs:{width:"350px;"}},[a("leftMenu",{staticStyle:{"margin-top":"5px"}})],1),e._v(" "),a("el-main",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],attrs:{"element-loading-text":"数据正在加载中，大概需要1分钟左右的时间......"}},[a("imgMenuShowComp"),e._v(" "),a("degComp"),e._v(" "),a("div",{},[a("el-card",{staticStyle:{width:"900px"},attrs:{shadow:"hover"}},[a("div",{staticStyle:{display:"inline-block",width:"42%","vertical-align":"top"}},[a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxpval"}},[e._v("pvalue ≤")])]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.maxpval,expression:"maxpval"}],staticClass:"input-style",attrs:{type:"text",id:"maxpval",placeholder:e.originFilterArgs.pvalue},domProps:{value:e.maxpval},on:{input:function(t){t.target.composing||(e.maxpval=t.target.value)}}})]),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxfdr"}},[e._v("FDR ≤")])]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.maxfdr,expression:"maxfdr"}],staticClass:"input-style",attrs:{type:"text",id:"maxfdr",placeholder:e.originFilterArgs.FDR},domProps:{value:e.maxfdr},on:{input:function(t){t.target.composing||(e.maxfdr=t.target.value)}}})]),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"minfc"}},[e._v("log2FoldChange(绝对值) ≥")])]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.minfc,expression:"minfc"}],staticClass:"input-style",attrs:{type:"text",id:"minfc",placeholder:e.originFilterArgs.log2FoldChange},domProps:{value:e.minfc},on:{input:function(t){t.target.composing||(e.minfc=t.target.value)}}})])]),e._v(" "),a("div",{staticStyle:{display:"inline-block",width:"20%","vertical-align":"top"}},[a("div",{},[a("div",{},[a("label",{staticClass:"radio-inline control-label"},[e._v("type：")])]),e._v(" "),a("br"),e._v(" "),a("el-radio",{attrs:{label:"protein_coding"},model:{value:e.typeRadio,callback:function(t){e.typeRadio=t},expression:"typeRadio"}},[e._v("只显示编码基因")])],1),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"radio-inline control-label"})]),e._v(" "),a("br"),e._v(" "),a("el-radio",{attrs:{label:"all"},model:{value:e.typeRadio,callback:function(t){e.typeRadio=t},expression:"typeRadio"}},[e._v("显示所有类型基因")])],1)]),e._v(" "),a("div",{staticStyle:{display:"inline-block",width:"29%","vertical-align":"top"}},[a("div",{},[a("div",{},[a("label",{staticClass:"radio-inline control-label"},[e._v("显示：")])]),e._v(" "),a("el-checkbox",{staticClass:"input-style",model:{value:e.checkedUp,callback:function(t){e.checkedUp=t},expression:"checkedUp"}},[e._v("在 "+e._s(e.$store.state._case)+" 中表达量上调")])],1),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"}),e._v(" "),a("el-checkbox",{staticClass:"input-style",model:{value:e.checkedDown,callback:function(t){e.checkedDown=t},expression:"checkedDown"}},[e._v("在 "+e._s(e.$store.state._case)+" 中表达量下调")])],1)]),e._v(" "),a("div",{staticClass:"filterbtnDiv"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.filterTable()}}},[e._v("筛选")]),e._v(" "),a("el-button",{attrs:{type:"danger",disabled:e.savedisabled},on:{click:function(t){e.saveData()}}},[e._v("保存筛选")]),e._v(" "),a("el-button",{attrs:{type:"info"},on:{click:function(t){e.resetData()}}},[e._v("恢复默认列表")])],1)]),e._v(" "),a("br"),e._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{},[a("table",{directives:[{name:"show",rawName:"v-show",value:e.tableShow,expression:"tableShow"}],staticClass:"display",attrs:{id:"exampledeg",cellspacing:"0",width:"100%"}},[a("thead",[a("tr",[a("th",[e._v("target_id")]),e._v(" "),a("th",[e._v("name")]),e._v(" "),a("th",[e._v("description")]),e._v(" "),a("th",[e._v("type")]),e._v(" "),a("th",[e._v("baseMean")]),e._v(" "),a("th",[e._v("log2FoldChange")]),e._v(" "),a("th",[e._v("pvalue")]),e._v(" "),a("th",[e._v("FDR")])])]),e._v(" "),a("tbody",e._l(e.data,function(t,s){return a("tr",[a("td",[e._v(e._s(t.target_id))]),e._v(" "),a("td",[e._v(e._s(t.name))]),e._v(" "),a("td",[e._v(e._s(t.description))]),e._v(" "),a("td",[e._v(e._s(t.type))]),e._v(" "),a("td",[e._v(e._s(e.numFormat(parseFloat(t.baseMean).toFixed(0))))]),e._v(" "),a("td",[e._v(e._s(parseFloat(t.log2FoldChange).toFixed(3)))]),e._v(" "),a("td",[e._v(e._s(e.num2e(t.pvalue)))]),e._v(" "),a("td",[e._v(e._s(e.num2e(t.padj)))])])}))])])])],1)],1)],1)},staticRenderFns:[]};var l=function(e){a("DQaT")},n=a("VU/8")(s.a,i,!1,l,"data-v-14e8c7f7",null);t.default=n.exports},jsl9:function(e,t,a){"use strict";(function(e){var s=a("SH1Y"),i=a("Oj91"),l=a("K0Oa");t.a={data:()=>({data:[],checked:[],displayByFC:"0",maxpval:null,maxfdr:null,minfc:null,tableShow:!1,isCheckedAll:!1,loading:null,checkedProteinCoding:!1,checkedNonCoding:!1,checkedUp:!0,checkedDown:!0,typeRadio:"all",originFilterArgs:{},savedisabled:!1,tableLoading:!1,db:null}),components:{leftMenu:i.a,degComp:s.a,imgMenuShowComp:l.a},mounted(){this.getTabelValue()},destroyed(){this.resetFilter()},watch:{$route:"getTabelValueReset2"},methods:{saveData(){let t=[];e("#exampledeg").DataTable().column(0,{search:"applied"}).data().each(function(e,a){t.push(e)}),0!==t.length?(t=t.join(","),this.$confirm("确认保存筛选后的数据吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(()=>{this.loading=this.$loading({lock:!0,text:"正在保存中...请稍等...可能需要等待1～2分钟左右的时间...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});let e=new FormData,a={pvalue:this.maxpval?this.maxpval:this.originFilterArgs.pvalue,FDR:this.maxfdr?this.maxfdr:this.originFilterArgs.FDR,log2FoldChange:this.minfc?this.minfc:this.originFilterArgs.log2FoldChange};e.append("username",this.$store.state.username),e.append("p",this.$store.state.projectId),e.append("caseSample",this.$store.state._case),e.append("controlSample",this.$store.state._control),e.append("degList",t),e.append("geneVarInfo",JSON.stringify(a)),this.axios.post("/server/save_deg_list",e).then(e=>{"success"===e.data.message_type&&this.getStatus()})}).catch(()=>{})):this.$message.warning("保存列表不能为空！")},resetData(){this.$confirm("确认恢复原始列表吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(()=>{this.loading=this.$loading({lock:!0,text:"正在恢复中...请稍等...可能需要等待1～2分钟左右的时间...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});let e=new FormData;e.append("username",this.$store.state.username),e.append("p",this.$store.state.projectId),e.append("caseSample",this.$store.state._case),e.append("controlSample",this.$store.state._control),this.axios.post("/server/reset_default_deg_list",e).then(e=>{"success"===e.data.message_type&&this.getStatus()})}).catch(()=>{})},getStatus(){this.timer=setInterval(()=>{this.axios.get("/server/deg_list_status?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&caseSample="+this.$store.state._case+"&controlSample="+this.$store.state._control).then(e=>{"success"===e.data.message_type&&(this.loading.close(),this.$message.success(e.data.message),window.clearInterval(this.timer),this.getTabelValueReset())})},1e3)},numFormat(e){for(var t=(e=e.toString().split("."))[0].split("").reverse(),a=[],s=0,i=t.length;s<i;s++)s%3==0&&0!==s&&a.push(","),a.push(t[s]);return a.reverse(),a=e[1]?a.join("").concat("."+e[1]):a.join("")},num2e(e){var t=Math.floor(Math.log(e)/Math.LN10);return(e*Math.pow(10,-t)).toFixed(1)+"e"+t},checkedAll(){this.data.length!==this.checked.length&&!0===this.isCheckedAll?this.isCheckedAll=!0:this.isCheckedAll=!this.isCheckedAll,this.isCheckedAll?(this.checked=[],this.data.forEach(function(e){this.checked.push(e)},this)):this.checked=[]},resetFilter(){this.maxpval=null,this.maxfdr=null,this.minfc=null,this.displayByFC="0",this.checked=[],this.filterTable()},getTabelValueReset(){let t=document.getElementsByClassName("inputcheckbox");for(let e=0;e<t.length;e++)t[e].checked=!1;(this.data=[],this.checked=[],this.tableShow=!1,this.typeRadio="all",this.resetFilter(),e.fn.dataTable.isDataTable("#exampledeg"))&&e("#exampledeg").DataTable().destroy();this.db.transaction("degTable","readwrite").objectStore("degTable").delete("deg"+this.$store.state._case+this.$store.state._control);this.getTabelValue()},getTabelValueReset2(){let t=document.getElementsByClassName("inputcheckbox");for(let e=0;e<t.length;e++)t[e].checked=!1;(this.data=[],this.checked=[],this.tableShow=!1,this.typeRadio="all",this.resetFilter(),e.fn.dataTable.isDataTable("#exampledeg"))&&e("#exampledeg").DataTable().destroy();this.getTabelValue()},heatmapClick(){if(0===this.checked.length)if(this.data.length<100)this.$store.commit("setgeneList",this.data);else{for(let e=0;e<100;e++)this.checked.push(this.data[e]);this.$store.commit("setgeneList",this.checked)}else this.$store.commit("setgeneList",this.checked);this.$router.push({name:"heatmap_input",query:{_case:sessionStorage._case,_control:sessionStorage._control}})},heatmapsvgClick(){if(0===this.checked.length)if(this.data.length<100)this.$store.commit("setgeneList",this.data);else{for(let e=0;e<100;e++)this.checked.push(this.data[e]);this.$store.commit("setgeneList",this.checked)}else this.$store.commit("setgeneList",this.checked);this.$router.push({name:"heatmapsvg_input",query:{_case:sessionStorage._case,_control:sessionStorage._control}})},ppiClick(){if(0===this.checked.length)if(this.data.length<100)this.$store.commit("setgeneList",this.data);else{for(let e=0;e<50;e++)this.checked.push(this.data[e]);this.$store.commit("setgeneList",this.checked)}else this.$store.commit("setgeneList",this.checked);this.$router.push({name:"ppi_chord_plot_input",query:{_case:sessionStorage._case,_control:sessionStorage._control}})},enrichmentClick(){if(0===this.checked.length)if(this.data.length<1e3)this.$store.commit("setgeneList",this.data);else{for(let e=0;e<1e3;e++)this.checked.push(this.data[e]);this.$store.commit("setgeneList",this.checked)}else this.$store.commit("setgeneList",this.checked);this.$router.push({name:"enrichment_analysis_input"})},filterTable(){let t=this;e.fn.dataTable.ext.search.push(function(e,a,s){var i=parseFloat(t.maxpval),l=parseFloat(t.maxfdr),n=parseFloat(t.minfc),o=parseFloat(a[6]),r=parseFloat(a[5]),c=parseFloat(a[7]),d=a[3];if(!isNaN(i)&&o>i)return!1;if(!isNaN(l)&&c>l)return!1;if(!isNaN(n)&&Math.abs(r)<n)return!1;if("protein_coding"===t.typeRadio&&"protein_coding"!==d)return!1;if(t.checkedUp===t.checkedDown)return!0;if(!0===t.checkedUp){if(r<0)return!1}else if(!0===t.checkedDown&&r>0)return!1;return!0});var a=e("#exampledeg").DataTable();a.draw();let s=a.column(0,{search:"applied"}).data();if(s){let e=s.length,a={pvalue:t.maxpval?t.maxpval:this.originFilterArgs.pvalue,FDR:t.maxfdr?t.maxfdr:this.originFilterArgs.FDR,log2FoldChange:t.minfc?t.minfc:this.originFilterArgs.log2FoldChange};t.$store.commit("setdegGeneSum",e),t.$store.commit("setdegFilterArgs",a)}},initTable(t){let a=this;this.data=t,e(document).ready(function(){e("#exampledeg").DataTable({lengthMenu:[[25,50,100,-1],[25,50,100,"All"]],pageLength:25}),a.tableShow=!0})},getTabelValue(){let e=sessionStorage.getItem("_case"),t=sessionStorage.getItem("_control");this.tableLoading=!0;indexedDB.open("deg").onsuccess=(a=>{this.db=a.target.result,this.db.transaction("degTable","readwrite").objectStore("degTable").get("deg"+e+t).onsuccess=(a=>{var s=a.target.result;s?(this.tableLoading=!1,this.initTable(s.value)):this.axios.get("/server/deg?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&_case="+e+"&_control="+t+"&sig_only=true").then(a=>{if("success"===a.data.message_type){this.tableLoading=!1,this.initTable(a.data.message.data);let i={name:"deg"+e+t,value:a.data.message.data};var s=this.db.transaction("degTable","readwrite").objectStore("degTable");s.get("deg"+e+t).onsuccess=(e=>{s.add(i)}),this.$store.commit("setdegGeneSum",a.data.message.data.length),this.originFilterArgs=a.data.message.param,this.$store.commit("setdegFilterArgs",a.data.message.param)}else this.tableLoading=!1,this.$message.error(a.data.message)})})})}}}}).call(t,a("7t+N"))}});
//# sourceMappingURL=17.3566c123885ca1f2a37e.js.map