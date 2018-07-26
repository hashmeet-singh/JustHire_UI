import { Component, OnInit, OnChanges } from '@angular/core';
import { StatsService } from '../stats.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DatePipe } from '@angular/common';
import { QuestionService } from '../question.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  questions: any = [];
  unassignedQuestions: number;
  users: any = [];
  unassignedUsers: number;
  date: String;
  statistics: any = [];
  constructor(private statsService: StatsService,
    private questionService: QuestionService,
    private userService: UserService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.statsService.loadStats().subscribe(data => {
      this.statistics = data;
      console.log(this.statistics);
    })
    this.date = this.datePipe.transform(new Date());

    console.log('HELLOOOO')
    this.questionService.loadQuestions()
      .subscribe(questions => {
        this.questions = questions;
        this.questions = this.questions.filter(question => question['round'] === -1);
        this.unassignedQuestions = this.questions.length;
      });

      this.userService.loadUser()
      .subscribe(users=>{
        this.users = users;
        this.users = this.users.filter(user => user['round'] === -1);
        this.unassignedUsers = this.users.length;
      });
  }

  ngOnChanges() {
    
  }



}