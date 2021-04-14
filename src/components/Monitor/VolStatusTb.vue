<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="200px"
      highlight-current-row
      size="small"
      :row-class-name="tableRowClassName"
    >
      <el-table-column fixed prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="status" label="队伍"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "VolStatus",
  data() {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 9999,
        total: 0
      },
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 获取志愿者出动情况
    getVolunteerStatus() {
      this.$http({
        methods: "get",
        url: "/command/action/list-volunteers/" + this.$route.query.id,
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          this.page.total = res.data.total;
          this.tableData.forEach((ele) => {
            if (ele.status === "0") {
              ele.status = "未回复";
            } else if (ele.status === "1") {
              ele.status = "出动";
            } else {
              ele.status = "拒绝";
            }
          });
        } else {
          this.$message("数据获取失败");
        }
      });
    },
  },
  created() {
    this.getVolunteerStatus()
  }
};
</script>
.el-table .warning-row {
background: oldlace;
}

.el-table .success-row {
background: #f0f9eb;
}
<style scoped>
</style>
