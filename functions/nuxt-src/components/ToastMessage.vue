<template>
  <input type="hidden" name="toastMessage" :value="toastMessage" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      toastMessage: 'getToastMessage'
    })
  },
  updated() {
    if (process.env.console_process) {
      console.log('component/ToastMessage updated() is called!')
    }
    if (this.toastMessage !== '') {
      this.$buefy.toast.open(this.toastMessage)
      this.clearToastMessage()
    }
  },
  methods: {
    ...mapActions({
      clearToastMessage: 'clearToastMessage'
    })
  }
}
</script>
