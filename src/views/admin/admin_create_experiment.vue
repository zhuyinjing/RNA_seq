<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" :content="$t('button.back')" placement="right">
      <i class="el-icon-back" @click="backProjectList"></i>
    </el-tooltip>
    <p>{{$t('project_list.project_name')}}: {{this.$store.state.projectName}}</p>
    <div class="">
      <el-button type="danger" @click="editDesign()"><i class="el-icon-edit"></i>{{$t('create_experiment.edit_experiment')}}</el-button>
      <el-button type="" @click="clearDesign"><i class="el-icon-delete"></i>{{$t('create_experiment.clear_experiment')}}</el-button>
    </div>
    <div class="tableStyle">
      <p class="p-font-style">{{$t('create_experiment.experiment_list')}}</p>
      <table class="gridtable">
        <tr>
            <th>样本组</th><th>样本数</th><th>样本名称</th>
        </tr>
        <tr v-for="item in 3">
            <td :class="{'bgcolor': item % 2 === 0 ? false: true}">{{item}}</td>
            <td :class="{'bgcolor': item % 2 === 0 ? false: true}">{{item}}</td>
            <td :class="{'bgcolor': item % 2 === 0 ? false: true}">{{item}}</td>
        </tr>
      </table>
    </div>
    <div class="degtable">
      <p class="p-font-style">{{$t('create_experiment.case_control')}}</p>
      <table class="gridtable">
        <tr>
            <th>样本数</th><th>样本名称</th>
        </tr>
        <tr v-for="item in 3">
            <td :class="{'bgcolor': item % 2 === 0 ? false: true}">{{item}}</td>
            <td :class="{'bgcolor': item % 2 === 0 ? false: true}">{{item}}</td>
        </tr>
      </table>
    </div>

    <el-dialog  :title="$t('create_experiment.edit_experiment')" :visible.sync="step1Dialog" width="50%">
      <div class="">
        <el-radio v-model="radioMethod" label="CCA">CCA</el-radio>
        <el-radio v-model="radioMethod" label="PCA">PCA</el-radio>
      </div> <br>
      <div class="" v-show="radioMethod === 'CCA'">
        <el-button type="danger" @click="addCondition()">
          <i class="el-icon-circle-plus"></i>
          {{$t('create_experiment.add_condition')}}
        </el-button>
        <div class="padding-10-5" v-for="item in CCAJson">
          样本组
          <el-input
            class="conditioninput width-100"
            v-model="item.sample_group"
            clearable>
          </el-input>
          样本数
          <el-input
            class="numberinput width-100"
            v-model="item.sample_number"
            clearable>
          </el-input>
          <i class="el-icon-remove cursor-poiter" @click="deleteOption(item)"></i>
        </div>
      </div>
      <div class="" v-show="radioMethod === 'PCA'">
        样本数
        <el-input
          class="conditioninput width-100"
          v-model="PCAJson.sample_number"
          clearable>
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="step1Dialog = false">{{$t('button.cancel')}}</el-button>
        <el-button type="danger" @click="nextStepClick()">{{$t('button.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      radioMethod: 'CCA',
      step1Dialog: false,
      step2Dialog: false,
      condition: [],
      conditionNumMap: {},
      conditionList: [],
      experiments: [],
      message: {},
      CCAJson: [
        // {
        //   sample_group: '',
        //   number: ''
        // },
        // {
        //   sample_group: '',
        //   number: ''
        // }
      ],
      PCAJson: {
        sample_number: null,
      }
    }
  },
  components: {
  },
  mounted () {
    // this.getExperiment()
  },
  methods: {
    getExperiment () {
      this.axios.get('/server/experiment?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        if (!res.data.message) {
          this.message = {}
        } else {
          this.message = res.data.message
        }
      })
    },
    editDesign () {
      this.condition = []
      for (let k in this.message.conditionNumMap) {
        let obj = {'option': k, 'number': this.message.conditionNumMap[k]}
        this.condition.push(obj)
      }
      this.step1Dialog = true
    },
    addCondition () {
      this.CCAJson.push({})
    },
    nextStepClick () {
      console.log(this.CCAJson);
      return
      if (this.condition.length < 2) {
        this.$message.error('实验条件的数量需要大于2个!');
        return
      }
      this.conditionList = []
      this.experiments = []
      for (let i = 0;i < this.condition.length;i++) {
        if (/[,.!\u3002\uff0c]/.test(this.condition[i].option)) {
          this.$message.error('请将实验条件包含不规则字符，请重新填写!');
          return
        }
        if(!this.condition[i].option || !this.condition[i].number) {
          this.$message.error('请将实验条件和样本数目填写完整!');
          return
        }
        this.conditionNumMap[this.condition[i].option] = this.condition[i].number
        this.conditionList.push(this.condition[i].option)
      }
      let array = this.conditionList
      for(let i = 0; i < array.length; i++) {
          let a2 = array.concat()
          a2.splice(0, i + 1)
          for(let j = 0; j < a2.length; j++) {
              let a3 = a2.concat()
              a3.splice(0, j + 1)
              this.experiments.push({'_case': array[i], '_control': a2[j]})
          }
      }
      this.step2Dialog = true
      setTimeout(() => {
        this.step1Dialog = false
      }, 0)
    },
    deleteOption (item) {
      let index = this.CCAJson.indexOf(item)
      this.CCAJson.splice(index, 1)
    },
    deleteVs (item) {
      let index = this.experiments.indexOf(item)
      this.experiments.splice(index, 1)
    },
    refresh (item) {
      let k = item['_case']
      let v = item['_control']
      item['_case'] = v
      item['_control'] = k
    },
    createExperiment () {
      if (this.experiments.length === 0) {
        this.$message.error('对比条件不能为空，请返回上一步重新选择！');
        return
      }
      let obj = {}
      obj.projectId = this.$store.state.projectId
      obj.conditionNumMap = {}
      for (let i in this.condition) {
        obj.conditionNumMap[this.condition[i]['option']] = this.condition[i]['number']
      }
      obj.nameSampleMap = {}
      for(let i = 0; i < this.condition.length; i++) {
        for(let j = 1; j <= this.condition[i]['number']; j++) {
          let key = this.condition[i]['option'] + '_' + j
          obj.nameSampleMap[key] = {
            'name': key,
            'condition': this.condition[i]['option'],
            'readPairList': []
          }
        }
      }
      obj.experiments = this.experiments
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('p', this.$store.state.projectId)
      formData.append('experimentObjectString', JSON.stringify(obj))
      this.axios.post('/server/create_experiment', formData).then((res) => {
        if(res.data.message_type === 'success') {
          this.message = res.data.message
        } else {
          this.$message.error('请求异常！');
        }
        this.step2Dialog = false
      })
    },
    clearDesign () {
      this.$confirm('确认清空该实验设计吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.axios.get('/server/clear_experiment?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
            if (res.data === 'success') {
              this.$message.success('已清空!');
              this.message = {}
            } else {
              this.$message.error('清空失败!');
            }
          })
        }).catch(() => {});

    },
    backProjectList () {
      this.$router.push({'path': '/admin'})
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
.cursor-poiter{
  cursor: pointer;
}
.tableStyle {
  display:inline-block;
  width:40%;
  margin-right:50px;
}
.right {
  float: right;
  width: 60px;
}
.item {
  margin: 4px;
}
.cursor-pointer {
  cursor: pointer;
}
.bgcolor {
  background-color: #f9f9f9 !important;
}
.degtable {
  display: inline-block;
  width: 40%;
}
.padding-10-5 {
  padding: 10px 5px;
}
.conditioninput {
  width: 30%;
  margin-right: 20px;
}
.numberinput {
  width: 20%;
  margin-right: 20px;
}
@media screen and (max-width:1400px) {
  .width-100 {
    width: 100%;
  }
}
</style>
