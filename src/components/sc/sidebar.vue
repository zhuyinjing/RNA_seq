<template>
  <div>
    <el-menu v-show="isCollapse" style="padding: 0 10px;" :default-active="$route.name" class="el-menu-vertical-demo">
      <router-link to="/sc"><el-menu-item index="sc_report">报告首页</el-menu-item></router-link>
      <router-link to="/sc/report_umi_count"><el-menu-item index="report_umi_count">单细胞转录组表达基因与UMI计数统计</el-menu-item></router-link>
      <router-link to="/sc/report_heterogeneous_gene"><el-menu-item index="report_heterogeneous_gene">表达异质化基因筛选</el-menu-item></router-link>
      <router-link to="/sc/report_pca_3d"><el-menu-item index="report_pca_3d">PCA plot 3D</el-menu-item></router-link>
      <router-link to="/sc/report_pca"><el-menu-item index="report_pca">PCA plot</el-menu-item></router-link>
      <router-link to="/sc/report_pca_elbow"><el-menu-item index="report_pca_elbow">PCA elbow plot</el-menu-item></router-link>
      <router-link to="/sc/report_tSNE"><el-menu-item index="report_tSNE">tSNE plot</el-menu-item></router-link>
      <router-link to="/sc/report_viz_PCA"><el-menu-item index="report_viz_PCA">viz PCA</el-menu-item></router-link>
      <router-link to="/sc/report_pca_heatmap"><el-menu-item index="report_pca_heatmap">PCA heatmap</el-menu-item></router-link>
      <router-link to="/sc/report_group_violin"><el-menu-item index="report_group_violin">group violin</el-menu-item></router-link>
      <!-- <router-link to="/sc/report_tSNE_heatmap"><el-menu-item index="report_tSNE_heatmap">tSNE heatmap</el-menu-item></router-link> -->
        <!-- <el-menu-item-group>
          <span slot="" class="title-style">{{$t('leftMenu.qc')}}</span>
          <el-menu-item index="1-0">{{$t('leftMenu.fastqc')}}</el-menu-item>
        </el-menu-item-group> -->
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
