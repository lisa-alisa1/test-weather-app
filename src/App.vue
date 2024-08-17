<template>
     <the-header />
      <RouterView />
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
    name: 'App',
    components: { TheHeader }
}
</script>