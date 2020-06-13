import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
    selector: 'app-bonus-drawer',
    templateUrl: './bonus-drawer.component.html',
    styleUrls: ['./bonus-drawer.component.scss']
})
export class BonusDrawerComponent implements OnInit {
    devilDealBonuses = [
        'Ben Arfa qui signe pour 0€ ! Ish ish',
        'Dolberg qui arrive de l\'AJAX !'
    ];
    devilDealMaluses = [
        '6,5 millions pour Sneijder, ça pique...',
        'Mdr t\'as acheté Moussa Wagué'
    ];
    bonuses = [
        {
            color: 'primary',
            tooltip: 'Points par clic +2',
            method: 'ppcBonus',
            buttonText: 'Tir cadré',
            unlock: 500,
        },
        {
            color: 'primary',
            tooltip: 'Points par seconde +1',
            method: 'ppsBonus',
            buttonText: 'La possession',
            unlock: 1000,
        },
        {
            color: 'warn',
            tooltip: '60%  de chance de doubler tes stats, 40% de chance de les diviser par deux',
            method: 'devilDeal',
            buttonText: 'Mercato',
            unlock: 10000,
        },
        {
            color: 'primary',
            tooltip: 'PPS +1000 pour 10 à 15 secondes',
            method: 'atal',
            buttonText: 'Atal',
            unlock: 100000,
        },
    ];
    constructor(private appService: AppService) { }

    ngOnInit(): void {
    }
    numberFormatter(num: number) {
        return this.appService.numberFormatter(num);
    }
    getScore() {
        return this.appService.score;
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
            case 'atal':
                this.atalBonus();
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
                return Math.floor(this.appService.score * 0.8);
            case 'atal':
                return 10000;
            default:
                break;
        }
    }
    ppcBonus() {
        if (this.appService.score > this.getPPCBonusCost()) {
            this.appService.score -= this.getPPCBonusCost();
            this.appService.pointsPerClick += 2;
            this.appService.ppcBoostTaken++;
            this.appService.snackDisplay('Eh c\'est le but !', 1000);
        }
    }
    ppsBonus() {
        if (this.appService.score > this.getPPSBonusCost()) {
            this.appService.score -= this.getPPSBonusCost();
            this.appService.pointsPerSecond++;
            this.appService.ppsBoostTaken++;
            this.appService.snackDisplay('La belle passe !', 1000);
        }
    }
    devilDeal() {
        if (this.appService.devilDealCharge === 100) {
            this.appService.devilDealCharge = 0;
            this.appService.score = Math.floor(this.appService.score * 0.2);
            if (Math.floor(Math.random() * 100) < 60) {
                this.appService.pointsPerClick *= 2;
                this.appService.pointsPerSecond *= 2;
                this.appService.snackDisplay(this.devilDealBonuses[Math.floor(Math.random() * this.devilDealBonuses.length)]);
            } else {
                this.appService.pointsPerClick = Math.floor(this.appService.pointsPerClick / 2);
                this.appService.pointsPerSecond = Math.floor(this.appService.pointsPerSecond / 2);
                this.appService.snackDisplay(this.devilDealMaluses[Math.floor(Math.random() * this.devilDealMaluses.length)]);
            }
        }
    }
    atalBonus() {
        this.appService.pointsPerSecond += 1000;
        setTimeout(() => {
            this.appService.pointsPerSecond -= 1000;
            if (this.appService.pointsPerSecond < 0) {
                this.appService.pointsPerSecond = 0;
            }
        }, Math.floor(Math.random() * 5000) + 10000);
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
