<template>
  <div>
    <div class="imgStyle">
      <img class="imgStyle" src="../assets/img/lollipop.png" alt="">
    </div>
    <!-- <div class="textStyle">
      <h1>ColorSeq</h1>
    </div> -->
    <div class="textStyle">
      <h1>专业、深度、可视化的高通量生物数据分析平台</h1>
    </div>
    <div class="textStyle">
      <!-- <el-button type="danger" @click="login()">登录/注册</el-button> -->
      <el-button type="danger" @click="project_list()">查看项目列表</el-button>
      <img src="https://colorseq.com/server/username" alt="" class='display-none'>
    </div>
    <login ref="loginDiv"></login>
  </div>
</template>

<script>
import navbar from './navbar.vue'
import login from './login.vue'
export default {
  data () {
    return {
      dialogFormVisible: false,
        form: {
          email: '',
          password: ''
        },
        formLabelWidth: '120px'
    }
  },
  components: {
    navbar,
    login
  },
  mounted () {
  },
  methods: {
    // login () {
    //   this.$refs.loginDiv.loginDialog = true
    // },
    project_list () {
      this.$router.push({'name': 'project_list'})
    }
  }
}
</script>

<style scoped="true">
.imgStyle {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.textStyle {
  text-align: center;
}
.display-none {
  width: 0;
  height: 0;
}
</style>
