<template>
  <div class="main">
    <navbar class="navbar"></navbar>
    <router-view/>
    <el-dialog
      title=""
      :visible.sync="$store.state.svgDescribeShow"
      width="30%"
      >
      <p>什么是 svg ?</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;svg 是一种矢量图形格式，它具有 jpg 和 png 等格式无法具备的优势，可以任意放大或缩小图形显示，同时又不会牺牲图像质量。</p>
      <p>可以编辑 svg 图片的工具有：</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;<a href="www.inkscape.org" target="_blank">Inkscape</a> 、
      <a href="www.adobe.com/products/illustrator/" target="_blank">Adobe Illustrator</a> 等。
      通用浏览器像 Chrome、Firefox、Safari 等也可以直接打开 svg 图像查看。</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$store.state.svgDescribeShow = false">ok, 我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'

export default {
  name: 'App',
  components: {
    navbar
  },
  mounted () {
  }
}
</script>

<style>
.main {
  width: 100%;
  height: 100%;
}
.navbar {
  height: 60px;
}
</style>
