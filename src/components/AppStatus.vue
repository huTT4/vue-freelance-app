<template>
  <span :class="['badge', status.class]">{{ status.title }}</span>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['type'],
  setup(props) {
    const status = computed(() => {
      switch (props.type) {
        case 'active': return { class: 'primary', title: 'Активен' }
        case 'done': return { class: 'primary', title: 'Завершен' }
        case 'cancelled': return { class: 'danger', title: 'Отменен' }
        case 'pending': return { class: 'warning', title: 'Выполняется' }
      }
    })

    return { status }
  }
}
</script>