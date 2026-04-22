<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '../i18n'
import zhMessages from '../i18n/zh'

const { t } = useI18n()

const form = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  city: '',
  message: '',
})

const handleSubmit = () => {
  alert(t.value.coopPage.submitAlert)
}

/* ---- Franchise brand logos ---- */
type BrandKey = keyof typeof zhMessages.brandItems
const franchiseBrands = computed(() => [
  { key: 'kaiyuanmingdu' as BrandKey, logo: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUZ-AeorYAAUwizbionQ758.jpg' },
  { key: 'kaiyuanmingting' as BrandKey, logo: 'https://rc2.zihu.com/g5/M00/49/EE/CgAGbGlChmuAfUWcAAXR7R8iZU0044.jpg' },
  { key: 'fangwai' as BrandKey, logo: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUBOAFA1eAARujHbcwiY174.jpg' },
  { key: 'guantang' as BrandKey, logo: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUAeACpm_AARHJK8FneA943.jpg' },
  { key: 'fangcaodi' as BrandKey, logo: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUKmAJojMAAV-F3Rfm_4153.jpg' },
  { key: 'manju' as BrandKey, logo: 'https://rc2.zihu.com/g5/M00/42/CC/CgAGbGi6emSAAo9tABHxkDsccbM239.jpg' },
  { key: 'monday' as BrandKey, logo: 'https://rc2.zihu.com/g5/M00/2D/5C/CgAGbGc6p1OAa8ODAANTa7NhjFo771.jpg' },
  { key: 'yiju' as BrandKey, logo: 'https://rc2.zihu.com/g4/M00/69/51/CgAG0mNLb4KAD8slAATYxn00GhA160.png' },
])

/* ---- Six Advantages ---- */
const advantages = computed(() => [
  { num: '01', title: t.value.coopPage.adv1Title, desc: t.value.coopPage.adv1Desc, img: 'https://rc2.zihu.com/g4/M00/74/CF/CgAG0mPBUIGAV18SAAE4PDJGcqs902.jpg' },
  { num: '02', title: t.value.coopPage.adv2Title, desc: t.value.coopPage.adv2Desc, img: 'https://rc2.zihu.com/g4/M00/74/CF/CgAG0mPBUImAbigEAAG2G37Jx5Y321.jpg' },
  { num: '03', title: t.value.coopPage.adv3Title, desc: t.value.coopPage.adv3Desc, img: 'https://rc2.zihu.com/g4/M00/77/37/CgAG0mPpoNGALCABAAEnHsiYIIg402.jpg' },
  { num: '04', title: t.value.coopPage.adv4Title, desc: t.value.coopPage.adv4Desc, img: 'https://rc2.zihu.com/g4/M00/77/37/CgAG0mPpoIKAOA7dAADt2o5x7n8943.jpg' },
  { num: '05', title: t.value.coopPage.adv5Title, desc: t.value.coopPage.adv5Desc, img: 'https://rc2.zihu.com/g4/M00/77/37/CgAG0mPpoQOAat3LAAEGrX30QzM465.jpg' },
  { num: '06', title: t.value.coopPage.adv6Title, desc: t.value.coopPage.adv6Desc, img: 'https://rc2.zihu.com/g4/M00/77/37/CgAG0mPpoC-AG1FRAAEkN2v1eqo076.jpg' },
])

/* ---- Process steps ---- */
const steps = computed(() => [
  t.value.coopPage.step1,
  t.value.coopPage.step2,
  t.value.coopPage.step3,
  t.value.coopPage.step4,
  t.value.coopPage.step5,
  t.value.coopPage.step6,
])

/* ---- Video ---- */
const videoPoster = 'https://rc2.zihu.com/g4/M00/74/D1/CgAG0mPB_KmAGHGLAAcOvMN_kXA947.jpg'
const videoUrl = 'https://img.betterwood.com//sys/-k7cw9tZsU9u6fCtCyMRsJ6.mp4'
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)

const toggleVideo = () => {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play()
    isPlaying.value = true
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}
</script>

<template>
  <div class="cooperation-page">
    <!-- ========== Hero ========== -->
    <section class="page-hero">
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>{{ t.coopPage.heroTitle }}</h1>
        <p>{{ t.coopPage.heroSubtitle }}</p>
      </div>
    </section>

    <!-- ========== Section 1: Franchise Brands ========== -->
    <section class="section franchise-section">
      <div class="container">
        <h2 class="section-title text-center">{{ t.coopPage.franchiseTitle }}</h2>
        <p class="section-subtitle text-center">{{ t.coopPage.franchiseSubtitle }}</p>
        <div class="brand-grid">
          <div v-for="brand in franchiseBrands" :key="brand.key" class="brand-logo-card">
            <img :src="brand.logo" :alt="t.brandItems[brand.key]?.name ?? brand.key" />
            <span class="brand-logo-name">{{ t.brandItems[brand.key]?.name ?? '' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== Section 2: Brand Video ========== -->
    <section class="section video-section">
      <div class="container">
        <h2 class="section-title text-center">{{ t.coopPage.videoTitle }}</h2>
        <p class="section-subtitle text-center">{{ t.coopPage.videoSubtitle }}</p>
        <div class="video-wrapper" @click="toggleVideo">
          <video
            ref="videoRef"
            :poster="videoPoster"
            :src="videoUrl"
            preload="none"
            playsinline
            @ended="isPlaying = false"
          ></video>
          <div v-if="!isPlaying" class="video-play-btn">
            <svg viewBox="0 0 64 64" width="64" height="64">
              <circle cx="32" cy="32" r="31" fill="rgba(0,0,0,0.45)" stroke="#fff" stroke-width="2" />
              <polygon points="26,20 26,44 46,32" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== Section 3: Six Operating Advantages ========== -->
    <section class="section advantages-section">
      <div class="container">
        <h2 class="section-title text-center">{{ t.coopPage.sixAdvTitle }}</h2>
        <p class="section-subtitle text-center">{{ t.coopPage.sixAdvSubtitle }}</p>
        <p class="section-desc text-center">{{ t.coopPage.sixAdvDesc }}</p>
        <div class="adv-grid">
          <div v-for="adv in advantages" :key="adv.num" class="adv-card">
            <div class="adv-img">
              <img :src="adv.img" :alt="adv.title" />
            </div>
            <div class="adv-body">
              <span class="adv-num">{{ adv.num }}</span>
              <h3>{{ adv.title }}</h3>
              <p>{{ adv.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== Section 4: Cooperation Process ========== -->
    <section class="section process-section">
      <div class="container">
        <h2 class="section-title text-center light">{{ t.coopPage.processTitle }}</h2>
        <div class="process-flow">
          <div v-for="(step, idx) in steps" :key="idx" class="process-step">
            <div class="step-number">{{ String(idx + 1).padStart(2, '0') }}</div>
            <div class="step-label">{{ step }}</div>
            <svg v-if="idx < steps.length - 1" class="step-arrow" viewBox="0 0 24 24" width="20" height="20">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== Section 5: Contact ========== -->
    <section class="section form-section">
      <div class="container">
        <div class="form-layout">
          <div class="form-info">
            <div class="section-icon"></div>
            <h2 class="section-title">{{ t.coopPage.contactTitle }}</h2>
            <p class="form-desc">{{ t.coopPage.contactDesc }}</p>
            <div class="contact-details">
              <div class="contact-item">
                <span class="contact-label">{{ t.coopPage.hotlineLabel }}</span>
                <span class="contact-value highlight">{{ t.coopPage.hotlineNumber }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">{{ t.coopPage.emailLabel }}</span>
                <span class="contact-value">{{ t.coopPage.emailValue }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">{{ t.coopPage.hqLabel }}</span>
                <span class="contact-value">{{ t.coopPage.hqAddr }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">{{ t.coopPage.hzLabel }}</span>
                <span class="contact-value">{{ t.coopPage.hzAddr }}</span>
              </div>
            </div>
          </div>

          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label>{{ t.coopPage.formName }} *</label>
                <input v-model="form.name" type="text" :placeholder="t.coopPage.formNamePh" required />
              </div>
              <div class="form-group">
                <label>{{ t.coopPage.formPhone }} *</label>
                <input v-model="form.phone" type="tel" :placeholder="t.coopPage.formPhonePh" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>{{ t.coopPage.formEmail }}</label>
                <input v-model="form.email" type="email" :placeholder="t.coopPage.formEmailPh" />
              </div>
              <div class="form-group">
                <label>{{ t.coopPage.formCompany }}</label>
                <input v-model="form.company" type="text" :placeholder="t.coopPage.formCompanyPh" />
              </div>
            </div>
            <div class="form-group">
              <label>{{ t.coopPage.formCity }}</label>
              <input v-model="form.city" type="text" :placeholder="t.coopPage.formCityPh" />
            </div>
            <div class="form-group">
              <label>{{ t.coopPage.formMessage }}</label>
              <textarea v-model="form.message" :placeholder="t.coopPage.formMsgPh" rows="4"></textarea>
            </div>
            <button type="submit" class="submit-btn">{{ t.coopPage.submit }}</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Shared ===== */
.text-center {
  text-align: center;
}

/* ===== Hero ===== */
.page-hero {
  height: 50vh;
  min-height: 360px;
  background: url('https://rc2.zihu.com/g5/M00/1B/E7/CgAGbGZMZkeAJaN0AAW6nd9Dxqc939.jpg') center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.page-hero-content {
  position: relative;
  text-align: center;
  color: #fff;
}

.page-hero-content h1 {
  font-size: 42px;
  font-weight: 300;
  letter-spacing: 8px;
  margin-bottom: 12px;
}

.page-hero-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

/* ===== Section common ===== */
.section-title {
  font-size: 28px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.section-title.light {
  color: #fff;
}

.section-subtitle {
  font-size: 15px;
  color: #999;
  margin-bottom: 12px;
}

.section-desc {
  font-size: 14px;
  color: #888;
  max-width: 640px;
  margin: 0 auto 40px;
  line-height: 1.7;
}

/* ===== Section 1: Franchise Brands ===== */
.franchise-section {
  background: #fff;
}

.brand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.brand-logo-card {
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
}

.brand-logo-card:hover {
  border-color: #c9a96e;
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
}

.brand-logo-card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.brand-logo-name {
  padding: 12px 8px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  text-align: center;
}

/* ===== Section 2: Brand Video ===== */
.video-section {
  background: #fafaf8;
}

.video-wrapper {
  position: relative;
  max-width: 900px;
  margin: 36px auto 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.video-wrapper video {
  width: 100%;
  display: block;
}

.video-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  transition: background 0.3s;
}

.video-wrapper:hover .video-play-btn {
  background: rgba(0, 0, 0, 0.25);
}

/* ===== Section 3: Six Advantages ===== */
.advantages-section {
  background: #fff;
}

.adv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 20px;
}

.adv-card {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.adv-card:hover {
  border-color: #c9a96e;
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
}

.adv-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.adv-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.adv-card:hover .adv-img img {
  transform: scale(1.05);
}

.adv-body {
  padding: 20px 24px 24px;
}

.adv-num {
  display: inline-block;
  font-size: 26px;
  font-weight: 700;
  color: #c9a96e;
  margin-bottom: 8px;
  line-height: 1;
}

.adv-body h3 {
  font-size: 17px;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-weight: 600;
}

.adv-body p {
  font-size: 13px;
  color: #888;
  line-height: 1.7;
}

/* ===== Section 4: Cooperation Process ===== */
.process-section {
  background: #1a1a1a;
  padding: 70px 0;
}

.process-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 48px;
  flex-wrap: wrap;
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  min-width: 100px;
}

.step-number {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 2px solid #c9a96e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a96e;
  font-size: 18px;
  font-weight: 600;
}

.step-label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
}

.step-arrow {
  position: absolute;
  right: -18px;
  top: 16px;
  color: rgba(255, 255, 255, 0.35);
}

/* ===== Section 5: Contact / Form ===== */
.form-section {
  background: #fafaf8;
}

.form-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.form-desc {
  font-size: 15px;
  color: #888;
  line-height: 1.8;
  margin-bottom: 30px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-label {
  font-size: 12px;
  color: #bbb;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-value {
  font-size: 15px;
  color: #333;
}

.contact-value.highlight {
  font-size: 22px;
  font-weight: 600;
  color: #c9a96e;
}

/* Form */
.contact-form {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
  font-family: inherit;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #c9a96e;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #c9a96e;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #b8963f;
}

/* ===== Responsive ===== */
@media (max-width: 960px) {
  .brand-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .adv-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .form-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .process-flow {
    gap: 20px;
  }

  .step-arrow {
    display: none;
  }
}

@media (max-width: 640px) {
  .brand-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .adv-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .process-flow {
    flex-direction: column;
    gap: 24px;
  }

  .step-arrow {
    display: none;
  }

  .page-hero-content h1 {
    font-size: 28px;
    letter-spacing: 4px;
  }
}
</style>
