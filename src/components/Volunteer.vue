<template>
  <div>
    <div style="margin: 15px 0; width: 100%">
      <el-input
        placeholder="请输入姓名"
        v-model="keyword"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="serch"
        ></el-button>
      </el-input>
      <el-button type="info" plain style="margin-left: 15px" @click="add"
        >添加志愿者</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="志愿者" width="140" align="center">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话"
        width="180"
        align="center"
        sort
      >
      </el-table-column>
      <el-table-column
        prop="residence.name"
        label="地址"
        width="280"
        align="center"
        sort
      >
      </el-table-column>

      <el-table-column
        prop="account"
        label="账户"
        width="150"
        align="center"
        sort
      >
      </el-table-column>

      <el-table-column
        prop="forbidden"
        label="账户状态"
        width="100"
        align="center"
      >
      </el-table-column>

      <el-table-column label="操作" width="160" align="center">
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
    <!-- 修改志愿者 -->
    <el-dialog :visible.sync="diaedit" width="40%">
      <el-form :v-model="vol" label-width="80px">
        <el-form-item label="账户" prop="account">
          <el-input v-model="vol.account"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="vol.qq"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="vol.telephone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="常住地址" prop="residence">
          <el-input v-show="vol.residence"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="editaffirm">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加志愿者 -->
    <el-dialog :visible.sync="diaadd" width="30%">
      <el-form
        :model="newvol"
        label-width="100px"
        ref="addref"
        :rules="addrules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="newvol.name" class="wid"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="newvol.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账户" prop="account">
          <el-input v-model="newvol.account" class="wid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="newvol.password"
            class="wid"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="newvol.qq" class="wid"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="newvol.telephone" class="wid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addaffirm">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
    <!-- <el-dialog>

    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      commanderId: "",
      diaadd: false,
      newvol: {},
      vol: {},
      diaedit: false,
      addrules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        qq: [{ required: true, message: "请输入qq", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        password: [{ required: true, message: "请选择密码", trigger: "blur" }],
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
      vol2: {},
    };
  },
  methods: {
    addaffirm() {
      this.$refs.addref.validate((valid) => {
        if (!valid) return;

        this.$http({
          method: "post",
          url: "/command/volunteer/",
          data: JSON.stringify(this.newvol),
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success("添加成功");
            this.getvol();
            this.diaadd = false;
          } else if (res.data.code === 401) {
            this.$message.console.error("登录过期");
          } else {
            this.$message("添加失败");
          }
        });
      });
    },
    add() {
      this.diaadd = true;
    },
    edit(row) {
      this.vol = row;
      this.vol2 = row;
      this.diaedit = true;
    },
    editaffirm() {
      if (this.vol2.forbidden === "正常") {
        this.vol2.forbidden = false;
      } else {
        this.vol2.forbidden = true;
      }
      this.$http({
        method: "put",
        url: "/command/volunteer/" + this.vol.id,
        data: JSON.stringify(this.vol2),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.$message.success("修改成功");
          this.getvol();
          this.diaedit = false;
        } else if (res.data.code === 401) {
          this.$message.console.error("登录过期");
        } else {
          this.$message(res.data.message);
        }
      });
    },
    serch() {
      this.$http({
        method: "get",
        url: "/phone/volunteer/search-like",
        params: {
          name: this.keyword,
          pageSize: this.page.pageSize,
          currentPage: this.page.currentPage,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          this.page.total = res.data.total;
          this.tableData.forEach((ele) => {
            if (ele.forbidden === false) {
              ele.forbidden = "正常";
            } else {
              ele.forbidden = "冻结";
            }
          });
        } else if (res.data.code === 401) {
          this.$message.console.error("登录过期");
        } else {
          this.$message("查询失败");
        }
      });
    },
    del(row) {
      this.$http({
        method: "delete",
        url: "/phone/volunteer/" + row.id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.getvol();
        } else if (res.data.code === 401) {
          this.$message.console.error("登录过期");
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
            if (ele.forbidden === false) {
              ele.forbidden = "正常";
            } else {
              ele.forbidden = "冻结";
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
    console.log(this.commanderId, "志愿者");
    this.commanderId = this.$route.query.commanderId;
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
.wid {
  width: 75%;
}
</style>
