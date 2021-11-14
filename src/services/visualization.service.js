import http from "../http-common";

class VisualizeDataService {
    //water chart
    showWaterChart() {
        return http.get("/visualization/waterfeeding/chart");
    }
    //account book table
    showAccountBook() {
        return http.get("/visualization/accounting/table");
    }
    showSummaryIncomeOutcome() {
        return http.get("/visualization/accounting/summary");
    }
    addAccountBook(data) {
        return http.post("/visualization/accounting", data);
    }
    updateAccountBook(id, data) {
        return http.put(`/visualization/accounting/${id}`, data);
    }
    deleteAccountBook(id) {
        return http.delete(`/visualization/accounting/${id}`);
    }

    //current season
    showRecordofCurrentSeason() {
        return http.get(`/visualization/season/current`);
    }
    
    showRecordDisease() {
        return http.get(`/visualization/diseaseRecord`);
    }

    deleteDiseaseRecord(durian_id) {
        return http.delete(`/visualization/diseaseRecord/${durian_id}`);
    }

    // all season


}

export default new VisualizeDataService();