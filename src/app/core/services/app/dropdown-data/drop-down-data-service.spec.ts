import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { AUTH_API_URL } from '@core/constants';
import { MockServiceStatus } from 'src/app/web/merchant-management/merchant-edit-dialogs/merchant-contract-info-edit/merchant-contract-info-edit.component.spec';
import { MockCityList } from 'src/app/shared/mockData/mockAgencyService';
import { DropdownDataService } from './drop-down-data.service';
import { ToastrModule } from 'ngx-toastr';



describe('Dropdown Service', () => {

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                // RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateModule,
                        useClass: TranslateFakeLoader,
                        deps: [HttpClient],
                    },
                }),
                // MaterialModule,
                ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: TranslateLoader,
                    useClass: MockTranslateLoader,
                },
                {
                    provide: TranslateService,
                    useClass: MockTranslateService,
                },
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                DropdownDataService

                // HttpTestingController
            ]
        });

    });

    it('should getlist with error',
        () => {
            let service = TestBed.get(DropdownDataService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
            const result = service.getDropdownData({ key: 'service_status' }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockServiceStatus
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockServiceStatus
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
});
