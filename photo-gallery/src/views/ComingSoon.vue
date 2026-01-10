<template>
  <div class="coming-soon">
    <div class="coming-soon-content">
      <div class="coming-soon-icon">
        <span class="material-icons">construction</span>
      </div>
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

.coming-soon-icon {
  margin-bottom: var(--space-lg);
}

.coming-soon-icon .material-icons {
  font-size: 3rem;
  color: var(--main-color);
  opacity: 0.6;
}

.coming-soon-message {
  font-size: var(--font-size-lg);
  color: var(--title);
  opacity: 0.7;
}
</style>
