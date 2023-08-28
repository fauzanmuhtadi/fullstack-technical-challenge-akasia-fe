<template>
  <div id="app">
    <ModalCustom :modalVisible="isAddModal" :closeIconVisible="false" id="addUser" @close="hideAddUserModal">
      <template slot="modal-content">
        <div class="p-2">
          <h1 class="mb-5 text-center text-xl font-bold">Add User</h1>
          <div class="mb-3 flex justify-center">
            <div class="w-1/2 flex justify-between items-center border border-stone-300 px-2 py-1.5 rounded">
              <label for="user-avatar" :class="dataAvatar === null ? 'text-gray-400' : 'text-black'">avatar</label>
              <input name="user-avatar" type="file" placeholder="avatar" accept="image/*" @change="selectFile($event)" class="w-1/2 text-transparent" />
            </div>
          </div>
          <div class="mb-3">
            <input type="text" placeholder="first name" v-model="first_name" class="w-1/2 border border-stone-300 p-2 rounded" />
          </div>
          <div class="mb-3">
            <input type="text" placeholder="last name" v-model="last_name" class="w-1/2 border border-stone-300 p-2 rounded" />
          </div>
          <div class="mb-5">
            <input type="text" placeholder="name@email.com" v-model="email" class="w-1/2 border border-stone-300 p-2 rounded" />
          </div>
          <div class="flex justify-center">
            <div class="w-4/12 flex justify-between items-center">
              <div class="font-semibold text-white bg-green-500 cursor-pointer px-3 py-1 border rounded border-green-200 mr-3" @click="addUser">save</div>
              <div class="font-semibold text-white bg-red-500 cursor-pointer px-3 py-1 border rounded border-red-200" @click="hideAddUserModal">cancel</div>
            </div>
          </div>
        </div>
      </template>
    </ModalCustom>
    <ModalCustom :modalVisible="isEditModal" :closeIconVisible="false" id="editUser" @close="hideEditUserModal">
      <template slot="modal-content">
        <div class="p-2">
          <h1 class="mb-5 text-center text-xl font-bold">Edit User</h1>
          <div class="mb-3 flex justify-center">
            <div class="w-1/2 flex justify-between items-center border border-stone-300 px-2 py-1.5 rounded">
              <label for="user-avatar" :class="dataAvatar === null ? 'text-gray-400' : 'text-black'">avatar</label>
              <input name="user-avatar" type="file" placeholder="avatar" accept="image/*" @change="selectFile($event)" class="w-1/2 text-transparent" />
            </div>
          </div>
          <div class="mb-3">
            <input type="text" placeholder="first name" v-model="first_name" class="w-1/2 border border-stone-300 p-2 rounded" />
          </div>
          <div class="mb-3">
            <input type="text" placeholder="last name" v-model="last_name" class="w-1/2 border border-stone-300 p-2 rounded" />
          </div>
          <div class="mb-5">
            <input disabled type="text" placeholder="name@email.com" v-model="email" class="w-1/2 bg-stone-200 border border-stone-300 p-2 rounded" />
          </div>
          <div class="flex justify-center">
            <div class="w-4/12 flex justify-between items-center">
              <div class="font-semibold text-white bg-green-500 cursor-pointer px-3 py-1 border rounded border-green-200 mr-3" @click="updateUser">save</div>
              <div class="font-semibold text-white bg-red-500 cursor-pointer px-3 py-1 border rounded border-red-200" @click="hideEditUserModal">cancel</div>
            </div>
          </div>
        </div>
      </template>
    </ModalCustom>
    <ModalCustom :modalVisible="isDeleteModal" :closeIconVisible="false" id="deleteUser" @close="hideDeleteUserModal">
      <template slot="modal-content">
        <div class="p-2">
          <h1 class="mb-5 text-center text-xl font-bold">Are you sure?</h1>
          <div class="flex justify-center">
            <div class="w-3/12 flex justify-between items-center">
              <div class="font-semibold text-white bg-green-500 cursor-pointer px-3 py-1 border rounded border-green-200 mr-3" @click="deleteUser">yes</div>
              <div class="font-semibold text-white bg-red-500 cursor-pointer px-3 py-1 border rounded border-red-200" @click="hideDeleteUserModal">no</div>
            </div>
          </div>
        </div>
      </template>
    </ModalCustom>
    <div class="flex justify-center">
      <div class="flex items-center mb-10">
        <img class="h-20 w-20 mr-5" src="@/assets/image/teamwork.png" />
        <div>
          <p class="text-4xl font-bold">LIST OF USER</p>
          <div class="w-1/3 font-semibold text-white bg-sky-500 cursor-pointer px-3 py-1 border rounded border-sky-200 mr-3" @click="showAddUserModal">add</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-1/2">
        <div v-if="users.length > 0">
          <UserCard
            v-for="(user, index) in users"
            :key="`user-${index}`"
            :class="index === users.length - 1 ? '' : 'mb-3'"
            :id="user.id"
            :avatar="user.avatar"
            :first_name="user.first_name"
            :last_name="user.last_name"
            :email="user.email"
            :editUser="showEditUserModal"
            :deleteUser="showDeleteUserModal"
          />
        </div>
        <div v-else>
          <p>No data available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/method'
