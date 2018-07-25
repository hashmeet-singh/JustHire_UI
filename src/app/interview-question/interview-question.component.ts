import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-interview-question',
  templateUrl: './interview-question.component.html',
  styleUrls: ['./interview-question.component.css']
})
export class InterviewQuestionComponent implements OnInit {
  currentCandidate: any = {};
  question: any = {};
  answerForm: FormGroup;
  answerSubmitted: boolean = true;

  constructor(private interviewService: InterviewService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.currentCandidate = this.interviewService.getCandidate();
    this.interviewService.getFirstQuestion()
      .subscribe(question => {
        console.log(question);
        this.question = question;
      })

    this.answerForm = this.fb.group({
      comment: ['', Validators.required],
      performance: ['', Validators.required]
    });

    this.interviewService.minimumQuestionThreshold()
      .subscribe(minQuestions => {
        this.interviewService.setMinimumQuestionThreshold(minQuestions);
        // console.log(minQuestions);
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.answerForm.valid) {
      let score;
      let answer = this.answerForm.value;
      console.log(answer);

      if (answer.performance === 'Good') {
        score = 10;
      } else if (answer.performance === 'Satisfactory') {
        score = 7;
      } else if (answer.performance === 'Poor') {
        score = 4;
      } else {
        score = 0;
      }
      this.interviewService.submitAnswer(answer, this.question['questionId'], score)
        .subscribe(response => {
          this.answerSubmitted = false;
          this.interviewService.incrementCurrentQuestionCount();
        })
    }
  }

  nextQuestion(e) {
    this.interviewService.getNextQuestion()
      .subscribe(question => {
        this.question = question;
        console.log(question);
        this.answerSubmitted = true;
        this.answerForm.reset();
      })
  }

  minThresholdReached(e) {
    return this.interviewService.minThresholdReached();
  }

  stopInterview(e) {
    console.log('Stop Interview');
    this.interviewService.stopInterview().subscribe(response => {
      this.interviewService.resetCurrentQuestionCount();
      this.router.navigate(['home/report']);
    })
  }


}
