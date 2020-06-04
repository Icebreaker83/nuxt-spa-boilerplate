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
              <!-- {{ $t(`side-nav.${item.title}.title`) }} -->
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
              <!-- {{ $t(`side-nav.${subItem.title}.title`) }} -->
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
            <!-- {{ $t(`side-nav.${item.title}.title`) }} -->
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-container>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
// import { hasAdminClaim } from '@/util/claims'

export default {
  data () {
    return {
      // By design, paths are not taken from router
      // Explicit definition of SideNav items is required in items Array
      // items: [
      //   {
      //     icon: 'mdi-apps',
      //     title: 'dashboard',
      //     to: '/'
      //   },
      //   {
      //     icon: 'mdi-microsoft',
      //     title: 'administration',
      //     group: true,
      //     active: false,
      //     subItems: [
      //       {
      //         title: 'administration.users',
      //         to: '/administration/users'
      //       },
      //       {
      //         title: 'administration.roles',
      //         to: '/administration/roles'
      //       }
      //     ]
      //   }
      // ],
      claims: []
    }
  },
  computed: {
    ...mapGetters({
      collapsed: 'sidebar/collapsed'
    }),
    menu () {
      return [
        {
          title: this.$t('side-nav.dashboard.title'),
          to: '/',
          icon: 'mdi-apps'
        },
        ...this.administrationItem
      ]
    },
    administrationItem () {
      const menuArray = [
        {
          title: this.$t('side-nav.administration.title'),
          icon: 'mdi-microsoft',
          group: true,
          name: 'administration',
          active: false,
          subItems: [...this.usersItem, ...this.rolesItem]
        }
      ]
      return this.claims.includes('Claim_Admin') || this.claims.includes('Claim_User_Create') || this.claims.includes('Claim_User_Review') || this.claims.includes('Claim_Organization_Review') ? menuArray : []
    },
    usersItem () {
      const menuArray = [
        {
          title: this.$t('side-nav.administration.users.title'),
          to: '/administration/users'
        }
      ]
      return this.claims.includes('Claim_Admin') || this.claims.includes('Claim_User_Create') ? menuArray : []
    },
    rolesItem () {
      const menuArray = [
        {
          title: this.$t('side-nav.administration.roles.title'),
          to: '/administration/roles'
        }
      ]
      return this.claims.includes('Claim_Admin') || this.claims.includes('Claim_User_Create') ? menuArray : []
    }
  },
  mounted () {
    this.claims = this.$auth.user.creationClaims.map(claim => claim.name)
    // Expand drawer item on page reload
    const activeListGroup = this.menu.find((item) => {
      return item.group && item.name === this.$auth.options.redirect.home.split('/')[1]
    })
    if (activeListGroup) { activeListGroup.active = true }
  },
  methods: {
  }
}
</script>
