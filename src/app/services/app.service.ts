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

    constructor(private snackBar: MatSnackBar) {

    }
    reset() {
        this.score = 0;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
        this.ppcBoostTaken = 0;
        this.ppsBoostTaken = 0;
        this.devilDealCharge = 0;
        this.atalCharge = 0;
    }
    numberFormatter(num: number) {
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
        return newScore;
    }
    snackDisplay(content: string, time: number = 3000) {
        this.snackBar.open(content, 'Fermer', { duration: time });
    }
}
