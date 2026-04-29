<template>
  <ion-page>
    <ion-content class="wireframe-page" :fullscreen="true">
      <div class="phone-shell">
        <div class="top-banner">
          <div class="brand-row">
            
            <img class="round-avatar" :src="user.photo" alt="Avatar" @click="openMenu" style="cursor: pointer;" />
            <h2 class="greeting-title">INICIO</h2>
          </div>

        </div>

        <div class="home-content">
          <div class="search-box" style="margin-top: -10px;">
            <div class="search-inner">
              <ion-icon :icon="searchOutline" style="font-size: 28px; margin-right: 10px;" />
              <span style="font-size: 17px;">Buscar eventos...</span>
            </div>
          </div>

          <div class="section-pill" style="margin: 14px 12px 18px;">
            <ion-icon :icon="homeOutline" style="font-size: 24px;" />
            <span>EVENTOS PERTO DE VOCÊ</span>
          </div>

          <div class="event-card">
            <div
              v-for="(event, index) in nearbyEvents"
              :key="event.id"
            >
              <div
                class="event-row"
                @click="navigateToEvent(event.id)"
                style="cursor: pointer;"
              >
                <div class="event-thumb">Imagem<br />do evento</div>

                <div>
                  <h3 class="event-title">{{ event.title }}</h3>
                  <p class="event-meta">{{ event.date }} - {{ event.location }}</p>
                </div>
              </div>

              <div
                v-if="index < nearbyEvents.length - 1"
                style="
                  height: 1px;
                  background: #dddddd;
                  margin: 16px 0 14px;
                "
              />
            </div>
          </div>
        </div>

        
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonIcon,
  
} from '@ionic/vue'

import {
  
  searchOutline,
  homeOutline,
  
} from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useUser } from '../composable/useUser'
import { useMenu } from '../composable/useMenu'

const router = useRouter()
const { user } = useUser()
const { openMenu } = useMenu()

// Eventos próximos
const nearbyEvents = [
  {
    id: 1,
    title: 'Feira Cultural',
    date: '24 de Abril',
    location: 'Centro Comunitário',
  },
  {
    id: 2,
    title: 'Festival da Rua',
    date: '25 de Abril',
    location: 'Praça Central',
  },
]

// Função para navegar para detalhes do evento
const navigateToEvent = (eventId: number) => {
  router.push(`/event/${eventId}`)
}

</script>