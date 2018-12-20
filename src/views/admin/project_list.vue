<template>
  <el-row :gutter="20">
    <el-col :span="18" :offset="2">
      <div class="grid-content bg-purple">
        <br>

        <el-button type="primary" size="medium">创建项目</el-button> <br><br>

        <el-card class="" shadow="hover">
          <el-row :gutter="20">
            <el-col :span="2"><div class="grid-content bg-purple line-height-40">项目名称</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple line-height-40">项目类型</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-select v-model="value" placeholder="请选择">
                <el-option value="RNA-Seq" label="RNA-Seq"></el-option>
              </el-select>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple line-height-40">创建时间</div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
              <el-date-picker
                style="width:100%"
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div></el-col>
            <el-col :span="2"><div class="grid-content bg-purple line-height-40">
              <el-button type="primary" size="medium">查询</el-button>
            </div></el-col>
          </el-row>
        </el-card>
        <br>

        <!-- <div class="overflow-auto"> -->
        <div class="">
          <table id="table" cellspacing="0" class="display table table-striped table-bordered">
            <thead>
              <tr>
                <th>项目名称</th>
                <th>项目类型</th>
                <th>创建时间</th>
                <th>用户名</th>
                <th>项目状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 2">
                <td><a href="#">RNA-Seq Demo</a></td>
                <td>RNA-Seq</td>
                <td>2018-06-11</td>
                <td>test</td>
                <td><el-tag type="success">已完成</el-tag></td>
                <td><el-button type="primary" size="mini">查看报告</el-button></td>
              </tr>
              <tr v-for="item in 1">
                <td><a href="#">RNA-Seq Demo</a></td>
                <td>RNA-Seq</td>
                <td>2018-06-11</td>
                <td>test</td>
                <td><el-tag type="info">失败</el-tag></td>
                <td><el-button type="primary" size="mini">查看报告</el-button></td>
              </tr>
              <tr v-for="item in 3">
                <td><a href="#">RNA-Seq Demo</a></td>
                <td>RNA-Seq</td>
                <td>2018-06-11</td>
                <td>test</td>
                <td><el-tag type="">已创建</el-tag></td>
                <td><el-button type="primary" size="mini">查看报告</el-button></td>
              </tr>
              <tr v-for="item in 2">
                <td><a href="#">RNA-Seq Demo</a></td>
                <td>RNA-Seq</td>
                <td>2018-06-11</td>
                <td>test</td>
                <td><el-tag type="warning">可开始</el-tag></td>
                <td><el-button type="primary" size="mini">查看报告</el-button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="clear">

      </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import imgMenuShowComp from '@/components/imgMenuShowComp.vue'

export default {
  data () {
    return {
      input: '',
      value: '',
      value1: '',
      arr: [{
          "mDataProp" : "geneId"
      }, {
          "mDataProp" : "geneName"
      }],
      textareaGeneName: '',
      textareaGeneId: ''
    }
  },
  components: {
    imgMenuShowComp
  },
  mounted () {
    this.$nextTick(() => {
      this.initTable()
    })
  },
  methods: {
    initTable () {
      let self = this
      $(document).ready(function() {
          var table = $('#table').DataTable(
          //   {
          //     "pageLength": 25,
          //     "bPaginate" : true,//分页工具条显示
          //     //"sPaginationType" : "full_numbers",//分页工具条样式
          //     "bStateSave" : true, //是否打开客户端状态记录功能,此功能在ajax刷新纪录的时候不会将个性化设定回复为初始化状态
          //     "bScrollCollapse" : true, //当显示的数据不足以支撑表格的默认的高度
          //     "bLengthChange" : true, //每页显示的记录数
          //     "bFilter" : false, //搜索栏
          //     "bSort" : false, //是否支持排序功能
          //     "bInfo" : true, //显示表格信息
          //     "bAutoWidth" : true, //自适应宽度
          //     "bJQueryUI" : false,//是否开启主题
          //     "bDestroy" : true,
          //     "bProcessing" : true, //开启读取服务器数据时显示正在加载中……特别是大数据量的时候，开启此功能比较好
          //     "bServerSide" : true,//服务器处理分页，默认是false，需要服务器处理，必须true
          //     "sAjaxDataProp" : "aData",
          //     //通过ajax实现分页的url路径
          //     "sAjaxSource" : "/server/gene_tpms?p=" + self.$store.state.projectId + "&username=" + self.$store.state.username +  "&geneName=" + self.textareaGeneName.replace(/\s/g,'') +  "&geneId=" + self.textareaGeneId.replace(/\s/g,''),
          //     "aoColumns" : self.arr,
          //     // "aoColumnDefs":[{"aTargets":[2][1],"mRender":function(){
          //     //        return "<a href=#>1441</a>"}
          //     // }]
          // }
        );
        })
      },
      search () {
        this.initTable()
        setTimeout(() => {
          this.table.ajax.reload()  // 重新 load table
        }, 0)
      },
      clear () {
        this.textareaGeneName = ''
        this.textareaGeneId = ''
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
.line-height-40 {
  line-height: 40px;
}
</style>