import notification from '@/utils/notification.js'
export default {
  name: 'App',
  components: {
    UserCard: () => import(/* webpackChunkName: "user-card" */ '@/components/UserCard.vue'),
    ModalCustom: () => import(/* webpackChunkName: "modal" */ '@/components/ModalCustom.vue')
  },
  data: () => ({
    users: [],
    userId: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    dataAvatar: null,
    isAddModal: false,
    isEditModal: false,
    isDeleteModal: false
  }),
  mounted() {
    this.getAllUser()
  },
  methods: {
    getAllUser() {
      api.getUsers({}).then(
        (response) => (this.users = response.data.result),
        (error) => notification.errorMessage(error.response.data.message)
      )
    },
    showDeleteUserModal(userId) {
      this.userId = userId
      this.isDeleteModal = true
    },
    showEditUserModal(userId) {
      api
        .getUserById({
          params: { id: userId }
        })
        .then(
          (response) => {
            let user = response.data.result
            this.userId = user.id
            this.first_name = user.first_name
            this.last_name = user.last_name
            this.email = user.email
            this.avatar = user.avatar
            this.isEditModal = true
          },
          (error) => notification.errorMessage(error.response.data.message)
        )
    },
    showAddUserModal() {
      this.userId = ''
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.avatar = ''
      this.dataAvatar = null
      this.isAddModal = true
    },
    hideDeleteUserModal() {
      this.isDeleteModal = false
    },
    hideEditUserModal() {
      this.isEditModal = false
    },
    hideAddUserModal() {
      this.isAddModal = false
    },
    deleteUser() {
      api
        .deleteUserById({
          params: { id: this.userId }
        })
        .then(
          () => {
            this.hideDeleteUserModal()
            notification.successMessage('Delete user successfully')
            this.getAllUser()
          },
          (error) => notification.errorMessage(error.response.data.message)
        )
    },
    updateUser() {
      if (this.dataAvatar !== null) {
        api
          .updateAvatarById({
            params: { id: this.userId },
            requestBody: this.dataAvatar
          })
          .then(
            (response) => this.update(response.data.result.url),
            (error) => notification.errorMessage(error.response.data.message)
          )
      } else {
        this.update(null)
      }
    },
    update(url) {
      api
        .updateUserById({
          params: { id: this.userId },
          requestBody: {
            first_name: this.first_name,
            last_name: this.last_name,
            avatar: url
          }
        })
        .then(
          () => {
            this.hideEditUserModal()
            notification.successMessage('Update user successfully')
            this.getAllUser()
          },
          (error) => notification.errorMessage(error.response.data.message)
        )
    },
    addUser() {
      if (this.email !== '' && this.dataAvatar !== null) {
        api
          .upload({
            requestBody: this.dataAvatar
          })
          .then(
            (response) => this.saveUser(response.data.result.url),
            (error) => notification.errorMessage(error.response.data.message)
          )
      } else if (this.email !== '') {
        this.saveUser(null)
      } else {
        notification.errorMessage('Email is required')
      }
    },
    saveUser(url) {
      api
        .addUser({
          requestBody: {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            avatar: url
          }
        })
        .then(
          () => {
            this.hideAddUserModal()
            notification.successMessage('Create user successfully')
            this.getAllUser()
          },
          (error) => notification.errorMessage(error.response.data.message)
        )
    },
    selectFile(event) {
      const document = event.target.files[0]
      if (document.type !== 'image/jpg' && document.type !== 'image/jpeg' && document.type !== 'image/png') {
        notification.errorMessage('File format must be jpg or png!')
      } else if (document.size >= 1000000) {
        notification.errorMessage('File size must lower than 1 MB!')
      } else {
        const selectedFiles = event.target.files[0]
        const nameFile = event.target.files[0].name
        const data = new FormData()
        data.append('file', selectedFiles)
        data.append('title', nameFile)
        this.dataAvatar = data
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 50px;
}
</style>
