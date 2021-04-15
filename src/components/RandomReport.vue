<template>
  <div class="clue_container">
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
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="volunteer.name"
        label="提供人"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间"
        width="180"
        align="center"
        sort
      >
      </el-table-column>
      <el-table-column prop="content.content" label="内容" align="center">
      </el-table-column>
      <el-table-column prop="imgs" label="图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px; margin-left:5px;"
            v-for="item in scope.row.content.imgs"
            :src="item"
            :key="item"
            :preview-src-list="scope.row.content.imgs">
          </el-image>
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
import { devServer } from "../../vue.config";
export default {
  name: "RandomReport",
  data() {
    return {
      tmp: "",
      clue_msg: {},
      keyword: "",
      dialogVisible: false,
      // 线索
      tableData: [],
      page: {
        currentPage: 1,
        pageSize: 999,
      },
      // 线索id
      id: "",
      content: {}, // 线索内容
    };
  },
  methods: {
    serch() {
      this.$http({
        methods: "get",
        url: "/command/clue/search-like",
        params: {
          actionId: this.$route.query.id,
          primaryKeyVal: this.keyword,
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
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getclue();
    },
    handleCurrentChange(val) {
      //  console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      if (this.keyword === "") {
        this.getclue();
      } else {
        this.serch();
      }
    },
    getclue() {
      this.$http({
        methods: "get",
        url: "/command/random_report/msg/by-action/" + this.$route.query.actionId,
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          var _this = this;
          this.tableData = []
          this.page.total = res.data.total;
          const tmp = res.data.data;
          tmp.forEach((ele) => {
            _this.tmp = []
            ele.content.imgs.forEach((e) => {
              _this.tmp.push(devServer.proxy["/"].target + e)
            })
            ele.content.imgs = _this.tmp
            this.tableData.push(ele)
          })
        } else {
          this.$message("数据获取失败");
        }
      });
    },
    detail(row) {
      this.tableData.forEach((ele) => {
        if (ele.id === row.id) {
          this.content = ele.content;
        }
      });
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {
        });
    },
  },
  created() {
    this.getclue();
  },
};
</script>
<style lang="less" scoped>
.clue_container {
  padding: 15px;
}

.el-pagination {
  padding-top: 15px;
}

.input-with-select {
  width: 40%;
}
</style>
