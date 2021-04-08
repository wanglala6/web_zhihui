<template>
  <div>
    <el-main class="bgc">
      <clue></clue>
      <post></post>
      <volunteer-status></volunteer-status>
    </el-main>
  </div>
</template>
<script>
import VolunteerStatus from "@/components/VolunteerStatus";
import Clue from "@/components/Clue.vue";
import Post from "@/components/Post.vue";
export default {
  components: {
    "volunteer-status": VolunteerStatus,
    clue: Clue,
    post: Post,
  },
};
</script>
<style lang="less" scoped>
.bgc {
  background-color: #b4c7d0 !important;
}
</style>
