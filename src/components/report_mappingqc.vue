<template>
  <div class="" style="width:100%;">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item>比对结果质检</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>序列比对结果统计图</h2>

      <p>转录本由基因外显子序列组成，因此转录组测序产生的 reads 理论上应主要回贴到基因外显子（包括 UTR ）区域；同时由于可变剪切事件的存在，部分 reads 会回贴到基因内含子区域；另外可能有少量 reads 会回帖到基因间区。对 reads 基因组回贴位置进行统计，可以辅助判断转录组的测序质量。
我们使用 Hisat2 软件进行基因组回帖比对分析，该软件是是 TopHat2/Bowtie2 的后续更新版本，使用改进的 BWT 算法，实现了更快的速度和更少的资源占用，作者推荐 TopHat2/Bowtie2 和 HISAT 的用户转换到 HISAT2 。</p>
      <p>参考文献：</p>

      <p>Kim D, Langmead B and Salzberg SL. HISAT: a fast spliced aligner with low memory requirements. Nature Methods 2015 </p>
      <p>[<a href="https://www.nature.com/articles/nmeth.3317">原文链接</a>]</p>

      <p>如下图所示，横坐标表示各类 reads 回贴位置，纵坐标表示每个细胞中回贴到相应位置的 reads 的数目（纵坐标轴上大写的 B 代表 Billion）。</p>

      <div id="metrics_bar"></div>

      <table class="gridtable">
        <thead>
          <tr>
            <th>样本</th>
            <th>总碱基数</th>
            <th>核糖体占比</th>
            <th>编码区占比</th>
            <th>UTR占比</th>
            <th>内含子区占比</th>
            <th>基因间区占比</th>
          </tr>
        </thead>
        <tr v-for="(item, index) in tableData">
          <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item[0]}}</td>
          <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{numFormat(item[1])}}</td>
          <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(Number(item[16])* 100).toFixed(1)}}%</td>
          <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(Number(item[17])* 100).toFixed(1)}}%</td>
          <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(Number(item[18])* 100).toFixed(1)}}%</td>
          <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(Number(item[19])* 100).toFixed(1)}}%</td>
          <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{(Number(item[20])* 100).toFixed(1)}}%</td>
        </tr>
      </table>

    </div>
    <div class="clear"></div>
  </div>

</template>

<script>
import Plotly from 'plotly.js'
import leftMenu from './leftMenu.vue'
export default {
  data () {
    return {
      traces: [],
      tableData: []
    }
  },
  components: {
    leftMenu
  },
  mounted () {
    this.initTable()
  },
  methods: {
    numFormat (num) {
        num=num.toString().split(".");  // 分隔小数点
        var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
        var res=[];
        for(var i=0,len=arr.length;i<len;i++){
          if(i%3===0&&i!==0){
             res.push(",");   // 添加分隔符
          }
          res.push(arr[i]);
        }
        res.reverse(); // 再次倒序成为正确的顺序
        if(num[1]){  // 如果有小数的话添加小数部分
          res=res.join("").concat("."+num[1]);
        }else{
          res=res.join("");
        }
        return res;
    },
    initTable () {
      this.axios.get('/server/mappingqc?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        this.tableData = res.data.slice(1)
        for (let i = 0;i < this.tableData.length;i++) {
          let data = this.tableData[i]
          let obj = {
            x: ['总碱基数', '核糖体碱基数', '编码区碱基数', 'UTR碱基数', '内含子碱基数', '基因间区碱基数'],
            y: [data[1]-0, data[3]-0, data[4]-0, data[5]-0, data[6]-0, data[7]-0],
            name: data[0],
            type: 'bar'
          }
          this.traces.push(obj)
        }
        var layout = {barmode: 'group'};
        Plotly.newPlot('metrics_bar', this.traces, layout);
      })
    },
    backReport () {
      this.$router.push({'name': 'report'})
    }
  }
}
</script>

<style scoped="true">
.content {
  float:left;
  /* width: 60%; */
  width: calc(100% - 350px);
  padding: 0 20px;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
table.gridtable {
    width: 100%;
    text-align: center;
    font-size:14px;
    color:#333333;
    border-width: 1px;
    border-color: #ebeef5;
    border-collapse: collapse;
}
table.gridtable th {
    color: #333;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #ebeef5;
}
table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #ebeef5;
    background-color: #ffffff;
}
.bgcolor {
  background-color: #f9f9f9 !important;
}
.clear {
  clear: both;
}
</style>
