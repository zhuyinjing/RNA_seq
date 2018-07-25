<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <appLeftMenu></appLeftMenu>
    </el-aside>
    <el-main>
      <div>
        <div class="margin-top-10">
          <div class="labelStyle">
            <label for="maxpval" class="label-font">输入基因ID列表</label>
            <i class="el-icon-question label-font cursor-pointer"></i>
          </div>
          <div class="inline-block">
            <!-- <el-radio v-model="radioName" label="geneName">按 geneName 输入</el-radio> -->
            <el-radio v-model="radioName" label="geneId">按 geneId 输入</el-radio>
          </div>
        </div>
        <div class="margin-top-10" v-show="radioName === 'geneName'">
          <div class="labelStyle"></div>
          <div class="inline-block" style="width:800px;">
            <el-input
              type="textarea"
              :rows="30"
              placeholder="请输入 geneId 列表, 可以用逗号、空格或者换行符分隔"
              v-model="textareaGeneName">
            </el-input>
          </div>
          <!-- <el-button type="text">(example)</el-button> -->
        </div>
        <div class="margin-top-10" v-show="radioName === 'geneId'">
          <div class="labelStyle"></div>
          <div class="inline-block" style="width:800px;">
            <el-input
              type="textarea"
              :rows="30"
              placeholder="请输入 geneId 列表, 可以用逗号、空格或者换行符分隔"
              v-model="textareaGeneId">
            </el-input>
          </div>
          <!-- <el-button type="text">(example)</el-button> -->
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
      textareaGeneName: '',
      textareaGeneId: '',
      radioName: 'geneId',
      loading: null,
    }
  },
  components: {
    appLeftMenu
  },
  mounted () {
  },
  methods: {
    submit () {
      // 判断 基因ID列表 是否为空
      if (!this.textareaGeneId.trim()) {
        this.$message.error('请输入基因ID列表!');
        return
      }
      // 正则 替换 逗号 空格 为 换行
      this.textareaGeneId = this.textareaGeneId.replace(/(\,|\s)+/g, '\n')
      this.loading = this.$loading({
        lock: true,
        text: '文件正在上传中...请稍等...可能需要等待1分钟左右的时间...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      formData.append('genelist', this.textareaGeneId)
      this.axios.post('/server/ppi_chord_plot.app', formData).then((res) => {
        if (res.data.message_type === 'warn') {
          this.$message.error(res.data.message)
        } else {
          this.$store.commit('setppiJson', res.data.message)
          this.$router.push({'name': 'app_ppi'})
        }
        this.loading.close()
      })
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
