import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { BackgroundLoader } from '../../services';
import { ConfigService } from '@core/services/configuration/configuration.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    skipLoader = '';
    //#region Properties

    // tslint:disable-next-line:variable-name
    private _madeRequests: number;

    // Hide loader timeout.
    // tslint:disable-next-line:variable-name
    private _hideLoaderTimeout: number;

    //#endregion

    //#region Constructor

    constructor(private loader: BackgroundLoader, private config: ConfigService) {
        this._madeRequests = 0;
        this.skipLoader =
          this.config &&
          this.config.config &&
          this.config.config.API_ENDPOINTS &&
          this.config.config.API_ENDPOINTS.SKIP_LOADER
            ? this.config.config.API_ENDPOINTS.SKIP_LOADER
            : '';
    }

    //#endregion

    //#region Methods

    public intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // This is a silent http request.
        // Ignore it.
        // if (httpRequest.headers.has(this.skipLoader)) {
        //     const clone = httpRequest.clone({ headers: httpRequest.headers.delete(this.skipLoader) });
        //     return next.handle(clone);
        // }

        // Increase the request counter by 1.
        this._madeRequests++;

        // Cancel hide loader timeout.
        clearTimeout(this._hideLoaderTimeout);

        if (this._madeRequests > 0 && !this.loader.isShowing) {
            this.loader.show();
        }
        return next
            .handle(httpRequest)
            .pipe(
                finalize(() => {
                    this.hideLoader();
                })
            );
    }

    // Hide the loading dialog.
    protected hideLoader(): void {
        this._madeRequests--;

        // There are still some requests are running.
        if (this._madeRequests > 0) {
            return;
        }


        if (this.loader.isAlwaysShow) {
            return;
        }

        // Loader is not being shown.
        if (!this.loader.isShowing) {
            return;
        }

        clearTimeout(this._hideLoaderTimeout);
        this._hideLoaderTimeout = window.setTimeout(() => {
            // Hide the loader & reset the counter.
            this.loader.hide();
            this._madeRequests = 0;
        }, 250);
    }

    //#endregion
}
