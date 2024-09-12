<template>
  <div>
    <div><h3>Vue Flow</h3></div>
    <v-card>
      <v-row>
        <v-col cols="6" md="6">
          <v-card-title class="text-start"> Use Flow chart </v-card-title>
          <v-card-subtitle class="text-start"
            >let's go for increadible</v-card-subtitle
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card class="ma-6">
        <v-card-actions>
          <v-row>
            <v-col cols="12" md="4">
              <h2 class="text-wiegth-bold">Actions</h2>
              <v-card>
                <v-btn class="bg-primary ma-1" @click="EditEdge('kkk')"
                  >Edit</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="closeEdit('kkk')"
                  >Close-Edit</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="onSave('kkk')"
                  >Save</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="onRestore('kkk')"
                  >Restore</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="doScreenshot()"
                  >ScreenShot</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="allInformation()"
                  >All-Info</v-btn
                >
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <h2 class="text-wiegth-bold">Animations</h2>
              <v-card>
                <v-btn class="bg-primary ma-1" @click="ractangle('ractangle ')"
                  >Ractangle</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="ractangle('diamond')"
                  >Dimond</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="ractangle('processer')"
                  >Process</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="ractangle('terminate')"
                  >Terminate</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="ractangle('elipse')"
                  >Elipse</v-btn
                >
                <v-btn
                  class="bg-primary ma-1"
                  @click="AnimationLine('animation')"
                  >Animation-Line</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="AnimationLine('normal')"
                  >Normal-Line</v-btn
                >
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <h2 class="text-wiegth-bold">Creation</h2>
              <v-card>
                <v-btn class="bg-primary ma-1" @click="addNode('parent')"
                  >Parent</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="addNode('child')"
                  >Child</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="addNode('leaf')"
                  >Leaf</v-btn
                >
                <v-btn class="bg-primary ma-1" @click="AnimationLine()"
                  >Animation-Line</v-btn
                >
              </v-card>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="flow-container">
              <VueFlow
                v-model:nodes="nodes"
                v-model:edges="edges"
                @connect="onConnect"
                @edge-update="onEdgeUpdate"
              >
                <Background pattern-color="#aaa" :gap="16" />
                <template #node-custom="nodeProps">
                  <CustomeNode
                    ref="customNode"
                    :data="nodeProps"
                    :ForInput="isInput"
                    @update:label="updateNodeLabel($event)"
                    @delete:node="deleteNode($event)"
                  />
                </template>
                <template
                  #edge-custom="{
                    sourceX,
                    sourceY,
                    targetX,
                    targetY,
                    label,
                    id,
                  }"
                >
                  <!-- <template #edge-custom="{ edgeProps }"> -->
                  <!-- <CustomEdge v-bind="edgeProps" /> -->
                  <CustomEdge
                    ref="customEdge"
                    :source-x="sourceX"
                    :source-y="sourceY"
                    :target-x="targetX"
                    :target-y="targetY"
                    :label="label"
                    :id="id"
                    @update:label="updateEdgeLabel($event, id)"
                    @delete:edge="deleteEdge()"
                  />
                </template>
                <MiniMap
                  pannable
                  zoomable
                  nodeColor
                  nodeStrokeColor
                  nodeBorderRadius
                  maskColor
                />
                <Controls position="top-right"> </Controls>
              </VueFlow>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="isDeletePopUP" max-width="300">
      <v-card>
        <v-card-title class="text-start"
          >Do you want to delete Edge</v-card-title
        >
        <v-card-subtitile class="ps-4">Edge id is 'ed-24'</v-card-subtitile>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="bg-primary" @click="deleteConfimEdge()">yes</v-btn>
          <v-btn class="bg-primary" @click="isDeletePopUP = false"
            >cancle</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Controls } from '@vue-flow/controls';
import { Background } from '@vue-flow/background';
import '@vue-flow/controls/dist/style.css';
import CustomeNode from './CustomeNode.vue';
import { MiniMap } from '@vue-flow/minimap';
import '@vue-flow/minimap/dist/style.css';
import CustomEdge from './CustomEdge.vue';
import { useScreenshot } from './UseScreenshot';

const isInput = ref(false);
const positions = ref({});
const isMainshap = ref('ractangle');
const customEdge = ref(null);
const customNode = ref(null);
const isDeletePopUP = ref(false);
const currentEdge = ref({});
const {
  onNodeDragStop,
  onNodeDoubleClick,
  updateEdge,
  onEdgeClick,
  onEdgeDoubleClick,
  addEdges,
  addNodes,
  toObject,
  fromObject,
  applyNodeChanges,
  applyEdgeChanges,
  // onNodesChange,
  vueFlowRef,
  getNodes,
} = useVueFlow();
const { capture } = useScreenshot();
const flowKey = 'vue-flow--save-restore';

const nodes = ref([
  {
    id: '1',
    type: 'input',
    label: 'Node 1',
    position: { x: 250, y: 5 },
    toolbarPosition: 'top',
  },
  {
    id: '2',
    type: 'custom',
    label: 'Node 2',
    position: { x: 100, y: 100 },
    toolbarPosition: 'top',
  },
  {
    id: '3',
    type: 'custom',
    label: 'Node 3',
    position: { x: 400, y: 100 },
    toolbarPosition: 'top',
  },
  {
    id: '4',
    type: 'custom',
    label: 'Node 4',
    position: { x: 600, y: 200 },
    toolbarPosition: 'top',
  },
  {
    id: '5',
    type: 'custom',
    label: 'Node 5',
    position: { x: 350, y: 200 },
    resizing: true,
    toolbarPosition: 'top',
  },
  {
    id: '6',
    type: 'custom',
    label: 'Node 6',
    position: { x: 200, y: 300 },
    draggable: false,
    toolbarPosition: 'top',
  },
]);

