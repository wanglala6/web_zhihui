<template>
  <div class="container">
    <div>
      <el-input
        placeholder="请输入搜寻志愿者相关信息"
        v-model="inputMsg"
        class="input-with-select"
        style="margin-top: 30px; width: 100%"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchResult"
        ></el-button>
      </el-input>
      <div style="height: 0px; margin-top: 10px; margin-bottom: 10px"></div>
      <el-table :data="result" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="tel" label="电话" width="180"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="status" label="志愿者状态"> </el-table-column>
        <el-table-column prop="partner" label="队伍">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.value"
              placeholder="请选择类型"
              filterable
              default-first-option
              @change="chooseTeam(scope.row)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot="header">
            <el-switch v-model="isTeamUp" active-text="组队模式"> </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        class="pagination"
      >
      </el-pagination>
    </div>

    <!-- 队伍表 -->
    <div class="flex">
      <el-card
        class="box-card"
        v-for="(volunteers, team, index) in teams"
        v-bind:key="index"
      >
        <div slot="header" class="clearfix">
          <span>队伍{{ team }}</span>
        </div>
        <div v-for="volunteer in volunteers" :key="volunteer" class="text item">
          {{ volunteer }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "VolManage",
  data() {
    return {
      result: [],
      actionId: "",
      inputMsg: "",
      volList: [],
      options: [],
      value: [],
      // 是否开启组队模式
      isTeamUp: false,
      teams: {},
    };
  },
  methods: {
    setPartner() {},
    async searchAll() {
      const { data: res } = await this.$http.get(
        "/command/action/list-volunteers/" + this.actionId
      );
      const that = this;
      console.log("查询所有");
      console.log(res);
      res.data.forEach(function (element) {
        that.volList.push(element.name);
        that.result.push({
          name: element.name,
          tel: element.telephone,
          addr: element.residence.name,
          createTime: element.createTime,
        });
      });
      const teamCount = Math.ceil(that.result.length / 2);
      console.log(teamCount);
      const team = [];
      for (let i = 1; i <= teamCount; i++) {
        team.push({
          value: i,
          label: "队伍" + i,
        });
      }
      that.options = team;
    },
    searchResult() {
      var _this = this;
      this.$http
        .get("/command/volunteer/search-like", {
          params: {
            name: _this.inputMsg,
          },
        })
        .then((res) => {
          console.log(res);
          _this.result = [];
          res.data.data.forEach(function (element) {
            _this.result.push({
              name: element.name,
              tel: element.telephone,
              addr: element.residence.name,
            });
          });
        });
    },
    chooseTeam(e) {
      for (var team in this.teams) {
        if (this.teams[team].indexOf(e.name) !== -1) {
          const index = this.teams[team].indexOf(e.name);
          this.teams[team] = this.teams[team].splice(index, 1);
          break;
        }
      }
      if (e.value in this.teams) {
        this.teams[e.value].push(e.name);
      } else {
        this.teams[e.value] = [e.name];
      }
    },
  },
  created() {
    this.actionId = this.$route.query.id;
    console.log(this.actionId);
    this.searchAll();
  },
};
</script>

<style scoped>
.container {
  background-color: #ffffff;
  width: 90%;
  height: 100%;
  padding-left: 5%;
  padding-right: 5%;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.box-card {
  width: 150px;
  height: 150px;
  margin-top: 20px;
  margin-right: 20px;
}

.flex {
  display: flex;
}
</style>
