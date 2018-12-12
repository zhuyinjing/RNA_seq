<template>
  <div class="main">
    <navbar class="navbar"></navbar>
    <router-view/>
    <el-dialog
      title="提示"
      :visible.sync="$store.state.svgDescribeShow"
      width="30%"
      >
      <p>{{$t('svg.what_svg')}}</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;{{$t('svg.introduction')}}</p>
      <p>{{$t('svg.tool')}}：</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;<a href="www.inkscape.org" target="_blank">Inkscape</a> 、
      <a href="www.adobe.com/products/illustrator/" target="_blank">Adobe Illustrator</a>
      {{$t('svg.browse')}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$store.state.svgDescribeShow = false">{{$t('button.ok')}}</el-button>
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
