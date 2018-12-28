<template>
  <div id="container">
    <el-button type="primary" size="small" icon="el-icon-picture" @click="$store.commit('d3saveSVG', ['pc-3d', 'scatterContainer'])">{{$t('button.svg')}}</el-button>
    <i class="el-icon-question cursor-pointer" style="font-size:16px" @click="$store.state.svgDescribeShow = true"></i>

    <div id="scatterContainer"></div>
    <el-button type="primary" @click="initD3()">init</el-button>

  </div>
</template>

<script>
import * as d3 from 'd3'
import { _3d } from 'd3-3d'
export default {
  data() {
    return {
      db: null,
      data: null,
    }
  },
  components: {
  },
  mounted() {
    this.axios.get('/server/pca4gene?username=' + this.$store.state.username + '&p=' + 1).then((res) => {
      this.data = Object.values(res.data.pca4GeneExprMatrix.sampleCoordMap)
      this.initD3()
    })
  },
  methods: {
    initD3 () {
      let hassvg = d3.selectAll('#scatterSvg')
      if (hassvg) {
        d3.selectAll('#scatterSvg').remove()
      }
      let width = 960, height = 600
      d3.select("#scatterContainer").append("svg").attr("width",width).attr("height",height).attr("id","scatterSvg")
      d3._3d = _3d

      var origin = [480, 250], j = 10, scale = 10, scatter = [], xLine = [], yLine = [],zLine = [], xGrid = [], beta = 0, alpha = 0, key = function(d){ return d.id; }, startAngle = Math.PI/4;
      var svg    = d3.select('#scatterSvg').call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g');
      var color  = d3.scaleOrdinal(d3.schemeCategory20);
      var mx, my, mouseX, mouseY;
      var xAxisText = d3.select("#scatterSvg").append("text").text("pc1")
      var yAxisText = d3.select("#scatterSvg").append("text").text("pc2")
      var zxisText = d3.select("#scatterSvg").append("text").text("pc3")
      var textX,textY

      var grid3d = d3._3d()
          .shape('GRID', 20)
          .origin(origin)
          .rotateY( startAngle)
          .rotateX(-startAngle)
          .scale(scale);

      var point3d = d3._3d()
          .x(function(d,i){ return d[0]; })
          .y(function(d,i){ return d[1]; })
          .z(function(d,i){ return d[2]; })
          .origin(origin)
          .rotateY( startAngle)
          .rotateX(-startAngle)
          .scale(scale);

      var yScale3d = d3._3d()
          .shape('LINE_STRIP')
          .origin(origin)
          .rotateY( startAngle)
          .rotateX(-startAngle)
          .scale(scale);

      var xScale3d = d3._3d()
          .shape('LINE_STRIP')
          .origin(origin)
          .rotateY( startAngle)
          .rotateX(-startAngle)
          .scale(scale);

      var zScale3d = d3._3d()
          .shape('LINE_STRIP')
          .origin(origin)
          .rotateY( startAngle)
          .rotateX(-startAngle)
          .scale(scale);

      function processData(data, tt){

          /* ----------- GRID ----------- */

          var xGrid = svg.selectAll('path.grid').data(data[0], key);

          xGrid
              .enter()
              .append('path')
              .attr('class', '_3d grid')
              .merge(xGrid)
              .attr('stroke', 'black')
              .attr('stroke-width', 0.3)
              .attr('fill', function(d){ return d.ccw ? 'lightgrey' : '#717171'; })
              .attr('fill-opacity', 0.9)
              .attr('d', grid3d.draw);

          xGrid.exit().remove();

          /* ----------- POINTS ----------- */
          var points = svg.selectAll('circle').data(data[1], key);

          points
              .enter()
              .append('circle')
              .attr('class', '_3d')
              .attr('opacity', 0)
              .attr('cx', (d) => d.projected.x)
              .attr('cy', (d) => d.projected.y)
              .merge(points)
              .transition().duration(tt)
              .attr('r', 3)
              .attr('stroke', function(d){ return d3.color(color(d[3])).darker(3); })
              .attr('fill', function(d){ return color(d[3]); })
              .attr('opacity', 1)
              .attr('cx', (d) => d.projected.x)
              .attr('cy', (d) => d.projected.y)

          points.exit().remove();

          /* ----------- y-Scale ----------- */

          var yScale = svg.selectAll('path.yScale').data(data[2]);

          yScale
              .enter()
              .append('path')
              .attr('class', '_3d yScale')
              .merge(yScale)
              .attr('stroke', 'black')
              .attr('stroke-width', .5)
              .attr('d', yScale3d.draw);

          yScale.exit().remove();

          var xScale = svg.selectAll('path.xScale').data(data[3]);

          xScale
              .enter()
              .append('path')
              .attr('class', '_3d xScale')
              .merge(xScale)
              .attr('stroke', 'black')
              .attr('stroke-width', .5)
              .attr('d', xScale3d.draw);

          xScale.exit().remove();

          var zScale = svg.selectAll('path.zScale').data(data[4]);

          zScale
              .enter()
              .append('path')
              .attr('class', '_3d zScale')
              .merge(zScale)
              .attr('stroke', 'black')
              .attr('stroke-width', .5)
              .attr('d', zScale3d.draw);

          zScale.exit().remove();

           /* ----------- y-Scale Text ----------- */

          var yText = svg.selectAll('text.yText').data(data[2][0]);


          let a,b
          yText
              .enter()
              .append('text')
              .attr('class', '_3d yText')
              .attr('dx', '.3em')
              .merge(yText)
              .each(function(d){
                  d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
              })
              .attr('x', function(d,i){
                if(i === data[2][0].length - 1) {
                  textX = d.projected.x
                }
                return d.projected.x;
              })
              .attr('y', function(d,i){
                if(i === data[2][0].length - 1) {
                  textY = d.projected.y
                }
                return d.projected.y;
              })
              .text(function(d,i){ return i === 0 ? '' : d[1] });

          yAxisText.attr("transform","translate("+ (textX-30) + "," + textY +")")

          yText.exit().remove();

          var xText = svg.selectAll('text.xText').data(data[3][0]);

          xText
              .enter()
              .append('text')
              .attr('class', '_3d xText')
              // .attr('dx', '.3em')
              .attr('dy', '.5em')
              .merge(xText)
              .each(function(d){
                  d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
              })
              .attr('x', function(d,i){
                if(i === data[3][0].length - 1) {
                  textX = d.projected.x
                }
                return d.projected.x;
              })
              .attr('y', function(d,i){
                if(i === data[3][0].length - 1) {
                  textY = d.projected.y
                }
                return d.projected.y;
              })
              .text(function(d,i){ return i === 0 ? '' : d[0] });

          xAxisText.attr("transform","translate("+ (textX - 30) + "," + textY +")")

          xText.exit().remove();

          var zText = svg.selectAll('text.zText').data(data[4][0]);

          zText
              .enter()
              .append('text')
              .attr('class', '_3d zText')
              // .attr('dx', '.3em')
              .attr('dy', '.5em')
              .merge(zText)
              .each(function(d){
                  d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
              })
              .attr('x', function(d,i){
                if(i === data[4][0].length - 1) {
                  textX = d.projected.x
                }
                return d.projected.x;
              })
              .attr('y', function(d,i){
                if(i === data[4][0].length - 1) {
                  textY = d.projected.y
                }
                return d.projected.y;
              })
              .text(function(d,i){ return i === 0 ? '' : d[2] });

          zxisText.attr("transform","translate("+ textX + "," + (textY + 30) +")")

          zText.exit().remove();

          d3.selectAll('._3d').sort(d3._3d().sort);
    }
    let self = this
    	function init(){
        xGrid = [], scatter = [], xLine = [],yLine = [],zLine = []
        for(var z = -j; z < j; z++){ // j:10
            for(var x = -j; x < j; x++){
                // xGrid.push([x, 5, z]);
            }
        }

        scatter = [[0,5,0,0],[-10,1,-10,1],[9,1,9,3],[-2,-2,-2,4]]

        d3.range(-1, 11, 1).forEach(function(d){ yLine.push([-j, -d, -j]); }); // d3.range(start,stop,step)

        d3.range(-10, 10, 1).forEach(function(d){ xLine.push([d, 1, -j]); }); // d3.range(start,stop,step)

        d3.range(-10, 10, 1).forEach(function(d){ zLine.push([-j, 1, d]); }); // d3.range(start,stop,step)

        let xmin = Math.floor(d3.min(self.data.map(item => item[0])))
        let xmax = Math.ceil(d3.max(self.data.map(item => item[0])))
        let ymin = Math.floor(d3.min(self.data.map(item => item[1])))
        let ymax = Math.ceil(d3.max(self.data.map(item => item[1])))
        let zmin = Math.floor(d3.min(self.data.map(item => item[2])))
        let zmax = Math.ceil(d3.max(self.data.map(item => item[2])))

        xLine = [[xmin,ymax,zmin],[xmax,ymax,zmin]]
        yLine = [[xmin,ymax,zmin],[xmin,ymin,zmin]]
        zLine = [[xmin,ymax,zmin],[xmin,ymax,zmax]]

        var data = [
            grid3d(xGrid),
            point3d(self.data),
            yScale3d([yLine]),
            xScale3d([xLine]),
            zScale3d([zLine])
        ];
        processData(data, 200);
    }

    function dragStart(){
        mx = d3.event.x;
        my = d3.event.y;
    }

    function dragged(){
        mouseX = mouseX || 0;
        mouseY = mouseY || 0;
        beta   = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
        alpha  = (d3.event.y - my + mouseY) * Math.PI / 230  * (-1);
        var data = [
            grid3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(xGrid),
            point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(self.data),
            yScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([yLine]),
            xScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([xLine]),
            zScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([zLine]),
        ];
        processData(data, 0);
    }

    function dragEnd(){
        mouseX = d3.event.x - mx + mouseX;
        mouseY = d3.event.y - my + mouseY;
    }

    init();

    }
  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
</style>
