<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:2px;margin-top:10px;"></leftMenu>

    <div class="content">
      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item>差异表达基因</el-breadcrumb-item>
      </el-breadcrumb>

      <h2>差异表达基因分析表 {{$store.state._case}} vs {{$store.state._control}} </h2>

      <!-- <div class="margin-bottom-20">
        <el-button type="danger" @click="heatmapClick()">Heat Map</el-button>
        <el-button type="primary" @click="ppiClick()">ppi</el-button>
        <el-button type="success" @click="heatmapsvgClick()">Heat Map Svg</el-button>
        <el-button type="primary" @click="enrichmentClick()">富集分析</el-button>
      </div> -->

      <el-card class="" style="width:800px;">
        <div class="">
          <div class="labelStyle">
            <label for="maxpval" class="label-font">pvalue &le;</label>
          </div>
          <input type="text" id="maxpval" placeholder="0.05" class="input-style" v-model="maxpval"/>
        </div>
        <div class="">
          <div class="labelStyle">
            <label for="maxfdr" class="label-font">FDR &le;</label>
          </div>
          <input type="text" id="maxfdr" placeholder="0.05" class="input-style" v-model="maxfdr"/>
        </div>
        <div class="">
          <div class="labelStyle">
            <label for="minfc" class="label-font">log2FoldChange(绝对值) &ge;</label>
          </div>
          <input type="text" id="minfc" placeholder="0" class="input-style" v-model="minfc"/>
        </div>
        <div class="">
          <div class="labelStyle">
            <label class="radio-inline control-label">显示：</label>
          </div>
          <el-radio class="input-style" v-model="displayByFC" label="1">在 {{$store.state._case}} 中表达量上调</el-radio>
        </div>
        <div class="">
          <div class="labelStyle"></div>
          <el-radio class="input-style" v-model="displayByFC" label="-1">在 {{$store.state._case}} 中表达量下调</el-radio>
        </div>
        <div class="">
          <div class="labelStyle"></div>
          <el-radio class="input-style" v-model="displayByFC" label="0">在 {{$store.state._case}} 中所有上调和下调</el-radio>
        </div>
        <div class="">
          <div class="labelStyle"></div>
          <el-button class="filterbtn" type="primary" @click="filterTable()">筛选</el-button>
        </div>
     </el-card>
      <br>
      <div>
        <el-button type="danger" @click="saveData()">保存列表</el-button>
        <el-button type="info" @click="restoreData()">恢复默认列表</el-button>
      </div>
      <br>
      <transition name="fade">
        <div class="overflow-auto">
          <table id="exampledeg" class="display" cellspacing="0" width="100%" v-show="tableShow">
              <thead>
                <tr>
                  <!-- <th><input type="checkbox" :checked="data.length === checked.length" class="inputcheckbox" name="select_all" @click="checkedAll"></th> -->
                  <th>target_id</th>
                  <th>name</th>
                  <th>description</th>
                  <th>type</th>
                  <th>baseMean</th>
                  <th>log2FoldChange</th>
                  <th>pvalue</th>
                  <th>FDR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='(item, index) in data'>
                  <!-- <td> <input type="checkbox" class="inputcheckbox" name="" v-model="checked" :value="data[index]"> </td> -->
                  <td>{{item.target_id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.description}}</td>
                  <td>{{item.type}}</td>
                  <td>{{numFormat(item.baseMean)}}</td>
                  <td>{{item.log2FoldChange}}</td>
                  <td>{{item.pvalue}}</td>
                  <td>{{item.padj}}</td>
                </tr>
              </tbody>
          </table>
        </div>

    </transition>
    </div>
  </div>

</template>

<script>
import leftMenu from './leftMenu.vue'

