import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { linkCss } from "@core/constants";
import { saveAs as importedSaveAs } from "file-saver";
import { ConfigService } from "@core/services/configuration/configuration.service";
import * as fs from "file-saver";
import * as moment from "moment";
import { Workbook } from "exceljs/dist/exceljs.min.js";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  baseUrl = "";
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private translate: TranslateService
  ) {
    this.baseUrl =
      (this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : "") + "/";
  }

  public getListStatusData(): Observable<any> {
    const body = {
      ip_adress: "0.0.0.0",
    };
    return this.http.post(`${this.baseUrl}transaction-status`, body);
  }

  public GetListBoxData(requestData: string): Observable<any> {
    const body = {
      key: requestData,
    };
    return this.http.post(`${this.baseUrl}common/listbox`, body);
  }

  public GetListBoxDataV2(requestData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}common/listbox`, requestData);
  }

  public getFileFromUrl(requestUrl: string): Observable<any> {
    return this.http.get(requestUrl, { responseType: "arraybuffer" });
  }

  public convertFromArrayBufferToFile(
    arraybuffer: ArrayBuffer,
    fileType: string,
    fileName: string
  ): File {
    const extent = this.getExtensionFile(fileName);
    const finalext = this.getfileTypeFromExtension(extent);
    const blob = new Blob([arraybuffer], { type: `${fileType}/${finalext}` });
    blob["name"] = fileName;
    blob["lastModifiedDate"] = new Date();
    let file = Object.assign(blob);
    return file;
  }
  public getExtensionFile(fileName: string): string {
    return fileName?.split(".").pop();
  }
  getfileTypeFromExtension(extend: string) {
    let result = extend;
    if (extend?.toLowerCase().trim() === "doc") {
      result = "msword";
    }
    if (extend?.toLowerCase().trim() === "docx") {
      result = "vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    return result;
  }
  public getLocationData(key: string, id?: number): Observable<any> {
    const body: any = {
      key,
    };
    if (key !== "province" && id) {
      body.id = id;
    }
    return this.http.post(`${this.baseUrl}common/address`, body);
  }
  public getDocumentFile(url: string): Observable<any> {
    return this.http.get(url, { responseType: "blob" });
  }
  public getFileNameFromUrl(url: string) {
    return url && url !== "" ? url.substring(url.lastIndexOf("/") + 1) : "";
  }

  public downloadFileFromUrl(url: string, file_name?: string) {
    const fileName = file_name ? file_name : this.getFileNameFromUrl(url);
    this.getDocumentFile(url).subscribe((val: any) => {
      importedSaveAs(val, fileName);
      return true;
    });
  }
  public removeAccents(str, isUppercase?) {
    let r = str;
    r = r.replace(new RegExp("[áàảãạăắằẳẵặâấầẩẫậ]", "g"), "a");
    r = r.replace(new RegExp("[èéẻẽẹêềếểễệ]", "g"), "e");
    r = r.replace(new RegExp("[ìíỉĩị]", "g"), "i");
    r = r.replace(new RegExp("[òóỏõọôồốổỗộơờớởỡợ]", "g"), "o");
    r = r.replace(new RegExp("[ùúủũụưừứửữự]", "g"), "u");
    r = r.replace(new RegExp("[ỳýỷỹỵ]", "g"), "y");
    r = r.replace(new RegExp("[đ]", "g"), "d");
    r = r.replace(new RegExp("[ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ]", "g"), "A");
    r = r.replace(new RegExp("[ÈÉẺẼẸÊỀẾỂỄỆ]", "g"), "E");
    r = r.replace(new RegExp("[ÌÍỈĨỊ]", "g"), "I");
    r = r.replace(new RegExp("[ÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢ]", "g"), "O");
    r = r.replace(new RegExp("[ÙÚỦŨỤƯỪỨỬỮỰ]", "g"), "U");
    r = r.replace(new RegExp("[ỲÝỶỸỴ]", "g"), "Y");
    r = r.replace(new RegExp("[Đ]", "g"), "D");
    return isUppercase ? r.toUpperCase() : r;
  }

  public searchLike(str) {
    if (str) {
      let r = str.toLowerCase();
      r = r.replace(new RegExp("[áàảãạ]", "g"), "a");
      r = r.replace(new RegExp("[ắằẳẵặ]", "g"), "ă");
      r = r.replace(new RegExp("[ấầẩẫậ]", "g"), "â");
      r = r.replace(new RegExp("[èéẻẽẹ]", "g"), "e");
      r = r.replace(new RegExp("[ềếểễệ]", "g"), "ê");
      r = r.replace(new RegExp("[ìíỉĩị]", "g"), "i");
      r = r.replace(new RegExp("[òóỏõọ]", "g"), "o");
      r = r.replace(new RegExp("[ồốổỗộ]", "g"), "ô");
      r = r.replace(new RegExp("[ờớởỡợ]", "g"), "ơ");
      r = r.replace(new RegExp("[ùúủũụ]", "g"), "u");
      r = r.replace(new RegExp("[ừứửữự]", "g"), "ư");
      r = r.replace(new RegExp("[ỳýỷỹỵ]", "g"), "y");
      return r;
    }
  }

  public searchLikeNoAccent(str) {
    if (str) {
      let r = str.toLowerCase();
      r = r.replace(new RegExp("[áàảãạắằẳẵặấầẩẫậ]", "g"), "a");
      r = r.replace(new RegExp("[èéẻẽẹềếểễệ]", "g"), "e");
      r = r.replace(new RegExp("[ìíỉĩị]", "g"), "i");
      r = r.replace(new RegExp("[òóỏõọồốổỗộờớởỡợ]", "g"), "o");
      r = r.replace(new RegExp("[ùúủũụừứửữự]", "g"), "u");
      r = r.replace(new RegExp("[ỳýỷỹỵ]", "g"), "y");
      r = r.replace(new RegExp("[dđ]", "g"), "d");
      return r;
    }
  }

  public savePdf(data: any) {
    const date = moment().format("DD/MM/YYYY");
    const headReport = `<div class="fs-18">
        <p class="font-weight-bold">${this.translate.instant(
          "report.excel.template"
        )} ${data.tableName}</p>
        <p class="mb-0 font-weight-bold">${this.translate.instant(
          "report.excel.company"
        )}</p>
        <div class="d-flex justify-content-between date-print">
          <span>${this.translate.instant("report.excel.report-code")}: .../${
      data.reportCode
    }</span>
          <span class="font-italic">${this.translate.instant(
            "report.excel.created-time"
          )}: ${date}</span>
        </div>
        <div>${data.reportType}: ${
      data.nameUnit ?? this.translate.instant("report.excel.all")
    }</div>
        <div>${
          data.showTransactionType
            ? this.translate.instant("report.excel.trans-type-title") +
              ": " +
              this.translate.instant("report.excel.trans-type")
            : ""
        }</div>
        <div class="w-100 mt-4 title-print-wrap font-weight-bold">
          <span class="title-print d-flex justify-content-center fs-24">${
            data.titleReport
          }</span>
        </div>
        <div class="from-date-print fs-18 font-italic">${this.translate.instant(
          "report.excel.time"
        )}: ${this.translate.instant("report.excel.from")} ${
      data.fromDate
    } ${this.translate.instant("report.excel.to")} ${data.toDate}</div>
        <div class="unit-print font-italic mb-1">
          <span>${this.translate.instant("report.excel.unit")}: VND </span>
        </div>
      </div>`;

    const footerPdf = `<div class="fs-18 footer-print d-flex justify-content-around mt-4 font-weight-bold">
        <span>${this.translate.instant("report.excel.creator")}</span>
        <span>${this.translate.instant("report.excel.controller-1")}</span>
        <span>${this.translate.instant("report.excel.controller-2")}</span>
      </div>`;

    const parent = document.createElement("div");
    const divPrint = data.htmlParent.nativeElement.innerHTML;
    parent.innerHTML = `${headReport}${divPrint}${footerPdf}`;
    const WindowObject = window.open(
      "",
      "PrintWindow",
      "width=850,height=750,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes"
    );
    const htmlData = `<html><head>${linkCss}</head><body>${parent.innerHTML}</body></html>`;
    WindowObject.document.writeln(htmlData);
    WindowObject.document.close();
    WindowObject.focus();
    WindowObject.print();
    setTimeout(() => {
      WindowObject.close();
    }, 0.5);
  }

  public specialExport(obj) {
    let isShowTotal = obj.isShowTotal !== undefined ? obj.isShowTotal : true; // nếu true thì show dòng Tổng cộng của mỗi nhóm dữ liệu
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(obj.nameReport);

    // mẫu báo cáo
    const line1 = worksheet.addRow([
      this.translate.instant("report.excel.template") + ` ${obj.nameReport}`,
    ]);
    line1.font = { bold: true, size: 13 };

    // tên công ty
    const line2 = worksheet.addRow([
      "",
      this.translate.instant("report.excel.company"),
    ]);
    line2.font = { bold: true, size: 13 };

    // số báo cáo + ngày lập biểu
    const createDay = moment().format("DD/MM/YYYY");
    const line3 = worksheet.addRow([
      "",
      this.translate.instant("report.excel.report-code") + ": ",
      ".../" + obj.reportCode,
      "",
      "",
      "",
      "",
      "",
      this.translate.instant("report.excel.created-time") + ": ",
      createDay,
    ]);
    line3.font = { size: 13 };

    // tên TCPH/ĐVCNTT...
    const line4 = worksheet.addRow([
      "",
      obj.reportType + ": ",
      obj.nameUnit ?? this.translate.instant("report.excel.all"),
    ]);
    line4.font = { size: 13 };

    // loại giao dịch
    if (obj.showTransactionType) {
      const line4a = worksheet.addRow([
        "",
        this.translate.instant("report.excel.trans-type-title") + ": ",
        this.translate.instant("report.excel.trans-type"),
      ]);
      line4a.font = { size: 13 };
    } else {
      worksheet.addRow([]);
    }
    worksheet.addRow([]);

    // tên báo cáo
    const line5 = worksheet.addRow(["", "", obj.reportTitle]);
    line5.font = { size: 15, bold: true };
    line5.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };

    // thời gian
    const line6 = worksheet.addRow([
      "",
      "",
      "",
      this.translate.instant("report.excel.time") +
        `: ` +
        this.translate.instant("report.excel.from") +
        ` ${obj.fromDate} ` +
        this.translate.instant("report.excel.to") +
        ` ${obj.toDate}`,
    ]);
    line6.font = { size: 13, italic: true };
    line6.alignment = {
      horizontal: "center",
    };
    worksheet.addRow([]);

    // đơn vị tính
    const line7 = worksheet.addRow([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      this.translate.instant("report.excel.unit") + ": ",
      "VND",
    ]);
    line7.font = { size: 13, italic: true };
    worksheet.addRow([]);

    worksheet.mergeCells("C3:D3");
    worksheet.mergeCells("C7:H7");
    worksheet.mergeCells("D8:G8");

    // tiêu đề
    const headerRow = worksheet.addRow(obj.header);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.font = { size: 13, bold: true };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });

    // công thức tính
    if (obj.formula) {
      const formula = worksheet.addRow(obj.formula);
      formula.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center",
          wrapText: true,
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.font = { size: 13 };
      });
    }

    // dữ liệu bảng
    const exportData = [];
    if (obj.data.table_data) {
      if (obj.special) {
        obj.data.table_data.forEach((e, i) => {
          e.value.forEach((element, j) => {
            // if (j === e.value.length - 1 && isShowTotal) {
            //   element[0] = this.translate.instant('report.total')
            // }
            e.merchant_id
              ? element.unshift(
                  i + 1,
                  e.merchant_name ||
                    e.issuer_name ||
                    e.payment_method ||
                    e.payment_method_name ||
                    e.agency_name,
                  e.merchant_id
                )
              : element.unshift(
                  i + 1,
                  e.merchant_name ||
                    e.issuer_name ||
                    e.payment_method ||
                    e.payment_method_name ||
                    e.agency_name
                );
            exportData.push(element);
          });
        });
      } else {
        obj.data.table_data?.forEach((e, i) => {
          e?.unshift(i + 1);
          exportData.push(e);
        });
      }
    } else {
      exportData.push([this.translate.instant("commonAction.noData")]);
    }
    exportData.forEach((row) => {
      const dataRow = worksheet.addRow(row);
      dataRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = {
          vertical: "middle",
          wrapText: true,
        };
        cell.font = { size: 13 };
      });
    });

    // total
    if (obj.total) {
      const total = worksheet.addRow(obj.total);
      total.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.font = { size: 13, bold: true };
      });
    }

    // not found
    if (!obj.data.table_data) {
      const rowEx = worksheet.getRow(10);
      const positionGetItem = rowEx.worksheet.model.rows[9].cells.length - 1;
      const startHeader = rowEx.worksheet.model.rows[9].cells[0].address;
      const endHeader =
        rowEx.worksheet.model.rows[9].cells[positionGetItem].address;
      const nameColumnStart =
        startHeader.substring(0, 1) + (Number(startHeader.slice(1)) + 1);
      const nameColumnEnd =
        endHeader.substring(0, 1) + (Number(endHeader.slice(1)) + 1);
      worksheet.mergeCells(`${nameColumnStart}:${nameColumnEnd}`);

      // const footerRow = worksheet.addRow([
      //   this.getTranslation('commonAction.total') + ': ' + data.total_record
      // ]);
      // footerRow.font = { bold: true };
    }

    // merge row for table
    if (obj.special) {
      const abbb = worksheet.getColumn("A");
      const abbbLength = abbb.values.length;
      let excelArray = [];
      for (let i = 0; i < abbbLength; i++) {
        if (
          excelArray.indexOf(abbb.values[i]) === -1 &&
          abbb.values[i] !== "" &&
          abbb.values[i] !== undefined &&
          abbb.values[i] === this.translate.instant("report.issuer.no")
        ) {
          excelArray = abbb.values.slice(i);
        }
      }
      const arrTest = Array.from(new Set(excelArray));
      const map = abbb.values.reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

      for (let index = 1; index < arrTest.length; index++) {
        const psStart = abbb.values.indexOf(arrTest[index]);
        const psEnd = map[arrTest[index]];
        if (psStart > 10) {
          worksheet.mergeCells(`A${psStart}:A${psStart + psEnd - 1}`);
          worksheet.mergeCells(`B${psStart}:B${psStart + psEnd - 1}`);
        }
      }
    }

    // người lập
    worksheet.addRow([]);
    const lastFooter = worksheet.addRow([
      "",
      "",
      "",
      this.translate.instant("report.excel.creator"),
      "",
      this.translate.instant("report.excel.controller-1"),
      "",
      this.translate.instant("report.excel.controller-2"),
    ]);
    lastFooter.font = { bold: true, size: 13 };

    worksheet.columns?.forEach(function (column, i) {
      column.width = 20;
    });

    // Generate excel file with given name
    const date = moment().format("DDMMYYhhmm");
    workbook.xlsx.writeBuffer().then((res) => {
      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, obj.nameReport + "_" + date + ".xlsx");
    });
  }

  // hiển thị thông tin có thể multi language
  // Ex: "|12| Mum Shop |13|. |7|. "
  multiLangData(str) {
    if (str) {
      let arr = str.trim().split("|");
      arr = arr.filter((x) => !isNaN(x) && x !== "");
      arr.forEach((e) => {
        const from = "|" + e + "|";
        const to = this.translate.instant("notification." + e);
        str = str.replace(from, to);
      });
    }
    return str;
  }
}
