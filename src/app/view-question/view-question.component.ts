import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  questions: any = [];

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.questionService.loadQuestions().subscribe(data => {
      this.questions = data;
      this.questions=this.questions.filter(item => item.isApproved === 1);
    })
    
  }

  ngOnChanges() {
    this.questionService.loadQuestions().subscribe(data => {
      this.questions = data;
      this.questions=this.questions.filter(item => item.isApproved === 1);
    })
  }
}
