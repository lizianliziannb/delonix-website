import { ref, computed } from 'vue'
import zhMessages from './zh'
import enMessages from './en'
import idMessages from './id'

export type Locale = 'zh' | 'en' | 'id'

const messages: Record<Locale, typeof zhMessages> = {
  zh: zhMessages,
  en: enMessages,
  id: idMessages,
}

const currentLocale = ref<Locale>(
  (localStorage.getItem('locale') as Locale) || 'zh'
)

export function useI18n() {
  const t = computed(() => messages[currentLocale.value])
  const locale = computed(() => currentLocale.value)

  function setLocale(lang: Locale) {
    currentLocale.value = lang
    localStorage.setItem('locale', lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-cn' : lang
  }

  return { t, locale, setLocale }
}
