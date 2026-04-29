import { reactive } from 'vue'
import { menuController } from '@ionic/vue'

const state = reactive({
  isOpen: false,
})

const openMenu = async () => {
  await menuController.open('main-menu')
  state.isOpen = true
}

const closeMenu = async () => {
  await menuController.close('main-menu')
  state.isOpen = false
}

const setMenuOpen = (value: boolean) => {
  state.isOpen = value
}

export function useMenu() {
  return {
    menuOpen: state,
    openMenu,
    closeMenu,
    setMenuOpen,
  }
}
