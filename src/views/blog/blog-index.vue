<template>
  <!-- 博客首页 -->
  <div class="container" id="content">
    <div class="row">
      <div class="col-lg-8 mt-3">
        <div class="col-lg-10 offset-lg-2 bg-light">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div
                  class="col-lg-2 offset-lg-1 col-3 offset-1 fw-bold fs-3 text-success"
                >
                  博客
                </div>
                <div class="col-lg-3 offset-lg-6 col-5 offset-3 float-end">
                  <div>
                    共 <span class="fs-3 text-warning">{{ blogCount }}</span> 篇
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item my-1" v-for="blog in blogData" :key="blog.id">
                  <div class="row">
                    <div class="col-lg-8">
                      <div>
                        <a
                          @click="jumpToArticleByBlogId(blog.id)"
                          class="fs-5 fw-bold"
                          style="cursor: pointer"
                          >{{ blog.title }}</a
                        >
                      </div>
                      <div>
                        <p class="font-tiny">
                          {{ blog.description }}
                        </p>
                      </div>
                      <div class="row font-mini">
                        <div class="col-5" style="margin: auto 0">
                          <i class="bi bi-calendar-check"></i>
                          {{ blog.createTime | dateFormat }}
                        </div>
                        <div class="col-3" style="margin: auto 0">
                          <i class="bi bi-eye"></i> {{ blog.views }}
                        </div>
                        <div class="col-4">
                          <a
                            class="btn btn-outline-success btn-sm font-tiny mb-1"
                            @click="jumpToTypeByTypeId(blog.typeId)"
                            >{{ blog.typeName }}</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 nav flex-column justify-content-center">
                      <img
                        decoding="async"
                        class="img-fluid rounded m-auto"
                        :src="blog.firstPicture"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="card-footer clearfix text-center">
              <div class="row">
                <div class="col-3">
                  <button
                    class="btn btn-outline-success btn-sm float-start font-tiny"
                    :class="{ disabled: page === 1 }"
                    @click="changePage(page - 1)"
                  >
                    上一页
                  </button>
                </div>
                <div class="col-6">
                  第<span class="fs-5 text-success">{{ page }}</span
                  >页 / 共<span class="fs-5 text-success">{{ totalPages }}</span
                  >页
                </div>
                <div class="col-3">
                  <button
                    class="btn btn-outline-success btn-sm float-end font-tiny"
                    :class="{ disabled: page === totalPages }"
                    @click="changePage(page + 1)"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mt-3">
        <div class="col-lg-9">
          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <img
                  class="mx-auto d-block my-2"
                  style="border-radius: 50%;  width: 150px; height: 200px"
                  src="https://qiniu.gjz0117.top/photo.JPG"
                  alt=""
                />
                <div class="fs-3 fw-bold text-center my-2">GJZ</div>
                <div class="fs-6 fw-light text-center">
                  Talk is cheap, show me the code
                </div>
                <div class="row text-center my-2">
                  <div class="col-4">
                    <div class="fw-bold">分类</div>
                    <div>
                      <router-link
                        class="fw-bold text-primary"
                        :to="{ path: '/type', query: { page: 1, curTypeId: 1 } }"
                        >{{ typeCount }}</router-link
                      >
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="fw-bold">标签</div>
                    <div>
                      <router-link
                        class="fw-bold text-primary"
                        :to="{ path: '/tag', query: { page: 1, curTagId: 1 } }"
                        >{{ tagCount }}</router-link
                      >
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="fw-bold">浏览量</div>
                    <div class="fw-bold text-primary">{{ totalViewCount }}</div>
                  </div>
                </div>
              </li>

              <li class="list-group-item text-center">
                <a
                  href="https://github.com/GJZ0117"
                  class="btn btn-outline-secondary fs-6 my-1 mx-2"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                  GitHub</a
                >

                <a
                  class="btn btn-outline-secondary fs-6 my-1 mx-2"
                  data-bs-toggle="tooltip"
                  title="@GJZ0117"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-twitter text-primary"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                    />
                  </svg>
                  Twitter</a
                >

                <a
                  class="btn btn-outline-secondary fs-6 my-1 mx-2"
                  data-bs-toggle="tooltip"
                  title="GJZ_0117"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-wechat text-success"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.324.324 0 0 0-.12.366l.218.81a.616.616 0 0 1 .029.117.166.166 0 0 1-.162.162.177.177 0 0 1-.092-.03l-1.057-.61a.519.519 0 0 0-.256-.074.509.509 0 0 0-.142.021 5.668 5.668 0 0 1-1.576.22ZM9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.615.615 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.627.627 0 0 0 .098.356Z"
                    />
                    <path
                      d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.499.499 0 0 0-.032.14.192.192 0 0 0 .193.193c.039 0 .077-.01.111-.029l1.268-.733a.622.622 0 0 1 .308-.088c.058 0 .116.009.171.025a6.83 6.83 0 0 0 1.625.26 4.45 4.45 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02.05 0 .1 0 .15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826Zm4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Zm3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0Z"
                    />
                  </svg>
                  WeChat</a
                >

                <a
                  href="https://leetcode.com/GJZ0117/"
                  class="btn btn-outline-secondary fs-6 my-1 mx-2"
                >
                  <div style="display: inline-block; width: 1rem">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="#B3B1B0"
                        d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"
                      />
                      <path
                        fill="#E7A41F"
                        d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"
                      />
                      <path
                        fill="#070706"
                        d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"
                      />
                    </svg>
                  </div>
                  Leetcode
                </a>
              </li>
              <li class="list-group-item">
                <div class="my-1 fw-light font-tiny timer">
                  <i class="bi bi-graph-up"></i> 网站运行时间:
                  <span class="float-end" ref="startTimer"
                    >{{ days }}天{{ hours }}小时{{ minutes }}分钟{{ seconds }}秒</span
                  >
                </div>
              </li>
            </ul>
          </div>

          <div class="card mt-3">
            <div class="card-header fw-bold">
              <i class="bi bi-book"></i> 分类
              <router-link
                :to="{ path: '/type', query: { page: 1, curTypeId: 1 } }"
                class="float-end font-tiny text-primary"
                >more<i class="bi bi-chevron-double-right"></i
              ></router-link>
            </div>

            <div class="container my-2">
              <div class="list-group">
                <a
                  class="list-group-item list-group-item-action font-tiny"
                  v-for="type in hotTypes"
                  :key="type.typeId"
                  @click="jumpToTypeByTypeId(type.typeId)"
                  style="cursor: pointer"
                  >{{ type.name
                  }}<span class="float-end text-success font-tiny">{{
                    type.num
                  }}</span></a
                >
              </div>
            </div>
          </div>

          <div class="card mt-3">
            <div class="card-header fw-bold">
              <i class="bi bi-tag"></i> 标签
              <router-link
                :to="{ path: '/tag', query: { page: 1, curTagId: 1 } }"
                class="float-end font-tiny text-primary"
                >more<i class="bi bi-chevron-double-right"></i
              ></router-link>
            </div>
            <div class="card-body">
              <a
                class="btn btn-outline-success my-1 mx-2 font-tiny"
                @click="jumpToTagByTagId(tag.id)"
                v-for="tag in hotTags"
                :key="tag.id"
                >{{ tag.name }}&nbsp;&nbsp;&nbsp;{{ tag.num }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

const options = {
  data() {
    return {
      page: 1, // 当前页号
      pageSize: 5, // 每页文章数
      totalPages: null, // 总页数
      searchData: null, // 搜索内容
      blogCount: 0, // 博客总数
      typeCount: 0, // 类别总数
      tagCount: 0, // 标签总数
      viewCount: 0, // 总访问量
      blogData: [], // 当且页面文章列表数据
      typeData: [], // 类别列表
      hotTypes: [], // 最热的几个类别
      hotTags: [], // 最热的几个标签
      totalViewCount: 0, // 浏览总量

      // 统计网站运行时间
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      date1: "2023/01/17 00:00:00",
    };
  },
  methods: {
    // 加载文章数据
    listBlogs() {
      axios
        .get("/api/blog/listBlogs", {
          params: {
            page: this.page,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.blogData = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 统计文章总数
    getBlogCount() {
      axios
        .get("/api/blog/getBlogCount")
        .then((res) => {
          this.blogCount = res.data.data;
          this.totalPages = Math.ceil(this.blogCount / this.pageSize);
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 统计类别总数
    getTypeCount() {
      axios
        .get("/api/type/getTypeCount")
        .then((res) => {
          this.typeCount = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 加载最热类别数据
    getHotTypes() {
      axios
        .get("/api/type/hotTypes")
        .then((res) => {
          this.hotTypes = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 统计标签总数
    getTagCount() {
      axios
        .get("/api/tag/getTagCount")
        .then((res) => {
          this.tagCount = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 加载最热标签数据
    getHotTags() {
      axios
        .get("/api/tag/hotTags")
        .then((res) => {
          this.hotTags = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 翻页
    changePage(newPage) {
      this.page = newPage;
      this.$router.push({ path: "/index", query: { page: newPage } });
    },
    // 根据typeId跳转到对应的type页面
    jumpToTypeByTypeId(typeId) {
      this.$router.push({ path: "/type", query: { curTypeId: typeId, page: 1 } });
    },
    // 根据tagId跳转到对应的tag页面
    jumpToTagByTagId(tagId) {
      this.$router.push({ path: "/tag", query: { curTagId: tagId, page: 1 } });
    },
    // 根据blogId跳转到对应的article页面
    jumpToArticleByBlogId(blogId) {
      this.$router.push({ path: "/article", query: { blogId: blogId } });
    },
    // 统计网站运行时间
    startTimer() {
      var date2 = new Date(); //结束时间
      var date3 = date2.getTime() - new Date(this.date1).getTime(); //时间差的毫秒数
      //计算出相差天数
      this.days = Math.floor(date3 / (24 * 3600 * 1000));
      //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      this.hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      this.minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      this.seconds = Math.round(leave3 / 1000);
      //  document.getElementById("time").innerHTML = days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
    },
    // 加载总浏览量
    getTotalViewCount() {
      axios
        .get("/api/blog/totalViewCount")
        .then((res) => {
          this.totalViewCount = res.data.data;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
  },
  mounted() {
    this.page = this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
    this.listBlogs();
    this.getTotalViewCount();
    this.getTypeCount();
    this.getBlogCount();
    this.getTagCount();
    this.getHotTypes();
    this.getHotTags();
    // 给 twitter wechat 两个按钮绑定弹出框样式
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  },
  filters: {
    dateFormat: function (value) {
      // 根据给定的字符串，得到特定的日期
      var date = new Date(value);
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return year + "-" + month + "-" + day;
    },
  },
  created() {
    this.timer = setInterval(this.startTimer, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    $route() {
      if (this.$route.query.page) {
        this.page =
          this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
        this.listBlogs();
      }
    },
  },
};

export default options;
</script>

<style scoped>
.container {
  padding: 0 1rem !important;
}

li {
  margin: 3px 0;
}

a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}

.font-tiny {
  font-size: 12px !important;
  font-weight: 300 !important;
  letter-spacing: 1px !important;
  line-height: 1.8 !important;
}

.font-mini {
  font-size: 10px !important;
  font-weight: 260 !important;
  letter-spacing: 0.8px !important;
  line-height: 1.6 !important;
}

#pageInfo {
  display: inline-block !important;
}

a span {
  width: 30px;
  font-size: 5px !important;
}
</style>
