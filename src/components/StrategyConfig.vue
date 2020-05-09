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
      
      <el-table-column prop="title" width="180" label="攻略标题" align="center"></el-table-column>
      <el-table-column prop="source" width="180" label="攻略来源" align="center"></el-table-column>
      <el-table-column prop="seo_keywords" width="180" label="SEO关键字" align="center"></el-table-column>
      <el-table-column prop="seo_description" width="180" label="SEO描述" align="center">
        <!-- <template slot-scope="scope">{{scope.row.show ? "显示" : '隐藏' }}</template> -->
      </el-table-column>
      <el-table-column prop="author" width="180" label="攻略作者" align="center"></el-table-column>
      <el-table-column prop="read" width="180" label="阅读量" align="center"></el-table-column>
      <el-table-column prop="nav_type_id" width="180" label="分类ID" align="center"></el-table-column>
      <el-table-column prop="sort" width="180" label="排序" align="center"></el-table-column>
      <el-table-column prop="status" width="180" label="攻略状态" align="center">
        <template slot-scope="scope">{{scope.row.status == 1 ? "未审核" : '已审核' }}</template>
      </el-table-column>
      <el-table-column prop="image_url" width="180" label="攻略缩略图" align="center"></el-table-column>
      <!--
      <el-table-column
        style="overflow:hidden;height:80px"
        prop="content"
        width="180"
        label="攻略详情"
        align="center"
      ></el-table-column>
      -->
      <el-table-column prop="update_time" width="180" label="更新时间" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.update_time ? new Date(scope.row.update_time * 1000).Format('yyyy-MM-dd hh:mm:ss') : '-' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="文章详情" placement="top">
            <el-button type="primary" @click="details(scope.row)">
              <i class="el-icon-details"></i>
            </el-button>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" @click="editUser(scope.row)">
              <i class="el-icon-edit-outline"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" @click="del({'strategy_id':scope.row.strategy_id})">
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
  </div>
</template>


<script>
import { getStrategy, delStrategy } from "@/api/user";
import StrategyModel from "./StrategyModel";
export default {
  components: { StrategyModel },
  data() {
    return {
      ediParams: {},
      tableData: [],
      flag: 1, //1 添加
      total: 0,
      limit: 10,
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
    details(params) {},
    add() {
      this.flag = 1;
      this.$emit("getEditParams", false);

      //   this.$parent.menuURL.push(this.$route);
      //   //   this.dialogVisible = true;
      //   this.$parent.menuList.push("创建文章");
      //   this.$parent.tabIndex = this.$parent.menuList.length - 1;
      //   this.$parent.childrenName = "createExample";
      //   this.$router.push({ name: "createExample" });
    },
    currentChange(page) {
      this.page = page;
      this.update({ page, limit: this.limit });
    },
    sizeChange(limit) {
      this.limit = limit;
      this.update({ limit, page: 1 });
    },
    del(params) {
      this.$confirm("删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delStrategy(params).then(res => {
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
      //   this.flag = 0;
      this.ediParams = params;
      //   this.$parent.menuList.push("创建文章");
      //   this.$parent.tabIndex = this.$parent.menuList.length - 1;
      //   this.$parent.childrenName = "createExample";
      //   this.$router.push({ name: "createExample" });
      this.$emit("getEditParams", true, this.ediParams);
    },
    update(params) {
      this.loading = true;
      getStrategy(params).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.total;
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