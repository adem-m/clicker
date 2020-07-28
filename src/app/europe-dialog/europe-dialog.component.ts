import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../services/app.service';
import BigNumber from 'bignumber.js';

@Component({
    selector: 'app-europe-dialog',
    templateUrl: './europe-dialog.component.html',
    styleUrls: ['./europe-dialog.component.scss']
})
export class EuropeDialogComponent implements OnInit {
    timer = 100;
    clicks = 0;
    started = false;
    displayedPPC: string;
    displayedPPS: string;
    ppc: string;
    pps: string;
    img = 'c1';

    constructor(private module: MatDialog, private appService: AppService) {
        if (Math.random() < 0.5) {
            this.img = 'c3';
        } else {
            this.img = 'c1';
        }
    }

    ngOnInit(): void {
    }
    startCountdown() {
        if (this.timer > 0) {
            this.clicks++;
        }
        if (!this.started) {
            this.started = true;
            const interval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                }
                if (this.timer === 0) {
                    clearInterval(interval);
                    this.showBonuses();
                }
            }, 100);
        }
    }
    showBonuses() {
        this.computeBonuses();
        setTimeout(() => {
            this.displayStat('bonusHeader');
            setTimeout(() => {
                this.displayStat('ppClick');
                setTimeout(() => {
                    this.displayStat('ppSecond');
                    setTimeout(() => {
                        this.closeDialog();
                    }, 3000);
                }, 500);
            }, 1000);
        }, 2000);
    }
    displayStat(stat: string) {
        const bonus = document.getElementById(stat);
        bonus.style.fontSize = '1em';
    }
    computeBonuses() {
        const floor = Math.pow(this.clicks, 1.5) / 6;
        this.ppc = new BigNumber(this.appService.pointsPerClick).times(floor / 1000).dp(0, 1).toFixed();
        this.pps = new BigNumber(this.appService.pointsPerSecond).times(floor / 1000).dp(0, 1).toFixed();
        this.displayedPPC = this.appService.numberFormatter(this.ppc);
        this.displayedPPS = this.appService.numberFormatter(this.pps);
    }
    closeDialog() {
        setTimeout(() => {
            this.module.closeAll();
            this.appService.bonusActive = false;
            this.reset();
            this.appService.changeStatColor('green', 2500);
            this.appService.pointsPerClick = new BigNumber(this.appService.pointsPerClick).plus(this.ppc).toFixed();
            this.appService.pointsPerSecond = new BigNumber(this.appService.pointsPerSecond).plus(this.pps).toFixed();
            this.appService.europeTaken++;
        }, 3000);
    }
    reset() {
        this.timer = 100;
        this.clicks = 0;
        this.started = false;
    }
}
