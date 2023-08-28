<template>
  <!-- 后台管理页面导航栏 -->
  <div>
    <header class="header-top">
      <nav
        class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top border border-dark shadow"
      >
        <div class="container">
          <router-link
            :to="{ path: '/index', query: { page: 1 } }"
            class="navbar-brand fw-bold fs-4 text-success"
            >GJZ's Blog</router-link
          >
          <button
            type="button"
            class="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#header"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="header">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link
                  :to="{ path: '/admin/article', query: { page: 1 } }"
                  class="nav-link"
                  :class="{ active: isActive === 1 }"
                  @click.native="changeClass(1)"
                  ><i class="bi bi-house-door-fill"></i> 博客管理</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/admin/type', query: { page: 1 } }"
                  class="nav-link"
                  :class="{ active: isActive === 2 }"
                  @click.native="changeClass(2)"
                  ><i class="bi bi-book"></i> 分类管理</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/admin/tag', query: { page: 1 } }"
                  class="nav-link"
                  :class="{ active: isActive === 3 }"
                  @click.native="changeClass(3)"
                  ><i class="bi bi-tag"></i> 标签管理</router-link
                >
              </li>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://qiniu.gjz0117.top/photo.JPG"
                    class="mx-autos"
                    style="border-radius: 50%; width: 30px; height: 30px"
                    alt=""
                  />&nbsp; GJZ
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <router-link
                      :to="{ path: '/index', query: { page: 1 } }"
                      class="dropdown-item text-center"
                      >返回首页</router-link
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item text-center"
                      style="cursor: pointer"
                      @click="logout()"
                      >注销</a
                    >
                  </li>
                </ul>
              </div>
            </ul>

            <div class="navbar-nav" style="display: inline"></div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import axios from "axios";
const options = {
  data() {
    return {
      isActive: 0,
    };
  },
  methods: {
    // 根据当前所在栏目给导航栏中对应项目class添加active样式
    changeClass(i) {
      this.isActive = i;
    },
    getPathFun() {
      let curPath = this.$route.path;
      if (curPath === "/admin/article") {
        this.isActive = 1;
      } else if (curPath === "/admin/type") {
        this.isActive = 2;
      } else if (curPath === "/admin/tag") {
        this.isActive = 3;
      } else {
        this.isActive = 0;
      }
    },
    // 退出登录清除sessionStorage中的token
    logout() {
      axios
        .get("/api/admin/logout", {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        })
        .then(() => {
          sessionStorage.removeItem("token");
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
  },
  watch: {
    $route: "getPathFun",
  },
  mounted() {
    this.getPathFun();
  },
};

export default options;
</script>

<style scoped>
.nav-item {
  padding: 0 3rem;
}
</style>
