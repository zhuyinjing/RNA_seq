<template>
  <div>
    <el-menu v-show="isCollapse" style="padding: 0 10px;" :default-active="$store.state.leftMenuIndex" class="el-menu-vertical-demo">
        <el-menu-item index="0-0" @click="report">项目列表</el-menu-item>
        <!-- <el-menu-item-group>
          <span slot="" class="title-style">{{$t('leftMenu.qc')}}</span>
          <el-menu-item index="1-0">{{$t('leftMenu.fastqc')}}</el-menu-item>
        </el-menu-item-group> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true,
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
li {
  list-style: none;
}
a:hover, a:visited, a:link, a:active {
  text-decoration: none;
  out-line: none;
}
.title-style {
  font-size: 16px;
  font-weight: bold;
}
.el-menu-item, .el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}
.el-menu {
  border: none !important;
}
</style>