export default {
  data () {
    return {
      data: [],
      checked:[],
      displayByFC: '0',
      maxpval: null,
      maxfdr: null,
      minfc: null,
      tableShow: false,
      isCheckedAll: false,
    }
  },
  components: {
    leftMenu
  },
  mounted () {
    this.getTabelValue()
  },
  destroyed () {
    this.resetFilter()
  },
  watch: {
    '$route': 'getTabelValueReset'
  },
  methods: {
    saveData () {
      this.$confirm('确认保存筛选后的数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let table = $('#exampledeg').DataTable()
          let filterData = table.rows( { filter : 'applied'} ).data()
          let data = []
          for (let i = 0;i < filterData.length; i++) {
            data.push({
              target_id: filterData[i][0],
              name: filterData[i][1],
              description: filterData[i][2],
              type: filterData[i][3],
              baseMean: filterData[i][4],
              log2FoldChange: filterData[i][5],
              pvalue: filterData[i][6],
              padj: filterData[i][7],
            })
          }
          console.log(data);
        }).catch(() => {});
    },
    restoreData () {
      this.$confirm('确认恢复默认列表吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.data = [
            {
              target_id: 'es6',
              name: 2017,
              description: 2017,
              type: 2017,
              baseMean: 2017,
              log2FoldChange: 2017,
              pvalue: 2017,
              padj: 2017,
            }
          ]
        }).catch(() => {
        });
    },
    //  千分位
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
    // 全选 or 取消全选
    checkedAll () {
      if (this.data.length !== this.checked.length && this.isCheckedAll === true) {
        this.isCheckedAll = true
      } else {
        this.isCheckedAll = !this.isCheckedAll
      }
      if(this.isCheckedAll) {
        this.checked = []
        this.data.forEach(function (data) {
          this.checked.push(data)
        }, this)
      } else {
        this.checked = []
      }
    },
    resetFilter () {
      this.maxpval = null
      this.maxfdr = null
      this.minfc = null
      this.displayByFC = '0'
      this.checked = []
      this.filterTable()
    },
    getTabelValueReset () {
      let checkboxs = document.getElementsByClassName('inputcheckbox')
      for (let i = 0;i < checkboxs.length;i++) {
        checkboxs[i].checked = false
      }
      this.data = []
      this.checked = []
      this.tableShow = false
      this.resetFilter()
      if ( $.fn.dataTable.isDataTable( '#exampledeg' ) ) {
        var dt = $('#exampledeg').DataTable();
        dt.destroy()
      }
      this.getTabelValue()
    },
    heatmapClick () {
      if (this.checked.length === 0) {
        if (this.data.length < 100) {
          this.$store.commit('setgeneList', this.data)
        } else {
          for(let i = 0;i < 100;i++) {
            this.checked.push(this.data[i])
          }
          this.$store.commit('setgeneList', this.checked)
        }
      } else {
        this.$store.commit('setgeneList', this.checked)
      }
      this.$router.push({'name': 'heatmap_input', query: {'_case': sessionStorage._case, '_control': sessionStorage._control}})
    },
    heatmapsvgClick () {
      if (this.checked.length === 0) {
        if (this.data.length < 100) {
          this.$store.commit('setgeneList', this.data)
        } else {
          for(let i = 0;i < 100;i++) {
            this.checked.push(this.data[i])
          }
          this.$store.commit('setgeneList', this.checked)
        }
      } else {
        this.$store.commit('setgeneList', this.checked)
      }
      this.$router.push({'name': 'heatmapsvg_input', query: {'_case': sessionStorage._case, '_control': sessionStorage._control}})
    },
    ppiClick () {
      if (this.checked.length === 0) {
        if (this.data.length < 100) {
          this.$store.commit('setgeneList', this.data)
        } else {
          for(let i = 0;i < 50;i++) {
            this.checked.push(this.data[i])
          }
          this.$store.commit('setgeneList', this.checked)
        }
      } else {
        this.$store.commit('setgeneList', this.checked)
      }
      this.$router.push({'name': 'ppi_chord_plot_input', query: {'_case': sessionStorage._case, '_control': sessionStorage._control}})
    },
    enrichmentClick () {
      if (this.checked.length === 0) {
        if (this.data.length < 1000) {
          this.$store.commit('setgeneList', this.data)
        } else {
          for(let i = 0;i < 1000;i++) {
            this.checked.push(this.data[i])
          }
          this.$store.commit('setgeneList', this.checked)
        }
      } else {
        this.$store.commit('setgeneList', this.checked)
      }
      this.$router.push({'name': 'enrichment_analysis_input'})
    },
    filterTable () {
      let self = this
      $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var maxPVAL = parseFloat(self.maxpval);
                var maxFDR = parseFloat(self.maxfdr);
                var minFC = parseFloat(self.minfc);
                var pval = parseFloat(data[6]);
                var fc = parseFloat(data[5]);
                var fdr = parseFloat(data[7]);
                if (!isNaN(maxPVAL) && pval > maxPVAL) {
                    return false;
                }
                if (!isNaN(maxFDR) && fdr > maxFDR) {
                    return false;
                }
                if (!isNaN(minFC) && Math.abs(fc) < minFC) {
                    return false;
                }
                var displayByFC = self.displayByFC - 0
                if (!isNaN(displayByFC)) {
                    displayByFC = parseFloat(displayByFC);
                    if ((displayByFC < 0 && fc > 0) ||
                        (displayByFC > 0 && fc < 0)
                    ) {
                        return false;
                    }
                }
                return true;
            }
        );
        var table = $('#exampledeg').DataTable();

        table.draw()
    },
    initTable (data) {
      let self = this
      this.data = data
      $(document).ready(function() {
          $('#exampledeg').DataTable( {
              lengthMenu: [[25, 50, 100, -1], [25, 50, 100, "All"]],
              pageLength: 25,
              // columnDefs: [{
              //   'targets':   0,
              //   'orderable': false,
              //   'className': 'dt-body-center',
              // }],
              // order: [],
          } );
          self.tableShow = true
      });
    },
    getTabelValue () {
      let _case = sessionStorage.getItem('_case')
      let _control = sessionStorage.getItem('_control')
      this.axios.get('/server/deg?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&_case=' + _case + '&_control=' + _control + '&sig_only=true').then((res) => {
        if (res.data.message_type === 'success') {
          for (let i = 0;i < res.data.message.data.length;i++) {
            res.data.message.data[i].baseMean = parseFloat(res.data.message.data[i].baseMean).toFixed(3) - 0
            res.data.message.data[i].log2FoldChange = parseFloat(res.data.message.data[i].log2FoldChange).toFixed(3) - 0
            res.data.message.data[i].pvalue = parseFloat(res.data.message.data[i].pvalue).toFixed(3) - 0
            res.data.message.data[i].padj = parseFloat(res.data.message.data[i].padj).toFixed(3) - 0
          }
          this.initTable(res.data.message.data)
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    backProjectList () {
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
.p-font-style{
  color: #666;
}
.cursor-pointer{
  cursor: pointer;
}
.label-font {
  font-size: 14px;
}
.input-style{
  height: 20px;
  margin-right: 20px;
  margin-top: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.overflow-auto {
  overflow: auto;
}
.labelStyle {
  display:inline-block;
  width:200px;
  text-align:end;
}
.filterbtn {
  margin-left:240px;
  margin-top:-100px;
}
</style>
