<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item>项目{{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
      <h2>项目名称：{{$store.state.projectName}}</h2>
      <p>基因数目：{{$store.state.info.rnaSeqReportSummary.geneNum}}</p>
      <p>转录本数目：{{$store.state.info.rnaSeqReportSummary.transcriptNum}}</p>
    </div>
  </div>
</template>

<script>
import leftMenu from './leftMenu.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    leftMenu
  },
  mounted () {
  },
  methods: {
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
  color: #666;
}
.cursor-pointer{
  cursor: pointer;
}
</style>
