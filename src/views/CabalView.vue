<script>
import SolariBoardRow from '../components/SolariBoardRow.vue';
export default {
  mounted() {
    const sts = localStorage.getItem('defined_statuses');
    if (sts !== null) {
      this.addedStatuses = JSON.parse(sts);
    }
  },
  data() {
    return {
      route: '',
      status: '',
      routeAlign: 'left',
      statusAlign: 'left',
      routeToSend: '',
      routeError: '',
      statusError: '',
      addingError: '',
      statusToSend: '',
      statusToAdd: '',
      charRegexp: /[a-zA-Z0-9Ññ\-:.>*¡!¿?@#]/g,
      defaultStatuses: [
        'BIENVENIDOS!',
        'BOARDING',
        'TAXI OUT',
        'TAKEOFF',
        'CLIMB',
        'DESCENT',
        'APPROACH',
        'LANDING',
        'TAXI TO GATE'
      ],
      addedStatuses: []
    }
  },
  methods: {
    setRoute(val = '') {
      const newVal = val.trim();
      if (newVal && !this.charRegexp.test(newVal)) {
        this.routeError = 'Hay carácteres inválidos';
        return;
      }
      this.route = newVal.toUpperCase();
      this.routeError = '';
    },
    setStatus(val = '') {
      const newVal = val.trim();
      if (newVal && !this.charRegexp.test(newVal)) {
        this.statusError = 'Hay carácteres inválidos';
        return;
      }
      this.status = newVal.toUpperCase();
      this.statusError = '';
    },
    deleteStatus() {
      this.setStatus(this.statusToSend = '');
    },
    deleteRoute() {
      this.setRoute(this.routeToSend = '');
    },
    setQuickStatus(value) {
      this.setStatus(this.statusToSend = value);
    },
    addQuickStatus() {
      const newStatus = this.statusToAdd.trim();
      if (!newStatus) {
        return;
      }
      if (newStatus && !this.charRegexp.test(newStatus)) {
        this.addingError = 'Hay carácteres inválidos';
        return;
      }
      if (this.defaultStatuses.indexOf(newStatus) === -1 && this.addedStatuses.indexOf(newStatus) === -1) {
        this.addedStatuses.push(newStatus.toUpperCase());
        this.updateStatuses();
        this.statusToAdd = '';
        this.addingError = '';
      }
    },
    deleteQuickStatus(val) {
      const index = this.addedStatuses.indexOf(val);
      this.addedStatuses.splice(index, 1);
      this.updateStatuses();
    },
    updateStatuses() {
      localStorage.setItem('defined_statuses', JSON.stringify(this.addedStatuses));
    }
  },
  components: {
    SolariBoardRow
  }
}
</script>

<template>
  <main class="section">
    <h1 class="title is-4"> Capitán Cabal Hub</h1>
    <div class="board">
      <div class="board-content">
        <h2>Ruta</h2>
        <h2>Estado</h2>
        <div class="solari-row">
          <SolariBoardRow ref="solari" :length="9" size="big" :align="routeAlign"
                :textToShow="route"></SolariBoardRow>
        </div>
        <div class="solari-row">
          <SolariBoardRow ref="solari" :length="15" :align="statusAlign"  size="big"
              :textToShow="status"></SolariBoardRow>
        </div>
      </div>
    </div>
    <div class="form-board">
      <div class="field is-horizontal">
        <div class="field-label">
        </div>
        <div class="field-body">
          <p class="title is-5">Quick Statuses</p>
        </div>
      </div>
        <div class="field is-horizontal">
          <div class="field-label"></div>
          <div class="field-body">
            <div class="field">
              <div class="tags">
                <span v-for="s in defaultStatuses" @click="setQuickStatus(s)" :key="s" class="tag is-rounded is-medium is-info is-light is-tag-clickable">{{ s }}</span>
                <span v-for="s in addedStatuses"  @click="setQuickStatus(s)" :key="s" class="tag is-rounded is-medium is-info is-tag-clickable">{{ s }}
                  <button @click.prevent.stop="deleteQuickStatus(s)" class="delete is-small"></button>
                </span>
              </div>
            </div>
          </div>
        </div>
      <div class="field is-horizontal mt-6">
        <div class="field-label">
        </div>
        <div class="field-body">
          <p class="title is-6">Carácteres aceptados: (espacio)ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789-:.>*¡!¿?@#</p>
        </div>
      </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="field">Ruta</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" @keydown.enter="setRoute(routeToSend)" maxlength="9" v-model="routeToSend" type="text" placeholder="Route">
              </div>
              <p v-if="routeError" class="help is-danger">{{ routeError }}</p>
              <p v-if="!routeError" class="help">9 carácteres</p>
            </div>
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="routeAlign">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="buttons">
                  <button class="button is-info" @click="setRoute(routeToSend)"><span class="icon"><font-awesome-icon :icon="['fas', 'paper-plane']" /></span></button>
                  <button class="button is-danger" @click="deleteRoute"><span class="icon"><font-awesome-icon :icon="['fas', 'delete-left']" /></span></button>
                </div>  
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="field">Estado</label>
          </div>        
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input" @keydown.enter="setStatus(statusToSend)" maxlength="15" v-model="statusToSend" type="text" placeholder="Status">
              </div>
              <p v-if="statusError" class="help is-danger">{{ statusError }}</p>
              <p v-if="!statusError" class="help">15 carácteres</p>
            </div>
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="statusAlign">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="buttons">
                  <button class="button is-info" @click="setStatus(statusToSend)"><span class="icon"><font-awesome-icon :icon="['fas', 'paper-plane']" /></span></button>
                  <button class="button is-danger" @click="deleteStatus"><span class="icon"><font-awesome-icon :icon="['fas', 'delete-left']" /></span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal mt-6">
          <div class="field-label"></div>
          <div class="field-body">
            
            <div class="field is-narrow">
              <div class="control">
                <input @keydown.enter="addQuickStatus" :class="{ 'is-danger': addingError }" class="input" maxlength="15" v-model="statusToAdd" type="text" placeholder="Add a Quick Status">
              </div>
              <p v-if="addingError" class="help is-danger">{{ addingError }}</p>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-light is-info" @click="addQuickStatus">Add</button>
              </div>
            </div>

          </div>
        </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  *{
    box-sizing: border-box;
  }

  .form-board{
    border: 1px solid #dedede;
    margin-top: 130px;
    padding: 16px;
  }

  .board {
    margin: 16px auto;
    width: 100%;
    background-color: #333;
    padding: 32px;
    border-radius: 4px;
    text-align: center;
    height: 130px;
  }

  .board-content{
    display: inline-grid;
    grid-template-columns: auto auto;
    margin: auto;
  }

  .is-tag-clickable {
    cursor: pointer;

    &.is-info:hover {
      background-color: #3488ce;
      border-color: transparent;
      color: #fff;
    }
    &.is-light.is-info:hover {
      background-color: #e4eff9;
      border-color: transparent;
      color: #296fa8;
    }
  }
  
  h2 {
    margin: 0;
    text-align: center;
    color: #eff1ed;
    text-transform: uppercase;
    font-size: 60%;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .solari-row {
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
</style>