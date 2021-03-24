<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据查询</el-breadcrumb-item>
      <el-breadcrumb-item>志愿者查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入搜寻志愿者相关信息" v-model="input3" class="input-with-select" style="margin-top:20px;">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ValSearch",
  data() {
    return {}
  },
  methods: {
    search() {
      this.$router.push('/home/ValSearch/ValMsg')
    }
  }
}
</script>

<style scoped>

</style>
