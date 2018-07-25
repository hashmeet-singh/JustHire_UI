import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  currentCandidate: any;
  minimunQuestionsCount: Number;
  currentQuestionCount = parseInt(JSON.parse(localStorage.getItem('currentQuestionCount'))) ;
  //round not getting inititalized everytime
  apiURL = 'http://localhost:8181/api/interview';

  constructor(private http: HttpClient,
    private router: Router) {
    this.currentCandidate = JSON.parse(localStorage.getItem('currentCandidate'));
  }

  minThresholdReached() {
    return parseInt(JSON.parse(localStorage.getItem('currentQuestionCount'))) >= this.minimunQuestionsCount;
  }

  minimumQuestionThreshold() {
    return this.http.get(this.apiURL + '/minimum-questions');
  }

  getMinimumQuestionThreshold() {
    return this.minimunQuestionsCount;
  }

  setMinimumQuestionThreshold(min) {
    this.minimunQuestionsCount = min;
  }

  incrementCurrentQuestionCount() {
    this.currentQuestionCount += 1;
    localStorage.setItem('currentQuestionCount',JSON.stringify(this.currentQuestionCount));
    console.log('Increment Count: '+parseInt(JSON.parse(localStorage.getItem('currentQuestionCount'))));
  }

  resetCurrentQuestionCount() {
    
    this.currentQuestionCount = 0;
    localStorage.setItem('currentQuestionCount',JSON.stringify(this.currentQuestionCount));
    console.log('Reset Count: '+parseInt(JSON.parse(localStorage.getItem('currentQuestionCount'))));
  }

  getCurrentQuestionCount() {
    return parseInt(JSON.parse(localStorage.getItem('currentQuestionCount')));
  }

  startInterview(candidateId) {
    return this.http.put(this.apiURL + '/start', {}, { params: { candidateId: candidateId } });
  }

  setCandidate(candidate) {
    localStorage.setItem('currentCandidate', JSON.stringify(candidate));
    this.currentCandidate = candidate;
    console.log(JSON.parse(localStorage.getItem('currentCandidate')));
  }

  getCandidate() {
    return this.currentCandidate;
  }

  getFirstQuestion() {
    return this.http.get(this.apiURL + '/firstquestion', {
      params: {
        candidateId: this.currentCandidate['candidateId'],
        roundId: JSON.parse(localStorage.getItem('user'))['round']['roundNumber']
      }
    });
  }

  getNextQuestion() {
    return this.http.get(this.apiURL + '/next-question', {
      params: {
        candidateId: this.currentCandidate['candidateId'],
        roundId: JSON.parse(localStorage.getItem('user'))['round']['roundNumber']
      }
    });
  }

  submitAnswer(ans, questionId, score) {

    let answer: Object = {
      candidateId: this.currentCandidate['candidateId'],
      comment: ans.comment,
      questionId: questionId,
      roundId: JSON.parse(localStorage.getItem('user'))['round']['roundNumber'],
      score: score
    }
    return this.http.post(this.apiURL + '/submitanswer', answer);
  }

  stopInterview() {
    console.log(JSON.parse(localStorage.getItem('user'))['round']['roundNumber']);
    // localStorage.removeItem('currentCandidate');
    return this.http.post(this.apiURL + '/stop-interview', {}, {
      params: {
        candidateId: this.currentCandidate['candidateId'],
        roundId: JSON.parse(localStorage.getItem('user'))['round']['roundNumber']
      }
    });
  }
}
