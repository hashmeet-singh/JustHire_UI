import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import {DataViewModule } from 'primeng/dataview'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-question',
  templateUrl: './pending-question.component.html',
  styleUrls: ['./pending-question.component.css']
})
export class PendingQuestionComponent implements OnInit {

  questions: any = [];
  currentQuestion: number=1;
  @Input() question: any;
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.questionService.loadQuestions().subscribe(data => {
      this.questions = data;
      this.questions=this.questions.filter(item => item.isApproved === 0);
    })
  }

  approveQuestion(question) {
      this.questionService.submit(question)
        .subscribe(question => {
          this.questions = question;
          // this.router.navigate(['PendingQuestion']);
          this.ngOnInit();
        })
        
    }
  }
