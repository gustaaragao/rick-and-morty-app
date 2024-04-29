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
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
}
</style>