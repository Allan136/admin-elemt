<template>
  <div>
    <ul>
      <li>
        <span>攻略标题</span>
        <div class="right">
          <el-input v-model="temp.title" placeholder="请输入攻略标题"></el-input>
        </div>
      </li>
      <li>
        <span>攻略来源</span>
        <div class="right">
          <el-input v-model="temp.source" placeholder="请输入攻略来源"></el-input>
        </div>
      </li>
      <li>
        <span>SEO关键字</span>
        <div class="right">
          <el-input v-model="temp.seo_keywords" placeholder="请输入SEO关键字"></el-input>
        </div>
      </li>
      <li>
        <span>攻略作者</span>
        <div class="right">
          <el-input v-model="temp.author" placeholder="请输入攻略作者"></el-input>
        </div>
      </li>
      <li>
        <span>阅读量</span>
        <div class="right">
          <el-input
            @keyup.native="temp.read = temp.read.replace(/[^0-9]/ig,'')"
            v-model="temp.read"
            placeholder="请输入阅读量"
          ></el-input>
        </div>
      </li>
      <li>
        <span>是否置顶</span>
        <div class="radio">
          <el-radio v-model="temp.is_top" :label="1">是</el-radio>
          <el-radio v-model="temp.is_top" :label="0">否</el-radio>
        </div>
      </li>
      <li>
        <span>属性</span>
        <div class="radio">
          <el-checkbox-group v-model="attribute">
            <el-checkbox :label="'1'">热门</el-checkbox>
            <el-checkbox :label="'2'">最新</el-checkbox>
            <el-checkbox :label="'3'">相关</el-checkbox>
            <el-checkbox :label="'4'">首页</el-checkbox>
          </el-checkbox-group>
        </div>
      </li>
      <li>
        <span>攻略缩略图</span>
        <div class="right">
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
        </div>
      </li>
      <li>
        <span>分类ID</span>
        <div class="right">
          <el-select filterable v-model="temp.nav_type_id">
            <el-option
              v-for="item in options"
              :key="item.nav_type_id"
              :label="item.type_name"
              :value="item.nav_type_id"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li>
        <span>排序</span>
        <div class="right">
          <el-input
            @keyup.native="temp.sort = temp.sort.replace(/[^0-9]/ig,'')"
            v-model="temp.sort"
            placeholder="请输入排序"
          ></el-input>
        </div>
      </li>
      <li>
        <span>发布时间</span>
        <div class="right">
          <el-date-picker v-model="value1" @change="change" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
      </li>
      <li>
        <span>状态</span>
        <div class="radio">
          <el-radio v-model="temp.status" :label="1">未审核</el-radio>
          <el-radio v-model="temp.status" :label="2">已审核</el-radio>
        </div>
      </li>
      <li>
        <span>SEO描述</span>
        <div class="right">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            v-model="temp.seo_description"
            placeholder="请输入SEO描述"
          ></el-input>
        </div>
      </li>
      <li>
        <span>内容摘要</span>
        <div class="right">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            v-model="temp.abstract"
            placeholder="请输入内容摘要"
          ></el-input>
        </div>
      </li>
    </ul>
    <div>
      <span
        style="display: inline-block;width: 90px;height: 40px;line-height: 40px; margin:10px 0 0 10px"
      >攻略详情</span>
      <tinymce
        style="margin: 10px 20px;"
        :config="Config"
        v-model="Value"
        :url="Url"
        @input="inputChange"
        :with-credentials="false"
        @on-ready="onEditorReady"
        @on-destroy="onEditorDestroy"
        @on-upload-success="onEditorUploadComplete"
        @on-upload-fail="onEditorUploadFail"
        @on-upload-complete="onUpLoad"
      />
    </div>
    <div class="tijiao">
      <el-button type="primary" @click="ok">提交文章</el-button>
    </div>
  </div>
</template>

<script>
import tinymce from "./tinymce/index";
import { getnavtypejson, addStrategy, editStrategy } from "@/api/user";
export default {
  components: { tinymce },
  props: {
    flag: {
      type: Boolean
    }
  },
  data() {
    return {
      value1: "",
      attribute: [],
      options: [],
      imageUrl: "",
      Config: {
        height: 500
      },
      Value: "",
      datetime: "",
      imgData: {
        type: "images",
        filename: "file",
        mode: "strategy"
      },
      Url:
        "http://ruiguo.ruiguohealth.com/api/public/index.php/api/v1/upload/get_tinymce",
      temp: {},
      imgPath: [],
      init: {
        source: "",
        attribute: 1,
        nav_type_id: "",
        seo_keywords: "",
        is_top: 1,
        author: "",
        release_time: "",
        title: "",
        abstract: "",
        sort: 10,
        read: "",
        image_url: "",
        status: 1,
        seo_description: ""
      }
    };
  },
  mounted() {
    this.getData();
    if (!this.flag) {
      this.temp = { ...this.init };
    } else {
      let a = { ...this.$parent.editParams };
      this.temp = {
        abstract: a.abstract,
        author: a.author,
        source: a.source,
        strategy_id: a.strategy_id,
        attribute: a.attribute,
        nav_type_id: a.nav_type_id,
        seo_keywords: a.seo_keywords,
        is_top: a.is_top,
        release_time: a.release_time,
        title: a.title,
        sort: a.sort,
        read: a.read,
        image_url: a.image_url,
        status: a.status,
        seo_description: a.seo_description
      };
      if (a.attribute.length) this.attribute = a.attribute.split(",");
      this.Value = a.content;
      this.value1 = new Date(a.release_time);
      this.imageUrl =
        "http://ruiguo.ruiguohealth.com/api/Upload/StaticDataFile/" +
        a.image_url;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    inputChange(val) {
      console.log(val);
    },
    change(val) {
      this.temp.release_time = new Date(val).Format("yyyy-MM-dd hh:mm:ss");
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 100) this.temp.image_url = res.data.img_paths;
      this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log(this.temp.imageUrl);
    },
    beforeAvatarUpload(file) {},
    getData() {
      getnavtypejson().then(res => {
        this.options = [...res.data];
      });
    },
    ok() {
      if (this.attribute.length)
        this.temp.attribute = this.attribute.toString();
      //   if (this.imageUrl) this.temp.image_url = this.imageUrl;
      delete this.temp.imageUrl;
      this.temp.content = this.Value;

      if (!this.flag) {
        addStrategy(this.temp).then(res => {
          if (res.code == 100) {
          }
          this.$message({
            type: "info",
            message: res.msg
          });
        });
      } else {
        editStrategy(this.temp).then(res => {
          this.$message({
            type: "info",
            message: res.msg
          });
        });
      }
    },
    onEditorUploadComplete() {},
    onUpLoad(res) {
      console.log(res[1]());
      if (res[0].code == 100) {
        this.imgPath.push(res[0].data.img_paths);
      }
    },
    onEditorUploadFail() {},
    onEditorDestroy() {},
    onEditorReady() {}
  }
};
</script>

<style lang='scss' scoped>
li {
  display: flex;
  margin: 20px 10px 10px 10px;
  span {
    display: inline-block;
    width: 90px;
    height: 40px;
    line-height: 40px;
  }
  .right {
    margin-left: 10px;
    width: 100%;
  }
  .radio {
    margin-left: 10px;
    line-height: 40px;
  }
}
.tijiao {
  position: relative;
  height: 80px;
  .el-button {
    position: absolute;
    right: 35px;
    bottom: 20px;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  width: 180px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
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