import { Injectable } from '@angular/core';
import { QuestionService } from './question.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolverService {

  constructor(private questionService: QuestionService) { }
  resolve(routes: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.questionService.loadQuestions();
  }
}
