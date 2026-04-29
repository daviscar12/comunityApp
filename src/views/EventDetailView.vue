<template>
  <ion-page>
    <ion-content class="wireframe-page" :fullscreen="true">
      <div class="phone-shell">
        
        <div class="detail-banner">
          <div class="detail-banner-header">
            <ion-button
              fill="clear"
              class="back-btn"
              @click="goBack"
            >
              <ion-icon :icon="chevronBackOutline" />
            </ion-button>
            <h2 class="detail-banner-title">EVENTO</h2>
            <div style="width: 40px;"></div>
          </div>
        </div>

        
        <div class="event-detail-content">
          
          <div class="event-detail-image">
            <div class="image-placeholder">
              <ion-icon :icon="imageOutline" style="font-size: 64px;" />
            </div>

            
            <button
              class="favorite-btn"
              :class="{ favorited: isFavorited }"
              @click="toggleFavorite"
            >
              <ion-icon :icon="isFavorited ? heart : heartOutline" />
            </button>
          </div>

          
          <div class="event-info-container">
            <div class="event-header">
              <h1 class="event-detail-title">{{ currentEvent.title }}</h1>
              <span class="event-category" :style="{ backgroundColor: getThemeColor() }">
                {{ currentEvent.category }}
              </span>
            </div>

            <div class="event-details">
              
              <div class="detail-item">
                <div class="detail-icon-box">
                  <ion-icon :icon="calendarOutline" />
                </div>
                <div class="detail-text">
                  <p class="detail-label">Data</p>
                  <p class="detail-value">{{ currentEvent.date }}</p>
                </div>
              </div>

              
              <div class="detail-item">
                <div class="detail-icon-box">
                  <ion-icon :icon="locationOutline" />
                </div>
                <div class="detail-text">
                  <p class="detail-label">Local</p>
                  <p class="detail-value">{{ currentEvent.location }}</p>
                </div>
              </div>

              
              <div class="detail-item">
                <div class="detail-icon-box">
                  <ion-icon :icon="peopleOutline" />
                </div>
                <div class="detail-text">
                  <p class="detail-label">Participantes</p>
                  <p class="detail-value">{{ currentEvent.attendees }} pessoas</p>
                </div>
              </div>
            </div>

            
            <div class="event-description-container">
              <h3 class="description-title">Sobre o evento</h3>
              <p class="description-text">{{ currentEvent.description }}</p>
            </div>

            
            <div class="organizer-container">
              <h3 class="organizer-title">Organizado por</h3>
              <div class="organizer-card">
                <img class="organizer-avatar" :src="currentEvent.organizerPhoto" alt="Organizador" />
                <div class="organizer-info">
                  <p class="organizer-name">{{ currentEvent.organizer }}</p>
                  <p class="organizer-role">Organizador</p>
                </div>
                <ion-button fill="clear" class="contact-btn">
                  <ion-icon :icon="chatbubbleOutline" />
                </ion-button>
              </div>
            </div>

            
            <div class="action-buttons">
              <ion-button
                expand="block"
                class="primary-btn"
                @click="toggleParticipation"
                :style="{ backgroundColor: getThemeColor() }"
              >
                <ion-icon :icon="isParticipating ? checkmark : addOutline" slot="start" />
                {{ isParticipating ? 'Você está inscrito' : 'Participar do evento' }}
              </ion-button>

              <div class="secondary-actions">
                <ion-button
                  fill="outline"
                  class="outline-btn"
                  @click="shareEvent"
                >
                  <ion-icon :icon="shareOutline" />
                </ion-button>
                <ion-button
                  fill="outline"
                  class="outline-btn"
                  @click="navigateToChat"
                >
                  <ion-icon :icon="chatbubbleOutline" />
                </ion-button>
              </div>
            </div>

            
            <div style="height: 80px;"></div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/vue'
import {
  chevronBackOutline,
  imageOutline,
  heartOutline,
  heart,
  calendarOutline,
  locationOutline,
  peopleOutline,
  chatbubbleOutline,
  shareOutline,
  addOutline,
  checkmark,
} from 'ionicons/icons'
import { useUser } from '../composable/useUser'

const router = useRouter()
const route = useRoute()
const { user } = useUser()


const isFavorited = ref(false)
const isParticipating = ref(false)


