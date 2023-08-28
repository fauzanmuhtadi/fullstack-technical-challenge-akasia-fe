<template>
  <div :id="`modal-${id}`">
    <transition name="fade" appear>
      <div class="modal-wrapper" v-if="modalVisible">
        <div class="modal-overlay" @click="closeModal" v-if="modalVisible"></div>
        <div class="modal max-h-9/10 mdmax:max-h-4/5" :class="[type === 'full' ? 'p-0' : 'p-6', { 'rounded-md': corner === 'rounded' }]" :style="{ maxWidth: width }" role="dialog">
          <div
            class="absolute cursor-pointer flex justify-center items-center"
            :class="[type === 'full' ? '-right-4 -top-4 bg-white w-8 h-8 rounded-full shadow-small text-green-1' : 'right-4 top-4']"
            @click="closeModal"
            v-if="closeIconVisible"
          >
            <CloseIcon />
          </div>
          <div class="modal-body" :style="closeIconVisible ? 'margin-top: 20px;' : ''">
            <slot name="modal-content"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'ModalCustom',
  components: {
    CloseIcon: () => import(/* webpackChunkName: "close-icon" */ '@/assets/image/CloseIcon.vue')
  },
  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    closeIconVisible: {
      type: Boolean,
      default: true
    },
    id: {
      type: String
    },
    initFunction: {
      type: Function
    },
    width: {
      type: String,
      default: '500px'
    },
    type: {
      type: String,
      default: 'regular'
    },
    corner: {
      type: String,
      default: 'rounded'
    }
  },
  watch: {
    $route: function () {
      this.disableScrollLock()
    },
    modalVisible(val) {
      if (val) {
        this.enableScrollLock()
        if (this.initFunction) this.initFunction()
      } else {
        this.disableScrollLock()
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    disableScrollLock() {
      document.body.style['overflow-y'] = ''
    },
    enableScrollLock() {
      document.body.style['overflow-y'] = 'hidden'
    }
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
}
.modal-body {
  max-height: 600px;
  overflow-y: auto;
  width: 100%;
}
.modal {
  position: relative;
  display: flex;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 2;
  height: auto;
  &-overlay {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: #2c3e50;
    opacity: 0.6;
  }
}
</style>
