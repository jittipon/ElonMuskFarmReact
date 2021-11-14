import http from "../http-common";

class DurianDataService {
    showAll() {
        return http.get("/durian");
    }

    showSelectedRow(row) {
        return http.get(`/durian/list?row=${row}`);
    }

    add(data) {
        return http.post("/durian", data);
    }

    update(id, data) {
        return http.put(`/durian/${id}`, data);
    }

    delete(id) {
        return http.delete(`/durian/${id}`);
    }
}

export default new DurianDataService();