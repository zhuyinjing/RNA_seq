<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item :to="{ path: 'report' }">项目{{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item>样本聚类图</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>样本聚类图</h2>

      <label id="show-length">
        <input type="checkbox"> Show branch length
      </label>

      <div id="container"></div>

      <!-- <svg xmlns="http://www.w3.org/2000/svg">

            <path d="M50,50A30,50 0 0,1 100,100L150,150"style="stroke:pink; fill:none;"/>

      </svg> -->

    </div>

  </div>
</template>

<script>
import * as d3 from 'd3'
import leftMenu from './leftMenu.vue'

export default {
  data () {
    return {
      tableValue: [],
      clusterData: null
    }
  },
  components: {
    leftMenu
  },
  mounted () {
    this.clusterData = {"id":"5b3313aa29e35f6c8b5665bc","projectId":8,"rootNode":
    {"id":"11","parent":null,"depth":0,"branchset":[
      {"id":"5","parent":"11","depth":1,"branchset":[
        {"id":"2","parent":"5","depth":2,"branchset":[
          {"id":"Normal_4","parent":"2","depth":3,"length":
35.9991,"rowVector":[48.79585,50.41017,51.624958,49.295517,49.018967,48.07381,57.006012,35.79342,38.025677,37.615658,0.0,34.99692]},
          {"id":"Normal_5","parent":"2","depth":3,"length":
35.9991,"rowVector":[49.013542,49.23966,51.764057,47.15798,49.919147,49.509556,58.279724,37.577545,38.657074,40.26143,34.99692,0.0]}],
          "length":42.01026},
          {"id":"4","parent":"5","depth":2,"branchset":[
            {"id":"Normal_3","parent":"4","depth":3,"length":
40.22758,"rowVector":[46.613316,45.039047,44.987103,46.518356,43.98809,44.319973,51.262444,38.651115,38.060524,0.0,37.615658,40.26143]},
          {"id":"1","parent":"4","depth":3,"branchset":[
            {"id":"Normal_1","parent":"1","depth":4,"length":
35.02959,"rowVector":[47.61148,48.870983,48.78939,48.925926,47.70994,47.398006,56.17935,0.0,33.674393,38.651115,35.79342,37.577545]},
            {"id":"Normal_2","parent":"1","depth":4,"length":
35.02959,"rowVector":[48.165073,48.92974,49.512016,49.9885,47.30491,48.518036,60.216454,33.674393,0.0,38.060524,38.025677,38.657074]}],
            "length":40.22758}],
            "length":42.01026}],
            "length":76.63057},
            {"id":"10","parent":"11","depth":1,"branchset":[
              {"id":"6","parent":"10","depth":2,"branchset":[
                {"id":"B_3","parent":"6","depth":3,"length":42.09858,"rowVector":[44.953194,46.857273,44.190742,47.74009,42.27425,0.0,40.646328,47.398006,48.518036,44.319973,48.07381,49.509556]},
                {"id":"B_4","parent":"6","depth":3,"length":42.09858,"rowVector":[51.020706,50.571735,48.871532,52.18136,45.083244,40.646328,0.0,56.17935,60.216454,51.262444,57.006012,58.279724]}],
                "length":
58.53869},
                {"id":"9","parent":"10","depth":2,"branchset":[
                  {"id":"7","parent":"9","depth":3,"branchset":[
                    {"id":"A_1","parent":"7","depth":4,"length":42.309,"rowVector":[0.0,45.31672,43.099777,41.697063,40.38662,44.953194,51.020706,47.61148,48.165073,46.613316,48.79585,49.013542]},
                    {"id":"B_1","parent":"7","depth":4,"length":42.309,"rowVector":[41.697063,41.524952,49.548077,0.0,46.75912,47.74009,52.18136,48.925926,49.9885,46.518356,49.295517,47.15798]}],
                    "length":50.16795},
                    {"id":"8","parent":"9","depth":3,"branchset":[
                      {"id":"A_2","parent":"8","depth":4,"length":
43.28125,"rowVector":[45.31672,0.0,41.499763,41.524952,40.76616,46.857273,50.571735,48.870983,48.92974,45.039047,50.41017,49.23966]},
                    {"id":"3","parent":"8","depth":4,"branchset":[
                      {"id":"A_3","parent":"3","depth":5,"length":38.26423,"rowVector":[43.099777,41.499763,0.0,49.548077,36.88292,44.190742,48.871532,48.78939,49.512016,44.987103,51.624958,51.764057]},
                      {"id":"B_2","parent":"3","depth":5,"length":38.26423,"rowVector":[40.38662,40.76616,36.88292,46.75912,0.0,42.27425,45.083244,47.70994,47.30491,43.98809,49.018967,49.919147]}],
                      "length":38.26423}],
                      "length":50.16795}],
                      "length":58.53869}],
                      "length":76.63057}],
                      "length":0},
                      "labels":["A_1","A_2","A_3","B_1","B_2","B_3","B_4","Normal_1","Normal_2","Normal_3","Normal_4","Normal_5"]}
    this.axios.get('/server/hclust?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
      this.clusterData = res.data
    })
    this.initD3()
  },
  methods: {
    initD3 () {
  //     let self = this
  //     var width = 600,
  //       height = 600;
  //
  //   var cluster = d3.layout.cluster()
  //       .size([height, width - 160]);
  //
  //   var svg = d3.select("body").append("svg")
  //       .attr("width", width)
  //       .attr("height", height)
  //     .append("g")
  //       .attr("transform", "translate(40,0)");
  //
  //   d3.json("/static/city.json", function(json) {
  //     json = self.clusterData.rootNode
  //     var nodes = cluster.nodes(json);
  //
  //     var link = svg.selectAll(".link")
  //         .data(cluster.links(nodes))
  //       .enter().append("path")
  //         .attr("class", "link")
  //         .attr("d", elbow);
  //
  //     var node = svg.selectAll(".node")
  //         .data(nodes)
  //       .enter().append("g")
  //         .attr("class", "node")
  //         .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
  //
  //     node.append("circle")
  //         .attr("r", 4.5);
  //
  //     node.append("text")
  //         .attr("dx", function(d) { return d.children ? -8 : 8; })
  //         .attr("dy", 3)
  //         .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
  //         .text(function(d) { return d.id; });
  //   });
  //
  //   function elbow(d, i) {
  //     return "M" + d.source.y + "," + d.source.x
  //         + "V" + d.target.x + "H" + d.target.y;
  //   }

      let self = this
      function parseNewick(a){
        for(var e=[],r={},s=a.split(/\s*(;|\(|\)|,|:)\s*/),t=0;t<s.length;t++){
          var n=s[t];
          switch(n){
            case"(":
            var c={};r.branchset=[c],e.push(r),r=c;
            break;
            case",":
            var c={};e[e.length-1].branchset.push(c),r=c;
            break;
            case")":
            r=e.pop();
            break;
            case":":
            break;
            default:
            var h=s[t-1];")"==h||"("==h||","==h?r.name=n:":"==h&&(r.length=parseFloat(n))}
          }
          console.log(r);
          return r
        }
      var outerRadius = 800 / 2,
    innerRadius = outerRadius - 170;

var color = d3.scaleOrdinal()
    .domain([0,d3.max(self.tableValue)])
    .range(d3.schemeCategory10);

var cluster = d3.cluster()
    .size([360, innerRadius])
    .separation(function(a, b) { return 1; });

var svg = d3.select("#container").append("svg")
    .attr("width", outerRadius * 2)
    .attr("height", outerRadius * 2);

var chart = svg.append("g")
    .attr("transform", "translate(" + outerRadius / 2 + "," + outerRadius / 2 + ")");

d3.text("/static/life.txt", function(error, life) {
  var root = d3.hierarchy(self.clusterData.rootNode, function(d) {
    return d.branchset;
  })
      .sum(function(d) { return d.branchset ? 0 : 1; })
      .sort(function(a, b) {
        return (a.value - b.value) || d3.ascending(a.data.length, b.data.length);
      });
  // var root = d3.hierarchy(parseNewick(life), function(d) {
  //   return d.branchset;
  // })
  //     .sum(function(d) {
  //       return d.branchset ? 0 : 1;
  //     })
  //     .sort(function(a, b) {
  //       return (a.value - b.value) || d3.ascending(a.data.length, b.data.length);
  //     });
  cluster(root);

  var input = d3.select("#show-length input").on("change", changed),
      timeout = setTimeout(function() { input.property("checked", true).each(changed); }, 2000);

  setRadius(root, root.data.length = 0, innerRadius / maxLength(root));
  // setColor(root);
  var linkExtension = chart.append("g")
      .attr("class", "link-extensions")
    .selectAll("path")
    .data(root.links().filter(function(d) { return !d.target.children; }))
    .enter().append("path")
      .each(function(d) {
        for(let i = 0;i < d.target.data.rowVector.length; i++) {
          self.tableValue.push(d.target.data.rowVector[i])
        }
        d.target.linkExtensionNode = this;
      })
      .attr("d", linkExtensionConstant)

  var link = chart.append("g")
      .attr("class", "links")
    .selectAll("path")
    .data(root.links())
    .enter().append("path")
      .each(function(d) { d.target.linkNode = this; })
      .attr("d", linkConstant)
      .attr("stroke", function(d) { return d.target.color; });

  var rightArea = chart.append("g")
    .attr("class", "labels")
    // .selectAll("text")
    // .data(root.leaves())
    // .enter()
    // .append("text")
      // .attr("dy", ".31em")
      .attr("transform", function(d, i) { return "translate(" + (innerRadius + 5) + ","+ (i + 0.5) +")"; })
      // .attr("text-anchor", function(d) { return  "start"  })
      // .text(function(d) {
      //   return d.data.id;
      // })


  var linear = d3.scaleLinear()
      .domain([0, 20, 40])
      .range([(d3.rgb(6,113,160)), (d3.rgb(2,218,150)), (d3.rgb(120,248,232))]);

  let gridSize = 30
  let gridHeight = 30

  // rightArea.selectAll(".testLabel")
  //     .data(root.leaves())
  //     .enter().append("text")
  //     .text(function(d) { return d.data.id; })
  //     .attr("x", function(d, i) { return i * gridSize; })
  //     .attr("y", 0)
  //     .attr("class", 'xText')
  //     .style("text-anchor", "middle")
  //     .style("font-size", "6px")
  //     .style("font-family", "Consolas, Monaco, monospace")
  //     .attr("transform", "translate(" + gridSize / 2 + ", -6)")

  rightArea.selectAll(".score")
      .data(self.tableValue)
      .enter()
      .append("rect")
      .attr("x", function(d, i){
        return (i % 12) * gridSize;
      })
      .attr("y", function(d, i){ return parseInt(i / 12) * gridHeight;})
      .attr("width", gridSize)
      .attr("height", gridHeight)
      .style("fill", function(d) { return linear(d) })
      .append("title").text(function(d) { return d; });

  function changed() {
    clearTimeout(timeout);
    var t = d3.transition().duration(750);
    linkExtension.transition(t).attr("d", this.checked ? linkExtensionVariable : linkExtensionConstant);
    link.transition(t).attr("d", this.checked ? linkVariable : linkConstant);
  }

});

// Compute the maximum cumulative length of any node in the tree.
function maxLength(d) {
  return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
}

// Set the radius of each node by recursively summing and scaling the distance from the root.
function setRadius(d, y0, k) {
  d.radius = (y0 += d.data.length) * k;
  if (d.children) d.children.forEach(function(d) { setRadius(d, y0, k); });
}

// Set the color of each node by recursively inheriting.
function setColor(d) {
  // var name = d.data.name;
  // d.color = color.domain().indexOf(name) >= 0 ? color(name) : d.parent ? d.parent.color : null;
  // if (d.children) d.children.forEach(setColor);
}

function linkVariable(d) {
  return linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius);
}

function linkConstant(d) {
  return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
}

function linkExtensionVariable(d) {
  return linkStep(d.target.x, d.target.radius, d.target.x, innerRadius);
}

function linkExtensionConstant(d) {
  return linkStep(d.target.x, d.target.y, d.target.x, innerRadius);
}

// Like d3.svg.diagonal.radial, but with square corners.
function linkStep(startAngle, startRadius, endAngle, endRadius) {
  // var c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI),
  //     s0 = Math.sin(startAngle),
  //     c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI),
  //     s1 = Math.sin(endAngle);
  // return "M" + startRadius * c0 + "," + startRadius * s0
  //     + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
  //     + "L" + endRadius * c1 + "," + endRadius * s1;
  return "M" + startRadius  + "," + startAngle
      + (endAngle === startAngle ? "" : "L" + startRadius  + "," + endAngle)
      + "L" + endRadius  + "," + endAngle;
}



    },

  }
}
</script>

<style scoped="true">
.content {
  float:left;
  width: 60%;
  padding: 0 20px;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
<style media="screen">
.node circle {
fill: #999;
}

.node text {
font: 10px sans-serif;
}

.node--internal circle {
fill: #555;
}

.node--internal text {
text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
}

.link {
fill: none;
stroke: #555;
stroke-opacity: 0.4;
stroke-width: 1.5px;
}

.links {
  fill: none;
  stroke: #000;
}

.link-extensions {
  fill: none;
  stroke: #000;
  stroke-opacity: .25;
}

.labels {
  font: 10px sans-serif;
}

.link--active {
  stroke: #000 !important;
  stroke-width: 1.5px;
}

.link-extension--active {
  stroke-opacity: .6;
}

.label--active {
  font-weight: bold;
}


</style>
