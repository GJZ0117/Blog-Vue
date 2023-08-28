<template>
  <!-- 搜索结果页 -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-8 fw-bold fs-3 text-success">
                搜索&nbsp;<span class="text-warning">{{
                  this.$route.query.searchData
                }}</span
                >&nbsp;结果:
              </div>
              <div class="col-4">
                <div class="float-end">
                  共 <span class="fs-3 text-warning">{{ this.blogData.length }}</span> 个
                </div>
              </div>
            </div>
          </div>

          <ul class="list-group list-group-flush">
            <li class="list-group-item my-1" v-for="blog in blogData" :key="blog.id">
              <div class="container">
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
                        <a class="btn btn-outline-success btn-sm font-tiny mb-1 active">{{
                          blog.typeName
                        }}</a>
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
              </div>
            </li>
          </ul>
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
      searchData: "", // 搜索内容
      blogCount: null, // 当前标签下对应的博客总数
      blogData: [], // 当前标签下对应的博客数据
    };
  },
  methods: {
    search() {
      this.searchData = this.$route.query.searchData;
      if (this.searchData.replace(/\s+/g, "") === "") {
        document.getElementById("searchInput").value = "";
        return;
      }
      axios
        .post("/api/blog/search", {
          searchData: this.searchData,
        })
        .then((res) => {
          this.blogData = res.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 根据typeId跳转到对应的type页面
    jumpToTypeByTypeId(typeId) {
      this.$router.push({ path: "/type", query: { curTypeId: typeId, page: 1 } });
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
    this.searchData = this.$route.query.searchData;
    this.search();
  },
  watch: {
    $route() {
      if (this.$route.query.searchData != this.search) {
        this.search();
      }
    },
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

.font-mini {
  font-size: 10px !important;
  font-weight: 260 !important;
  letter-spacing: 0.8px !important;
  line-height: 1.6 !important;
}
</style>
