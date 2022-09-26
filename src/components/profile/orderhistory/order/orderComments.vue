<template>
    <div class="p-6 rounded-xl bg-slate-100">
        <h2>Комментарии</h2>
        <!-- empty state -->
        <div class="space-y-4">
            <div v-if="comment" class="p-3 bg-white rounded-lg">
                <p class="text-gray-700 text-[15px]">{{comment}}</p>
            </div>
            <p v-else class="text-center">У заказе нет комментария</p>
            <div class="text-center">
                <app-button btnType="outline" btnSize="md">Добавить</app-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppButton from '@/components/UI/Buttons/AppButton.vue'

// handler добавление комментария

defineProps({
    comment: {
        type: String,
        default: ''
    }
})

</script>