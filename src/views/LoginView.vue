<template>
  <ion-page>
    <ion-content class="auth-page" :fullscreen="true">
      <div class="auth-container">
        <div class="auth-left">
          <div class="brand-box">
            <div class="brand-icon">
              <ion-icon :icon="chatbubbleEllipses" />
            </div>
            <h1>Comunity</h1>
          </div>

          <div class="back-button" @click="goBack">
          <ion-icon :icon="arrowBackOutline" />
          <span>Voltar</span>
          </div>

          <div class="welcome-box">
            <h2>{{ isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta' }}</h2>
            <p>
              {{
                isLogin
                  ? 'Entre na sua conta para continuar e ver os eventos da comunidade.'
                  : 'Cadastre-se para participar dos eventos e interagir com a comunidade.'
              }}
            </p>
          </div>
        </div>

        <div class="auth-right">
          <div class="form-card">
            <div class="switch-tabs">
              <button
                :class="['tab-btn', isLogin ? 'active' : '']"
                @click="isLogin = true"
              >
                Entrar
              </button>
              <button
                :class="['tab-btn', !isLogin ? 'active' : '']"
                @click="isLogin = false"
              >
                Criar conta
              </button>
            </div>

            <form class="auth-form" @submit.prevent="handleSubmit">
              <div v-if="!isLogin" class="input-group">
                <label>Nome</label>
                <div class="input-box">
                  <ion-icon :icon="personOutline" />
                  <input v-model="form.name" type="text" placeholder="Seu nome" />
                </div>
              </div>

              <div class="input-group">
                <label>E-mail</label>
                <div class="input-box">
                  <ion-icon :icon="mailOutline" />
                  <input v-model="form.email" type="email" placeholder="Seu e-mail" />
                </div>
              </div>

              <div class="input-group">
                <label>Senha</label>
                <div class="input-box">
                  <ion-icon :icon="lockClosedOutline" />
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Sua senha"
                  />
                  <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                    <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" />
                  </button>
                </div>
              </div>

              <div v-if="!isLogin" class="input-group">
                <label>Confirmar senha</label>
                <div class="input-box">
                  <ion-icon :icon="shieldCheckmarkOutline" />
                  <input
                    v-model="form.confirmPassword"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Confirme sua senha"
                  />
                </div>
              </div>

              <div v-if="isLogin" class="form-options">
                <label class="remember-me">
                  <input type="checkbox" v-model="rememberMe" />
                  <span>Lembrar de mim</span>
                </label>

                <button type="button" class="link-btn">
                  Esqueci minha senha
                </button>
              </div>

              <ion-button expand="block" class="submit-btn" type="submit">
                {{ isLogin ? 'Entrar' : 'Criar conta' }}
              </ion-button>

              <div class="divider">
                <span>ou</span>
              </div>

              <button type="button" class="social-btn">
                <ion-icon :icon="logoGoogle" />
                Continuar com Google
              </button>

              <p class="bottom-text">
                {{
                  isLogin
                    ? 'Ainda não tem conta?'
                    : 'Já possui uma conta?'
                }}
                <button
                  type="button"
                  class="inline-link"
                  @click="isLogin = !isLogin"
                >
                  {{ isLogin ? 'Criar agora' : 'Entrar' }}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { arrowBackOutline } from 'ionicons/icons'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue'
import {
  chatbubbleEllipses,
  personOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  shieldCheckmarkOutline,
  logoGoogle
} from 'ionicons/icons'

const router = useRouter()

const isLogin = ref(true)
const showPassword = ref(false)
const rememberMe = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})



const goBack = () => {
  router.back()
}

const handleSubmit = () => {
  if (!isLogin.value) {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert('Preencha todos os campos.')
      return
    }

    if (form.password !== form.confirmPassword) {
      alert('As senhas não coincidem.')
      return
    }
  } else {
    if (!form.email || !form.password) {
      alert('Preencha e-mail e senha.')
      return
    }
  }

  router.push('/tabs/home')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

.auth-page {
  --background: linear-gradient(135deg, #f1deb1 0%, #f5f5f5 45%, #dbeaf7 100%);
  font-family: 'Poppins', sans-serif;
}

.auth-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.auth-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
}

.brand-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: var(--app-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.brand-box h1 {
  margin: 0;
  font-size: 42px;
  font-weight: 800;
  color: #1f1f1f;
}

.welcome-box h2 {
  margin: 0 0 14px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 800;
  color: #1f1f1f;
}

.welcome-box p {
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: #5f5f5f;
  max-width: 520px;
}

.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-card {
  width: 100%;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  padding: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

.switch-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #eef3f8;
  border-radius: 16px;
  padding: 6px;
  margin-bottom: 26px;
}

.tab-btn {
  height: 48px;
  border: none;
  background: transparent;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #56708a;
  cursor: pointer;
  transition: 0.2s ease;
}

.tab-btn.active {
  background: #ffffff;
  color: #1f1f1f;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.auth-form {
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
  color: #3a3a3a;
}

.input-box {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 58px;
  padding: 0 16px;
  border: 1.8px solid #d7e0ea;
  background: #ffffff;
  border-radius: 16px;
  transition: 0.2s ease;
}

.input-box:focus-within {
  border-color: var(--app-primary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.08);
}

.input-box ion-icon {
  font-size: 20px;
  color: #6f89a1;
  flex-shrink: 0;
}

.input-box input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: #1f1f1f;
}

.eye-btn {
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.eye-btn ion-icon {
  font-size: 20px;
  color: #7a8795;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 2px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #505050;
}

.link-btn,
.inline-link {
  border: none;
  background: transparent;
  color: var(--app-primary);
  font-weight: 700;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.submit-btn {
  --background: var(--app-primary);
  --background-hover: var(--app-primary);
  --color: #ffffff;
  --border-radius: 16px;
  height: 56px;
  font-weight: 800;
  font-size: 16px;
  text-transform: none;
  margin-top: 8px;
}

.divider {
  position: relative;
  text-align: center;
  margin: 6px 0 2px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #dde3ea;
}

.divider span {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  padding: 0 14px;
  color: #7b8490;
  font-size: 14px;
}

.social-btn {
  height: 54px;
  border-radius: 16px;
  border: 1.8px solid #d7e0ea;
  background: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.social-btn ion-icon {
  font-size: 20px;
}

.bottom-text {
  margin: 8px 0 0;
  text-align: center;
  color: #646d77;
  font-size: 14px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  color: var(--app-primary);
  margin-bottom: 20px;
  width: fit-content;
  transition: 0.2s;
}

.back-button:hover {
  opacity: 0.7;
}

.back-button ion-icon {
  font-size: 20px;
}

@media (max-width: 900px) {
  .auth-container {
    grid-template-columns: 1fr;
  }

  .auth-left {
    padding: 32px 24px 12px;
  }

  .brand-box h1 {
    font-size: 34px;
  }

  .welcome-box h2 {
    font-size: 34px;
  }

  .welcome-box p {
    font-size: 16px;
  }

  .auth-right {
    padding: 20px 18px 30px;
  }

  .form-card {
    max-width: 100%;
    padding: 22px;
  }
}
</style>