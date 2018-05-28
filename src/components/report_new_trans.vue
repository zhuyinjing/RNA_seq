<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backReport"></i>
    </el-tooltip>

    <h3>项目：{{$store.state.projectName}}</h3>
    <h4>新转录本概况</h4>
    <el-button type="text" @click="classcodeShow = true">查看classcode说明</el-button>

    <el-dialog
      title="说明"
      :visible.sync="classcodeShow"
      width="30%"
      center>
      <img src="../assets/img/classcode.gif" alt="" class="imgStyle">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="classcodeShow = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      classcodeShow: false
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
.imgStyle {
  width: 100%;
}
</style>
