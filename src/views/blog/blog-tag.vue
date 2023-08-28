<template>
  <!-- 博客按标签展示页面 -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-3 offset-1 fw-bold fs-3 text-success">标签</div>
              <div class="col-4 offset-4">
                <div class="text-center">
                  共 <span class="fs-3 text-warning">{{ this.tagData.length }}</span> 个
                </div>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div class="container">
              <a
                class="btn btn-outline-success mx-lg-3 mx-2 my-2"
                style="height: 100%"
                @click="findBlogsByTagId(tag.id, 1)"
                v-for="tag in tagData"
                :key="tag.id"
                :class="{ active: tag.id == curTagId }"
                >{{ tag.name }}&nbsp;<span class="badge bg-dark">{{ tag.num }}</span></a
              >
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
                        <a
                          class="btn btn-outline-success btn-sm font-tiny mb-1"
                          @click="jumpToTypeByTypeId(blog.typeId)"
                          >{{ blog.typeName }}</a
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="container">
                        <a
                          class="badge rounded-pill m-1"
                          @click="findBlogsByTagId(tag.id, 1)"
                          v-for="tag in blog.tags"
                          :key="tag.id"
                          :class="{
                            'text-bg-success': tag.id == curTagId,
                            'text-bg-light': tag.id != curTagId,
                          }"
                          style="cursor: pointer"
                          >{{ tag.name }}</a
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
              </div>
            </li>
          </ul>

          <div class="card-footer clearfix text-center">
            <div class="row">
              <div class="col-3">
                <button
                  class="btn btn-outline-success btn-sm float-start font-tiny"
                  :class="{ disabled: page == 1 }"
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
                  :class="{ disabled: page == totalPages }"
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
  </div>
</template>

<script>
import axios from "axios";

const options = {
  data() {
    return {
      page: 1, // 当前页
      pageSize: 5, // 页面容量
      totalPages: null, // 总页数
      blogCount: null, // 当前标签下对应的博客总数
      tagData: [], // 所有的标签数据
      blogData: [], // 当前标签下对应的博客数据
      curTagId: sessionStorage.getItem("curTagId"),
    };
  },
  methods: {
    // 加载所有标签数据
    listAllTags() {
      axios
        .get("/api/tag/allHotTags")
        .then((res) => {
          this.tagData = res.data.data;
          this.findBlogsByTagId(this.curTagId, this.$route.query.page);
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    changePage(newPage) {
      this.page = newPage;
      this.$router.push({
        path: "/tag",
        query: { curTagId: this.curTagId, page: this.page },
      });
    },
    // 加载当前标签对应的文章列表
    async findBlogsByTagId(tagId, page) {
      this.page = page == undefined ? 1 : Number(page);
      if (tagId != this.curTagId) {
        this.curTagId = tagId;
        this.$router.push({
          path: "/tag",
          query: { curTagId: this.curTagId, page: this.page },
        });
      }
      axios
        .post("/api/blog/findBlogsByTagId", {
          page: this.page,
          pageSize: this.pageSize,
          tagId: this.curTagId,
        })
        .then((res) => {
          this.blogData = res.data.data;
          if (this.curTagId == -1) {
            axios
              .get("/api/tag/findMinTagId")
              .then((res) => {
                this.curTagId = res.data.data.id;
                for (const tag of this.tagData) {
                  if (tag.id == this.curTagId) {
                    this.blogCount = tag.num;
                    this.totalPages = Math.ceil(this.blogCount / this.pageSize);
                    break;
                  }
                }
              })
              .catch((err) => {
                console.error(err);
                sessionStorage.setItem("errorMsg", err);
                this.$router.push({ path: "/500" });
              });
          } else {
            for (const tag of this.tagData) {
              if (tag.id == this.curTagId) {
                this.blogCount = tag.num;
                this.totalPages = Math.ceil(this.blogCount / this.pageSize);
                break;
              }
            }
          }
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
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
  mounted() {
    this.page = this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
    this.curTagId =
      this.$route.query.curTagId === undefined ? -1 : Number(this.$route.query.curTagId);
    this.listAllTags();
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
  watch: {
    $route() {
      if (this.$route.query.page || this.$route.query.curTagId) {
        this.page =
          this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
        this.curTagId =
          this.$route.query.curTagId === undefined
            ? -1
            : Number(this.$route.query.curTagId);
        this.findBlogsByTagId(this.curTagId, this.page);
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
