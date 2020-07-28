import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { EuropeDialogComponent } from '../europe-dialog/europe-dialog.component';
import { BigNumber } from 'bignumber.js';

@Component({
    selector: 'app-bonus-drawer',
    templateUrl: './bonus-drawer.component.html',
    styleUrls: ['./bonus-drawer.component.scss'],
    animations: [
        trigger('animationTrigger', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1000ms', keyframes([
                    style({ opacity: 1 })
                ])),
            ]),
            transition(':leave', [
                animate('1000ms', style({ opacity: 0 }))
            ])
        ]),
    ]
})
export class BonusDrawerComponent implements OnInit {
    devilDealBonuses = [
        ['Ben Arfa qui signe pour 0€ ! Ish ish', 'benarfacome'],
        ['Dolberg débarque de l\'AJAX pour tout niquer !', 'dolberg'],
        ['Le grand Youcef sur la Côte d\'Azur pour 3 millions !', 'atal'],
        ['Seri qui part pour 30M, ça fait un bénef de 28M. Propre', 'seri'],
        ['Boudaoui 4 millions, futur crack !', 'boudaoui'],
        ['Benitez, meilleur gardien du monde, gratuit', 'benitez'],
        ['Balotelli cet OURS, gratos bien sûr', 'balotelli'],
        ['Acheté 2 millions, vendu 21. Oui c\'est Dalbert', 'dalbert']
    ];
    devilDealMaluses = [
        ['6,5 millions pour Sneijder, quelle arnaque', 'sneijder'],
        ['Mdr t\'as acheté Moussa Wagué', 'wague'],
        ['Aiiie, Saint-Maximin qui fait ses valises', 'stmaximin'],
        ['Maolida pour le prix de 3 Atal, cette douille mdr', 'maolida'],
        ['Lamine Diaby recruté, surveillez vos poches', 'diaby'],
        ['Départ de Pléa le sang, ça fait mal', 'plea'],
        ['Ben Arfa monte à la capitale, tu perds ton 9', 'benarfagone']
    ];

