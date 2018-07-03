<template>
  <div class="">
    <leftMenu style="float:left;width:300px;margin-top:10px;"></leftMenu>

  <div class="content">
    <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
      <el-breadcrumb-item :to="{ path: 'report' }">项目 {{$store.state.projectName}}</el-breadcrumb-item>
      <el-breadcrumb-item>测序质检</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>测序数据质量评估简报</h2>
    <table class="gridtable">
      <thead>
        <tr>
          <th>文件名</th>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - Encoding 指测序平台的版本和相应的编码版本号，可推测是 Phred33 或是 Phred 64 质量分数的编码方式。 <br>
              - Total Sequences 输入文本的reads的数量。<br>
              Sequence length 测序的长度。<br>
              - %GC 是我们需要重点关注的一个指标，这个值表示的是全部序列中的 GC 含量，这个数值一般是物种特意的，比如人类细胞就是 42% 左右。
            </div>
            <th>基本统计</th>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - 用箱式图的方式展示数据质量，图中每 1 个位置，都是该位置的所有序列的测序质量的一个统计。<br>
              纵轴是质量得分，Q =-10*log10(p)，p 为测错的概率。所以一条 reads 某位置出错概率 0.01 时，其 quality 就是 20。横轴是测序序列的位置。<br>
              蓝色线是各个位置的平均值的连线。一般要求此图中，所有位置的 10% 分位数大于 20，也就是常说的 Q20 过滤。<br>
              - 如果任何碱基质量低于 10，或者是任何中位数低于 25 报警；<br>
              - 如果任何碱基质量低于 5，或者是任何中位数低于 20 报错。
            </div>
            <th>碱基质量</th>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - 这一模块是检查在测序平台上，reads 中每一个碱基位置在不同的测序小孔之间的偏离度，偏离度越高，碱基质量越差。<br>
              纵轴表示测序小孔，蓝色表示低于平均偏离度，越红则说明偏离平均质量方差越多，也就是说质量越差，本图中都是蓝色表明质量很好。<br>
              如果出现质量问题可能是短暂的，如有气泡产生，也可能是长期的，如在某一小孔中存在杂质。 <br>
              - 偏离度小于平均值2以上报警；<br>
              - 偏离度小于平均值5以上不合格。
            </div>
            <th>每瓦质量</th>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - 这是为了检测一部分质量特别差的 reads，如果有则会在图上出现多个峰，如在测序仪边缘的 reads。<br>
              纵轴是 reads 数目，横轴是质量分数，代表不同 Phred 值对应了多少的 reads。 <br>
              - 当峰值小于 27（错误率 0.2%）时警报； <br>
              - 当峰值小于 20（错误率 1%）时不合格。
            </div>
            <th>序列质量</th>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - 图中红色曲线是实际的测序 GC 含量分布图，而蓝色曲线则是理论分布（正态分布，不过均值不一定都是 50%，而是由平均 GC 含量推断的）。<br>
              如果红色曲线形状存在比较大的偏差，往往是由于文库的污染造成的。<br>
              红色曲线越平滑越好，越接近蓝色曲线越好。形状接近正态但偏离理论分布的情况提示我们可能有系统偏差。 <br>
              - 偏离理论分布的 reads 超过 15% 时发出警报； <br>
              - 超过30%时报不合格。
            </div>
            <th>GC含量</th>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - 纵轴是百分含量，横轴是 read 的位置，当测序仪不能确切地测定出某一个碱基时就会标注为 N，<br>
              正常情况下 N 的比例是很小的，所以图上常常看到一条直线。当看到有峰时，说明测序出了问题。 <br>
              - 当任意位置的 N 的比例超过 5% 警报； <br>
              - 超过 20% 不合格。
            </div>
            <th>无效碱基含量</th>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - 每次测序仪测出来的长度在理论上应该是完全相等的，但是总会有一些偏差，<br>
              当测序的长度有很大不同时，则表明测序仪在此次测序过程中产生的数据不可信，但对于某些测序平台，具有不同的 read 长度是完全正常的。 <br>
              - 当 reads 长度不一致时警告； <br>
              - 当有长度为 0 的 read 时不合格。
            </div>
            <th>序列长度分布</th>
          </el-tooltip>
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              - 此图衡量的是序列中两端 adapter 的情况，如果在 fastqc 分析的时候 -a（指定含 adapters 序列文件）选项没有内容，则默认使用图例中的通用 adapter 序列进行统计。 <br>
              - 含有 adapter 超过所有 reads 的 5% 的警告； <br>
              - 超过 10% 不合格。
            </div>
            <th>接头污染</th>
          </el-tooltip>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData">
            <!-- 文件名	 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <a :href="'/projects/'+ $store.state.projectId +'/results/006.fastqc/'+ item.fileName +'_fastqc.html'" target="_blank">{{item.fileName}}</a>
            </td>
            <!-- 基本统计	 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}">
              <i class="el-icon-success color-green" v-if="item.basicStatistics === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.basicStatistics === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.basicStatistics === 'WARN'"></i>
            </td>
            <!-- 碱基质量	 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}" class="cursor-pointer" @click="imgClick('/projects/' + $store.state.projectId+ '/results/006.fastqc/' + item.fileName + '_fastqc/Images/' + 'per_base_quality.png')">
              <i class="el-icon-success color-green" v-if="item.perBaseSequenceQuality === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perBaseSequenceQuality === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perBaseSequenceQuality === 'WARN'"></i>
            </td>
            <!-- 每瓦质量	 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}" class="cursor-pointer" @click="imgClick('/projects/' + $store.state.projectId+ '/results/006.fastqc/' + item.fileName + '_fastqc/Images/' + 'per_tile_quality.png')">
              <i class="el-icon-success color-green" v-if="item.perTileSequenceQuality === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perTileSequenceQuality === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perTileSequenceQuality === 'WARN'"></i>
            </td>
            <!-- 序列质量	 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}" class="cursor-pointer" @click="imgClick('/projects/' + $store.state.projectId+ '/results/006.fastqc/' + item.fileName + '_fastqc/Images/' + 'per_sequence_quality.png')">
              <i class="el-icon-success color-green" v-if="item.perSequenceQualityScores === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perSequenceQualityScores === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perSequenceQualityScores === 'WARN'"></i>
            </td>
            <!-- GC含量 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}" class="cursor-pointer" @click="imgClick('/projects/' + $store.state.projectId+ '/results/006.fastqc/' + item.fileName + '_fastqc/Images/' + 'per_sequence_gc_content.png')">
              <i class="el-icon-success color-green" v-if="item.perSequenceGcContent === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perSequenceGcContent === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perSequenceGcContent === 'WARN'"></i>
            </td>
            <!-- 无效碱基含量 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}" class="cursor-pointer" @click="imgClick('/projects/' + $store.state.projectId+ '/results/006.fastqc/' + item.fileName + '_fastqc/Images/' + 'per_base_n_content.png')">
              <i class="el-icon-success color-green" v-if="item.perBaseNContent === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.perBaseNContent === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.perBaseNContent === 'WARN'"></i>
            </td>
            <!-- 序列长度分布 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}" class="cursor-pointer" @click="imgClick('/projects/' + $store.state.projectId+ '/results/006.fastqc/' + item.fileName + '_fastqc/Images/' + 'sequence_length_distribution.png')">
              <i class="el-icon-success color-green" v-if="item.sequenceLengthDistribution === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.sequenceLengthDistribution === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.sequenceLengthDistribution === 'WARN'"></i>
            </td>
            <!-- 接头污染 -->
            <td :class="{'bgcolor': index % 2 === 0 ? false: true}" class="cursor-pointer" @click="imgClick('/projects/' + $store.state.projectId+ '/results/006.fastqc/' + item.fileName + '_fastqc/Images/' + 'adapter_content.png')">
              <i class="el-icon-success color-green" v-if="item.adapterContent === 'PASS'"></i>
              <i class="el-icon-error color-red" v-if="item.adapterContent === 'FAIL'"></i>
              <i class="el-icon-warning color-orange" v-if="item.adapterContent === 'WARN'"></i>
            </td>
        </tr>
      </tbody>
    </table>
    </div>
    <el-dialog
      title=""
      :visible.sync="imgDialog"
      width="100%"
      center>
      <img :src="imgSrc" alt="" class="tdImg">
    </el-dialog>
  <div class="clear"></div>
  </div>
</template>

<script>
import leftMenu from './leftMenu.vue'

export default {
  data () {
    return {
      tableData: [],
      imgDialog: false,
      imgSrc: ''
    }
  },
  components: {
    leftMenu
  },
  created () {
    this.initTable()
  },
  mounted () {
  },
  methods: {
    initTable () {
      this.axios.get('/server/fastqc?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId).then((res) => {
        this.tableData = res.data.slice(1)
      })
    },
    imgClick(imgSrc) {
      this.imgDialog = true
      this.imgSrc = imgSrc
      // this.imgSrc = 'https://colorseq.com/projects/1/results/006.fastqc/B_4.L1.2_fastqc/Images/per_tile_quality.png'
      // this.imgSrc = 'https://colorseq.com/projects/1/results/006.fastqc/Normal_1.L1.1_fastqc/Images/per_sequence_quality.png'
    },
  }
}
</script>

<style scoped="true">
.content {
  float:left;
  width: 60%;
  padding: 0 20px;
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
.tdImg {
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
}
.imgStyle {
  width: 100%;
}
.clear {
  clear: both;
}
</style>
<style media="screen">
.el-dialog--center .el-dialog__body {
  text-align: center !important;
}
</style>
