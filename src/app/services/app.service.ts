import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()

export class AppService {
    score = 0;
    pointsPerClick = 1;
    pointsPerSecond = 0;
    ppcBoostTaken = 0;
    ppsBoostTaken = 0;
    devilDealCharge = 0;
    atalCharge = 0;
    imageName = 'ronaldo';
    imageDisplayed = false;
    bonusUnlocked = 0;
    mobile = false;
    newGame = true;
    firstDrawer = true;
    bonusActive = false;

    bonuses = [
        {
            color: 'basic',
            tooltip: 'Points par clic +2',
            method: 'ppcBonus',
            buttonText: 'Tir cadré',
            unlockScore: 300,
            unlocked: false,
            cooldown: false,
        },
        {
            color: 'primary',
            tooltip: 'Points par seconde +5',
            method: 'ppsBonus',
            buttonText: 'La possession',
            unlockScore: 1000,
            unlocked: false,
            cooldown: false,
        },
        {
            color: 'warn',
            tooltip: '70%  de chance de doubler tes stats, 29% de chance de les diviser par deux, 1% de chance de les multiplier par 12',
            method: 'devilDeal',
            buttonText: 'Mercato',
            unlockScore: 15000,
            unlocked: false,
            cooldown: true,
        },
        {
            color: 'accent',
            tooltip: 'Pendant 8 à 16 secondes, tu gagnes 1% de ton score par seconde',
            method: 'atal',
            buttonText: 'Atal',
            unlockScore: 200000,
            unlocked: false,
            cooldown: true,
        },
    ];

    constructor(private snackBar: MatSnackBar) {
        if (window.screen.width < 700) {
            this.mobile = true;
        }
    }
    reset() {
        this.score = 0;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
        this.ppcBoostTaken = 0;
        this.ppsBoostTaken = 0;
        this.devilDealCharge = 0;
        this.atalCharge = 0;
        this.bonusUnlocked = 0;
        this.newGame = true;
        this.firstDrawer = true;
        this.bonuses.forEach(bonus => {
            bonus.unlocked = false;
        });
    }
    numberFormatter(num: number) {
        let neg = '';
        if (num < 0) {
            num *= -1;
            neg = '-';
        }
        const currentScore = num.toString();
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
        return neg + newScore;
    }
    snackDisplay(content: string, time: number = 3000) {
        this.snackBar.open(content, 'Fermer', { duration: time });
    }
    bonusUnlockChecker() {
        let count = 0;
        if (this.bonusUnlocked < this.bonuses.length) {
            this.bonuses.forEach(bonus => {
                if (bonus.unlocked) {
                    count++;
                } else if (bonus.unlockScore <= this.score) {
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
