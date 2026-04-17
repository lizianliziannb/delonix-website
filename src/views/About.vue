<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "../i18n";

const { t } = useI18n();

const tiers = computed(() => [
  {
    name: t.value.aboutPage.tier1Name,
    image:
      "https://rc2.zihu.com/g4/M00/81/80/CgAG0mQ2G--AGE5wAAAnZFZDBY4541.png",
    mins: "0min",
  },
  {
    name: t.value.aboutPage.tier2Name,
    image:
      "https://rc2.zihu.com/g4/M00/81/80/CgAG0mQ2HBmAYJX3AAAiSk89pzg139.png",
    mins: "1,500mins",
  },
  {
    name: t.value.aboutPage.tier3Name,
    image:
      "https://rc2.zihu.com/g4/M00/81/80/CgAG0mQ2HCiASf1DAAAikSlC2WA209.png",
    mins: "6,750mins",
  },
  {
    name: t.value.aboutPage.tier4Name,
    image:
      "https://rc2.zihu.com/g4/M00/81/80/CgAG0mQ2HDiABq9lAAAj6DHSv-Q722.png",
    mins: "16,000mins",
  },
  {
    name: t.value.aboutPage.tier5Name,
    image:
      "https://rc2.zihu.com/g4/M00/81/80/CgAG0mQ2HEeAcdITAAAo8STsN5g119.png",
    mins: "30,000mins",
  },
]);

const benefits = computed(() => [
  {
    icon: "https://rc2.zihu.com/g4/M00/74/80/CgAG0mO-WACAVA25AAAKpA7ri-4360.png",
    title: t.value.aboutPage.benefit1Title,
    desc: t.value.aboutPage.benefit1Desc,
  },
  {
    icon: "https://rc2.zihu.com/g4/M00/74/80/CgAG0mO-WAuAESEFAAAIMF1x62k897.png",
    title: t.value.aboutPage.benefit2Title,
    desc: t.value.aboutPage.benefit2Desc,
  },
  {
    icon: "https://rc2.zihu.com/g4/M00/74/80/CgAG0mO-WBmAAJqoAAANkYchjA8433.png",
    title: t.value.aboutPage.benefit3Title,
    desc: t.value.aboutPage.benefit3Desc,
  },
  {
    icon: "https://rc2.zihu.com/g4/M00/74/80/CgAG0mO-WCOAKuIuAAAJl6ZFxeQ267.png",
    title: t.value.aboutPage.benefit4Title,
    desc: t.value.aboutPage.benefit4Desc,
  },
  {
    icon: "https://rc2.zihu.com/g4/M00/74/80/CgAG0mO-WC2AYfyHAAAOnqmhBYQ422.png",
    title: t.value.aboutPage.benefit5Title,
    desc: t.value.aboutPage.benefit5Desc,
  },
]);

// Scroll-driven animations
const activeTier = ref(-1);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Staggered tier animation
  const tierObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        tiers.value.forEach((_, i) => {
          setTimeout(() => {
            activeTier.value = i;
          }, i * 200);
        });
      }
    },
    { threshold: 0.3 },
  );
  const tierRow = document.querySelector(".tiers-row");
  if (tierRow) tierObserver.observe(tierRow);
});
</script>

