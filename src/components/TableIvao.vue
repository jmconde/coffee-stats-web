<template>
  <section class="section">
    <!-- <loading class="mt-6" v-model:active="isLoading" 
                 :can-cancel="false"/> -->
      <h1 class="title">Status mensual IVAO</h1> 
        <table class="table is-striped is-hoverable is-fullwidth" v-if="!$isMobile()">
          <thead>
            <tr>
              <th class="has-text-centered">VID</th>
              <th class="">Nombre</th>
              <th class="has-text-centered">Horas en session</th>
              <th class="has-text-centered">Horas en el aire</th>
              <th class="has-text-centered">Último vuelo</th>
            </tr>
          </thead>
          <tbody v-show="isLoading">
            <tr>
              <td colspan="5">
                <div class="loading-icon">
                  <font-awesome-icon spin icon="fa-solid fa-spinner" size="2x" />
                </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="item in list" :key="item.vid">
              <td class="has-text-centered">
                {{ item.vid  }}
              </td>
              <td>
                {{ item.name  }} ({{ item.division  }} <img v-if="item.division" :src="flagIcon(item.division.toLowerCase())" :alt="item.division" :title="item.division" @error="fallbackIcon" />)
              </td>
              <td class="has-text-centered">
                <FormatTime :value="item.sessionsTime / 60" />
              </td>
              <td class="has-text-centered">
                <FormatTime :value="item.time / 60" />
              </td>
              <td class="">
                <div class="is-size-6">
                  {{ item.lastFlight.departureId }} - {{ item.lastFlight.arrivalId }} <span class="is-size-7 ml-1 has-text-grey-light">{{ dateTime(item.lastFlightDate) }}</span>
                </div>
                  <div class="field is-grouped is-grouped-multiline">
                    <div class="control">
                      <div class="tags has-addons">
                        <span class="tag is-dark">Callsign</span>
                        <span class="tag">{{ item.lastCallsign }}</span>
                      </div>
                    </div>
                    <div class="control">
                      <div class="tags has-addons">
                        <span class="tag is-dark">Aircraft</span>
                        <span class="tag">{{ item.lastFlight.aircraftId }}</span>
                      </div>
                    </div>
                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <div class="box is-shadowless mb-1" v-for="item in list" :key="item.vid">
            <p class="has-text-weight-bold is-size-7 is-uppercase">{{ item.name  }} ({{ item.division  }} <img v-if="item.division" :src="flagIcon(item.division.toLowerCase())" :alt="item.division" :title="item.division" />)</p>
            <p class="has-text-weight-light is-size-7">VID: {{ item.vid  }}</p>
            <p class="has-text-weight-light is-size-7">Horas en el aire : <FormatTime :value="item.time / 60" /></p>
            <p class="has-text-weight-light is-size-7">Horas en session : <FormatTime :value="item.sessionsTime / 60" /></p>
            
            <h5 class="mt-2 has-text-weight-bold is-size-7 is-uppercase">Último vuelo</h5>
            <div class="is-size-7">
              {{ item.lastFlight.departureId }} - {{ item.lastFlight.arrivalId }} <span class="is-size-7 ml-1 has-text-grey-light">{{ dateTime(item.lastFlightDate) }}</span>
            </div>
            <div class="mt-1 field is-grouped is-grouped-multiline">
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag is-dark">Callsign</span>
                  <span class="tag">{{ item.lastCallsign }}</span>
                </div>
              </div>
              <div class="control">
                <div class="tags has-addons">
                  <span class="tag is-dark">Aircraft</span>
                  <span class="tag">{{ item.lastFlight.aircraftId }}</span>
                </div>
              </div>
           </div>
          </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

  .tag {
    font-size: 60% !important;
  }
  .box {
    border: 1px  solid hsl(0, 0%, 86%);
  }
</style>

<script>
  import moment from 'moment';
  import { getMonthlyList } from '../data/http/listRequest.js';
  import FormatTime from './FormatTime.vue';
  import 'vue-loading-overlay/dist/css/index.css';

  export default {
    data() { 
      return {
        isLoading: true,
        list: [],
      }
    },
    async mounted() {
      await this.loadData();
    },
    methods: {
      async loadData() {
        this.isLoading = true;
        let data = await getMonthlyList();
        console.log('data :>> ', data);
        this.list = data.sort((a, b) => b.time - a.time).map(d => {
          const val = d.time / 60;
          const hours = Number.isNaN(val) ? 0 : Math.floor(val / 60);
          const minutes = String(Number.isNaN(val) ? 0 :Math.round((val % 60)) + 100).substring(1);
          d._formattedTime = `${hours}:${minutes}`;
          this.isLoading = false;
          return d;
        });
      }, 
      dateTime(value) {
        return moment(value).fromNow(); //.format('YYYY-MM-DD HH:mm');
      },
      flagIcon(code) {
        return new URL(`/src/assets/images/flags/${code}.png`, import.meta.url).href
      },
      fallbackIcon(e) {
        e.target.style.display = 'none';

      }
    },
    components: {
      FormatTime,
    }
  }
</script>