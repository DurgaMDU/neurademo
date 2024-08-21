import { http } from "../http-common";

class LocalDBService {
  // Retrive all data
  getAll() {
    return http.get("/launches");
  }
  // Create new  
  create(data) {
    return http.post("/launches", data);
  }  
  //Update if available or Create new
  createandupdate(data) {
    return http.patch("/launches/"+data.id, data);
  }
  // Delete by ID
  delete(id) {
    return http.delete(`/launches/${id}`);
  }

}

export default new LocalDBService();