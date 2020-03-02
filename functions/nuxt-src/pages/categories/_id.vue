<template>
  <section class="section">
    <div>
      <h1 class="title">{{ title }} / Show #{{ id }}</h1>
      <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
        <ul>
          <li><a href="/">Top</a></li>
          <li>
            <a :href="'/' + moduleName">{{ title }}</a>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">{{ id }}</a>
          </li>
        </ul>
      </nav>
      <div v-if="category">
        ID:{{ category.id }}<br />
        Name:{{ category.name }}<br />
        createdAt:{{ category.createdAt }}<br />
        deletedAt:{{ category.deletedAt }}
      </div>
      <BtnGroup
        v-if="category"
        :module-name="moduleName"
        :item-props="category"
        :edit-modal-props="modalFormCategories"
      ></BtnGroup>
    </div>
    <ToastMessage></ToastMessage>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import h from 'htmlspecialchars'
import ModalFormCategories from '~/components/ModalFormCategories'
import BtnGroup from '~/components/BtnGroup'
import ToastMessage from '~/components/toastMessage'

if (process.env.console_process) {
  console.log('pages/categories/_id')
}

export default {
  components: {
    BtnGroup,
    ToastMessage
  },
  async asyncData(ctx) {
    if (process.env.console_process) {
      await console.log('pages/categories/_id - asyncData() is called!')
    }
    return {
      id: h(ctx.params.id)
    }
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
      category: 'categories/getSingle'
    })
  },
  created() {
    if (process.env.console_process) {
      console.log('pages/categories/_id - created() is called!')
    }
    // 初回、カテゴリが空なら、初期化処理を行う
    Promise.all([this.category ? Promise.resolve() : this.initSingle(this.id)])
  },
  methods: {
    ...mapActions({
      initSingle: 'categories/initSingle'
    })
  }
}
</script>
