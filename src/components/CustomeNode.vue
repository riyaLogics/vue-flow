<template>
  <div :class="isMainshap" @dblclick="showToolbar(e)">
    <NodeResizer v-if="isToolbar" min-width="100" min-height="30" />
    <NodeToolbar
      :is-visible="isToolbar"
      :position="toolbarAttribute.toolbarPosition"
    >
      <v-btn class="bg-primary" @click="deleteNode(totalData)">delete</v-btn>
      <v-btn class="ma-3 bg-primary" @click="canclePopUp">cancle</v-btn>
    </NodeToolbar>
    <Handle
      v-if="localLabel.status == 'child' || localLabel.status == 'leaf'"
      type="target"
      :position="Position.Top"
      class="top-handle"
    />
    <Handle
      v-if="localLabel.status == 'child' || localLabel.status == 'parent'"
      type="source"
      :position="Position.Bottom"
      class="bottom-handle"
    />
    <!-- Editable Node content -->
    <input
      min-width="100"
      min-height="30"
      type="text"
      v-model="localLabel.label"
      class="node-label-input"
      @input="updateLabel"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, defineExpose } from 'vue';
import { Handle, Position } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/node-resizer'; //
import { NodeToolbar } from '@vue-flow/node-toolbar';

// Import node resizer styles
import '@vue-flow/node-resizer/dist/style.css';
const props = defineProps({
  data: Object,
  ForInput: Boolean,
});
defineExpose({
  changeShape,
});
const emit = defineEmits(['update:label', 'delete:node']);
const localLabel = ref(
  {
    label: props.data.label,
    id: props.data.id,
    status: props.data.data.status,
  } || ''
);
const totalData = ref(props.data);
const toolbarAttribute = ref({
  toolbarVisible: props.data.toolbarVisible,
  toolbarPosition: props.data.toolbarPosition,
});
const isToolbar = ref(false);
const isMainshap = ref('ractangle');
// const rotatedTop = ref({
//   x: 800,
//   y: 75,
// });
// // x: props.data.position.x,
// // y: props.data.position.y + props.data.position.y / 2,
// // y: -50 * Math.sin(45 * (Math.PI / 180)),
// const rotatedBottom = ref({
//   x: props.data.position.x,
//   y: 50 * Math.sin(45 * (Math.PI / 180)),
// });

onMounted(() => {
  console.log('Custom-node Mounted');
});

function updateLabel() {
  emit('update:label', { id: props.data.id, label: localLabel.value.label });
}

function showToolbar() {
  isToolbar.value = true;
}

function canclePopUp() {
  isToolbar.value = false;
}
function deleteNode(e) {
  emit('delete:node', { id: e.id });
}

function changeShape(type) {
  if (type == 'ractangle ') {
    isMainshap.value = 'custom-node';
  } else if (type == 'diamond') {
    isMainshap.value = 'custom-node-decision';
  } else if (type == 'elipse') {
    isMainshap.value = 'custom-node-ellipsoid';
  } else if (type == 'terminate') {
    isMainshap.value = 'custom-node-terminator';
  } else if (type == 'processer') {
    isMainshap.value = 'custom-parallelogram';
  }
}
</script>

<style scoped>
.custom-node {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  position: relative;
}

.node-label-input {
  width: 100%;
  border: none;
  background: transparent;
  text-align: center;
  outline: none;
  box-shadow: none;
}

/* Terminate */
.custom-node-terminator {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 20px;
  position: relative;
  width: 150px; /* Adjust width as needed */
  text-align: center;
}
/* Desision */
.custom-node-decision {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  width: 100px; /* Adjust width as needed */
  height: 100px; /* Adjust height as needed */
  position: relative;
  transform: rotate(45deg);
  text-align: center;
  line-height: 1.5; /* Adjust line height as needed */
}

.top-handle {
  position: absolute;
  top: -10px; /* Adjust based on the node's size */
  left: 50%;
  transform: translateX(-50%) rotate(-45deg); /* Undo the rotation for the handle */
}

.bottom-handle {
  position: absolute;
  bottom: -10px; /* Adjust based on the node's size */
  left: 50%;
  transform: translateX(-50%) rotate(-45deg); /* Undo the rotation for the handle */
}

.custom-parallelogram {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  position: relative;
  width: 150px;
  height: 100px;
  transform: skewX(-20deg);
}

.custom-node-ellipsoid {
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  position: relative;
  border-radius: 50%;
}

/* .custom-node.ellipsoid {
  border-radius: 50%;
} */
/* .top-handle {
  top: 0;
  transform: rotate(-45deg); 
}

.bottom-handle {
  bottom: 0;
  transform: rotate(-45deg); 
} */

/*  blackbox.ai */
/* .custom-node-decision .handle.top {
  top: 50%;
  transform: translateY(-50%);
}

.custom-node-decision .handle.bottom {
  bottom: 50%;
  transform: translateY(50%);
} */
</style>
