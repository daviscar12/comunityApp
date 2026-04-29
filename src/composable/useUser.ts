import { reactive } from 'vue'

export interface UserData {
  name: string
  email: string
  password: string
  phone: string
  photo: string
  themeColor: string
}

const defaultUser: UserData = {
  name: 'Usuario',
  email: 'Uuario@email.com',
  password: '12345678',
  phone: '',
  photo: 'https://tse2.mm.bing.net/th/id/OIP.B-An5i5YsM9bmL3amzSBXQAAAA?w=416&h=416&rs=1&pid=ImgDetMain&o=7&rm=3',
  themeColor: '#5d98cc'
}

const savedUser = localStorage.getItem('comunityUser')

const user = reactive<UserData>(
  savedUser ? JSON.parse(savedUser) : defaultUser
)

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const fullHex = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized
  const bigint = parseInt(fullHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `${r}, ${g}, ${b}`
}

const applyTheme = () => {
  const rgb = hexToRgb(user.themeColor)
  document.documentElement.style.setProperty('--app-primary', user.themeColor)
  document.documentElement.style.setProperty('--app-primary-rgb', rgb)
  document.documentElement.style.setProperty('--app-blue', user.themeColor)
  document.documentElement.style.setProperty('--ion-color-primary', user.themeColor)
}

const saveUser = () => {
  localStorage.setItem('comunityUser', JSON.stringify(user))
  applyTheme()
}

const resetUser = () => {
  Object.assign(user, defaultUser)
  saveUser()
}

applyTheme()

export function useUser() {
  return {
    user,
    saveUser,
    resetUser,
    applyTheme
  }
}