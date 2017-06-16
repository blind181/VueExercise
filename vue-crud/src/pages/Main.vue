<template>
  <div>
    <!--页头-->
    <page-header header="图书"
                 subHeader="Vue CRUD 实例">
    </page-header>
    <!--页头-->
    <!--页面正文-->
    <div class="content">
      <!--工具栏-->
      <div class="uk-grid uk-margin-large-bottom">
        <div class="uk-width-3-4">
          <div class="uk-grid">
            <!--图书统计-->
            <div class="uk-width-1-3">
              <count-books :total="books.length"
                           :selection="selection.length"></count-books>
            </div>
            <!--图书统计-->
            <!--搜索框-->
            <div class="uk-width-2-3">
              <search-box :terms="terms"
                          placeholder="请输入您要筛选的书名"
                          @search="filterByBookName($event)"></search-box>
            </div>
            <!--搜索框-->
          </div>
        </div>
        <div class="uk-width-1-4">
          <div class="uk-float-right">
            <uk-button id="btn-delete"
                       title="删除已选中的图书"
                       color="danger"
                       @click="removeBooks"
                       icon="trash"
                       v-if="hasSelection">
            </uk-button>
            <uk-button icon="plus"
                       text="添加"
                       color="primary"
                       @click="newBook"></uk-button>
          </div>
        </div>
        <!--工具栏-->
        <!--图书数据表格-->
        <table class="uk-table uk-table-striped" v-if="bookFilter.length">
          <thead>
          <tr>
            <th class="uk-text-center disable-select"
                :class="{'sorting':sorted('name')}"
                data-col="name"
                @click="sortBy('name')">
              <div>书名
                <span :class="{
                          'uk-icon-sort-asc': direction=='asc',
                          'uk-icon-sort-desc':direction=='desc'
              }"
                      v-if="sortingKey=='name'"></span>
              </div>
            </th>
            <th class="uk-text-center uk-width-1-6 disable-select"
                :class="{'sorting':sorted('category')}"
                data-col="category"
                @click="sortBy('category')">
              <div>类别
                <span :class="{
                          'uk-icon-sort-asc': direction=='asc',
                          'uk-icon-sort-desc':direction=='desc'
              }"
                      v-if="sortingKey=='category'"></span>
              </div>
            </th>
            <th class="uk-text-center uk-width-1-6 disable-select"
                :class="{'sorting':sorted('published')}"
                data-col="published"
                @click="sortBy('published')">
              <div>出版日期
                <span :class="{
                          'uk-icon-sort-asc': direction=='asc',
                          'uk-icon-sort-desc':direction=='desc'
              }"
                      v-if="sortingKey=='published'"></span>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="book in bookFilter"
              :class="{'book-selected':book.selected}"
              :data-isbn="book.isbn">
            <td class="book-name uk-form ">
              <div class="uk-grid" :class="{'sorting':sorted('name')}">
                <div class="uk-width-1-10">
                  <input type="checkbox"
                         class="uk-margin-right"
                         v-model="book.selected"
                         :data-isbn="book.isbn" @change="selectionChanged(book,$event)"/>
                </div>
                <div class="uk-width-9-10">
                  <a href="javascript:void(0)" class="uk-h3" :title="book.name">{{book.name}}</a>
                  <p class="authors uk-text-muted uk-text-small">{{book.authors}}</p>
                </div>
              </div>
            </td>
            <td class="small">
              <div class="fill" :class="{'sorting':sorted('category')}">
                {{book.category}}
              </div>
            </td>
            <td class="published uk-text-center">
              <div class="fill" :class="{'sorting':sorted('published')}">
                {{book.published}}
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <model ref="model"
               :headerText="statusText"
               @dialogClose="current=undefined">
          <div slot="footer"
               class="uk-modal-footer uk-text-right">
            <uk-button color="primary"
                       @click="save"
                       text="保存"></uk-button>
            <uk-button color="danger"
                       @click="close()"
                       text="关闭"></uk-button>
          </div>
        </model>
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
  import _ from 'lodash'
  import PageHeader from '../components/PageHeader.vue'
  import SearchBox from '../components/SearchBox.vue'
  import CountBooks from '../components/CountBooks.vue'
  import UkButton from '../components/UkButton.vue'
  import Model from '../components/Dialog.vue'
  export default {
    data () {
      return {
        terms: '',
        sortingKey: '',
        direction: 'asc',
        statusText: '',
        books: BookData,
        selection: []
      }
    },
    mounted () {
      console.log(this.$refs.model)
    },
    computed: {
      hasSelection () {
        return this.selection.length > 0
      },
      bookFilter () {
        // 用函数式将书名包含terms内容的图书筛选出来
        return this.terms.length ? this.books.filter(x => x.name.indexOf(this.terms) > -1) : this.books
      }
    },
    methods: {
      sorted (key) {
        return key === this.sortingKey
      },
      sortBy (key) {
        if (key === this.sortingKey) {
          // 对排序方向进行互斥式交换
          this.direction = this.direction === 'asc' ? 'desc' : 'asc'
        }
        this.sortingKey = key
        this.books = _.orderBy(this.books, key, this.direction)
      },
      selectionChanged (book, e) {
        if (e.target.checked) {
          this.selection.push(book.isbn)
          // 取唯一值
          this.selection = _.uniq(this.selection)
        } else {
          // 排除符合条件的数据并返回新的数组
          this.selection = _.reject(this.selection, b => book.isbn === b)
        }
      },
      filterByBookName (terms) {
        this.terms = terms
        // this.fetchBooks(1, terms)
      },
      removeBooks () {
        alert('!')
      },
      newBook () {
        this.current = {}
        this.statusText = '添加新的图书'
        console.log(this.$refs)
        this.$refs.model.open()
      },
      save () {
        this.bookService.save(this.current)
        this.refreshBooks()
      },
      close () {
        this.$refs.model.close()
      }
    },
    components: {
      pageHeader: PageHeader,
      searchBox: SearchBox,
      countBooks: CountBooks,
      ukButton: UkButton,
      model: Model
    }
  }
</script>
