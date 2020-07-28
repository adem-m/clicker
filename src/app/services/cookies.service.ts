import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()

export class CookiesService {
    constructor(private cookieService: CookieService) {
    }
    getScore() {
        if (this.cookieService.check('score')) {
            return this.cookieService.get('score');
        }
        return '0';
    }
    getPPC() {
        if (this.cookieService.check('ppc')) {
            return this.cookieService.get('ppc');
        }
        return '1';
    }
    getPPS() {
        if (this.cookieService.check('pps')) {
            return this.cookieService.get('pps');
        }
        return '0';
    }
    getPPCBoost() {
        if (this.cookieService.check('ppcBoost')) {
            return parseInt(this.cookieService.get('ppcBoost'), 10);
        }
        return 0;
    }
    getPPSBoost() {
        if (this.cookieService.check('ppsBoost')) {
            return parseInt(this.cookieService.get('ppsBoost'), 10);
        }
        return 0;
    }
    getDevilDealCharge() {
        if (this.cookieService.check('devilDealCharge')) {
            return parseInt(this.cookieService.get('devilDealCharge'), 10);
        }
        return 0;
    }
    getAtalCharge() {
        if (this.cookieService.check('atalCharge')) {
            return parseInt(this.cookieService.get('atalCharge'), 10);
        }
        return 0;
    }
    getEuropeBoost() {
        if (this.cookieService.check('europeBoost')) {
            return parseInt(this.cookieService.get('europeBoost'), 10);
        }
        return 0;
    }
    getEuropeCharge() {
        if (this.cookieService.check('europeCharge')) {
            return parseInt(this.cookieService.get('europeCharge'), 10);
        }
        return 0;
    }
    getBonusUnlocked() {
        if (this.cookieService.check('bonusUnlocked')) {
            return parseInt(this.cookieService.get('bonusUnlocked'), 10);
        }
        return 0;
    }
    getNewGame() {
        if (this.cookieService.check('newGame')) {
            return parseInt(this.cookieService.get('newGame'), 10);
        }
        return 1;
    }
    getFirstDrawer() {
        if (this.cookieService.check('firstDrawer')) {
            return parseInt(this.cookieService.get('firstDrawer'), 10);
        }
        return 1;
    }
    setScore(score: string) {
        this.cookieService.set('score', score, 99999);
    }
    setPPC(ppc: string) {
        this.cookieService.set('ppc', ppc, 99999);
    }
    setPPS(pps: string) {
        this.cookieService.set('pps', pps, 99999);
    }
    setPPCBoost(ppcBoost: number) {
        this.cookieService.set('ppcBoost', ppcBoost.toString(), 99999);
    }
    setPPSBoost(ppsBoost: number) {
        this.cookieService.set('ppsBoost', ppsBoost.toString(), 99999);
    }
    setDevilDealCharge(devilDealCharge: number) {
        this.cookieService.set('devilDealCharge', Math.floor(devilDealCharge).toString(), 99999);
    }
    setAtalCharge(atalCharge: number) {
        this.cookieService.set('atalCharge', Math.floor(atalCharge).toString(), 99999);
    }
    setEuropeCharge(europeCharge: number) {
        this.cookieService.set('europeCharge', Math.floor(europeCharge).toString(), 99999);
    }
    setEuropeBoost(europeBoost: number) {
        this.cookieService.set('europeBoost', Math.floor(europeBoost).toString(), 99999);
    }
    setBonusUnlocked(bonusUnlocked: number) {
        this.cookieService.set('bonusUnlocked', Math.floor(bonusUnlocked).toString(), 99999);
    }
    setNewGame(newGame: boolean) {
        if (!newGame) {
            this.cookieService.set('newGame', '0', 99999);
        }
    }
    setFirstDrawer(firstDrawer: boolean) {
        if (!firstDrawer) {
            this.cookieService.set('firstDrawer', '0', 99999);
        }
    }
}
