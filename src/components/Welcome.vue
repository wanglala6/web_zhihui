<template>
  <div class="bgc">
    <el-container>
      <el-header>
        <el-row :gutter="100">
          <el-col :span="6">
            <div style="width: 80px; height: 80px; border-radius: 50%">
              <img
                src="../assets/logo.jpg"
                style="height: 100%; width: 100%; border-radius: 50%"
              />
            </div>
          </el-col>
          <el-col :span="12">
            <span class="head" style="text-align: center; color: #ffffff"
              >蓝天救援队指挥中心</span
            >
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row class="nav">
          <el-col :span="22" style="margin-top: 20px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="正在行动" name="first">
                <div class="activity" v-for="item in actionList" :key="item.id">
                  <div class="img">
                    <a @click="jump(item.lostId)">
                      <img
                        src="../assets/logo.jpg"
                        style="height: 100%; width: 100%"
                      />
                    </a>
                  </div>
                  <div class="activity_head">
                    <p>{{ item.name }}</p>
                    <p>指挥员: {{ item.commander.name }}</p>
                    <p>创建时间: {{ item.createTime }}</p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已完成行动" name="second"
                >配置管理</el-tab-pane
              >
              <el-tab-pane label="遗留行动" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="2" style="margin-top: 20px">
            <el-button type="primary" @click="adddialogVisible = true"
              >创建行动</el-button
            >
          </el-col>
          <!-- 创建活动对话框 -->
        </el-row>
        <el-dialog
          title="创建活动"
          :visible.sync="adddialogVisible"
          width="30%"
        >
          <!-- 内容主体区 -->
          <el-form
            :model="addForm"
            :rules="addrules"
            ref="addFormref"
            label-width="100px"
          >
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="走失人员" prop="person">
              <el-select
                v-model="value"
                filterable
                placeholder="请选择走失人员"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="行动级别" prop="level">
              <!--                     <el-input-number v-model="addForm.age"  :min="60" :max="200" label="描述文字"></el-input-number>-->
              <span> 一级 （建议立即创建行动）</span>
            </el-form-item>
            <el-form-item label="上传老人照片">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <!-- 底部区 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="adddialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        currentPage: 1,
        pageSize: 5,
      },
      options: [
        {
          value: 1,
          label: "张三",
        },
        {
          value: 2,
          label: "李四",
        },
        {
          value: 3,
          label: "王二",
        },
      ],
      value: "",
      activeName: "second",
      actionList: [],
      activity: [
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
        {
          src: "../assets/logo.jpg",
          head: "拯救80岁高龄老人",
        },
      ],
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
        person: [
          {
            required: true,
            message: "请输入走失人员",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
            message: "级别",
            trigger: "blur",
          },
        ],
      },
      imageUrl: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    jump(id) {
      console.log("mmm" + id);
      this.$router.push({ name: "/home", params: { id: id } });
    },
    async getActionList() {
      const { data: res } = await this.$http.get(
        "command/action/",
        this.queryInfo
      );
      if (res.code === 200) this.actionList = res.data;
      console.log(res.data);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  // async mounted () {
  //   const { data: res } = await this.$http.post('command/action', this.loginform)
  //   console.log(res)
  // }
  created() {
    this.getActionList();
  },
};
</script>
<style lang="less" scoped>
.el-header {
  height: 100px !important;
  background-color: #373d41;
}
.bgc {
  height: 100%;
  width: 100%;
  background-color: #f6f8fa;
}
.el-container {
  height: 100%;

  margin: 0 220px;
  background-color: #fff;
}
.head {
  line-height: 100px;
  font-size: 25px;
  letter-spacing: 2px;
}
.activity {
  height: 300px;
  width: 200px;
  margin: 10px;
  float: left;
  background: #f3f3f3;
}
.img {
  height: 150px;
  width: 200px;
}
//.activity_head {
//  text-align: center;
//}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
