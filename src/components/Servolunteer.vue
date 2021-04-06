<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="志愿者" width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="200"
        align="center"
        sort
      >
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 5, 2, 1]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
         formrules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
      pubishdialogVisible: false, // 发布线索
      dialogVisible: false,
      // 线索
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
      // 线索id
      id: "",
      content: {}, // 线索内容
      form: {},
      randomReport: {},
    };
  },
  methods: {
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getpost();
    },
    handleCurrentChange(val) {
      //  console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getpost();
    },
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 获取志愿者
    getpost() {
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
            if (ele.status === 0) {
              ele.status = "未回复";
            } else if (ele.status === 1) {
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    this.getpost();
  },
};
</script>
<style lang="less" scoped>
.el-pagination {
  padding-top: 15px;
}
