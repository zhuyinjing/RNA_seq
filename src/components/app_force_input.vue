<template>
  <el-container style="height:calc(100% - 62px);margin-top:2px">
    <el-aside v-show="$store.state.appmenuShow" style="width:300px;height:100%;border-right:1px solid #e6e6e6">
      <appLeftMenu></appLeftMenu>
    </el-aside>
    <el-main>
      <appImgMenuShowComp></appImgMenuShowComp>

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
            <label class="label-font">选择物种</label>
          </div>
          <div class="inline-block" style="width:300px;">
            <el-select class="input-style" v-model="specie" placeholder="请选择">
              <el-option :value="key" v-for="(item, key) in speciesArr" :key="key">{{key}}</el-option>
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
import appImgMenuShowComp from './appImgMenuShowComp.vue'

export default {
  data () {
    return {
      textareaMatrix: '',
      loading: null,
      specie: 'Human (Homo sapiens)',
      speciesArr:{
        'Human (Homo sapiens)': 9606,
        'Soybean (Clycine max)': 3847,
      },
    }
  },
  components: {
    appLeftMenu,
    appImgMenuShowComp
  },
  created () {
  },
  mounted () {
  },
  methods: {
    submit () {
      // 判断 基因 ID 列表 是否为空
      if (!this.textareaMatrix.trim()) {
        this.$message.error('请输入基因 ID 列表!')
        return
      }
      this.textareaMatrix = this.textareaMatrix.replace(/(\,|\s)+/g, '\n')
      this.loading = this.$loading({
        lock: true,
        text: '列表正在处理中...请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('username', this.$store.state.username)
      this.axios.post('/server/upload_heatmap_by_project', formData).then((res) => {
        if (res.data.message_type === 'success') {
          this.$message.success('热图生成完成!')
          this.$store.commit('setheatmapJson', res.data.message)
          this.$router.push({'name': 'app_force'})
        } else {
          this.$message.error(res.data.message)
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
</style>
