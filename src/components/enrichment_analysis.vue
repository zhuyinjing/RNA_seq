<template>
<el-container style="height:calc(100% - 62px);margin-top:2px">
  <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
    <leftMenu style="margin-top:5px"></leftMenu>
  </el-aside>
  <el-main>
    <imgMenuShowComp></imgMenuShowComp>

    <degComp></degComp>

    <div class="">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="KEGG" name="KEGG">
          <table cellpadding="0" width="100%" cellspacing="0" border="0" class="display" id="example0">
            <thead>
              <tr>
                <td></td>
                <td>ID</td>
                <td>Term</td>
                <td>GeneRatio</td>
                <td>BgRatio</td>
                <td>log2foldE</td>
                <td>pvalue</td>
                <td>p.adjust</td>
                <td>qvalue</td>
                <td>geneID</td>
                <td>Count</td>
              </tr>
            </thead>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('enrichment_analysis.trans')" :name="$t('enrichment_analysis.trans')">
          <table cellpadding="0" width="100%" cellspacing="0" border="0" class="display" id="example1">
            <thead>
              <tr>
                <td></td>
                <td>ID</td>
                <td>Biosample_term_name</td>
                <td>Biosample_type</td>
                <td>Biosample_life_stage</td>
                <td>Biosample_sex</td>
                <td>Biosample_age</td>
                <td>Experiment_target</td>
                <td>GeneRatio</td>
                <td>BgRatio</td>
                <td>log2foldE</td>
                <td>pvalue</td>
                <td>p.adjust</td>
                <td>qvalue</td>
                <td>geneID</td>
                <td>Count</td>
              </tr>
            </thead>
          </table>
        </el-tab-pane>
        <el-tab-pane label="GO（level3）" name="level3.GO">
          <table cellpadding="0" width="100%" cellspacing="0" border="0" class="display" id="example2">
            <thead>
              <tr>
                <td></td>
                <td>ID</td>
                <td>Term</td>
                <td>Ontology</td>
                <td>GeneRatio</td>
                <td>BgRatio</td>
                <td>log2foldE</td>
                <td>pvalue</td>
                <td>p.adjust</td>
                <td>qvalue</td>
                <td>geneID</td>
                <td>Count</td>
              </tr>
            </thead>
          </table>
        </el-tab-pane>
        <el-tab-pane label="GO（level4）" name="level4.GO">
          <table cellpadding="0" width="100%" cellspacing="0" border="0" class="display" id="example3">
            <thead>
              <tr>
                <td></td>
                <td>ID</td>
                <td>Term</td>
                <td>Ontology</td>
                <td>GeneRatio</td>
                <td>BgRatio</td>
                <td>log2foldE</td>
                <td>pvalue</td>
                <td>p.adjust</td>
                <td>qvalue</td>
                <td>geneID</td>
                <td>Count</td>
              </tr>
            </thead>
          </table>
        </el-tab-pane>
        <el-tab-pane label="GO（level5）" name="level5.GO">
          <table cellpadding="0" width="100%" cellspacing="0" border="0" class="display" id="example4">
            <thead>
              <tr>
                <td></td>
                <td>ID</td>
                <td>Term</td>
                <td>Ontology</td>
                <td>GeneRatio</td>
                <td>BgRatio</td>
                <td>log2foldE</td>
                <td>pvalue</td>
                <td>p.adjust</td>
                <td>qvalue</td>
                <td>geneID</td>
                <td>Count</td>
              </tr>
            </thead>
          </table>
        </el-tab-pane>
      </el-tabs>

    </div>
  </el-main>
</el-container>
</template>

<script>
import leftMenu from './leftMenu.vue'
import degComp from './degComp.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'

