<template>
  <div>
    <!--页头-->
    <div class="uk-block uk-block-primary uk-contrast page-header">
      <div class="uk-container-center">
        <h1 class="uk-heading-large">图书
          <small>Vue CRUD 示例</small>
        </h1>
      </div>
    </div>
    <!--页头-->
    <!--页面正文-->
    <div class="content">
      <!--工具栏-->
      <div class="uk-grid uk-margin-large-bottom">
        <div class="uk-width-3-4">
          <div class="uk-grid">
            <!--图书统计-->
            <div class="uk-width-1-3">
            <span class="uk-text-large uk-text-muted">共有
              <span class="uk-text-bold">{{books.length}}</span>本图书
            </span>
            </div>
            <!--图书统计-->
            <!--搜索框-->
            <div class="uk-width-2-3">
              <div class="uk-form-blank">
                <div class="uk-form-icon">
                  <i class="uk-icon-search"></i>
                  <input type="search"
                         v-model="terms"
                         class="search-box uk-form-width-large"
                         placeholder="请输入您要筛选的书名"/>
                </div>
              </div>
            </div>
            <!--搜索框-->
          </div>
        </div>
        <div class="uk-width-1-4">
          <div class="uk-float-right">
            <button title="删除已选中的图书" class="uk-button uk-button-danger"><i class="uk-icon-trash"></i></button>
            <button class="uk-button uk-button-primary"><i class="uk-icon-plus"><span>添加</span></i></button>
          </div>
        </div>
        <!--工具栏-->
        <!--图书数据表格-->
        <table class="uk-table uk-table-striped" v-if="bookFilter.length">
          <thead>
            <tr>
              <th class="uk-text-center disable-select">书名</th>
              <th class="uk-text-center uk-width-1-6 disable-select">类别</th>
              <th class="uk-text-center uk-width-1-6 disable-select">出版日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in bookFilter">
              <td class="book-name uk-form uk-grid">
                <div class="uk-width-1-10">
                  <input type="checkbox" class="uk-margin-right" />
                </div>
                <div class="uk-width-9-10">
                  <a href="javascript:void(0)" class="uk-h3" :title="book.name">{{book.name}}</a>
                  <p class="authors uk-text-muted uk-text-small">{{book.authors}}</p>
                </div>
              </td>
              <td class="small">{{book.category}}</td>
              <td class="published uk-text-center">{{book.published}}</td>
            </tr>
          </tbody>
        </table>
        <!--图书数据表格-->
      </div>
      <div class="uk-text-muted uk-text-large uk-text-center" v-if="bookFilter.length==0">
        抱歉，尚未找到符合条件的图书
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import BookData from '../fixtures/items.json'
  
  export default {
    data () {
      return {
        terms: '',
        books: BookData
      }
    },
    computed: {
      bookFilter () {
        // 用函数式将书名包含terms内容的图书筛选出来
        return this.terms.length ? this.books.filter(x => x.name.indexOf(this.terms) > -1) : this.books
      }
    }
  }
</script>
