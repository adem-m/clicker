import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()

export class CookiesService {
    constructor(private cookieService: CookieService) {
    }
    getScore() {
        if (parseInt(this.cookieService.get('score'), 10) > 0) {
            return parseInt(this.cookieService.get('score'), 10);
        }
        return 0;
    }
    getPPC() {
        if (parseInt(this.cookieService.get('ppc'), 10) > 0) {
            return parseInt(this.cookieService.get('ppc'), 10);
        }
        return 1;
    }
    getPPS() {
        if (parseInt(this.cookieService.get('pps'), 10) > 0) {
            return parseInt(this.cookieService.get('pps'), 10);
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
}
