<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backReport"></i>
    </el-tooltip>
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
    backReport () {
      this.$router.push({'name': 'report'})
    }

  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
