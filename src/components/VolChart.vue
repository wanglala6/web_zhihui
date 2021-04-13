<template>
  <div>
    <div class="inner">
      <el-row class="head">
        <span>志愿者统计模块</span>
      </el-row>
      <el-row>
        <el-col :span="18">
          <div class="chart"></div>
        </el-col>
        <el-col :span="6" class="data">
          <h4>志愿者总数</h4>
          <span>{{ total }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      volname: [],
      volcnt: [],
      total: "",
    };
  },
  methods: {
    to() {
      this.$http({
        method: "get",
        url: "/statistic/volunteer-count",
      }).then((res) => {
       // console.log(res.data, "志愿者总数");
        if (res.data.code === 200) {
          this.total = res.data.data.total;
        } else {
          this.$message(res.data.message);
        }
      });
    },
    getvol() {
      this.$http({
        method: "get",
        url: "/statistic/action-volunteer-count",
      }).then((res) => {
        console.log(res.data, "meige志愿者总数");
        if (res.data.code === 200) {
          res.data.data.forEach((element) => {
            this.volname.push(element.name);
            this.volcnt.push(element.volunteerCount);
          });
          console.log(this.volname);
          this.chart();
        } else {
          this.$message(res.message);
        }
      });
    },
    chart() {
      var myChart = echarts.init(document.querySelector(".chart"));
      var option = {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#00fffb" },
          { offset: 1, color: "#0061ce" },
        ]),
        tooltip: {
          trigger: "item",
        },
        grid: {
          left: "0%",
          right: "3%",
          bottom: "3%",
          top: "3%",
          containLabel: true,
          show: true,
          borderColor: "rgba(0,240,255,0.3)",
        },
        xAxis: [
          {
            type: "category",
            data: this.volname,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              color: "#4c9bfd",
            },
            axisLine: {
              lineStyle: {
                color: "rgba(0,240,255,0.3)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              alignWithLabel: false,
            },
            axisLabel: {
              color: "#4c9bfd",
            },
            axisLine: {
              lineStyle: {
                color: "rgba(0,240,255,0.3)",
              },
            },
            // y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: "rgba(0,240,255,0.3)",
              },
            },
          },
        ],
        series: [
          {
            name: "志愿者数量",
            type: "bar",
            barWidth: "60%",
            data: this.volcnt,
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
  mounted() {
    setInterval(this.getvol(), 2000);
  },
  created() {
    this.to();
  },
};
</script>
<style lang="less" scoped>
* {
  color: #fff;
}
.inner {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 15px solid transparent;
  border-width: 51 38 20 132;
  border-image-source: url(../assets/imgs/border.png);
  border-image-slice: 51 38 20 132;
  margin-top: 10px;
}
.chart {
  width: 100%;
  height: 200px;
}
.data {
  display: inline-block;
  margin-top: 50px;
  box-sizing: border-box;
  background-image: url(../assets/imgs/rect.png);
  background-size: cover;
}
.data span {
  display: block;
  color: #4c9bfd;
  font-size: 12px;
  text-align: center;
}
</style>
