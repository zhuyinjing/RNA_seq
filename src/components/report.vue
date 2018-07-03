<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item>项目 {{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
      <h2>转录组测序简介</h2>
      <p>转录组测序是对样本中所有 RNA 的集合（核糖体 RNA 除外）进行高通量测序。通过转录组测序，理论上可以得到测序样本所有基因的表达水平。结合良好的实验设计，转录组测序可以较为准确的定位到与特定表型相关的基因列表，从而可以为进一步的研究提供较为明确的研究思路。</p>

      <h2>项目{{$store.state.projectName}}基本信息</h2>
      <!-- <p>项目名称：{{$store.state.projectName}}</p> -->
      <!-- <p>基因数目：{{geneNum}}</p>
      <p>转录本数目：{{transcriptNum}}</p> -->
      <p>物种：<span class="latinNameStyle">{{this.displayLatinName}}</span> ( {{this.displayName}} )</p>
      <p>参考基因组：{{this.genome}}</p>

      <h2>项目实验设计</h2>
      <div class="tableStyle">
        <p class="p-font-style">实验条件一览</p>
        <table class="gridtable">
          <tr>
              <th>实验条件</th><th>样本名称</th>
          </tr>
          <tr v-for="(item, value, index) in $store.state.info.experimentDesign.nameSampleMap">
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item.condition}}</td>
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item.name}}</td>
          </tr>
        </table>
      </div>
      <div class="degtable">
        <p class="p-font-style">差异表达基因比对条件</p>
        <table class="gridtable">
          <tr>
              <th>实验组</th><th>对照组</th>
          </tr>
          <tr v-for="(item, index) in $store.state.info.experimentDesign.experiments">
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item._case}}</td>
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item._control}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from './leftMenu.vue'
export default {
  data () {
    return {
      geneNum: null,
      transcriptNum: null,
      displayLatinName: null,
      displayName: null,
      genome: null,
    }
  },
  components: {
    leftMenu,
  },
  mounted () {
    this.getValue()
  },
  methods: {
    getValue () {
      this.axios.get('/server/rnaseq_report_summary?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&species=' + this.$store.state.species).then((res) => {
        if (res.data.message_type === 'success') {
          this.geneNum = res.data.rnaSeqReportSummary.geneNum
          this.transcriptNum = res.data.rnaSeqReportSummary.transcriptNum
          this.displayLatinName = res.data.referenceInfo.displayLatinName
          this.displayName = res.data.referenceInfo.displayName
          this.genome = res.data.referenceInfo.genome
        }
      })
    }
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
.p-font-style{
  /* color: #666; */
}
.cursor-pointer{
  cursor: pointer;
}
.latinNameStyle {
  font-style:italic;
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
.tableStyle {
  display:inline-block;
  width:40%;
  margin-right:50px;
}
.degtable {
  display: inline-block;
  width: 40%;
}
.bgcolor {
  background-color: #f9f9f9 !important;
}
</style>
