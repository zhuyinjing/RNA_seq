<template>
  <div>
    <div class="textStyle" v-if="loginBtnShow">
      <el-card class="box-card">
        <div class="text item">
          请先登录后再查看！
        </div>
        <el-button type="danger" @click="login()">登录</el-button>
      </el-card>
    </div>
    <div class="" v-if="projectShow">
      <div class="createbtn">
        <el-button type="primary" plain @click="createProjectDialog = true">+ 新建项目</el-button>
      </div>
      <div class="tableDiv">
        <div class="table-item" v-for="item in projectList">
          <div class="titleDiv">
            项目名称：{{item.name}} 创建时间：{{item.openTime}}
          </div>
          <div class="btnDiv">
            <el-button @click="createExperiment(item)">查看/编辑 实验设计<i class="el-icon-menu el-icon--right"></i></el-button>
            <el-button @click="upload(item)">上传测序文件<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button @click="runTask(item)">运行分析<i class="el-icon-caret-right el-icon--right"></i></el-button>
            <el-button @click="report(item)">查看报告<i class="el-icon-document el-icon--right"></i></el-button>
            <el-button class="float-right" type="danger" @click="deleteProject(item.id)">删除项目<i class="el-icon-delete el-icon--right"></i></el-button>
          </div>
        </div>
      </div>
    </div>

    <login ref="loginDiv"></login>

    <el-dialog title="新建项目" :visible.sync="createProjectDialog" width="30%">
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input v-model="form.description" auto-complete="off" clearable></el-input>
        </el-form-item>
        <div class="margin-bottom-10">
          <label for="">物种类型</label>
        </div>
        <el-select v-model="form.species" placeholder="物种类型">
          <el-option v-for="item in speciesList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <div class="selectDiv">
          <label for="">测序类型</label>
        </div>
        <el-select v-model="form.type" placeholder="物种类型">
          <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createProjectDialog = false">取消</el-button>
        <el-button type="primary" @click="createClick()">新建</el-button>
      </div>
  </el-dialog>

  </div>
</template>
<script>
import login from '@/components/login'
export default {
  data () {
    return {
      loginBtnShow: false,
      projectShow: false,
      createProjectDialog: false,
      projectList: null,
      form: {
        id: '',
        name: '',
        description: '',
        species: 'homo_sapiens',
        type: 'rnaseq'
      },
      speciesList: ['homo_sapiens', 'ictidomys_tridecemlineatus', 'glycine_max'],
      typeList: ['rnaseq'],
      deleteId: ''
    }
  },
  components: {
    login
  },
  mounted () {
    if (!this.$store.state.username) {
      this.loginBtnShow = true
      this.projectShow = false
    } else {
      this.loginBtnShow = false
      this.projectShow = true
      this.getProjects()
    }
  },
  methods: {
    getProjects () {
      this.axios.get('/server/projects?username=' + this.$store.state.username).then((res) => {
        this.projectList = res.data.projects
        for (let i in this.projectList) {
          let d = new Date(this.projectList[i]['openTime'])
          this.projectList[i]['openTime'] = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        }
      })
    },
    login () {
      this.$refs.loginDiv.loginDialog = true
    },
    createClick () {
      if (!this.form.name) {
        this.$message.error('项目名不能为空!')
        return
      }
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('name', this.form.name)
      formData.append('description', this.form.description)
      formData.append('species', this.form.species)
      formData.append('type', this.form.type)
      this.axios.post('/server/create_project', formData).then((res) => {
        if (res.data.message_type === 'success') {
          this.getProjects()
        } else {
          this.$message.error('请求错误!');
        }
        this.form.name = ''
        this.form.description = ''
        this.createProjectDialog = false
      })
    },
    deleteProject (id) {
      this.deleteId = id
      this.$confirm('确认删除该项目吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let formData = new FormData()
          formData.append('username', this.$store.state.username)
          formData.append('p', this.deleteId)
          this.axios.post('/server/delete_project', formData).then((res) => {
            if (res.data.message_type === 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 1000
              })
              this.getProjects()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!',
                duration: 1000
              });
            }
          })
        }).catch(() => {});
    },
    createExperiment (item) {
      this.commitStore(item)
      this.$router.push({'name': 'create_experiment'})
    },
    upload (item) {
      this.commitStore(item)
      this.$router.push({'name': 'upload_file'})
    },
    runTask (item) {
      this.commitStore(item)
      this.$router.push({'name': 'run_task'})
    },
    report (item) {
      this.commitStore(item)
      this.axios.get('/server/rnaseq_report_index?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        if (res.data.experimentDesign !== null || res.data.rnaSeqReportSummary !== null) {
          this.$store.commit('setinfo', res.data)
          sessionStorage.setItem('geneSum', res.data.rnaSeqReportSummary.geneNum)
        }
      })
      this.$router.push({'name': 'report'})
    },
    commitStore (item) {
      this.$store.commit('setprojectName', item.name)
      this.$store.commit('setprojectId', item.id)
    },
  }
}
</script>

<style scoped="true">
.textStyle {
  text-align: center;
  margin-top: 20px;
}
.text {
    font-size: 16px;
  }

  .item {
    margin: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 500px;
    margin: 0 auto;
  }

  .float-right {
    float: right;
  }

  .tableDiv {
    width: 60%;
    margin: 0 auto;
  }

  .table-item {
    border:1px solid #eee;
    margin-bottom:20px;
  }

  .titleDiv {
    color: #fff;
    border-bottom: 1px solid #64b5ff;
    line-height: 40px;
    padding-left: 10px;
    background-color: #64b5ff;
  }

  .btnDiv {
    padding:10px;
  }

  .margin-bottom-10 {
    margin-bottom: 10px;
  }

  .selectDiv {
    margin-top:20px;
    margin-bottom:10px;
  }

  .createbtn {
    width: 60%;
    margin: 19px auto;
  }

  .delete-font-color {
    color: #f56b6c;
  }
</style>
