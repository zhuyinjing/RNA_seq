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
        "rnaSeqReportSummary": {
          "id": "5b0f65f129e35f57bfcbceb7",
          "projectId": 8,
          "geneNum": 56802,
          "transcriptNum": 213919,
          "exonNum": 1349559,
          "newTranscriptNum": 0,
          "geneWithNewTranscriptNum": 0
        },
        "experimentDesign": {
          "id": "5af95843132dcd1671074272",
          "projectId": 8,
          "conditionNumMap": {
            "A": 3,
            "B": 3,
            "C": 3
          },
          "nameSampleMap": {
            "A_1": {
              "name": "A_1",
              "condition": "A",
              "readPairList": [
                {
                  "r1": "A_1.L2.1.fq.gz",
                  "r2": "A_1.L2.2.fq.gz"
                },
                {
                  "r1": "A_1.L2.1.fq.gz",
                  "r2": "A_1.L2.2.fq.gz"
                },
                {
                  "r1": "A_1.L3.1.fq.gz",
                  "r2": "A_1.L3.2.fq.gz"
                }
              ]
            },
            "A_2": {
              "name": "A_2",
              "condition": "A",
              "readPairList": [
                {
                  "r1": "A_2.L1.1.fq.gz",
                  "r2": "A_2.L1.2.fq.gz"
                }
              ]
            },
            "A_3": {
              "name": "A_3",
              "condition": "A",
              "readPairList": []
            },
            "B_1": {
              "name": "B_1",
              "condition": "B",
              "readPairList": [
                {
                  "r1": "B_1.L1.1.fq.gz",
                  "r2": "B_1.L1.2.fq.gz"
                }
              ]
            },
            "B_2": {
              "name": "B_2",
              "condition": "B",
              "readPairList": [
                {
                  "r1": "B_2.L1.1.fq.gz",
                  "r2": "B_2.L1.2.fq.gz"
                }
              ]
            },
            "B_3": {
              "name": "B_3",
              "condition": "B",
              "readPairList": []
            },
            "C_1": {
              "name": "C_1",
              "condition": "C",
              "readPairList": []
            },
            "C_2": {
              "name": "C_2",
              "condition": "C",
              "readPairList": []
            },
            "C_3": {
              "name": "C_3",
              "condition": "C",
              "readPairList": []
            }
          },
          "experiments": [
            {
              "_case": "A",
              "_control": "B"
            },
            {
              "_case": "A",
              "_control": "C"
            },
            {
              "_case": "B",
              "_control": "C"
            }
          ]
        }
      }
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
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
