<template>
  <div>
    <div style="margin: 15px 0; width: 100%">
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="serch"
        ></el-button>
      </el-input>
     <el-button type="info" plain style="margin-left: 15px;">添加志愿者</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="志愿者" width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话"
        width="200"
        align="center"
        sort
      >
      </el-table-column>
      <el-table-column
        prop="residence.name"
        label="地址"
        width="300"
        align="center"
        sort
      >
      </el-table-column>

        <el-table-column
        prop="residence.latitude"
        label="纬度"
        width="100"
        align="center"
        sort
      >
      </el-table-column>

           <el-table-column
        prop="residence.longitude"
        label="纬度"
        width="100"
        align="center"
        sort
      >
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
      keyword: "",
    };
  },
  methods: {
    edit(row) {},
    serch() {},
    del(row) {
      this.$http({
        method: "delete",
        url: "/phone/volunteer/" + row.id,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.$message.success("删除成功");
        } else {
          this.$message("删除失败");
        }
      });
    },
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getvol();
    },
    handleCurrentChange(val) {
      //  console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getvol();
    },
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 获取志愿者
    getvol() {
      this.$http({
        method: "get",
        url: "/command/volunteer/",
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
    this.getvol();
  },
};
</script>
<style lang="less" scoped>
.el-pagination {
  padding-top: 15px;
}
.input-with-select {
  width: 40%;
}
</style>
