<template>
    <v-list>
        <v-list-item value="true" v-for="(item, i) in fnGetMenuItems" :to="item.to" :key="i">
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
    </v-list>
</template>
<script>
export default {
    computed: {
      fnGetAuthStatus() {
        return this.$store.getters.fnGetAuthStatus
      },
      fnGetMenuItems() {
        return [
          {
            title: 'Login Page',
            to: '/first',
            icon: 'mdi-launch'
          }
        ]
      },
    }
}
</script>