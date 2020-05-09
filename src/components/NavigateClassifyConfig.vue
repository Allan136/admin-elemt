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
      style="width: calc(100% - 20px);margin: 10px;"
    >
      <el-table-column prop="nav_type_id" label="首页导航分类ID" align="center"></el-table-column>
      <el-table-column prop="nav_id" label="所属导航" align="center"></el-table-column>
      <el-table-column prop="type_name" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="type_link_url" label="导航跳转链接" align="center">
        <!-- <template slot-scope="scope">{{scope.row.show ? "显示" : '隐藏' }}</template> -->
      </el-table-column>
      <el-table-column prop="sort" label="导航排序" align="center"></el-table-column>
      <el-table-column prop="is_show" label="状态" align="center">
        <template slot-scope="scope">{{scope.row.show ? "显示" : '隐藏' }}</template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.update_time ? new Date(scope.row.update_time * 1000).Format('yyyy-MM-dd hh:mm:ss') : '-' }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" @click="editUser(scope.row)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" @click="del({'nav_type_id':scope.row.nav_type_id})">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NavigateClassifyModel
      :dialogVisible="dialogVisible"
      :flag="flag"
      @cancel="cancel"
      :rowData="ediParams"
      @update="update"
    />
  </div>
</template>


<script>
import { getNavTypeLists, delNavTypeLists } from "@/api/user";
import NavigateClassifyModel from "./NavigateClassifyModel";
export default {
  components: { NavigateClassifyModel },
  data() {
    return {
      ediParams: null,
      tableData: [],
      flag: 1, //1 添加
      loading: false,
      userData: {},
      dialogVisible: false,
      navjson: []
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
          delNavTypeLists(params).then(res => {
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
      getNavTypeLists(params).then(res => {
        this.loading = false;
        this.tableData = res.data;
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