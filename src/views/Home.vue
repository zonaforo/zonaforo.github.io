<template>
  <div class="xl:container mx-2 xl:mx-auto">
    <div class="flex flex-wrap text-center mb-4 justify-around w-full">
      <input
        class="w-1/2 border border-gray-400 shadow-md py-1 px-2 rounded-md"
        v-model="searchTerm"
        placeholder="Búsqueda por título o autor..."
      />
    </div>

    <table
      class="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
    >
      <thead class="bg-gray-50">
        <tr>
          <th
            @click="changeSorting('title')"
            scope="col"
            class="pl-3 py-3 text-left text-xs font-medium text-gray-600 uppercase cursor-pointer"
          >
            Hilo
          </th>
          <th
            @click="changeSorting('author')"
            scope="col"
            class="pl-3 py-3 text-left text-xs font-medium text-gray-600 uppercase cursor-pointer"
          >
            Autor
          </th>
          <th
            @click="changeSorting('publicationDate')"
            scope="col"
            class="pl-3 py-3 text-left text-xs font-medium text-gray-600 uppercase cursor-pointer"
          >
            Fecha
          </th>
          <th
            @click="changeSorting('replies')"
            scope="col"
            class="pl-3 py-3 text-left text-xs font-medium text-gray-600 uppercase flex cursor-pointer"
          >
            Respuestas
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 text-sm bg-white">
        <tr
          v-for="thread in filterThreads()"
          :key="thread.id"
          class="hover:bg-yellow-300 cursor-pointer"
          @click="goToThread(thread.id)"
        >
          <td class="px-4 py-4 whitespace-nowrap">
            <p v-html="thread.title" />
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            {{ thread.author }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            {{ thread.publicationDate.replace("T", " ").replace("Z", "") }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            {{ thread.replies }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      threads: [],
      searchTerm: "",
      sortField: "publicationDate",
      sortAsc: false,
    };
  },
  mounted() {
    fetch("/api/index.json")
      .then((response) => response.json())
      .then((data) => {
        this.threads = data;
      });
  },
  methods: {
    filterThreads() {
      return this.threads
        .filter(
          (thread) =>
            thread.title
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase()) ||
            thread.author
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase())
        )
        .sort((a, b) => {
          let comparison = 0;
          if (typeof b[this.sortField] == "number") {
            comparison = b[this.sortField] - a[this.sortField];
          } else {
            comparison = b[this.sortField].localeCompare(a[this.sortField]);
          }

          return this.sortAsc ? comparison : comparison * -1;
        });
    },
    goToThread(id) {
      this.$router.push(`/thread/${id}/1`);
    },
    changeSorting(field) {
      if (this.sortField === field) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortField = field;
        this.sortAsc = true;
      }
    },
  },
};
</script>