webpackJsonp([20],{P3jV:function(e,t){},mnQA:function(e,t,a){"use strict";(function(e){var r=a("Oj91"),s=a("K0Oa");t.a={data:()=>({tpmsArray:[],arr:[{mDataProp:"geneId"},{mDataProp:"geneName"}],textareaGeneName:"",textareaGeneId:""}),components:{leftMenu:r.a,imgMenuShowComp:s.a},mounted(){this.getTpms(),this.$nextTick(function(){MathJax.Hub.Queue(["Typeset",MathJax.Hub])})},methods:{getTpms(){this.axios("/server/gene_tpms?p="+this.$store.state.projectId+"&username="+this.$store.state.username+"&sEcho=1&iDisplayStart=0&iDisplayLength=1").then(e=>{if(e.data.aData.length>0){let t=e.data.aData[0].tpms;for(let e in t)this.tpmsArray.push(e),this.arr.push({mDataProp:"tpms",mRender:function(t,a,r){return Math.ceil(t[e])}});this.tpmsArray.sort(),this.tpmsArray.unshift("geneName"),this.tpmsArray.unshift("geneId")}this.initTable()})},initTable(){let t=this;e(document).ready(function(){e("#patients").DataTable({pageLength:25,bPaginate:!0,bStateSave:!0,bScrollCollapse:!0,bLengthChange:!0,bFilter:!1,bSort:!1,bInfo:!0,bAutoWidth:!0,bJQueryUI:!1,bDestroy:!0,bProcessing:!0,bServerSide:!0,sAjaxDataProp:"aData",sAjaxSource:"/server/gene_tpms?p="+t.$store.state.projectId+"&username="+t.$store.state.username+"&geneName="+t.textareaGeneName.replace(/\s/g,"")+"&geneId="+t.textareaGeneId.replace(/\s/g,""),aoColumns:t.arr})})},search(){this.initTable(),setTimeout(()=>{this.table.ajax.reload()},0)},clear(){this.textareaGeneName="",this.textareaGeneId=""}}}}).call(t,a("7t+N"))},"t8+L":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("mnQA"),s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[a("el-aside",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.menuShow,expression:"$store.state.menuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"},attrs:{width:"350px;"}},[a("leftMenu",{staticStyle:{"margin-top":"5px"}})],1),e._v(" "),a("el-main",[a("div",{},[a("imgMenuShowComp"),e._v(" "),a("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"report"}}},[e._v("项目 "+e._s(e.$store.state.projectName))]),e._v(" "),a("el-breadcrumb-item",[e._v("基因表达量表格")])],1),e._v(" "),a("h2",[e._v("基因表达量表格")]),e._v(" "),a("p",[e._v("一个基因表达水平的直接体现就是看有多少 reads 回帖到该基因区域，这个可以称之为基因的表达丰度。在转录组的分析中，落在一个基因区域内的 read 数目取决于基因长度和测序深度（一般来说，基因越长 read 数目越多，测序深度越高，则一个基因对应的 read 数目也相对越多），因此我们常用 RPKM、TPM 等作为转录组数据定量的表示方法。它们都是对表达量进行标准化的方法，而标准化的对象就是基因长度与测序深度。")]),e._v(" "),a("p",[e._v("Transcripts Per Kilobase of exonmodel per Million mapped reads (每千个碱基的转录每百万映射读取的 Transcripts， TPM) 是一种优化的 RPKM 计算方法，TPM 概括了基因的长度、表达量和基因数目。在每个样本内，所有基因的 TPM 值总和为 1M，因此各个样本都可以保证在一个统一的标准下进行基因表达量的比较。")]),e._v(" "),a("p",[e._v("$$ TPM_{i} = \\frac{ \\frac{ N_{i} }{ L_{i} } * 1000000}{\\sum_{i=1}^{n} \\frac{N_{i}}{L_{i}}}$$")]),e._v(" "),a("p",[e._v("N"),a("sub",[e._v("i")]),e._v("：mapping 到基因 i 上的 read 数；")]),e._v(" "),a("p",[e._v("L"),a("sub",[e._v("i")]),e._v("：基因 i 的外显子长度的总和。")]),e._v(" "),a("p",[e._v("在一个样本中一个基因的 TPM：先对每个基因的read数用基因的长度进行校正，之后再用校正后的这个基因 read 数 (N"),a("sub",[e._v("i")]),e._v("/L"),a("sub",[e._v("i")]),e._v(") 与校正后的这个样本的所有 read 求商。")]),e._v(" "),a("el-card",{staticStyle:{width:"1300px","min-width":"1300px"},attrs:{shadow:"hover"}},[a("div",{staticStyle:{display:"inline-block","vertical-align":"top"}},[a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxpval"}},[e._v("geneId")])]),e._v(" "),a("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",rows:3,placeholder:"请输入内容,以英文逗号分隔"},model:{value:e.textareaGeneId,callback:function(t){e.textareaGeneId=t},expression:"textareaGeneId"}})],1)]),e._v(" "),a("div",{staticStyle:{display:"inline-block","vertical-align":"top"}},[a("div",{},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxpval"}},[e._v("geneName")])]),e._v(" "),a("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",rows:3,placeholder:"请输入内容,以英文逗号分隔"},model:{value:e.textareaGeneName,callback:function(t){e.textareaGeneName=t},expression:"textareaGeneName"}})],1),e._v(" "),a("br"),e._v(" "),a("div",{},[a("div",{staticClass:"labelStyle"}),e._v(" "),a("el-button",{staticStyle:{float:"right"},attrs:{type:"info"},on:{click:function(t){e.clear()}}},[e._v("清空")]),e._v(" "),a("el-button",{staticStyle:{float:"right","margin-right":"10px"},attrs:{type:"primary"},on:{click:function(t){e.search()}}},[e._v("查询")])],1)])]),e._v(" "),a("br"),e._v(" "),a("div",{},[a("table",{staticClass:"display table table-striped table-bordered",attrs:{id:"patients",cellspacing:"0"}},[a("thead",[a("tr",e._l(e.tpmsArray,function(t){return a("th",[e._v(e._s(t))])}))])])])],1),e._v(" "),a("div",{staticClass:"clear"})])],1)},staticRenderFns:[]};var i=function(e){a("P3jV")},n=a("VU/8")(r.a,s,!1,i,"data-v-0f3dd38a",null);t.default=n.exports}});
//# sourceMappingURL=20.6f86e23ee896b4266234.js.map