import http from "./http-common"

class NutritionistsApiService {
    getAll() {
        return http.get("/nutritionists");
    }

    getById(id) {
        return http.get(`/nutritionists/${id}`);
    }

    create(data) {
        return http.post("/nutritionists", data);
    }

    update(id, data) {
        return http.put(`/nutritionists/${id}`, data);
    }

    findByName(name) {
        return http.get(`/nutritionists/name/${name}`);
    }

    findByGenre(genre){
        return http.get(`/nutritionists/genre/${genre}`);
    }

    findBySessionType(sessionType){
        return http.get(`/nutritionists/sessionType/${sessionType}`);
    }

    findByGenreAndSessionType(genre, sessionType){
        return http.get(`/nutritionists/genre/${genre}&sessionType/${sessionType}`)
    }

    findByEmail(email){
        return http.get(`/nutritionists/email/${email}`);
    }

    getScheduleFromNutritionist(nutritionistId) {
        return http.get(`/nutritionists/schedule/${nutritionistId}`);
    }

    getByIdSchedule(scheduleId) {
        return http.get(`/nutritionists/byschedule/${scheduleId}`);
    }
}

export default new NutritionistsApiService();