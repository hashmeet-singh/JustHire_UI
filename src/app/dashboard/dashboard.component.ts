import { Component, OnInit } from '@angular/core';
import { StatsService } from '../stats.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  date: String;
  statistics: any = [];
  constructor(private statsService: StatsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.statsService.loadStats().subscribe(data => {
      this.statistics = data;
      console.log(this.statistics);
    })
    this.date=this.datePipe.transform(new Date());
  }



}