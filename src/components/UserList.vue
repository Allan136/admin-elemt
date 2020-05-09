<template>
  <div>
    <!-- 操作 -->
    <div class="oprate_box" style="height:60px">
      <el-input style="width:200px;margin:10px" placeholder="搜索用户名" v-model="search.user_name"></el-input>
      <el-input style="width:200px;margin:10px" placeholder="搜索登录账号" v-model="search.user_account"></el-input>
      <el-row class="oprate" style="margin: 10px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-button type="primary" icon="el-icon-search" @click="searchList()">搜索</el-button>
          <el-button @click="update()" type="warning" icon="el-icon-refresh">刷新</el-button>
          <el-button type="success" @click="addUserList()" icon="el-icon-plus">添加</el-button>
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
      <el-table-column prop="admin_user_id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="images" label="头像" width="70" align="center">
        <template slot-scope="scope">
          <img
            style="widht:40px;height:40px"
            :src="'http://ruiguo.ruiguohealth.com/api/Upload/StaticDataFile/'+scope.row.images"
          />
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="user_account" label="登录账号" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status === 1 ? '正常': '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="login_ip" label="登录IP" align="center"></el-table-column>
      <el-table-column prop="login_time" width="180" label="登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.login_time ? new Date(scope.row.login_time * 1000).Format('yyyy-MM-dd hh:mm:ss') : '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="register_ip" label="注册IP" align="center"></el-table-column>
      <el-table-column prop="create_time" width="180" label="注册时间 " align="center">
        <template slot-scope="scope">
          <span>{{new Date(scope.row.create_time * 1000).Format('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" @click="editUser(scope.row)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" @click="userDelelt({'admin_user_id':scope.row.admin_user_id})">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 30px;"
      background
      layout="prev, pager, next, jumper,sizes,total"
      :page-size="limit"
      :page-sizes="[1,10,20,50,100]"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
    <addUser
      @update="update"
      :flag="flag"
      :userData="userData"
      :dialogVisible="dialogVisible"
      @cancel="cancel"
    />
  </div>
</template>


<script>
import { userList, userDel } from "@/api/user";
import addUser from "./addUser";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      limit: 10,
      flag: 1, //1 添加
      loading: false,
      userData: {},
      dialogVisible: false,
      page: 1,
      search: {
        user_name: "",
        user_account: ""
      }
    };
  },
  components: { addUser },
  mounted() {
    this.update();
  },
  methods: {
    // beforeClose(e) {
    //   console.log(e);
    //   this.dialogVisible = false;
    // },
    addUserList() {
      this.dialogVisible = true;
      this.flag = 1;
    },
    userDelelt(params) {
      this.$confirm("删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userDel(params).then(res => {
            this.update();
            console.log(res);
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
      this.flag = 2;
      this.dialogVisible = true;
      this.userData = params;
      // userEdit(params).then(res => {
      //   this.userData = res.data;
      //   this.dialogVisible = true;
      //   console.log(res);
      // });
    },
    searchList() {
      this.update({
        user_name: this.search.user_name,
        user_account: this.search.user_account
      });
    },
    currentChange(page) {
      this.page = page;
      this.update({ page, limit: this.limit });
    },
    sizeChange(limit) {
      this.limit = limit;
      this.update({ limit, page: 1 });
    },
    cancel(bool) {
      this.dialogVisible = bool;
    },
    update(params) {
      this.loading = true;
      userList(params).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.total;
        this.$message({
          message: res.msg
        });
      });
    }
  }
};
</script>

<style lang='scss'>
.oprate_box {
  position: relative;
  margin: 10px;
  height: 58px;
  background: #f4f4f5;
  .oprate {
    position: absolute;
    top: 0px;
    // right: 80px; */
    left: 450px;
  }
}
.el-pagination {
  .el-pagination__jump {
    margin: 0 10px;
  }
}
</style>