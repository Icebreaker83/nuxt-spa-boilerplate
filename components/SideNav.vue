<template>
  <v-navigation-drawer
    :value="collapsed"
    clipped
    fixed
    app
    width="270px"
  >
    <v-list>
      <v-container v-for="item in items" :key="item.title" class="pa-0">
        <v-list-item
          v-if="item.to"
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
            class="pl-20"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-container>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      // collapsed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-microsoft',
          title: 'Administration',
          active: false,
          subItems: [
            {
              title: 'Users',
              to: '/administration/users'
            },
            {
              title: 'Roles',
              to: '/administration/roles'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      collapsed: 'sidebar/collapsed'
    })
  },
  mounted () {
    // Expand drawer item on page reload
    const activeListGroup = this.items.find((i) => {
      return !i.to && i.title.toLowerCase() === this.$route.name.split('-')[0]
    })
    if (activeListGroup) { activeListGroup.active = true }
  }
}
</script>
