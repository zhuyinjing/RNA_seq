<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backProjectList"></i>
    </el-tooltip>
    <h3 class="p-font-style">项目名称：{{$store.state.projectName}}</h3>
    <div>
        <label for="maxpval" class="label-font">pvalue &le;</label>
        <input type="text" id="maxpval" placeholder="0.05" class="input-style" v-model="maxpval"/>
        <label for="maxfdr" class="label-font">FDR &le;</label>
        <input type="text" id="maxfdr" placeholder="0.05" class="input-style" v-model="maxfdr"/>
        <label for="minfc" class="label-font">log2FoldChange(绝对值) &ge;</label>
        <input type="text" id="minfc" placeholder="0" class="input-style" v-model="minfc"/>
        <el-button type="primary" size="mini" plain @click="filterTable()">筛选</el-button>
    </div>
    <br>
    <div class="form-group">
        <label class="radio-inline control-label">显示：</label>
        <el-radio v-model="displayByFC" label="1">在 Normal 中表达量上调基因</el-radio>
        <el-radio v-model="displayByFC" label="-1">在 Normal 中表达量下调基因</el-radio>
        <el-radio v-model="displayByFC" label="0">所有上调和下调基因</el-radio>
    </div>
    <br>
    <div class="margin-bottom-20">
      <el-button type="danger" @click="heatmapClick()">Heat Map</el-button>
      <el-button type="primary" @click="ppiClick()">ppi</el-button>
      <el-button type="success" @click="heatmapsvgClick()">Heat Map Svg</el-button>
    </div>
    <transition name="fade">
    <table id="example" class="display" cellspacing="0" width="100%" v-show="tableShow">
        <thead>
          <tr>
            <th><input type="checkbox" name="select_all" value="1" id="example-select-all"></th>
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
            <td> <input type="checkbox" name="" :value="index"> </td>
            <td>{{item.target_id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.description}}</td>
            <td>{{item.type}}</td>
            <td>{{item.baseMean}}</td>
            <td>{{item.log2FoldChange}}</td>
            <td>{{item.pvalue}}</td>
            <td>{{item.padj}}</td>
          </tr>
        </tbody>
    </table>
  </transition>
  </div>
</template>

<script>
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
    }
  },
  components: {
  },
  mounted () {
    this.getTabelValue()
  },
  // destroyed () {
  //   this.maxpval = null
  //   this.maxfdr = null
  //   this.minfc = null
  //   this.displayByFC = '0'
  //   this.filterTable()
  // },
  methods: {
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
      this.$router.push({'name': 'heatmap_input'})
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
      this.$router.push({'name': 'heatmapsvg_input'})
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
      this.$router.push({'name': 'ppi_chord_plot_input'})
    },
    filterTable () {
      let self = this
      $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var maxPVAL = parseFloat(self.maxpval);
                var maxFDR = parseFloat(self.maxfdr);
                var minFC = parseFloat(self.minfc);
                var pval = parseFloat(data[7]);
                var fc = parseFloat(data[6]);
                var fdr = parseFloat(data[8]);
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
        var table = $('#example').DataTable();

        table.draw();
    },
    initTable (data) {
      let self = this
      this.data = data
      $(document).ready(function() {
          $('#example').DataTable( {
              lengthMenu: [[25, 50, 100, -1], [25, 50, 100, "All"]],
              pageLength: 25,
              columnDefs: [{
                'targets':   0,
                'orderable': false,
                'className': 'dt-body-center',
              }],
              order: [],
          } );
          self.tableShow = true
          var table = $('#example').DataTable();
          $('#example-select-all').on('click', function(){
            var rows = table.rows({ 'search': 'applied' }).nodes();
            $('input[type="checkbox"]', rows).prop('checked', this.checked);
            if (this.checked) {
              self.checked = []
              for(let i = 0; i < self.data.length; i++) {
                self.checked.push(self.data[i])
              }
            } else {
              self.checked = []
            }
         });
         $('#example tbody').on('change', 'input[type="checkbox"]', function(){
          if(!this.checked){
            let index = self.checked.indexOf(self.data[this.value])
            self.checked.splice(index, 1)
             var el = $('#example-select-all').get(0);
             if(el && el.checked && ('indeterminate' in el)){
                el.indeterminate = true;
             }
            } else {
              self.checked.push(self.data[this.value]);
              //  手动选择所有 thead input checkbox 为选中状态
              if (self.checked.length === self.data.length) {
                $('#example-select-all').get(0).checked = true
              }
            }
         });
      } );
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
  width: 60%;
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
  height: 16px;
  margin-right: 20px;
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
</style>
