webpackJsonp([2],{"4aIV":function(e,t,r){e.exports=r.p+"static/img/lollipop.1cce8bd.png"},BvP8:function(e,t){},K31e:function(e,t,r){"use strict";var s=r("J56h"),o={data:()=>({registerDialog:!1,form:{username:"",password:"",surepassword:""},formLabelWidth:"120px"}),components:{navbar:s.a},mounted(){},methods:{register(){if(this.form.username)if(this.form.password)if(this.form.surepassword){let e=new FormData;e.append("username",this.form.username),e.append("password",this.form.password),this.axios.post("/server/login",e).then(e=>{})}else this.$message.error("确认密码不能为空!");else this.$message.error("密码不能为空!");else this.$message.error("用户名不能为空!");this.registerDialog=!1}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-dialog",{attrs:{title:"注 册",visible:e.registerDialog,width:"400px"},on:{"update:visible":function(t){e.registerDialog=t}}},[r("el-form",{attrs:{model:e.form}},[r("el-form-item",{attrs:{label:"用户名","label-width":e.formLabelWidth}},[r("el-input",{attrs:{type:"text","auto-complete":"off",clearable:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码","label-width":e.formLabelWidth}},[r("el-input",{attrs:{type:"password","auto-complete":"off",clearable:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"确认密码","label-width":e.formLabelWidth}},[r("el-input",{attrs:{type:"password","auto-complete":"off",clearable:""},model:{value:e.form.surepassword,callback:function(t){e.$set(e.form,"surepassword",t)},expression:"form.surepassword"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.registerDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.register()}}},[e._v("注 册")])],1)],1)],1)},staticRenderFns:[]};var i=r("VU/8")(o,a,!1,function(e){r("oP2r")},"data-v-10459b44",null).exports,l={data:()=>({loginDialog:!1,form:{username:"",password:""},formLabelWidth:"60px"}),components:{navbar:s.a,register:i},mounted(){},methods:{login(){if(this.form.username)if(this.form.password){let e=new FormData;e.append("username",this.form.username),this.axios.post("/server/login",e).then(e=>{})}else this.$message.error("密码不能为空!");else this.$message.error("用户名不能为空!")},register(){this.$refs.registerDiv.registerDialog=!0,setTimeout(()=>{this.loginDialog=!1},0)}}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-dialog",{attrs:{title:"登 录",visible:e.loginDialog,width:"400px"},on:{"update:visible":function(t){e.loginDialog=t}}},[r("el-form",{attrs:{model:e.form}},[r("el-form-item",{attrs:{label:"用户名","label-width":e.formLabelWidth}},[r("el-input",{attrs:{type:"text","auto-complete":"off",clearable:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码","label-width":e.formLabelWidth}},[r("el-input",{attrs:{type:"password","auto-complete":"off",clearable:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1),e._v(" "),r("div",{staticStyle:{"text-align":"center"}},[r("span",[e._v("没有账号？")]),e._v(" "),r("el-button",{attrs:{type:"text"},on:{click:function(t){e.register()}}},[e._v("注 册")])],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.loginDialog=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.login()}}},[e._v("登 录")])],1)],1),e._v(" "),r("register",{ref:"registerDiv"})],1)},staticRenderFns:[]};var m=r("VU/8")(l,n,!1,function(e){r("BvP8")},"data-v-617c90b1",null);t.a=m.exports},KGTe:function(e,t){},oP2r:function(e,t){},wUZA:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("J56h"),o=r("K31e"),a={data:()=>({dialogFormVisible:!1,form:{email:"",password:""},formLabelWidth:"120px"}),components:{navbar:s.a,login:o.a},mounted(){},methods:{project_list(){this.$router.push({name:"project_list"})}}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._m(0),e._v(" "),e._m(1),e._v(" "),r("div",{staticClass:"textStyle"},[r("el-button",{attrs:{type:"danger"},on:{click:function(t){e.project_list()}}},[e._v("查看项目列表")]),e._v(" "),r("img",{staticClass:"display-none",attrs:{src:"https://colorseq.com/server/username",alt:""}})],1),e._v(" "),r("login",{ref:"loginDiv"}),e._v(" "),r("div",{staticClass:"footer"},[e._v("\n    京ICP备18032172号-1\n  ")])],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"imgStyle"},[t("img",{staticClass:"imgStyle",attrs:{src:r("4aIV"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"textStyle"},[t("h1",[this._v("专业、深度、可视化的高通量生物数据分析平台")])])}]};var l=r("VU/8")(a,i,!1,function(e){r("KGTe")},"data-v-9154d844",null);t.default=l.exports}});
//# sourceMappingURL=2.b37493456a7a76b11a49.js.map