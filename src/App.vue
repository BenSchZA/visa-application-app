<template>
  <v-app>
    <v-progress-linear v-if="$store.state.inTransaction" style="margin: 0;" ref="progressBar" :indeterminate="true" height="4"></v-progress-linear>

    <v-navigation-drawer
      persistent
      :clipped="true"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      v-if="$store.state.userSignedIn"
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="item.action()"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="true"
      v-if="$store.state.userSignedIn"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        items: [{
          icon: 'person',
          title: 'Sign out',
          action:() => {
            this.$store.commit('signOut')
          }
        }],
        title: 'Visa Application'
      }
    },
    name: 'App'
  }
</script>
