<template>
  <div class="content">
    <el-button type="danger" @click="app_heatmap_input">基因热图 &nbsp;</el-button>
    <el-button type="primary" @click="app_ppi_input">蛋白互作图</el-button>
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
    app_ppi_input () {
      this.$router.push('app_ppi_input')
    },

  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  padding: 0 20px;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
