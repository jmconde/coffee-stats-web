<template>
  <div class="container is-max-desktop">
    <div class="section">
      <div class="field is-horizontal">
        <div class="field-label">Contraseña actual</div>
        <div class="field-body">
          <div class="field is-narrow">
            <p class="control">
              <input class="input" v-model="password" type="password">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">Nueva contraseña</div>
        <div class="field-body">
          <div class="field is-narrow">
            <p class="control">
              <input class="input" v-model="newPassword" type="password">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">Confirma nueva contraseña</div>
        <div class="field-body">
          <div class="field is-narrow">
            <p class="control">
              <input class="input" v-model="newPasswordCheck" type="password">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <button class="button is-primary" @click="changePassword">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { changePassword } from '../data/http/auth';
export default {
  data() {
    return {
      newPasswordCheck: null,
      newPassword: null,
      password: null
    }
  },
  methods: {
    changePassword() {
      console.log('changePassword');
      if (!this.password || !this.newPassword || !this.newPasswordCheck) {
        return;
      }
      if (this.newPasswordCheck !== this.newPassword) { 
        return;
      }
      console.log('changePassword');
      changePassword(this.password, this.newPassword);
    }
  }
}
</script>