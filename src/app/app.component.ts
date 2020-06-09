import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    pointsPerClick = 1;
    pointsPerSecond = 0;
    gameStarted = false;

    constructor(private service: AppService, private cookieService: CookieService) {
        this.getCookies();
    }
    getCookies() {
        if (parseInt(this.cookieService.get('score'), 10) > 0) {
            this.service.playerScore = parseInt(this.cookieService.get('score'), 10);
        }
        if (parseInt(this.cookieService.get('ppc'), 10) > 0) {
            this.pointsPerClick = parseInt(this.cookieService.get('ppc'), 10);
        }
        if (parseInt(this.cookieService.get('pps'), 10) > 0) {
            this.pointsPerSecond = parseInt(this.cookieService.get('pps'), 10);
            this.updateScore();
        }
    }
    variablesUpdate() {
        if (Math.floor(Math.random() * 100) === 0) {
            this.pointsPerClick++;
        }
        if (Math.floor(Math.random() * 80) === 0) {
            this.pointsPerSecond++;
        }
    }
    getScore() {
        const currentScore = this.service.playerScore.toString();
        let stringBuilder = '';
        for (let i = 0; i < currentScore.length; i++) {
            stringBuilder += currentScore[currentScore.length - i - 1];
            if (i % 3 === 2 && i !== currentScore.length - 1) {
                stringBuilder += ',';
            }
        }
        let newScore = '';
        for (let i = 0; i < stringBuilder.length; i++) {
            newScore += stringBuilder[stringBuilder.length - i - 1];
        }
        return newScore;
    }
    updateScore() {
        this.service.playerScore += this.pointsPerClick;
        this.save(this.service.playerScore.toString());
        this.variablesUpdate();
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.pointsPerSecond++;
            setInterval(() => {
                this.service.playerScore += this.pointsPerSecond;
                this.save(this.service.playerScore.toString());
            }, 1000);
        }
    }
    save(score: string) {
        this.cookieService.set('score', score, 99999);
        this.cookieService.set('ppc', this.pointsPerClick.toString(), 99999);
        this.cookieService.set('pps', this.pointsPerSecond.toString(), 99999);
    }
    reset() {
        this.service.playerScore = 0;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
    }
}
