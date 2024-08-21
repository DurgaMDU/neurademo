<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeMount } from "vue-demi";
import { useLocaldblistStore } from "@/stores/localdblist";
const LocaldblistStore = useLocaldblistStore();

import { storeToRefs } from 'pinia'
const { filtereddblist } = storeToRefs(useLocaldblistStore())

const columns = [
  "flight_number",
  "name",
  "date_utc"
];
// id, ,  "details"

function deletelaunche(itemid) { 
  LocaldblistStore.deletedblaunche(itemid)
}

</script>

<template>
  <div id="LocalDBViewList"> 
    
    <div  v-if="LocaldblistStore.loading" class="loading-spinner"> 
      <div class="loding-div"><div></div> Please wait... </div>  </div>
    <div v-if="LocaldblistStore.error" class="error">{{ LocaldblistStore.error }}</div>
    <div v-if="LocaldblistStore.success" class="success">{{ LocaldblistStore.success }}</div>

    <table>
      <thead>
        <tr >
          <td v-for="column in columns" :key="column">
            {{ column }}
          </td>
		      <td> Action </td>
        </tr>
      </thead>
      <tbody >
        <tr v-if="LocaldblistStore.dblist.length > 0" v-for="item in filtereddblist" :key="item.id">
          <td v-for="column in columns" :key="column">{{ item[column] }}</td>
          <td  key="action"><button title="Delete" @click="deletelaunche(item['_id'])" class="btn btn-success"> X </button></td>
        </tr>
        <tr v-else>
          <td colspan="3">No Data Available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
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
