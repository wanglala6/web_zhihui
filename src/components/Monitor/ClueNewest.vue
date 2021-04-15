<template>
  <div class="clue_container">
    <el-link type="primary" @click="goto_detail" class="link_style">查看详情</el-link>
      <el-timeline :reverse="false" class="timeline">
        <el-timeline-item
          v-for="clue in tableData"
          :key="clue.id"
          :timestamp="clue.createTime">
          <p class="clue_content">{{clue.volunteer.name}}:{{clue.content.content}}</p>
        </el-timeline-item>
      </el-timeline>
  </div>
</template>

<script>
export default {
  name: "ClueNewest",
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 9999,
        total: 0,
      },
      tableData: []
    };
  },
  methods: {
    goto_detail() {
      var id = this.$route.query.id
      var lostId = this.$route.query.lostId
      this.$router.push({
        path: "/clue",
        query: { id: id, lostId: lostId }
      });
    },
    getclue() {
      this.$http({
        methods: "get",
        url: "/command/clue/by-action/" + this.$route.query.id,
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          this.page.total = res.data.total;
        } else {
          this.$message("数据获取失败");
        }
      });
    },
  },
  created() {
    this.getclue();
  },
};
</script>

<style scoped>
.link_style{
  position: absolute;
  /*margin-bottom: 0px;*/
  font-size: 10px;
  right: 20px;
}
.timeline{
  padding: 20px;
}
.clue_container {
  height: 180px;
}
.clue_content {
  font-size: 6px;
}
</style>
