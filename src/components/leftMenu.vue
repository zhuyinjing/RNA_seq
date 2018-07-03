<template>
  <div>
    <el-menu style="padding: 0 10px;" :default-active="$store.state.leftMenuIndex" class="el-menu-vertical-demo">
        <el-menu-item index="0-0" @click="report">报告首页</el-menu-item>
        <el-menu-item-group>
          <span slot="">质量控制</span>
          <el-menu-item index="1-0" @click="report_fastqc">测序质检</el-menu-item>
          <el-menu-item index="1-1" @click="report_mappingqc">比对结果质检</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span slot="">转录本拼接概况</span>
          <el-menu-item index="2-0" @click="report_new_trans">新转录本概况</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span slot="">基因表达量</span>
          <el-menu-item index="3-0" @click="report_expr_matrix">基因表达量表格（TPM）</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <span slot="">样本聚类概览</span>
          <el-menu-item index="4-0" @click="plotCluster">样本聚类</el-menu-item>
          <!-- <a :href="'/projects/'+ $store.state.projectId +'/results/050.DESeq2/plotCluster.pdf'" target="_blank"><el-menu-item index="4-0" >样本聚类</el-menu-item></a> -->
          <a :href="'/projects/'+ $store.state.projectId +'/results/050.DESeq2/plotPCA_deseq.pdf'" target="_blank"><el-menu-item index="4-1" >PCA主成分分析</el-menu-item></a>
          <a :href="'/projects/'+ $store.state.projectId +'/results/050.DESeq2/plotMA_deseq.pdf'" target="_blank"><el-menu-item index="4-2" >MA图</el-menu-item></a>
          <a :href="'/projects/'+ this.$store.state.projectId +'/results/050.DESeq2/ALL.pairs.pdf'" target="_blank"><el-menu-item index="4-3" >样本相关性图</el-menu-item></a>
        </el-menu-item-group>
        <el-menu-item-group>
          <span slot="">基因差异表达分析</span>
          <el-menu-item-group v-for="(item, index) in $store.state.info.experimentDesign.experiments" :key="index">
            <span slot="" style="font-size:14px">比较：{{item['_case']}} vs {{item['_control']}}</span>
            <el-menu-item :index="'5-' + index" @click="report_volcano_plot(item['_case'], item['_control'], index)">火山图</el-menu-item>
            <el-menu-item :index="'5-' + index + '-1'" @click="report_deg(item['_case'], item['_control'], index)">差异表达基因</el-menu-item>
            <el-menu-item :index="'5-' + index + '-2'" @click="heatmap(item['_case'], item['_control'], index)">Heat Map</el-menu-item>
            <el-menu-item :index="'5-' + index + '-3'" @click="ppi(item['_case'], item['_control'], index)">蛋白相互作用图</el-menu-item>
          </el-menu-item-group>
        </el-menu-item-group>
    </el-menu>
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
    switch (this.$route.path) {
      case '/report':
        this.$store.commit('setleftMenuIndex', '0-0')
        break;
    }
  },
  methods: {
    report () {
      this.$store.commit('setleftMenuIndex', '0-0')
      this.$router.push({'name': 'report'})
    },
    report_deg (_case, _control, index) {
      this.$store.commit('set_case', _case)
      this.$store.commit('set_control', _control)
      this.$store.commit('setleftMenuIndex', '5-' + index + '-1')
      this.$router.push({'name': 'report_deg', query: {'_case': _case, '_control': _control}})
    },
    report_fastqc () {
      this.$store.commit('setleftMenuIndex', '1-0')
      this.$router.push({'name': 'report_fastqc'})
    },
    report_mappingqc () {
      this.$store.commit('setleftMenuIndex', '1-1')
      this.$router.push({'name': 'report_mappingqc'})
    },
    report_new_trans () {
      this.$store.commit('setleftMenuIndex', '2-0')
      this.$router.push({'name': 'report_new_trans'})
    },
    report_expr_matrix () {
      this.$store.commit('setleftMenuIndex', '3-0')
      this.$router.push({'name': 'report_expr_matrix'})
    },
    report_volcano_plot (_case, _control, index) {
      this.$store.commit('setleftMenuIndex', '5-' + index)
      this.$store.commit('set_case', _case)
      this.$store.commit('set_control', _control)
      this.$router.push({'name': 'report_volcano_plot', query: {'_case': _case, '_control': _control}})
    },
    plotCluster () {
      this.$store.commit('setleftMenuIndex', '4-0')
      this.$router.push({'name': 'plotCluster'})
    },
    plot_cluster () {
      this.$store.commit('setleftMenuIndex', '4-0')
    },
    plot_pca () {
      this.$store.commit('setleftMenuIndex', '4-1')
    },
    plot_ma () {
      this.$store.commit('setleftMenuIndex', '4-2')
    },
    plot_correlation () {
      this.$store.commit('setleftMenuIndex', '4-3')
    },
    heatmap (_case, _control, index) {
      this.$store.commit('setleftMenuIndex', '5-' + index + '-2')
      this.$store.commit('set_case', _case)
      this.$store.commit('set_control', _control)
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('caseSample', _case)
      formData.append('controlSample', _control)
      this.axios.post('/server/heatmap.app.for_report', formData).then((res) => {
        this.$store.commit('setheatmapJson', res.data.message)
        this.$router.push({'name': 'heatmap', query: {'_case': _case, '_control': _control}})
      })
    },
    ppi (_case, _control, index) {
      this.$store.commit('setleftMenuIndex', '5-' + index + '-3')
      this.$store.commit('set_case', _case)
      this.$store.commit('set_control', _control)
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('caseSample', _case)
      formData.append('controlSample', _control)
      this.axios.post('/server/ppi_chord_plot.app.for_report', formData).then((res) => {
        if (res.data.message_type === 'warn') {
          this.$message.error(res.data.message)
        } else {
          this.$store.commit('setppiJson', res.data.message)
          this.$router.push({'name': 'ppi_chord_plot', query: {'_case': _case, '_control': _control}})
        }
      })
    },
  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
li {
  list-style: none;
}
a:hover, a:visited, a:link, a:active {
  text-decoration: none;
  out-line: none;
}
</style>
<style media="screen">
  .el-menu {
    /* border-right: none; */
  }
</style>
