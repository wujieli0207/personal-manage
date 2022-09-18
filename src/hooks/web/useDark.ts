import { useDark as vueUseDark } from '@vueuse/core'
import { APP_DARK_MODE_KEY_ } from '/@/enums/cacheEnum'

export function useDark() {
  return vueUseDark({
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: APP_DARK_MODE_KEY_,
  })
}
