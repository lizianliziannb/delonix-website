<script setup lang="ts">
import { useI18n } from "../i18n";

const { t, locale } = useI18n();

const images = {
  core: "https://rc2.zihu.com/g4/M00/67/6A/CgAG0mM1mWCAaMNEACtd8bc_UtM877.png",
  brandZh:
    "https://rc2.zihu.com/g4/M00/67/6A/CgAG0mM1mg-AVBKOAAWUoQv3tT8042.png",
  brandEn:
    "https://0.rc.xiniu.com/g4/M00/94/5F/CgAG0mS50xGASs5XABATftXR0Fg366.png",
  betterwood:
    "https://rc2.zihu.com/g5/M00/49/EE/CgAGbGlChTKAbsKpAAJDlGyHFw4824.jpg",
  midofficeZh:
    "https://rc2.zihu.com/g4/M00/67/6A/CgAG0mM1mraASDBoAAc_FWa6k5E204.PNG",
  midofficeEn:
    "https://0.rc.xiniu.com/g4/M00/94/69/CgAG0mS58uSAbX_FAASGRnmgqLs293.png",
};
</script>

<template>
  <div class="advantages-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>{{ t.advantagesPage.heroTitle }}</h1>
        <p>{{ t.advantagesPage.heroSubtitle }}</p>
      </div>
    </section>

    <!-- Section 1: Core Competences Overview -->
    <section class="section core-section">
      <div class="container split-layout">
        <div class="split-text">
          <h2 class="section-title gold-text">
            {{ t.advantagesPage.coreTitle }}
          </h2>
          <div class="core-list">
            <div class="core-item">
              <span class="core-number">01</span>
              <div>
                <h4>{{ t.advantagesPage.coreItem1Title }}</h4>
                <p>{{ t.advantagesPage.coreItem1Desc }}</p>
              </div>
            </div>
            <div class="core-item">
              <span class="core-number">02</span>
              <div>
                <h4>{{ t.advantagesPage.coreItem2Title }}</h4>
                <p>{{ t.advantagesPage.coreItem2Desc }}</p>
              </div>
            </div>
            <div class="core-item">
              <span class="core-number">03</span>
              <div>
                <h4>{{ t.advantagesPage.coreItem3Title }}</h4>
                <p>{{ t.advantagesPage.coreItem3Desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="split-image">
          <img :src="images.core" alt="Core Competences" />
        </div>
      </div>
    </section>

    <!-- Section 2: Brand Advance Methodology -->
    <section class="section brand-section">
      <div class="container split-layout reverse">
        <div class="split-image">
          <img
            :src="locale === 'zh' ? images.brandZh : images.brandEn"
            alt="Brand Advance"
          />
        </div>
        <div class="split-text">
          <h2 class="section-title">{{ t.advantagesPage.brandTitle }}</h2>
          <p class="section-desc">{{ t.advantagesPage.brandDesc }}</p>
          <div class="brand-elements">
            <p class="elements-label">{{ t.advantagesPage.brandElements }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Betterwood Membership -->
    <section class="section betterwood-section">
      <div class="container split-layout">
        <div class="split-image split-image-phone">
          <img :src="images.betterwood" alt="Betterwood" />
        </div>
        <div class="split-text">
          <h2 class="section-title">{{ t.advantagesPage.betterwoodTitle }}</h2>
          <p class="section-desc">{{ t.advantagesPage.betterwoodDesc }}</p>
          <div class="betterwood-scale">
            <span class="scale-label">{{
              t.advantagesPage.betterwoodScale
            }}</span>
            <span class="scale-number">{{
              t.advantagesPage.betterwoodNumber
            }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Mid-office Service System -->
    <section class="section midoffice-section">
      <div class="container">
        <h2 class="section-title" style="text-align: center">
          {{ t.advantagesPage.midofficeTitle }}
        </h2>
        <p
          class="section-desc"
          style="text-align: center; max-width: 800px; margin: 0 auto 40px"
        >
          {{ t.advantagesPage.midofficeDesc }}
        </p>
        <div class="midoffice-image">
          <img
            :src="locale === 'zh' ? images.midofficeZh : images.midofficeEn"
            alt="Mid-office System"
          />
        </div>
      </div>
    </section>

    <!-- Stats Highlight -->
    <section class="highlight-section">
      <div class="container">
        <div class="highlight-grid">
          <div class="highlight-item">
            <span class="highlight-num">15</span>
            <span class="highlight-label">{{ t.stats.brands }}</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-num">1600+</span>
            <span class="highlight-label">{{ t.stats.hotels }}</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-num">245000+</span>
            <span class="highlight-label">{{ t.stats.rooms }}</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-num">{{
              t.advantagesPage.betterwoodNumber
            }}</span>
            <span class="highlight-label">{{ t.stats.members }}</span>
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
  background: url("https://rc2.zihu.com/g5/M00/1B/E7/CgAGbGZMZkeAJaN0AAW6nd9Dxqc939.jpg")
    center/cover;
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

/* Split layout */
.split-layout {
  display: flex;
  align-items: center;
  gap: 60px;
}

.split-layout.reverse {
  flex-direction: row-reverse;
}

.split-text {
  flex: 1;
  min-width: 0;
}

.split-image {
  flex: 1;
  min-width: 0;
}

.split-image-phone {
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex: 0.5;
}

.split-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

/* Section titles */
.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
  line-height: 1.4;
}

.gold-text {
  color: #c9a96e;
}

.section-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.9;
  margin-bottom: 24px;
}

/* Section 1: Core Competences */
.core-section {
  background: #fff;
}

.core-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 30px;
}

.core-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.core-number {
  font-size: 32px;
  font-weight: 700;
  color: #c9a96e;
  line-height: 1;
  min-width: 42px;
}

.core-item h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.core-item p {
  font-size: 14px;
  color: #888;
  line-height: 1.6;
}

/* Section 2: Brand Advance */
.brand-section {
  background: #fafaf8;
}

.brand-elements {
  background: #f5f0e8;
  border-left: 3px solid #c9a96e;
  padding: 16px 20px;
  border-radius: 0 6px 6px 0;
}

.elements-label {
  font-size: 14px;
  color: #8b7a5e;
  line-height: 1.8;
  font-weight: 500;
}

/* Section 3: Betterwood */
.betterwood-section {
  background: #fff;
}

.betterwood-scale {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 8px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #faf6ef 0%, #f5ede0 100%);
  border-radius: 8px;
}

.scale-label {
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

.scale-number {
  font-size: 42px;
  font-weight: 700;
  color: #c9a96e;
  letter-spacing: 2px;
}

/* Section 4: Mid-office */
.midoffice-section {
  background: #fafaf8;
}

.midoffice-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

/* Stats Highlight */
.highlight-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
  padding: 80px 0;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  text-align: center;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.highlight-num {
  font-size: 48px;
  font-weight: 300;
  color: #c9a96e;
}

.highlight-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .split-layout,
  .split-layout.reverse {
    flex-direction: column;
    gap: 30px;
  }

  .section-title {
    font-size: 22px;
  }

  .highlight-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .scale-number {
    font-size: 32px;
  }

  .page-hero-content h1 {
    font-size: 28px;
    letter-spacing: 4px;
  }
}
</style>
