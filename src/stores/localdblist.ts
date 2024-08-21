import { defineStore } from "pinia";
import LocalDBService from "../services/LocalDBService";

export const useLocaldblistStore = defineStore("localdblist", {
  state: () => {
    return {
      dblist: [],
      error: <any>null, // this might be null or string
      success: <any>null, // this might be null or string 
      launchedblist: [],
      launchedb: {},
      loading: false
    };
  },
  getters: {
    filtereddblist: (state) => {
      return state.dblist.sort((b, a) => {  
        var dateA = new Date(a.date_utc).getTime();
        var dateB = new Date(b.date_utc).getTime();
        return dateA < dateB ? -1 : 1; // ? -1 : 1 for ascending/increasing order
       }).slice(0,30)
       
    }
  },
  actions: {
    init() {
        this.getdblaunche();    
    },
    getdblaunche(){
      
      this.loading = true;
      LocalDBService.getAll().then(response => {
          this.error = false;
          this.loading = false;
          if (response.data && Array.isArray(response.data)) {
            this.dblist = response.data;
          }
        }).catch(e => {
          this.success = false;
          this.loading = false;
          this.error = 'Error while get launche from DB -'+ e;
          console.log(e);
        });
    },
    deletedblaunche(value){
      
      this.loading = true;
      LocalDBService.delete(value).then(response => {
          this.error = false;
          this.success = response.data.message;
          this.loading = false;
          this.getdblaunche();
        }).catch(e => {
          this.success = false; 
          this.loading = false;
          this.error = 'Error while delete launche in DB -'+ e;
          console.log(e);
        });
        
    },
    
  },
});
