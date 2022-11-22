import type { UseModalReturnType, ModalMethods, ModalProps, ReturnMethods } from '../typing'
import { ref, onUnmounted, unref, getCurrentInstance, reactive, toRaw } from 'vue'
import { isProdMode } from '@/utils/env'
import { isEqual } from 'lodash-es'
import { error } from '@/utils/log'
import { computed } from 'vue'

const dataTransfer = reactive<any>({})

const visibleData = reactive<{ [key: number]: boolean }>({})

/**
 * @description: Applicable to independent modal and call outside
 */
export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<string>('')

  function register(modalMethod: ModalMethods, uuid: string) {
    if (!getCurrentInstance()) {
      throw new Error('useModal() can only be used inside setup() or functional components!')
    }
    uid.value = uuid
    isProdMode() &&
      onUnmounted(() => {
        modal.value = null
        loaded.value = false
        dataTransfer[unref(uid)] = null
      })
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return

    modal.value = modalMethod
    loaded.value = true
    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible
    }
  }

  const getInstance = () => {
    const instance = unref(modal)
    if (!instance) {
      error('useModal instance is undefined!')
    }
    return instance
  }

  const methods: ReturnMethods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props)
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.()
    },

    openModal: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        visible: visible,
      })

      if (!data) return
      const id = unref(uid)
      if (openOnSet) {
        dataTransfer[id] = null
        dataTransfer[id] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data))
      if (!equal) {
        dataTransfer[id] = toRaw(data)
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ visible: false })
    },
  }
  return [register, methods]
}
