<template>
  <div class="board">
    <h1 v-if="title">{{ title }}</h1>
    <div class="board-content" :style="getGridStyle">
      
      <div class="board-headers" :class="{'no-headers': !(headers && headers.length) }" v-for="(header, i) in headers" :key="i">
        <h2>{{ header }}</h2>
      </div>
      <div class="board-item" v-for="(j) in this.total" :key="j" :class="getItemClasses(j)">
        <SolariBoardRow :ref="`line_${j - 1}`" 
          :textToShow="getValue(j - 1)" 
          :loops="getConfigValue(j - 1, 'loop')" 
          :length="getConfigValue(j - 1, 'length')" 
          :delay="getConfigValue(j - 1, 'delay')" 
          :align="getConfigValue(j - 1, 'align')"></SolariBoardRow>
      </div>
    </div>

  </div>
</template>

<script>
import SolariBoardRow from './SolariBoardRow.vue';
import _isNil from 'lodash/isNil';
import _times from 'lodash/times';
import _constant from 'lodash/constant';

export default {
  props: {
    title: String,
    data: {
      type: Array,
      default: () => []
    },
    delay: {
      type: Number,
      default: () => 200
    },
    length: {
      type: Number,
      default: () => 25
    },
    loops: {
      type: Number,
      default: () => 0
    },
    align: {
      type: String,
      default: () => 'left'
    },
    loading: Boolean,
    config: Object,
    headers: Array,
    rows: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      values: []
    };
  },
  mounted() {
   
    // if (Array.isArray(this.data)) {
    //   this.setData(this.data);
    // }
    
  },
  computed: {
    getGridStyle() {
      let size;
      if (this.headers) {
        size = this.headers && this.headers.length;
      } else {
        size =  this.data && this.data[0] ? this.data[0].length : 1;
      }
      return `grid-template-columns: repeat(${size}, auto)`;
    },
    cols() {
      if (Array.isArray(this.config)) {
        return this.config.length;
      }
      return 0;
    },
    total() {
      return this.cols * this.rows;
    }
  },
  watch: {
    data: {
      handler(newData) {
        this.setData(newData);
      },
      immediate: true,
    }
  },
  methods: {
    setData(data) {
      const plainData = (data || []).reduce((acc, row) => {
        acc = acc.concat(row);
        return acc;
      }, []);
      this.values = _times(this.total, _constant(' ')).map((d, i) => plainData[i] || d);
    },
    mapRow(r, i) {
      r.loops = (_isNil(r.loops)) ? this.loops : r.loops;
      r.delay = ((_isNil(r.delay)) ? this.delay : r.delay) * i;
      r.length = (_isNil(r.length)) ? this.length : r.length;
      r.align = (_isNil(r.align)) ? this.align : r.align;
      return r;
    },
    getConfigValue(index, key) {
      return this.config[(index % this.cols)][key];
    },
    getValue(index) {
      return this.values[index];
    },
    getItemClasses(index) {
      const classes = [];
      if (index % this.cols === 0) {
        classes.push('last-col');
      }
      if (index > ((this.rows - 1) * this.cols)) {
        classes.push('last-row');
      }
      return classes.join(' ');
    }
  },
  components: {
    SolariBoardRow,
  }
}
</script>

<style lang="scss" scoped>
  .board {
    min-height: 100px;
    margin: 0 auto;
    text-align: center;
  }
  .board-content {
    display: inline-grid;
    width: 100%
  }
  .board-headers{
    margin-bottom: 4px;
    &.no-headers {
      display: none;
    }
  }
  .board-item {
    display: inline-block;
    height: 2rem;
    line-height: 1;
    margin-bottom: 2px;
    margin-right: 8px;
    color: #222222;

    &.last-col {
      margin-right: 0;
    }
    &.last-row {
      margin-bottom: 0;
    }
  }

  h1 {
    margin: 0;
    text-align: center;
    color: #eff1ed;
    text-transform: uppercase;
    font-size: 80%;
    font-weight: 400;
    margin-bottom: 8px;
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

  .board {
    display: inline-block;
    background-color: #333;
    padding: 8px;
    border-radius: 4px;
  }
</style>