import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { AppComponent } from '../app.component';

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

    constructor(private appService: AppService, private appComponent: AppComponent) {
    }

    ngOnInit(): void {
    }
    numberFormatter(num: number) {
        return this.appService.numberFormatter(num);
    }
    getScore() {
        return this.appService.score;
    }
    getBonuses() {
        return this.appService.bonuses;
    }
    getBonusUnlocked() {
        return this.appService.bonusUnlocked;
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
        this.appService.changeStatColor('green', 1000, 'ppc');
    }
    ppsBonus() {
        this.appService.score -= this.getPPSBonusCost();
        this.appService.pointsPerSecond += 5;
        this.appService.ppsBoostTaken++;
        this.appService.snackDisplay('La belle passe !', 1000);
        this.appService.changeStatColor('green', 1000, 'pps');
    }
    devilDeal() {
        const delay = 5000;
        this.appService.devilDealCharge = 0;
        this.appService.score -= this.getDevilDealCost();
        const rand = Math.floor(Math.random() * 100);
        if (rand < 70) {
            const chance = Math.floor(Math.random() * this.devilDealBonuses.length);
            this.appService.pointsPerClick *= 2;
            this.appService.pointsPerSecond *= 2;
            this.appService.snackDisplay(this.devilDealBonuses[chance][0], 4000);
            this.appService.displayImage(this.devilDealBonuses[chance][1], delay);
            this.appService.changeStatColor('green', delay);
        } else if (rand === 99) {
            this.appService.pointsPerClick *= 12;
            this.appService.pointsPerSecond *= 12;
            this.appService.snackDisplay('PARDON ?! RRRRRRONALDO A L\'OGCNICE ?!');
            this.appService.displayImage('ronaldo', 10000);
            this.appService.changeStatColor('yellow', 10000);
        } else {
            const chance = Math.floor(Math.random() * this.devilDealMaluses.length);
            this.appService.pointsPerClick = Math.floor(this.appService.pointsPerClick / 2);
            this.appService.pointsPerSecond = Math.floor(this.appService.pointsPerSecond / 2);
            this.appService.snackDisplay(this.devilDealMaluses[chance][0], 4000);
            this.appService.displayImage(this.devilDealMaluses[chance][1], delay);
            this.appService.changeStatColor('red', delay);
        }
        this.appComponent.toggleDrawer();
    }
    atalBonus() {
        this.appService.bonusActive = true;
        const delay = Math.floor(Math.random() * 8000) + 8000;
        const ppsBonus = Math.floor(this.appService.score * 0.01);
        this.appService.atalCharge = 0;
        this.appService.score -= this.getAtalCost();
        this.appService.pointsPerSecond += ppsBonus;
        this.appService.snackDisplay('Ca va dribbler sale !');
        this.appService.displayImage('atal', delay);
        this.appService.changeStatColor('blue', delay, 'pps');
        setTimeout(() => {
            this.appService.pointsPerSecond -= ppsBonus;
            this.appService.bonusActive = false;
            if (this.appService.pointsPerSecond < 0) {
                this.appService.pointsPerSecond = 0;
            }
        }, delay);
    }
    getPPCBonusCost() {
        return (this.appService.ppcBoostTaken * 150) + 300;
    }
    getPPSBonusCost() {
        return (this.appService.ppsBoostTaken * 200) + 1000;
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
    getBonusActive() {
        return this.appService.bonusActive;
    }
}
