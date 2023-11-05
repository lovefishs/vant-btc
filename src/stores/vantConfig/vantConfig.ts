import { defineStore } from 'pinia'

// import store from '../index'
import { IVantConfig } from './types'
import { getClientTheme, setClientTheme } from './utils'

export const useVantConfigStore = defineStore<string, IVantConfig>('vantConfig', {
  state: () => ({
    theme: getClientTheme(),
  }),
  getters: {
    isLightTheme(state): boolean {
      return state.theme === 'light'
    },
    isDarkTheme(state): boolean {
      return state.theme === 'dark'
    },
  },
  actions: {
    toggleTheme() {
      const nextTheme = this.theme === 'light' ? 'dark' : 'light'
      const isDarkTheme = nextTheme === 'dark'

      if (isDarkTheme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      this.theme = nextTheme
      setClientTheme(nextTheme)
    },
  },
})

// export function useDarkModeStoreHook() {
//   return useDarkModeStore(store)
// }
