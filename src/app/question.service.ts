import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl: string = "http://localhost:8181/api/question";

  constructor(private http: HttpClient) { }

  loadQuestions() {
    return this.http.get(this.apiUrl)
  }

  loadQuestionsForUser(userId){
    return this.http.get(this.apiUrl+`/${userId}`);
  }

  loadQuestion(id){
    return this.http.get(this.apiUrl + `/edit/${id}`);
  }

  submit(question) {
    let url = `http://localhost:8181/api/question/${question.questionId}`;
    return this.http.put(url, question);
  }

  submitNewQuestion(question) {
    let url = `http://localhost:8181/api/question`;
    return this.http.post(url, question);
  }

  update(id,question){
    let url="http://localhost:8181/api/question/edit/";
    return this.http.put(url+`${id}`, question);
  }
}
