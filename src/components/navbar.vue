<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="project">项目列表</el-menu-item>
      <el-menu-item index="abrowse">基因组浏览器</el-menu-item>
      <el-menu-item index="about">关于</el-menu-item>
    </el-menu>
    <div class="userDiv" v-show="$store.state.username">
      <!-- <img src="../assets/img/avatar.png" alt=""> -->
      <span class="nameStyle">{{$store.state.username}}</span>
      <el-button type="text" @click="logoutDialog = true">退出账号</el-button>
    </div>

    <el-dialog title="" :visible.sync="logoutDialog" width="30%">
      <h2><i class="el-icon-warning delete-font-color"> 确认退出账号吗？</i></h2>
      <div slot="footer" class="dialog-footer">
        <el-button @click="logoutDialog = false">取消</el-button>
        <el-button type="danger" @click="logoutDialog = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      logoutDialog: false
    }
  },
  components: {
  },
  mounted () {
    if (!sessionStorage.navbarItem) {
      this.activeIndex = 'home'
    } else {
      this.activeIndex = sessionStorage.navbarItem
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case 'home':
          sessionStorage.setItem('navbarItem', 'home')
          this.$router.push({'path': '/'})
          break
        case 'project':
          sessionStorage.setItem('navbarItem', 'project')
          this.$router.push({'name': 'project_list'})
          break
        case 'about':
          sessionStorage.setItem('navbarItem', 'about')
          this.$router.push({'name': 'about'})
          break
      }
    }
  }
}
</script>

<style scoped="true">
.userDiv {
  position: absolute;
  top: 18px;
  right: 50px;
}
.nameStyle {
  margin-right: 30px;
  color: #b5a199;
}
</style>
