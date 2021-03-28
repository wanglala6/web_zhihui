<template>
  <div>
    <div class="down_menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card v-for="item in notice_list" v-bind:key="item.id">
              <div class="notice">
                <el-avatar class="notice-left" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <div class="notice-right">
                  <div class="notice-right-top">{{item.volunteer.name}}</div>
                  <div class="notice-right-down">{{ item.msg }}</div>
                </div>
              </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: [],
      notice_list: [],
      actionId: ""
    }
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get("/phone/identify/by-action/" + this.actionId)
      console.log(res)
      var list = []
      res.data.forEach((element) => {
        if (element.similarity !== 0) {
          element.msg = "进行了一次在线识别，成功匹配，准确度为" + element.similarity + "%"
        } else {
          element.msg = "进行了一次在线识别，未找到匹配人脸"
        }
        list.push(element)
      })
      this.notice_list = list
    }
  },
  created() {
    this.actionId = this.$route.query.actionId;
    this.getData()
  }
}
</script>

<style scoped>
.block{
  margin-top:20px;
}
.notice {
  display: flex;
}

.notice-left {
  /*margin-top: 5px;*/
}

.notice-right {
  margin-left: 10px;
}

.notice-right-top {
  height: 15px;
  font-size: small;
  color: #b8b8b7;
  line-height: 20px
}

.notice-right-down {
  height: 20px;
  font-weight: bold;
  line-height: 30px
}
.down_menu{
  position:absolute;
  right:5%;
  top: 10%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
