webpackJsonp([22],{Fx2u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Oj91"),r=a("f4AQ"),n=(a("nER5"),{data:()=>({arr:[],temp:[],value:[],sortValue:[],idShow:!1,visible:"hidden",height:5}),components:{leftMenu:s.a},created(){this.$store.state.heatmapJson.heatmap_json_string=JSON.parse(this.$store.state.heatmapJson.heatmap_json_string);let t=this;for(let t in this.$store.state.heatmapJson.heatmap_json_string.data.nodes){let a=this.$store.state.heatmapJson.heatmap_json_string.data.nodes[t];"parent"in a==!1&&e(a)}function e(a){if(0===a.distance){t.temp.push(a.objects[0]);for(let e=0;e<a.features.length;e++)t.value.push(a.features[e]),t.sortValue.push(a.features[e])}else e(t.$store.state.heatmapJson.heatmap_json_string.data.nodes[a.left_child]),e(t.$store.state.heatmapJson.heatmap_json_string.data.nodes[a.right_child])}},mounted(){this.d3heatmap()},methods:{idShowChange(){!0===this.idShow?(this.height=9,this.visible="visible"):(this.height=5,this.visible="hidden"),this.d3heatmap()},d3heatmap(){r.selectAll(".d3svg")&&r.selectAll(".d3svg").remove();let t=this,e=t.temp,a=this.$store.state.heatmapJson.heatmap_json_string.data.feature_names;var s=50,n=0,i=100,o=100,l=800-o-n,h=t.height*e.length,c=Math.floor(l/a.length);t.sortValue.sort(function(t,e){return t-e});let d=t.sortValue[Math.ceil(.1*t.sortValue.length)],p=t.sortValue[Math.ceil(t.sortValue.length/2)],u=t.sortValue[t.sortValue.length-Math.ceil(.1*t.sortValue.length)-1];var m=r.scaleLinear().domain([d,p,u]).range([r.rgb(255,0,0).darker(.7),r.rgb(19,3,3).darker(1),r.rgb(0,255,0).darker(1)]),v=r.select("#chart").append("svg").attr("width",l+o+n).attr("height",h+s+i).attr("class","d3svg").append("g").attr("transform","translate("+o+","+s+")"),g=(v.selectAll(".testLabel").data(a).enter().append("text").text(function(t){return t}).attr("x",function(t,e){return e*c}).attr("y",0).attr("class","xText").style("text-anchor","middle").style("font-size","9px").style("font-family","Consolas, Monaco, monospace").attr("transform","translate("+c/2+", -6)"),v.selectAll(".nameLabel").data(e).enter().append("text").text(function(t){return t}).attr("x",0).attr("y",function(t,e){return 9*e}).style("text-anchor","end").style("font-size","9px").style("font-family","Consolas, Monaco, monospace").attr("transform","translate(-6,9)").attr("class","ySum").style("visibility",t.visible),v.selectAll(".score").data(t.value).enter().append("rect").attr("x",function(t,e){return e%a.length*c}).attr("y",function(e,s){return parseInt(s/a.length)*t.height}).attr("width",c).attr("height",t.height).style("fill","#FFFFFF"));g.transition().duration(500).style("fill",function(t){return m(t)}),g.append("title").text(function(t){return t})},backHeatmapsvgInput(){this.$router.push({name:"heatmapsvg_input"})}}}),i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("leftMenu",{staticStyle:{float:"left",width:"300px","margin-top":"10px"}}),t._v(" "),a("div",{staticClass:"content"},[a("el-breadcrumb",{staticStyle:{margin:"5px 0 50px 0"},attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"report"}}},[t._v("项目 "+t._s(t.$store.state.projectName))]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"report_deg"}}},[t._v("差异表达基因")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"heatmapsvg_input"}}},[t._v("绘制基因热图(svg)")]),t._v(" "),a("el-breadcrumb-item",[t._v("Heat Map(svg)")])],1),t._v(" "),a("h2",[t._v("基因Heat Map(svg) "+t._s(t.$store.state._case)+" vs "+t._s(t.$store.state._control)+" ")]),t._v(" "),a("div",{staticClass:"icon-func-div"},[a("span",{staticClass:"font-size-12"},[t._v("ID显示")]),t._v(" "),a("el-switch",{attrs:{"active-text":"","inactive-text":""},on:{change:t.idShowChange},model:{value:t.idShow,callback:function(e){t.idShow=e},expression:"idShow"}})],1),t._v(" "),a("div",{attrs:{id:"chart"}})],1)],1)},staticRenderFns:[]};var o=a("VU/8")(n,i,!1,function(t){a("YGrg")},"data-v-201b7cc0",null);e.default=o.exports},YGrg:function(t,e){}});
//# sourceMappingURL=22.4ca2408bd56e46b7ee3d.js.map