<template>
  <button class="button is-primary is-medium" @click="openModal('create')">
    Create
  </button>
</template>

<script>
export default {
  props: {
    editModalProps: {
      type: Object,
      required: true
    }
  },
  methods: {
    openModal(mode) {
      if (process.env.console_process) {
        console.log('component/BtnCreate - openModal() is called!')
      }
      this.$buefy.modal.open({
        parent: this,
        component: this.editModalProps,
        props: { modeProps: mode },
        hasModalCard: true,
        scroll: 'keep'
      })
    }
  }
}
</script>
