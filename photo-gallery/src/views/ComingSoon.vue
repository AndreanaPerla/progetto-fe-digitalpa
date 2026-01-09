<template>
  <div class="coming-soon">
    <div class="coming-soon-content">
      <h1 class="coming-soon-title">In arrivo</h1>
      <p class="coming-soon-message">
        Questa funzionalità sarà disponibile presto.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComingSoon",
};
</script>

<style scoped>
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.coming-soon-content {
  padding: var(--space-2xl);
}

.coming-soon-title {
  font-size: var(--font-size-4xl);
  color: var(--main-color);
  margin-bottom: var(--space-lg);
  font-weight: 600;
}

.coming-soon-message {
  font-size: var(--font-size-lg);
  color: var(--title);
  opacity: 0.7;
}
</style>
