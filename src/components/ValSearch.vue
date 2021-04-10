<template>
  <div class="container">

    <el-input placeholder="请输入搜寻志愿者相关信息" v-model="inputMsg" class="input-with-select" style="margin-top:30px;width: 100%">
      <el-button slot="append" icon="el-icon-search" @click="searchResult"></el-button>
    </el-input>
    <div style="height:20px;margin-top:10px;margin-bottom:10px;">搜索结果</div>
    <el-table
      :data="result"
      style="width: 100%"
      border>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
            <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ValSearch",
  data() {
    return {
      result: [],
      actionId: "",
      inputMsg: "",
    }
  },
  methods: {
    async searchAll() {
      const { data: res } = await this.$http.get("/command/action/list-volunteers/" + this.actionId)
      const that = this;
      console.log("查询所有")
      console.log(res)
      res.data.forEach(function (element) {
        that.result.push({
          name: element.name,
          tel: element.telephone,
          addr: element.residence.name,
          createTime: element.createTime
        })
      })
    },
    searchResult() {
    var _this = this
      this.$http.get(
        "/command/volunteer/search-like",
        {
          params: {
            name: _this.inputMsg
          }
        }
      ).then((res) => {
        console.log(res)
        _this.result = []
        res.data.data.forEach(function (element) {
        _this.result.push({
            name: element.name,
            tel: element.telephone,
            addr: element.residence.name
          })
        })
      })
    }
  },
  created() {
    this.actionId = this.$route.query.id;
    console.log(this.actionId)
    this.searchAll()
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
  width: 90%;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
}
</style>
