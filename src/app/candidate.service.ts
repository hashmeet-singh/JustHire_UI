import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  apiUrl: string = "http://localhost:8181/api";

  loadPendingCandidates(roundId) {
    return this.http.get(this.apiUrl + `/interview/candidate/pending/${roundId}`);
  }

  getCandidate() {
    return this.http.get(this.apiUrl + "/admin/candidate");


  }

  createCandidate(newCandidate) {
    return this.http.post(this.apiUrl + "/admin/candidate", newCandidate);

  }


  uploadQuestionBank(questionBankFile) {
    return this.http.post(this.apiUrl + "/question/bank", questionBankFile);

  }

  getReport(candidateId) {
    return this.http.get(`http://localhost:8181/api/interview/report/${candidateId}`);
  }

}
