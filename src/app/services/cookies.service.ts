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
            return parseInt(this.cookieService.get('ppc'), 10);
        }
        return 1;
    }
    getPPS() {
        if (this.cookieService.check('pps')) {
            return parseInt(this.cookieService.get('pps'), 10);
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
}
