webpackJsonp([9],{"++Lg":function(t,e){},"7LAd":function(t,e){},rwf8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Oj91"),n=a("f4AQ"),i={data:()=>({xData:[],yData:[],tableValue:[]}),components:{leftMenu:r.a},mounted(){this.axios.get("/server/enrich_bubble_diagram?username="+this.$store.state.username+"&p="+this.$store.state.projectId+"&fileType=KEGG").then(t=>{this.xData=t.data.x,this.yData=t.data.y,this.tableValue=t.data.coordinateList,this.initD3()})},methods:{initD3(){var t=300,e=20,a=20,r=20,i=800-e-r,s=800-t-a,l=n.select(".container").append("svg").attr("width",s).attr("height",i).style("padding-left",t).style("padding-right",a).style("padding-top",e).style("padding-bottom",r);let o=this.yData,c=n.scaleBand().rangeRound([i,0]).padding(1).domain(o.map(function(t){return t})),u=n.axisLeft(c);l.append("g").attr("class","xaxis").attr("transform","translate(0,0)").call(u);let d=this.xData,p=n.scaleBand().rangeRound([0,s]).padding(1).domain(d.map(function(t){return t})),m=n.axisBottom(p);l.append("g").attr("class","yaxis").attr("transform","translate(0 ,"+i+")").call(m),n.selectAll(".domain").remove(),l.append("g").attr("class","grid").attr("transform","translate(0,"+i+")").call(n.axisBottom(p).ticks(4).tickSize(-i).tickFormat("")),l.append("g").attr("class","grid").call(n.axisLeft(c).ticks(4).tickSize(-s).tickFormat(""));var f=n.scaleLinear().domain([n.min(this.tableValue,function(t){return Number(t.p_value)}),n.max(this.tableValue,function(t){return Number(t.p_value)})]).range(["red","blue"]),h=n.scaleLinear().domain([n.min(this.tableValue,function(t){return t.gene_ratio}),n.max(this.tableValue,function(t){return t.gene_ratio})]).range([10,20]),g=l.append("g");g.selectAll("circle").data(this.tableValue).enter().append("circle").attr("cx",function(t){return p(t.x)}).attr("cy",function(t){return c(t.y)}).attr("r",function(t){return h(t.gene_ratio)}).attr("fill",function(t){return f(Number(t.p_value))}).on("mouseover",function(t){let e=this;n.select(this).transition().duration(100).attr("r",1.6*n.select(this).attr("r")),x.attr("x",function(){return p(t.x)}).attr("y",function(){return c(t.y)-1.6*n.select(e).attr("r")-5}).text(function(){return t.id}).attr("text-anchor","middle").attr("fill","#666")}).on("mouseout",function(){n.select(this).transition().duration(100).attr("r",n.select(this).attr("r")/1.6),x.text("")});g.append("g");let x=l.append("text").text("").attr("font-size","14px")}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("leftMenu",{staticStyle:{float:"left",width:"300px","margin-top":"10px"}}),t._v(" "),a("div",{staticClass:"content"},[a("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"report"}}},[t._v("项目 "+t._s(t.$store.state.projectName))]),t._v(" "),a("el-breadcrumb-item",[t._v("KEGG 气泡图")])],1),t._v(" "),a("h2",[t._v("KEGG 气泡图 ")]),t._v(" "),a("div",{staticClass:"container"})],1)],1)},staticRenderFns:[]};var l=a("VU/8")(i,s,!1,function(t){a("++Lg"),a("7LAd")},"data-v-1cba971b",null);e.default=l.exports}});
//# sourceMappingURL=9.cd0db968d34de7a1fd8c.js.map