<template>
  <div class="">
    <h2 class="text-align-center"> {{$store.state._case}} vs {{$store.state._control}} </h2>
    <el-card class="text-align-center">当前差异表达基因筛选条件：P-Value <= 0.05, FDR <= 0.05,  | Log2(FoldChange) | >= 1</el-card> <br>
    <div class="margin-bottom-20">
      <el-button type="danger"  @click="report_deg()">差异基因</el-button>
      <el-button type="danger"  @click="report_volcano_plot()">火山图</el-button>
      <el-button type="danger"  @click="heatmap()">基因热图</el-button>
      <el-button type="success" @click="heatmapsvg()">基因热图svg</el-button>
      <el-button type="primary" @click="ppi_chord_plot()">蛋白互作图</el-button>
      <el-button type="primary" @click="enrichment_analysis()">富集分析</el-button>
    </div>
    <br>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    report_deg () {
      this.$router.push({'name': 'report_deg', query: {'_case': this.$store.state._case, '_control': this.$store.state._control}})
    },
    report_volcano_plot () {
      this.$router.push({'name': 'report_volcano_plot', query: {'_case': this.$store.state._case, '_control': this.$store.state._control}})
    },
    heatmap () {
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('caseSample', this.$store.state._case)
      formData.append('controlSample', this.$store.state._control)
      this.axios.post('/server/heatmap.app.for_report', formData).then((res) => {
        this.$store.commit('setheatmapJson', res.data.message)
        this.$router.push({'name': 'heatmap', query: {'_case': this.$store.state._case, '_control': this.$store.state._control}})
      })
    },
    heatmapsvg () {
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('caseSample', this.$store.state._case)
      formData.append('controlSample', this.$store.state._control)
      this.axios.post('/server/heatmap.app.for_report', formData).then((res) => {
        this.$store.commit('setheatmapJson', res.data.message)
        this.$router.push({'name': 'heatmapsvg', query: {'_case': this.$store.state._case, '_control': this.$store.state._control}})
      })
    },
    ppi_chord_plot () {
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('caseSample', this.$store.state._case)
      formData.append('controlSample', this.$store.state._control)
      this.axios.post('/server/ppi_chord_plot.app.for_report', formData).then((res) => {
        if (res.data.message_type === 'warn') {
          this.$message.error(res.data.message)
        } else {
          this.$store.commit('setppiJson', res.data.message)
          this.$router.push({'name': 'ppi_chord_plot', query: {'_case': this.$store.state._case, '_control': this.$store.state._control}})
        }
      })
    },
    enrichment_analysis () {
      this.$router.push({'name': 'enrichment_analysis', query: {'_case': this.$store.state._case, '_control': this.$store.state._control}})
    },

  }
}
</script>

<style scoped="true">
.cursor-pointer{
  cursor: pointer;
}
.text-align-center {
  text-align: center;
}
</style>
