import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { InterviewService } from '../interview.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportNotAvailable:boolean = true;
  questionsAsked: any = [];
  candidateReport: any = [];
  ifAdmin: boolean;
  constructor(private candidateService: CandidateService,
    private interviewService: InterviewService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    console.log('HELLO');
    this.ifAdmin = this.authenticationService.checkIfAdmin();
    if (!this.ifAdmin) {
      console.log('Report: '+this.interviewService.getCandidate()['candidateId'])
      this.candidateService.getReport(this.interviewService.getCandidate()['candidateId']).subscribe(response => {
        this.questionsAsked = response;
        if(this.questionsAsked.length>0){
          this.reportNotAvailable=false;
        }
        console.log(this.questionsAsked);
      });
    }
    else {
      this.candidateService.getCandidate().subscribe(response => {
        this.candidateReport = response;
        this.candidateReport = this.candidateReport.filter(item => item.status.localeCompare('pending'))
        if(this.candidateReport.length>0){
          this.reportNotAvailable=false;
        }
      })

    }
  }


}
