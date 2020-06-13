import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { CookiesService } from './services/cookies.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    gameStarted = false;

    constructor(private appService: AppService, private cookieService: CookiesService, public dialog: MatDialog) {
        this.getCookies();
    }
    getCookies() {
        this.appService.score = this.cookieService.getScore();
        this.appService.pointsPerClick = this.cookieService.getPPC();
        this.appService.pointsPerSecond = this.cookieService.getPPS();
        this.appService.ppcBoostTaken = this.cookieService.getPPCBoost();
        this.appService.ppsBoostTaken = this.cookieService.getPPSBoost();
        this.appService.devilDealCharge = this.cookieService.getDevilDealCharge();
        if (this.appService.pointsPerSecond > 0) {
            this.updateScore();
        }
    }
    variablesUpdate() {
        if (Math.floor(Math.random() * 80) === 0) {
            this.appService.pointsPerClick++;
        }
        if (Math.floor(Math.random() * 100) === 0) {
            this.appService.pointsPerSecond++;
        }
    }
    getScore() {
        return this.appService.numberFormatter(this.appService.score);
    }
    getPPC() {
        return this.appService.pointsPerClick;
    }
    getPPS() {
        return this.appService.pointsPerSecond;
    }
    updateScore() {
        this.appService.score += this.appService.pointsPerClick;
        if (this.appService.devilDealCharge < 100) {
            this.appService.devilDealCharge += 0.5;
        }
        this.save(this.appService.score);
        this.variablesUpdate();
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.appService.pointsPerSecond++;
            setInterval(() => {
                this.appService.score += this.appService.pointsPerSecond;
                this.save(this.appService.score);
            }, 1000);
        }
    }
    save(score: number) {
        this.cookieService.setScore(score);
        this.cookieService.setPPC(this.appService.pointsPerClick);
        this.cookieService.setPPS(this.appService.pointsPerSecond);
        this.cookieService.setPPCBoost(this.appService.ppcBoostTaken);
        this.cookieService.setPPSBoost(this.appService.ppsBoostTaken);
        this.cookieService.setDevilDealCharge(this.appService.devilDealCharge);
    }
    openResetDialog() {
        this.dialog.open(ResetDialogComponent);
    }
}
