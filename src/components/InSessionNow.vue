<template>
  <section class="">
    <div class="solari-container">
      <SolariBoard :headers="headers" :loading="isLoading" :config="colsConfig" :data="list" :length="18" />
    </div>
  </section>
</template>

<style lang="scss">
  .solari-container {
    width: 485px;
    margin: 0 auto;
  }
</style>

<script>
  import { getFlightplansNow } from '../data/http/listRequest.js';
  import 'vue-loading-overlay/dist/css/index.css';
  import SolariBoard from '../components/SolariBoard.vue';
  import { hoursFromSeconds } from '../helpers/time-helpers.js';

  export default {
    data() { 
      return {
        interval: undefined,
        isLoading: true,
        list: [],
        board: undefined,
        test: [['LTS016T', 'SKSM-SKBO', '']],
        headers: ['Callsign', 'Ruta', 'E.T.A'],
        colsConfig: [
          {
            align: 'left',
            length: 8
          },
          {
            align: 'right',
            length: 9
          },
          {
            align: 'right',
            length: 5
          },
        ],
      }
    },
    async mounted() {
      await this.loadData();
      this.startLoop();
    },
    unmounted() {
      clearInterval(this.interval);
    },
    methods: {
      startLoop() {
        this.interval = setInterval(this.loadData, 1000 * 30)
      },  
      async loadData() {
        this.isLoading = true;
        let data = await getFlightplansNow();
        this.isLoading = false;
        const rows = data.reduce((acc, d) => {
          const eta = hoursFromSeconds(d.eta);
          const row = [ d.callsign, `${d.departure.icao}-${d.arrival.icao}`, `${eta.h}:${eta.m}`];
          acc.push(row);
          return acc;
        }, []);
        
        this.list = rows;
      }
    },
    components: {
      SolariBoard
    }
  }
</script>