    constructor(private appService: AppService, private appComponent: AppComponent, private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }
    numberFormatter(num) {
        return this.appService.numberFormatter(num.toString());
    }
    getScore(stringFormat = true) {
        if (stringFormat) {
            return this.appService.score;
        }
        return new BigNumber(this.appService.score).toNumber();
    }
    getBonuses() {
        return this.appService.bonuses;
    }
    getBonusUnlocked() {
        return this.appService.bonusUnlocked;
    }
    onClickMethod(method: string, multiplier = 1) {
        switch (method) {
            case 'ppcBonus':
                this.ppcBonus(multiplier);
                break;
            case 'ppsBonus':
                this.ppsBonus(multiplier);
                break;
            case 'devilDeal':
                this.devilDeal();
                break;
            case 'atal':
                this.atalBonus();
                break;
            case 'europe':
                this.europeBonus();
                break;
            default:
                break;
        }
    }
    getCostMethod(method: string, multiplier = 1) {
        switch (method) {
            case 'ppcBonus':
                return this.getPPCBonusCost(multiplier);
            case 'ppsBonus':
                return this.getPPSBonusCost(multiplier);
            case 'devilDeal':
                return this.getDevilDealCost(true);
            case 'atal':
                return this.getAtalCost(true);
            case 'europe':
                return this.getEuropeCost();
            default:
                return 0;
        }
    }
    ppcBonus(multiplier = 1) {
        this.appService.score = new BigNumber(this.appService.score).minus(this.getPPCBonusCost(multiplier)).toFixed();
        this.appService.pointsPerClick = new BigNumber(this.appService.pointsPerClick).plus(2 * multiplier).toFixed();
        this.appService.ppcBoostTaken += multiplier;
        this.appService.snackDisplay('Eh c\'est le but !', 1000);
        this.appService.changeStatColor('green', 1000, 'ppc');
        if (this.appService.mobile) {
            this.appComponent.toggleDrawer();
        }
    }
    ppsBonus(multiplier = 1) {
        this.appService.score = new BigNumber(this.appService.score).minus(this.getPPSBonusCost(multiplier)).toFixed();
        this.appService.pointsPerSecond = new BigNumber(this.appService.pointsPerSecond).plus(5 * multiplier).toFixed();
        this.appService.ppsBoostTaken += multiplier;
        this.appService.snackDisplay('La belle passe !', 1000);
        this.appService.changeStatColor('green', 1000, 'pps');
        if (this.appService.mobile) {
            this.appComponent.toggleDrawer();
        }
    }
    devilDeal() {
        const delay = 5000;
        this.appService.devilDealCharge = 0;
        this.appService.score = new BigNumber(this.appService.score).minus(this.getDevilDealCost()).toFixed();
        const rand = Math.floor(Math.random() * 100);
        if (rand < 70) {
            const chance = Math.floor(Math.random() * this.devilDealBonuses.length);
            this.appService.pointsPerClick = new BigNumber(this.appService.pointsPerClick).times(2).toFixed();
            this.appService.pointsPerSecond = new BigNumber(this.appService.pointsPerSecond).times(2).toFixed();
            this.appService.animation = 'juggle';
            this.appService.snackDisplay(this.devilDealBonuses[chance][0], 4000);
            this.appService.displayImage(this.devilDealBonuses[chance][1], delay);
            this.appService.changeStatColor('green', delay);
        } else if (rand === 99) {
            this.appService.pointsPerClick = new BigNumber(this.appService.pointsPerClick).times(12).toFixed();
            this.appService.pointsPerSecond = new BigNumber(this.appService.pointsPerSecond).times(12).toFixed();
            this.appService.animation = 'juggle';
            this.appService.snackDisplay('PARDON ?! RRRRRRONALDO A L\'OGCNICE ?!');
            this.appService.displayImage('ronaldo', 10000);
            this.appService.changeStatColor('yellow', 10000);
        } else {
            const chance = Math.floor(Math.random() * this.devilDealMaluses.length);
            this.appService.pointsPerClick = new BigNumber(this.appService.pointsPerClick).dividedBy(2).toFixed();
            this.appService.pointsPerSecond = new BigNumber(this.appService.pointsPerSecond).dividedBy(2).toFixed();
            this.appService.animation = 'rotate';
            this.appService.snackDisplay(this.devilDealMaluses[chance][0], 4000);
            this.appService.displayImage(this.devilDealMaluses[chance][1], delay);
            this.appService.changeStatColor('red', delay);
        }
        this.appComponent.toggleDrawer();
    }
    atalBonus() {
        this.appService.bonusActive = true;
        const delay = Math.floor(Math.random() * 8000) + 8000;
        const ppsBonus = new BigNumber(this.appService.score).times(0.01).dp(0, 1).toNumber();
        this.appService.atalCharge = 0;
        this.appService.score = new BigNumber(this.appService.score).minus(this.getAtalCost()).toFixed();
        this.appService.pointsPerSecond = new BigNumber(this.appService.pointsPerSecond).plus(ppsBonus).toFixed();
        this.appService.snackDisplay('Ca va dribbler sale !');
        this.appService.displayImage('atal', delay);
        this.appService.changeStatColor('blue', delay, 'pps');
        this.appComponent.toggleDrawer();
        setTimeout(() => {
            this.appService.pointsPerSecond = new BigNumber(this.appService.pointsPerSecond).minus(ppsBonus).toFixed();
            this.appService.bonusActive = false;
            if (new BigNumber(this.appService.pointsPerSecond).isNegative()) {
                this.appService.pointsPerSecond = '0';
            }
        }, delay);
    }
    europeBonus() {
        this.appService.bonusActive = true;
        this.appService.europeCharge = 0;
        this.appService.score = new BigNumber(this.appService.score).minus(this.getEuropeCost()).toFixed();
        this.dialog.open(EuropeDialogComponent, { disableClose: true });
        this.appComponent.toggleDrawer();
    }
    getPPCBonusCost(multiplier = 1) {
        const base = (this.appService.ppcBoostTaken * 150) + 300;
        let cost = 0;
        for (let i = 0; i < multiplier; i++) {
            cost += base + i * 150;
        }
        return cost;
    }
    getPPSBonusCost(multiplier = 1) {
        const base = (this.appService.ppsBoostTaken * 200) + 1000;
        let cost = 0;
        for (let i = 0; i < multiplier; i++) {
            cost += base + i * 200;
        }
        return cost;
    }
    getCooldown(method: string) {
        switch (method) {
            case 'devilDeal':
                return this.appService.devilDealCharge;
            case 'atal':
                return this.appService.atalCharge;
            case 'europe':
                return this.appService.europeCharge;
            default:
                return 0;
        }
    }
    getDevilDealCost(stringFormat = false) {
        if (stringFormat) {
            return new BigNumber(this.appService.score).times(0.7).dp(0, 1).toFixed();
        }
        return Math.floor(new BigNumber(this.appService.score).times(0.7).toNumber());
    }
    getAtalCost(stringFormat = false) {
        if (stringFormat) {
            return new BigNumber(this.appService.score).times(0.1).dp(0, 1).toFixed();
        }
        return Math.floor(new BigNumber(this.appService.score).times(0.1).toNumber());
    }
    getEuropeCost() {
        return Math.floor((100000 * Math.pow(this.appService.europeTaken, 1.6) + 300000) / 1000) * 1000;
    }
    getBonusActive() {
        return this.appService.bonusActive;
    }
}
