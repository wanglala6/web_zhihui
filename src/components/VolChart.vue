<template>
  <div class="vol">
    <div class="inner" id="5">
      <!-- <el-row class="head">
        <span>志愿者统计模块</span>
      </el-row> -->
      <el-row style="height: 100%">
        <el-col :span="24" style="height: 100%">
          <div class="col_chart">
            <div class="chart"></div>
          </div>
        </el-col>
        <!-- <el-col :span="6" class="data">
          <div>
            <h4>志愿者总数</h4>
            <span>{{ total }}</span>
          </div>
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
// import screenfull from "screenfull"; // 引入全屏显示
export default {
  data() {
    return {
      volname: [],
      volcnt: [],
      total: "",
      data: [],
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
          if (this.data === res.data.data) {
          } else {
            this.volname = [];
            this.volcnt = [];
            res.data.data.forEach((element) => {
              this.volname.push(element.name);
              this.volcnt.push(element.volunteerCount);
            });
            console.log(this.volname);
            this.chart();
            this.data = res.data.data;
          }
        } else if (res.data.code === 401) {
          this.$message.console.error("登录过期");
        } else {
          this.$message(res.message);
        }
      });
    },
    chart() {
      var myChart = echarts.init(document.querySelector(".chart"));
      var option = {
        title: {
          text: "▎志愿者统计模块",
          left: 10,
          top: 5,
          textStyle: {
            color: "white",
          },
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#00fffb" },
          { offset: 1, color: "#0061ce" },
        ]),
        tooltip: {
          trigger: "item",
        },
        grid: {
          left: "8%",
          right: "3%",
          bottom: "3%",
          top: "10%",
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
    setInterval(() => {
      this.getvol();
    }, 10000);
    this.getvol();
    const element = document.getElementById("5");
    document.getElementById("5").addEventListener("click", () => {
      if (screenfull.isEnabled) {
        screenfull.request(element); // 元素全屏
      }
    });
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
.vol {
  padding: 1rem;
  padding-top: 0;
}
.inner:hover {
  background-color: #181725;
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
.col_chart {
  height: 100%;
  display: flex;
  align-items: center;
}
.chart {
  width: 100%;
  height: 54vh;
}
.data {
  box-sizing: border-box;
  background-image: url(../assets/imgs/rect.png);
  background-size: 100% 100%;
}
.data span {
  display: block;
  color: #4c9bfd;
  font-size: 12px;
  text-align: center;
}
</style>
