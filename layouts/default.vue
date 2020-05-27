<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account-cog</v-icon>
      </v-btn> -->
      <v-menu eager flat dark nudge-bottom="40" nudge-left="50">
        <template v-slot:activator="{ on }">
          <v-btn text class="toolbar-button body-2" dark v-on="on">
            Add username here
            <v-icon size="18">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list flat light dense subheader>
          <v-list-item>
            <v-btn text class="toolbar-button-item body-2">
              {{ $t('app-bar.settings.profile') }}
            </v-btn>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-container fluid class="pa-0 ma-0">
              <v-row no-gutters>
                <v-col class="ml-4 mt-2">
                  <span class="toolbar-button body-2">{{ $t('app-bar.settings.theme.label') }}</span>
                </v-col>
              </v-row>
              <v-row no-gutters align="center">
                <v-col class="mr-2">
                  <span class="toolbar-button body-2">{{ $t('app-bar.settings.theme.dark') }}</span>
                </v-col>
                <v-col>
                  <v-switch v-model="$vuetify.theme.dark" />
                </v-col>
                <v-col class="ml-1">
                  <span class="toolbar-button body-2">{{ $t('app-bar.settings.theme.light') }}</span>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>
          <v-divider/>
          <v-list-item>
            <v-btn text class="toolbar-button-item  body-2">
              {{ $t('app-bar.settings.logout') }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      width="300px"
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
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!--
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import { SidebarMenu } from 'vue-sidebar-menu'

export default {
  // components: {
  //   SidebarMenu
  // },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
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
      ],
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted () {
    // Expand drawer item on page reload
    const test = this.items.find((i) => {
      return !i.to && i.title.toLowerCase() === this.$route.name.split('-')[0]
    })
    if (test) { test.active = true }
  },
  methods: {
    changeLanguage (lang) {
      this.$store.commit('language-store/SET_LANG', lang)
      this.$i18n.locale = lang
    }
  }
}
</script>
