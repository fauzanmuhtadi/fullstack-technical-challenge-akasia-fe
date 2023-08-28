import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast)

const notification = {
  defaultMessage: (message) => {
    return Vue.$toast.open({
      message,
      position: 'top',
      type: 'default'
    })
  },
  errorMessage: (message) => {
    return Vue.$toast.open({
      message,
      position: 'top',
      type: 'error'
    })
  },
  infoMessage: (message) => {
    return Vue.$toast.open({
      message,
      position: 'top',
      type: 'info'
    })
  },
  successMessage: (message) => {
    return Vue.$toast.open({
      message,
      position: 'top',
      type: 'success'
    })
  },
  warningMessage: (message) => {
    return Vue.$toast.open({
      message,
      position: 'top',
      type: 'warning'
    })
  }
}

export default notification
