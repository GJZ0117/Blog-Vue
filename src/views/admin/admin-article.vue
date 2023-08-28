<template>
  <!-- 后台管理博客管理页面 -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-lg-4 col-8">
                <div class="input-group w-100">
                  <span class="input-group-text" id="basic-addon1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      class="bi bi-search"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="搜索"
                    id="adminSearchInput"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="btn btn-outline-success" @click="adminSearch()">搜索</div>
              </div>
            </div>
          </div>

          <div class="container mt-4">
            <table class="table table-striped table-hover">
              <thead>
                <tr class="back">
                  <th scope="col">#</th>
                  <th scope="col">标题</th>
                  <th scope="col">分类</th>
                  <th scope="col">更新时间</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr class="lh-lg" v-for="(blog, index) in blogData" :key="blog.id">
                  <th scope="row" style="vertical-align: middle">{{ index + 1 }}</th>
                  <td style="vertical-align: middle">{{ blog.title }}</td>
                  <td style="vertical-align: middle">{{ blog.typeName }}</td>
                  <td style="vertical-align: middle">{{ blog.createTime }}</td>
                  <td>
                    <a
                      class="btn btn-sm btn-outline-success me-2"
                      @click="editBlog(blog.id)"
                      >编辑</a
                    >
                    <a
                      class="btn btn-sm btn-outline-danger me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteConfirm"
                      @click="changeCurBlogCharacter(blog.id, blog.title)"
                      >删除</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card-body">
            <a class="btn btn-outline-warning float-end" @click="addBlog()">新增</a>
          </div>

          <div class="card-footer clearfix text-center">
            <div class="row">
              <div class="col-3">
                <button
                  class="btn btn-outline-success btn-sm float-start font-tiny"
                  @click="changePage(page - 1)"
                  :class="{ disabled: page == 1 }"
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
                  @click="changePage(page + 1)"
                  :class="{ disabled: page == totalPages }"
                >
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="deleteConfirm"
      tabindex="-1"
      aria-labelledby="deleteConfirmLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteConfirmLabel">确认删除</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            确定要删除 <span class="fw-bold text-danger">{{ curBlogTitle }}</span> 吗?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteBlogById()"
              data-bs-toggle="modal"
              data-bs-target="#msgAlert"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="msgAlert"
      tabindex="-1"
      aria-labelledby="msgAlertLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="msgAlertLabel">提示</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" id="msg-alert-content"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

const options = {
  data() {
    return {
      page: 1, // 当前页
      pageSize: 5, // 页面容量
      totalPages: null, // 总页数
      blogCount: null, // 总博客数
      curBlogId: null, // 当前操作的博客id
      curBlogTitle: null, // 当前操作的博客标题
      blogData: [], // 页面中要展示的博客数据
      searchData: "",
    };
  },
  methods: {
    // 根据当前页和页面容量加载所需的博客信息
    listBlogs() {
      axios
        .post(
          "/api/blog/admin/listBlogs",
          {
            page: this.page,
            pageSize: this.searchData === undefined ? this.pageSize : 1000,
            searchData: this.searchData,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.blogData = res.data.data;
          this.searchData = undefined;
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 按标题或内容搜索博客
    adminSearch() {
      var searchData = document.getElementById("adminSearchInput").value;
      if (searchData == this.$route.query.searchData) {
        return;
      }
      console.log(searchData);
      this.$router.push({
        path: "/admin/article",
        query: { searchData: searchData },
      });
    },
    // 通过博客总数和页面大小统计总页数
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
    // 更改当前操作的博客id及标题
    changeCurBlogCharacter(blogId, blogTitle) {
      this.curBlogId = blogId;
      this.curBlogTitle = blogTitle;
    },
    // 根据id删除博客
    deleteBlogById() {
      axios
        .post(
          "/api/blog/admin/deleteBlog",
          {
            blogId: this.curBlogId,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          var changeRowNum = res.data.data;
          if (changeRowNum == 1) {
            document.getElementById("msg-alert-content").innerHTML = "操作成功!";
            window.setTimeout(function () {
              $("#msgAlert").modal("hide");
            }, 3000); //显示的时间
          } else {
            document.getElementById("msg-alert-content").innerHTML = "操作失败!";
            window.setTimeout(function () {
              $("#msgAlert").modal("hide");
            }, 3000); //显示的时间
          }
          setTimeout("location.reload()", 3000);
        })
        .catch((err) => {
          console.error(err);
          sessionStorage.setItem("errorMsg", err);
          this.$router.push({ path: "/500" });
        });
    },
    // 新增博客,跳转到博客编辑页面
    addBlog() {
      sessionStorage.removeItem("adminEditBlogId");
      this.$router.push({ path: "/admin/article/edit" });
    },
    // 修改博客,跳转到博客编辑页面并通过id加载相关数据
    editBlog(blogId) {
      this.$router.push({ path: "/admin/article/edit", query: { blogId: blogId } });
    },
    // 翻页
    changePage(newPage) {
      this.page = newPage;
      this.$router.push({ path: "/admin/article", query: { page: this.page } });
    },
  },
  mounted() {
    if (sessionStorage.getItem("token") == null) {
      this.$router.push({ path: "/login" });
    }
    console.log("mounted");
    this.page = this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
    this.searchData =
      this.$route.query.searchData === undefined ? undefined : this.$route.query.searchData;
    this.listBlogs();
    if (this.searchData != undefined) {
      this.totalPages = 1;
    } else {
      this.getBlogCount();
    }
  },
  watch: {
    $route() {
      console.log(
        " this.$route.query.searchData : " +
          this.$route.query.searchData +
          " this.$route.query.page : " +
          this.$route.query.page
      );
      if (
        this.$route.query.searchData != undefined
      ) {
        this.searchData =
          this.$route.query.searchData === undefined ? undefined : this.$route.query.searchData;
        this.totalPages = 1;
        this.page = 1;
        this.listBlogs();
      } else if (
        this.$route.query.page != this.page ||
        this.$route.query.searchData == undefined ||
        this.$route.query.searchData == ""
      ) {
        this.page =
          this.$route.query.page === undefined ? 1 : Number(this.$route.query.page);
        this.listBlogs();
        this.getBlogCount();
      }
    },
  },
};

export default options;
</script>
