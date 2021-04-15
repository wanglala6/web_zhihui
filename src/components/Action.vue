<template>
  <div>
    <el-row class="nav">
      <el-col :span="20">
        <el-tabs v-model="tab_active_value" @tab-click="handleClick">
          <el-tab-pane label="正在进行" name="inAction"></el-tab-pane>
          <el-tab-pane label="尚未开始" name="unAction"></el-tab-pane>
          <el-tab-pane label="已遗留" name="achivedAction"></el-tab-pane>
          <el-tab-pane label="已完成" name="finishAction"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="dialog">创建行动</el-button>
      </el-col>
    </el-row>
    <div class="Inaction_container">
      <router-view></router-view>
    </div>
    <!-- 创建活动对话框 -->

    <el-dialog title="创建活动" :visible.sync="adddialogVisible" width="30%">
      <!-- 内容主体区 -->
      <el-form
        :model="addForm"
        :rules="addrules"
        ref="addFormref"
        label-width="150px"
      >
        <el-form-item label="请选择走失者" prop="lostId">
          <el-select v-model="addForm.lostId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入活动名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab_active_value: "inAction",
      adddialogVisible: false,
      // 添加活动
      addForm: {},
      addrules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        lostId: [
          {
            required: true,
            message: "请选择走失者",
            trigger: "blur",
          },
        ],
      },
      options: [],
      commanderId: "",
    };
  },
  methods: {
    async getActionList() {
      const { data: res } = await this.$http({
        method: "get",
        url: "/command/action/search-like",
        params: this.queryInfo,
      });
      if (res.code === 200) this.actionList = res.data;
      console.log(res.data);
    },
    getunactionlist() {
      this.$http({
        method: "get",
        url: "/command/action/search-like",
        params: this.queryInfo,
      }).then((res) => {
        console.log(res);
        this.unactionList = res.data.data;
      });
    },
    // 点击切换tab
    handleClick: function (e) {
      if (e.name === "inAction") {
        this.$router.push({
          path: "/inAction",
          query: {
            commanderId: this.$route.query.commanderId,
            id: this.$route.query,
          },
        });
      } else if (e.name === "unAction") {
        this.$router.push({
          path: "/unAction",
          query: {
            commanderId: this.$route.query.commanderId,
          },
        });
      } else if (e.name === "achivedAction") {
        this.$router.push({
          path: "/achivedAction",
          query: {
            commanderId: this.$route.query.commanderId,
          },
        });
      } else if (e.name === "finishAction") {
        this.$router.push({
          path: "/finishAction",
          query: {
            commanderId: this.$route.query.commanderId,
          },
        });
      }
    },
    dialog() {
      // 查询走失者未行动
      this.$http.get("/command/lost/not-actioned").then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.options = res.data.data;
          console.log(this.options);
        } else {
          this.$message("走失者加载失败");
        }
      });
      this.adddialogVisible = true;
    },
    // 创建活动
    upload() {
      var _this = this
      this.$refs.addFormref.validate((valid) => {
        console.log(_this.commanderId)
        if (!valid) return;
        this.$http
          .post(
            "/command/action/",
            JSON.stringify({
              lostId: parseInt(this.addForm.lostId),
              name: this.addForm.name,
              commanderId: _this.commanderId,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              this.$message.success("创建活动成功");
              _this.getunactionlist();
              _this.getActionList();
              _this.adddialogVisible = false;
              this.$refs.addFormref.resetFields();
              // this.$router.push({
              //   path: "/unaction",
              //   query: { commanderId: _this.commanderId },
              // });
              this.$router.go(0)
            } else {
              this.$message("创建活动失败");
            }
          });
      });
    },
  },
  created() {
    this.commanderId = this.$route.query.commanderId
  }
};
</script>
<style lang="less" scoped>
.inaction_container {
}
</style>
