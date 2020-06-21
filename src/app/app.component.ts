import { Component, ViewChild } from '@angular/core';
import { AppService } from './services/app.service';
import { CookiesService } from './services/cookies.service';
import { MatDialog } from '@angular/material/dialog';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';
import { NewGameDialogComponent } from './new-game-dialog/new-game-dialog.component';
import { BonusDialogComponent } from './bonus-dialog/bonus-dialog.component';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('animationTrigger', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', keyframes([
                    style({ opacity: 1 })
                ])),
            ]),
            transition(':leave', [
                animate('500ms', style({ opacity: 0 }))
            ])
        ]),
    ]
})
export class AppComponent {
    gameStarted = false;
    @ViewChild('drawer') drawer: MatSidenav;

    constructor(private appService: AppService, private cookieService: CookiesService, public dialog: MatDialog) {
        appService.bonusUnlockChecker();
        this.getCookies();
        if (appService.newGame) {
            this.openNewGameDialog();
        }
    }
    getCookies() {
        this.appService.score = this.cookieService.getScore();
        this.appService.pointsPerClick = this.cookieService.getPPC();
        this.appService.pointsPerSecond = this.cookieService.getPPS();
        this.appService.ppcBoostTaken = this.cookieService.getPPCBoost();
        this.appService.ppsBoostTaken = this.cookieService.getPPSBoost();
        this.appService.devilDealCharge = this.cookieService.getDevilDealCharge();
        this.appService.atalCharge = this.cookieService.getAtalCharge();
        this.appService.bonusUnlocked = this.cookieService.getBonusUnlocked();
        if (this.cookieService.getNewGame() === 0) {
            this.appService.newGame = false;
        }
        if (this.cookieService.getFirstDrawer() === 0) {
            this.appService.firstDrawer = false;
        }
        if (this.appService.pointsPerSecond > 0) {
            this.updateScore();
        }
    }
    variablesUpdate() {
        if (Math.floor(Math.random() * 75) === 0) {
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
        return this.appService.numberFormatter(this.appService.pointsPerClick);
    }
    getPPS() {
        return this.appService.numberFormatter(this.appService.pointsPerSecond);
    }
    updateScore() {
        this.appService.newGame = false;
        this.appService.score += this.appService.pointsPerClick;
        this.appService.bonusUnlockChecker();
        this.devilDealChargeUp();
        this.atalChargeUp();
        this.save(this.appService.score);
        this.variablesUpdate();
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.appService.pointsPerSecond++;
            setInterval(() => {
                this.appService.score += this.appService.pointsPerSecond;
                this.appService.bonusUnlockChecker();
                this.save(this.appService.score);
                if (Math.floor(Math.random() * 100) === 0) {
                    this.runBonusTime(Math.floor(Math.random() * 5000) + 5000);
                }
                if (Math.floor(Math.random() * 150) === 0) {
                    this.runMalusTime(Math.floor(Math.random() * 5000) + 5000);
                }
            }, 1000);
        }
    }
    save(score: number) {
        this.cookieService.setScore(score);
        this.cookieService.setPPC(this.appService.pointsPerClick);
        this.cookieService.setPPS(this.appService.pointsPerSecond - 1);
        this.cookieService.setPPCBoost(this.appService.ppcBoostTaken);
        this.cookieService.setPPSBoost(this.appService.ppsBoostTaken);
        this.cookieService.setDevilDealCharge(this.appService.devilDealCharge);
        this.cookieService.setAtalCharge(this.appService.atalCharge);
        this.cookieService.setBonusUnlocked(this.appService.bonusUnlocked);
        this.cookieService.setNewGame(this.appService.newGame);
        this.cookieService.setFirstDrawer(this.appService.firstDrawer);
    }
    openResetDialog() {
        this.dialog.open(ResetDialogComponent);
    }
    openNewGameDialog() {
        this.dialog.open(NewGameDialogComponent);
    }
    devilDealChargeUp() {
        if (this.appService.devilDealCharge < 100) {
            this.appService.devilDealCharge += 0.5;
        }
        // this.appService.devilDealCharge = 100;
    }
    atalChargeUp() {
        if (this.appService.atalCharge < 100) {
            this.appService.atalCharge += 0.25;
        }
    }
    getImageStatus() {
        return this.appService.imageDisplayed;
    }
    getImageName() {
        return this.appService.imageName;
    }
    getAnimation() {
        return this.appService.animation;
    }
    toggleDrawer() {
        this.drawer.toggle();
        if (this.appService.firstDrawer) {
            this.appService.firstDrawer = false;
            this.dialog.open(BonusDialogComponent);
        }
    }
    runBonusTime(delay: number) {
        if (!this.appService.bonusActive) {
            this.appService.bonusActive = true;
            this.appService.snackDisplay('Temps additionnel ! Points par clic quadruplés pendant les prochaines secondes', 5000);
            const initialPPC = this.appService.pointsPerClick;
            this.appService.pointsPerClick *= 4;
            this.appService.changeStatColor('green', delay, 'ppc');
            this.appService.changeBackgroundColor('#334034', delay);
            setTimeout(() => {
                this.appService.pointsPerClick = initialPPC;
                this.appService.bonusActive = false;
            }, delay);
        }
    }
    runMalusTime(delay: number) {
        if (!this.appService.bonusActive) {
            this.appService.bonusActive = true;
            this.appService.snackDisplay('Mi-temps ! Relâche la pression ou tu vas te faire un claquage', 5000);
            const initialPPC = this.appService.pointsPerClick;
            const initialPPS = this.appService.pointsPerSecond;
            this.appService.pointsPerClick *= -1;
            this.appService.pointsPerSecond = 0;
            this.appService.changeStatColor('red', delay);
            this.appService.changeBackgroundColor('#423434', delay);
            setTimeout(() => {
                this.appService.pointsPerClick = initialPPC;
                this.appService.pointsPerSecond = initialPPS;
                this.appService.bonusActive = false;
            }, delay);
        }
    }
}
