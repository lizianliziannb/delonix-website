<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n, type Locale } from '../i18n'

const router = useRouter()
const { t, locale, setLocale } = useI18n()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = computed(() => [
  { label: t.value.nav.home, path: '/' },
  { label: t.value.nav.about, path: '/about' },
  { label: t.value.nav.brands, path: '/brands' },
  { label: t.value.nav.advantages, path: '/advantages' },
  { label: t.value.nav.news, path: '/news' },
  { label: t.value.nav.cooperation, path: '/cooperation' },
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const navigateTo = (path: string) => {
  router.push(path)
  isMobileMenuOpen.value = false
}

const switchLang = (lang: Locale) => {
  setLocale(lang)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo" @click="navigateTo('/')">
        <div class="logo-text">
          <span class="logo-cn">德胧集团</span>
          <span class="logo-en">DELONIX GROUP</span>
        </div>
      </div>

      <!-- Desktop Nav -->
      <nav class="desktop-nav">
        <a
          v-for="item in navItems"
          :key="item.path"
          class="nav-link"
          :class="{ active: $route.path === item.path }"
          @click="navigateTo(item.path)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Language / Actions -->
      <div class="header-actions">
        <a class="lang-link" :class="{ active: locale === 'zh' }" @click="switchLang('zh')">简</a>
        <span class="lang-sep">/</span>
        <a class="lang-link" :class="{ active: locale === 'en' }" @click="switchLang('en')">EN</a>
        <span class="lang-sep">/</span>
        <a class="lang-link" :class="{ active: locale === 'id' }" @click="switchLang('id')">ID</a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-btn"
        :class="{ open: isMobileMenuOpen }"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Nav -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-nav">
        <a
          v-for="item in navItems"
          :key="item.path"
          class="mobile-nav-link"
          @click="navigateTo(item.path)"
        >
          {{ item.label }}
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.site-header.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-cn {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 4px;
  transition: color 0.3s;
}

.logo-en {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
  transition: color 0.3s;
}

.scrolled .logo-cn {
  color: #1a1a1a;
}

.scrolled .logo-en {
  color: #999;
}

/* Desktop Nav */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 36px;
}

.nav-link {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  position: relative;
  padding: 8px 0;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #c9a96e;
  transition: width 0.3s;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
}

.scrolled .nav-link {
  color: #555;
}

.scrolled .nav-link:hover,
.scrolled .nav-link.active {
  color: #1a1a1a;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lang-link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: color 0.3s;
}

.lang-link.active {
  color: #c9a96e;
  font-weight: 600;
}

.lang-sep {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}

.scrolled .lang-link {
  color: #999;
}

.scrolled .lang-link.active {
  color: #c9a96e;
}

.scrolled .lang-sep {
  color: #ccc;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  transition: all 0.3s;
}

.scrolled .mobile-menu-btn span {
  background: #333;
}

.mobile-menu-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.open span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Nav */
.mobile-nav {
  display: none;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.98);
  padding: 20px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.mobile-nav-link {
  padding: 14px 0;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 960px) {
  .desktop-nav,
  .header-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-nav {
    display: flex;
  }

  .header-container {
    padding: 0 20px;
    height: 64px;
  }

  .logo-cn {
    font-size: 18px;
  }
}
</style>
