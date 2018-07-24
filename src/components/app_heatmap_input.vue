<template>
  <div class="content">
    <div class="margin-top-10">
      <div class="labelStyle">
        <label for="maxpval" class="label-font">基因表达矩阵</label>
        <i class="el-icon-question label-font cursor-pointer"></i>
      </div>
      <div class="inline-block">
        <el-radio v-model="radioMatrix" label="content">手动输入</el-radio>
        <el-radio v-model="radioMatrix" label="file">上传文件</el-radio>
      </div>
    </div>
    <div class="margin-top-10" v-show="radioMatrix === 'content'">
      <div class="labelStyle"></div>
      <div class="inline-block" style="width:40%;">
        <el-input
          type="textarea"
          :rows="20"
          placeholder="请输入内容"
          v-model="textareaMatrix">
        </el-input>
      </div>
      <!-- <el-button type="text">(example)</el-button> -->
    </div>
    <div class="margin-top-10" v-show="radioMatrix === 'file'">
      <div class="labelStyle"></div>
      <div class="inline-block" style="width:300px;">
        <input type="file" name="" ref="fileMatrix" accept=".csv, .tsv">
        <p class="span-font">支持文件类型：tsv, csv</p>
      </div>
    </div>
    <div class="margin-top-10">
      <div class="labelStyle">
        <label for="maxpval" class="label-font">分组信息</label>
        <i class="el-icon-question label-font cursor-pointer"></i>
      </div>
      <div class="inline-block">
        <el-radio v-model="radioGroup" label="content">手动输入</el-radio>
        <el-radio v-model="radioGroup" label="file">上传文件</el-radio>
      </div>
    </div>
    <div class="margin-top-10" v-show="radioGroup === 'content'">
      <div class="labelStyle"></div>
      <div class="inline-block" style="width:40%;">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="textareaGroup">
        </el-input>
      </div>
      <!-- <el-button type="text">(example)</el-button> -->
    </div>
    <div class="margin-top-10" v-show="radioGroup === 'file'">
      <div class="labelStyle"></div>
      <div class="inline-block" style="width:300px;">
        <input type="file" name="" ref="fileGroup" accept=".csv, .tsv">
        <p class="span-font">支持文件类型：tsv, csv</p>
      </div>
    </div>

    <div class="">
      <div class="margin-top-10">
        <div class="labelStyle">
          <label for="maxpval" class="label-font">基因距离计算方法</label>
        </div>
        <el-select class="input-style" v-model="row_distance" placeholder="请选择">
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
      </div>
      <div class="margin-top-10">
        <div class="labelStyle">
          <label for="maxfdr" class="label-font">基因linkage计算方法</label>
        </div>
        <el-select class="input-style" v-model="row_linkage" placeholder="请选择">
          <el-option value="ward">ward</el-option>
          <el-option value="single">single</el-option>
          <el-option value="complete">complete</el-option>
          <el-option value="average">average</el-option>
          <el-option value="weighted">weighted</el-option>
          <el-option value="centroid">centroid</el-option>
          <el-option value="median">median</el-option>
      </el-select>
      </div>
      <div class="margin-top-10">
        <div class="labelStyle">
          <label for="minfc" class="label-font">样本距离计算方法</label>
        </div>
        <el-select class="input-style" v-model="column_distance" placeholder="请选择">
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
      </div>
      <div class="margin-top-10">
        <div class="labelStyle">
          <label class="radio-inline control-label">样本linkage计算方法</label>
        </div>
        <el-select class="input-style" v-model="column_linkage" placeholder="请选择">
          <el-option value="ward">ward</el-option>
          <el-option value="single">single</el-option>
          <el-option value="complete">complete</el-option>
          <el-option value="average">average</el-option>
          <el-option value="weighted">weighted</el-option>
          <el-option value="centroid">centroid</el-option>
          <el-option value="median">median</el-option>
        </el-select>
      </div>
    </div>
    <div class="margin-top-10">
      <div class="labelStyle"></div>
      <div class="inline-block" style="width:300px;">
        <el-button type="primary" @click="submit()">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      textareaMatrix: null,
      textareaGroup: null,
      row_distance: 'euclidean',
      row_linkage: 'ward',
      column_distance: 'euclidean',
      column_linkage: 'ward',
      radioMatrix: 'file',
      radioGroup: 'file',
      MatrixIsFile: true,
      GroupIsFile: true,
      loading: null,
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    submit () {
      // 判断 基因表达矩阵 是否为空
      if (this.radioMatrix === 'file') {
        if (!this.$refs.fileMatrix.files[0]) {
          this.$message.error('请上传基因表达矩阵文件!');
          return
        }
        if (/text\/(c|t)sv$/.test(this.$refs.fileMatrix.files[0].type) === false) {
          this.$message.error('基因表达矩阵文件格式不对，请重新上传!');
          return
        }
        this.MatrixIsFile = true
      } else {
        if (!this.textareaMatrix.trim()) {
          this.$message.error('请输入基因表达矩阵!');
          return
        }
        this.MatrixIsFile = false
      }
      //  判断 分组信息 是否为空
      if (this.radioGroup === 'file') {
        if (!this.$refs.fileGroup.files[0]) {
          this.$message.error('请上传分组信息文件!');
          return
        }
        if (/text\/(c|t)sv$/.test(this.$refs.fileGroup.files[0].type) === false) {
          this.$message.error('分组信息文件格式不对，请重新上传!');
          return
        }
        this.GroupIsFile = true
      } else {
        if (!this.textareaGroup) {
          this.$message.error('请输入分组信息!');
          return
        }
        this.GroupIsFile = false
      }
      this.loading = this.$loading({
        lock: true,
        text: '文件正在上传中...请稍等...可能需要等待1分钟左右的时间...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('matrixFile', this.$refs.fileMatrix.files[0])
      formData.append('columnFile', this.$refs.fileGroup.files[0])
      formData.append('matrixText', this.textareaMatrix)
      formData.append('columnText', this.textareaGroup)
      formData.append('row_distance', this.row_distance)
      formData.append('row_linkage', this.row_linkage)
      formData.append('column_distance', this.column_distance)
      formData.append('column_linkage', this.column_linkage)
      formData.append('matrixIsFile', this.MatrixIsFile)
      formData.append('columnIsFile', this.GroupIsFile)
      this.axios.post('/server/upload_heatmap_file', formData).then((res) => {
        if (res.data.message_type === 'success') {
          this.$message.success('热图生成完成!');
          this.$store.commit('setheatmapJson', res.data.message)
          this.$router.push({'name': 'app_heatmap'})
        } else {
          this.$message.success('请求错误!');
        }
        this.loading.close()
      })

    },
  }
}
</script>

<style scoped="true">
.content {
  /* float:left; */
  width: 60%;
  padding: 0 20px;
  margin: 19px auto;
}
.cursor-pointer {
  cursor: pointer;
}
.labelStyle {
  display:inline-block;
  width:200px;
  text-align:end;
}
.label-font {
  font-size: 16px;
}
.margin-top-10 {
  margin-top: 10px;
}
.inline-block {
  display: inline-block;
}
.vertical-align-top {
  vertical-align: top;
}
.span-font {
  font-size: 12px;
  color: #54a0ff;
}
</style>
<style media="screen">
.color_scales {
  z-index: 9 !important;
}
</style>
