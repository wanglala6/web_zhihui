<template>
  <div class="clue_container">
    <div v-for="clue in tableData" :key="clue.id">
      <p class="clue_content">{{clue.volunteer.name}}:{{clue.content.content}}</p>
      <hr style="color: #b8b8b7" />
    </div>
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
.clue_container {
  height: 180px;
}
.clue_content {
  font-size: 6px;
}
</style>
