webpackJsonp([7],{B2fo:function(t,e){},"i+bX":function(t,e){},sUKf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("f4AQ"),r={data:()=>({tableValue:[],clusterData:null,yData:[]}),components:{leftMenu:a("Oj91").a},mounted(){this.axios.get("/server/hclust?username="+this.$store.state.username+"&p="+this.$store.state.projectId).then(t=>{this.clusterData=t.data;for(let e=0;e<t.data.distMatrix.length;e++)for(let a=0;a<t.data.distMatrix[e].length;a++)this.tableValue.push(t.data.distMatrix[e][a]);this.initD3()})},methods:{initD3(){let t=this;!function e(a){null===a.branchset?t.yData.push(a.id):(e(a.branchset[0]),e(a.branchset[1]))}(this.clusterData.rootNode);var e=430,a=(n.scaleOrdinal().domain([0,n.max(t.tableValue)]).range(n.schemeCategory10),n.cluster().size([360,e]).separation(function(t,e){return 1})),r=n.select("#container").append("svg").attr("width",1200).attr("height",900).append("g").attr("transform","translate(0,50)"),s=n.hierarchy(t.clusterData.rootNode,function(t){return t.branchset});a(s);var i=n.select("#show-length input").on("change",p),l=setTimeout(function(){i.property("checked",!0).each(p)},100);!function t(e,a,n){e.radius=(a+=e.data.length)*n;e.children&&e.children.forEach(function(e){t(e,a,n)})}(s,s.data.length=0,e/function t(e){return e.data.length+(e.children?n.max(e.children,t):0)}(s));var c=r.append("g").attr("class","link-extensions").selectAll("path").data(s.links().filter(function(t){return!t.target.children})).enter().append("path").each(function(t){t.target.linkExtensionNode=this}).attr("d",x),o=r.append("g").attr("class","links").selectAll("path").data(s.links()).enter().append("path").each(function(t){t.target.linkNode=this}).attr("d",v),u=r.append("g").attr("class","labels").attr("transform",function(t,a){return"translate("+(e+5)+","+(a+.5)+")"}),h=n.scaleLinear().domain([0,n.max(t.tableValue)]).range([n.rgb(6,113,160),n.rgb(120,248,232)]);let d=360/t.yData.length,f=360/t.yData.length;function p(){clearTimeout(l);var t=n.transition().duration(500);c.transition(t).attr("d",this.checked?m:x),o.transition(t).attr("d",this.checked?g:v)}function g(t){return b(t.source.x,t.source.radius,t.target.x,t.target.radius)}function v(t){return b(t.source.x,t.source.y,t.target.x,t.target.y)}function m(t){return b(t.target.x,t.target.radius,t.target.x,e)}function x(t){return b(t.target.x,t.target.y,t.target.x,e)}function b(t,e,a,n){return"M"+e+","+t+(a===t?"":"L"+e+","+a)+"L"+n+","+a}u.selectAll(".nameLabel").data(t.yData).enter().append("text").text(function(t){return t}).attr("x",0).attr("y",function(t,e){return parseInt(e)*f}).style("text-anchor","start").style("font-size","12px").style("font-family","Consolas, Monaco, monospace").attr("transform","translate("+(d*t.yData.length+10)+","+f/2+")").attr("class","ySum"),u.selectAll(".score").data(t.tableValue).enter().append("rect").attr("x",function(e,a){return a%t.yData.length*d}).attr("y",function(e,a){return parseInt(a/t.yData.length)*f}).attr("width",d).attr("height",f).style("fill",function(t){return h(t)}).append("title").text(function(t){return t})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("leftMenu",{staticStyle:{float:"left",width:"300px","margin-top":"10px"}}),t._v(" "),a("div",{staticClass:"content"},[a("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"report"}}},[t._v("项目 "+t._s(t.$store.state.projectName))]),t._v(" "),a("el-breadcrumb-item",[t._v("样本聚类图")])],1),t._v(" "),a("h2",[t._v("样本聚类图")]),t._v(" "),a("p",[t._v("样本聚类热图，图中矩阵色块颜色的深浅，可以直观的显示不同样本的基因表达模式的接近程度。左侧的树状结构图表示样本聚类的结果，基因表达模式更接近的样本，在数据结构图中的位置更接近。样本距离的计算采用欧式距离，样本间的 linkage 计算方法为 ward，使用的聚类工具是 R 语言的 fastcluster 软件，参考文献：")]),t._v(" "),t._m(0),t._v(" "),a("p",[t._v("“Show branch length” 选项打开以后，树状图的枝干长度会体现样本之间的距离远近。")]),t._v(" "),t._m(1),t._v(" "),a("div",{attrs:{id:"container"}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Daniel Müllner, fastcluster: Fast Hierarchical, Agglomerative Clustering Routines for R and Python, Journal of Statistical Software 53 (2013), no. 9, 1–18 ["),e("a",{attrs:{href:"http://www.jstatsoft.org/v53/i09/",target:"_blank"}},[this._v("全文链接")]),this._v("]")])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",{attrs:{id:"show-length"}},[e("input",{attrs:{type:"checkbox"}}),this._v(" Show branch length\n    ")])}]};var i=a("VU/8")(r,s,!1,function(t){a("i+bX"),a("B2fo")},"data-v-3b9d7d00",null);e.default=i.exports}});
//# sourceMappingURL=7.e460952f4690a38345a6.js.map