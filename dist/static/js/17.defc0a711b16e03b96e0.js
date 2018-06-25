webpackJsonp([17],{Jjr6:function(t,e){},PEpY:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:()=>({step1Dialog:!1,step2Dialog:!1,condition:[],conditionNumMap:{},conditionList:[],experiments:[],message:{}}),components:{},mounted(){this.getExperiment()},methods:{getExperiment(){this.axios.get("/server/experiment?username="+this.$store.state.username+"&p="+this.$store.state.projectId).then(t=>{t.data.message?this.message=t.data.message:this.message={}})},editDesign(){this.condition=[];for(let t in this.message.conditionNumMap){let e={option:t,number:this.message.conditionNumMap[t]};this.condition.push(e)}this.step1Dialog=!0},addCondition(){this.condition.push({})},nextStepClick(){if(this.condition.length<2)return void this.$message.error("实验条件的数量需要大于2个!");this.conditionList=[],this.experiments=[];for(let t=0;t<this.condition.length;t++){if(/[,.!\u3002\uff0c]/.test(this.condition[t].option))return void this.$message.error("请将实验条件包含不规则字符，请重新填写!");if(!this.condition[t].option||!this.condition[t].number)return void this.$message.error("请将实验条件和样本数目填写完整!");this.conditionNumMap[this.condition[t].option]=this.condition[t].number,this.conditionList.push(this.condition[t].option)}let t=this.conditionList;for(let e=0;e<t.length;e++){let i=t.concat();i.splice(0,e+1);for(let s=0;s<i.length;s++){i.concat().splice(0,s+1),this.experiments.push({_case:t[e],_control:i[s]})}}this.step2Dialog=!0,setTimeout(()=>{this.step1Dialog=!1},0)},deleteOption(t){let e=this.condition.indexOf(t);this.condition.splice(e,1)},deleteVs(t){let e=this.experiments.indexOf(t);this.experiments.splice(e,1)},refresh(t){let e=t._case,i=t._control;t._case=i,t._control=e},createExperiment(){if(0===this.experiments.length)return void this.$message.error("对比条件不能为空，请返回上一步重新选择！");let t={};t.projectId=this.$store.state.projectId,t.conditionNumMap={};for(let e in this.condition)t.conditionNumMap[this.condition[e].option]=this.condition[e].number;t.nameSampleMap={};for(let e=0;e<this.condition.length;e++)for(let i=1;i<=this.condition[e].number;i++){let s=this.condition[e].option+"_"+i;t.nameSampleMap[s]={name:s,condition:this.condition[e].option,readPairList:[]}}t.experiments=this.experiments;let e=new FormData;e.append("username",this.$store.state.username),e.append("p",this.$store.state.projectId),e.append("experimentObjectString",JSON.stringify(t)),this.axios.post("/server/create_experiment",e).then(t=>{"success"===t.data.message_type?this.message=t.data.message:this.$message.error("请求异常！"),this.step2Dialog=!1})},clearDesign(){this.$confirm("确认清空该实验设计吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(()=>{this.axios.get("/server/clear_experiment?username="+this.$store.state.username+"&p="+this.$store.state.projectId).then(t=>{"success"===t.data?(this.$message.success("已清空!"),this.message={}):this.$message.error("清空失败!")})}).catch(()=>{})},backProjectList(){this.$router.push({name:"project_list"})}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[i("el-tooltip",{staticClass:"item cursor-pointer",attrs:{effect:"dark",content:"返回",placement:"right"}},[i("i",{staticClass:"el-icon-back",on:{click:t.backProjectList}})]),t._v(" "),i("p",[t._v("项目名称: "+t._s(this.$store.state.projectName))]),t._v(" "),i("div",{},[i("el-button",{attrs:{type:"danger"},on:{click:function(e){t.editDesign()}}},[i("i",{staticClass:"el-icon-edit"}),t._v("编辑/更新实验设计")]),t._v(" "),i("el-button",{attrs:{type:""},on:{click:t.clearDesign}},[i("i",{staticClass:"el-icon-delete"}),t._v("清空实验设计")])],1),t._v(" "),i("div",{staticClass:"tableStyle"},[i("p",{staticClass:"p-font-style"},[t._v("实验条件一览")]),t._v(" "),i("table",{staticClass:"gridtable"},[t._m(0),t._v(" "),t._l(t.message.nameSampleMap,function(e,s,n){return i("tr",[i("td",{class:{bgcolor:n%2!=0}},[t._v(t._s(e.condition))]),t._v(" "),i("td",{class:{bgcolor:n%2!=0}},[t._v(t._s(e.name))])])})],2)]),t._v(" "),i("div",{staticClass:"degtable"},[i("p",{staticClass:"p-font-style"},[t._v("差异表达基因比对条件")]),t._v(" "),i("table",{staticClass:"gridtable"},[t._m(1),t._v(" "),t._l(t.message.experiments,function(e,s){return i("tr",[i("td",{class:{bgcolor:s%2!=0}},[t._v(t._s(e._case))]),t._v(" "),i("td",{class:{bgcolor:s%2!=0}},[t._v(t._s(e._control))])])})],2)]),t._v(" "),i("el-dialog",{attrs:{title:"第一步：填写实验条件",visible:t.step1Dialog,width:"30%"},on:{"update:visible":function(e){t.step1Dialog=e}}},[i("el-button",{attrs:{type:"danger"},on:{click:function(e){t.addCondition()}}},[i("i",{staticClass:"el-icon-circle-plus"}),t._v("\n      增加实验条件\n    ")]),t._v(" "),t._l(t.condition,function(e){return i("div",{staticClass:"padding-10-5"},[t._v("\n      实验条件\n      "),i("el-input",{staticClass:"conditioninput width-100",attrs:{clearable:""},model:{value:e.option,callback:function(i){t.$set(e,"option",i)},expression:"item.option"}}),t._v("\n      样本数目\n      "),i("el-input",{staticClass:"numberinput width-100",attrs:{clearable:""},model:{value:e.number,callback:function(i){t.$set(e,"number",i)},expression:"item.number"}}),t._v(" "),i("i",{staticClass:"el-icon-remove cursor-poiter",on:{click:function(i){t.deleteOption(e)}}})],1)}),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.step1Dialog=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"danger"},on:{click:function(e){t.nextStepClick()}}},[t._v("下一步")])],1)],2),t._v(" "),i("el-dialog",{attrs:{title:"第二步：填写需要进行差异表达基因对比的条件对",visible:t.step2Dialog,width:"30%"},on:{"update:visible":function(e){t.step2Dialog=e}}},[t._l(t.experiments,function(e){return i("div",{staticClass:"padding-10-5"},[t._v("\n      "+t._s(e._case)+" "),i("i",{staticClass:"el-icon-refresh cursor-poiter",on:{click:function(i){t.refresh(e)}}}),t._v(" "+t._s(e._control)+"    "),i("i",{staticClass:"el-icon-remove cursor-poiter",on:{click:function(i){t.deleteVs(e)}}})])}),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.step1Dialog=!0,t.step2Dialog=!1}}},[t._v("上一步")]),t._v(" "),i("el-button",{attrs:{type:"danger"},on:{click:function(e){t.createExperiment()}}},[t._v("完成")])],1)],2)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("th",[this._v("实验条件")]),e("th",[this._v("样本名称")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("th",[this._v("实验组")]),e("th",[this._v("对照组")])])}]};var o=i("VU/8")(s,n,!1,function(t){i("Jjr6")},"data-v-0f9c1b42",null);e.default=o.exports}});
//# sourceMappingURL=17.defc0a711b16e03b96e0.js.map