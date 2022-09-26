<template>
    <div class="p-4 space-y-2 border border-gray-300 rounded-lg">
        <div class="text-sm text-gray-500">Ваш менеджер</div>
        <div class=" space-y-1">
            <div>{{profileStore.profile.ta_name}}</div>
            <div class="text-sm">{{profileStore.profile.ta_phone}}</div>
            <div class="text-sm">
                <a target="_blank" :href="`mailto: ${profileStore.profile.ta_email}`">{{profileStore.profile.ta_email}}</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()

</script>