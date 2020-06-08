import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ppc = 1;

  constructor(private service: AppService) {
  }
  getScore() {
    return this.service.playerScore;
  }
  updateScore() {
    this.service.playerScore += this.ppc;
  }
}
