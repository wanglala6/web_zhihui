<template>
  <div class="clue_container">
    <div v-if="tableData.length !== 0">
      <el-link type="primary" @click="goto_detail" class="link_style"
        >查看详情</el-link
      >
      <el-timeline :reverse="false" class="timeline">
        <el-timeline-item
          v-for="clue in tableData"
          :key="clue.id"
          :timestamp="clue.createTime"
        >
          <p class="clue_content">
            {{ clue.volunteer.name }}:{{ clue.content.content }}
          </p>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="without-clue" v-if="tableData.length === 0">暂无线索</div>
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
      tableData: [],
    };
  },
  methods: {
    goto_detail() {
      var id = this.$route.query.id;
      var lostId = this.$route.query.lostId;
      this.$router.push({
        path: "/clue",
        query: { id: id, lostId: lostId },
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
    var _this = this;
    setInterval(_this.getclue(), 3000);
  },
};
</script>

<style scoped>
.link_style {
  position: absolute;
  font-size: 10px;
  right: 20px;
}
.timeline {
  padding: 20px;
}
.clue_container {
  height: 100%;
}
.clue_content {
  font-size: 6px;
}

.without-clue {
  text-align: center;
  line-height: 180px;
  color: #909399;
}
</style>
