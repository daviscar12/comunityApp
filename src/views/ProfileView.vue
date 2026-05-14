<template>
  <ion-page>
    <ion-content class="wireframe-page" :fullscreen="true">
      <div class="phone-shell">
        <div class="top-banner">
          <div class="brand-row">
            <img class="round-avatar" :src="user.photo" alt="Avatar" @click="openMenu" style="cursor: pointer;" />
            <h2 class="greeting-title">PERFIL</h2>
          </div>

          
        </div>

        <div class="home-content" style="padding-top: 24px;">
          <div class="event-card" style="padding: 24px;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              
              <img
                  class="round-avatar"
                  style="width: 90px; height: 90px;"
                  :src="user.photo"
                    alt="Avatar"
                />

              <h3 style="margin: 0; font-size: 24px; font-weight: 700;">{{ user.name }}</h3>
                  <p class="event-meta" style="margin: 0;">{{ user.email || 'Email não informado' }}</p>
                  <p class="event-meta" style="margin: 0;">{{ user.phone || 'Telefone não informado' }}</p>
            </div>

            <div
              style="
                height: 1px;
                background: #dddddd;
                margin: 22px 0;
              "
            />

            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="padding: 14px 0; font-weight: 600;">Meus eventos</div>
              <div style="padding: 14px 0; font-weight: 600;">Favoritos</div>
              <ion-button expand="block" class="primary-btn" @click="goTosettings">
                Configurações
              </ion-button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useUser } from '../composable/useUser'
import { useRouter } from 'vue-router'
import { useMenu } from '../composable/useMenu'
import {
  IonPage,
  IonContent,
  IonButton,
  
} from '@ionic/vue'



const { user } = useUser()
const { openMenu } = useMenu()

const router = useRouter()

const goTosettings = () => {
  router.push('/tabs/Settings')
}
</script>