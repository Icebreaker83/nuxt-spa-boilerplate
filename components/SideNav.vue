<template>
  <v-navigation-drawer
    :value="!collapsed"
    clipped
    fixed
    app
    width="280px"
  >
    <v-list>
      <v-container v-for="item in menu" :key="item.title" class="pa-0">
        <!-- If item has group prop, then item group is created with subitems -->
        <v-list-group
          v-if="item.group"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
            class="pl-20"
          >
            <v-list-item-content>
              {{ subItem.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- else item is created -->
        <v-list-item
          v-else
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-container>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import sideNavMixin from '~/mixins/side-nav'

export default {
  mixins: [sideNavMixin],
  computed: {
    ...mapGetters({
      collapsed: 'sidebar/collapsed'
    }),
    groupIsActive () {
      const activeListGroup = this.menu.find((item) => {
        return item.group && item.name === this.$auth.options.redirect.home.split('/')[1]
      })
      return activeListGroup.length === 1
    },
    menu () {
      const menu = [
        {
          title: this.$t('side-nav.dashboard.title'),
          to: '/',
          icon: 'mdi-apps'
        },
        ...this.administrationItem
      ]
      return menu
    },
    administrationItem () {
      const menuArray = [
        {
          title: this.$t('side-nav.administration.title'),
          icon: 'mdi-microsoft',
          group: true,
          name: 'administration',
          active: false,
          subItems: [...this.organizationsItem, ...this.usersItem, ...this.rolesItem]
        }
      ]
      return this.canViewAdministration() ? menuArray : []
    },
    organizationsItem () {
      const menuArray = [
        {
          title: this.$t('side-nav.administration.organizations'),
          to: '/administration/organizations'
        }
      ]
      return this.canViewOrganizations() ? menuArray : []
    },
    usersItem () {
      const menuArray = [
        {
          title: this.$t('side-nav.administration.users'),
          to: '/administration/users'
        }
      ]
      return this.canViewUsers() ? menuArray : []
    },
    rolesItem () {
      const menuArray = [
        {
          title: this.$t('side-nav.administration.roles'),
          to: '/administration/roles'
        }
      ]
      return this.canViewRoles() ? menuArray : []
    }
  },
  watch: {
    // Expand drawer group item when logging in after timeout loggout
    '$auth.loggedIn' (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.setActiveGroup()
      }
    }
  },
  beforeMount () {
    // Expand drawer group item on page reload
    this.setActiveGroup()
  },
  methods: {
    setActiveGroup () {
      const storedPath = this.$store.getters['sidebar/path']
      if (storedPath === '/') { return }
      const activeListGroup = this.menu.find((item) => {
        return item.group && item.name === storedPath.split('/')[1]
      })
      if (activeListGroup) {
        activeListGroup.active = true
      }
    }
  }
}
</script>
