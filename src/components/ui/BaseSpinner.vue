<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  width: 3rem;
  height: 3rem;
  margin: 2rem auto;
  border: 4px solid #ddd;
  border-top-color: #3d008d;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
