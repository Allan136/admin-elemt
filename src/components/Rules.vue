<template>
  <div>
    <!-- 操作 -->
    <div class="oprate_box" style="height:60px">
      <el-row class="oprate1" style="margin: 10px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-button @click="update()" type="warning" icon="el-icon-refresh">刷新</el-button>
          <el-button type="success" @click="add()" icon="el-icon-plus">添加</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      row-key="menu_id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: calc(100% - 20px);margin: 10px;"
    >
      <el-table-column prop="title" label="名称" align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center"></el-table-column>
      <el-table-column prop="routerName" label="标识" align="center"></el-table-column>
      <el-table-column prop="show" label="状态" align="center">
        <template slot-scope="scope">{{scope.row.show ? "显示" : '隐藏' }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" @click="editUser(scope.row)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" @click="del({'menu_id':scope.row.menu_id})">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <manage
      :dialogVisible="dialogVisible"
      :flag="flag"
      @cancel="cancel"
      :rowData="ediParams"
      @update="update"
    />
  </div>
</template>


<script>
import { getlists, delMenu } from "@/api/user";
import manage from "./manage";
export default {
  components: { manage },
  data() {
    return {
      ediParams: null,
      tableData: [],
      flag: 1, //1 添加
      loading: false,
      userData: {},
      dialogVisible: false
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    cancel(bool) {
      this.dialogVisible = bool;
    },
    add() {
      this.flag = 1;
      this.dialogVisible = true;
    },
    del(params) {
      this.$confirm("删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delMenu(params).then(res => {
            this.update();
            this.$message({
              message: res.msg
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editUser(params) {
      this.flag = 0;
      this.dialogVisible = true;
      this.ediParams = params;
    },
    update(params) {
      this.loading = true;
      getlists(params).then(res => {
        this.loading = false;
        this.tableData = res.lists;
        this.$emit("update");
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.oprate_box {
  position: relative;
  margin: 10px;
  height: 58px;
  background: #f4f4f5;
  .oprate1 {
    position: absolute;
    top: 0px;
    // right: 80px; */
    // left: 450px;
  }
}
.el-pagination {
  .el-pagination__jump {
    margin: 0 10px;
  }
}
</style>