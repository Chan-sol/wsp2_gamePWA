<template>
  <div>
    <v-list>
        <v-list-item value="true" v-for="(item, i) in fnGetMenuItems" :to="item.to" :key="i">
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
    computed: {
      fnGetAuthStatus() {
        return this.$store.getters.fnGetAuthStatus
      },
      fnGetMenuItems() {
        if(this.fnGetAuthStatus){
          return [
            {
              title: 'Main Page',
              to: '/main',
              icon: 'mdi-home'
            }
          ]
        }
        else {
          return [
            {
              title: 'Start Page',
              to: '/',
              icon: 'mdi-launch'
            }
          ]
        }
      },
    }
}
</script>
