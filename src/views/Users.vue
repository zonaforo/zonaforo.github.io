<template>
  <div class="xl:container mx-2 xl:mx-auto rounded-md mb-4 justify-center">
    <div class="w-full text-center my-2">
      <input v-model="searchText" class="w-1/2 rounded-md shadow-md p-2 text-gray-500" placeholder="Búsqueda de usuario" />
    </div>

    <div class="flex flex-inline w-full my-2">
      <div class="w-1/3 pr-1">
        <button
          @click="currentPage--"
          :disabled="currentPage == 1"
          class="
            disabled:opacity-50
            group
            relative
            w-full
            flex
            justify-center
            py-2
            px-4
            border border-transparent
            text-sm
            font-medium
            rounded-md
            bg-yellow-300
            hover:bg-yellow-400
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
          "
        >
          &lt;&lt;&nbsp; Anterior
        </button>
      </div>

      <div class="w-1/3 px-1">
        <div
          class="
            group
            relative
            w-full
            flex
            justify-center
            py-2
            px-4
            border border-transparent
            text-sm
            font-medium
            rounded-md
            bg-yellow-300
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
        >
          {{ currentPage }}
          /
          {{ Math.floor(filteredUsers().length / pageSize) + 1 }}
        </div>
      </div>

      <div class="w-1/3 pl-1">
        <button
          :disabled="currentPage == Math.floor(filteredUsers().length / pageSize) + 1"
          @click="currentPage++"
          class="
            disabled:opacity-50
            group
            relative
            w-full
            flex
            justify-center
            py-2
            px-4
            border border-transparent
            text-sm
            font-medium
            rounded-md
            bg-yellow-300
            hover:bg-yellow-400
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
          "
        >
          Siguiente &nbsp;&gt;&gt;
        </button>
      </div>
    </div>

    <div class="flex flex-wrap">
      <div v-for="user in showUsers()" :key="user.name" class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
        <div class="py-2 m-2 shadow-md border border-gray-200 rounded-md text-center bg-white">
          <p class="text-2xl text-clip">{{ user.name }}</p>
          <p class="text-sm">{{ user.date }}</p>
          <p class="text-sm">{{ user.messages }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const PAGE_SIZE = 60
export default {
  data() {
    return {
      users: [],
      currentPage: 1,
      searchText: '',
      pageSize: PAGE_SIZE
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      fetch(`/api/users/index.json`)
        .then((response) => response.json())
        .then((data) => {
          this.users = data
        })
    },
    filteredUsers() {
      return this.users.filter((users) => users.name.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    showUsers() {
      return this.filteredUsers().slice((this.currentPage - 1) * PAGE_SIZE, this.currentPage * PAGE_SIZE)
    }
  },
  watch: {
    searchText() {
      this.currentPage = 1
    }
  }
}
</script>
