<template>
  <div class="flex flex-col justify-between h-screen">
    <!-- HEADER -->
    <header class="xl:container mx-auto text-gray-600 body-font w-full">
      <div class="mx-auto flex flex-wrap px-4 py-2 flex-row items-center">
        <a
          class="flex title-font font-medium items-center text-gray-900 md:mb-0"
          href="/"
        >
          <img src="./assets/logo.png" class="w-12 h-12" />

          <span class="ml-3 text-xl">ZonaForo MeriStation</span>
        </a>
        <nav
          class="mr-auto ml-4 py-1 pl-4 border-l border-gray-400 flex flex-wrap items-center text-base justify-center"
        >
          <span>In Memoriam</span>
        </nav>
      </div>
    </header>
    <!-- END HEADER -->

    <!-- MAIN CONTENT -->
    <main class="pt-3 w-full bg-blue-100 shadow-inner pb-2">
      <router-view></router-view>
    </main>
    <div class="h-full bg-blue-100"></div>
    <!-- END MAIN CONTENT -->
  </div>
</template>