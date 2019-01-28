<template>
  <div>
    <el-menu v-show="isCollapse" style="padding: 0 10px;" :default-active="$route.name" class="el-menu-vertical-demo">
      <!-- <el-menu-item-group>
        <span slot="" class="title-style">测序数据分布统计</span>
        <el-menu-item index="1-0">不同单细胞测序量</el-menu-item>
        <el-menu-item index="1-0">测序读段回贴位置分布</el-menu-item>
      </el-menu-item-group> -->
      <router-link to="/sc"><el-menu-item index="sc_report">报告首页</el-menu-item></router-link>
      <router-link to="/sc/report_sequence_amount"><el-menu-item index="report_sequence_amount">不同单细胞测序量</el-menu-item></router-link>
      <router-link to="/sc/report_box_plot"><el-menu-item index="report_box_plot">测序读段回贴位置分布</el-menu-item></router-link>
      <router-link to="/sc/report_umi_count"><el-menu-item index="report_umi_count">单细胞转录组表达基因与UMI计数统计</el-menu-item></router-link>
      <router-link to="/sc/report_heterogeneous_gene"><el-menu-item index="report_heterogeneous_gene">表达异质化基因筛选</el-menu-item></router-link>
      <router-link to="/sc/report_viz_PCA"><el-menu-item index="report_viz_PCA">viz PCA</el-menu-item></router-link>
      <router-link to="/sc/report_pca"><el-menu-item index="report_pca">PCA 散点图</el-menu-item></router-link>
      <router-link to="/sc/report_pca_3d"><el-menu-item index="report_pca_3d">PCA 散点图 3D</el-menu-item></router-link>
      <router-link to="/sc/report_pca_heatmap"><el-menu-item index="report_pca_heatmap">PCA 热图</el-menu-item></router-link>
      <router-link to="/sc/report_JackStrawPlot"><el-menu-item index="report_JackStrawPlot">PCA 统计显著性检验</el-menu-item></router-link>
      <router-link to="/sc/report_pca_elbow"><el-menu-item index="report_pca_elbow">PCA 肘形图</el-menu-item></router-link>
      <router-link to="/sc/report_tSNE"><el-menu-item index="report_tSNE">tSNE 聚类</el-menu-item></router-link>
      <router-link to="/sc/report_group_violin"><el-menu-item index="report_group_violin">类间特征基因表达分析</el-menu-item></router-link>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true,
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {

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
.title-style {
  font-size: 16px;
  font-weight: bold;
}
.el-menu-item, .el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}
.el-menu {
  border: none !important;
}
</style>
