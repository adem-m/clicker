import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()

export class CookiesService {
    constructor(private cookieService: CookieService) {
    }
    getScore() {
        if (this.cookieService.check('score')) {
            return parseInt(this.cookieService.get('score'), 10);
        }
        return 0;
    }
    getPPC() {
        if (this.cookieService.check('ppc')) {
            return Math.sqrt(Math.pow(parseInt(this.cookieService.get('ppc'), 10), 2));
        }
        return 1;
    }
    getPPS() {
        if (this.cookieService.check('pps')) {
            return Math.sqrt(Math.pow(parseInt(this.cookieService.get('pps'), 10), 2));
        }
        return 0;
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
    setScore(score: number) {
        this.cookieService.set('score', score.toString(), 99999);
    }
    setPPC(ppc: number) {
        this.cookieService.set('ppc', ppc.toString(), 99999);
    }
    setPPS(pps: number) {
        this.cookieService.set('pps', pps.toString(), 99999);
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
