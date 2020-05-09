<template>
  <div class="add_uers">
    <el-dialog
      title="添加"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div>
        <ul>
          <li>
            <label>用户状态</label>
            <el-radio v-model="temp.status" :label="1">正常</el-radio>
            <el-radio v-model="temp.status" :label="2">禁用</el-radio>
          </li>
          <li>
            <label>用户头像</label>
            <el-upload
              class="avatar-uploader"
              :data="imgData"
              action="http://ruiguo.ruiguohealth.com/api/public/index.php/api/v1/upload/mono_file"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </li>
          <li>
            <label>用户名</label>
            <el-input v-model="temp.user_name"></el-input>
          </li>
          <li>
            <label>登录账号</label>
            <el-input v-model="temp.user_account"></el-input>
          </li>
          <li>
            <label>登录密码</label>
            <el-input v-model="temp.user_password"></el-input>
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
import { userAdd, userEdit } from "@/api/user";
export default {
  data() {
    return {
      temp: {
        status: 1, //用户状态
        images: "",
        user_name: "",
        user_account: "",
        user_password: "",
        sort: "10"
      },
      imgData: {
        type: "images",
        filename: "file",
        mode: "adminuser"
      },
      imageUrl: "",
      init: {
        status: "1", //用户状态
        images: "",
        user_name: "",
        user_account: "",
        user_password: "",
        sort: "10"
      }
    };
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    userData: {
      type: Object
    },
    flag: {
      type: Number
    }
  },
  watch: {
    userData(val) {
      this.temp = { ...this.userData };
      this.imageUrl =
        "http://ruiguo.ruiguohealth.com/api/Upload/StaticDataFile/" +
        val.images;
    }
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code == 100) this.temp.images = res.data.img_paths;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    cancel() {
      this.$emit("cancel", false);
    },
    close() {
      this.$emit("cancel", false);
    },
    ok() {
      console.log(this.flag);
      if (this.flag === 1) {
        userAdd(this.temp).then(res => {
          this.$emit("cancel", false);
          this.temp = { ...this.init };
          this.imageUrl = "";
          this.$emit("update");
        });
      } else {
        var obj = {};
        for (let item in this.temp) {
          if (this.temp[item]) {
            obj[item] = this.temp[item];
          }
        }
        userEdit(obj).then(res => {
          this.$emit("cancel", false);
          this.temp = { ...this.init };
          this.imageUrl = "";
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