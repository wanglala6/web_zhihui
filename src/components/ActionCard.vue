<template>
  <div class="action">
    <div class="action-img" @mouseenter="showBotton" @mouseleave="hideBotton">
      <img style="width: 100%; height: 100%" :src="action.lost.avatar" />
      <div class="action-img-botton" v-if="isHover">
        <el-button @click="del(item)" size="mini" class="del_btn"
          >删除</el-button
        >
        <el-button @click="editdia(item)" size="mini" class="edltbtn"
          >修改</el-button
        >
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
  </div>
</template>
<script>
export default {
  data() {
    return {
        isHover: false
    };
  },
  props: ["action"],
  methods: {
    showBotton: function () {
        this.isHover = true;
    },
    hideBotton: function () {
        this.isHover = false;
    }
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
}

.action-img-hover {
  background: #000;
}

.action-img img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.action-img img:hover {
  opacity: 0.6;
  filter: alpha(opacity=60);
}

.action-img-botton {
  position: absolute;
  left: 20%;
  top: 50%;
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
