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
          <el-col :span="8">
            <span class="head"> 蓝天救援队指挥中心</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="20">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="正在行动" name="first">
                <div class="activity" v-for="item in activity" :key="item.id">
                  <div class="img">
                    <a @click="jump">
                      <img
                        src="../assets/logo.jpg"
                        style="height: 100%; width: 100%"
                      />
                    </a>
                  </div>
                  <div class="activity_head">
                    <h3>{{ item.head }}</h3>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="已完成行动" name="second"
                >配置管理</el-tab-pane
              >
              <el-tab-pane label="遗留行动" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="adddialogVisible = true"
              >创建活动</el-button
            >
          </el-col>
          <!-- 创建活动对话框 -->

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
              <el-form-item label="走失人员" prop="missname">
                <el-input v-model="addForm.missname"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input-number
                  v-model="addForm.age"
                  :min="60"
                  :max="200"
                  label="描述文字"
                ></el-input-number>
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
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    var checkage = (rule, age, cb) => {
      // 验证年纪的正则
      if (age >= 60) {
        return cb();
      }
      cb(new Error("年龄必须大于60岁"));
    };
    return {
      activeName: "second",
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
        missname: [
          {
            required: true,
            message: "请输入走失人员",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入走失人员年龄",
            trigger: "blur",
          },
          {
            validator: checkage,
          },
        ],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    jump() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less" scoped>
.el-header {
  height: 100px !important;
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
  height: 200px;
  width: 200px;
  margin: 10px;
  float: left;
  background: #f3f3f3;
}
.img {
  height: 150px;
  width: 200px;
}
.activity_head {
  text-align: center;
}
</style>
