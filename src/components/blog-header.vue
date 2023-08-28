<template>
  <!-- 博客展示页导航栏 -->
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
            id="btn-nav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-start" id="header">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link
                  :to="{ path: '/index', query: { page: 1 } }"
                  class="nav-link"
                  :class="{ active: isActive === 1 }"
                  @click.native="changeClass(1)"
                  ><i class="bi bi-house-door-fill"></i> 博客</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/type', query: { page: 1, curTypeId: -1 } }"
                  class="nav-link"
                  :class="{ active: isActive === 2 }"
                  @click.native="changeClass(2)"
                  ><i class="bi bi-book"></i> 分类</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ path: '/tag', query: { page: 1, curTagId: -1 } }"
                  class="nav-link"
                  :class="{ active: isActive === 3 }"
                  @click.native="changeClass(3)"
                  ><i class="bi bi-tag"></i> 标签</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/archive"
                  class="nav-link"
                  :class="{ active: isActive === 4 }"
                  @click.native="changeClass(4)"
                  ><i class="bi bi-archive"></i> 归档</router-link
                >
              </li>
            </ul>

            <div class="navbar-nav" id="search-container">
              <div class="navbar-form">
                <div class="row">
                  <div class="col-8 position-relative">
                    <input
                      type="text"
                      class="form-control ps-4 bg-dark text-light"
                      placeholder="搜索"
                      id="searchInput"
                    />
                    <i class="bi bi-search search text-light"></i>
                  </div>
                  <div class="col-4">
                    <button class="btn btn-light" @click="search()">搜索</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
const options = {
  data() {
    return {
      isActive: 0,
      searchData: "",
    };
  },
  methods: {
    // 根据当前所在栏目给导航栏中对应项目class添加active样式
    changeClass(i) {
      this.isActive = i;
    },
    getPathFun() {
      let curPath = this.$route.path;
      if (curPath === "/index" || curPath === "/") {
        this.isActive = 1;
      } else if (curPath === "/type") {
        this.isActive = 2;
      } else if (curPath === "/tag") {
        this.isActive = 3;
      } else if (curPath === "/archive") {
        this.isActive = 4;
      } else {
        this.isActive = 0;
      }
    },
    clickNavBar(pageName, i) {
      sessionStorage.setItem(pageName, 1);
      this.isActive = i;
    },
    // 搜索
    search() {
      this.searchData = document.getElementById("searchInput").value;
      document.getElementById("btn-nav").click();
      if (this.searchData.replace(/\s+/g, "") === "") {
        document.getElementById("searchInput").value = "";
        return;
      }
      if (this.searchData != this.$route.query.searchData) {
        this.$router.push({ path: "/search", query: { searchData: this.searchData } });
      }
      document.getElementById("searchInput").value = "";
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

.header-top .search {
  position: absolute;
  left: 18px;
  top: 6px;
}
</style>
