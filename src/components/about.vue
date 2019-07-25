<template>
<el-container style="height:calc(100% - 62px);margin-top:2px">
  <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
    <leftMenu style="margin-top:5px"></leftMenu>
  </el-aside>
  <el-main>
    <imgMenuShowComp></imgMenuShowComp>

    <div id="venn"></div>
  </el-main>
</el-container>
</template>

<script>
import leftMenu from './leftMenu.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'

import * as d3 from 'd3'
import * as venn from 'venn.js'

export default {
  data() {
    return {
      db: null,
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  mounted() {
    var sets = [ {"sets": [2], "label": "2", "size": 100, "data":"This is how we do it"},
         {"sets": [0], "label": "0", "size": 100, "data":"This is how we do it"},
         {"sets": [1], "label": "1", "size": 100, "data":"This is how we do it"},
         {"sets": [0, 1], "label": "", "size": 20, "data":"This is how we do it"},
         {"sets": [0, 2], "label": "", "size": 20, "data":"This is how we do it"},
         {"sets": [1, 2], "label": "", "size": 20, "data":"This is how we do it"},
         {"sets": [0, 1, 2], "label": "", "size":40, "data":"This is how we do it"}];

// #vennに描画
var chart = venn.VennDiagram();
var div = d3.select("#venn")
div.datum(sets).call(chart);

var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");

div.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#fff")
    .style("stroke-width", 3)

div.selectAll("g")
    .on("mouseover", function(d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", .9);
        tooltip.text(d.size + " ユーザー");

        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
    })

    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });
  },
  methods: {

  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
</style>
