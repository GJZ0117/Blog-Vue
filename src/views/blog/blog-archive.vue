<template>
  <!-- 归档页面 -->
  <div class="container">
    <div class="row mb-3">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-3">
          <div class="card-header">
            <div class="row lh-lg">
              <div class="col-3 offset-1 fw-bold fs-3 text-success">归档</div>
              <div class="col-4 offset-4">
                <div class="text-center">
                  共 <span class="fs-3 text-warning">{{ blogCount }}</span> 篇
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div v-for="(archiveData, index) in archiveBlogData" :key="index">
        <div class="text-center lh-lg fw-bold fs-3 mb-3">
          {{ archiveData.get("year") }}
        </div>
        <div class="list-group col-lg-8 offset-lg-2 mb-3">
          <a
            class="list-group-item list-group-item-action py-3 shadow"
            style="line-height: 100%; cursor: pointer"
            v-for="blog in archiveBlogData[index].get('blogData')"
            :key="blog.id"
            @click="jumpToArticleByBlogId(blog.id)"
          >
            <span class="">{{ blog.title }}</span
            >&nbsp;<span class="badge rounded-pill bg-success">{{
              blog.createTime | dateFormat
            }}</span>
            <span class="badge float-end" :class="[blog.authorship?'bg-warning':'bg-secondary']">{{
              blog.authorship === true ? "原创" : "转载"
            }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const options = {
  data() {
    return {
      blogCount: 0, //博客总数
      blogData: [], // 要展示的博客数据
      archiveBlogData: [], // 归档后的博客数据
    };
  },
  methods: {
    // 获取博客归档列表数据
    archiveBlogs() {
      axios
        .get("/api/blog/archiveBlogs")
        .then((res) => {
          this.blogData = res.data.data;
          this.blogGroupByCreateYear();
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
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 将文章按照创建年份分组
    blogGroupByCreateYear() {
      let curYear = -1;
      for (const blog of this.blogData) {
        let date = new Date(blog.createTime);
        let year = date.getFullYear();
        if (year != curYear) {
          curYear = year;
          let map = new Map();
          map.set("year", year);
          map.set("blogData", []);
          this.archiveBlogData.push(map);
        }
        this.archiveBlogData[this.archiveBlogData.length - 1].get("blogData").push(blog);
      }
    },
    // 根据blogId跳转到对应的article页面
    jumpToArticleByBlogId(blogId) {
      this.$router.push({ path: "/article", query: { blogId: blogId } });
    },
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
  mounted() {
    this.archiveBlogs();
    this.getBlogCount();
  },
};

export default options;
</script>

<style scoped>
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
</style>