<template>
  <div class="about-page">
    <!-- ===== Hero with Parallax ===== -->
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <div class="hero-badge">BETTERWOOD</div>
        <h1>{{ t.aboutPage.heroTitle }}</h1>
        <p>{{ t.aboutPage.heroSubtitle }}</p>
        <div class="hero-scroll-line"></div>
      </div>
    </section>

    <!-- ===== Explore Intro ===== -->
    <section class="explore-section">
      <div class="container">
        <div class="explore-inner reveal">
          <div class="explore-deco"></div>
          <h2 class="explore-title">{{ t.aboutPage.exploreTitle }}</h2>
          <div class="explore-line"></div>
          <p class="explore-desc">{{ t.aboutPage.exploreDesc }}</p>
        </div>
      </div>
    </section>

    <!-- ===== Membership Tiers (Planet Journey) ===== -->
    <section class="tiers-section">
      <!-- Starfield background -->
      <div class="stars-bg">
        <div
          v-for="n in 60"
          :key="n"
          class="star"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
          }"
        ></div>
      </div>
      <div class="container tier-container">
        <h2 class="tier-section-title reveal">
          {{ t.aboutPage.upgradeLabel }}
        </h2>
        <!-- Journey path -->
        <div class="tiers-row">
          <div class="tier-path"></div>
          <div
            v-for="(tier, idx) in tiers"
            :key="tier.name"
            class="tier-card"
            :class="{ active: idx <= activeTier }"
          >
            <div class="tier-glow"></div>
            <div class="tier-planet">
              <img :src="tier.image" :alt="tier.name" />
            </div>
            <div class="tier-name">{{ tier.name }}</div>
            <div class="tier-mins">{{ tier.mins }}</div>
            <div class="tier-dot"></div>
          </div>
        </div>
        <p class="tier-note">{{ t.aboutPage.tierNote }}</p>
      </div>
    </section>

    <!-- ===== Five Benefits ===== -->
    <section class="benefits-section">
      <div class="container">
        <div class="benefits-header reveal">
          <div class="section-icon"></div>
          <h2 class="section-title">{{ t.aboutPage.benefitsTitle }}</h2>
          <p class="section-subtitle">{{ t.aboutPage.benefitsSubtitle }}</p>
        </div>
        <div class="benefits-grid">
          <div
            v-for="(benefit, idx) in benefits"
            :key="benefit.title"
            class="benefit-card reveal"
            :style="{ transitionDelay: idx * 0.1 + 's' }"
          >
            <div class="benefit-icon-wrap">
              <div class="benefit-icon-bg"></div>
              <img :src="benefit.icon" :alt="benefit.title" />
            </div>
            <h3>{{ benefit.title }}</h3>
            <div class="benefit-divider"></div>
            <p>{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Member Journey CTA ===== -->
    <section class="journey-section">
      <div class="journey-bg-image"></div>
      <div class="journey-overlay"></div>
      <div class="container journey-container">
        <div class="journey-content reveal">
          <div class="journey-badge">BETTERWOOD MEMBERSHIP</div>
          <h2>{{ t.aboutPage.journeyTitle }}</h2>
          <p>{{ t.aboutPage.journeyDesc }}</p>
          <div class="journey-actions">
            <a class="journey-btn primary">{{ t.aboutPage.appDownload }}</a>
            <div class="journey-hotline">
              <span>{{ t.aboutPage.hotlineLabel }}</span>
              <strong>{{ t.aboutPage.hotlineNumber }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Reveal Animation ===== */
.reveal {
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Hero ===== */
.page-hero {
  height: 70vh;
  min-height: 560px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  inset: -20px;
  background: url("https://rc2.zihu.com/g5/M00/1B/E7/CgAGbGZMZ1SAZ4qUAAXrqNyr7PA979.jpg")
    center/cover;
  filter: blur(1px);
  transform: scale(1.08);
  animation: heroZoom 20s ease-in-out infinite alternate;
}

@keyframes heroZoom {
  0% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1.15);
  }
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.55) 60%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.page-hero-content {
  position: relative;
  text-align: center;
  color: #fff;
  animation: heroFadeIn 1.2s ease-out;
}

@keyframes heroFadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-block;
  padding: 8px 28px;
  border: 1px solid rgba(201, 169, 110, 0.6);
  color: #c9a96e;
  font-size: 12px;
  letter-spacing: 6px;
  margin-bottom: 28px;
  border-radius: 2px;
}

.page-hero-content h1 {
  font-size: 48px;
  font-weight: 200;
  letter-spacing: 10px;
  margin-bottom: 16px;
  text-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
}

.page-hero-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 3px;
  font-weight: 300;
}

.hero-scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, rgba(201, 169, 110, 0.8), transparent);
  margin: 40px auto 0;
  animation: scrollPulse 2.5s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
  50% {
    opacity: 0.3;
    transform: scaleY(0.6);
  }
}

/* ===== Explore Section ===== */
.explore-section {
  padding: 100px 0;
  background: #fff;
}

.explore-inner {
  text-align: center;
  max-width: 780px;
  margin: 0 auto;
}

