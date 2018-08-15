<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <leftMenu style="margin-top:5px"></leftMenu>
    </el-aside>
    <el-main>
      <imgMenuShowComp></imgMenuShowComp>

      <degComp></degComp>

      <div class="">
        <div class="container">
          <p>差异表达基因热图，可以通过颜色深浅来直观显示不同实验条件下基因表达的差异，并且可以较直观的显示出不同实验条件下调基因调控模式（表达谱）的差异。默认的配色方案为绿色代表较低的表达水平，红色代表较高的表达水平，黑色代表中间表达水平。用户可以点击左上角的色条更改配色方案。HeatMap 左侧的树状结构表示基因聚类的结果，表达趋势越接近的基因，在树状结构图中的位置也更接近。HeatMap 上方的树状结构图表示样本聚类的结果，基因表达模式更接近的样本，在数据结构图中的位置更接近。HeatMap 的输入数据为样本间差异表达基因列表中前 100 个基因的 TPM 值，基因距离和样本距离的计算采用欧式距离，基因和样本间的 linkage 计算方法为 ward，使用工具为 Inchlib，参考文献:</p>
          <p>Škuta, C., Bartůněk, P., Svozil, D. InCHlib – interactive cluster heatmap for web applications. Journal of Cheminformatics 2014, 6 (44), DOI: 10.1186/s13321-014-0044-4 [<a href="http://www.jcheminf.com/content/6/1/44" target="_blank">全文链接</a>]]</p>

          <heatmapComp></heatmapComp>

        </div>
      </div>
    </el-main>
  </el-container>

</template>

<script>
import leftMenu from './leftMenu.vue'
import degComp from './degComp.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'
import heatmapComp from './heatmapComp.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    leftMenu,
    degComp,
    imgMenuShowComp,
    heatmapComp
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped="true">
</style>
