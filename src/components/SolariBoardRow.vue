<template>
  <div class="board-line" :class="size">
    <div class="board-letter" :ref="'letter' + $index" :class="{'animating': isAnimating[$index]}" v-for="(char, $index) in charsToShow" :key="$index">{{ char }}</div>
  </div>  
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');
  * {
    box-sizing: border-box;
  }
  .board-line {
    display: inline-flex;
    font-family: 'Inconsolata', monospace;
  }
  .board-letter {
    display: inline-block;
    padding: 2px;
    margin-right: 2px;
    border-radius: 3px;
    border: 1px solid #222;
    background-color: #222;
    // color: #EEB868;
    // color: #717744;
    color: #bcbd8b;
    font-size: 20px;
    height: 26px;
    width: 16px;
    position: relative;
    line-height: 1;

    .big & {
      font-size: 32px;
      height: 38px;
      width: 24px;
    }

    &::after {
      content:' ';
      display: inline-block;
      border-bottom: 1px solid #ededed;
      opacity: 0.2;
      width: 100%;
      height: 1px;
      top: 49%;
      left: 0;
      position: absolute;
      box-shadow: 6px 4px 8px;
    }
  }

  .board-letter.animating {
    animation: squeeze 0.075s ease-in-out infinite;
  }
  @keyframes squeeze {
    50% {
      transform: scaleY(0);
    }
  }
</style>

<script>
  import _isInteger from 'lodash/isInteger';
  import _delay from 'lodash/delay';
  import _clone from 'lodash/clone';

  export default {
    props: {
      size: {
        type: String,
        default: () => ''
      },
      textToShow: {
        type: String,
        default: () => ''
      },
      delay: {
        type: Number,
        default: () => 0
      },
      length: {
        type: Number,
      },
      loops: {
        type: Number,
        default: () => 0
      },
      align: {
        type: String,
        default: 'left'
      }
    },
    data() {
      const newArray = Array.apply(null, Array(this.length)).map(() => ' ');
      const newArrayAnimating = Array.apply(null, Array(this.length)).map(() => false);
      return {
        charsAll: ' ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789-:.>*¡!¿?@#',
        charsReference: _clone(newArray),
        charsToShow: _clone(newArray),
        isAnimating: newArrayAnimating,
      }
    },
    computed: {
      chars() {
        const text =  this.getText(this.textToShow);
        const chars = Array.apply(null, Array(this.length)).map(() => ' ');
        const offset = (this.align === 'left') ? 0 : chars.length - text.length;
        
        for (let index = 0; index < text.length; index++) {
          chars[index + offset] = text.charAt(index);
        }
        return chars;
      }
    },
    watch: {
      chars: {
        handler() {
          if (_isInteger(this.delay) && this.delay > 0) {
            _delay(this.startAnimation, this.delay);
          } else {
            this.startAnimation();
          }
        },
        immediate: true
      }
    },
    methods: {
      getNextIndex(index) {
        return (index >= this.charsAll.length - 1) ? 0 : index + 1;
      },
      getLetterIndex(letter) {
        return this.charsAll.indexOf(letter);
      },
      getText(text) {
        return (text.length > this.length) ? text.substring(0, this.length) : text;
      },
      async startAnimation() {
        const cts = _clone(this.charsReference);
        for (let index = 0; index < this.chars.length; index++) {
          const char = this.chars[index];
          if (char !== cts[index]) {
            this.animateLetter(index, char);
            await new Promise((resolve) => setTimeout(resolve, 100))
          }
        }
        this.charsReference = this.chars;
      },
      animateLetter(index, letter) {
        let showIndex = 0;
        this.charsToShow[index] = this.charsAll[showIndex];
        this.isAnimating[index] = true;
        let loop = 0;
        const letterIndex = this.getLetterIndex(letter);

        const interval = setInterval(() => {
          showIndex = this.getNextIndex(showIndex);
          this.charsToShow[index] = this.charsAll.charAt(showIndex);
          if (showIndex === 0) {
            loop++;
          }
          if (loop >= this.loops && letterIndex === showIndex) {
            clearInterval(interval);
            this.isAnimating[index] = false;
          }
        }, 50);

      }
    }
  }
</script>