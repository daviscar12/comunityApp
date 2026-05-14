<template>
  <ion-page>
    <ion-content class="settings-page" :fullscreen="true">
      <div class="settings-wrapper">
        <div class="settings-header">
          <button class="back-btn" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
            <span>Voltar</span>
          </button>

          <h1>Configurações</h1>
          <p>Gerencie seu perfil e personalize o app.</p>
        </div>

        <div class="settings-grid">
          <div class="settings-card profile-card">
            <h2>Perfil</h2>

            <div class="profile-top">
              <div class="avatar-box">
                <img :src="user.photo" alt="Foto de perfil" />
              </div>

              <div class="profile-actions">
                <label class="custom-upload">
                  <input type="file" accept="image/*" @change="handlePhotoChange" hidden />
                  Trocar foto
                </label>

                <button class="danger-outline" @click="removePhoto">
                  Remover foto
                </button>
              </div>
            </div>

            <div class="form-list">
              <div class="input-group">
                <label>Nome do usuário</label>
                <div class="input-box">
                  <ion-icon :icon="personOutline" />
                  <input v-model="user.name" type="text" placeholder="Digite seu nome" />
                </div>
              </div>

              <div class="input-group">
                <label>E-mail cadastrado</label>
                <div class="input-box">
                  <ion-icon :icon="mailOutline" />
                  <input v-model="user.email" type="email" placeholder="Digite seu e-mail" />
                </div>
              </div>

              <div class="input-group">
                <label>Senha</label>
                <div class="input-box">
                  <ion-icon :icon="lockClosedOutline" />
                  <input
                    v-model="user.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Digite sua senha"
                  />
                  <button type="button" class="icon-btn" @click="showPassword = !showPassword">
                    <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" />
                  </button>
                </div>
              </div>

              <div class="input-group">
                <label>Telefone</label>
                <div class="input-box">
                  <ion-icon :icon="callOutline" />
                  <input v-model="user.phone" type="text" placeholder="(00) 00000-0000" />
                </div>
              </div>
            </div>
          </div>

          <div class="settings-card">
            <h2>Personalização</h2>

            <div class="theme-section">
              <p class="section-text">
                Escolha a cor principal do aplicativo:
              </p>

              <div class="color-options">
                <button
                  v-for="color in colors"
                  :key="color.value"
                  class="color-btn"
                  :style="{ background: color.value }"
                  :class="{ active: user.themeColor === color.value }"
                  @click="changeTheme(color.value)"
                >
                  <ion-icon v-if="user.themeColor === color.value" :icon="checkmarkOutline" />
                </button>
              </div>
            </div>

            <div class="user-info-box">
              <h3>Informações do usuário</h3>

              <div class="info-row">
                <span>Nome</span>
                <strong>{{ user.name || 'Não informado' }}</strong>
              </div>

              <div class="info-row">
                <span>Email</span>
                <strong>{{ user.email || 'Não informado' }}</strong>
              </div>

              <div class="info-row">
                <span>Telefone</span>
                <strong>{{ user.phone || 'Não informado' }}</strong>
              </div>

              <div class="info-row">
                <span>Senha</span>
                <strong>{{ user.password || 'Não informada' }}</strong>
              </div>

              <div class="info-row">
                <span>Cor do app</span>
                <strong>{{ user.themeColor }}</strong>
              </div>
            </div>

            <div class="card-actions">
              <button class="save-btn" @click="saveSettings">
                Salvar alterações
              </button>

              <button class="voltar-btn" @click="goBack">
                Voltar para a página inicial
              </button>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import {
  arrowBackOutline,
  personOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  callOutline,
  checkmarkOutline
} from 'ionicons/icons'
import { useUser } from '../composable/useUser'

const router = useRouter()
const showPassword = ref(false)

const { user, saveUser } = useUser()

const colors = [
  { value: '#5d98cc' },
  { value: '#7c5cff' },
  { value: '#ff8a65' },
  { value: '#26a69a' },
  { value: '#f4c542' },
  { value: '#e85d75' }
]

const goBack = () => {
  router.back()
}

const changeTheme = (color: string) => {
  user.themeColor = color
  saveUser()
}

const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    user.photo = reader.result as string
    saveUser()
  }
  reader.readAsDataURL(file)
}

const removePhoto = () => {
  user.photo =
    'https://tse2.mm.bing.net/th/id/OIP.B-An5i5YsM9bmL3amzSBXQAAAA?w=416&h=416&rs=1&pid=ImgDetMain&o=7&rm=3'
  saveUser()
}

const saveSettings = () => {
  saveUser()
  alert('Alterações salvas com sucesso!')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

.settings-page {
  --background: #f3f5f8;
  font-family: 'Poppins', sans-serif;
}

.settings-wrapper {
  min-height: 100vh;
  padding: 28px;
}

.settings-header {
  margin-bottom: 24px;
}

.settings-header h1 {
  margin: 14px 0 8px;
  font-size: 34px;
  font-weight: 800;
  color: #1f1f1f;
}

.settings-header p {
  margin: 0;
  color: #69707a;
  font-size: 16px;
}

.back-btn {
  border: none;
  background: white;
  border-radius: 14px;
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #4f647a;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.settings-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 22px;
}

.settings-card {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.05);
}

.settings-card h2 {
  margin: 0 0 20px;
  font-size: 24px;
  font-weight: 800;
  color: #1f1f1f;
}

.profile-top {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.avatar-box img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #eef3f7;
}

.profile-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.custom-upload,
.danger-outline {
  border: none;
  border-radius: 14px;
  padding: 12px 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  cursor: pointer;
}

.custom-upload {
  background: var(--app-primary, #5d98cc);
  color: white;
}

.danger-outline {
  background: #fff1f1;
  color: #d14f4f;
}

.form-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #39424e;
}

.input-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 1.6px solid #dbe3ec;
  border-radius: 16px;
  height: 56px;
  padding: 0 16px;
}

.input-box ion-icon {
  font-size: 20px;
  color: #718399;
  flex-shrink: 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: #1f1f1f;
}

.icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-section {
  margin-bottom: 28px;
}

.section-text {
  margin: 0 0 14px;
  color: #5f6975;
  font-size: 15px;
}

.color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.color-btn {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.color-btn.active {
  border-color: #1f1f1f;
}

.user-info-box {
  background: #f8fafc;
  border: 1px solid #e4ebf2;
  border-radius: 18px;
  padding: 18px;
  margin-bottom: 20px;
}

.user-info-box h3 {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 700;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #e8edf3;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span {
  color: #6c7480;
}

.info-row strong {
  color: #1f1f1f;
  text-align: right;
  word-break: break-word;
}

.save-btn {
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: var(--app-primary, #5d98cc);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.voltar-btn {
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: var(--app-primary, #5d98cc);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 900px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .settings-wrapper {
    padding: 18px;
  }

  .settings-header h1 {
    font-size: 28px;
  }

  .profile-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-row strong {
    text-align: left;
  }
}
</style>