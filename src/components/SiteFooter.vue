<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const brands = [
  'Grand New Century', 'Maison New Century', 'Model J', 'Hotel MONday',
  'Found Retreat', 'Grand House', 'Wonderland Resorts', 'Yi Ju',
]

const footerLinks = computed(() => [
  {
    title: t.value.footer.aboutTitle,
    links: [
      { label: t.value.footer.betterwood, href: '/about' },
      { label: t.value.footer.earnRedeem, href: '/about' },
      { label: t.value.footer.memberLevel, href: '/about' },
      { label: t.value.footer.loginReg, href: '/about' },
    ],
  },
  {
    title: t.value.footer.quickLinks,
    links: [
      { label: t.value.footer.ourBrands, href: '/brands' },
      { label: t.value.footer.advantage, href: '/advantages' },
      { label: t.value.footer.newsDynamic, href: '/news' },
      { label: t.value.footer.investCoop, href: '/cooperation' },
    ],
  },
])
</script>

<template>
  <footer class="site-footer">
    <!-- Top Brands Bar -->
    <div class="footer-brands">
      <div class="container">
        <div class="brands-grid">
          <span v-for="brand in brands" :key="brand" class="brand-tag">{{ brand }}</span>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Logo & Info -->
          <div class="footer-info">
            <div class="footer-logo">
              <span class="footer-logo-cn">德胧集团</span>
              <span class="footer-logo-en">DELONIX GROUP</span>
            </div>
            <p class="footer-desc">
              {{ t.footer.desc }}
            </p>
            <div class="footer-contact">
              <p>{{ t.footer.hotline }}<strong>1010-5050</strong></p>
              <p>{{ t.footer.email }}<strong>development@delonixmail.com</strong></p>
            </div>
          </div>

          <!-- Links -->
          <div v-for="group in footerLinks" :key="group.title" class="footer-link-group">
            <h4 class="footer-link-title">{{ group.title }}</h4>
            <router-link
              v-for="link in group.links"
              :key="link.label"
              :to="link.href"
              class="footer-link"
            >
              {{ link.label }}
            </router-link>
          </div>

          <!-- Address -->
          <div class="footer-address">
            <h4 class="footer-link-title">{{ t.footer.contactUs }}</h4>
            <div class="address-item">
              <span class="address-label">{{ t.footer.hqShenzhen }}</span>
              <span>{{ t.footer.addrShenzhen }}</span>
            </div>
            <div class="address-item">
              <span class="address-label">{{ t.footer.officeHangzhou }}</span>
              <span>{{ t.footer.addrHangzhou }}</span>
            </div>
            <div class="address-item">
              <span class="address-label">{{ t.footer.officeJakarta }}</span>
              <span>{{ t.footer.addrJakarta }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="container">
        <p>{{ t.footer.copyright }} &nbsp; {{ t.footer.icp }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #1a1a1a;
  color: #bbb;
}

/* Brands Bar */
.footer-brands {
  background: #222;
  padding: 20px 0;
  border-bottom: 1px solid #333;
}

.brands-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.brand-tag {
  font-size: 13px;
  color: #999;
  padding: 6px 16px;
  border: 1px solid #444;
  border-radius: 20px;
  transition: all 0.3s;
  cursor: pointer;
}

.brand-tag:hover {
  color: #c9a96e;
  border-color: #c9a96e;
}

/* Main Footer */
.footer-main {
  padding: 60px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 40px;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.footer-logo-cn {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 4px;
}

.footer-logo-en {
  font-size: 11px;
  color: #666;
  letter-spacing: 2px;
  margin-top: 4px;
}

.footer-desc {
  font-size: 14px;
  line-height: 1.8;
  color: #888;
  margin-bottom: 24px;
}

.footer-contact p {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
}

.footer-contact strong {
  color: #c9a96e;
}

.footer-link-group {
  display: flex;
  flex-direction: column;
}

.footer-link-title {
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  margin-bottom: 20px;
}

.footer-link {
  font-size: 14px;
  color: #888;
  padding: 6px 0;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #c9a96e;
}

.footer-address {
  display: flex;
  flex-direction: column;
}

.address-item {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.address-label {
  color: #999;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

/* Bottom */
.footer-bottom {
  border-top: 1px solid #333;
  padding: 20px 0;
  text-align: center;
}

.footer-bottom p {
  font-size: 12px;
  color: #666;
}

@media (max-width: 960px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
