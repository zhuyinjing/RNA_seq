<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="project">项目列表</el-menu-item>
      <el-menu-item index="abrowse">基因组浏览器</el-menu-item>
      <el-menu-item index="about">关于</el-menu-item>
    </el-menu>
    <home v-if="homeShow"></home>
    <project v-if="projectShow"></project>
  </div>
</template>

<script>
import home from '@/components/home'
import project from '@/components/project_list'
export default {
  data () {
    return {
      activeIndex: 'home',
      homeShow: true,
      projectShow: false,
    }
  },
  components: {
    home,
    project
  },
  mounted () {
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case 'home':
          this.projectShow = false
          this.homeShow = true
          break
        case 'project':
          this.homeShow = false
          this.projectShow = true
          break
      }
    }
  }
}
</script>

<style scoped="true">
</style>
