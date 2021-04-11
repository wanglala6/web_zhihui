<template>
  <div class="container">
    <div class="action-status">
      <el-steps :active="2" align-center>
        <el-step title="提交老人信息" description="走失者家属上传信息"></el-step>
        <el-step title="行动创建" description="指派指挥员执行任务并征集志愿者"></el-step>
        <el-step title="搜寻老人" description="志愿者开始配合搜索走失者"></el-step>
        <el-step title="行动结束" description="找到走失者或行动时间超过72小时"></el-step>
      </el-steps>
    </div>

    <el-row class="action-info-wrapper">
      <el-col :span="6" class="action-info">
        <div class="action-info-label">行动名称</div>
        <div class="action-info-value">归家行动1</div>
      </el-col>
      <el-col :span="6" class="action-info">
        <div class="action-info-label">参与人数</div>
        <div class="action-info-value">18</div>
      </el-col>
      <el-col :span="6" class="action-info">
        <div class="action-info-label">行动时长</div>
        <div class="action-info-value">120小时</div>
      </el-col>
      <el-col :span="6" class="action-info">
        <div class="action-info-label">行动状态</div>
        <div class="action-info-value">进行中</div>
      </el-col>
    </el-row>

    <div class="action-change-wrapper">
      <el-row class="action-change">
        <el-col :span="12">
          <el-button type="success">确认找到老人</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="danger">确认遗留行动</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionManage"
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 26px;
}

.action-info-wrapper {
  width: 80%;
  margin: 20px auto;
}

.action-info {
  text-align: center;
  margin-top: 30px;
}

.action-info-label {
  font-weight: bold;
  font-size: 22px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.action-change-wrapper {
  margin-top: 60px;
}

.action-change {
  width: 50%;
  margin: 30px auto;
  text-align: center;
}

</style>
