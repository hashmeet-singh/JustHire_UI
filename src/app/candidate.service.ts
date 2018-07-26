import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

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

  uploadCandidateResume(file: File, CandidateId): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('PUT', this.apiUrl + `/admin/candidate/${CandidateId}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  viewCandidateResume(candidate): any {
    return this.http.get(`http://localhost:8181/api/interview/candidate/${candidate}`)
    
  }

  uploadQuestionBank(questionBankFile) {
    return this.http.post(this.apiUrl + "/question/bank", questionBankFile);

  }

  getReport(candidateId) {
    return this.http.get(`http://localhost:8181/api/interview/report/${candidateId}`);
  }

}
