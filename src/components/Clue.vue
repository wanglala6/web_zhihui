<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="volunteerName"
        label="提供人"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="randomReport.createTime"
        label="发布时间"
        width="180"
        align="center"
        sort
      >
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="线索" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row)"
            >查看</el-button
          >
        </template>
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
    <!-- 线索内容 -->

    <el-dialog
      title="线索内容"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="block" v-for="fit in content.imgs" :key="fit">
        <el-image style="width: 100px; height: 100px" :src="fit"></el-image>
      </div>
      <span>{{ content.content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
      </span>
    </el-dialog>
    <!-- 发布线索 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      // 线索
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 5,
      },
      // 线索id
      id: "",
      content: {}, // 线索内容
    };
  },
  methods: {
     handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getclue();
    },
    handleCurrentChange(val) {
      //  console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getclue();
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
    detail(row) {
      this.tableData.forEach((ele) => {
        if (ele.id === row.id) {
          this.content = ele.randomReport.content;
        }
      });
      this.dialogVisible = true;
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
    this.getclue();
  },
};
</script>
<style lang="less" scoped>
.el-pagination {
  padding-top: 15px;
}
</style>
