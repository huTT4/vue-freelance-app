<template>
  <form class="card" @submit.prevent="submit">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="descr"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>


<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const date = ref('')
    const descr = ref('')
    
    const now = new Date().setHours(3, 0, 0, 0)
    
    const submit = () => {
      store.state.tasks.push({
        title: title.value,
        date: date.value,
        descr: descr.value,
        id: new Date().getTime(),
        type: isValidTime.value ? 'active' : 'cancelled'
      })
      localStorage.setItem('tasks', JSON.stringify(store.state.tasks))
      router.push('/')
    }

    const isValid = computed(() => title.value.length && date.value.length && descr.value.length)

    const isValidTime = computed(() => new Date(date.value).getTime() >= now )

    return { title, date, descr, submit, isValid }
  }
}
</script>