<template>
  <div>
    <el-row class="overview pie">
      <el-row class="piehead">
        <span>走失者年龄阶段分布</span>
      </el-row>
      <el-row>
        <el-col :span="18" class="piecol">
          <div class="chart_box">
            <div class="" id="chinesechart"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h4>{{ total }}</h4>
            <span>走失者总数</span>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  data() {
    return {
      age: {},
      total: "",
    };
  },
  mounted() {
    setInterval(this.getage(), 5000);
  },
  methods: {
    getage() {
      this.$http({
        method: "get",
        url: "/statistic/lost-age-range",
      }).then((res) => {
    //    console.log(res.data, "年龄分步");
        if (res.data.code === 200) {
          this.age = res.data.data;
     //     console.log(this.age);
          this.total = res.data.total;
          this.ageChart();
        } else {
          this.$message(res.message);
        }
      });
    },
    ageChart() {
      var myChart = echarts.init(document.getElementById("chinesechart"));

      var option = {
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            name: "年龄分布",
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            label: {
              fontsize: 10,
            },
            labelLine: {
              length: 6,
              length2: 8,
            },
            data: [
              { value: this.age[0].count, name: this.age[0].age_range },
              { value: this.age[1].count, name: this.age[1].age_range },
              { value: this.age[2].count, name: this.age[2].age_range },
              { value: this.age[3].count, name: this.age[3].age_range },
              { value: this.age[4].count, name: this.age[4].age_range },
              { value: this.age[5].count, name: this.age[5].age_range },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 为echarts对象加载数据
      myChart.clear();
      myChart.setOption(option, true);
      // 当浏览器窗口缩小的时候）图表也等比例缩放
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.overview {
  width: 100%;
  height: 100%;
  border: 15px solid transparent;
  border-width: 51 38 20 132;
  border-image-source: url(../assets/imgs/border.png);
  border-image-slice: 51 38 20 132;
  margin-top: 10px;
  background-color: #181725;
  border-color: #2c64a9;
}
.overview h4 {
  text-align: center;
  font-size: 0.35rem;
  color: #fff;
}
.overview span {
  display: block;
  font-size: 0.2rem;
  color: #4c9bfd;
  text-align: center;
}
.piehead {
  margin: 0;
}
.piehead span {
  left: 0;
  top: 0;
  float: left;
  color: #fff;
}
.chart_box {
  width: 95%;
  height: 150px;
  margin: 0 auto;
}
#chinesechart {
  width: 100%;
  height: 150px;
  margin: 0 auto;
}
</style>