const events = [
  {
    id: 1,
    title: 'Feira Cultural',
    date: '24 de Abril, 2026',
    location: 'Centro Comunitário, São Paulo',
    category: 'Cultura',
    attendees: 245,
    image: '',
    description:
      'Uma celebração vibrante da diversidade cultural da nossa comunidade! Venha aproveitar apresentações de dança, música ao vivo, comida tradicional e muito mais. Este é um espaço para conectar pessoas, conhecer novas culturas e fortalecer os laços entre vizinhos. Toda a comunidade é bem-vinda!',
    organizer: 'Maria Silva',
    organizerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  {
    id: 2,
    title: 'Festival da Rua',
    date: '25 de Abril, 2026',
    location: 'Praça Central, São Paulo',
    category: 'Diversão',
    attendees: 542,
    image: '',
    description:
      'O maior festival de rua do bairro! Com food trucks, apresentações musicais de artistas locais, atividades para crianças e muito entretenimento. Venha com sua família e amigos para um dia inesquecível cheio de cores, sons e sabores. Esperamos você lá!',
    organizer: 'João Santos',
    organizerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
  },
  {
    id: 3,
    title: 'Workshop Criativo',
    date: '27 de Abril, 2026',
    location: 'Espaço Jovem, São Paulo',
    category: 'Aprendizado',
    attendees: 87,
    image: '',
    description:
      'Aprenda técnicas de arte criativa com profissionais experientes! Este workshop é perfeito para iniciantes e também para quem já tem experiência. Vamos explorar diferentes formas de expressão artística através de atividades práticas e dinâmicas. Materiais fornecidos. Vagas limitadas!',
    organizer: 'Ana Costa',
    organizerPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  },
]


const currentEvent = computed(() => {
  const eventId = parseInt(route.params.id as string)
  return events.find((e) => e.id === eventId) || events[0]
})


const getThemeColor = () => {
  return user.themeColor || '#5d98cc'
}


const goBack = () => {
  router.back()
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
}

const toggleParticipation = () => {
  isParticipating.value = !isParticipating.value
}

const shareEvent = () => {
  alert(`Compartilhando: ${currentEvent.value.title}`)
}

const navigateToChat = () => {
  alert('Abrindo chat com o organizador...')
}
</script>

<style scoped>
.detail-banner {
  background: var(--app-yellow);
  padding: 16px 22px 14px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  margin-bottom: 0;
}

.detail-banner-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  font-size: 32px;
  height: 40px;
  width: 40px;
  margin: 0;
  --padding-start: 0;
  --padding-end: 0;
  --color: var(--app-text);
}

.detail-banner-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1.5px;
  color: var(--app-text);
  flex: 1;
  text-align: center;
}

.event-detail-content {
  padding: 0;
}


.event-detail-image {
  position: relative;
  width: 100%;
  height: 240px;
  margin-bottom: 24px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--app-muted);
  font-size: 18px;
  font-weight: 500;
}

.favorite-btn {
  position: absolute;
  bottom: 14px;
  right: 14px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--app-surface);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--app-text);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.favorite-btn.favorited {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
}


.event-info-container {
  padding: 0 22px;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
}

.event-detail-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
  color: var(--app-text);
  flex: 1;
}

.event-category {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  letter-spacing: 0.5px;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
  padding: 20px;
  background: var(--app-surface);
  border-radius: 24px;
}

.detail-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.detail-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--app-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--app-primary);
  flex-shrink: 0;
}

.detail-text {
  flex: 1;
}

.detail-label {
  font-size: 12px;
  color: var(--app-muted);
  margin: 0 0 4px 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 16px;
  color: var(--app-text);
  margin: 0;
  font-weight: 600;
}

.event-description-container {
  margin-bottom: 28px;
}

.description-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--app-text);
}

.description-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--app-muted);
  margin: 0;
}

.organizer-container {
  margin-bottom: 28px;
}

.organizer-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--app-text);
}

.organizer-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: var(--app-surface);
  border-radius: 18px;
}

.organizer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.organizer-info {
  flex: 1;
}

.organizer-name {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: var(--app-text);
}

.organizer-role {
  font-size: 12px;
  color: var(--app-muted);
  margin: 4px 0 0 0;
}

.contact-btn {
  font-size: 20px;
  height: 36px;
  width: 36px;
  margin: 0;
  --padding-start: 0;
  --padding-end: 0;
  --color: var(--app-primary);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.primary-btn {
  height: 58px;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-transform: none;
  letter-spacing: 0;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.primary-btn:hover {
  --box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.secondary-actions {
  display: flex;
  gap: 12px;
}

.outline-btn {
  flex: 1;
  height: 50px;
  border-radius: 18px;
  font-size: 18px;
  --color: var(--app-primary);
  --border-color: var(--app-primary);
  border: 2px solid var(--app-primary);
  background: transparent;
  transition: all 0.3s ease;
}

.outline-btn:hover {
  background: var(--app-primary);
  --color: white;
}

@media (max-width: 480px) {
  .event-detail-title {
    font-size: 24px;
  }

  .event-category {
    font-size: 11px;
    padding: 6px 12px;
  }

  .detail-value {
    font-size: 14px;
  }
}
</style>
