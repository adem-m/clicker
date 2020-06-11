import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-bonus-drawer',
  templateUrl: './bonus-drawer.component.html',
  styleUrls: ['./bonus-drawer.component.scss']
})
export class BonusDrawerComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }
  ppcBonus() {
    if (this.appService.score > 100) {
      this.appService.score -= 100;
      this.appService.pointsPerClick += 2;
    }
  }
  ppsBonus() {
    if (this.appService.score > 100) {
      this.appService.score -= 100;
      this.appService.pointsPerSecond++;
    }
  }

}
