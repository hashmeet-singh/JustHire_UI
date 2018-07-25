import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { InterviewService } from '../interview.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  questionsAsked: any = [];
  candidateReport: any = [];
  ifAdmin: boolean;
  constructor(private candidateService: CandidateService,
    private interviewService: InterviewService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.ifAdmin = this.authenticationService.checkIfAdmin();
    if (!this.ifAdmin) {
      this.candidateService.getReport(this.interviewService.getCandidate()['candidateId']).subscribe(response => {
        this.questionsAsked = response;
        console.log(this.questionsAsked);
      });
    }
    else {
      this.candidateService.getCandidate().subscribe(response => {
        this.candidateReport = response;
        this.candidateReport = this.candidateReport.filter(item => item.status.localeCompare('pending'))
      })

    }
  }

}
