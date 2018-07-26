import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidateService } from '../candidate.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  toggleForm: boolean = true;
  resumeForm: FormGroup;
  CandidateForm: FormGroup;
  Candidate: any;
  selectedFiles: FileList;
  resumeUpload: File;
  constructor(private fb: FormBuilder,
    private candidateService: CandidateService,
    private router: Router) { }

  ngOnInit() {
    this.CandidateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      experience: ['', Validators.required],
      resume: ['', Validators.required]
    });

  }


  handleSubmit(event) {
    event.preventDefault();
    console.log(this.CandidateForm.value);
    this.candidateService.createCandidate(this.CandidateForm.value).subscribe(value => {
      console.log(value);
      this.Candidate = value;
      // this.CandidateForm.reset();
      // this.router.navigate(['home/candidate/view'])
    });

  }

  toggle() {

    this.toggleForm = false;

  }

  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  handleResume(event) {
    this.resumeUpload = this.selectedFiles.item(0);
    console.log(this.resumeUpload + " :: " + this.Candidate['candidateId']);
    this.candidateService.uploadCandidateResume(this.resumeUpload, this.Candidate['candidateId']).subscribe(response => {
      console.log("hello happening");
      this.CandidateForm.reset();
      this.router.navigate(['home/candidate/view'])
    })

  }

}
