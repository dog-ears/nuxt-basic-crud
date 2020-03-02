<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p v-if="modeProps === 'create'" class="modal-card-title">
          CATEGORY / Create
        </p>
        <p v-if="modeProps === 'edit'" class="modal-card-title">
          CATEGORY / Edit
        </p>
        <p v-if="modeProps === 'duplicate'" class="modal-card-title">
          CATEGORY / Duplicate
        </p>
      </header>
      <section class="modal-card-body">
        <b-field label="NAME">
          <b-input v-model="item.name" type="text" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Cancel
        </button>
        <button
          v-if="modeProps === 'create' || modeProps === 'duplicate'"
          class="button is-primary"
        >
          Create
        </button>
        <button v-if="modeProps === 'edit'" class="button is-primary">
          Save
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    modeProps: {
      type: String,
      required: true
    },
    itemProps: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      mode: this.modeProps,
      item: {
        id: this.itemProps ? this.itemProps.id : null,
        name: this.itemProps ? this.itemProps.name : null,
        createdAt: this.itemProps ? this.itemProps.createdAt : null,
        deletedAt: this.itemProps ? this.itemProps.deletedAt : null
      }
    }
  },
  methods: {
    ...mapActions({
      create: 'categories/createSingle',
      save: 'categories/saveSingle'
    }),
    onSubmit() {
      if (process.env.console_process) {
        console.log('ModalFormCategories - onSubmit() is called!')
      }
      if (this.modeProps === 'edit') {
        this.save(this.item)
      } else {
        this.create(this.item)
        this.$router.push({ path: '/categories' })
      }
      this.$parent.close()
    }
  }
}
</script>
