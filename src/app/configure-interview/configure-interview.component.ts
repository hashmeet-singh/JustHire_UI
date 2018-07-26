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
    event.preventDefault();
    if (this.systemForm.valid) {
      this.statsService.loadStats()
        .subscribe(stats => {
          console.log(stats[0]);
          if (stats[0] > 0) {
            console.log('Cant Configure');
          }
          else {
            this.statsService.setAttributes(this.systemForm.value).subscribe(response => {
              console.log(response);
            });
          }
        });

    }

  }



}
