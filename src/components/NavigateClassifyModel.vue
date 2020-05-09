<template>
  <div class="add_uers">
    <el-dialog
      :title="flag ? '添加' : '编辑'"
      :show-close="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div>
        <ul>
          <li>
            <label>所属导航</label>
            <el-cascader
              v-model="nav_id"
              :options="navjson"
              :props="props_pid"
              placeholder="请选择"
              change-on-select
              @change="handleChange"
            />
          </li>
          <!-- <li>
            <label>上一级id</label>
            <el-input v-model="temp.pid" placeholder="请输入首页上一级id"></el-input>
          </li>-->
          <li>
            <label>导航名称</label>
            <el-input v-model="temp.type_name" placeholder="请输入首页导航名称"></el-input>
          </li>
          <li>
            <label>导航跳转链接</label>
            <el-input v-model="temp.type_link_url" placeholder="请输入导航跳转链接"></el-input>
          </li>
          <!-- <li>
            <label>更新时间</label>
            <el-input v-model="temp.update_time" placeholder="请输入更新时间"></el-input>
          </li>-->
          <li>
            <label>状态</label>
            <el-radio v-model="temp.is_show" :label="1">正常</el-radio>
            <el-radio v-model="temp.is_show" :label="0">隐藏</el-radio>
          </li>
          <li>
            <label>导航排序</label>
            <el-input v-model="temp.sort"></el-input>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addNavTypeLists, getnavjson, editNavTypeLists } from "@/api/user";
export default {
  data() {
    return {
      nav_id: [],
      props_pid: { label: "name", value: "nav_id" },
      temp: {
        nav_type_id: "",
        nav_id: "",
        type_name: "",
        type_link_url: "",
        is_show: 1,
        sort: 10
      },
      //   menuURL: [],
      init: {
        nav_type_id: "",
        nav_id: "",
        type_name: "",
        type_link_url: "",
        is_show: 1,
        sort: 10
      },
      navjson: []
    };
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    flag: {
      type: Number
    },
    rowData: {
      type: Object
    }
  },
  watch: {
    dialogVisible(hidden) {
      if (hidden && this.flag == 1) {
        this.temp = { ...this.init };
        this.nav_id = [];
      } else {
        this.nav_id = [this.rowData.nav_id * 1];
        this.temp = { ...this.rowData };
      }
    },
    nav_id(val) {
      console.log(val);
    }
  },
  mounted() {
    getnavjson().then(res => {
      this.navjson = res.data;
    });
  },
  computed: {},
  methods: {
    handleChange(value) {
      if (value.length) {
        this.temp.nav_id = value[value.length - 1];
      }
    },
    cancel() {
      this.$emit("cancel", false);
    },
    ok() {
      //   return;
      if (this.flag == 1) {
        addNavTypeLists(this.temp).then(res => {
          if (res.code == 100) this.$emit("cancel", false);
          this.$message({
            type: "info",
            message: res.msg
          });
          this.$emit("update");
        });
      } else {
        editNavTypeLists(this.temp).then(res => {
          if (res.code == 100) this.$emit("cancel", false);
          this.$message({
            type: "info",
            message: res.msg
          });
          this.$emit("update");
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.add_uers {
  ul {
    list-style: none;
    li {
      display: flex;
      margin-top: 30px;
      label {
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
      .el-input {
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>