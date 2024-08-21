<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from "@/stores/main";
const MainStore = useMainStore();

import { storeToRefs } from 'pinia'
const { filteredlist } = storeToRefs(useMainStore())

const columns = [
  "flight_number",
  "name",
  "date_utc",  
];
// id, ,  "details"

const launche = ref({});
function savelaunche(item) { 
  MainStore.savelaunche(item);
}

</script>

<template>
  <div id="List"> 
    
  <div  v-if="MainStore.loading" class="loading-spinner"> 
    <div class="loding-div"><div></div> Please wait... </div>  
  </div>  
  <div v-if="MainStore.error" class="error">{{ MainStore.error }}</div>
  <div v-if="MainStore.success" class="success">{{ MainStore.success }}</div>

    <table>
      <thead>
        <tr v-if="MainStore.list.length > 0">
          <td v-for="column in columns" :key="column">
            {{ column }}
          </td>
		  <td> Action </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredlist" :key="item.id">
          <td v-for="column in columns" :key="column">{{ item[column] }}</td>
          <td  key="action"><button title="Save Launch" @click="savelaunche(item)" class="btn btn-success"> + </button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
table {
  thead {
    background-color: #ddd;

    tr {
      td {
        font-weight: bold;
      }
    }
  }

  tr {
    td {
      padding: 5px 10px;
    }
  }

  tr:nth-child(even) {
    background-color: #f0f0f0;
  }
  
}

</style>
