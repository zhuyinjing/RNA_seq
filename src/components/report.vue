<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backProjectList"></i>
    </el-tooltip>
    <h3 class="p-font-style">项目名称：{{$store.state.projectName}}</h3>
    <!-- <el-card class="box-card"> -->
    <h3>质量控制</h3>
    <ul>
      <li><el-button type="text" @click="report_fastqc">测序质检</el-button></li>
      <li><el-button type="text" @click="report_mappingqc">比对结果质检</el-button></li>
    </ul>
    <h3>转录本拼接概况</h3>
    <ul>
      <li><el-button type="text" disabled>基因数目：{{this.info.rnaSeqReportSummary.geneNum}}</el-button></li>
      <li><el-button type="text" disabled>转录本数目：{{this.info.rnaSeqReportSummary.transcriptNum}}</el-button></li>
      <li><el-button type="text" @click="report_new_trans">新转录本概况</el-button></li>
    </ul>
    <h3>基因表达量</h3>
    <ul>
      <li><el-button type="text" @click="report_expr_matrix">基因表达量表格（counts）</el-button></li>
    </ul>
    <h3>样本聚类概览</h3>
    <ul>
      <li><el-button type="text">样本聚类</el-button></li>
      <li><el-button type="text">PCA主成分分析</el-button></li>
    </ul>
    <h3>基因差异表达分析</h3>
    <div v-for="item in info.experimentDesign.experiments">
      <h5>比较：{{item['_case']}} vs {{item['_control']}}</h5>
      <ul>
        <li><el-button type="text" @click="report_deg(item['_case'], item['_control'])">差异表达基因</el-button></li>
        <li><el-button type="text" @click="report_volcano_plot(item['_case'], item['_control'])">火山图</el-button></li>
      </ul>
    </div>
  <!-- </el-card> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {
        rnaSeqReportSummary: {
          geneNum: null,
          transcriptNum: null
        },
        experimentDesign: {
          experiments: []
        }
      }
    }
  },
  components: {
  },
  mounted () {
    this.getIndexData()
  },
  methods: {
    getIndexData () {
      this.axios.get('/server/rnaseq_report_index?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        if (res.data.experimentDesign !== null || res.data.rnaSeqReportSummary !== null) {
          this.info = res.data
          sessionStorage.setItem('geneSum', this.info.rnaSeqReportSummary.geneNum)
        }
      })
    },
    report_deg (_case, _control) {
      sessionStorage.setItem('_case', _case)
      sessionStorage.setItem('_control', _control)
      this.$router.push({'name': 'report_deg'})
    },
    backProjectList () {
      this.$router.push({'name': 'project_list'})
    },
    report_fastqc () {
      this.$router.push({'name': 'report_fastqc'})
    },
    report_mappingqc () {
      this.$router.push({'name': 'report_mappingqc'})
    },
    report_new_trans () {
      this.$router.push({'name': 'report_new_trans'})
    },
    report_expr_matrix () {
      this.$router.push({'name': 'report_expr_matrix'})
    },
    report_volcano_plot (_case, _control) {
      sessionStorage.setItem('_case', _case)
      sessionStorage.setItem('_control', _control)
      this.$router.push({'name': 'report_volcano_plot'})
    }
  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  margin: 19px auto;
}
.p-font-style{
  color: #666;
}
.cursor-pointer{
  cursor: pointer;
}
.box-card {
    width: 500px;
  }
</style>
