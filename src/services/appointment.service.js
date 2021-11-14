import http from '../http-common';

class AppointmentDataService {
    add(data) {
        return http.post('/appointment', data); 
    }

    show() {
        return http.get('/appointment');
    }

    findByPriority(priority) {
        return http.get(`/appointment/${priority}`);
    }

    update(id, data) {
        return http.put(`/appointment/${id}`, data);
    }

    delete(id) {
        return http.delete(`/appointment/${id}`);
    }
}

export default new AppointmentDataService();