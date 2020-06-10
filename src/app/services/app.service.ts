export class AppService {
    score = 0;
    pointsPerClick = 1;
    pointsPerSecond = 0;

    reset() {
        this.score = 0;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
    }
}
