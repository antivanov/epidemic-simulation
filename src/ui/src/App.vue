 
<template>
  <v-app id="main-page">
    <v-app-bar :clipped-left="true" app>
      <v-toolbar-title>Pandemic Simulation</v-toolbar-title>
    </v-app-bar>
    <router-view/>
    <v-footer
      :inset="false"
      app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }} Anton Ivanov https://github.com/antivanov</span>
    </v-footer>
  </v-app>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>