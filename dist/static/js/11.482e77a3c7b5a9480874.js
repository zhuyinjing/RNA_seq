webpackJsonp([11],{Zi5u:function(e,t){},f1ZK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("GooH"),i=a("Ck+T"),n={data:()=>({textareaGeneName:"",textareaGeneId:"",radioName:"geneId",loading:null,specie:"Human (Homo sapiens)"}),components:{appLeftMenu:s.a,appImgMenuShowComp:i.a},mounted(){},methods:{submit(){if(!this.textareaGeneId.trim())return void this.$message.error("请输入基因ID列表!");this.textareaGeneId=this.textareaGeneId.replace(/(\,|\s)+/g,"\n"),this.loading=this.$loading({lock:!0,text:"文件正在上传中...请稍等...可能需要等待1分钟左右的时间...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});let e=new FormData;e.append("username",this.$store.state.username),e.append("genelist",this.textareaGeneId),e.append("speciesId",this.$store.state.speciesArr[this.specie]),this.axios.post("/server/ppi_chord_plot.app",e).then(e=>{"warn"===e.data.message_type?this.$message.error(e.data.message):(this.$store.commit("setppiJson",e.data.message),this.$router.push({name:"app_ppi"})),this.loading.close()})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[a("el-aside",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.appmenuShow,expression:"$store.state.appmenuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"}},[a("appLeftMenu")],1),e._v(" "),a("el-main",[a("appImgMenuShowComp"),e._v(" "),a("div",[a("div",{staticClass:"margin-top-10"},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font",attrs:{for:"maxpval"}},[e._v("输入基因ID列表")]),e._v(" "),a("i",{staticClass:"el-icon-question label-font cursor-pointer"})]),e._v(" "),a("div",{staticClass:"inline-block"},[a("el-radio",{attrs:{label:"geneId"},model:{value:e.radioName,callback:function(t){e.radioName=t},expression:"radioName"}},[e._v("按 geneId 输入")])],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"geneName"===e.radioName,expression:"radioName === 'geneName'"}],staticClass:"margin-top-10"},[a("div",{staticClass:"labelStyle"}),e._v(" "),a("div",{staticClass:"inline-block",staticStyle:{width:"800px"}},[a("el-input",{attrs:{type:"textarea",rows:30,placeholder:"请输入 geneId 列表, 可以用逗号、空格或者换行符分隔"},model:{value:e.textareaGeneName,callback:function(t){e.textareaGeneName=t},expression:"textareaGeneName"}})],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"geneId"===e.radioName,expression:"radioName === 'geneId'"}],staticClass:"margin-top-10"},[a("div",{staticClass:"labelStyle"}),e._v(" "),a("div",{staticClass:"inline-block",staticStyle:{width:"800px"}},[a("el-input",{attrs:{type:"textarea",rows:30,placeholder:"请输入 geneId 列表, 可以用逗号、空格或者换行符分隔"},model:{value:e.textareaGeneId,callback:function(t){e.textareaGeneId=t},expression:"textareaGeneId"}})],1)]),e._v(" "),a("div",{staticClass:"margin-top-10"},[a("div",{staticClass:"labelStyle"},[a("label",{staticClass:"label-font"},[e._v("选择物种")])]),e._v(" "),a("div",{staticClass:"inline-block",staticStyle:{width:"300px"}},[a("el-select",{staticClass:"input-style",attrs:{placeholder:"请选择"},model:{value:e.specie,callback:function(t){e.specie=t},expression:"specie"}},e._l(e.$store.state.speciesArr,function(t,s){return a("el-option",{key:s,attrs:{value:s}},[e._v(e._s(s))])}))],1)]),e._v(" "),a("div",{staticClass:"margin-top-10"},[a("div",{staticClass:"labelStyle"}),e._v(" "),a("div",{staticClass:"inline-block",staticStyle:{width:"300px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submit()}}},[e._v("提交")])],1)])])],1)],1)},staticRenderFns:[]};var o=a("VU/8")(n,l,!1,function(e){a("h+Fx"),a("Zi5u")},"data-v-5e229087",null);t.default=o.exports},"h+Fx":function(e,t){}});
//# sourceMappingURL=11.482e77a3c7b5a9480874.js.map