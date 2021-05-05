<template>
  <div
    class="xl:container mx-2 xl:mx-auto rounded-md mb-4"
    v-if="thread != undefined"
  >
    <div class="flex flex-inline w-full mb-2">
      <div class="w-1/3 pr-1">
        <router-link :to="`/thread/${threadId}/${currentPage - 1}`">
          <button
            :disabled="currentPage == 1"
            class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            &lt;&lt;&nbsp; Anterior
          </button>
        </router-link>
      </div>

      <div class="w-1/3 px-1">
        <div
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ currentPage }}
          /
          {{ totalPages }}
        </div>
      </div>

      <div class="w-1/3 pl-1">
        <router-link :to="`/thread/${threadId}/${currentPage + 1}`">
          <button
            :disabled="currentPage == totalPages"
            class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Siguiente &nbsp;&gt;&gt;
          </button>
        </router-link>
      </div>
    </div>

    <p
      class="w-full border-b p-2 bg-yellow-300 rounded-t-md text-3xl shadow-sm"
    >
      {{ title }}
    </p>

    <section
      class="text-gray-600 body-font overflow-hidden bg-white shadow-lg rounded-b-md"
    >
      <div class="px-6">
        <div class="divide-y-2 divide-gray-100">
          <div
            class="flex flex-wrap md:flex-nowrap py-4"
            v-for="post in getCurrentPagePosts()"
            :key="post.id"
            :id="post.id"
          >
            <div
              class="md:w-56 md:mb-0 mb-6 flex-shrink-0 flex flex-col w-full text-center"
            >
              <p class="text-xl font-bold mb-2">{{ post.author }}</p>
              <p class="text-gray-500 text-xs">{{ post.registrationDate }}</p>
              <p class="text-gray-500 text-xs">
                {{ post.numMessages }} mensajes
              </p>
            </div>
            <div class="md:flex-grow md:border-l md:pl-4 md:border-gray-600">
              <p class="leading-relaxed" v-html="post.content"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="flex flex-inline w-full mt-2">
      <div class="w-1/3 pr-1">
        <router-link :to="`/thread/${threadId}/${currentPage - 1}`">
          <button
            :disabled="currentPage == 1"
            class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            &lt;&lt;&nbsp; Anterior
          </button>
        </router-link>
      </div>

      <div class="w-1/3 px-1">
        <div
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ currentPage }}
          /
          {{ totalPages }}
        </div>
      </div>

      <div class="w-1/3 pl-1">
        <router-link :to="`/thread/${threadId}/${currentPage + 1}`">
          <button
            :disabled="currentPage == totalPages"
            class="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Siguiente &nbsp;&gt;&gt;
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// TODO
// Paginación
const POSTS_PER_PAGE = 15;
const PAGES_PER_CHUNK = 100;

export default {
  data() {
    return {
      thread: undefined,
      threadId: 0,
      currentPage: 1,
      chunks: [],
      title: "",
      totalPages: 0,
    };
  },
  created() {
    this.threadId = this.$route.params.thread;
    this.currentPage = parseInt(this.$route.params.page);
    this.getChunk();
  },
  methods: {
    getCurrentPagePosts() {
      const chunk = Math.floor(this.currentPage / PAGES_PER_CHUNK) + 1;
      const pos = POSTS_PER_PAGE * (this.currentPage - 1);
      return this.thread[String(chunk)].posts.slice(pos, pos + POSTS_PER_PAGE);
    },
    getChunk(threadId) {
      const chunk = Math.floor(this.currentPage / PAGES_PER_CHUNK) + 1;

      if (!this.chunks.includes(chunk)) {
        fetch(`/api/${this.threadId}/chunk-${chunk}.json`)
          .then((response) => response.json())
          .then((data) => {
            this.chunks.push(chunk);
            if (this.thread == undefined) {
              this.thread = [];
              this.title = data.title;
              this.totalPages = data.totalPages;
              this.threadId = data.id;
            }
            this.thread[String(chunk)] = data;
          });
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.currentPage = parseInt(to.params.page);
        //this.getChunk()
      },
    },
  },
};
</script>

<style>
.bbc_emoticon {
  display: inline;
}
a.bbc_url {
  @apply text-blue-500;
  @apply underline;
}
</style>