export default {
  data() {
    return {
      activeName: 'KEGG',
      head0: [],
      tbval0: [],
      tbval1: [],
      tbval2: [],
      tbval3: [],
      tbval4: [],
      TFvalue: null,
      deg: null,
    }
  },
  components: {
    leftMenu,
    degComp,
    imgMenuShowComp
  },
  created() {
    // 从 indexeddb 获取 deg 列表 点击 + 号可以查看 name
    this.getdegList()
  },
  mounted() {
    this.handleClick2()
  },
  methods: {
    getdegList() {
      let _case = sessionStorage.getItem('_case')
      let _control = sessionStorage.getItem('_control')
      let dbName = "deg"
      var request = indexedDB.open(dbName)
      request.onerror = (e) => {}
      request.onupgradeneeded = (e) => {
        this.db = e.target.result
        var objectStore = this.db.createObjectStore("degTable", {
          keyPath: 'name',
          autoIncrement: true
        })
      }
      request.onsuccess = (e) => {
        console.log("success!");
        this.db = e.target.result
        this.setDeg(_case, _control)
      }
      request.onerror = (e) => {
        console.log("error!");
      }
    },
    setDeg(_case, _control) {
      var tx = this.db.transaction(['degTable'], 'readwrite')
      var store = tx.objectStore('degTable')
      var req = store.get('deg' + _case + _control)
      req.onsuccess = (e) => {
        this.deg = e.target.result.value
      }
    },
    handleClick(tab, event) {
      if (tab.label === '转录因子') {
        if (!this.TFvalue) {
          this.$message({
            message: '由于网络传输速度较慢，数据正在加载，请稍等...',
            type: 'warning',
          });
        }
      }
    },
    handleClick2() {
      let self = this
      this.axios.get('/server/enrich?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&type=' + 'KEGG' + '&caseSample=' + this.$store.state._case + '&controlSample=' + this.$store.state._control).then((res) => {
        if (res.data.message_type === 'success') {
          $('#example0').dataTable().fnDestroy()
          var table = $('#example0').DataTable({
            "aoColumnDefs": [{
                "bSortable": false,
                "aTargets": [0]
              },
              {
                "aTargets": [5],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [6],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [7],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "bSortable": false,
                "visible": false,
                "aTargets": [9]
              }
            ],
            "aLengthMenu": [
              [25, 50, 100, -1],
              ['每页25条', '每页50条', '每页100条', "显示所有数据"] // change per page values here
            ],
            'dom': 'Bfrtip',
            'buttons': [{
                extend: 'csv',
                text: '导出 csv',
                filename: 'ColorSeq' + ' ' + self.$store.state._case + ' vs ' + self.$store.state._control
              },
              {
                extend: 'excel',
                text: '导出 excel',
                filename: 'ColorSeq' + ' ' + self.$store.state._case + ' vs ' + self.$store.state._control
              }
            ],
            "iDisplayLength": 25,
            "aaData": res.data.message.slice(1),
            "aoColumns": [{
                "mData": null
              },
              {
                "mData": 0
              },
              {
                "mData": 1
              },
              {
                "mData": 2
              },
              {
                "mData": 3
              },
              {
                "mData": 4
              },
              {
                "mData": 5
              },
              {
                "mData": 6
              },
              {
                "mData": 7
              },
              {
                "mData": 8
              },
              {
                "mData": 9
              },
            ],
            "oLanguage": {
              "oAria": {
                "sSortAscending": " - click/return to sort ascending",
                "sSortDescending": " - click/return to sort descending"
              },
              // "sLengthMenu": "每页显示 _MENU_ 条记录",
              "sZeroRecords": "对不起，查询不到任何相关数据",
              "sEmptyTable": "未有相关数据",
              "sLoadingRecords": "正在加载数据-请等待...",
              // "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
              // "sInfoEmpty": "当前显示0到0条，共0条记录",
              // "sInfoFiltered": "（数据库中共为 _MAX_ 条记录）",
              "sProcessing": "<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",
              // "sSearch": "模糊查询：",
              "sUrl": "", //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
              // "oPaginate": {
              //     "sFirst": "第一页",
              //     "sPrevious": " 上一页 ",
              //     "sNext": " 下一页 ",
              //     "sLast": " 最后一页 "
              // }
            }, //多语言配置
            "fnCreatedRow": function(nRow, aData, iDataIndex) {
              $('td:eq(0)', nRow).addClass('details-control').html(''); //为第一个单元格增加序号
            },
          });
          // 点击 pathway 触发的事件
          $('#example0 tbody').on('click', 'tr td:nth-child(2)', function(e) {
            // var name = $(this).text();
          });
          function format(d) {
            let str = ""
            let idArr = d[8].split('/')
            for (let j = 0; j < idArr.length; j++) {
              for (let i = 0; i < self.deg.length; i++) {
                if (self.deg[i]['target_id'] === idArr[j]) {
                  if (self.deg[i]['log2FoldChange'] > 0) {
                    str = str.concat(' ' + '<span class="red">' + self.deg[i]['name'] + '</span>' + ' ')
                  } else {
                    str = str.concat(' ' + '<span class="green">' + self.deg[i]['name'] + '</span>' + ' ')
                  }
                  break
                }
              }
            }
            return '<div class="detailDiv">' + str + '</div>'
            // return  "<div>geneID: "+ d[8].replace(/\//g, ' ') +"</div>"
          }
          var detailRows = [];
          $('#example0 tbody').off('click', 'tr td.details-control');
          $('#example0 tbody').on('click', 'tr td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
              tr.removeClass('details');
              row.child.hide();
              // Remove from the 'open' array
              detailRows.splice(idx, 1);
            } else {
              tr.addClass('details');
              row.child(format(row.data())).show();
              // Add to the 'open' array
              if (idx === -1) {
                detailRows.push(tr.attr('id'));
              }
            }
          })
        }
      })
      this.axios.get('/server/enrich?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&type=' + 'TF' + '&caseSample=' + this.$store.state._case + '&controlSample=' + this.$store.state._control).then((res) => {
        if (res.data.message_type === 'success') {
          this.TFvalue = res.data.message
          $('#example1').dataTable().fnDestroy()
          var table = $('#example1').DataTable({
            "aoColumnDefs": [{
                "bSortable": false,
                "aTargets": [0]
              },
              {
                "aTargets": [10],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [11],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [12],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "bSortable": false,
                "visible": false,
                "aTargets": [14]
              }
            ],
            "aLengthMenu": [
              [25, 50, 100, -1],
              ['每页25条', '每页50条', '每页100条', "显示所有数据"] // change per page values here
            ],
            'dom': 'Bfrtip',
            'buttons': [{
                extend: 'csv',
                text: '导出 csv',
              },
              {
                extend: 'excel',
                text: '导出 excel',
              }
            ],
            "iDisplayLength": 25,
            "aaData": res.data.message.slice(1),
            "aoColumns": [{
                "mData": null
              },
              {
                "mData": 0
              },
              {
                "mData": 1
              },
              {
                "mData": 2
              },
              {
                "mData": 3
              },
              {
                "mData": 4
              },
              {
                "mData": 5
              },
              {
                "mData": 6
              },
              {
                "mData": 7
              },
              {
                "mData": 8
              },
              {
                "mData": 9
              },
              {
                "mData": 10
              },
              {
                "mData": 11
              },
              {
                "mData": 12
              },
              {
                "mData": 13
              },
              {
                "mData": 14
              },
            ],
            "oLanguage": {
              "oAria": {
                "sSortAscending": " - click/return to sort ascending",
                "sSortDescending": " - click/return to sort descending"
              },
              "sZeroRecords": "对不起，查询不到任何相关数据",
              "sEmptyTable": "未有相关数据",
              "sLoadingRecords": "正在加载数据-请等待...",
              "sProcessing": "<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",
              "sUrl": "", //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
            }, //多语言配置
            "fnCreatedRow": function(nRow, aData, iDataIndex) {
              $('td:eq(0)', nRow).addClass('details-control').html(''); //为第一个单元格增加序号
            },
          });

          function format(d) {
            let str = ""
            let idArr = d[13].split('/')
            for (let j = 0; j < idArr.length; j++) {
              for (let i = 0; i < self.deg.length; i++) {
                if (self.deg[i]['target_id'] === idArr[j]) {
                  if (self.deg[i]['log2FoldChange'] > 0) {
                    str = str.concat(' ' + '<span class="red">' + self.deg[i]['name'] + '</span>' + ' ')
                  } else {
                    str = str.concat(' ' + '<span class="green">' + self.deg[i]['name'] + '</span>' + ' ')
                  }
                  break
                }
              }
            }
            return '<div class="detailDiv">' + str + '</div>'
            // return  "<div>geneID: "+ d[13].replace(/\//g, ' ') +"</div>"
          }
          var detailRows = [];
          $('#example1 tbody').off('click', 'tr td.details-control');
          $('#example1 tbody').on('click', 'tr td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
              tr.removeClass('details');
              row.child.hide();
              // Remove from the 'open' array
              detailRows.splice(idx, 1);
            } else {
              tr.addClass('details');
              row.child(format(row.data())).show();
              // Add to the 'open' array
              if (idx === -1) {
                detailRows.push(tr.attr('id'));
              }
            }
          })
        }
      })
      this.axios.get('/server/enrich?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&type=' + 'level_3.GO' + '&caseSample=' + this.$store.state._case + '&controlSample=' + this.$store.state._control).then((res) => {
        if (res.data.message_type === 'success') {
          $('#example2').dataTable().fnDestroy()
          var table = $('#example2').DataTable({
            "aoColumnDefs": [{
                "bSortable": false,
                "aTargets": [0]
              },
              {
                "aTargets": [6],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [7],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [8],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "bSortable": false,
                "visible": false,
                "aTargets": [10]
              }
            ],
            "aLengthMenu": [
              [25, 50, 100, -1],
              ['每页25条', '每页50条', '每页100条', "显示所有数据"] // change per page values here
            ],
            'dom': 'Bfrtip',
            'buttons': [{
                extend: 'csv',
                text: '导出 csv',
              },
              {
                extend: 'excel',
                text: '导出 excel',
              }
            ],
            "iDisplayLength": 25,
            "aaData": res.data.message.slice(1),
            "aoColumns": [{
                "mData": null
              },
              {
                "mData": 0
              },
              {
                "mData": 1
              },
              {
                "mData": 2
              },
              {
                "mData": 3
              },
              {
                "mData": 4
              },
              {
                "mData": 5
              },
              {
                "mData": 6
              },
              {
                "mData": 7
              },
              {
                "mData": 8
              },
              {
                "mData": 9
              },
              {
                "mData": 10
              },
            ],
            "oLanguage": {
              "oAria": {
                "sSortAscending": " - click/return to sort ascending",
                "sSortDescending": " - click/return to sort descending"
              },
              // "sLengthMenu": "每页显示 _MENU_ 条记录",
              "sZeroRecords": "对不起，查询不到任何相关数据",
              "sEmptyTable": "未有相关数据",
              "sLoadingRecords": "正在加载数据-请等待...",
              "sProcessing": "<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",
              "sUrl": "", //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
            }, //多语言配置
            "fnCreatedRow": function(nRow, aData, iDataIndex) {
              $('td:eq(0)', nRow).addClass('details-control').html(''); //为第一个单元格增加序号
            },
          });

          function format(d) {
            let str = ""
            let idArr = d[9].split('/')
            for (let j = 0; j < idArr.length; j++) {
              for (let i = 0; i < self.deg.length; i++) {
                if (self.deg[i]['target_id'] === idArr[j]) {
                  if (self.deg[i]['log2FoldChange'] > 0) {
                    str = str.concat(' ' + '<span class="red">' + self.deg[i]['name'] + '</span>' + ' ')
                  } else {
                    str = str.concat(' ' + '<span class="green">' + self.deg[i]['name'] + '</span>' + ' ')
                  }
                  break
                }
              }
            }
            return '<div class="detailDiv">' + str + '</div>'
            // return  "<div>geneID: "+ d[9].replace(/\//g, ' ') +"</div>"
          }
          var detailRows = [];
          $('#example2 tbody').off('click', 'tr td.details-control');
          $('#example2 tbody').on('click', 'tr td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
              tr.removeClass('details');
              row.child.hide();
              // Remove from the 'open' array
              detailRows.splice(idx, 1);
            } else {
              tr.addClass('details');
              row.child(format(row.data())).show();
              // Add to the 'open' array
              if (idx === -1) {
                detailRows.push(tr.attr('id'));
              }
            }
          })
        }
      })
      this.axios.get('/server/enrich?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&type=' + 'level_4.GO' + '&caseSample=' + this.$store.state._case + '&controlSample=' + this.$store.state._control).then((res) => {
        if (res.data.message_type === 'success') {
          $('#example3').dataTable().fnDestroy()
          var table = $('#example3').DataTable({
            "aoColumnDefs": [{
                "bSortable": false,
                "aTargets": [0]
              },
              {
                "aTargets": [6],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [7],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [8],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "bSortable": false,
                "visible": false,
                "aTargets": [10]
              }
            ],
            "aLengthMenu": [
              [25, 50, 100, -1],
              ['每页25条', '每页50条', '每页100条', "显示所有数据"] // change per page values here
            ],
            'dom': 'Bfrtip',
            'buttons': [{
                extend: 'csv',
                text: '导出 csv',
              },
              {
                extend: 'excel',
                text: '导出 excel',
              }
            ],
            "iDisplayLength": 25,
            "aaData": res.data.message.slice(1),
            "aoColumns": [{
                "mData": null
              },
              {
                "mData": 0
              },
              {
                "mData": 1
              },
              {
                "mData": 2
              },
              {
                "mData": 3
              },
              {
                "mData": 4
              },
              {
                "mData": 5
              },
              {
                "mData": 6
              },
              {
                "mData": 7
              },
              {
                "mData": 8
              },
              {
                "mData": 9
              },
              {
                "mData": 10
              },
            ],
            "oLanguage": {
              "oAria": {
                "sSortAscending": " - click/return to sort ascending",
                "sSortDescending": " - click/return to sort descending"
              },
              "sZeroRecords": "对不起，查询不到任何相关数据",
              "sEmptyTable": "未有相关数据",
              "sLoadingRecords": "正在加载数据-请等待...",
              "sProcessing": "<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",
              "sUrl": "", //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
            }, //多语言配置
            "fnCreatedRow": function(nRow, aData, iDataIndex) {
              $('td:eq(0)', nRow).addClass('details-control').html(''); //为第一个单元格增加序号
            },
          });

          function format(d) {
            let str = ""
            let idArr = d[9].split('/')
            for (let j = 0; j < idArr.length; j++) {
              for (let i = 0; i < self.deg.length; i++) {
                if (self.deg[i]['target_id'] === idArr[j]) {
                  if (self.deg[i]['log2FoldChange'] > 0) {
                    str = str.concat(' ' + '<span class="red">' + self.deg[i]['name'] + '</span>' + ' ')
                  } else {
                    str = str.concat(' ' + '<span class="green">' + self.deg[i]['name'] + '</span>' + ' ')
                  }
                  break
                }
              }
            }
            return '<div class="detailDiv">' + str + '</div>'
            // return  "<div>geneID: "+ d[9].replace(/\//g, ' ') +"</div>"
          }
          var detailRows = [];
          $('#example3 tbody').off('click', 'tr td.details-control');
          $('#example3 tbody').on('click', 'tr td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
              tr.removeClass('details');
              row.child.hide();
              // Remove from the 'open' array
              detailRows.splice(idx, 1);
            } else {
              tr.addClass('details');
              row.child(format(row.data())).show();
              // Add to the 'open' array
              if (idx === -1) {
                detailRows.push(tr.attr('id'));
              }
            }
          })
        }
      })
      this.axios.get('/server/enrich?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&type=' + 'level_5.GO' + '&caseSample=' + this.$store.state._case + '&controlSample=' + this.$store.state._control).then((res) => {
        if (res.data.message_type === 'success') {
          $('#example4').dataTable().fnDestroy()
          var table = $('#example4').DataTable({
            "aoColumnDefs": [{
                "bSortable": false,
                "aTargets": [0]
              },
              {
                "aTargets": [6],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [7],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "aTargets": [8],
                "mRender": function(data) {
                  return Number(data).toFixed(3)
                }
              },
              {
                "bSortable": false,
                "visible": false,
                "aTargets": [10]
              }
            ],
            "aLengthMenu": [
              [25, 50, 100, -1],
              ['每页25条', '每页50条', '每页100条', "显示所有数据"] // change per page values here
            ],
            'dom': 'Bfrtip',
            'buttons': [{
                extend: 'csv',
                text: '导出 csv',
              },
              {
                extend: 'excel',
                text: '导出 excel',
              }
            ],
            "iDisplayLength": 25,
            "aaData": res.data.message.slice(1),
            "aoColumns": [{
                "mData": null
              },
              {
                "mData": 0
              },
              {
                "mData": 1
              },
              {
                "mData": 2
              },
              {
                "mData": 3
              },
              {
                "mData": 4
              },
              {
                "mData": 5
              },
              {
                "mData": 6
              },
              {
                "mData": 7
              },
              {
                "mData": 8
              },
              {
                "mData": 9
              },
              {
                "mData": 10
              },
            ],
            "oLanguage": {
              "oAria": {
                "sSortAscending": " - click/return to sort ascending",
                "sSortDescending": " - click/return to sort descending"
              },
              "sZeroRecords": "对不起，查询不到任何相关数据",
              "sEmptyTable": "未有相关数据",
              "sLoadingRecords": "正在加载数据-请等待...",
              "sProcessing": "<img src='${pageContext.request.contextPath }/image/loading.gif'/> 正在加载数据...",
              "sUrl": "", //多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
            }, //多语言配置
            "fnCreatedRow": function(nRow, aData, iDataIndex) {
              $('td:eq(0)', nRow).addClass('details-control').html(''); //为第一个单元格增加序号
            },
          });

          function format(d) {
            let str = ""
            let idArr = d[9].split('/')
            for (let j = 0; j < idArr.length; j++) {
              for (let i = 0; i < self.deg.length; i++) {
                if (self.deg[i]['target_id'] === idArr[j]) {
                  if (self.deg[i]['log2FoldChange'] > 0) {
                    str = str.concat(' ' + '<span class="red">' + self.deg[i]['name'] + '</span>' + ' ')
                  } else {
                    str = str.concat(' ' + '<span class="green">' + self.deg[i]['name'] + '</span>' + ' ')
                  }
                  break
                }
              }
            }
            return '<div class="detailDiv">' + str + '</div>'
            // return  "<div>geneID: "+ d[9].replace(/\//g, ' ') +"</div>"
          }
          var detailRows = [];
          $('#example4 tbody').off('click', 'tr td.details-control');
          $('#example4 tbody').on('click', 'tr td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
              tr.removeClass('details');
              row.child.hide();
              // Remove from the 'open' array
              detailRows.splice(idx, 1);
            } else {
              tr.addClass('details');
              row.child(format(row.data())).show();
              // Add to the 'open' array
              if (idx === -1) {
                detailRows.push(tr.attr('id'));
              }
            }
          })
        }
      })
    },
  }
}
</script>

