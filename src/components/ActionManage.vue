<template>
  <div class="container">
    <div class="action-status">
      <el-steps :active="action.process" align-center>
        <el-step
          title="提交老人信息"
          description="走失者家属上传信息"
        ></el-step>
        <el-step
          title="行动创建"
          description="指派指挥员执行任务并征集志愿者"
        ></el-step>
        <el-step
          title="搜寻老人"
          description="志愿者开始配合搜索走失者"
        ></el-step>
        <el-step
          title="行动结束"
          description="找到走失者或行动时间超过72小时"
        ></el-step>
      </el-steps>
    </div>

    <el-row class="action-info-wrapper">
      <el-col :span="6" class="action-info">
        <div class="action-info-label">行动名称</div>
        <div class="action-info-value">{{ action.name }}</div>
      </el-col>
      <el-col :span="6" class="action-info">
        <div class="action-info-label">参与人数</div>
        <div class="action-info-value">{{ action.volunteerCount }}</div>
      </el-col>
      <el-col :span="6" class="action-info">
        <div class="action-info-label">行动时长</div>
        <div class="action-info-value">{{ action.time }}</div>
      </el-col>
      <el-col :span="6" class="action-info">
        <div class="action-info-label">行动状态</div>
        <div class="action-info-value">{{ action.statusText }}</div>
      </el-col>
    </el-row>

    <div class="action-change-wrapper">
      <el-row class="action-change" v-if="action.process != 4">
        <el-col :span="12">
          <el-button type="success" @click="findLostDialogFormVisible = true"
            >确认找到老人</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-button
            type="danger"
            @click="archiveActionDialogFormVisible = true"
            >确认遗留行动</el-button
          >
        </el-col>
      </el-row>
      <!-- 找到老人的情况 -->
      <el-row class="action-change" v-if="action.status == '3'">
        <el-col :span="24">
          <div class="action-success">
            <i class="el-icon-success"></i>
            恭喜！成功找到走失者，感谢你付出！一切都是值得的！
          </div>
        </el-col>
      </el-row>
      <!-- 找不到老人的情况 -->
      <el-row class="action-change" v-if="action.status == '2'">
        <el-col :span="24">
          <div class="action-fail">
            <i class="el-icon-chat-dot-round"></i>
            没关系！已经尽力了，下次一定可以的！
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 找到老人对话框 -->
    <el-dialog
      title="确定找到走失者了吗？"
      :visible.sync="findLostDialogFormVisible"
      center
      style="font-weight: bold"
    >
      <el-form :model="form">
        <el-form-item label="信息记录">
          <el-input
            v-model="form.msg"
            type="textarea"
            placeholder="记录在何时何地找到了走失者"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="findLostDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureFindLost">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="确定遗留行动吗？"
      :visible.sync="archiveActionDialogFormVisible"
      center
      style="font-weight: bold"
    >
      <el-form :model="form">
        <el-form-item label="信息记录">
          <el-input
            v-model="form.msg"
            type="textarea"
            placeholder="记录行动遗留原因"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="archiveActionDialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="sureAchiveAction">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ActionManage",
  data() {
    return {
      form: {
        msg: "",
      },
      findLostDialogFormVisible: false,
      archiveActionDialogFormVisible: false,
      action: {},
      timer: "", // 定时器
      beginTime: "",
    };
  },
  methods: {
    getActionStatus() {
      this.$http.get("/command/action/" + this.$route.query.id).then((res) => {
        console.log(res);
        var data = res.data.data;
        this.action = data;
        // 设置行动状态
        if (data.status === "1") {
          this.action.statusText = "进行中";
          this.action.process = 3;
        } else if (data.status === "2") {
          this.action.statusText = "被遗留";
          this.action.process = 4;
        } else if (data.status === "3") {
          this.action.statusText = "已找到";
          this.action.process = 4;
        }
        //   console.log(data.createTime, "time");
        // 设置时间
        this.beginTime = new Date(data.createTime);
        //  this.get_time_diff(new Date(data.createTime)),
        var _this = this;
        if (data.finishTime) {
          this.getTimeStamp(new Date(data.finishTime))
        } else {
          this.timer = setInterval(() => {
            _this.get_time_diff(new Date(this.beginTime));
          }, 1000);
        }

        // 设置志愿者人数
        this.$http
          .get("/command/action/list-volunteers/" + this.$route.query.id)
          .then((res) => {
            console.log(res);
            this.action.volunteerCount = res.data.data.length;
          });
      });
    },
    // 获取时间差
    get_time_diff(dateBegin) {
      var dateEnd = new Date();
      var dateDiff = dateEnd.getTime() - dateBegin.getTime();
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
      var leave1 = dateDiff % (24 * 3600 * 1000);
      var hours = Math.floor(leave1 / (3600 * 1000));
      var leave2 = leave1 % (3600 * 1000);
      var minutes = Math.floor(leave2 / (60 * 1000));
      var leave3 = leave2 % (60 * 1000);
      var seconds = Math.round(leave3 / 1000);
      // console.log(
      //   " 相差 " +
      //     dayDiff +
      //     "天 " +
      //     hours +
      //     "小时 " +
      //     minutes +
      //     " 分钟" +
      //     seconds +
      //     " 秒"
      // );
      this.action.time =
        dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
      this.$forceUpdate();
    },
    // 活动时长
    getTimeStamp(finish) {
      var dateDiff = finish.getTime() - this.beginTime.getTime();
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
      var leave1 = dateDiff % (24 * 3600 * 1000);
      var hours = Math.floor(leave1 / (3600 * 1000));
      var leave2 = leave1 % (3600 * 1000);
      var minutes = Math.floor(leave2 / (60 * 1000));
      var leave3 = leave2 % (60 * 1000);
      var seconds = Math.round(leave3 / 1000);
         this.action.time =
        dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    },
    sureFindLost() {
      var _this = this;
      // 发送请求
      this.$http({
        url: "/command/action/found/" + this.$route.query.id,
        method: "PUT",
        data: {
          msg: _this.form.msg,
        },
      })
        .then((res) => {
          console.log(res);
          this.$message.success("成功找到老人！已通知所有队员。");
          this.getActionStatus();
        })
        .catch((err) => {
          console.log(err);
          this.$message.fail("出错了！");
        });
      // 关闭dialog
      this.findLostDialogFormVisible = false;
    },
    sureAchiveAction: function () {
      var _this = this;
      // 发送请求
      this.$http({
        url: "/command/action/remain/" + this.$route.query.id,
        method: "PUT",
        data: {
          msg: _this.form.msg,
        },
      })
        .then((res) => {
          console.log(res);
          this.$message.success("已遗留行动");
          this.getActionStatus();
        })
        .catch((err) => {
          console.log(err);
          this.$message.fail("出错了！");
        });
      // 关闭dialog
      this.archiveActionDialogFormVisible = false;
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  created() {},
  mounted() {
    this.getActionStatus();
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 26px;
}

.action-info-wrapper {
  width: 80%;
  margin: 20px auto;
}

.action-info {
  text-align: center;
  margin-top: 30px;
}

.action-info-label {
  font-weight: bold;
  font-size: 22px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.action-change-wrapper {
  margin-top: 60px;
}

.action-change {
  width: 50%;
  margin: 30px auto;
  text-align: center;
}

.action-success {
  text-align: center;
  color: #67c23a;
  font-size: 22px;
}

.action-fail {
  text-align: center;
  color: red;
  font-size: 22px;
}
</style>
