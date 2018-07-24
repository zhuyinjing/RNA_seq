<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <leftMenu style="margin-top:5px"></leftMenu>
    </el-aside>
    <el-main>
      <div class="">
        <imgMenuShowComp></imgMenuShowComp>

        <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
          <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
          <el-breadcrumb-item>基因表达量表格</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>基因表达量表格</h2>

        <p>一个基因表达水平的直接体现就是看有多少 reads 回帖到该基因区域，这个可以称之为基因的表达丰度。在转录组的分析中，落在一个基因区域内的 read 数目取决于基因长度和测序深度（一般来说，基因越长 read 数目越多，测序深度越高，则一个基因对应的 read 数目也相对越多），因此我们常用 RPKM、TPM 等作为转录组数据定量的表示方法。它们都是对表达量进行标准化的方法，而标准化的对象就是基因长度与测序深度。</p>

        <p>Transcripts Per Kilobase of exonmodel per Million mapped reads (每千个碱基的转录每百万映射读取的 Transcripts， TPM) 是一种优化的 RPKM 计算方法，TPM 概括了基因的长度、表达量和基因数目。在每个样本内，所有基因的 TPM 值总和为 1M，因此各个样本都可以保证在一个统一的标准下进行基因表达量的比较。</p>

        <p>$$ TPM_{i} = \frac{ \frac{ N_{i} }{ L_{i} } * 1000000}{\sum_{i=1}^{n} \frac{N_{i}}{L_{i}}}$$</p>

        <p>N<sub>i</sub>：mapping 到基因 i 上的 read 数；</p>
        <p>L<sub>i</sub>：基因 i 的外显子长度的总和。</p>
        <p>在一个样本中一个基因的 TPM：先对每个基因的read数用基因的长度进行校正，之后再用校正后的这个基因 read 数 (N<sub>i</sub>/L<sub>i</sub>) 与校正后的这个样本的所有 read 求商。</p>

        <!-- <div class="overflow-auto"> -->
        <div class="">
          <table id="patients" cellspacing="0" class="display table table-striped table-bordered">
              <thead>
              <tr>
                  <th v-for="item in tpmsArray">{{item}}</th>
              </tr>
              </thead>
          </table>
        </div>
      </div>
      <div class="clear">

      </div>
    </el-main>
  </el-container>
</template>

<script>
import leftMenu from './leftMenu.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'

export default {
  data () {
    return {
      tpmsArray: ['geneId', 'geneName'],
      arr: [{
          "mDataProp" : "geneId"
      }, {
          "mDataProp" : "geneName"
      }]
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  mounted () {
    this.getTpms()
    this.$nextTick(function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });
  },
  methods: {
    getTpms () {
      this.axios('/server/gene_tpms?p=' + this.$store.state.projectId + '&username=' + this.$store.state.username + '&sEcho=1&iDisplayStart=0&iDisplayLength=1').then((res) => {
        if (res.data.aData.length > 0)  {
          let obj = res.data.aData[0].tpms
          for (let k in obj) {
            this.tpmsArray.push(k)
            this.arr.push({
                "mDataProp" : "tpms",
                "mRender" : function(data, type, full) {
                    return Math.ceil(data[k])
                }
            })
          }
        }
        this.initTable()
      })
    },
    initTable () {
      let self = this
      $(document).ready(function() {
          var table = $('#patients').DataTable({
              "pageLength": 25,
              "bPaginate" : true,//分页工具条显示
              //"sPaginationType" : "full_numbers",//分页工具条样式
              "bStateSave" : true, //是否打开客户端状态记录功能,此功能在ajax刷新纪录的时候不会将个性化设定回复为初始化状态
              "bScrollCollapse" : true, //当显示的数据不足以支撑表格的默认的高度
              "bLengthChange" : true, //每页显示的记录数
              "bFilter" : false, //搜索栏
              "bSort" : false, //是否支持排序功能
              "bInfo" : true, //显示表格信息
              "bAutoWidth" : true, //自适应宽度
              "bJQueryUI" : false,//是否开启主题
              "bDestroy" : true,
              "bProcessing" : true, //开启读取服务器数据时显示正在加载中……特别是大数据量的时候，开启此功能比较好
              "bServerSide" : true,//服务器处理分页，默认是false，需要服务器处理，必须true
              "sAjaxDataProp" : "aData",
              //通过ajax实现分页的url路径
              "sAjaxSource" : "/server/gene_tpms?p=" + self.$store.state.projectId + "&username=" + self.$store.state.username,
              "aoColumns" : self.arr,
              // "aoColumnDefs":[{"aTargets":[2][1],"mRender":function(){
              //        return "<a href=#>1441</a>"}
              // }]
          });
        })
      },
    backReport () {
      this.$router.push({'name': 'report'})
    },
  }
}
</script>

<style scoped="true">
.content {
  float:left;
  /* width: 60%; */
  width: calc(100% - 350px);
  padding: 0 20px;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
.imgStyle {
  width: 100%;
}
.overflow-auto {
  overflow: auto;
}
.clear {
  clear: both;
}
</style>
