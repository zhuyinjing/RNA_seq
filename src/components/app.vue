<template>
  <div class="content">
    <el-button type="danger" @click="app_heatmap_input">HeatMap</el-button>
    <el-button type="primary" @click="app_ppi_input">&nbsp;&nbsp; ppi &nbsp;&nbsp;</el-button>
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
