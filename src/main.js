import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import VueMobileDetection from 'vue-mobile-detection';

import './assets/css/main.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner, faPaperPlane, faDeleteLeft, faXmark, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';

library.add(faPaperPlane);
library.add(faDeleteLeft);
library.add(faXmark);
library.add(faSpinner);
library.add(faBackwardStep);
library.add(faForwardStep);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueMobileDetection);
app.component('font-awesome-icon', FontAwesomeIcon);


app.mount('#app');