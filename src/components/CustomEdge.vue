<template>
  <g>
    <path
      class="vue-flow__edge-path"
      fill="none"
      stroke="#6F3381"
      :stroke-width="5"
      :d="`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`"
      style="pointer-events: all"
    >
      <NodeToolbar :is-visible="true">
        <v-btn class="bg-primary">delete</v-btn>
        <v-btn class="ma-3 bg-primary">cancle</v-btn>
      </NodeToolbar>
    </path>
    />
    <!-- :stroke-width="2.5" -->
    <circle
      :cx="targetX"
      :cy="targetY"
      fill="#fff"
      :r="4"
      stroke="#6F3381"
      :stroke-width="5"
    />
    <foreignObject
      :x="(sourceX + targetX) / 2 - 50"
      :y="(sourceY + targetY) / 2 - 10"
      width="100"
      height="20"
    >
      <!-- :x="(sourceX + targetX) / 2 - 50"
      :y="(sourceY + targetY) / 2 - 10" -->
      <input
        type="text"
        v-model="labelString.label"
        :class="dynamicClass"
        @input="onInput"
        @blur="onInputBlur"
      />
    </foreignObject>
  </g>
</template>
<script setup>
import { defineProps, onMounted, defineEmits, ref, defineExpose } from 'vue';
import { NodeToolbar } from '@vue-flow/node-toolbar';
const props = defineProps({
  sourceX: Number,
  sourceY: Number,
  targetX: Number,
  targetY: Number,
  label: String,
  id: String,
});
defineExpose({
  childFunction,
  childCloseEdit,
  childEdgeFunction,
  childEdgeEditFunction,
});
const clickedEdge = ref({});
const dynamicClass = ref('node-label-input');
const labelString = ref(
  {
    label: props.label == '' || undefined ? '' : props.label,
    id: props.id,
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  } || ''
);

onMounted(() => {
  console.log('this is the edge mounted');
});

const emit = defineEmits(['update:label']);

const onInput = () => {
  emit('update:label', { id: props.id, label: labelString.value.label });
};

const onInputBlur = () => {
  // dynamicClass.value = false;
  dynamicClass.value = 'node-label-input';
};

function childFunction(e) {
  clickedEdge.value = e;
}

function childEdgeFunction(type) {
  console.log('childEdgeFunctionnnnnnnnnnnnnnnnnn');
  console.log('clickedEdgeeeeeeee', clickedEdge.value);
  if (clickedEdge.value.edge !== undefined)
    if (type == 'animation') {
      clickedEdge.value.edge.animated = true;
    } else {
      clickedEdge.value.edge.animated = false;
    }
}

function childEdgeEditFunction() {
  dynamicClass.value = 'node-label-edge-input';
}

function childCloseEdit() {
  dynamicClass.value = 'node-label-input';
}
</script>
<style scoped>
.node-label-input {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  outline: none;
  box-shadow: none;
}
.node-label-edge-input {
  width: 100%;
  border: 1px solid #ccc; /* Add a light border */
  border-radius: 4px; /* Optional: Add rounded corners */
  background: transparent;
  text-align: left;
  padding: 5px; /* Add some padding for better spacing */
  outline: none; /* Remove outline on focus */
  box-shadow: none; /* No shadow on focus */
}
/* .vue-flow__edge-path {
  z-index: 10; 
} */
</style>
