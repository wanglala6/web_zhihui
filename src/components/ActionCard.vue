<template>
  <div class="action">
    <div
      class="action-img"
      v-bind:class="{ 'action-img-hover': isHover }"
      @mouseenter="showBotton"
      @mouseleave="hideBotton"
      @click="jump(action)"
    >
      <img
        :class="{ 'action-img-hover': isHover }"
        style="width: 100%; height: 100%"
        :src="action.lost.avatar"
      />
      <div class="action-img-botton" v-if="isHover">
        <div class="action-img-title">{{ action.lost.name }}</div>
        <div class="action-img-btn">
          <el-button
            @click="del(action)"
            size="mini"
            class="del-btn"
            v-if="action.status == 0"
            >删除</el-button
          >
          <el-button @click="editdia(action)" size="mini" class="edit-btn"
            >修改</el-button
          >
        </div>
      </div>
    </div>
    <div class="action_head">
      <div class="action_head_name">{{ action.name }}</div>
      <div class="action_head_lost">
        <i class="el-icon-user-solid"></i>
        <span style="font-weight: bold; margin-left: 3px"
          >走失者: {{ action.lost.name }}</span
        >
      </div>
      <div class="action_head_commaner">
        <i class="el-icon-s-custom"></i>
        指挥员: {{ action.commander.name }}
      </div>
      <div class="flex action_head_time">
        <div>
          <i class="el-icon-time"></i>
        </div>
        <div style="margin-left: 3px">{{ action.createTime }}</div>
      </div>
    </div>

    <!-- 修改名字 -->
    <el-dialog :visible.sync="diaedit" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="text-align:center" label-width="45%">
          <el-button @click="edit" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHover: true,
      diaedit: false,
      form: {
        name: "",
        id: "",
      },
    };
  },
  props: ["action"],
  methods: {
    showBotton: function () {
      this.isHover = false;
    },
    hideBotton: function () {
      this.isHover = false;
    },
    del(row) {
      this.$http({
        methods: "delete",
        url: "/command/action/" + row.id,
      }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.getunactionlist();
        } else {
          this.$message("删除失败");
        }
      });
    },
    editdia(row) {
      this.diaedit = true;
      this.form.name = row.name;
      this.form.id = row.id;
    },
    edit() {
      const a = JSON.stringify({
        name: this.form.name,
      });
      this.$http({
        method: "put",
        url: "/command/action/" + this.form.id,
        data: a,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改成功");
          this.getunactionlist();
          this.diaedit = false;
        } else {
          this.$message("修改失败");
        }
      });
    },
    jump(item) {
      console.log(this.$route.query.commanderId);

      console.log("mmm", item.lostId);
      this.$router.push({
        path: "/elderMsg",
        query: {
          lostId: item.lostId,
          commanderId: this.$route.query.commanderId,
          id: item.id,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.action {
  height: 250px;
  width: 200px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
  border-radius: 5px;
}

.action:hover {
  box-shadow: 2px 2px 3px #e2e2e2;
}

.action_head {
  height: 100px;
  text-align: left;
  padding-left: 10px;
  background-color: #ffffff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.action-img {
  width: 100%;
  height: 150px;
  position: relative;
  border-radius: 5px;
}

.action-img-hover {
  background: #2b2b27;
}

.action-img img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.action-img-title {
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 45px;
}

.action-img-btn {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.action-img-hover {
  opacity: 0.6;
  filter: alpha(opacity=60);
}

.action-img-botton {
  position: absolute;
  left: 50%;
  top: 20%;
  width: 150px;
  margin-left: -75px;
}

.del-btn,
.edit-btn {
  background-color: #000;
  opacity: 0.6;
  color: #fff;
}

.action_head_name {
  font-size: 17px;
  letter-spacing: 2px;
  padding-top: 5px;
  font-weight: bold;
  padding-bottom: 5px;
}

.action_head_commaner {
  font-size: 13.5px;
  color: #999999;
  margin-bottom: 2px;
}

.action_head_lost {
  font-size: 13.5px;
  color: #999999;
}

.img {
  height: 150px;
  width: 200px;
}

.action_head_time {
  font-size: 12px;
  margin-top: 10px;
  position: relative;
}

.flex {
  display: flex;
}
</style>
