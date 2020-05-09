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
            <label>上级</label>
            <el-cascader
              v-model="pid"
              :options="menuURL"
              :props="props_pid"
              placeholder="请选择"
              change-on-select
              @change="handleChange"
            />
          </li>
          <li>
            <label>名称</label>
            <el-input v-model="temp.title"></el-input>
          </li>
          <li>
            <label>图标</label>
            <el-input v-model="temp.icon"></el-input>
          </li>
          <li>
            <label>标识</label>
            <el-input v-model="temp.router_name"></el-input>
          </li>
          <li>
            <label>状态</label>
            <el-radio v-model="temp.show" :label="1">正常</el-radio>
            <el-radio v-model="temp.show" :label="0">隐藏</el-radio>
          </li>
          <li>
            <label>排序</label>
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
import { addMenu, editMenu } from "@/api/user";
export default {
  data() {
    return {
      pid: [],
      temp: {
        show: 1, //用户状态
        title: "",
        icon: "",
        router_name: "",
        sort: "10"
      },
      //   menuURL: [],
      init: {
        show: 1, //用户状态
        title: "",
        icon: "",
        router_name: "",
        sort: "10"
      },
      props_pid: { label: "title", value: "menu_id" }
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
      if (hidden && this.flag == 1) this.temp = { ...this.init };
      else {
        this.temp = { ...this.rowData };
        this.pid = this.getRulesList(this.menuURL, this.temp.pid).unshift(0);
      }
    },
    rowData(data) {}
  },
  mounted() {},
  computed: {
    menuURL() {
      return [
        {
          menu_id: 0,
          title: "顶级",
          children: JSON.parse(localStorage.getItem("menuURL"))
        }
      ];
    }
  },
  methods: {
    getRulesList(list, pid) {
      let tree = [];
      if (list) {
        list.forEach((item, index) => {
          if (item.menu_id == pid) {
            tree.push(item.menu_id);
            return false;
          } else if (item.children) {
            const parent = this.getRulesList(item.children, pid);
            if (parent.length) {
              tree = tree.concat(parent);
            }
          }
        });
      }
      return tree;
    },
    handleChange(value) {
      if (value.length) {
        this.temp.pid = value[value.length - 1];
      }
    },
    cancel() {
      this.$emit("cancel", false);
    },
    ok() {
      console.log(this.pid);
      //   return;
      if (this.flag == 1) {
        addMenu(this.temp).then(res => {
          this.$emit("cancel", false);
          this.$emit("update");
        });
      } else {
        editMenu(this.temp).then(res => {
          this.$emit("cancel", false);
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