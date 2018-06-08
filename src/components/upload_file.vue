<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backProjectList"></i>
    </el-tooltip>
    <div class="margin-top-10">
      <span class="p-font-style">样本数据：</span>
        <el-select v-model="sample_name" placeholder="请选择" @change="change()" :disabled="disabled">
          <el-option v-for="item in message.nameSampleMap" :key="item.name" :value="item.name"></el-option>
        </el-select>
    </div>
      <div class="fileDivStyle">
        <span class="p-font-style">文件1:</span>
        <input type="file" name="" ref="file1">
      </div>
      <div class="fileDivStyle">
        <span class="p-font-style">文件2:</span>
        <input type="file" name="" ref="file2">
      </div>
      <el-button type="primary" @click="upload()" :disabled="disabled">上 传</el-button>
      <p class="p-font-style">上传进度：</p>
      <el-progress :percentage="progress"></el-progress>
    <div class="">
      <p class="p-font-style">实验条件一览</p>
      <table class="gridtable">
        <tr>
            <th>样本名称</th><th>fastq 文件</th>
        </tr>
        <tr v-for="item in message.nameSampleMap">
            <td>{{item.name}}</td>
            <td>
              <p v-for="fileList in item.readPairList">
                <span v-for="file in fileList">{{file}} &nbsp;&nbsp;</span>
                <i class="el-icon-delete cursor-pointer icon-style" @click="deleteFile(item, fileList)"></i>
              </p>
            </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sample_name: '',
      message: {},
      progress: 0,
      currentItem: null,
      fileObj: {},
      disabled: false
    }
  },
  components: {
  },
  mounted () {
    this.getFile()
  },
  methods: {
    getFile () {
      this.axios.get('/server/experiment?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        if (!res.data.message) {
          this.message = {}
        } else {
          this.message = res.data.message
        }
      })
    },
    upload () {
      if (!this.$refs.file1.files[0] && !this.$refs.file2.files[0]) {
        this.$message.error('请选择要上传的文件!');
        return
      }
      if (!this.$refs.file1.files[0] || !this.$refs.file2.files[0]) {
        this.$message.error('请上传两个文件!');
        return
      }
      if (!this.sample_name) {
        this.$message.error('请选择样本数据!');
        return
      }
      this.disabled = true
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('sample_name', this.sample_name)
      formData.append('r1', this.$refs.file1.files[0])
      formData.append('r2', this.$refs.file2.files[0])
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          this.progress = complete
        }
      }
      this.axios.post('/server/upload_rnaseq_paired_fastq', formData, config).then((res) => {
        if (res.data.message_type === 'success') {
          this.disabled = false
          this.$message.success('上传成功!');
          this.getFile()
        }
      })
    },
    change (item) {
      this.$refs.file1.value = ''
      this.$refs.file2.value  = ''
      this.progress = 0
      this.disabled = false
    },
    deleteFile (item, fileObj) {
      this.currentItem = item
      this.fileObj = fileObj
      this.$confirm('此操作将永久删除该样本的fastq文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let formData = new FormData()
          formData.append('username', this.$store.state.username)
          formData.append('p', this.$store.state.projectId)
          formData.append('sample_name', this.currentItem.name)
          formData.append('r1', this.fileObj['r1'])
          formData.append('r2', this.fileObj['r2'])
          this.axios.post('/server/delete_rnaseq_paired_fastq',formData).then((res) => {
            if (res.data.message_type === 'success') {
              this.getFile()
              this.$message.success('删除成功！');
            } else {
              this.$message.error('删除失败！');
            }
          })
        }).catch(() => {});
    },
    backProjectList () {
      this.$router.push({'name': 'project_list'})
    }
  }
}
</script>

<style scoped="true">
.content {
  width: 60%;
  margin: 19px auto;
}
table.gridtable {
    width: 100%;
    text-align: center;
    font-size:14px;
    color:#333333;
    border-width: 1px;
    border-color: #ebeef5;
    border-collapse: collapse;
}
table.gridtable th {
    color: #333;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #ebeef5;
}
table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #ebeef5;
    background-color: #ffffff;
}
.p-font-style{
  color: #666;
}
.cursor-pointer{
  cursor: pointer;
}
.fileDivStyle {
  margin: 20px 0;
}
.right {
  float: right;
  width: 60px;
}
.item {
  margin: 4px;
}
.margin-top-10 {
  margin-top: 10px;
}
.icon-style {
  color: #f56b6c;
}
</style>
