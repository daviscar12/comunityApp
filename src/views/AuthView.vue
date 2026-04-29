<template>
  <ion-page>
    <ion-content class="wireframe-page" :fullscreen="true">
      <div class="phone-shell auth-wrapper">
        <div class="top-banner">
          <div class="brand-row">
            <ion-icon :icon="chatbubbleEllipses" style="font-size: 44px; color: var(--app-primary);" />
            <h1 class="brand-title">Comunity</h1>
          </div>
        </div>

        <div class="auth-inner-card">
          <div class="centered-text">
            <h2
              style="
                font-size: 34px;
                line-height: 1.18;
                font-weight: 800;
                margin: 14px 0 18px;
                letter-spacing: -1px;
              "
            >
              Bem-vindo à<br />
              Comunity!
            </h2>

            <p class="muted-text" style="font-size: 17px; margin: 0 0 36px;">
              Crie ou acesse sua conta para continuar.
            </p>
          </div>

          <ion-button expand="block" class="primary-btn" @click="goToLogin">
            Criar conta
          </ion-button>

          <div class="divider-row">ou</div>

          <ion-button expand="block" fill="clear" class="outline-btn" @click="goToLogin">
            Entrar na sua conta
          </ion-button>

          <p
            class="muted-text centered-text"
            style="font-size: 16px; margin-top: 34px; font-weight: 500;"
          >
            Mais opções de login
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { chatbubbleEllipses } from 'ionicons/icons'

const router = useRouter()

const goToLogin = () => {
  router.push('/Login')
}
</script>