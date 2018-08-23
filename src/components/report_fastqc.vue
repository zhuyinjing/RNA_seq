<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <leftMenu style="margin-top:5px"></leftMenu>
    </el-aside>
    <el-main>
      <div class="">
        <imgMenuShowComp></imgMenuShowComp>

        <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
          <el-breadcrumb-item :to="{ path: 'report' }">{{$t('report.project')}} {{$store.state.projectName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{$t('leftMenu.fastqc')}}</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>{{$t('fastqc.title')}}</h2>
        <table class="gridtable">
          <thead>
            <tr>
              <th>{{$t('fastqc.filename')}}</th>
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  {{$t('fastqc.basic_statistics_paragraph1')}} <br>
                  {{$t('fastqc.basic_statistics_paragraph2')}} <br>
                  {{$t('fastqc.basic_statistics_paragraph3')}} <br>
                  {{$t('fastqc.basic_statistics_paragraph4')}} <br>
                </div>
                <th>{{$t('fastqc.basic_statistics')}}</th>
              </el-tooltip>
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  {{$t('fastqc.base_quality_paragraph1')}}<br>
                  {{$t('fastqc.base_quality_paragraph2')}}<br>
                  {{$t('fastqc.base_quality_paragraph3')}}<br>
                  {{$t('fastqc.base_quality_paragraph4')}}<br>
                  {{$t('fastqc.base_quality_paragraph5')}}<br>
                </div>
                <th>{{$t('fastqc.base_quality')}}</th>
              </el-tooltip>
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  {{$t('fastqc.per_quality_paragraph1')}}<br>
                  {{$t('fastqc.per_quality_paragraph2')}}<br>
                  {{$t('fastqc.per_quality_paragraph3')}}<br>
                  {{$t('fastqc.per_quality_paragraph4')}}<br>
                  {{$t('fastqc.per_quality_paragraph5')}}<br>
                </div>
                <th>{{$t('fastqc.per_quality')}}</th>
              </el-tooltip>
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  {{$t('fastqc.sequence_quality_paragraph1')}}<br>
                  {{$t('fastqc.sequence_quality_paragraph2')}}<br>
                  {{$t('fastqc.sequence_quality_paragraph3')}}<br>
                  {{$t('fastqc.sequence_quality_paragraph4')}}<br>
                </div>
                <th>{{$t('fastqc.sequence_quality')}}</th>
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
    </el-main>
  </el-container>
</template>

<script>
import leftMenu from './leftMenu.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'

export default {
  data () {
    return {
      tableData: [],
      imgDialog: false,
      imgSrc: ''
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
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
    },
  }
}
</script>

<style scoped="true">
.content {
  float:left;
  /* width: 60%; */
  width: calc(100% - 350px);
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
