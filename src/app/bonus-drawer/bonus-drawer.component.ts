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
        'Dolberg débarque de l\'AJAX pour tout niquer !',
        'Le grand Youcef sur la Côte d\'Azur pour 3 millions !',
        'Seri qui part pour 30M, ça fait un bénef de 28M. Propre',
        'Boudaoui 4 millions, futur crack !',
        'Benitez, meilleur gardien du monde, gratuit',
        'Balotelli cet OURS, gratos bien sûr',
        'Acheté 2 millions, vendu 21. Oui c\'est Dalbert'
    ];
    devilDealMaluses = [
        '6,5 millions pour Sneijder, quelle arnaque',
        'Mdr t\'as acheté Moussa Wagué',
        'Aiiie, Saint-Maximin qui fait ses valises',
        'Maolida pour le prix de 3 Atal, cette douille mdr',
        'Lamine Diaby recruté, surveillez vos poches',
        'Départ de Pléa le sang, ça fait mal',
        'Ben Arfa monte à la capitale, tu perds ton 9'
    ];
    bonuses = [
        {
            color: 'primary',
            tooltip: 'Points par clic +2',
            method: 'ppcBonus',
            buttonText: 'Tir cadré',
            unlock: 500,
            cooldown: false,
        },
        {
            color: 'primary',
            tooltip: 'Points par seconde +1',
            method: 'ppsBonus',
            buttonText: 'La possession',
            unlock: 1000,
            cooldown: false,
        },
        {
            color: 'warn',
            tooltip: '70%  de chance de doubler tes stats, 29% de chance de les diviser par deux, 1% de chance de les multiplier par 12',
            method: 'devilDeal',
            buttonText: 'Mercato',
            unlock: 10000,
            cooldown: true,
        },
        {
            color: 'primary',
            tooltip: '1% de ton score par seconde pendant 8 à 16 secondes',
            method: 'atal',
            buttonText: 'Atal',
            unlock: 100000,
            cooldown: true,
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
                return this.getDevilDealCost();
            case 'atal':
                return this.getAtalCost();
            default:
                break;
        }
    }
    ppcBonus() {
        this.appService.score -= this.getPPCBonusCost();
        this.appService.pointsPerClick += 2;
        this.appService.ppcBoostTaken++;
        this.appService.snackDisplay('Eh c\'est le but !', 1000);
    }
    ppsBonus() {
        this.appService.score -= this.getPPSBonusCost();
        this.appService.pointsPerSecond++;
        this.appService.ppsBoostTaken++;
        this.appService.snackDisplay('La belle passe !', 1000);
    }
    devilDeal() {
        this.appService.devilDealCharge = 0;
        this.appService.score -= this.getDevilDealCost();
        const rand = Math.floor(Math.random() * 100);
        if (rand < 70) {
            this.appService.pointsPerClick *= 2;
            this.appService.pointsPerSecond *= 2;
            this.appService.snackDisplay(this.devilDealBonuses[Math.floor(Math.random() * this.devilDealBonuses.length)], 4000);
        } else if (rand === 99) {
            this.appService.pointsPerClick *= 12;
            this.appService.pointsPerSecond *= 12;
            this.appService.snackDisplay('PARDON ?! RRRRRRONALDO A L\'OGCNICE ?!');
        } else {
            this.appService.pointsPerClick = Math.floor(this.appService.pointsPerClick / 2);
            this.appService.pointsPerSecond = Math.floor(this.appService.pointsPerSecond / 2);
            this.appService.snackDisplay(this.devilDealMaluses[Math.floor(Math.random() * this.devilDealMaluses.length)], 4000);
        }
    }
    atalBonus() {
        this.appService.atalCharge = 0;
        this.appService.score -= this.getAtalCost();
        const ppsBonus = Math.floor(this.appService.score * 0.01);
        this.appService.pointsPerSecond += ppsBonus;
        setTimeout(() => {
            this.appService.pointsPerSecond -= ppsBonus;
            if (this.appService.pointsPerSecond < 0) {
                this.appService.pointsPerSecond = 0;
            }
        }, Math.floor(Math.random() * 8000) + 8000);
        this.appService.snackDisplay('Ca va dribbler sale !');
    }
    getPPCBonusCost() {
        return (this.appService.ppcBoostTaken * 200) + 500;
    }
    getPPSBonusCost() {
        return (this.appService.ppsBoostTaken * 250) + 1000;
    }
    getCooldown(method: string) {
        switch (method) {
            case 'devilDeal':
                return this.getDevilDealCharge();
            case 'atal':
                return this.getAtalCharge();
            default:
                return 0;
        }
    }
    getDevilDealCharge() {
        return this.appService.devilDealCharge;
    }
    getDevilDealCost() {
        return Math.floor(this.appService.score * 0.7);
    }
    getAtalCharge() {
        return this.appService.atalCharge;
    }
    getAtalCost() {
        return Math.floor(this.appService.score * 0.1);
    }
}
