import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
    selector: 'app-bonus-drawer',
    templateUrl: './bonus-drawer.component.html',
    styleUrls: ['./bonus-drawer.component.scss']
})
export class BonusDrawerComponent implements OnInit {
    bonuses = [
        {
            color: 'primary',
            tooltip: 'PPC +2',
            method: 'ppcBonus',
            buttonText: 'PPC Bonus'
        },
        {
            color: 'primary',
            tooltip: 'PPS +1',
            method: 'ppsBonus',
            buttonText: 'PPS Bonus'
        },
        {
            color: 'warn',
            tooltip: '60% chance to double your stats, 40% chance to half your stats',
            method: 'devilDeal',
            buttonText: 'Devil Deal'
        },
        {
            color: 'primary',
            tooltip: 'Youcef',
            method: 'atal',
            buttonText: 'Atal'
        },
    ];
    constructor(private appService: AppService) { }

    ngOnInit(): void {
    }
    onClickMethod(method: string) {
        switch (method) {
            case 'ppcBonus':
                this.ppcBonus();
                break;
            case 'ppsBonus':
                this.ppsBonus();
                break;
            case 'devilDeal':
                this.devilDeal();
                break;
            default:
                break;
        }
    }
    getCostMethod(method: string) {
        switch (method) {
            case 'ppcBonus':
                return this.getPPCBonusCost();
            case 'ppsBonus':
                return this.getPPSBonusCost();
            case 'devilDeal':
                return '80%';
            default:
                break;
        }
    }
    ppcBonus() {
        if (this.appService.score > this.getPPCBonusCost()) {
            this.appService.score -= this.getPPCBonusCost();
            this.appService.pointsPerClick += 2;
            this.appService.ppcBoostTaken++;
        }
    }
    ppsBonus() {
        if (this.appService.score > this.getPPSBonusCost()) {
            this.appService.score -= this.getPPSBonusCost();
            this.appService.pointsPerSecond++;
            this.appService.ppsBoostTaken++;
        }
    }
    devilDeal() {
        if (this.appService.devilDealCharge === 100) {
            this.appService.devilDealCharge = 0;
            this.appService.score = Math.floor(this.appService.score * 0.2);
            if (Math.floor(Math.random() * 100) < 60) {
                this.appService.pointsPerClick *= 2;
                this.appService.pointsPerSecond *= 2;
            } else {
                this.appService.pointsPerClick = Math.floor(this.appService.pointsPerClick / 2);
                this.appService.pointsPerSecond = Math.floor(this.appService.pointsPerSecond / 2);
            }
        }
    }
    getPPCBonusCost() {
        return (this.appService.ppcBoostTaken * 500) + 500;
    }
    getPPSBonusCost() {
        return (this.appService.ppsBoostTaken * 500) + 1000;
    }
    getDevilDealCharge() {
        return this.appService.devilDealCharge;
    }
}
