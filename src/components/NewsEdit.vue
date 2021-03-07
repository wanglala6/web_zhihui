<template>
  <div>
    <el-input
      type="textarea"
      autosize
      placeholder="请输入标题"
      v-model="newsForm.title">
    </el-input>
    <div style="margin: 10px 0;"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 10}"
      placeholder="请输入内容"
      v-model="newsForm.content">
    </el-input>
    <div class="block" style="margin-top: 10px">
      <!--      <span class="demonstration" style="font-size: 12px">发送人</span>-->
      <el-cascader
        placeholder="请选择发送人，可搜索人名"
        v-model="newsForm.cityCode"
        :options="options"
        :props="props"
        size="medium"
        clearable
        @change="changeProblemType"
        filterable>
      </el-cascader>
    </div>
    <el-button type="primary" style="display:block; margin:20px auto;" @click = "commit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: "NewsEdit",
  data() {
    return {
      newsForm: {
        title: "",
        content: "",
        cityCode: [] // 提交的数据
      },
      // title: '',
      // content: '',
      // cityCode: [],
      areaOptions: [], // 显示的数据
      selectAllData: [],
      selectStates: 0, //  是否全选过
      options: [
        {
          value: 1,
          label: '圆圆'
        },
        {
          value: 2,
          label: '张三'
        },
        {
          value: 3,
          label: '兮兮'
        },
        {
          value: 4,
          label: '南岸'
        },
      ],
      props: {
        multiple: true,
      },
    }
  },
  methods: {
    commit() {
      console.log(this.newsForm)
    },
    add() {
      const selectAllOpt = {
        value: 0,
        label: '全选',
      }
      this.options.unshift(selectAllOpt);
      console.log(this.options)
    },
    changeProblemType(value) {
      console.log("点了")
      // console.log(this.cityCode)
      console.log(value)
      if (value.length === 0) {
        return false
      }
      if (this.selectStates === 1 && value[0][0] === 0) {
        this.selectStates = 0
        this.newsForm.cityCode = this.newsForm.cityCode.slice(1)
        return false;
      }
      //  思路：点击全选，判断是传入的值是否包含了“全选”的code
      for (let v = 0; v < value.length; v++) {
        if (value[v][0] === 0) { // 如果传入的值包含了全选，也就是用户希望全选
          this.newsForm.cityCode = this.handleSelectAllCity();// 如果包含，将城市数据，赋值给要提交给接口的cityCode
          this.selectStates = 1 // 改变状态，设置已经全选
          console.log(this.cityCode)
          return false
        }
        //  如果已经有了全选（this.selectStates==1表示已经处于全选状态），再次点击要置空也就是取消全选
        if (this.selectStates === 1) {
          this.newsForm.cityCode = [];
          this.selectStates = 0;
          return false
        } else { //  不是全选状态 ，正常点击城市
          this.newsForm.cityCode = value
        }
      }
    },
    handleSelectAllCity() {
      this.selectAllData = []
      for (let k = 0; k < this.options.length; k++) {
        const arr = [this.options[k].value]
        this.selectAllData.push(arr)
      }
      return this.selectAllData;
    }
  },
  mounted() {
    this.add()
  },
}
</script>

<style scoped>

</style>
