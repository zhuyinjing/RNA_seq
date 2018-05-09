<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="a">首页</el-menu-item>
      <el-menu-item index="2">项目列表</el-menu-item>
      <el-menu-item index="3">基因组浏览器</el-menu-item>
      <el-menu-item index="4">关于</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    a () {
      this.axios.get('/get_file').then((res) => {
        console.log(res.data)
      })
    },
  }
}
</script>

<style scoped="true">
</style>
