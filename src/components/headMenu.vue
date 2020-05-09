<template>
  <div>
    <div class="head_index">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          class="brb_item"
          v-for="(item,index) in breadcrumbList"
          :key="index"
        >{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="index_box">
      <div
        :class="tabIndex==index ? 'index_item active' : 'index_item'"
        v-for="(item,index) in menuList"
        :key="index"
        @click.stop="toRouter(index)"
      >
        <div v-show="tabIndex == index" style="display: inline-block">
          <div class="round"></div>
        </div>
        {{item}}
        <div v-if="item != '首页'" style="display: inline-block" @click.stop="close(index)">
          <span class="el-icon-close close"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    menuList: {
      type: Array
    },
    tabIndex: {
      type: Number
    },
    breadcrumbList: {
      type: Array
    }
  },
  watch: {
    menuList(data) {
      //   this.tabIndex = data.length - 1;
    },
    breadcrumbList(data, beforData) {}
  },
  methods: {
    removeTab() {},
    close(index) {
      this.$emit("closeTag", index);
    },
    toRouter(index) {
      this.$emit("toRouter", index);
    }
  }
};
</script>

<style lang='scss' scoped>
.head_index {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #97a8be;
  padding: 0 0 0 40px;
}
.brb_item {
  display: inline-block;
  position: relative;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.bind {
  animation: myfirst 0.4s;
}
.round {
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 2px;
}
.close {
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
}
.close:hover {
  background: rgb(180, 188, 204);
}
.index_box {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #d8dce5;
  border-top: 1px #ebeef5 solid;
  padding: 0 0 0 10px;
}
.index_item {
  display: inline-block;
  cursor: default;
  position: relative;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
}

.active {
  color: white;
  background: rgb(66, 158, 130);
}

@-webkit-keyframes myfirst /* Safari 和 Chrome */ {
  0% {
    left: 80px;
    opacity: 1;
  }
  25% {
    left: 55px;
    opacity: 0.7;
  }
  50% {
    left: 25px;
    opacity: 0.6;
  }
  100% {
    left: 0px;
    opacity: 0.5;
  }
}
</style>