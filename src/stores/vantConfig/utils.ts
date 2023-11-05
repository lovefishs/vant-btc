import { ITheme } from './types'
import { VANT_THEME_KEY, CLIENT_STORAGE } from './constants'

export function getClientTheme(): ITheme {
  return (CLIENT_STORAGE.getItem(VANT_THEME_KEY) || 'light') as ITheme
}

export function setClientTheme(theme: ITheme): void {
  CLIENT_STORAGE.setItem(VANT_THEME_KEY, theme)
}
