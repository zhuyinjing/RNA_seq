<template>
  <div class="content">
    <div class="">
      <h2>蛋白相互作用图</h2>

      <div class="">
        <svg width="800" height="800"></svg>
      </div>
    </div>
  </div>

</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
    }
  },
  components: {
  },
  watch: {
    '$route': 'initD3'
  },
  mounted () {
    this.initD3()
  },
  methods: {
    initD3 () {
      let hassvg = d3.selectAll('.d3svg')
      if (hassvg) {
        d3.selectAll('.d3svg').remove()
      }
      var geneIds = this.$store.state.ppiJson.geneIds;
      var geneNames = this.$store.state.ppiJson.geneNames;
      var scoreMatrix = this.$store.state.ppiJson.scoreMatrix;

      var svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          outerRadius = Math.min(width, height) * 0.5 - 100,
          innerRadius = outerRadius - 30;

      var chord = d3.chord()
          .padAngle(0.05)
          .sortSubgroups(d3.descending);

      var arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

      var ribbon = d3.ribbon()
          .radius(innerRadius);

      var color = d3.scaleOrdinal(d3.schemeCategory20c);

      var group = svg.append("g")
          .attr("class", "d3svg")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .datum(chord(scoreMatrix));

      group.append("g")
          .attr("class", "ribbons")
          .selectAll("path")
          .data(function(chords) {  return chords; })
          .enter().append("path")
          .attr("d", ribbon)
          .style("fill", function(d) { return color(d.target.index); })
          .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); })
          .attr("class", "oneRibbon");

      var arcGroup = group.append("g")
          .attr("class", "groups")
          .selectAll("g")
          .data(function(chords) {
              return chords.groups; })
          .enter().append("g");

      arcGroup.append("path")
          .style("fill", function(d) { return color(d.index); })
          .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
          .attr("d", arc)
          .attr("class", "oneArc");

      arcGroup.append("text")
          .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
          .attr("transform", function(d) {
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + (innerRadius + 35) + ")"
                  + (d.angle > Math.PI ? "rotate(180)" : "");
          })
          .text(
              function (d, i) {
                  return geneNames[i];
              });

      function fadeOver(d, i) {

          var idx = d.index;
          group.selectAll(".oneRibbon").filter(

              function (data, i) {
                  if (data.source.index == idx || data.target.index == idx) {
                      return false;
                  } else {
                      return true;
                  }
              }
          ).transition().style("opacity", 0);
      };

      function fadeOut(d, i) {
          group.selectAll(".oneRibbon").transition().style("opacity", 1);
      };

      arcGroup.selectAll(".oneArc")
          .on("mouseover",fadeOver)
          .on("mouseout",fadeOut);
    }
  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  padding: 0 20px;
  margin: 19px auto;
}
.cursor-pointer{
  cursor: pointer;
}
</style>
