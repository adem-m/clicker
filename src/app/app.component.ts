import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { CookiesService } from './services/cookies.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    pointsPerClick = 1;
    pointsPerSecond = 0;
    gameStarted = false;

    constructor(private service: AppService, private cookieService: CookiesService) {
        this.getCookies();
    }
    getCookies() {
        this.service.playerScore = this.cookieService.getScore();
        this.pointsPerClick = this.cookieService.getPPC();
        this.pointsPerSecond = this.cookieService.getPPS();
        if (this.pointsPerSecond > 0) {
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
        this.save(this.service.playerScore);
        this.variablesUpdate();
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.pointsPerSecond++;
            setInterval(() => {
                this.service.playerScore += this.pointsPerSecond;
                this.save(this.service.playerScore);
            }, 1000);
        }
    }
    save(score: number) {
        this.cookieService.setScore(score);
        this.cookieService.setPPC(this.pointsPerClick);
        this.cookieService.setPPS(this.pointsPerSecond);
    }
    reset() {
        this.service.playerScore = 0;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
    }
}
