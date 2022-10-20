<template>
  <div class="xl:container mx-2 xl:mx-auto rounded-md mb-4 justify-center">
    <div v-if="userInfo != undefined">
      <div class="w-full">
        <h1 class="text-3xl bg-white p-4 rounded-md shadow-md w-max">{{ userInfo.name }}</h1>
      </div>

      <div class="w-full bg-white rounded-md shadow-md px-4 py-2 mt-2" v-if="userInfo.threads.length > 0">
        <h2 class="text-xl border-b border-gray-200 mb-2">Hilos creados</h2>
        <div v-for="thread in userInfo.threads" :key="thread.id">
          <router-link :to="`/thread/${thread.thread}/1`">
            <div class="px-4 hover:bg-yellow-50 rounded-md p-4">
              <p class="text-lg">{{ thread.title }}</p>
              <div class="text-xs">
                <p class="pl-4 -mt-4" v-html="getCleanContent(thread.content)"></p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="w-full bg-white rounded-md shadow-md px-4 py-2 mt-2" v-if="userInfo.posts.length > 0">
        <h2 class="text-xl border-b border-gray-200 mb-2">Posts</h2>
        <div v-for="post in userInfo.posts" :key="post.id" class="border-b border-gray-200">
          <router-link :to="`/thread/${post.thread}/${post.page}#${post.id}`">
            <div class="px-4 hover:bg-yellow-50 rounded-md p-4">
              <p class="text-lg">{{ post.title }}</p>
              <p class="text-xs pl-3">{{ post.date }}</p>
              <div class="text-xs">
                <p class="p-4 bg-gray-50 rounded-md" v-html="getCleanContent(post.content)"></p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: undefined,
      userInfo: undefined
    }
  },
  created() {
    this.user = this.$route.params.user
    this.getUser()
  },
  methods: {
    getUser() {
      fetch(`/api/users/${this.user}.json`)
        .then((response) => response.json())
        .then((data) => {
          this.userInfo = data
        })
    },
    getCleanContent(content) {
      return content
        .replace(/<span class='ipsType_reset[^]*?<\/span>/gm, '')
        .replace(/img([^]*?)data-src="([^]*?)"([^]*?)src="[^]*?"/gm, 'img$1 $3 src="$2"')
        .replaceAll('http://meristation.as.com/zonaforo/uploads/emoticons/default_', '/emojis/')
    }
  }
}
</script>
