import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  questions: any = [];

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.authenticationService.checkIfAdmin()) {
      console.log('Showing q to admin');
      this.questionService.loadQuestions().subscribe(data => {
        this.questions = data;
        this.questions = this.questions.filter(item => item.isApproved === 1);
      })
    } else {
      this.questionService.loadQuestionsForUser(this.authenticationService.getUser()['userId'])
        .subscribe(data => {
          this.questions = data;
          this.questions = this.questions.filter(item => item.isApproved === 1);
        });
    }


  }

  // ngOnChanges() {
  //   this.questionService.loadQuestions().subscribe(data => {
  //     this.questions = data;
  //     this.questions=this.questions.filter(item => item.isApproved === 1);
  //   })
  // }
}
