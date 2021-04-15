<template>
  <div>
    <VolPositionMap :height="mapHeight"></VolPositionMap>
  </div>
</template>

<script>
import VolPositionMap from "@/components/VolPositionMap";
export default {
  name: "MapSearch",
  components: { VolPositionMap },
  data() {
    return {
      mapHeight: document.body.clientHeight - 60 + "px",
    }
  }
}
</script>

<style scoped>

</style>
