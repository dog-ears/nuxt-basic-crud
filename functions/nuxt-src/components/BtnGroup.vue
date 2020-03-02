<template>
  <div>
    <b-button
      type="is-warning"
      icon-right="content-duplicate"
      @click="openModal('duplicate')"
    />
    <b-button
      type="is-success"
      icon-right="pencil"
      @click="openModal('edit')"
    />
    <b-button type="is-danger" icon-right="delete" @click="onDelete()" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalConfirm from '~/components/ModalConfirm'

export default {
  props: {
    moduleName: {
      type: String,
      required: true
    },
    itemProps: {
      type: Object,
      required: true
    },
    editModalProps: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteItem(dispatch, item) {
        dispatch(this.moduleName + '/deleteSingle', item)
      }
    }),
    openModal(mode) {
      if (process.env.console_process) {
        console.log('component/BtnGroup - openModal() is called!')
      }
      this.$buefy.modal.open({
        parent: this,
        component: this.editModalProps,
        props: { modeProps: mode, itemProps: this.itemProps },
        hasModalCard: true,
        scroll: 'keep'
      })
    },
    onDelete() {
      if (process.env.console_process) {
        console.log('component/BtnGroup - onDelete() is called!')
      }
      this.$buefy.modal.open({
        parent: this,
        component: ModalConfirm,
        props: {
          messageProps: '本当に削除してもよろしいですか？',
          itemProps: this.itemProps
        },
        hasModalCard: true,
        scroll: 'keep',
        events: {
          delete: this.deleteItem
        }
      })
      this.$router.push({ path: '/categories' })
    }
  }
}
</script>
