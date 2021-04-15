<template>
  <div class="post_container">
    <h1>出动信息汇总</h1>
    <el-table :data="table_content" style="width: 100%">
      <el-table-column prop="date" label="时间" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="tel" label="电话"> </el-table-column>
      <el-table-column prop="trans" label="交通工具"> </el-table-column>
      <el-table-column prop="equip" label="装备"> </el-table-column>
    </el-table>
    <h1>志愿者报备位置</h1>
    <div class="position_map">
      <VolPositionMap></VolPositionMap>
    </div>
  </div>
</template>
<script>
import VolPositionMap from "@/components/VolPositionMap";
export default {
  components: { VolPositionMap },
  data() {
    return {
      table_content: [],
      content_list: "",
      formrules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
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
    };
  },
  methods: {
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getpost();
    },
    handleCurrentChange(val) {
      //  console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getpost();
    },
    getpost() {
      var _this = this;
      this.$http
        .get("/command/start_report/by-action/" + this.$route.query.id)
        .then((res) => {
          console.log("获取出发报备成功!");
          console.log(res);
          const list = [];
          res.data.data.forEach((element) => {
            _this.table_content.push({
              date: element.createTime,
              name: element.volunteer.name,
              tel: element.volunteer.telephone,
              trans: element.transportMode,
              equip: element.equipment,
            });
            console.log(_this.table_content);
          });
          _this.content_list = list;
          console.log(list);
        })
        .catch((err) => {
          console.log("获取出发报备失败!");
          console.log(err);
        });
    },
    detail(row) {
      this.tableData.forEach((ele) => {
        if (ele.id === row.id) {
          this.content = ele.content;
        }
      });
      this.dialogVisible = true;
    },
    publishdia(row) {
      console.log(row);
      this.randomReport.actionId = row.actionId;
      this.randomReport.content = row.content;
      this.randomReport.createTime = row.createTime;
      this.randomReport.forbidden = row.forbidden;
      this.randomReport.id = row.id;
      this.randomReport.locationId = row.locationId;
      this.randomReport.updateTime = row.updateTime;
      this.randomReport.volunteerId = row.volunteerId;

      this.pubishdialogVisible = true;
    },
    publish() {
      this.$refs.formref.validate((valid) => {
        // eslint-disable-next-line no-useless-return
        if (!valid) return;
        this.$http({
          methods: "post",
          url: "/command/clue/",
          data: {
            actionId: this.$route.query.id,
            randomReport: this.randomReport,
            title: this.form.title,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success("线索发布成功");

            this.getpost();
            this.publishdia = false;
          } else {
            this.$message("线索发布失败");
          }
        });
      });
    },
  },
  created() {
    this.getpost();
  },
};
</script>
<style lang="less" scoped>
.position_map {
  height: 50%;
  width: 100%;
  border: 1px solid #dedede;
  border-radius: 5px;
}
//.name_box {
//  margin-top:1%;
//  font-size:7px;
//}
//.card_left {
//  text-align: center;
//}
//.avatar {
//  margin-top:10px;
//  height: 50px;
//  width: 50px;
//  border: 1px solid #ddd;
//}
//.card_box{
//  margin-left: 5%;
//  margin-right: 10%;
//  height: 70px;
//  width: 80%;
//  border: 1px solid;
//  border-radius:5px;
//}
.post_container {
  margin: 15px;
}
.el-pagination {
  padding-top: 15px;
}
</style>
