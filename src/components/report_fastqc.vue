<template>
  <div class="content">
    <el-tooltip class="item cursor-pointer" effect="dark" content="返回" placement="right">
      <i class="el-icon-back" @click="backReport"></i>
    </el-tooltip>

    <h3>项目：{{$store.state.projectName}}</h3>
    <table class="gridtable">
      <caption>测序数据质量评估简报</caption>
      <thead>
        <tr>
          <th>文件名</th>
          <th>基本统计</th>
          <th>碱基质量</th>
          <th>每瓦质量</th>
          <th>序列质量</th>
          <th>碱基序列内容</th>
          <th>GC含量</th>
          <th>无效碱基含量</th>
          <th>序列长度分布</th>
          <th>序列重复等级</th>
          <th>过表达序列</th>
          <th>接头污染</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData">
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
                {{item.fileName}}
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.basicStatistics === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.basicStatistics === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.basicStatistics === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.perBaseSequenceQuality === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perBaseSequenceQuality === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perBaseSequenceQuality === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.perTileSequenceQuality === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perTileSequenceQuality === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perTileSequenceQuality === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.perSequenceQualityScores === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perSequenceQualityScores === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perSequenceQualityScores === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.perBaseSequenceContent === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perBaseSequenceContent === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perBaseSequenceContent === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.perSequenceGcContent === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perSequenceGcContent === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perSequenceGcContent === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.perBaseNContent === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perBaseNContent === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perBaseNContent === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.sequenceLengthDistribution === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.sequenceLengthDistribution === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.sequenceLengthDistribution === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.sequenceDuplicationLevels === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.sequenceDuplicationLevels === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.sequenceDuplicationLevels === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.overrepresentedSequences === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.overrepresentedSequences === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.overrepresentedSequences === 'WARN'"></i>
            </td>
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.adapterContent === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.adapterContent === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.adapterContent === 'WARN'"></i>
            </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
    }
  },
  components: {
  },
  mounted () {
    this.initTable()
  },
  methods: {
    initTable () {
      this.axios.get('/server/fastqc?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        this.tableData = res.data.slice(1)
      })
    },
    backReport () {
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
.cursor-pointer {
  cursor: pointer;
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
.color-green {
  color: green;
}
.color-red {
  color: red;
}
.color-orange {
  color: orange;
}
.bgcolor {
  background-color: #f9f9f9 !important;
}
</style>
