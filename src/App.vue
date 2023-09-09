<script>
// import { RouterLink, RouterView } from "vue-router";
// import { useAuth0 } from '@auth0/auth0-vue';

import { useSessionStore } from './stores/session-store';
import { authenticate, isAlive, logout } from './data/http/auth';
import { mapState } from 'pinia';
export default {
  setup() {
    const store = useSessionStore();

    const { setUser, logoutUser, hasRoles } = store;

    return {
      logoutUser,
      setUser,
      hasRoles
    }
  },
  async mounted() {
    const user = await isAlive();
    if (user) {
      this.setUser(user);
    }
  },  
  data() {
    return {
      showUserOptions: false,
      username: '',
      password: '',
      loading: true,
      list: [],
      whitelist: [],
      isNavMobileOpen: false,
    }
  },
  computed:{
    ...mapState(useSessionStore, ['user', 'isAuthenticated']),
  },
  methods: {
    toggleUserOptions() {
      this.showUserOptions = !this.showUserOptions;
    },
    toggleNavMobile() {
      this.isNavMobileOpen = !this.isNavMobileOpen;
    },
    async login() {
      if (!this.username.trim() || !this.password.trim()) {
        return;
      }
      const user = await authenticate(this.username, this.password);
      this.setUser(user);
      this.username = '';
      this.password = '';
      window.location.reload();
    },
    async logout() {
      await logout();
      this.logoutUser();
      this.$router.push('/');
    },
    async check() {
      await isAlive();
    }
  }
}

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="@/assets/images/logo_28.png" alt="Latin Streaming Alliance" class="logo">
      </a>

      <a role="button" class="navbar-burger" :class="{'is-active': isNavMobileOpen}" aria-label="menu" aria-expanded="false" @click="toggleNavMobile()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isNavMobileOpen}">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/ivao">IVAO</router-link>
        <!-- <router-link class="navbar-item" to="/acars" :is="'span'">Acars</router-link> -->
        <router-link v-if="hasRoles(['admin'])" class="navbar-item" to="/map">Live Map</router-link>

        <router-link v-if="hasRoles(['admin', 'cabal'])" class="navbar-item" to="/cabal">Capt Cabal</router-link>
        <router-link v-if="hasRoles(['admin'])" class="navbar-item" to="/admin">Admin</router-link>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-horizontal">
          <div v-if="!isAuthenticated" class="field-body">
            <div class="field">
              <p class="control is-expanded">
                <input class="input is-small input-login" @keyup.enter="login" v-model="username" type="text" placeholder="Username">
              </p>
            </div>
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input class="input is-small input-login" @keyup.enter="login" v-model="password" type="password" placeholder="Password">
              </p>
              <p class="control">
                <a class="button is-small is-light" @click="login">
                  Login
                </a>
              </p>
            </div>
          </div>
          <div v-if="isAuthenticated" class="field-body">
            <div class="dropdown is-right" :class="{'is-active': showUserOptions}">
              <div class="dropdown-trigger">
                <a href="#" @click.prevent.stop="toggleUserOptions" class="has-text-dark">{{ user.firstname }} {{ user.lastname }}</a>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                    <router-link class="navbar-item" to="/">Cambiar contraseña</router-link>
                  </a>
                  <hr class="dropdown-divider">
                  <a href="#" @click.prevent.stop="logout" class="dropdown-item">
                    Cerrar sesión
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <div> <RouterView /> </div>
  </div>   
</template>

<style lang="scss">
@import "~bulma/css/bulma.css";
// @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
.logo {
  margin-right: 0.2rem;
}
.input-login {
  width: 100px;
}
.loading-icon {
  margin-top: 24px;
  color: #ddd;
  width: 100%;
  text-align: center;;
}
</style>
