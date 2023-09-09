# lts-stats-web

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Environmental Properties
- **VITE_API_BASE**: `http://localhost:3000/api/v1`
- **VITE_API_PATH_LIST**: `/list/today`
- **VITE_API_PATH_WHITELIST**: `/whitelist`
- **VITE_API_PATH_NOW_SESSIONS**: `/ivao/sessions/now`
- **VITE_API_PATH_NOW_FLIGHTPLANS**: `/ivao/flightplans/latest`
- **VITE_API_PATH_AUTHENTICATION**: `/admin/user/authenticate`
- **VITE_API_PATH_PASSWORD_CHANGE**: `/admin/user/password-change`
- **VITE_API_PATH_ALIVE**: `/admin/user/alive`
- **VITE_API_PATH_LOGOUT**: `/admin/user/logout`
- **VITE_API_PATH_IVAO_WAZZUP**: `/ivao/wazzup`
- **VITE_API_PATH_ACARS_USER_POSITION**: `/acars/position`