<template>
  <div class="container">
    <div>
      <div style="display: flex; justify-content: space-between">
        <el-input
          placeholder="请输入搜寻志愿者相关信息"
          v-model="inputMsg"
          class="input-with-select"
          style="margin-top: 30px; width: 30%"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchResult"
          ></el-button>
        </el-input>
        <div style="margin-top: 30px" v-if="isTeamUp">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </div>
      </div>

      <div style="height: 0px; margin-top: 10px; margin-bottom: 10px"></div>
      <el-table :data="result" fit style="width: 100%" height="326">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="tel" label="电话"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="status" label="志愿者状态"> </el-table-column>
        <el-table-column prop="teamName" label="队伍">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.teamName"
              placeholder="选择队伍"
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
      </el-table>
    </div>

    <!-- 队伍表 -->
    <div class="flex">
      <el-card
        class="box-card"
        v-for="(volunteers, team, index) in teams"
        v-bind:key="index"
      >
        <div slot="header" class="clearfix">
          <span>{{ team }}</span>
        </div>
        <div
          v-for="volunteer in volunteers"
          :key="volunteer.name"
          class="text item"
        >
          {{ volunteer.name }}
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
      teamId: "",
      result: [],
      actionId: "",
      inputMsg: "",
      volList: [],
      options: [],
      value: [],
      // 是否开启组队模式
      isTeamUp: false,
      teams: {},
      // 已经存在的队伍
      existTeam: [],
    };
  },
  methods: {
    setPartner() {},
    async searchAll() {
      const { data: res } = await this.$http.get(
        "/command/action/list-volunteers/" + this.actionId
      );
      var that = this;
      console.log("查询所有");
      console.log(res);
      this.result = [];
      res.data.forEach(function (element) {
        that.volList.push(element.name);
        // 可视化队伍
        // 将志愿者添加到队伍
        if (element.teamName in that.teams) {
          that.teams[element.teamName].push({
            name: element.name,
            id: element.id,
          });
        } else {
          if (element.teamName !== "未组队") {
            that.teams[element.teamName] = [
              {
                name: element.name,
                id: element.id,
              },
            ];
          }
        }

        // 设置状态
        if (element.status === "0") {
          element.statusText = "未回复";
        } else if (element.status === "1") {
          element.statusText = "已出动";
        } else if (element.status === "2") {
          element.statusText = "已拒绝";
        } else {
          element.statusText = "异常";
        }
        if (element.teamName === "未组队") {
          that.result.push({
            id: Number(element.id),
            name: element.name,
            tel: element.telephone,
            addr: element.residence.name,
            createTime: element.createTime,
            status: element.statusText,
          });
        } else {
          // 将队伍添加到已存在队伍，防止重复创建
          if (
            that.existTeam.indexOf(element.teamName) === -1 ||
            element.teamName !== "未组队"
          ) {
            that.existTeam.push({
              teamName: element.teamName,
              id: element.team.id,
            });
          }
          that.result.push({
            id: Number(element.id),
            name: element.name,
            tel: element.telephone,
            addr: element.residence.name,
            createTime: element.createTime,
            status: element.statusText,
            teamName: element.teamName,
          });
        }
      });
      const teamCount = Math.ceil(that.result.length / 2);
      console.log(teamCount);
      const team = [];
      for (let i = 1; i <= teamCount; i++) {
        team.push({
          value: "队伍" + i,
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
    findIndexByAttr(list, attr, value) {
      for (let i = 0; i < list.length; i++) {
        if (list[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    chooseTeam(e) {
      this.isTeamUp = true;
      // 判断志愿者是否已经在其他队伍中，如果在则移除
      for (var team in this.teams) {
        console.log(team);
        var index = this.findIndexByAttr(this.teams[team], "name", e.name);
        if (index !== -1) {
          console.log("在里面");
          console.log(this.teams);
          this.teams[team].splice(index, 1);
          console.log("修改后");
          console.log(this.teams);
          break;
        }
      }
      // 将志愿者添加到队伍
      if (e.teamName in this.teams) {
        this.teams[e.teamName].push({
          name: e.name,
          id: e.id,
        });
      } else {
        this.teams[e.teamName] = [
          {
            name: e.name,
            id: e.id,
          },
        ];
      }

      this.$forceUpdate();
      console.log(this.teams);
    },
    handleCurrentChange: function () {},
    // 创建队伍
    createTeam(teamName) {
      // 准备工作
      var volunteerIds = [];
      this.teams[teamName].forEach((element) => {
        volunteerIds.push(Number(element.id));
      });
      var _this = this;
      // 开始
      var index = this.findIndexByAttr(this.existTeam, "teamName", teamName);
      if (index === -1) {
        console.log("创建队伍:" + teamName);
        this.$http({
          url: "/command/team/",
          method: "POST",
          data: {
            name: teamName,
            actionId: this.$route.query.id,
          },
        })
          .then((res) => {
            console.log(res);
            console.log("创建队伍成功,id=" + res.data.data);
            this.isTeamUp = false;
            _this.joinTeam(res.data.data, volunteerIds);
            _this.searchAll();
          })
          .catch((err) => {
            console.log(err);
            console.log("创建队伍失败");
            this.isTeamUp = false;
            return null;
          });
      } else {
        console.log("队伍存在，直接插入");
        _this.joinTeam(this.existTeam[index].id, volunteerIds);
        this.searchAll();
      }
    },
    // 加入队伍
    joinTeam(teamId, teamList) {
      console.log("将队员加入队伍,id=" + teamId);
      this.$http({
        url: "/command/team/assign-manually/" + teamId,
        method: "POST",
        data: {
          volunteerIds: teamList,
        },
      })
        .then((res) => {
          console.log("加入成功");
          console.log(res);
        })
        .catch((err) => {
          console.log("加入成功");
          console.log(err);
        });
    },
    cancel: function () {
      this.isTeamUp = false;
      this.searchAll();
    },
    // 保存组队
    save() {
      for (var teamName in this.teams) {
        if (this.teams[teamName].length !== 0) {
          this.createTeam(teamName);
        }
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
.team_font {
  font-size: 10px;
}
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
