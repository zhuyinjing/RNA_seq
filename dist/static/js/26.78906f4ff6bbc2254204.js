webpackJsonp([26],{SWyW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Oj91"),s=a("K0Oa"),i=a("f4AQ"),n={data:()=>({eventsArr:[],eventsArrReverse:[],samplesArr:[],data:[]}),components:{leftMenu:r.a,imgMenuShowComp:s.a},mounted(){this.getValue()},methods:{getValue(){this.axios.get("/server/as_profile_info?username="+this.$store.state.username+"&p="+this.$store.state.projectId).then(t=>{if("success"===t.data.message_type){this.eventsArr=t.data.ASProfileInfo.asName,this.samplesArr=t.data.ASProfileInfo.sampleName;for(let e=0;e<this.eventsArr.length;e++)this.data.push(t.data.ASProfileInfo.asEventPercentMap[this.eventsArr[e]]);this.eventsArrReverse=Array.from(this.eventsArr).reverse(),this.initD3()}else this.$message.error("请求错误!")})},initD3(){let t=50,e=30,a=30,r=80,s=i.select("#canvas").append("svg").attr("id","svg").attr("width",1e3).attr("height",600),n=i.select("body").append("div").style("position","absolute").style("z-index","10").style("visibility","hidden").style("font-size","14px").style("font-weight","bold").text("");var l=i.scaleBand().domain(this.samplesArr).rangeRound([t,900-e]).padding(.3),o=i.scaleLinear().domain([0,100]).rangeRound([600-r,a]),d=i.scaleOrdinal(i.schemeCategory20);i.stack().offset(i.stackOffsetExpand);s.append("g").attr("transform","translate(0,"+o(0)+")").call(i.axisBottom(l)).selectAll("text").style("text-anchor","start").attr("transform","rotate(45 -10 10)"),s.append("g").attr("transform","translate("+t+",0)").call(i.axisLeft(o).tickFormat(t=>t+"%"));for(let t=0;t<this.samplesArr.length;t++){let e=0,a=0,r=t,i=this.samplesArr[t];s.selectAll(".rect").data(this.data).enter().append("rect").attr("x",t=>l(i)).attr("y",(t,a)=>(e+=t[r],o(e))).attr("height",(t,e)=>(a+=t[r],0===e?o(0)-o(t[r]):o(a-t[r])-o(a))).attr("width",l.bandwidth()).attr("fill",(t,e)=>d(e)).on("mouseover",(t,e)=>n.style("visibility","visible").text(this.eventsArr[e]+" "+t[r]+"%")).on("mousemove",function(t,e){return n.style("top",event.pageY-10+"px").style("left",event.pageX+10+"px")}).on("mouseout",function(t,e){return n.style("visibility","hidden")})}let p=s.append("g").attr("transform","translate(870,"+a+")");p.selectAll("rect").data(this.eventsArrReverse).enter().append("rect").attr("x",(t,e)=>0).attr("y",(t,e)=>15*e+5*e).attr("width",15).attr("height",15).attr("fill",(t,e)=>d(this.eventsArr.length-1-e)),p.selectAll("text").data(this.eventsArrReverse).enter().append("text").attr("x",(t,e)=>20).attr("y",(t,e)=>15*e+5*e+12).text(t=>t)}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[a("el-aside",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.menuShow,expression:"$store.state.menuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"},attrs:{width:"350px;"}},[a("leftMenu",{staticStyle:{"margin-top":"5px"}})],1),t._v(" "),a("el-main",[a("div",{},[a("imgMenuShowComp"),t._v(" "),a("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"report"}}},[t._v("项目 "+t._s(t.$store.state.projectName))]),t._v(" "),a("el-breadcrumb-item",[t._v("可变剪切事件百分比统计")])],1),t._v(" "),a("h2",[t._v("可变剪切事件百分比统计")]),t._v(" "),a("div",{attrs:{id:"canvas"}})],1)])],1)},staticRenderFns:[]};var o=a("VU/8")(n,l,!1,function(t){a("tEw8")},"data-v-1cbfa532",null);e.default=o.exports},tEw8:function(t,e){}});
//# sourceMappingURL=26.78906f4ff6bbc2254204.js.map