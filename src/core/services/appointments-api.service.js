import http from "./http-common"

class AppointmentsApiService{

    updateAppointment(id, data) {
        return http.put(`/appointment/${id}`, data);
    }

    createAppointment(data) {
        return http.post("/appointment", data);
    }

    getAppointmentId(id) {
        return http.get(`/appointment/${id}`);
    }

    getPatientsByNutritionistId(nutritionistId) {
        return http.get(`/appointment/nutritionist/${nutritionistId}/patient`);
    }

    getAppointmentByPatientIdAndNutritionistId(patientId, nutritionistId) {
        return http.get(`/appointment/nutritionist/${nutritionistId}/patient/${patientId}`);
    }

    getAppointmentsByNutritionistId(nutritionistId) {
        return http.get(`/appointment/nutritionist/${nutritionistId}`);
    }

    getAppointmentsByPatientId(patientId) {
        return http.get(`/appointment/patients/${patientId}`);
    }

    deleteAppointment(id) {
        return http.delete(`/appointment/${id}`);
    }
}

export default new AppointmentsApiService();