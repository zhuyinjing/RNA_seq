<template>
  <div class="content">
    <p>项目名称: {{projectName}}</p>
    <div class="">
      <el-button type="danger" @click="editDesign()"><i class="el-icon-edit"></i>编辑/更新实验设计</el-button>
      <el-button type=""><i class="el-icon-delete"></i>清空实验设计</el-button>
    </div>
    <div class="" style="display:inline-block;width:40%;margin-right:50px;">
      <p class="p-font-style">实验条件一览</p>
      <table class="gridtable">
        <tr>
            <th>实验条件</th><th>样本名称</th>
        </tr>
        <tr v-for="item in message.nameSampleMap">
            <td>{{item.condition}}</td><td>{{item.name}}</td>
        </tr>
      </table>
    </div>
    <div class="" style="display:inline-block;width:40%">
      <p class="p-font-style">差异表达基因比对条件</p>
      <table class="gridtable">
        <tr>
            <th>实验条件</th><th>样本名称</th>
        </tr>
        <tr v-for="item in message.experiments">
            <td>{{item._case}}</td><td>{{item._control}}</td>
        </tr>
      </table>
    </div>

    <el-dialog title="第一步：填写实验条件" :visible.sync="step1Dialog" width="30%">
      <el-button type="danger" @click="addCondition()">
        <i class="el-icon-circle-plus"></i>
        增加实验条件
      </el-button>
      <div style="padding:10px 5px" v-for="item in condition">
        实验条件
        <el-input
          style="width:30%;margin-right:20px"
          v-model="item.option"
          clearable>
        </el-input>
        样本数目
        <el-input
          style="width:20%;margin-right:20px"
          v-model="item.number"
          clearable>
        </el-input>
        <i class="el-icon-remove cursor-poiter" @click="deleteOption(item)"></i>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="step1Dialog = false">取消</el-button>
        <el-button type="danger" @click="nextStepClick()">下一步</el-button>
      </div>
    </el-dialog>

    <el-dialog title="第二步：填写需要进行差异表达基因对比的条件对" :visible.sync="step2Dialog" width="30%">
      <div style="padding:10px 5px" v-for="item in experiments">
        {{item['_case']}} vs {{item['_control']}} &nbsp;&nbsp;&nbsp;<i class="el-icon-remove cursor-poiter" @click="deleteVs(item)"></i>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="step1Dialog = true;step2Dialog = false">上一步</el-button>
        <el-button type="danger" @click="nextStepClick()">完成</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      step1Dialog: false,
      step2Dialog: false,
      projectName: '',
      condition: [],
      conditionNumMap: {},
      conditionList: [],
      experiments: [],
      message: {
        "projectId": 16,
        "conditionNumMap": {
          "A": 3,
          "B": 3,
          "C": 3
        },
        "nameSampleMap": {
          "A_1": {
            "name": "A_1",
            "condition": "A",
            "readPairList": []
          },
          "A_2": {
            "name": "A_2",
            "condition": "A",
            "readPairList": []
          },
          "A_3": {
            "name": "A_3",
            "condition": "A",
            "readPairList": []
          },
          "B_1": {
            "name": "B_1",
            "condition": "B",
            "readPairList": []
          },
          "B_2": {
            "name": "B_2",
            "condition": "B",
            "readPairList": []
          },
          "B_3": {
            "name": "B_3",
            "condition": "B",
            "readPairList": []
          },
          "C_1": {
            "name": "C_1",
            "condition": "C",
            "readPairList": []
          },
          "C_2": {
            "name": "C_2",
            "condition": "C",
            "readPairList": []
          },
          "C_3": {
            "name": "C_3",
            "condition": "C",
            "readPairList": []
          }
        },
        "experiments": [
          {
            "_case": "A",
            "_control": "B"
          },
          {
            "_case": "A",
            "_control": "C"
          },
          {
            "_case": "B",
            "_control": "C"
          }
        ]
      }
    }
  },
  components: {
  },
  mounted () {

  },
  methods: {
    editDesign () {
      this.condition = []
      for (let k in this.message.conditionNumMap) {
        let obj = {'option': k, 'number': this.message.conditionNumMap[k]}
        this.condition.push(obj)
      }
      this.step1Dialog = true
    },
    addCondition () {
      this.condition.push({})
    },
    nextStepClick () {
      this.conditionList = []
      this.experiments = []
      for (let i = 0;i < this.condition.length;i++) {
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
      let index = this.condition.indexOf(item)
      this.condition.splice(index, 1)
    },
    deleteVs (item) {
      let index = this.experiments.indexOf(item)
      this.experiments.splice(index, 1)
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
</style>
