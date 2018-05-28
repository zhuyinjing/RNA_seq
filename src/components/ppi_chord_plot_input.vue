<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backReportDeg"></i>
    </el-tooltip>
    <h3>绘制蛋白蛋白相互作用图</h3>
    <table>
      <tr>
        <td style="">基因列表</td>
        <td>
          <div class="tagsDiv">
            <div class="tag" v-for="item in $store.state.geneList">
              <span>{{item.target_id}}</span> <span style="margin-left:20px;">{{item.name}}</span>
              <i style="float:right;margin-top:8px;"class="el-icon-close cursor-pointer" @click="handleClose(item)"></i>
            </div>
          </div>
      </td>
      </tr>
      <tr>
        <td style="">新增基因</td>
        <td>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Gene</el-button>
      </td>
      </tr>
      <!-- <tr>
        <td style="">选择项目</td>
        <td>
          <el-select v-model="project" placeholder="请选择">
          <el-option v-for="item in optionProject" :key="item" :value="item">
          </el-option>
        </el-select>
      </td>
      </tr> -->
        <td></td>
        <td>
          <el-button type="primary" @click="submit()">提交</el-button>
      </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputVisible: false,
      inputValue: '',
      optionProject: ['RNASeq'],
      project: 'RNASeq',
      row_distance: 'euclidean',
      row_linkage: 'ward',
      column_distance: 'euclidean',
      column_linkage: 'ward',
    }
  },
  components: {
  },
  mounted () {
    console.log(this.$store.state.geneList.length)
  },
  methods: {
    submit () {
      let temp = []
      for(let i =0;i < this.$store.state.geneList.length;i++) {
        temp.push(this.$store.state.geneList[i]['target_id'])
      }
      temp = temp.join('\n')
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('genelist', temp)
      this.axios.post('/server/ppi_chord_plot.app', formData).then((res) => {
        this.$store.commit('setppiJson', res.data.message)
        this.$router.push({'name': 'ppi_chord_plot'})
      })
    },
    handleClose(tag) {
        this.$store.state.geneList.splice(this.$store.state.geneList.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = {}
        if (this.inputValue) {
          inputValue.target_id = this.inputValue
          this.$store.state.geneList.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    backReportDeg () {
      this.$router.push({'name': 'report_deg'})
    },

  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  margin: 19px auto;
}
.cursor-pointer{
  cursor: pointer;
}
.tagsDiv {
  display: inline-block;
  width: 500px;
  height:500px;
  overflow-y: auto;
  border: 1px solid #ccc;
}
.tagDiv {
  margin: 5px;
}
.tag {
  margin: 5px;
  background-color: rgba(64,158,255,.1);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409EFF;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    /* display: inline-block; */
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 5px;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
</style>
