import http from "./http-common"

class PublicationsApiService{
    getAll(){
        return http.get("/publications");
    }

    getById(id) {
        return http.get(`/publications/${id}`);
    }

    getByNutritionistId(nutritionistId){
        return http.get(`/publications/nutritionist/${nutritionistId}`);
    }

    create(data) {
        return http.post("/publications",data);
    }

    createTag(data){
        return http.post("/tags", data);
    }

    update(id, data) {
        return http.put(`/publications/${id}`, data);
    }

    delete(id) {
        return http.delete(`/publications/${id}`);
    }

}

export default new PublicationsApiService();