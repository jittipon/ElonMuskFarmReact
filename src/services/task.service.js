import http from "../http-common";

class TaskDataService {
    showAll() {
        return http.get("/task/list/all");
    }

    showSelectedType(type) {
        return http.get(`/task/list/${type}`);
    }

    save(data) {
        return http.post("/task/save", data);
    }

    update(id, data) {
        return http.put(`/task/edit/${id}`, data);
    }

    delete(id) {
        return http.delete(`/task/${id}`);
    }
}

export default new TaskDataService();