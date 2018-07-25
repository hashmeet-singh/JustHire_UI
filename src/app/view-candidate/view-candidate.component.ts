import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {

  candidate: any = [];
  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidateService.getCandidate().subscribe(candidate => {
      this.candidate = candidate;
      console.log(this.candidate);
    })
  }

}
