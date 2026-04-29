<template>
  <ion-page>
    <ion-tabs>

      <ion-router-outlet />

      <div class="tabs7-bar" :class="{ hidden: menuOpen.isOpen }">
        <button
          class="tab7-btn"
          :class="{ active: activeTab === 'home' }"
          @click="setTab('home')"
        >
          <ion-icon :icon="homeOutline" />
          <span>Início</span>
        </button>

        <button
          class="tab7-btn"
          :class="{ active: activeTab === 'events' }"
          @click="setTab('events')"
        >
          <ion-icon :icon="calendarOutline" />
          <span>Eventos</span>
        </button>

        <button
          class="tab7-btn"
          :class="{ active: activeTab === 'profile' }"
          @click="setTab('profile')"
        >
          <ion-icon :icon="personOutline" />
          <span>Perfil</span>
        </button>
      </div>

    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonIcon
} from '@ionic/vue'

import {
  homeOutline,
  calendarOutline,
  personOutline
} from 'ionicons/icons'

import { useTabs } from '../composable/useTabs'
import { useMenu } from '../composable/useMenu'

const { activeTab, setTab, syncTabWithRoute } = useTabs()
const { menuOpen } = useMenu()

onMounted(() => {
  syncTabWithRoute()
})

watch(() => location.pathname, () => {
  syncTabWithRoute()
})
</script>

<style scoped>
.tabs7-bar {
  position: absolute;
  bottom: 14px;
  left: 14px;
  right: 14px;

  display: flex;
  justify-content: space-around;

  background: var(--app-surface-2);
  backdrop-filter: blur(14px);

  border-radius: 26px;
  padding: 8px 6px;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.tab7-btn {
  flex: 1;
  background: transparent;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  font-size: 11px;
  font-weight: 600;
  color: var(--app-muted);

  cursor: pointer;
  transition: 0.2s;
}

.tab7-btn ion-icon {
  font-size: 22px;
  transition: 0.2s;
}

.tab7-btn.active {
  color: var(--app-primary);
}

.tab7-btn.active ion-icon {
  transform: scale(1.2);
}

.tabs7-bar.hidden {
  opacity: 0;
  transform: translateY(18px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
</style>