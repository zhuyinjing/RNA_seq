<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'report_deg' }">差异表达基因</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'heatmap_input' }">绘制基因热图</el-breadcrumb-item>
        <el-breadcrumb-item>基因热图</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>绘制基因Heat Map图 {{$store.state._case}} vs {{$store.state._control}} </h2>

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
.cursor-pointer {
  cursor: pointer;
}
</style>
