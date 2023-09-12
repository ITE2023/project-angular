import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonConstants } from '@core/constants';

@Component({
  selector: 'ite-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() page: number;
  @Input() total: number;
  @Input() pageSize: number;
  @Input() loading: boolean;
  @Input() pageSizeConfig: [];
  public totalPages: number;
  public pageArrays: any[];
  public pageSizes = CommonConstants.DEFAULT_PAGE_SIZE_OPTION;
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() pageSizeChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnChanges() {
    this.setPageArray();
  }

  ngOnInit(): void {
    this.pageSizes = (this.pageSizeConfig) ? this.pageSizeConfig : CommonConstants.DEFAULT_PAGE_SIZE_OPTION;
    this.setPageArray();
  }

  setPageArray() {
    if (this.total) {
      this.totalPages = Math.ceil(this.total.valueOf() / this.pageSize.valueOf());
      switch (this.totalPages) {
        case 1: {
          this.pageArrays = [{ value: 1, active: true }];
          break;
        }
        case 2: {
          this.pageArrays = [{ value: 1, active: true }, { value: 2, active: true }];
          break;
        }
        case 3: {
          this.pageArrays = [{ value: 1, active: true }, { value: 2, active: true }, { value: 3, active: true }];
          break;
        }
        case 4: {
          this.pageArrays = [{ value: 1, active: true }, { value: 2, active: true }, { value: 3, active: true }, { value: 4, active: true }];
          break;
        }
        case 5: {
          this.pageArrays = [{ value: 1, active: true }, { value: 2, active: true }, { value: 3, active: true }, { value: 4, active: true }, { value: 5, active: true }];
          break;
        }
        default: {
          switch (this.page) {
            case 1: {
              this.pageArrays = [{ value: 1, active: true }, { value: 2, active: true }, { value: 3, active: true }, { value: '...', active: false }, { value: this.totalPages, active: true }];
              break;
            }
            case 2: {
              this.pageArrays = [{ value: 1, active: true }, { value: 2, active: true }, { value: 3, active: true }, { value: '...', active: false }, { value: this.totalPages, active: true }];
              break;
            }
            case 3: {
              this.pageArrays = [{ value: 1, active: true }, { value: 2, active: true }, { value: 3, active: true }, { value: 4, active: true }, { value: '...', active: false }, { value: this.totalPages, active: true }];
              break;
            }
            case this.totalPages.valueOf() - 2: {
              this.pageArrays = [{ value: 1, active: true }, { value: '...', active: false }, { value: this.totalPages.valueOf() - 3, active: true }, { value: this.totalPages.valueOf() - 2, active: true }, { value: this.totalPages.valueOf() - 1, active: true }, { value: this.totalPages, active: true }];
              break;
            }
            case this.totalPages.valueOf() - 1: {
              this.pageArrays = [{ value: 1, active: true }, { value: '...', active: false }, { value: this.totalPages.valueOf() - 2, active: true }, { value: this.totalPages.valueOf() - 1, active: true }, { value: this.totalPages, active: true }];
              break;
            }
            case this.totalPages: {
              this.pageArrays = [{ value: 1, active: true }, { value: '...', active: false }, { value: this.totalPages.valueOf() - 2, active: true }, { value: this.totalPages.valueOf() - 1, active: true }, { value: this.totalPages, active: true }];
              break;
            }
            default: {
              this.pageArrays = [{ value: 1, active: true }, { value: '...', active: false }, { value: this.page.valueOf() - 1, active: true }, { value: this.page, active: true }, { value: this.page.valueOf() + 1, active: true }, { value: '...', active: false }, { value: this.totalPages, active: true }];
              break;
            }
          }
          break;
        }
      }
    }
  }

  changePage(item) {
    if (item.active) {
      if (item.value !== this.page) {
        this.pageChange.emit(item.value);
      }
    }
  }

  move(action: string) {
    if (action === 'previous') {
      this.pageChange.emit((this.page > 1) ? this.page.valueOf() - 1 : 1);
    } else if (action === 'next') {
      this.pageChange.emit((this.page < this.totalPages) ? this.page.valueOf() + 1 : this.totalPages);
    } else if (action === 'first') {
      this.pageChange.emit(1);
    } else if (action === 'last') {
      this.pageChange.emit(this.totalPages);
    }
  }

  onPageSizeChange(event) {
    this.pageSizeChange.emit(event.value);
  }
}