.explore-deco {
  width: 50px;
  height: 1px;
  background: #c9a96e;
  margin: 0 auto 32px;
}

.explore-title {
  font-size: 34px;
  font-weight: 200;
  color: #1a1a1a;
  letter-spacing: 6px;
  margin-bottom: 24px;
  line-height: 1.4;
}

.explore-line {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c9a96e, transparent);
  margin: 0 auto 32px;
}

.explore-desc {
  font-size: 15px;
  color: #777;
  line-height: 2.2;
  letter-spacing: 0.5px;
}

/* ===== Tiers Section (Starfield) ===== */
.tiers-section {
  position: relative;
  padding: 100px 0 80px;
  background: linear-gradient(
    170deg,
    #050510 0%,
    #0a0a20 30%,
    #111133 60%,
    #0d1b2a 100%
  );
  overflow: hidden;
}

.stars-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

.tier-container {
  position: relative;
  z-index: 1;
}

.tier-section-title {
  text-align: center;
  font-size: 14px;
  color: rgba(201, 169, 110, 0.7);
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 60px;
  font-weight: 400;
}

.tiers-row {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  padding-bottom: 30px;
}

/* Connecting path line */
.tier-path {
  position: absolute;
  top: 50px;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(201, 169, 110, 0.3),
    rgba(201, 169, 110, 0.5),
    rgba(201, 169, 110, 0.3),
    transparent
  );
}

.tier-card {
  flex: 1;
  max-width: 190px;
  text-align: center;
  padding: 36px 16px 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.tier-card.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(201, 169, 110, 0.15);
}

.tier-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(201, 169, 110, 0.4);
}

.tier-glow {
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c9a96e, transparent);
  opacity: 0;
  transition: opacity 0.6s;
}

.tier-card.active .tier-glow {
  opacity: 1;
}

.tier-planet {
  width: 90px;
  height: 90px;
  margin: 0 auto 20px;
  position: relative;
}

.tier-planet img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s;
  filter: drop-shadow(0 0 12px rgba(201, 169, 110, 0.2));
}

.tier-card:hover .tier-planet img {
  transform: scale(1.12) rotate(5deg);
  filter: drop-shadow(0 0 20px rgba(201, 169, 110, 0.4));
}

.tier-name {
  font-size: 16px;
  font-weight: 600;
  color: #c9a96e;
  letter-spacing: 3px;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.tier-mins {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  letter-spacing: 1px;
}

.tier-dot {
  width: 8px;
  height: 8px;
  background: #c9a96e;
  border-radius: 50%;
  margin: 20px auto 0;
  box-shadow: 0 0 10px rgba(201, 169, 110, 0.5);
}

.tier-note {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 50px;
  line-height: 1.8;
  letter-spacing: 0.5px;
}

/* ===== Benefits ===== */
.benefits-section {
  background: #fafaf8;
  padding: 100px 0;
}

.benefits-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-icon {
  width: 40px;
  height: 2px;
  background: #c9a96e;
  margin: 0 auto 24px;
}

.section-title {
  font-size: 30px;
  font-weight: 200;
  color: #1a1a1a;
  letter-spacing: 5px;
  margin-bottom: 18px;
}

.section-subtitle {
  font-size: 13px;
  color: #aaa;
  line-height: 1.9;
  max-width: 680px;
  margin: 0 auto;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.benefit-card {
  background: #fff;
  padding: 44px 20px 36px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #f0ece4;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.benefit-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #c9a96e, transparent);
  opacity: 0;
  transition: opacity 0.4s;
}

.benefit-card:hover::before {
  opacity: 1;
}

.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  border-color: rgba(201, 169, 110, 0.3);
}

.benefit-icon-wrap {
  width: 64px;
  height: 64px;
  margin: 0 auto 22px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-icon-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #faf6ef, #f5efe4);
  border-radius: 50%;
  transition: transform 0.4s;
}

.benefit-card:hover .benefit-icon-bg {
  transform: scale(1.15);
}

.benefit-icon-wrap img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

.benefit-card h3 {
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 10px;
  font-weight: 600;
  letter-spacing: 1px;
}

.benefit-divider {
  width: 20px;
  height: 1px;
  background: #c9a96e;
  margin: 0 auto 12px;
}

.benefit-card p {
  font-size: 12px;
  color: #999;
  line-height: 1.7;
}

/* ===== Journey CTA ===== */
.journey-section {
  position: relative;
  padding: 120px 0;
  overflow: hidden;
}

.journey-bg-image {
  position: absolute;
  inset: 0;
  background: url("https://rc2.zihu.com/g4/M00/69/48/CgAG0mNJUZ-AeorYAAUwizbionQ758.jpg")
    center/cover;
  filter: blur(2px);
  transform: scale(1.05);
}

.journey-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.92) 0%,
    rgba(15, 52, 96, 0.88) 100%
  );
}

