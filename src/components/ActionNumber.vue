<template>
  <div class="vol" id="1" @keyup.enter="show1">
    <div class="inner">
      <!-- <div class="head">
        <span>行动统计模块</span>
      </div> -->
      <div class="parent">
        <div id="chart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
// import screenfull from "screenfull"; // 引入全屏显示

export default {
  data() {
    return {
      data: {},
      act_count: [],
      act: ["未开始行动", "正在行动", "遗留行动", "已完成行动"],
      myChart: null,
    };
  },
  methods: {
    chart() {
      var myChart = echarts.init(document.getElementById("chart"));
      var option = {
        title: {
          text: "▎行动统计模块",
          left: 10,
          top: 5,
          textStyle: {
            color: "white",
          },
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: this.act,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
              formatter: function (value) {
                if (value >= 10000) {
                  return (value / 10000).toLocaleString() + "万";
                } else {
                  return value.toLocaleString();
                }
              },
            },
            data: this.act_count,
          },
        ],
        series: [
          {
            name: "个数",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "rgb(57,89,255,1)",
                  },
                  {
                    offset: 1,
                    color: "rgb(46,200,207,1)",
                  },
                ]),
              },
            },
            barWidth: 20,
            data: this.act_count,
          },
        ],
      };

      myChart.clear();
      myChart.setOption(option, true);
      this.myChart = myChart;

      // 当浏览器窗口缩小的时候）图表也等比例缩放
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      var th = this;
      document.onkeydown = function (e) {
        const key = window.event.keyCode;
        if (key === 65) {
          // document.getElementById("5").resize(function () {
          //   myChart.resize();
          // });
          setInterval(function () {
            myChart.resize();
          }, 100);

          th.$emit("hideOther", "1");
        }
      };
      window.addEventListener("click", function () {
        myChart.resize();
      });
    },
    getact() {
      this.$http({
        method: "get",
        url: "/statistic/action-count",
      }).then((res) => {
        // console.log(res.data, "行动总数");
        if (res.data.code === 200) {
          if (this.data === res.data.data) {
          } else {
            this.act_count = [];
            this.act_count.push(res.data.data[0]);
            this.act_count.push(res.data.data[1]);
            this.act_count.push(res.data.data[2]);
            this.act_count.push(res.data.data[3]);
            this.data = res.data.data;
            // console.log(this.act_count);
            this.chart();
          }
        } else if (res.data.code === 401) {
          this.$message.error("登录过期");
        } else {
          this.$message("获取行动数据失败");
        }
      });
    },
  },
  mounted() {
    var th = this;
    setTimeout(() => {
      th.getact();
    }, 0);
    setInterval(() => {
      th.getact();
    }, 10000);
    document.getElementById("1").addEventListener("click", () => {
      this.$emit("hideOther", "1");
    });
  },
};
</script>
<style lang="less" scoped>
#chart {
  height: 40vh;
  width: 100%;
}
.vol {
  box-sizing: border-box;
  top: 0;
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
.parent {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
