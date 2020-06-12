export class AppService {
    score = 0;
    pointsPerClick = 1;
    pointsPerSecond = 0;
    ppcBoostTaken = 0;
    ppsBoostTaken = 0;
    devilDealCharge = 0;

    reset() {
        this.score = 0;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
        this.ppcBoostTaken = 0;
        this.ppsBoostTaken = 0;
        this.devilDealCharge = 0;
    }
}
