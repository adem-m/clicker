import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { BigNumber } from 'bignumber.js';

@Injectable()

export class AppService {
    score = '0';
    pointsPerClick = '1';
    pointsPerSecond = '0';
    ppcBoostTaken = 0;
    ppsBoostTaken = 0;
    devilDealCharge = 0;
    atalCharge = 0;
    europeCharge = 0;
    europeTaken = 0;
    imageName = 'assets/img/ronaldo.png';
    animation = 'juggle';
    imageDisplayed = false;
    bonusUnlocked = 0;
    mobile = false;
    newGame = true;
    firstDrawer = true;
    bonusActive = false;

    bonuses = [
        {
            color: 'basic',
            tooltip: 'Les points par clic augmentent de 2.',
            method: 'ppcBonus',
            buttonText: 'Tir cadré',
            unlockScore: 300,
            unlocked: false,
            cooldown: false,
            multipleButtons: true,
        },
        {
            color: 'primary',
            tooltip: 'Les points par seconde augmentent de 5.',
            method: 'ppsBonus',
            buttonText: 'La possession',
            unlockScore: 1000,
            unlocked: false,
            cooldown: false,
            multipleButtons: true,
        },
        {
            color: 'warn',
            tooltip: `70%  de chance de doubler tes stats<br>
            29% de chance de les diviser par deux<br>
            1% de chance de les multiplier par 12`,
            method: 'devilDeal',
            buttonText: 'Mercato',
            unlockScore: 15000,
            unlocked: false,
            cooldown: true,
            multipleButtons: false,
        },
        {
            color: 'accent',
            tooltip: 'Pendant 8 à 16 secondes, tu gagnes 1% de ton score par seconde.',
            method: 'atal',
            buttonText: 'Atal',
            unlockScore: 200000,
            unlocked: false,
            cooldown: true,
            multipleButtons: false,
        },
        {
            color: 'primary',
            tooltip: `Bonus de points par clic et par seconde variable. Plus tu cliques vite, plus ton bonus sera élevé.`,
            method: 'europe',
            buttonText: 'Coupe d\'Europe',
            unlockScore: 1000000,
            unlocked: false,
            cooldown: true,
            multipleButtons: false,
        },
    ];

    constructor(private snackBar: MatSnackBar) {
        if (window.screen.width < 700) {
            this.mobile = true;
        }
    }
    reset() {
        this.score = '0';
        this.pointsPerClick = '1';
        this.pointsPerSecond = '0';
        this.ppcBoostTaken = 0;
        this.ppsBoostTaken = 0;
        this.devilDealCharge = 0;
        this.atalCharge = 0;
        this.europeCharge = 0;
        this.europeTaken = 0;
        this.bonusUnlocked = 0;
        this.newGame = true;
        this.firstDrawer = true;
        this.bonuses.forEach(bonus => {
            bonus.unlocked = false;
        });
    }
    numberFormatter(num: string) {
        let neg = '';
        const n = new BigNumber(num);
        if (n.isNegative()) {
            num = n.times(-1).toFixed();
            neg = '-';
        }
        let stringBuilder = '';
        for (let i = 0; i < num.length; i++) {
            stringBuilder += num[num.length - i - 1];
            if (i % 3 === 2 && i !== num.length - 1) {
                stringBuilder += ',';
            }
        }
        let newScore = '';
        for (let i = 0; i < stringBuilder.length; i++) {
            newScore += stringBuilder[stringBuilder.length - i - 1];
        }
        return neg + newScore;
    }
    snackDisplay(content: string, time: number = 3000) {
        this.snackBar.open(content, 'Fermer', { duration: time });
    }
    bonusUnlockChecker() {
        let count = 0;
        const s = new BigNumber(this.score);
        if (this.bonusUnlocked < this.bonuses.length) {
            this.bonuses.forEach(bonus => {
                if (bonus.unlocked) {
                    count++;
                } else if (s.isGreaterThanOrEqualTo(bonus.unlockScore)) {
                    bonus.unlocked = true;
                    count++;
                }
            });
        }
        if (count > this.bonusUnlocked) {
            this.bonusUnlocked = count;
        }
    }
    displayImage(playerName: string, time: number) {
        document.getElementById('bonusButton').style.display = 'none';
        this.imageName = 'assets/img/' + playerName + '.png';
        this.imageDisplayed = true;
        setTimeout(() => {
            this.imageDisplayed = false;
            setTimeout(() => {
                document.getElementById('bonusButton').style.display = 'initial';
            }, 800);
        }, time);
    }
    changeStatColor(color: string, delay: number, statName = 'both') {
        if (statName === 'both') {
            document.getElementById('ppc').style.color = color;
            document.getElementById('pps').style.color = color;
            setTimeout(() => {
                document.getElementById('ppc').style.color = 'white';
                document.getElementById('pps').style.color = 'white';
            }, delay);
        } else {
            document.getElementById(statName).style.color = color;
            setTimeout(() => {
                document.getElementById(statName).style.color = 'white';
            }, delay);
        }
    }
    changeBackgroundColor(color: string, delay: number) {
        const background = document.getElementById('body');
        const initialColor = background.style.backgroundColor;

        background.style.backgroundColor = color;
        setTimeout(() => {
            background.style.backgroundColor = initialColor;
        }, delay);
    }
}
