import { Router, NavigationEnd } from '@angular/router';

export class RouteHelper {


    static GetPreviousUrl(router: Router) {
        let previousUrl: string;
        let currentUrl: string;
        currentUrl = router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                previousUrl = currentUrl;
                currentUrl = event.url;
            }
        });
        return previousUrl;
    }

}
