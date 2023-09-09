import { defineStore } from 'pinia';

export const useSessionStore = defineStore('user', {
  state: () => ({ _user: {}, _isAuthenticated: false }),
  getters: {
    user: (state) => state._user,
    isAuthenticated: (state) => state._isAuthenticated,
  },
  actions: {
    setUser(user) {
      this._isAuthenticated = !!user;
      this._user = user;
    },
    logoutUser() {
      this._isAuthenticated = false;
      this._user = '';
    },
    hasRoles(roles = []) {
      let hasRole = false;
      roles.forEach(role => {
        hasRole = hasRole || (this._user.roles || []).indexOf(role) !== -1;
      })
      return hasRole;
    }
  }
});