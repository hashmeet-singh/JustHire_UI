import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { InterviewService } from '../interview.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-take-interview',
  templateUrl: './take-interview.component.html',
  styleUrls: ['./take-interview.component.css']
})
export class TakeInterviewComponent implements OnInit {
  cars = [];
  questionsNotAvailable:boolean = false;
  displayDialog: boolean;
  candidate: any;
  pendingCandidates: any = [];
  resumeData:String;

  constructor(private candidateService: CandidateService,
    private interviewService: InterviewService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    // this.candidateService.loadPendingCandidates()
    console.log('sadasd' + this.authenticationService.getUserRound());
    this.candidateService.loadPendingCandidates(this.authenticationService.getUserRound())
      .subscribe(candidates => {
        this.pendingCandidates = candidates;
      })

  }

  showResume(e, candidate) {
    e.preventDefault;
    this.candidate = candidate;
    this.resumeData=`http://localhost:8181/api/interview/candidate/${this.candidate['candidateId']}`;
   
    this.displayDialog = true;
  }

  onDialogHide() {
    this.candidate = null;
  }

  startInterview(e, pendingCandidate) {
    this.interviewService.getFirstQuestion(pendingCandidate)
      .subscribe(question => {
        console.log(question);
        if (question['question'] === null) {
          this.questionsNotAvailable =true;
        } else {
          this.interviewService.startInterview(pendingCandidate['candidateId'])
            .subscribe(e => {
              console.log(e);
              this.interviewService.setCandidate(pendingCandidate);
              this.interviewService.resetCurrentQuestionCount();
              this.router.navigate(['home/interview/start']);
            })
        }
      });

  }

}
