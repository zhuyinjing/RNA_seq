webpackJsonp([6],{"3fty":function(e,t){},"7EF8":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:()=>({geneNum:null,transcriptNum:null}),components:{leftMenu:s("Oj91").a},mounted(){this.getValue()},methods:{getValue(){this.axios.get("/server/rnaseq_report_summary?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&species="+this.$store.state.species).then(e=>{"success"===e.data.message_type&&(this.geneNum=e.data.rnaSeqReportSummary.geneNum,this.transcriptNum=e.data.rnaSeqReportSummary.transcriptNum)})}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{},[s("leftMenu",{staticStyle:{float:"left",width:"300px","margin-top":"10px"}}),e._v(" "),s("div",{staticClass:"content"},[s("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[s("el-breadcrumb-item",[e._v("项目"+e._s(e.$store.state.projectName))]),e._v(" "),s("el-breadcrumb-item")],1),e._v(" "),s("h2",[e._v("项目名称："+e._s(e.$store.state.projectName))]),e._v(" "),s("p",[e._v("基因数目："+e._s(e.geneNum))]),e._v(" "),s("p",[e._v("转录本数目："+e._s(e.transcriptNum))])],1)],1)},staticRenderFns:[]};var n=s("VU/8")(a,r,!1,function(e){s("3fty"),s("XLGp")},"data-v-6f0e3b8a",null);t.default=n.exports},XLGp:function(e,t){}});
//# sourceMappingURL=6.980ba15ef14fd40ac904.js.map