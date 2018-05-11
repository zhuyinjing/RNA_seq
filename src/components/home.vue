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
      <el-button type="danger" @click="login()">登录/注册</el-button>
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
    login () {
      this.$refs.loginDiv.loginDialog = true
    }
  }
}
</script>

<style scoped="true">
.imgStyle {
  width: 200px;
  height: 200px;
  margin: 20px auto;
}
.textStyle {
  text-align: center;
}
</style>
