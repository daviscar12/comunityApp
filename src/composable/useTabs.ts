import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const activeTab = ref('home')

export function useTabs() {
  const router = useRouter()
  const route = useRoute()

  const setTab = (tab: string) => {
    activeTab.value = tab
    router.push(`/tabs/${tab}`)
  }

  const syncTabWithRoute = () => {
    const path = route.path

    if (path.includes('home')) activeTab.value = 'home'
    else if (path.includes('events')) activeTab.value = 'events'
    else if (path.includes('profile')) activeTab.value = 'profile'
  }

  return {
    activeTab,
    setTab,
    syncTabWithRoute
  }
}