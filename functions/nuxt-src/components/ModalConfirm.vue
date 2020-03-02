<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">確認</p>
      </header>
      <section class="modal-card-body">
        <p>{{ messageProps }}</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Cancel
        </button>
        <button class="button is-primary">
          Delete
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    messageProps: {
      type: String,
      required: true
    },
    itemProps: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      item: {
        id: this.itemProps.id,
        name: this.itemProps.name,
        createdAt: this.itemProps.createdAt,
        deletedAt: this.itemProps.deletedAt
      }
    }
  },
  methods: {
    onSubmit() {
      if (process.env.console_process) {
        console.log('onSubmit() is called!')
      }
      this.$emit('delete', this.item)
      this.$parent.close()
    }
  }
}
</script>
