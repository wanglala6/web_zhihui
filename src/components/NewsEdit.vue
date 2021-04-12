<template>
  <div class="newsEdit_container">
    <el-row>
      <!--    <el-col :span="5"></el-col>-->
      <el-col :span="20" :offset="2" class="edit_content">
        <el-row>
          <el-col :span="12"><h1>发送通知</h1></el-col>
          <el-col :span="12"><p class="goto_notice_label" @click="goto_history">已发通知</p></el-col>
        </el-row>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入标题"
          v-model="title">
        </el-input>
        <el-select v-model="type" placeholder="请选择通知类型" class="select_box">
          <el-option
            v-for="item in type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div style="margin: 10px 0;"></div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10}"
          placeholder="请输入内容"
          v-model="content">
        </el-input>
        <div class="block" style="margin-top: 10px">
          <!--      <span class="demonstration" style="font-size: 12px">发送人</span>-->
          <el-cascader
            placeholder="请选择发送人，可搜索人名"
            v-model="receiveId"
            :options="options"
            :props="props"
            size="medium"
            clearable
            @change="changeProblemType"
            filterable>
          </el-cascader>
        </div>
        <el-button type="primary" style="display:block; margin:20px auto;" @click="send_notice">提交</el-button>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NewsEdit",
  data() {
    return {
      title: '',
      actionId: '',
      content: '',
      receiveId: [],
      areaOptions: [], // 显示的数据
      selectAllData: [],
      selectStates: 0, //  是否全选过
      type_options: [],
      type: '',
      options: [],
      props: {
        multiple: true,
      },
    }
  },
  methods: {
    goto_history() {
      var id = this.actionId
      this.$router.push({
        path: "/news",
        query: { actionId: id, type: "通知" }
      });
    },
    async getTypeList() {
      const { data: res } = await this.$http.get("/command/notice/types")
      var that = this
      Object.keys(res.data[0]).forEach(function (element) {
        that.type_options.push({
          label: res.data[0][element],
          value: element
        })
      })
    },
    async getVolunteer() {
      const { data: res } = await this.$http.get("/command/action/list-volunteers/" + this.actionId)
      const that = this;
      res.data.forEach(function (element) {
        that.options.push({
          label: element.name,
          value: element.id
        })
      })
    },
    add() {
      const selectAllOpt = {
        value: 0,
        label: '全选',
      }
      this.options.unshift(selectAllOpt);
      console.log(this.options)
    },
    changeProblemType(value) {
      console.log("点了")
      // console.log(this.cityCode)
      console.log(value)
      console.log("选择了:" + this.receiveId)
      if (value.length === 0) {
        return false
      }
      if (this.selectStates === 1 && value[0][0] === 0) {
        this.selectStates = 0
        this.receiveId = this.receiveId.slice(1)
        return false;
      }
      //  思路：点击全选，判断是传入的值是否包含了“全选”的code
      for (let v = 0; v < value.length; v++) {
        if (value[v][0] === 0) { // 如果传入的值包含了全选，也就是用户希望全选
          this.receiveId = this.handleSelectAllCity();// 如果包含，将城市数据，赋值给要提交给接口的cityCode
          this.selectStates = 1 // 改变状态，设置已经全选
          console.log(this.receiveId)
          return false
        }
        //  如果已经有了全选（this.selectStates==1表示已经处于全选状态），再次点击要置空也就是取消全选
        if (this.selectStates === 1) {
          this.receiveId = [];
          this.selectStates = 0;
          return false
        } else { //  不是全选状态 ，正常点击城市
          this.receiveId = value
        }
      }
    },
    handleSelectAllCity() {
      this.selectAllData = []
      for (let k = 0; k < this.options.length; k++) {
        const arr = [this.options[k].value]
        this.selectAllData.push(arr)
      }
      return this.selectAllData;
    },
    send_notice() {
      const receiveId = []
      this.receiveId.forEach((element) => {
        receiveId.push(element[0])
      })
      var body = {
        actionId: this.actionId,
        content: {
          content: this.content
        },
        receiveId: receiveId,
        title: this.title,
        type: this.type
      }
      const that = this
      this.$http.post("/command/notice/", body).then((res) => {
        that.title = ""
        that.content = ""
        that.type = ""
        that.receiveId = ""
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.add()
  },
  created() {
    this.actionId = this.$route.query.actionId;
    this.getTypeList()
    this.getVolunteer()
  }
}
</script>

<style scoped>
.goto_notice_label{
  /*display: flex;*/
  color:#409eff;
  text-align: right;
}
.select_box{
  /*font-family: cursive !important;*/
}
.edit_content{
  border-radius: 5px;
  padding: 20px;
  box-shadow: 1px 1px 2px #ededed;
  background-color: #fff;
  height: 100%;
}
.newsEdit_container {
  padding: 15px;
  margin-top: 5%;
}
.el-select {
  margin-top: 10px;
}
</style>
