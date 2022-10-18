import http from "./http-common"

class PublicationsApiService{
    getAll(){
        return http.get("/publications");
    }
    // getById(id) {
    //     return http.get(`/publications/${id}?_expand=psychologist`);
    // }

    getTags(){
        return http.get("/tags");
    }

    getPublicationTags(publicationId){
        return http.get(`/publications/${publicationId}/tags`);
    }

    getById(id) {
        return http.get(`/publications/${id}`);
    }

    getByPsychologistId(psychologistId){
        return http.get(`/publications/psychologist/${psychologistId}`);
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

    findByTitle(title) {
        return http.get(`/publications?title=${title}`);
    }
}

export default new PublicationsApiService();