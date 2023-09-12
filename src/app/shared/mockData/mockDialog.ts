import { of } from 'rxjs';

export class MatDialogMock {
    open() {
        return {
            componentInstance: {

            },
            afterClosed: () => {
                return of(true)
            }
        };
    }
    closeAll() { }
}
