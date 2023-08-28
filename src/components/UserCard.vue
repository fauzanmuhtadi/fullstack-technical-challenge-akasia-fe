<template>
  <div class="border border-stone-400 rounded p-5 flex justify-between">
    <div class="flex">
      <img v-if="avatar !== null" class="h-12 w-12 mr-5" alt="avatar" :src="avatar" />
      <img v-else class="h-12 w-12 mr-5" alt="avatar" src="@/assets/image/teamwork.png" />
      <div>
        <p class="text-left font-bold">{{ first_name }} {{ last_name }}</p>
        <p class="text-left text-sm">{{ email }}</p>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="font-semibold text-white bg-orange-500 cursor-pointer px-3 py-1 border rounded border-orange-200 mr-3" @click="editUser(id)">edit</div>
      <div class="font-semibold text-white bg-red-500 cursor-pointer px-3 py-1 border rounded border-red-200" @click="deleteUser(id)">delete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    id: Number,
    avatar: String,
    email: String,
    first_name: String,
    last_name: String,
    editUser: Function,
    deleteUser: Function
  }
}
</script>
