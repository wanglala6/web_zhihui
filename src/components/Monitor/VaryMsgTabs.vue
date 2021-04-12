<template>
  <div class="msg-container">
    <el-tabs type="border-card">
      <el-tab-pane label="出动情况">
        <VolStatus></VolStatus>
      </el-tab-pane>
      <el-tab-pane label="最新线索">
        <ClueNewest></ClueNewest>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VolStatus from "@/components/Monitor/VolStatusTb";
import ClueNewest from "@/components/Monitor/ClueNewest";

export default {
  name: "VaryMsgTabs",
  components: { ClueNewest, VolStatus },
};
</script>

<style scoped>
.msg_container {
  height: 300px;
}

.el-tabs {
  padding: 0;
  margin-top: 20px;
  box-shadow: 0 0 0;
  border: none;
}
</style>