.journey-container {
  position: relative;
  z-index: 1;
}

.journey-content {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

.journey-badge {
  display: inline-block;
  padding: 6px 24px;
  border: 1px solid rgba(201, 169, 110, 0.4);
  color: rgba(201, 169, 110, 0.8);
  font-size: 11px;
  letter-spacing: 5px;
  margin-bottom: 32px;
  border-radius: 2px;
}

.journey-content h2 {
  font-size: 36px;
  font-weight: 200;
  color: #fff;
  letter-spacing: 5px;
  margin-bottom: 24px;
  line-height: 1.3;
}

.journey-content p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 2;
  margin-bottom: 40px;
}

.journey-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.journey-btn {
  display: inline-block;
  padding: 16px 56px;
  border: 1px solid #c9a96e;
  color: #c9a96e;
  font-size: 14px;
  letter-spacing: 3px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
}

.journey-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #c9a96e;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s;
  z-index: -1;
}

.journey-btn:hover {
  color: #1a1a2e;
}

.journey-btn:hover::after {
  transform: scaleX(1);
}

.journey-hotline {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 1px;
}

.journey-hotline strong {
  color: #c9a96e;
  font-size: 24px;
  margin-left: 10px;
  letter-spacing: 3px;
  font-weight: 300;
}

/* ===== Responsive ===== */
@media (max-width: 960px) {
  .page-hero-content h1 {
    font-size: 36px;
    letter-spacing: 6px;
  }
  .explore-title {
    font-size: 26px;
  }

  .tiers-row {
    flex-wrap: wrap;
    gap: 14px;
  }
  .tier-card {
    min-width: 140px;
    max-width: 160px;
  }
  .tier-path {
    display: none;
  }

  .benefits-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .journey-content h2 {
    font-size: 28px;
  }
}

@media (max-width: 640px) {
  .page-hero {
    min-height: 480px;
  }
  .page-hero-content h1 {
    font-size: 28px;
    letter-spacing: 4px;
  }
  .hero-badge {
    font-size: 10px;
    letter-spacing: 4px;
    padding: 6px 20px;
  }

  .explore-section {
    padding: 70px 0;
  }
  .explore-title {
    font-size: 22px;
    letter-spacing: 3px;
  }
  .explore-desc {
    font-size: 14px;
    line-height: 2;
  }

  .tiers-section {
    padding: 70px 0 50px;
  }
  .tier-card {
    min-width: 120px;
    padding: 24px 10px 20px;
  }
  .tier-planet {
    width: 60px;
    height: 60px;
  }
  .tier-name {
    font-size: 12px;
    letter-spacing: 2px;
  }
  .tier-mins {
    font-size: 15px;
  }

  .benefits-section {
    padding: 70px 0;
  }
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .section-title {
    font-size: 24px;
    letter-spacing: 3px;
  }

  .journey-section {
    padding: 80px 0;
  }
  .journey-content h2 {
    font-size: 24px;
    letter-spacing: 3px;
  }
}

@media (max-width: 480px) {
  .tiers-row {
    gap: 8px;
  }
  .tier-card {
    min-width: 0;
    flex: 1;
    padding: 18px 6px 16px;
  }
  .tier-planet {
    width: 44px;
    height: 44px;
    margin-bottom: 12px;
  }
  .tier-name {
    font-size: 10px;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .tier-mins {
    font-size: 12px;
  }
  .tier-dot {
    width: 5px;
    height: 5px;
    margin-top: 12px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
  .benefit-card {
    padding: 32px 20px 28px;
  }
}
</style>
