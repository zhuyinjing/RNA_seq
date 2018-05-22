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
              <span style='font-family:"Times New Roman",Georgia,monospace;'>{{item.target_id}}</span> <span style="margin-left:20px;font-family:'Times New Roman',Georgia,monospace;">{{item.name}}</span>
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
      <!-- <tr>
        <td>基因距离计算方法</td>
        <td>
          <el-select v-model="row_distance" placeholder="请选择">
            <el-option value="euclidean">euclidean</el-option>
            <el-option value="dice">dice</el-option>
            <el-option value="hamming">hamming</el-option>
            <el-option value="jaccard">jaccard</el-option>
            <el-option value="kulsinski">kulsinski</el-option>
            <el-option value="matching">matching</el-option>
            <el-option value="rogerstanimoto">rogerstanimoto</el-option>
            <el-option value="russellrao">russellrao</el-option>
            <el-option value="sokalmichener">sokalmichener</el-option>
            <el-option value="sokalsneath">sokalsneath</el-option>
            <el-option value="yule">yule</el-option>
            <el-option value="braycurtis">braycurtis</el-option>
            <el-option value="canberra">canberra</el-option>
            <el-option value="chebyshev">chebyshev</el-option>
            <el-option value="cityblock">cityblock</el-option>
            <el-option value="correlation">correlation</el-option>
            <el-option value="cosine">cosine</el-option>
            <el-option value="mahalanobis">mahalanobis</el-option>
            <el-option value="minkowski">minkowski</el-option>
            <el-option value="seuclidean">seuclidean</el-option>
            <el-option value="sqeuclidean">sqeuclidean</el-option>
        </el-select>
      </td>
      </tr>
      <tr>
        <td>基因linkage计算方法</td>
        <td>
          <el-select v-model="row_linkage" placeholder="请选择">
            <el-option value="ward">ward</el-option>
            <el-option value="single">single</el-option>
            <el-option value="complete">complete</el-option>
            <el-option value="average">average</el-option>
            <el-option value="weighted">weighted</el-option>
            <el-option value="centroid">centroid</el-option>
            <el-option value="median">median</el-option>
        </el-select>
      </td>
      </tr>
      <tr>
        <td>样本距离计算方法</td>
        <td>
          <el-select v-model="column_distance" placeholder="请选择">
            <el-option value="euclidean">euclidean</el-option>
            <el-option value="dice">dice</el-option>
            <el-option value="hamming">hamming</el-option>
            <el-option value="jaccard">jaccard</el-option>
            <el-option value="kulsinski">kulsinski</el-option>
            <el-option value="matching">matching</el-option>
            <el-option value="rogerstanimoto">rogerstanimoto</el-option>
            <el-option value="russellrao">russellrao</el-option>
            <el-option value="sokalmichener">sokalmichener</el-option>
            <el-option value="sokalsneath">sokalsneath</el-option>
            <el-option value="yule">yule</el-option>
            <el-option value="braycurtis">braycurtis</el-option>
            <el-option value="canberra">canberra</el-option>
            <el-option value="chebyshev">chebyshev</el-option>
            <el-option value="cityblock">cityblock</el-option>
            <el-option value="correlation">correlation</el-option>
            <el-option value="cosine">cosine</el-option>
            <el-option value="mahalanobis">mahalanobis</el-option>
            <el-option value="minkowski">minkowski</el-option>
            <el-option value="seuclidean">seuclidean</el-option>
            <el-option value="sqeuclidean">sqeuclidean</el-option>
        </el-select>
      </td>
      </tr>
      <tr>
        <td>样本linkage计算方法</td>
        <td>
          <el-select v-model="column_linkage" placeholder="请选择">
            <el-option value="ward">ward</el-option>
            <el-option value="single">single</el-option>
            <el-option value="complete">complete</el-option>
            <el-option value="average">average</el-option>
            <el-option value="weighted">weighted</el-option>
            <el-option value="centroid">centroid</el-option>
            <el-option value="median">median</el-option>
        </el-select>
      </td>
      </tr>
      <tr> -->
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
      // let temp = []
      // for(let i =0;i < this.$store.state.geneList.length;i++) {
      //   temp.push(this.$store.state.geneList[i]['target_id'])
      // }
      // temp = temp.join('\n')
      // let formData = new FormData()
      // formData.append('username', this.$store.state.username)
      // formData.append('p', this.$store.state.projectId)
      // formData.append('genelist', temp)
      // formData.append('row_distance', this.row_distance)
      // formData.append('row_linkage', this.row_linkage)
      // formData.append('column_distance', this.column_distance)
      // formData.append('column_linkage', this.column_linkage)
      // this.axios.post('/server/heatmap.app', formData).then((res) => {
      //   this.$store.commit('setheatmapJson', res.data.message)
      //   this.$router.push({'name': 'heatmap'})
      // })
      this.$router.push({'name': 'ppi_chord_plot'})
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
