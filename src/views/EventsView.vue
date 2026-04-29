<template>
  <ion-page>
    <ion-content class="wireframe-page" :fullscreen="true">
      <div class="phone-shell">
        <div class="top-banner">
          <div class="brand-row">
            <img class="round-avatar" :src="user.photo" alt="Avatar" @click="openMenu" style="cursor: pointer;" />
            <h2 class="greeting-title">EVENTOS</h2>
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
            <ion-icon :icon="calendarOutline" style="font-size: 24px;" />
            <span>TODOS OS EVENTOS</span>
          </div>

          <div class="event-card" style="display: flex; flex-direction: column; gap: 14px;">
            <div
              v-for="event in events"
              :key="event.id"
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
  calendarOutline,
  
} from 'ionicons/icons'

import { useRouter } from 'vue-router'
import { useUser } from '../composable/useUser'
import { useMenu } from '../composable/useMenu'

const router = useRouter()
const { user } = useUser()
const { openMenu } = useMenu()


const events = [
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
  {
    id: 3,
    title: 'Workshop Criativo',
    date: '27 de Abril',
    location: 'Espaço Jovem',
  },
]


const navigateToEvent = (eventId: number) => {
  router.push(`/event/${eventId}`)
}

</script>