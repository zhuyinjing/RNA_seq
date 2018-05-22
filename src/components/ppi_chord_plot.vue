<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backppiInput"></i>
    </el-tooltip>

  </div>
</template>

<script>
import * as d3 from 'd3'

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
    backppiInput () {
      this.$router.push({'name': 'ppi_chord_plot_input'})
    },

  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  margin: 19px auto;
}
.cursor-pointer{
  cursor: pointer;
}
</style>
