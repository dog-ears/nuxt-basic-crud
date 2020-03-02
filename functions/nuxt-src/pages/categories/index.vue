<template>
  <section class="section">
    <div>
      <h1 class="title">{{ title }}</h1>
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">Top</a></li>
          <li class="is-active">
            <a href="#" aria-current="page">{{ title }}</a>
          </li>
        </ul>
      </nav>
      <BtnCreate :edit-modal-props="modalFormCategories"></BtnCreate>
      <b-table
        :data="categories"
        :striped="true"
        :paginated="true"
        :per-page="10"
        :loading="!isLoaded"
        default-sort="createdAt"
        default-sort-direction="desc"
      >
        <template slot-scope="props">
          <b-table-column
            field="id"
            label="ID"
            :visible="false"
            width="40"
            sortable
            numeric
          >
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="name" label="NAME" sortable>
            <nuxt-link
              :to="{ name: 'categories-id', params: { id: props.row.id } }"
              >{{ props.row.name }}</nuxt-link
            >
          </b-table-column>
          <b-table-column field="createdAt" label="CREATED AT" sortable>
            {{ props.row.createdAt }}
          </b-table-column>
          <b-table-column
            field="deletedAt"
            label="DELETED AT"
            :visible="false"
            sortable
          >
            {{ props.row.deletedAt }}
          </b-table-column>
          <b-table-column label="EDIT" width="144">
            <BtnGroup
              :module-name="moduleName"
              :item-props="props.row"
              :edit-modal-props="modalFormCategories"
            ></BtnGroup>
          </b-table-column>
        </template>
        <template slot="empty">
          <section v-if="isLoaded" class="section">
            <div class="content has-text-grey has-text-centered">
              <p><b-icon icon="emoticon-sad" size="is-large"></b-icon></p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
    <ToastMessage></ToastMessage>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalFormCategories from '~/components/ModalFormCategories'
import BtnGroup from '~/components/BtnGroup'
import BtnCreate from '~/components/BtnCreate'
import ToastMessage from '~/components/toastMessage'

if (process.env.console_process) {
  console.log('pages/categories')
}

export default {
  components: {
    BtnGroup,
    BtnCreate,
    ToastMessage
  },
  data() {
    return {
      title: 'Category',
      moduleName: 'categories',
      modalFormCategories: ModalFormCategories
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getAll',
      isLoaded: 'categories/isLoaded'
    })
  },
  created() {
    if (process.env.console_process) {
      console.log('pages/categories - created() is called!')
    }
    // 初回、カテゴリが空なら、初期化処理を行う
    Promise.all([this.categories.length ? Promise.resolve() : this.initAll()])
  },
  methods: {
    ...mapActions({
      initAll: 'categories/initAll'
    })
  }
}
</script>
