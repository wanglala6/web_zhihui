<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="200px"
      highlight-current-row
      size="small"
      :row-class-name="tableRowClassName">
      <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
            <el-table-column
        prop="status"
        label="队伍">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "VolStatus",
  data() {
    return {
      tableData: [{
        name: '王小虎',
        tel: '1213131412',
        status: '已出动'
      }, {
        name: '王小虎',
        tel: '1213131412',
        status: '已出动'
      }, {
        name: '王小虎',
        tel: '1213131412',
        status: '已出动'
      }, {
        name: '王小虎',
        tel: '1213131412',
        status: '已出动'
      }, {
        name: '王小虎',
        tel: '1213131412',
        status: '已出动'
      }, {
        name: '王小虎',
        tel: '1213131412',
        status: '已出动'
      }, {
        name: '王小虎',
        tel: '1213131412',
        status: '已出动'
      }]
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },
}
</script>
.el-table .warning-row {
background: oldlace;
}

.el-table .success-row {
background: #f0f9eb;
}
<style scoped>
</style>
