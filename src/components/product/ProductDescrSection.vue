<template>
    <section :id="alias" class="pt-16">
      <div class="grid grid-cols-12">
          <h2>{{title}}</h2>
          <slot />
      </div>
    </section>
</template>

<script setup>

    defineProps({
        title: String,
        alias: String
    })

</script>