<template>
  <div style="height:100%">
    <el-col :span="12" style="height: 100%;width: 230px;">
      <el-menu
        style="height:100%"
        :collapse="false"
        :default-active="routerName ? routerName : '首页'"
        :default-openeds="defaultOpen"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="handleOpen"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <router-link :to="{name:'HomeIndex'}">
          <el-menu-item index="首页">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-for="(item,index) in menuURL" :key="index" :index="item.title">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group v-if="item.children && item.children.length">
            <router-link v-for="(dome,i) in item.children" :key="i" :to="{name:dome.routerName}">
              <el-menu-item v-if="dome.show" :index="dome.title">
                <span slot="title">{{dome.title}}</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <!-- <router-link :to="{name:'HomeIndex'}">
          <el-menu-item index="首页">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="权限管理">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <router-link :to="{name:'UserList'}">
              <el-menu-item index="管理员列表">管理员列表</el-menu-item>
            </router-link>
            <el-menu-item index="权限列表">权限列表</el-menu-item>
            <el-menu-item index="角色列表">角色列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="日志管理">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>日志管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="登录日志">登录日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="店铺管理">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>店铺管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="门店列表">门店列表</el-menu-item>
            <el-menu-item index="员工列表">员工列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="代理管理">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>代理管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="代理列表">代理列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>-->
      </el-menu>
    </el-col>
    <div class="right_box">
      <div class="head_menu">
        <headMenu
          :menuList="menuList"
          :breadcrumbList="breadcrumbList"
          :tabIndex="tabIndex"
          @closeTag="closeTag"
          @toRouter="toRouter"
        />
      </div>
      <div class="content_menu">
        <router-view
          :flag="editFlag"
          @update="update"
          @toRouter="toRouter"
          @getEditParams="getEditParams"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headMenu from "./headMenu.vue";
import { getMenuList } from "../api/user";

export default {
  data() {
    return {
      defaultOpen: [],
      path: "/HomeIndex",
      childrenName: "",
      menuList: ["首页"],
      editFlag: true,
      editParams: {},
      menuURL: [
        {
          title: "权限管理",
          icon: "el-icon-location",
          children: [
            {
              title: "管理员列表",
              routerName: "UserList",
              routerPath: "/manage/UserList",
              show: true
            },
            {
              title: "权限管理",
              routerName: "Rules",
              routerPath: "/manage/Rules",
              show: true
            }
          ]
        }
      ],
      tabIndex: 0,
      routerName: "",
      breadcrumbList: [{ title: "首页", style: "color : black" }]
    };
  },
  components: { headMenu },
  watch: {
    $route: {
      handler: function(route) {
        this.update(route);
      },
      immediate: true
    }
  },
  mounted() {
    // this.update();
  },
  methods: {
    getEditParams(bool, params) {
      console.log(this.menuList);

      if (
        this.menuList.indexOf("创建文章") != -1 ||
        this.menuList.indexOf("编辑文章") != -1
      ) {
        return this.$message({
          type: "info",
          message: "请先提交当前文章"
        });
      }
      if (bool) {
        this.menuList.push("编辑文章");
        this.editFlag = true;
        this.tabIndex = this.menuList.length - 1;
        this.childrenName = "createExample";
        this.$router.push({ name: "createExample" });
        this.editParams = params;
      } else {
        this.editParams = {};
        this.menuList.push("创建文章");
        this.editFlag = false;
        this.tabIndex = this.menuList.length - 1;
        this.childrenName = "createExample";
        this.$router.push({ name: "createExample" });
      }
    },
    update(route) {
      if (route.name == "createExample" && this.routerName != "文章攻略") {
        this.$router.push({ name: "HomeIndex" });
      }
      getMenuList().then(res => {
        this.menuURL = res.data;
        if (route) {
          this.menuURL.forEach(p => {
            p.children.forEach(h => {
              if (h.routerName == route.name) {
                this.routerName = h.title;
                if (!this.menuList.includes(h.title)) {
                  this.menuList.push(h.title);
                  this.tabIndex = this.menuList.length - 1;
                  this.handleSelect(h.title);
                  this.defaultOpen = [p.title];
                }
              }
            });
          });
        }
        localStorage.setItem("menuURL", JSON.stringify(this.menuURL));
      });
    },
    handleSelect(index) {
      this.breadcrumbList = [{ title: "首页", style: "color : black" }];
      this.menuURL.map((p, i) => {
        p.children.map(item => {
          if (item.title == index) {
            this.breadcrumbList[1] = {
              title: this.menuURL[i].title
            };
            this.breadcrumbList[2] = {
              title: item.title
            };
            return;
          }
        });
      });
      if (!this.menuList.includes(index)) {
        this.menuList.push(index);
        this.tabIndex = this.menuList.length - 1;
      } else {
        if (this.menuList.indexOf(index) !== -1) {
          this.tabIndex = this.menuList.indexOf(index);
        }
      }
    },
    handleOpen(name) {
      // this.breadcrumbList[1] = name
    },
    toRouter(index) {
      this.breadcrumbList = [{ title: "首页", style: "color : black" }];
      if (this.tabIndex == index) return;
      this.breadcrumbList.splice(2, 1);
      this.tabIndex = index;
      var routerInfo;
      this.menuURL.map((p, i) => {
        p.children.map(item => {
          if (item.title == this.menuList[index]) {
            routerInfo = item.routerName;
            this.breadcrumbList[1] = {
              title: this.menuURL[i].title
            };
            this.breadcrumbList[2] = {
              title: item.title
            };
            return;
          }
        });
      });

      // routerInfo;
      this.$router.push({
        name: index ? routerInfo || this.childrenName : "HomeIndex"
      });
    },
    closeTag(index) {
      this.menuList.splice(index, 1);
      var routerInfo;
      this.menuURL.forEach(p => {
        p.children.forEach(item => {
          if (item.title == this.menuList[this.menuList.length - 1]) {
            routerInfo = item.routerName;
          }
        });
      });
      // debugger;
      console.log(routerInfo);
      this.$router.push({
        name: this.menuList.length > 1 ? routerInfo : "HomeIndex"
      });
      this.tabIndex = this.menuList.length - 1;
    }
  }
};
</script>

<style lang='scss' scoped>
.right_box {
  width: calc(100% - 230px);
  float: right;
  height: 100%;
  overflow: auto;
}
.head_menu {
  height: 90px;
}
</style>