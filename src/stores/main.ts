import { defineStore } from "pinia";
import LocalDBService from "../services/LocalDBService";

//From Mongodb Datalist
import { useLocaldblistStore } from "./localdblist";


export const useMainStore = defineStore("main", {
  state: () => {
    return {
      routes: [
        { to: "/list", text: "SpaceX API Listing" },
        { to: "/locallist", text: "Local launches Listing" },
      ],
      list: [],
      loading: false,
      error: <any>null, // this might be null or string
      success: <any>null, // this might be null or string
      launchesURL: <string>import.meta.env.VITE_APP_SpaceXAPIBASE,
      launchelist: [],
      launche: {}
    };
  },
  getters: {
    filteredlist: (state) => {
      return state.list.sort((b, a) => {  
        var dateA = new Date(a.date_utc).getTime();
        var dateB = new Date(b.date_utc).getTime();
        return dateA < dateB ? -1 : 1; // ? -1 : 1 for ascending/increasing order
       }).slice(0,30)
       
    }
  },
  
  actions: {
    init() { 
      this.getlaunche();
      useLocaldblistStore().init();
    },
    savelaunche(value){ 
      try {
        //save & Update by _id        
        value._id=Object(value.id);
        this.loading = true;
        LocalDBService.createandupdate(value).then(response => { 
            this.error = false;
            this.success = response.data.message;
            this.loading = false;

            //Load local DB datas            
            const LdbStore = useLocaldblistStore()
            LdbStore.getdblaunche();
            
          }).catch(e => {
            this.success = false;
            this.loading = false;
            this.error = 'Error while save launche into DB - '+e; 
          });
      } catch (e) {
        this.loading = false;
        this.error =  'Error while save launche into DB';
      }
  },
  getlaunche(){
    this.loading = true;
    this.error = '';
    try {
      fetch(this.launchesURL)
      .then((res) => res.json())
      .then((json) => {
        this.loading = false;
        if (json && Array.isArray(json)) {
          this.list = json;
        }
      })
      .catch((err) => (this.error = err)); 
      // populate the error field in the store to show that there is an issue has been happened while fetching the data
    } catch (error) {
      this.error = error.message;
      this.loading = false;
    }
  },
},
});
