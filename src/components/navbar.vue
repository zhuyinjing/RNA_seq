<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="home">首页</el-menu-item>
      <el-menu-item index="project">项目列表</el-menu-item>
      <!-- <el-menu-item index="abrowse">基因组浏览器</el-menu-item>
      <el-menu-item index="about">关于</el-menu-item> -->
    </el-menu>
    <div class="userDiv" v-show="$store.state.username">
      <!-- <img src="../assets/img/avatar.png" alt=""> -->
      <span class="nameStyle">{{$store.state.username}}</span>
      <el-button type="text" @click="logout">退出账号</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
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
        case 'abrowse':
          sessionStorage.setItem('navbarItem', 'about')
          this.$router.push({'name': 'about'})
          break
        case 'about':
          sessionStorage.setItem('navbarItem', 'about')
          this.$router.push({'name': 'about'})
          break
      }
    },
    logout () {
      this.$confirm('确认退出该账号吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          sessionStorage.removeItem('navbarItem')
          window.location.href = 'https://colorseq.com/logout'
        }).catch(() => {});
    },
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
.text-center {
  text-align: center;
}
</style>
