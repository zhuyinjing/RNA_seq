webpackJsonp([29],{KP6r:function(t,e){},iibm:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Oj91"),r=s("K0Oa"),i=s("f4AQ"),n={data:()=>({events:[],samples:[],eventsArr:[],samplesArr:[],data:{}}),components:{leftMenu:a.a,imgMenuShowComp:r.a},mounted(){this.getValue()},methods:{getValue(){this.axios.get("/server/as_profile_info?username="+this.$store.state.username+"&p="+this.$store.state.projectId).then(t=>{"success"===t.data.message_type?(this.eventsArr=t.data.ASProfileInfo.asName,this.samplesArr=t.data.ASProfileInfo.sampleName,this.data=t.data.ASProfileInfo.asEventMap,this.events=t.data.ASProfileInfo.asName,this.samplesArr.forEach((t,e)=>{this.samples.push(e)}),this.initD3()):this.$message.error("请求错误!")})},initD3(){if(0===this.events.length||0===this.samples.length)return void this.$message.error("请选择可变剪切事件和样本，不能为空！");i.selectAll("svg")&&i.selectAll("svg").remove();let t=100,e=30,s=30,a=80,r=i.select("body").append("div").style("position","absolute").style("z-index","10").style("visibility","hidden").style("font-size","14px").style("font-weight","bold").text("");for(let p=0;p<this.events.length;p++){let c=i.select("#d3container").append("svg").attr("id","svg").attr("width",800).attr("height",400),d=this.data[this.events[p]].filter((t,e)=>{if(this.samples.includes(e))return t}),m=this.samplesArr.filter((t,e)=>{if(this.samples.includes(e))return t});var n=i.scaleBand().domain(m).rangeRound([t,800-e]).padding(.5),l=i.scaleLinear().domain([0,i.max(d)]).rangeRound([400-a,s]),o=i.scaleOrdinal(i.schemeCategory10);c.append("g").selectAll("g").data(d).enter().append("g").attr("fill",(t,e)=>o(p)).selectAll("rect").data(d).enter().append("rect").attr("width",n.bandwidth).attr("x",(t,e)=>n(m[e])).attr("y",t=>l(t)).attr("height",t=>l(0)-l(t)).on("mouseover",(t,e)=>r.style("visibility","visible").text(t)).on("mousemove",function(t,e){return r.style("top",i.event.pageY-10+"px").style("left",i.event.pageX+10+"px")}).on("mouseout",function(t,e){return r.style("visibility","hidden")}),c.append("g").attr("transform","translate(0,"+l(0)+")").call(i.axisBottom(n)).selectAll("text").style("text-anchor","start").attr("transform","rotate(45 -10 10)"),c.append("g").attr("transform","translate("+t+",0)").call(i.axisLeft(l)).append("text").text(this.events[p]).style("font-size","16px").attr("fill","#000").attr("transform","translate(0, 25)")}}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[s("el-aside",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.menuShow,expression:"$store.state.menuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"},attrs:{width:"350px;"}},[s("leftMenu",{staticStyle:{"margin-top":"5px"}})],1),t._v(" "),s("el-main",[s("div",{},[s("imgMenuShowComp"),t._v(" "),s("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[s("el-breadcrumb-item",{attrs:{to:{path:"report"}}},[t._v("项目 "+t._s(t.$store.state.projectName))]),t._v(" "),s("el-breadcrumb-item",[t._v("可变剪切事件数量统计")])],1),t._v(" "),s("h2",[t._v("可变剪切事件数量统计")]),t._v(" "),s("div",{staticStyle:{"min-width":"1100px"}},[s("label",{attrs:{for:""}},[t._v("可变剪切事件")]),t._v(" "),s("el-select",{staticStyle:{width:"400px"},attrs:{multiple:"",placeholder:"请选择"},model:{value:t.events,callback:function(e){t.events=e},expression:"events"}},t._l(t.eventsArr,function(t){return s("el-option",{key:t,attrs:{label:t,value:t}})})),t._v("\n            \n        "),s("label",{attrs:{for:""}},[t._v("样本")]),t._v(" "),s("el-select",{staticStyle:{width:"400px"},attrs:{multiple:"",placeholder:"请选择"},model:{value:t.samples,callback:function(e){t.samples=e},expression:"samples"}},t._l(t.samplesArr,function(t,e){return s("el-option",{key:t,attrs:{label:t,value:e}})})),t._v("\n            \n        "),s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.initD3()}}},[t._v("提交")])],1),t._v(" "),s("br"),t._v(" "),s("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-picture"},on:{click:function(e){t.$store.commit("d3saveSVG","可变剪切事件数量统计")}}},[t._v("生成 SVG")]),t._v(" "),s("i",{staticClass:"el-icon-question cursor-pointer",staticStyle:{"font-size":"16px"},on:{click:function(e){t.$store.state.svgDescribeShow=!0}}}),t._v(" "),s("div",{attrs:{id:"d3container"}})],1)])],1)},staticRenderFns:[]};var o=s("VU/8")(n,l,!1,function(t){s("KP6r")},"data-v-343373f8",null);e.default=o.exports}});
//# sourceMappingURL=29.5900c0e5c2e4216b34e4.js.map