<template>
  <div>
    <el-dialog title="登陆" :visible.sync="loginDialog" width="30%">

    <el-form :model="form" >
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input type="text" v-model="form.username" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.password" auto-complete="off" clearable></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="loginDialog = false">注 册</el-button>
      <el-button type="primary" @click="login()">登 录</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import navbar from './navbar.vue'
export default {
  data () {
    return {
      loginDialog: false,
        form: {
          username: '',
          password: ''
        },
        formLabelWidth: '120px'
    }
  },
  components: {
    navbar
  },
  mounted () {
  },
  methods: {
    login () {
      let formData = new FormData()
      formData.append('username', this.form.username)
      this.axios.post('/server/login', formData).then((res) => {
        console.log(res.data)
      })
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
</style>
