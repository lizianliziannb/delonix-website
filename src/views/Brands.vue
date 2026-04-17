<script setup lang="ts">
import { useI18n } from '../i18n'

const { t } = useI18n()

const brands = [
  {
    key: 'kaiyuanmingdu',
    image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUZ-AeorYAAUwizbionQ758.jpg',
    color: '#8B6914',
  },
  {
    key: 'kaiyuanmingting',
    image: 'https://rc2.zihu.com/g5/M00/49/EE/CgAGbGlChmuAfUWcAAXR7R8iZU0044.jpg',
    color: '#6B3A2E',
  },
  {
    key: 'manju',
    image: 'https://rc2.zihu.com/g5/M00/42/CC/CgAGbGi6emSAAo9tABHxkDsccbM239.jpg',
    color: '#2E5A88',
  },
  {
    key: 'monday',
    image: 'https://rc2.zihu.com/g5/M00/2D/5C/CgAGbGc6p1OAa8ODAANTa7NhjFo771.jpg',
    color: '#1A1A2E',
  },
  {
    key: 'fangwai',
    image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUBOAFA1eAARujHbcwiY174.jpg',
    color: '#3A5A40',
  },
  {
    key: 'guantang',
    image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUAeACpm_AARHJK8FneA943.jpg',
    color: '#5C3D2E',
  },
  {
    key: 'fangcaodi',
    image: 'https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUKmAJojMAAV-F3Rfm_4153.jpg',
    color: '#4A7C59',
  },
  {
    key: 'yiju',
    image: 'https://rc2.zihu.com/g4/M00/69/51/CgAG0mNLb4KAD8slAATYxn00GhA160.png',
    color: '#6B5B73',
  },
]
</script>

<template>
  <div class="brands-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>{{ t.brandsPage.heroTitle }}</h1>
        <p>{{ t.brandsPage.heroSubtitle }}</p>
      </div>
    </section>

    <!-- Brands List -->
    <section class="section">
      <div class="container">
        <div
          v-for="(brand, index) in brands"
          :key="brand.key"
          class="brand-block"
          :class="{ reverse: index % 2 === 1 }"
        >
          <div class="brand-image">
            <img :src="brand.image" :alt="t.brandItems[brand.key].name" />
            <span class="brand-tag" :style="{ background: brand.color }">{{ t.brandItems[brand.key].category }}</span>
          </div>
          <div class="brand-info">
            <span class="brand-en">{{ t.brandItems[brand.key].nameEn }}</span>
            <h2 class="brand-name">{{ t.brandItems[brand.key].name }}</h2>
            <div class="brand-divider" :style="{ background: brand.color }"></div>
            <p class="brand-desc">{{ t.brandItems[brand.key].desc }}</p>
            <a class="brand-link" :style="{ color: brand.color }">{{ t.brandsPage.learnMore }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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

/* Brand Block */
.brand-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 60px 0;
  border-bottom: 1px solid #f0f0f0;
}

.brand-block:last-child {
  border-bottom: none;
}

.brand-block.reverse {
  direction: rtl;
}

.brand-block.reverse > * {
  direction: ltr;
}

.brand-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.brand-image img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform 0.6s;
}

.brand-block:hover .brand-image img {
  transform: scale(1.05);
}

.brand-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 16px;
  color: #fff;
  font-size: 12px;
  border-radius: 20px;
  letter-spacing: 2px;
}

.brand-en {
  font-size: 12px;
  color: #bbb;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.brand-name {
  font-size: 32px;
  color: #1a1a1a;
  margin: 8px 0 16px;
}

.brand-divider {
  width: 40px;
  height: 3px;
  margin-bottom: 20px;
}

.brand-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 24px;
}

.brand-link {
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.brand-link:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .brand-block {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 40px 0;
  }

  .brand-block.reverse {
    direction: ltr;
  }

  .brand-name {
    font-size: 24px;
  }
}
</style>
