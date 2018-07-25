import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  addQuestionForm: FormGroup;
  @Output() out = new EventEmitter();

  isEditing: boolean = false;
  originalQuestion: any;
  rounds: any = [];
  // id: any;

  constructor(private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private statsService: StatsService) { }

  ngOnInit() {
    this.addQuestionForm = this.fb.group({
      question: ['', [Validators.required]],
      round: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required]
    });

    this.statsService.loadRounds()
      .subscribe(response => {
        this.rounds = response;
        this.rounds = this.rounds.filter(item => item['roundNumber'] !== 0);
        console.log(this.rounds)
      });
    this.route.params.subscribe(routeParam => {
      let id = routeParam.questionId
      console.log(routeParam);
      if (id) {
        this.questionService.loadQuestion(id)
          .subscribe(question => {
            this.originalQuestion = question;
            this.addQuestionForm.patchValue(question)
            this.isEditing = true;
          })
      };
    });


  }

  handleFormSubmit(e) {
    if (this.addQuestionForm.valid) {
      if (this.isEditing) {
        let formData = this.addQuestionForm.value;
        let question = Object.assign({}, this.originalQuestion, formData);
        question.isApproved = 0;
        console.log(question);
        this.questionService.update(question.questionId, question)
          .subscribe(question => {
            this.addQuestionForm.reset();
            this.router.navigateByUrl('home', { skipLocationChange: true })
              .then(() => this.router.navigate(['/home/questions/view']));
            this.isEditing = false;
          })
        return;
      }
      let values = this.addQuestionForm.value;
      console.log(values);
      this.questionService.submitNewQuestion(values).subscribe(item => {
        console.log(item);
        this.addQuestionForm.reset();
      })
    }else{
      console.log('Invalid input');
    }
  }
}
