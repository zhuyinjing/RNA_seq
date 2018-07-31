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
          <el-breadcrumb-item>新转录本概况</el-breadcrumb-item>
        </el-breadcrumb>

        <h2>新转录本概况</h2>

        <el-button type="primary" class="margin-bottom-btn" @click="classcodeShow = true"><i class="el-icon-question"></i>查看classcode说明</el-button>

        <!-- <div class="overflow-auto"> -->
        <div class="">
          <table id="patients" cellspacing="0" width="100%" class="display table table-striped table-bordered">
              <thead>
              <tr>
                  <th></th>
                  <th>gene</th>
                  <th>transcriptId</th>
                  <th>referenceTranscriptId</th>
                  <th>exonNum</th>
                  <th>classCode</th>
                  <th>transcriptLength</th>
                  <th>peptideLength</th>
                  <th>codingProbability</th>
                  <th>coding</th>
              </tr>
              </thead>
          </table>
        </div>


        <el-dialog
          title="说明"
          :visible.sync="classcodeShow"
          width="40%"
          center>
          <img src="../assets/img/classcode.gif" alt="" class="imgStyle">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="classcodeShow = false">关闭</el-button>
          </span>
        </el-dialog>

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
      classcodeShow: false
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  mounted () {
    this.initTable()
  },
  methods: {
    numFormat (num) {
        num=num.toString().split(".");  // 分隔小数点
        var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
        var res=[];
        for(var i=0,len=arr.length;i<len;i++){
          if(i%3===0&&i!==0){
             res.push(",");   // 添加分隔符
          }
          res.push(arr[i]);
        }
        res.reverse(); // 再次倒序成为正确的顺序
        if(num[1]){  // 如果有小数的话添加小数部分
          res=res.join("").concat("."+num[1]);
        }else{
          res=res.join("");
        }
        return res;
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
              "sAjaxSource" : "/server/new_transcripts?p=" + self.$store.state.projectId + "&username=" + self.$store.state.username,
              "aoColumns" : [ {
                  "class": "details-control",
                  "orderable": false,
                  "mDataProp": 1,
                  "defaultContent": ""
              }, {
                  "mDataProp" : "gene"
              }, {
                  "mDataProp" : "transcriptId"
              }, {
                  "mDataProp" : "referenceTranscriptId"
              },{
                  "mDataProp" : "exonNum"
              },{
                  "mDataProp" : "classCode"
              },{
                  "mDataProp" : "cpc2Entry",
                  "mRender" : function(data, type, full) {
                      return self.numFormat(data['transcriptLength'])
                  }
              },{
                  "mDataProp" : "cpc2Entry",
                  "mRender" : function(data, type, full) {
                      return self.numFormat(data['peptideLength'])
                  }
              }, {
                  "mDataProp" : "cpc2Entry",
                  "mRender" : function(data, type, full) {
                      return Number(data['codingProbability']).toFixed(3)
                  }
              },{
                  "mDataProp" : "cpc2Entry",
                  "mRender" : function(data, type, full) {
                      return data['label']
                  }
              }, ],
              // 如果不知是简单的数据显示，需要复杂的要求时，通过以下方法来实现动态js插入。
              //不知道有没有更好的方法。
              // "aoColumnDefs":[{"aTargets":[1],"mRender":function(){
              //        return "<a href=#>1441</a>"}
              // }],
          });

          function format ( d ) {
            return  "<div class='detailDiv'>classCode: " + d.classCode + "</div>" +
                    "<div class='detailDiv'>exonNum: " + d.exonNum + "</div>" +
                    "<div class='detailDiv'>gene: " + d.gene + "</div>" +
                    "<div class='detailDiv'>referenceTranscriptId: " + d.referenceTranscriptId + "</div>" +
                    "<div class='detailDiv'>transcriptId: " + d.transcriptId + "</div>" +
                    "<div class='detailDiv'>codingProbability: " + d.cpc2Entry.codingProbability + "</div>" +
                    "<div class='detailDiv'>fickettScore: " + d.cpc2Entry.fickettScore + "</div>" +
                    "<div class='detailDiv'>coding: " + d.cpc2Entry.label + "</div>" +
                    "<div class='detailDiv'>pI: " + d.cpc2Entry.pI + "</div>" +
                    "<div class='detailDiv'>peptideLength: " + d.cpc2Entry.peptideLength + "</div>" +
                    "<div class='detailDiv'>transcriptLength: " + d.cpc2Entry.transcriptLength + "</div>" +
                    "<div class='detailDiv font-overflow'>sequence: " + d.sequence + "</div>"
          }
          var detailRows = [];
          $('#patients tbody').on( 'click', 'tr td.details-control', function () {
              var tr = $(this).closest('tr');
              var row = table.row( tr );
              var idx = $.inArray( tr.attr('id'), detailRows );

              if ( row.child.isShown() ) {
                  tr.removeClass( 'details' );
                  row.child.hide();

                  // Remove from the 'open' array
                  detailRows.splice( idx, 1 );
              }
              else {
                  tr.addClass( 'details' );
                  row.child( format( row.data() ) ).show();

                  // Add to the 'open' array
                  if ( idx === -1 ) {
                      detailRows.push( tr.attr('id') );
                  }
              }
          });
          table.on( 'draw', function () {
              $.each( detailRows, function ( i, id ) {
                  $('#'+id+' td.details-control').trigger( 'click' );
              } );
          });
        })
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
.margin-bottom-btn {
  margin-bottom: 10px;
}
.overflow-auto {
  overflow: auto;
}
.overflow-auto {
  overflow: auto;
}
</style>
<style>
td.details-control {
    background: url('../assets/img/details_open.png') no-repeat center center;
    cursor: pointer;
}
tr.details td.details-control {
    background: url('../assets/img/details_close.png') no-repeat center center;
}
.detailDiv {
  padding: 5px 35px;
}
.font-overflow {
  word-break: break-all;
  word-wrap: break-word;
}
</style>
