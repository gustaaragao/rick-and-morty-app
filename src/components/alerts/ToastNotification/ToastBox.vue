<template>
  <!-- begin: toastBox -->
  <div id="toastBox">
    <slot></slot>
  </div>
  <!-- end: toastBox -->
</template>

<style scoped>
#toastBox {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  overflow: hidden;
  gap: 10px;
}
</style>