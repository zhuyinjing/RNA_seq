<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item :to="{ path: 'report' }">项目{{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item>基因表达量表格</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>基因表达量表格</h2>

      <div class="overflow-auto">
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
  </div>

</template>

<script>
import leftMenu from './leftMenu.vue'

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
    leftMenu
  },
  mounted () {
    this.getTpms()
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
  width: 60%;
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
