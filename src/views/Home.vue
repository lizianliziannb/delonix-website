<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from '../i18n'

const { t, locale } = useI18n()

// === Banner ===
const currentSlide = ref(0)
const bannerImages = [
  'https://rc2.zihu.com/g5/M00/1B/E7/CgAGbGZMZkeAJaN0AAW6nd9Dxqc939.jpg',
  'https://rc2.zihu.com/g5/M00/1B/E7/CgAGbGZMZ1SAZ4qUAAXrqNyr7PA979.jpg',
]
let slideTimer: ReturnType<typeof setInterval>

// === Parallax ===
const scrollY = ref(0)
const onScroll = () => { scrollY.value = window.scrollY }

// === Counter Animation ===
const statsVisible = ref(false)
const counters = ref([0, 0, 0, 0])
const targetValues = [15, 1600, 245000, 4500]

function animateCounters() {
  if (statsVisible.value) return
  statsVisible.value = true
  targetValues.forEach((target, i) => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counters.value[i] = target
        clearInterval(timer)
      } else {
        counters.value[i] = Math.floor(current)
      }
    }, duration / steps)
  })
}

function formatNumber(n: number): string {
  if (n >= 10000) return n.toLocaleString()
  return n.toString()
}

// === Brands ===
const brandImages = [
  { key: 'kaiyuanmingdu', image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUZ-AeorYAAUwizbionQ758.jpg' },
  { key: 'kaiyuanmingting', image: 'https://rc2.zihu.com/g5/M00/49/EE/CgAGbGlChmuAfUWcAAXR7R8iZU0044.jpg' },
  { key: 'manju', image: 'https://rc2.zihu.com/g5/M00/42/CC/CgAGbGi6emSAAo9tABHxkDsccbM239.jpg' },
  { key: 'monday', image: 'https://rc2.zihu.com/g5/M00/2D/5C/CgAGbGc6p1OAa8ODAANTa7NhjFo771.jpg' },
  { key: 'fangwai', image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUBOAFA1eAARujHbcwiY174.jpg' },
  { key: 'guantang', image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUAeACpm_AARHJK8FneA943.jpg' },
  { key: 'fangcaodi', image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUKmAJojMAAV-F3Rfm_4153.jpg' },
]

// === News ===
const newsImages = [
  'https://rc2.zihu.com/g5/M00/50/35/CgAGbGnMfg-ATMOCAAHB3WCxqcU362.jpg',
  'https://rc2.zihu.com/g5/M00/42/2E/CgAGbGixYD2ATOdaAAPQr1w6UPQ626.png',
  'https://rc2.zihu.com/g5/M00/41/F7/CgAGbGiu3LeAaMQgAAtwVJsYFeQ479.png',
  'https://rc2.zihu.com/g5/M00/41/0C/CgAGbGiezeeAQLM0AALWwFZuV_Q010.jpg',
  'https://rc2.zihu.com/g5/M00/2F/57/CgAGbGdaXb-AaeJFAAn-FbEzdcw245.png',
  'https://rc2.zihu.com/g5/M00/2C/A1/CgAGbGct3sOAbjWxAA2Qk0_QntA208.png',
]

const newsKeys = [
  { titleZh: 'AI重构生态 客户驱动增长 德胧集团召开2026战略发布会', titleEn: 'AI Reshaping Ecosystem - Delonix Group 2026 Strategy Conference', titleId: 'AI Membangun Ulang Ekosistem - Konferensi Strategi Delonix Group 2026' },
  { titleZh: '德胧集团旗下核心品牌焕新 开启全新叙事', titleEn: 'Delonix Group Core Brands Refreshed with New Narrative', titleId: 'Merek Inti Delonix Group Diperbarui dengan Narasi Baru' },
  { titleZh: '德胧集团深化东南亚战略布局', titleEn: 'Delonix Group Deepens Southeast Asia Strategic Layout', titleId: 'Delonix Group Memperdalam Tata Letak Strategis Asia Tenggara' },
  { titleZh: '德胧集团揽获海内外6项荣誉！', titleEn: 'Delonix Group Wins 6 Awards at Home and Abroad!', titleId: 'Delonix Group Meraih 6 Penghargaan!' },
  { titleZh: '德胧集团与万豪国际集团宣布达成8个合作项目签约', titleEn: 'Delonix Group and Marriott International Announce 8 Project Signings', titleId: 'Delonix Group dan Marriott International Tandatangani 8 Proyek' },
  { titleZh: '共话印尼新商机！全国首个印尼酒店投资者峰会举行', titleEn: 'Indonesia Hotel Investor Summit Held in Hangzhou', titleId: 'KTT Investor Hotel Indonesia Pertama Diadakan di Hangzhou' },
]

const getNewsTitle = (item: typeof newsKeys[0]) => {
  if (locale.value === 'en') return item.titleEn
  if (locale.value === 'id') return item.titleId
  return item.titleZh
}

// === Lifecycle ===
onMounted(() => {
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % bannerImages.length
  }, 5000)

  window.addEventListener('scroll', onScroll, { passive: true })

  // Reveal observer
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view') }),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  // Stats counter observer
  const statsObs = new IntersectionObserver(
    (entries) => { if (entries[0]?.isIntersecting) animateCounters() },
    { threshold: 0.4 }
  )
  const statsEl = document.querySelector('.stats-section')
  if (statsEl) statsObs.observe(statsEl)
})

onUnmounted(() => {
  clearInterval(slideTimer)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="home">
    <!-- ===== Hero Banner ===== -->
    <section class="hero-banner">
      <div class="banner-slides" :style="{ transform: `translateY(${scrollY * 0.12}px)` }">
        <div
          v-for="(img, index) in bannerImages"
          :key="index"
          class="banner-slide"
          :class="{ active: currentSlide === index }"
        >
          <div class="banner-bg" :style="{ backgroundImage: `url(${img})` }"></div>
          <div class="banner-overlay"></div>
        </div>
      </div>
      <div class="banner-content" :style="{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.3}px)`, opacity: 1 - scrollY / 700 }">
        <div class="banner-badge">DELONIX GROUP</div>
        <transition name="text-fade" mode="out-in">
          <h1 class="banner-title" :key="'title-' + currentSlide">{{ currentSlide === 0 ? t.banner.slide1.title : t.banner.slide2.title }}</h1>
        </transition>
        <div class="banner-line"></div>
        <transition name="text-fade" mode="out-in">
          <p class="banner-subtitle" :key="'sub-' + currentSlide">{{ currentSlide === 0 ? t.banner.slide1.subtitle : t.banner.slide2.subtitle }}</p>
        </transition>
      </div>
      <div class="banner-dots">
        <span v-for="(_, index) in bannerImages" :key="index" class="dot" :class="{ active: currentSlide === index }" @click="currentSlide = index">
          <span class="dot-progress" :class="{ running: currentSlide === index }"></span>
        </span>
      </div>
      <div class="scroll-indicator">
        <span class="scroll-text">SCROLL</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- ===== About ===== -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-text reveal">
            <div class="section-deco"></div>
            <h2 class="section-heading">{{ t.about.sectionTitle }}</h2>
            <p class="about-desc">{{ t.about.desc1 }}</p>
            <p class="about-desc">{{ t.about.desc2 }}</p>
            <p class="about-desc">{{ t.about.desc3 }}</p>
            <router-link to="/advantages" class="more-btn">
              <span>{{ t.common.more }}</span>
              <svg width="20" height="12" viewBox="0 0 20 12"><path d="M1 6h16M13 1l5 5-5 5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
            </router-link>
          </div>
          <div class="about-image reveal" style="transition-delay: 0.2s">
            <div class="image-frame">
              <img src="https://rc2.zihu.com/g4/M00/69/51/CgAG0mNLb4KAD8slAATYxn00GhA160.png" :alt="t.about.sectionTitle" />
              <div class="image-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Stats ===== -->
    <section class="stats-section">
      <div class="stats-bg"></div>
      <div class="stats-overlay"></div>
      <div class="container stats-container">
        <div class="stats-header reveal">
          <div class="section-deco light"></div>
          <h2>{{ t.stats.title }}</h2>
        </div>
        <div class="stats-grid">
          <div v-for="(stat, idx) in [
            { value: counters[0], suffix: '+', label: t.stats.brands },
            { value: counters[1], suffix: '+', label: t.stats.hotels },
            { value: counters[2], suffix: '+', label: t.stats.rooms },
            { value: counters[3], suffix: '万+', label: t.stats.members },
          ]" :key="idx" class="stat-item reveal" :style="{ transitionDelay: idx * 0.15 + 's' }">
            <div class="stat-number">
              <span class="stat-value">{{ formatNumber(stat.value) }}</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <div class="stat-line"></div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Vision ===== -->
    <section class="vision-section">
      <div class="container">
        <div class="vision-content reveal">
          <div class="section-deco center"></div>
          <h2 class="vision-title">{{ t.vision.title }}</h2>
          <p class="vision-subtitle">{{ t.vision.subtitle }}</p>
          <div class="vision-line"></div>
          <p class="vision-desc">{{ t.vision.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ===== Brands ===== -->
    <section class="brands-section">
      <div class="container">
        <div class="brands-header reveal">
          <h2 class="section-heading">{{ t.brandsSection.title }}</h2>
          <p class="section-sub">{{ t.brandsSection.subtitle }}</p>
        </div>
        <div class="brands-grid">
          <div v-for="(brand, idx) in brandImages" :key="brand.key" class="brand-card reveal" :style="{ transitionDelay: idx * 0.08 + 's' }">
            <div class="brand-image">
              <img :src="brand.image" :alt="(t.brandItems as any)[brand.key]?.name" />
              <div class="brand-hover">
                <div class="brand-hover-inner">
                  <h4>{{ (t.brandItems as any)[brand.key]?.name }}</h4>
                  <div class="brand-hover-line"></div>
                  <p>{{ (t.brandItems as any)[brand.key]?.desc }}</p>
                </div>
              </div>
            </div>
            <h3 class="brand-name">{{ (t.brandItems as any)[brand.key]?.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== News ===== -->
    <section class="news-section">
      <div class="container">
        <div class="news-header reveal">
          <div>
            <div class="section-deco"></div>
            <h2 class="section-heading">{{ t.newsSection.title }}</h2>
          </div>
          <router-link to="/news" class="view-more">
            {{ t.newsSection.viewMore }}
            <svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 5h12M10 1l4 4-4 4" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
          </router-link>
        </div>
        <div class="news-grid">
          <div v-for="(item, idx) in newsKeys" :key="idx" class="news-card reveal" :style="{ transitionDelay: idx * 0.08 + 's' }">
            <div class="news-image">
              <img :src="newsImages[idx]" :alt="item.titleEn" />
            </div>
            <div class="news-content">
              <h3 class="news-title">{{ getNewsTitle(item) }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="cta-section">
      <div class="cta-bg"></div>
      <div class="cta-overlay"></div>
      <div class="container cta-container">
        <div class="cta-content reveal">
          <h2>{{ t.cta.title }}</h2>
          <p>{{ t.cta.subtitle }}</p>
          <div class="cta-actions">
            <a href="tel:1010-5050" class="cta-btn primary">{{ t.cta.consult }}</a>
            <router-link to="/cooperation" class="cta-btn secondary">{{ t.cta.invest }}</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Reveal ===== */
.reveal { opacity: 0; transform: translateY(45px); transition: opacity 0.9s cubic-bezier(.25,.46,.45,.94), transform 0.9s cubic-bezier(.25,.46,.45,.94); }
.reveal.in-view { opacity: 1; transform: translateY(0); }

/* ===== Section Deco ===== */
.section-deco { width: 40px; height: 2px; background: #c9a96e; margin-bottom: 20px; }
.section-deco.light { background: rgba(201,169,110,0.7); }
.section-deco.center { margin: 0 auto 20px; }
.section-heading { font-size: 32px; font-weight: 200; color: #1a1a1a; letter-spacing: 4px; margin-bottom: 16px; }
.section-sub { font-size: 14px; color: #999; letter-spacing: 1px; }

/* ===== Hero Banner ===== */
.hero-banner { position: relative; height: 100vh; min-height: 600px; overflow: hidden; }
.banner-slides { position: absolute; inset: 0; will-change: transform; }

.banner-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1); z-index: 0; }
.banner-slide.active { opacity: 1; z-index: 1; }

.banner-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  image-rendering: auto;
  /* Always run Ken Burns so there's no jump on slide switch */
  animation: kenBurns 18s ease-in-out infinite alternate;
  will-change: transform;
}

/* Stagger the two slides so they're at different animation phases */
.banner-slide:nth-child(1) .banner-bg { animation-delay: 0s; }
.banner-slide:nth-child(2) .banner-bg { animation-delay: -9s; }

@keyframes kenBurns {
  0% { transform: scale(1.02); }
  100% { transform: scale(1.08) translate(-0.5%, -0.5%); }
}

.banner-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.65) 100%); }

.banner-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 2; width: 90%; }

.banner-badge { display: inline-block; padding: 7px 24px; border: 1px solid rgba(201,169,110,0.5); color: #c9a96e; font-size: 11px; letter-spacing: 7px; margin-bottom: 30px; animation: fadeSlideIn 1s 0.3s both; }
.banner-title { font-size: 52px; font-weight: 200; color: #fff; letter-spacing: 14px; margin-bottom: 20px; text-shadow: 0 3px 40px rgba(0,0,0,0.25); }
.banner-line { width: 50px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,169,110,0.8), transparent); margin: 0 auto 20px; animation: fadeSlideIn 1s 0.7s both; }
.banner-subtitle { font-size: 16px; color: rgba(255,255,255,0.75); letter-spacing: 4px; font-weight: 300; }

@keyframes fadeSlideIn { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }

/* Text transition on slide switch */
.text-fade-enter-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.text-fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.text-fade-enter-from { opacity: 0; transform: translateY(12px); }
.text-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* Banner dots with progress */
.banner-dots { position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 3; }
.dot { width: 48px; height: 3px; background: rgba(255,255,255,0.2); cursor: pointer; position: relative; overflow: hidden; border-radius: 2px; }
.dot-progress { position: absolute; inset: 0; background: #c9a96e; transform: scaleX(0); transform-origin: left; border-radius: 2px; }
.dot-progress.running { animation: dotFill 5s linear forwards; }
@keyframes dotFill { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }

/* Scroll indicator */
.scroll-indicator { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.scroll-text { font-size: 9px; color: rgba(255,255,255,0.5); letter-spacing: 4px; }
.scroll-line { width: 1px; height: 28px; background: linear-gradient(to bottom, rgba(201,169,110,0.7), transparent); animation: scrollPulse 2.5s ease-in-out infinite; }
@keyframes scrollPulse { 0%,100% { opacity: 1; transform: scaleY(1); } 50% { opacity: 0.3; transform: scaleY(0.5); } }

/* ===== About ===== */
.about-section { padding: 110px 0; background: #fff; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.about-desc { font-size: 15px; color: #777; line-height: 2; margin-bottom: 16px; }
.more-btn { display: inline-flex; align-items: center; gap: 10px; margin-top: 28px; padding: 14px 36px; border: 1px solid #c9a96e; color: #c9a96e; font-size: 13px; letter-spacing: 3px; transition: all 0.4s; position: relative; overflow: hidden; }
.more-btn::before { content: ''; position: absolute; inset: 0; background: #c9a96e; transform: scaleX(0); transform-origin: left; transition: transform 0.4s; z-index: -1; }
.more-btn:hover { color: #fff; }
.more-btn:hover::before { transform: scaleX(1); }
.more-btn svg { transition: transform 0.3s; }
.more-btn:hover svg { transform: translateX(4px); }

.image-frame { position: relative; border-radius: 12px; overflow: hidden; }
.image-frame img { width: 100%; display: block; transition: transform 0.8s; }
.image-frame:hover img { transform: scale(1.04); }
.image-accent { position: absolute; bottom: -8px; right: -8px; width: 40%; height: 40%; border: 2px solid rgba(201,169,110,0.3); border-radius: 0 0 12px 0; pointer-events: none; }

/* ===== Stats ===== */
.stats-section { position: relative; padding: 100px 0; overflow: hidden; }
.stats-bg { position: absolute; inset: -40px; background: url('https://rc2.zihu.com/g5/M00/1B/E7/CgAGbGZMZkeAJaN0AAW6nd9Dxqc939.jpg') center/cover; filter: blur(3px); }
.stats-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(10,10,30,0.92) 0%, rgba(15,30,60,0.88) 100%); }
.stats-container { position: relative; z-index: 1; }
.stats-header { margin-bottom: 60px; }
.stats-header h2 { font-size: 30px; font-weight: 200; color: #fff; letter-spacing: 5px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stat-item { text-align: center; padding: 40px 20px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); transition: all 0.4s; }
.stat-item:hover { border-color: rgba(201,169,110,0.4); transform: translateY(-6px); background: rgba(255,255,255,0.06); }
.stat-number { display: flex; align-items: baseline; justify-content: center; gap: 2px; margin-bottom: 8px; }
.stat-value { font-size: 46px; font-weight: 200; color: #c9a96e; line-height: 1; font-variant-numeric: tabular-nums; }
.stat-suffix { font-size: 18px; color: #c9a96e; font-weight: 300; }
.stat-line { width: 24px; height: 1px; background: rgba(201,169,110,0.4); margin: 12px auto; }
.stat-label { font-size: 13px; color: rgba(255,255,255,0.6); letter-spacing: 2px; }

/* ===== Vision ===== */
.vision-section { padding: 110px 0; background: #fafaf8; text-align: center; }
.vision-content { max-width: 700px; margin: 0 auto; }
.vision-title { font-size: 34px; font-weight: 200; color: #1a1a1a; margin-bottom: 20px; letter-spacing: 5px; }
.vision-subtitle { font-size: 18px; color: #c9a96e; margin-bottom: 16px; letter-spacing: 3px; font-weight: 300; }
.vision-line { width: 30px; height: 1px; background: linear-gradient(90deg, transparent, #c9a96e, transparent); margin: 0 auto 20px; }
.vision-desc { font-size: 15px; color: #999; line-height: 2; }

/* ===== Brands ===== */
.brands-section { padding: 110px 0; background: #fff; }
.brands-header { text-align: center; margin-bottom: 60px; }
.brands-header .section-heading { text-align: center; }
.brands-header .section-sub { text-align: center; }
.brands-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.brand-card { cursor: pointer; }
.brand-image { position: relative; overflow: hidden; border-radius: 10px; aspect-ratio: 16/10; }
.brand-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(.25,.46,.45,.94); }
.brand-card:hover .brand-image img { transform: scale(1.1); }

.brand-hover { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.85) 100%); display: flex; align-items: flex-end; padding: 28px; opacity: 0; transition: opacity 0.5s; }
.brand-card:hover .brand-hover { opacity: 1; }
.brand-hover-inner { transform: translateY(10px); transition: transform 0.5s; }
.brand-card:hover .brand-hover-inner { transform: translateY(0); }
.brand-hover h4 { font-size: 16px; color: #c9a96e; font-weight: 500; letter-spacing: 2px; margin-bottom: 8px; }
.brand-hover-line { width: 20px; height: 1px; background: rgba(201,169,110,0.6); margin-bottom: 10px; }
.brand-hover p { font-size: 12px; color: rgba(255,255,255,0.8); line-height: 1.7; }

.brand-name { font-size: 16px; font-weight: 400; color: #333; margin-top: 16px; text-align: center; letter-spacing: 1px; }

/* ===== News ===== */
.news-section { padding: 110px 0; background: #f8f7f5; }
.news-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; }
.view-more { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; color: #c9a96e; transition: all 0.3s; letter-spacing: 1px; }
.view-more:hover { gap: 10px; }
.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.news-card { background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04); transition: all 0.4s; }
.news-card:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
.news-image { aspect-ratio: 16/9; overflow: hidden; }
.news-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s; }
.news-card:hover .news-image img { transform: scale(1.08); }
.news-content { padding: 24px; }
.news-title { font-size: 15px; font-weight: 500; color: #1a1a1a; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* ===== CTA ===== */
.cta-section { position: relative; padding: 120px 0; overflow: hidden; text-align: center; }
.cta-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #c9a96e 0%, #a88840 50%, #8b6e2f 100%); }
.cta-overlay { position: absolute; inset: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><path d="M0 0h60v60H0z" fill="none"/><circle cx="30" cy="30" r="0.5" fill="rgba(255,255,255,0.08)"/></svg>'); }
.cta-container { position: relative; z-index: 1; }
.cta-content h2 { font-size: 38px; color: #fff; margin-bottom: 14px; font-weight: 200; letter-spacing: 5px; }
.cta-content p { font-size: 15px; color: rgba(255,255,255,0.8); margin-bottom: 40px; letter-spacing: 3px; }
.cta-actions { display: flex; gap: 18px; justify-content: center; }
.cta-btn { padding: 15px 44px; font-size: 14px; border-radius: 3px; transition: all 0.4s; letter-spacing: 2px; }
.cta-btn.primary { background: #fff; color: #a88840; font-weight: 500; }
.cta-btn.primary:hover { background: #1a1a1a; color: #fff; }
.cta-btn.secondary { border: 1px solid rgba(255,255,255,0.7); color: #fff; position: relative; overflow: hidden; }
.cta-btn.secondary::before { content: ''; position: absolute; inset: 0; background: #fff; transform: scaleX(0); transform-origin: left; transition: transform 0.4s; z-index: -1; }
.cta-btn.secondary:hover { color: #a88840; }
.cta-btn.secondary:hover::before { transform: scaleX(1); }

/* ===== Responsive ===== */
@media (max-width: 960px) {
  .banner-title { font-size: 34px; letter-spacing: 8px; }
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .brands-grid { grid-template-columns: repeat(2, 1fr); }
  .news-grid { grid-template-columns: repeat(2, 1fr); }
  .cta-content h2 { font-size: 28px; }
  .cta-actions { flex-direction: column; align-items: center; }
}

@media (max-width: 640px) {
  .banner-title { font-size: 26px; letter-spacing: 5px; }
  .banner-badge { font-size: 9px; letter-spacing: 5px; }
  .banner-subtitle { font-size: 13px; letter-spacing: 2px; }
  .section-heading { font-size: 24px; letter-spacing: 3px; }
  .about-section, .vision-section, .brands-section, .news-section { padding: 70px 0; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .stat-value { font-size: 34px; }
  .brands-grid { grid-template-columns: 1fr; }
  .news-grid { grid-template-columns: 1fr; }
  .cta-content h2 { font-size: 22px; letter-spacing: 3px; }
}
</style>
