<template>
  <section class="section">
    <header>
      <div>
        <button v-show="canGoBack" class="button is-light is-small" @click="goPreviousMotnh"><font-awesome-icon :icon="['fas', 'backward-step']" /></button>
      </div>
      <h1 class="has-text-centered is-size-5 mb-4">{{ friendlyMonth }}</h1>
      <div>
        <button v-show="canGoNext" class="button is-light is-small" @click="goNextMotnh"><font-awesome-icon :icon="['fas', 'forward-step']" /></button>
      </div>      
    </header>
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-centered">VID</th>
          <th class="">Nombre</th>
          <th class="has-text-centered">Horas en el aire</th>
          <th class="has-text-centered">Total Sesiones</th>
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
        <tr v-for="item in list" :key="item.vid">
          <td>{{ item._id  }}</td>
          <td>{{ item.user?.name  }}</td>
          <td><FormatTime :value="item.time / 60" /></td>
          <td>{{ item.total }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped>
  header {
    display: grid;
    grid-template-columns: 30px auto 30px;
  }
</style>

<script>
import { getPilotPreviousData } from '../data/http/listRequest.js';
import moment from 'moment';
import FormatTime from './FormatTime.vue';

export default {
  data() { 
    return {
      isLoading: true,
      list: [],
      actualMonth: moment().subtract(1, 'month'),
      month: moment().subtract(1, 'month'),
      minMonth: moment().subtract(3, 'month'),
    }
  },
  computed: {
    start() {
      return this.month.startOf('month').format('YYYY-MM-DD');
    },
    end() {
      return this.month.endOf('month').format('YYYY-MM-DD');
    },
    friendlyMonth() {
      return this.month.format('MMMM, YYYY');
    },
    canGoBack() {
      return this.month.isAfter(this.minMonth);
    },
    canGoNext() {
      return this.month.isBefore(this.actualMonth);
    }
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      let data = await getPilotPreviousData(this.start, this.end);
      this.list = data;
      this.isLoading = false;
      console.log('loaded!!');

    },
   async goPreviousMotnh() {
      this.month = this.month.clone().subtract(1, 'month');
      await this.loadData();
    },
   async goNextMotnh() {
      this.month = this.month.clone().add(1, 'month');
      await this.loadData();
    }
  },
  components: {
    FormatTime,
  }
}
</script>