<template>
  <v-navigation-drawer
    :value="collapsed"
    clipped
    fixed
    app
    width="280px"
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
            {{ $t(`${item.title}`) }}
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
              {{ $t(`${item.title}`) }}
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
            class="pl-20"
          >
            <v-list-item-content>
              {{ $t(`${subItem.title}`) }}
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
      // By design, paths are not taken from router
      // Explicit definition of SideNav items is required in items Array
      items: [
        {
          icon: 'mdi-apps',
          title: 'side-nav.dashboard.title',
          to: '/'
        },
        {
          icon: 'mdi-microsoft',
          title: 'side-nav.administration.title',
          active: false,
          subItems: [
            {
              title: 'side-nav.administration.users.title',
              to: '/administration/users'
            },
            {
              title: 'side-nav.administration.roles.title',
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
  },
  methods: {
  }
}
</script>
