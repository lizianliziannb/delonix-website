<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const categories = computed(() => [
  { key: '全部', label: t.value.newsSection.filterAll },
  { key: '集团动态', label: t.value.newsSection.filterGroup },
  { key: '品牌新闻', label: t.value.newsSection.filterBrand },
  { key: '合作签约', label: t.value.newsSection.filterCoop },
])
const activeCategory = ref('全部')

const allNews = [
  {
    title: 'AI重构生态 客户驱动增长 德胧集团召开2026战略发布会',
    summary: '3月30日，德胧集团在2026年度战略发布会上正式发布百达屋APP中的超级员工——"神灯AI"，并同时发布"天干地"系列创新方案。',
    image: 'https://rc2.zihu.com/g5/M00/50/35/CgAGbGnMfg-ATMOCAAHB3WCxqcU362.jpg',
    date: '2026-03-30',
    category: '集团动态',
  },
  {
    title: '致会员及客户的一封信：关于服务体验升级的说明',
    summary: '德胧集团致力于为每一位会员提供更优质的服务体验，现就近期服务升级事项做出详细说明。',
    image: 'https://rc2.zihu.com/g5/M00/4E/10/CgAGbGmQNXKAcV66AA7jltoQdQc768.jpg',
    date: '2025-12-15',
    category: '集团动态',
  },
  {
    title: '德胧集团旗下核心品牌焕新 开启全新叙事',
    summary: '亚太领先的国际酒店与体验消费集团德胧集团近期宣布，旗下三大核心品牌——开元名都、开元名庭、曼居全面焕新。',
    image: 'https://rc2.zihu.com/g5/M00/42/2E/CgAGbGixYD2ATOdaAAPQr1w6UPQ626.png',
    date: '2025-08-25',
    category: '品牌新闻',
  },
  {
    title: '德胧集团深化东南亚战略布局 Model J引领印尼商务酒店生态升级',
    summary: '德胧集团旗下商旅品牌曼居（Model J）正式进驻大雅加达唐格朗市核心商务区BSD City。',
    image: 'https://rc2.zihu.com/g5/M00/41/F7/CgAGbGiu3LeAaMQgAAtwVJsYFeQ479.png',
    date: '2025-07-20',
    category: '合作签约',
  },
  {
    title: '德胧集团揽获海内外6项荣誉！',
    summary: '2025年过半，德胧集团以"高标准重品质"的稳健增长战略保持业务高质量发展。',
    image: 'https://rc2.zihu.com/g5/M00/41/0C/CgAGbGiezeeAQLM0AALWwFZuV_Q010.jpg',
    date: '2025-07-01',
    category: '集团动态',
  },
  {
    title: '2025年首季19店！开元名都、开元名庭进驻多个黄金商圈',
    summary: '2025年开年第一季度，德胧集团交出开门红答卷：旗下酒店品牌开元名都、开元名庭、观堂新开19店。',
    image: 'https://rc2.zihu.com/g5/M00/36/DE/CgAGbGfzZ96AY1Y9AAH6L0SvOD8988.png',
    date: '2025-04-10',
    category: '品牌新闻',
  },
  {
    title: '德胧集团与万豪国际集团宣布达成8个合作项目签约',
    summary: '德胧集团与万豪国际集团共同宣布，继2024年1月开启合作及5月首批3项签约落地后，已总共签约8个项目。',
    image: 'https://rc2.zihu.com/g5/M00/2F/57/CgAGbGdaXb-AaeJFAAn-FbEzdcw245.png',
    date: '2024-11-20',
    category: '合作签约',
  },
  {
    title: '共话印尼新商机！全国首个印尼酒店投资者峰会举行',
    summary: '11月3日，全国首个印尼酒店投资者峰会在杭州举行，以"出海印尼，携手扬帆"为主题。',
    image: 'https://rc2.zihu.com/g5/M00/2C/A1/CgAGbGct3sOAbjWxAA2Qk0_QntA208.png',
    date: '2024-11-03',
    category: '合作签约',
  },
  {
    title: '再10年！德胧集团携手大东吴集团合作共赢',
    summary: '德胧集团与大东吴集团签订新一轮10年战略合作协议，双方将在酒店管理、品牌运营等领域深化合作。',
    image: 'https://rc2.zihu.com/g5/M00/2A/3B/CgAGbGcIocOAQVHnAAsLGzqjUQM652.png',
    date: '2024-10-15',
    category: '合作签约',
  },
]

const filteredNews = computed(() => {
  if (activeCategory.value === '全部') return allNews
  return allNews.filter((n) => n.category === activeCategory.value)
})
</script>

<template>
  <div class="news-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>{{ t.newsPage.heroTitle }}</h1>
        <p>{{ t.newsPage.heroSubtitle }}</p>
      </div>
    </section>

    <!-- News -->
    <section class="section">
      <div class="container">
        <!-- Filters -->
        <div class="news-filters">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="filter-btn"
            :class="{ active: activeCategory === cat.key }"
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- News Grid -->
        <div class="news-grid">
          <article v-for="item in filteredNews" :key="item.title" class="news-card">
            <div class="news-image">
              <img :src="item.image" :alt="item.title" />
              <span class="news-category">{{ item.category }}</span>
            </div>
            <div class="news-content">
              <time class="news-date">{{ item.date }}</time>
              <h3 class="news-title">{{ item.title }}</h3>
              <p class="news-summary">{{ item.summary }}</p>
              <a class="read-more">{{ t.newsSection.readMore }}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  height: 50vh;
  min-height: 360px;
  background: url('https://rc2.zihu.com/g5/M00/1B/E7/CgAGbGZMZ1SAZ4qUAAXrqNyr7PA979.jpg') center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
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

/* Filters */
.news-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 28px;
  border: 1px solid #ddd;
  border-radius: 30px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn.active,
.filter-btn:hover {
  background: #c9a96e;
  color: #fff;
  border-color: #c9a96e;
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.news-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.news-image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-category {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  background: rgba(201, 169, 110, 0.9);
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
}

.news-content {
  padding: 24px;
}

.news-date {
  font-size: 12px;
  color: #bbb;
}

.news-title {
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.5;
  margin: 10px 0 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-summary {
  font-size: 13px;
  color: #999;
  line-height: 1.7;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  font-size: 13px;
  color: #c9a96e;
  transition: opacity 0.3s;
}

.read-more:hover {
  opacity: 0.7;
}

@media (max-width: 960px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
