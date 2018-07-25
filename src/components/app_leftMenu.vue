<template>
  <div class="container">
    <el-button type="info" class="btnStyle" :class="{'activebtn': $route.path === '/app_heatmap_input' || $route.path === '/app_heatmap'}" @click="app_heatmap_input">基因热图 (用户自定义)</el-button> <br><br>
    <el-button type="info" class="btnStyle" :class="{'activebtn': $route.path === '/app_heatmap_input_project' || $route.path === '/app_heatmap_project'}" @click="app_heatmap_input_project">基因热图 (基于项目数据)</el-button> <br><br>
    <el-button type="info" class="btnStyle" :class="{'activebtn': $route.path === '/app_ppi_input' || $route.path === '/app_ppi'}" @click="app_ppi_input">蛋白互作图</el-button>
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
    app_heatmap_input () {
      this.$router.push('app_heatmap_input')
    },
    app_heatmap_input_project () {
      this.$router.push('app_heatmap_input_project')
    },
    app_ppi_input () {
      this.$router.push('app_ppi_input')
    },
  }
}
</script>

<style scoped="true">
.container {
  padding: 10px;
}
.cursor-pointer {
  cursor: pointer;
}
.activebtn {
  background:#f56c6c;
  border-color:#f56c6c;
}
.btnStyle {
  width: 100%;
}
</style>
