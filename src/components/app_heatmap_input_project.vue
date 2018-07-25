<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <appLeftMenu></appLeftMenu>
    </el-aside>
    <el-main>
      <div>
        <div class="margin-top-10">
          <div class="labelStyle vertical-align-top">
            <label for="maxpval" class="label-font">输入基因 ID 列表</label>
          </div>
          <div class="inline-block" style="width:800px;">
            <el-input
              type="textarea"
              :rows="20"
              placeholder="请输入 ID 列表"
              v-model="textareaMatrix">
            </el-input>
          </div>
        </div>
        <div class="margin-top-10">
          <div class="labelStyle">
            <label for="maxpval" class="label-font">选择项目</label>
          </div>
          <div class="inline-block" style="width:800px;">
            <el-select class="input-style" v-model="project" placeholder="请选择" @change="projectChange()">
              <el-option value="1">1</el-option>
              <el-option value="2">2</el-option>
            </el-select>
          </div>
        </div>
        <div class="margin-top-10">
          <div class="labelStyle">
            <label for="maxpval" class="label-font">选择分组</label>
          </div>
          <div class="inline-block" style="width:800px;">
            <el-select v-model="group" multiple placeholder="请选择">
              <el-option
                v-for="item in groups"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
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
    </el-main>
  </el-container>
</template>

<script>
import appLeftMenu from './app_leftMenu.vue'

export default {
  data () {
    return {
      textareaMatrix: '',
      row_distance: 'euclidean',
      row_linkage: 'ward',
      column_distance: 'euclidean',
      column_linkage: 'ward',
      loading: null,
      project: 1,
      group: [],
      groups: [3, 4],
    }
  },
  components: {
    appLeftMenu
  },
  mounted () {
  },
  methods: {
    submit () {
      // 判断 基因 ID 列表 是否为空
      if (!this.textareaMatrix.trim()) {
        this.$message.error('请输入基因 ID 列表!');
        return
      }
      this.textareaMatrix = this.textareaMatrix.replace(/(\,|\s)+/g, '\n')
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
          this.$router.push({'name': 'app_heatmap_project'})
        } else {
          this.$message.success('请求错误!');
        }
        this.loading.close()
      })
    },
    projectChange () {
      this.group = []
      this.groups = [1, 2, 3, 4, 5, 6]
    },
  }
}
</script>

<style scoped="true">
.cursor-pointer {
  cursor: pointer;
}
.labelStyle {
  display:inline-block;
  width:150px;
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
</style>
