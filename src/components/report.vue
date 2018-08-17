<template>
<el-container style="height:calc(100% - 62px);margin-top:2px">
  <el-aside v-show="$store.state.menuShow" width="350px;" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
    <leftMenu style="margin-top:5px"></leftMenu>
  </el-aside>
  <el-main>
    <div class="">
      <imgMenuShowComp></imgMenuShowComp>

      <el-breadcrumb separator="/" style="margin:5px 0 50px 0">
        <el-breadcrumb-item>项目 {{$store.state.projectName}}</el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
      </el-breadcrumb>
      <h2>转录组测序简介</h2>
      <p>转录组测序是对样本中所有 RNA 的集合（核糖体 RNA 除外）进行高通量测序。通过转录组测序，理论上可以得到测序样本所有基因的表达水平。结合良好的实验设计，转录组测序可以较为准确的定位到与特定表型相关的基因列表，从而可以为进一步的研究提供较为明确的研究思路。</p>

      <h2>项目{{$store.state.projectName}}基本信息</h2>
      <p>物种：<span class="latinNameStyle">{{this.displayLatinName}}</span> ( {{this.displayName}} )</p>
      <p>参考基因组：{{this.genome}}</p>

      <h2>
        项目实验设计
        <!-- <el-tooltip content="生成pdf" placement="right" effect="dark">
          <i class="el-icon-printer cursor-pointer" @click="pdf()"></i>
        </el-tooltip> -->
      </h2>
      <div class="" id="canvas">
        <div class="tableStyle">
          <p class="p-font-style">实验条件一览</p>
          <table class="gridtable">
            <tr>
              <th>实验条件</th>
              <th>样本名称</th>
            </tr>
            <tr v-for="(item, value, index) in $store.state.info.experimentDesign.nameSampleMap">
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item.condition}}</td>
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item.name}}</td>
            </tr>
          </table>
        </div>
        <div class="degtable">
          <p class="p-font-style">差异表达基因比对条件</p>
          <table class="gridtable">
            <tr>
              <th>实验组</th>
              <th>对照组</th>
            </tr>
            <tr v-for="(item, index) in $store.state.info.experimentDesign.experiments">
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item._case}}</td>
              <td :class="{'bgcolor': index % 2 === 0 ? false: true}">{{item._control}}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </el-main>
</el-container>
</template>

<script>
import leftMenu from './leftMenu.vue'
import imgMenuShowComp from './imgMenuShowComp.vue'
import * as html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'

export default {
  data() {
    return {
      geneNum: null,
      transcriptNum: null,
      displayLatinName: null,
      displayName: null,
      genome: null,
      dialog: false,
    }
  },
  components: {
    leftMenu,
    imgMenuShowComp
  },
  mounted() {
    this.getValue()
  },
  methods: {
    pdf() {
      // let that = this
      // html2canvas(document.getElementById("canvas")).then(canvas => {
      //   var contentWidth = canvas.width;
      //   var contentHeight = canvas.height;
      //   //一页pdf显示html页面生成的canvas高度;
      //   var pageHeight = contentWidth / 592.28 * 841.89;
      //   //未生成pdf的html页面高度
      //   var leftHeight = contentHeight;
      //   //页面偏移
      //   var position = 0;
      //   //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      //   var imgWidth = 595.28;
      //   var imgHeight = 592.28 / contentWidth * contentHeight;
      //
      //   var pageData = canvas.toDataURL('image/jpeg', 1.0);
      //   var pdf = new jsPDF('', 'pt', 'a4');
      //
      //   //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //   //当内容未超过pdf一页显示的范围，无需分页
      //   if (leftHeight < pageHeight) {
      //     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      //   } else {
      //     while (leftHeight > 0) {
      //       pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      //       leftHeight -= pageHeight;
      //       position -= 841.89;
      //       //避免添加空白页
      //       if (leftHeight > 0) {
      //         pdf.addPage();
      //       }
      //     }
      //   }
      //
      //   pdf.save('项目实验设计.pdf');
      // });
      // html2canvas(document.body, {
      //     onrendered:function(canvas) {
      //
      //         //返回图片dataURL，参数：图片格式和清晰度(0-1)
      //         var pageData = canvas.toDataURL('image/jpeg', 1.0);
      //
      //         //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
      //         var pdf = new jsPDF('', 'pt', 'a4');
      //
      //         //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
      //         pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
      //
      //         pdf.save('stone.pdf');
      //
      //     }
      // })
      // printJS({
      //   printable: 'canvas',
      //   type: 'html',
      //   showModal: true,
      //   targetStyles: ['*']
      //  })

      var pdf = new jsPDF('p', 'pt', 'a4')
      $('#canvas').css("background", "#fff")
      pdf.addHTML($("#canvas"),{pagesplit: false, retina: true}, () => {
        pdf.internal.scaleFactor = 3.75;
        pdf.output("save", "test.pdf")
      })
    },
    getValue() {
      this.axios.get('/server/rnaseq_report_summary?username=' + this.$store.state.username + '&p=' + this.$store.state.projectId + '&speciesId=' + this.$store.state.species).then((res) => {
        if (res.data.message_type === 'success') {
          this.geneNum = res.data.rnaSeqReportSummary.geneNum
          this.transcriptNum = res.data.rnaSeqReportSummary.transcriptNum
          this.displayLatinName = res.data.speciesInfo.latinName
          this.displayName = res.data.speciesInfo.commonName
          this.genome = res.data.referenceInfo.genome
        }
      })
    },
  }
}
</script>

<style scoped="true">
.content {
  float: left;
  /* width: 60%; */
  width: calc(100% - 350px);
  padding: 0 20px;
  margin: 19px auto;
}

.p-font-style {
  /* color: #666; */
}

.cursor-pointer {
  cursor: pointer;
}

.latinNameStyle {
  font-style: italic;
}

table.gridtable {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #333333;
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

.tableStyle {
  display: inline-block;
  width: 40%;
  margin-right: 50px;
}

.degtable {
  display: inline-block;
  width: 40%;
}

.bgcolor {
  background-color: #f9f9f9 !important;
}
</style>