const edges = ref([
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'edge with arrowhead',
    animated: true,
    updatable: true,
    type: 'custom',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: '',
    updatable: true,
    type: 'custom',
  },
  {
    id: 'e1-3-4',
    source: '3',
    target: '4',
    label: 'edge with arrowhead',
    updatable: true,
    type: 'custom',
  },
  {
    id: 'e1-3-5',
    source: '3',
    target: '5',
    label: '',
    updatable: true,
    type: 'custom',
  },
  {
    id: 'e1-2-5',
    source: '2',
    target: '5',
    label: '',
    updatable: true,
    type: 'custom',
  },
  {
    id: 'e1-3-6',
    source: '1',
    target: '6',
    label: '',
    updatable: true,
    type: 'custom',
  },
]);

function onSave() {
  localStorage.setItem(flowKey, JSON.stringify(toObject()));
}

function onRestore() {
  const flow = JSON.parse(localStorage.getItem(flowKey));
  if (flow) {
    fromObject(flow);
  }
}

onNodeDoubleClick(() => {
  isInput.value = true;
});
onNodeDragStop((event) => {
  positions.value = event.node.position;
});

function updateNodeLabel(event) {
  const node = nodes.value.find((n) => n.id === event.id);
  if (node) {
    node.label = event.label;
  }
}

function deleteNode(event) {
  nodes.value.find((n) => {
    if (n.id === event.id) {
      const changes = [{ id: n.id, type: 'remove' }];
      applyNodeChanges(changes);
    }
  });
}

function deleteEdge() {
  isDeletePopUP.value = true;
}

function deleteConfimEdge() {
  isDeletePopUP.value = false;
  const changes = [{ id: currentEdge.value.edge.id, type: 'remove' }];
  applyEdgeChanges(changes);
}

onEdgeDoubleClick((e) => {
  currentEdge.value = e;
  isDeletePopUP.value = true;
});

function addNode(type) {
  const id = Date.now().toString();
  const newNode = {
    id,
    position: { x: 800, y: 50 },
    data: { label: `Node ${id}` },
    label: `Node ${id}`, // changed for show name of both new created and static nodes
  };
  // nodes.value.push({
  //   id,
  //   position: { x: 800, y: 50 },
  //   data: { label: `Node ${id}` },
  // });
  addNodes([newNode]);
  nextTick(() => {
    nodes.value.forEach(() => {});
    editNewNode(type);
  });
}
const editNewNode = (type) => {
  let changedEdge = nodes.value[nodes.value.length - 1];
  changedEdge.type = 'custom';
  if (type == 'parent') {
    changedEdge.data.status = 'parent';
    // changedEdge.data.label = 'Parent Node';
  } else if (type == 'child') {
    changedEdge.data.status = 'child';
    // changedEdge.label = 'Child Node';
  } else {
    changedEdge.data.status = 'leaf';
    // changedEdge.label = 'Leaf Node';
  }
};

function onConnect(params) {
  addEdges([params]);
  nextTick(() => {
    edges.value.forEach(() => {});
    afterConnectFun();
  });
}

const afterConnectFun = () => {
  let changedEdge = edges.value[edges.value.length - 1];
  changedEdge.type = 'custom';
  changedEdge.updatable = true;
  changedEdge.position = positions.value;
};
function onEdgeUpdate({ edge, connection }) {
  updateEdge(edge, connection);
}

const updateEdgeLabel = (data) => {
  const edge = edges.value.find((e) => e.id === data.id);
  if (edge) {
    edge.label = data.label;
  }
};

const EditEdge = () => {
  customEdge.value.childEdgeEditFunction();
};

const closeEdit = () => {
  customEdge.value.childCloseEdit();
};

onEdgeClick((e) => {
  customEdge.value.childFunction(e);
});

function doScreenshot() {
  if (!vueFlowRef.value) {
    return;
  }
  capture(vueFlowRef.value, { shouldDownload: true });
}

function ractangle(type) {
  if (type == 'ractangle ') {
    isMainshap.value = 'ractangle ';
  } else if (type == 'diamond') {
    isMainshap.value = 'diamond';
  } else if (type == 'elipse') {
    isMainshap.value = 'elipse';
  } else if (type == 'terminate') {
    isMainshap.value = 'terminate';
  } else if (type == 'processer') {
    isMainshap.value = 'processer';
  }
  customNode.value.changeShape(type);
}
function AnimationLine(type) {
  customEdge.value.childEdgeFunction(type);
}

function allInformation() {
  console.log('nodessssss', nodes.value);
  console.log('edgeeeeee', edges.value);
  console.log('getNodes', getNodes);
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
.flow-container {
  width: 100%;
  height: 600px; /* Adjust the height as needed */
  border: 1px solid #ccc; /* Optional: For better visualization */
}
.stacked-button {
  display: block;
  width: 15%; /* Optional: Full-width buttons */
  margin-bottom: 10px; /* Optional: Adds space between buttons */
}
</style>