<style scoped="true">
.content {
  float: left;
  /* width: 60%; */
  width: calc(100% - 350px);
  padding: 0 20px;
  margin: 19px auto;
}

.cursor-pointer {
  cursor: pointer;
}

.tagsDiv {
  display: inline-block;
  width: 500px;
  height: 500px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

.tagDiv {
  margin: 5px;
}

.tag {
  margin: 5px;
  background-color: rgba(64, 158, 255, .1);
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409EFF;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, .2);
  white-space: nowrap;
  /* display: inline-block; */
}

.geneListTableDiv {
  height: 800px;
  overflow-y: auto;
}

#geneListTable.gridtable {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #333333;
  border-width: 1px;
  border-color: #ebeef5;
  border-collapse: collapse;
}

#geneListTable.gridtable th {
  color: #333;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #ebeef5;
}

#geneListTable.gridtable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #ebeef5;
  background-color: #ffffff;
}

.bgcolor {
  background-color: #f9f9f9 !important;
}
</style>
<style media="screen">
.el-tabs__content {
  overflow: auto;
}

td.details-control {
  background: url('../assets/img/details_open.png') no-repeat center center;
  cursor: pointer;
}

tr.details td.details-control {
  background: url('../assets/img/details_close.png') no-repeat center center;
}

.font-overflow {
  word-break: break-all;
  word-wrap: break-word;
}

#example0_wrapper,
#example4_wrapper,
#example1_wrapper,
#example2_wrapper,
#example3_wrapper,
#example4_wrapper {
  overflow: auto !important;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
