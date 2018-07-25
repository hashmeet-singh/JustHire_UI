import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-configure-interview',
  templateUrl: './configure-interview.component.html',
  styleUrls: ['./configure-interview.component.css']
})
export class ConfigureInterviewComponent implements OnInit {

  systemForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private statsService: StatsService) { }

  ngOnInit() {
    this.systemForm = this.fb.group({
      noOfRounds: ['', Validators.required],
      minimumQuestions: ['', Validators.required],
      threshold: ['', Validators.required]
    });


  }

  handleSubmit(event) {
    this.statsService.setAttributes(this.systemForm.value).subscribe(response => {
      console.log(response);
    });

  }



}
