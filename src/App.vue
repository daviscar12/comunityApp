<template>
  <ion-app>
    <ion-menu
      side="start"
      menu-id="main-menu"
      content-id="main-content"
      :swipe-gesture="true"
      @ionDidOpen="() => setMenuOpen(true)"
      @ionDidClose="() => setMenuOpen(false)"
    >
      <ion-content class="menu-content">
        <div class="menu-top">
          <div class="menu-top-shape"></div>
          <div class="menu-header-card">
            <img class="round-avatar menu-avatar" :src="user.photo" alt="Avatar" />
            <div class="menu-user-info">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>

        <div class="menu-section-label">Navegação</div>
        <ion-list lines="none">
          <ion-item button class="menu-item" @click="navigateTo('/tabs/home')">
            <ion-icon slot="start" :icon="homeOutline" />
            <ion-label>Início</ion-label>
          </ion-item>
          <ion-item button class="menu-item" @click="navigateTo('/tabs/events')">
            <ion-icon slot="start" :icon="calendarOutline" />
            <ion-label>Eventos</ion-label>
          </ion-item>
          <ion-item button class="menu-item" @click="navigateTo('/tabs/profile')">
            <ion-icon slot="start" :icon="personOutline" />
            <ion-label>Perfil</ion-label>
          </ion-item>
          <ion-item button class="menu-item" @click="navigateTo('/tabs/settings')">
            <ion-icon slot="start" :icon="settingsOutline" />
            <ion-label>Configurações</ion-label>
          </ion-item>
        </ion-list>

        <div class="menu-footer">
          <p>Comunidade App</p>
          <small>Version 1.0.0</small>
        </div>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/vue'
import { homeOutline, calendarOutline, personOutline, settingsOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useUser } from './composable/useUser'
import { useMenu } from './composable/useMenu'

const router = useRouter()
const { user } = useUser()
const { setMenuOpen, closeMenu } = useMenu()

const navigateTo = async (path: string) => {
  await router.push(path)
  await closeMenu()
}
</script>

<style scoped>
.menu-content {
  --background: var(--app-surface);
  padding-top: 0;
}

.menu-top {
  position: relative;
  height: 220px;
  margin-bottom: 16px;
}

.menu-top-shape {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(var(--app-primary-rgb), 0.95), rgba(var(--app-primary-rgb), 0.75));
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.14);
}

.menu-header-card {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 18px 20px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}

.menu-avatar {
  width: 76px;
  height: 76px;
  min-width: 76px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.menu-user-info {
  flex: 1;
  min-width: 0;
}

.menu-user-info h3,
.menu-user-info p {
  margin: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.menu-user-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--app-text);
}

.menu-user-info p {
  font-size: 13px;
  color: var(--app-muted);
}

.menu-section-label {
  margin: 14px 20px 6px;
  color: var(--app-muted);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.menu-item {
  --border-radius: 18px;
  --padding-start: 18px;
  --padding-end: 18px;
  --inner-padding-start: 18px;
  margin: 8px 12px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(25, 32, 45, 0.06);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
}

.menu-item ion-icon {
  font-size: 20px;
  color: var(--app-primary);
}

.menu-item ion-label {
  color: var(--app-text);
  font-weight: 600;
}

.menu-item:hover {
  background: rgba(var(--app-primary-rgb), 0.08);
}

.menu-footer {
  margin: 24px 20px 16px;
  padding: 16px 16px 20px;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 18px;
  text-align: center;
  color: var(--app-muted);
}

.menu-footer p {
  margin: 0 0 6px;
  font-weight: 700;
  color: var(--app-text);
}

.menu-footer small {
  font-size: 12px;
}
</style>
