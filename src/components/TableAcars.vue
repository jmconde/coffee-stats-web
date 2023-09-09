<template>
  <section class="section">
      <h1 class="title">Pilotos activos con mas de 200 horas en ACARS</h1>      
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th class="has-text-centered">VID</th>
              <th class="">Nombre</th>
              <th class="has-text-centered">Total Vuelos</th>
              <th class="has-text-centered">Horas totales</th>
            </tr>
          </thead>
          <tbody v-show="isLoading">
            <tr>
              <td colspan="4">
                <div class="loading-icon">
                  <font-awesome-icon spin icon="fa-solid fa-spinner" size="2x" />
                </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="item in whitelist" :key="item.vid">
              <td class="has-text-centered">
                {{ item.vid  }}
              </td>
              <td>
                {{ item.name  }}
              </td>
              <td class="has-text-centered">
                {{ item.flights  }}
              </td>
              <td class="has-text-centered">
                <FormatTime :value="item.flightTime" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
</template>

<style lang="sass">

</style>

<script>
  import moment from 'moment';
  import { getWhitelist } from '../data/http/listRequest.js';
  import FormatTime from './FormatTime.vue';
  import 'vue-loading-overlay/dist/css/index.css';

  export default {
    data() {
      return {
        isLoading: true,
        whitelist: [],
      }
    },
    async mounted() {
      await this.loadData();
    },
    methods: {
      async loadData() {
        this.isLoading = true;
        this.whitelist = await getWhitelist();
        this.isLoading = false;
      }, 
      dateTime(value) {
        return moment(value).fromNow(); //.format('YYYY-MM-DD HH:mm');
      },
      flagIcon(code) {
        return new URL(`/public/flags/${code}.png`, import.meta.url).href
      }
    },
    components: {
      FormatTime,
    }
  }
</script>