<template>
  <div class="container">
    <el-row>
      <el-col :span="10"
        ><el-input
          placeholder="请输入搜寻志愿者相关信息"
          v-model="inputMsg"
          class="input-with-select"
          style="margin-top: 30px; width: 100%"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchResult"
          ></el-button> </el-input
      ></el-col>
    </el-row>

    <div style="height: 20px; margin-top: 10px; margin-bottom: 10px">
      搜索结果
    </div>
    <el-table :data="result" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="tel" label="电话" width="180"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 5]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
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
      volList: [],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 5,
      },
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {
      this.searchAll();
    },
    setPartner() {},
    async searchAll() {
      this.$http({
        method: "get",
        url: "/command/action/list-volunteers/" + this.actionId,
        params: {
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage,
        },
      }).then((res) => {
        console.log("查询所有");
        console.log(res);
        this.page.total = res.data.total;
        this.result = res.data.data;
      });
    },
    searchResult() {
      var _this = this;
      this.$http
        .get("/command/volunteer/search-like", {
          params: {
            name: _this.inputMsg,
            pageSize: this.page.pageSize,
            currentPage: 1,
          },
        })
        .then((res) => {
          console.log(res);
          this.page.total = res.data.total;
          this.result = res.data.data;
        });
    },
  },
  created() {
    this.actionId = this.$route.query.id;
    console.log(this.actionId);
    this.searchAll();
  },
};
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
