webpackJsonp([11],{"7l/Y":function(e,t){},S0pW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("GooH"),r=n("Ck+T"),o=n("DWTP"),s=n("f4AQ"),l={data:()=>({originNodes:null,singleNodes:null,graph:{},singleGeneShow:!1}),components:{appLeftMenu:i.a,appImgMenuShowComp:r.a,appTableComp:o.a},mounted(){this.originNodes=this.$store.state.ppiJson.relevanceGeneNodes,this.singleNodes=this.$store.state.ppiJson.discreteGeneNodes,this.graph={nodes:this.$store.state.ppiJson.relevanceGeneNodes,links:this.$store.state.ppiJson.scoreMatrixList},this.initD3()},methods:{singleGeneShowChange(){s.selectAll("g")&&s.selectAll("svg").remove(),!0===this.singleGeneShow?this.graph.nodes=this.graph.nodes.concat(this.singleNodes):this.graph.nodes=this.originNodes,setTimeout(()=>{this.initD3()},50)},initD3(){document.getElementById("d3container").clientWidth;let e=s.select("#d3container").append("svg").attr("id","svg").attr("width",1200).attr("height",960);var t,n,i,r,o,l=+e.attr("width"),a=+e.attr("height");s.scaleOrdinal(s.schemeCategory20);if(!1===this.singleGeneShow)var c=s.forceSimulation().force("link",s.forceLink().id(function(e){return e.id})).force("charge",s.forceManyBody().strength(-300).distanceMax(300)).force("center",s.forceCenter(l/2,a/2));else c=s.forceSimulation().force("link",s.forceLink().id(function(e){return e.id})).force("charge",s.forceManyBody().strength(-200).distanceMax(100)).force("center",s.forceCenter(l/2,a/2));s.select("body").on("keydown",function(){var e=s.event.metaKey,t=68===s.event.keyCode;e&&o.attr("pointer-events","none");t&&(n.classed("picked",!1),n.each(function(e){e.picked=e.previouslyPicked=!1}))}).on("keyup",function(){s.event.metaKey||o.attr("pointer-events","all")}),r=s.brush().extent([[0,0],[l,a]]).on("start",function(e){n.each(function(e){e.previouslyPicked=void 0})}).on("brush",function(){if(s.event.selection){var e=s.event.selection,t=s.zoomTransform(o.node());n.classed("picked",function(n){return n.picked=n.previouslyPicked^((e[0][0]-t.x)/t.k<=n.x&&n.x<(e[1][0]-t.x)/t.k&&(e[0][1]-t.y)/t.k<=n.y&&n.y<(e[1][1]-t.y)/t.k)})}}).on("end",function(){s.event.selection&&s.select(this).call(s.event.target.move,null)});var d=s.zoom().scaleExtent([.5,4]).on("zoom",function(){t.attr("transform",s.event.transform)});e.append("g").attr("id","brush-layer").attr("width",l).attr("height",a).style("fill","none").datum(function(){return{picked:!1,previouslyPicked:!1}}).call(r).on("click",function(e){n.classed("picked",!1),n.each(function(e){e.picked=e.previouslyPicked=!1})}),o=e.append("rect").attr("id","zoom-layer").attr("width",l).attr("height",a).style("fill","none").attr("pointer-events","all").call(d),t=e.append("g");let u=this.graph;var f=s.scaleLinear().range([1,5]).domain(s.extent(u.links.map((e,t)=>e.value)));i=t.append("g").attr("class","links").selectAll("line").data(u.links).enter().append("line").attr("stroke-width",function(e){return f(e.value)}),n=t.append("g").attr("class","nodes").selectAll("circle").data(u.nodes).enter().append("circle").attr("r",(e,t)=>20).attr("fill","#e49433").on("click",function(){s.select(this)}).on("mouseover",function(e,t,n){let i=e.id;var r=u.links.filter(t=>t.source.id==e.id||t.target.id==e.id).map(t=>t.source.id==e.id?t.target.id:t.source.id);s.select(".nodes").selectAll("circle").attr("fill",function(t){return r.indexOf(t.id)>-1||t.id==e.id?"red":"#e49433"}),s.select(".links").selectAll("line").style("stroke",function(e,t){return e.target.id===i&&r.indexOf(e.source.id)>-1||e.source.id===i&&r.indexOf(e.target.id)>-1?"red":"#999"})}).on("mouseout",function(e){s.select(".nodes").selectAll("circle").attr("fill","#e49433"),s.select(".links").selectAll("line").style("stroke","#999")}).call(s.drag().on("start",h).on("drag",g).on("end",v));let p=t.selectAll(".texts").attr("class","texts").data(u.nodes).enter().append("text").text((e,t)=>e.id).style("font-size","8px").attr("dy",".35em").attr("text-anchor","middle").on("mouseover",function(e,t,n){let i=e.id;var r=u.links.filter(t=>t.source.id==e.id||t.target.id==e.id).map(t=>t.source.id==e.id?t.target.id:t.source.id);s.select(".nodes").selectAll("circle").attr("fill",function(t){return r.indexOf(t.id)>-1||t.id==e.id?"red":"#e49433"}),s.select(".links").selectAll("line").style("stroke",function(e,t){return e.target.id===i&&r.indexOf(e.source.id)>-1||e.source.id===i&&r.indexOf(e.target.id)>-1?"red":"#999"})}).on("mouseout",function(e){s.select(".nodes").selectAll("circle").attr("fill","#e49433"),s.select(".links").selectAll("line").style("stroke","#999")}).call(s.drag().on("start",h).on("drag",g).on("end",v));function h(e){s.event.active||c.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y}function g(e){e.fx=s.event.x,e.fy=s.event.y}function v(e){s.event.active||c.alphaTarget(0),e.fx=null,e.fy=null}c.nodes(u.nodes).on("tick",function(){i.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y}),n.attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y}),p.attr("transform",e=>"translate("+e.x+","+e.y+")")}),c.force("link").links(u.links),s.selectAll(".links").selectAll("line").style("stroke","#999").style("stroke-opacity",.6)}}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticStyle:{height:"calc(100% - 62px)","margin-top":"2px"}},[n("el-aside",{directives:[{name:"show",rawName:"v-show",value:e.$store.state.appmenuShow,expression:"$store.state.appmenuShow"}],staticStyle:{width:"300px",height:"100%","border-right":"1px solid #e6e6e6"}},[n("appLeftMenu")],1),e._v(" "),n("el-main",[n("appImgMenuShowComp"),e._v(" "),n("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-picture"},on:{click:function(t){e.$store.commit("d3saveSVG","可变剪切事件百分比统计")}}},[e._v("生成 SVG")]),e._v(" "),n("i",{staticClass:"el-icon-question cursor-pointer",staticStyle:{"font-size":"16px"},on:{click:function(t){e.$store.state.svgDescribeShow=!0}}}),e._v(" "),n("br"),n("br"),e._v("\n    是否显示离散的基因：\n    "),n("el-switch",{attrs:{"active-color":"#409EFF","active-text":"显示","inactive-text":"隐藏"},on:{change:function(t){e.singleGeneShowChange()}},model:{value:e.singleGeneShow,callback:function(t){e.singleGeneShow=t},expression:"singleGeneShow"}}),e._v(" "),n("div",{staticStyle:{height:"960px"},attrs:{id:"d3container"}}),e._v(" "),n("appTableComp")],1)],1)},staticRenderFns:[]};var c=n("VU/8")(l,a,!1,function(e){n("kIcZ"),n("7l/Y")},"data-v-77df03e4",null);t.default=c.exports},kIcZ:function(e,t){}});
//# sourceMappingURL=11.d0b15f430fc3b24f9bae.js.map