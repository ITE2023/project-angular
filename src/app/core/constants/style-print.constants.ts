// for print pdf

export const linkCss = `<style>
@media print {
  @page {
    size: landscape;
    margin: 10mm 10mm 10mm 10mm;
  }
}
.font-weight-bold {
  font-weight: bold;
}
.fs-18 {
    font-size: 18px;
}
.management-table tbody td {
  page-break-before: always;
  word-break: break-word;
  border: 1px solid #000000;
  -ms-word-break: break-all;
}
.management-table tfoot td {
  word-break: break-word;
  border: 1px solid #000000;
  font-weight: bold;
  font-size: 20px;
}
.common-management .management-table th, .common-management .management-table td {
  padding: 12px 8px !important;
  vertical-align: top;
}
.table {
  width: 100% !important;
}
table {
  border-collapse: collapse;
}
table thead, table tbody {
  font-size: 20px;
}
.management-table thead th {
  vertical-align: top;
  border: 1px solid #000000;
  background: #f7f7f7;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.footer-print {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  font-size: 18px;
}
.date-print {
  display: flex;
  justify-content: space-between;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.mb-1 {
  margin-bottom: 5px;
}
.mt-4 {
  margin-top: 20px;
}
.title-print-wrap {
  display: flex;
  justify-content: center;
}
.title-print {
  display: flex;
  width: 700px;
  text-align: center;
  justify-content: center;
}
.from-date-print {
  display: flex;
  justify-content: center;
}
.fs-24 {
  font-size: 24px;
}
.unit-print {
  display: flex;
  justify-content: flex-end;
  margin-top:15px;
}
.custom-for-table-report {
  min-width: min-content;
}
.w-100 {
 width: 100%
}
.wts-130 {
min-width: 100px !important;
}
.print-font-weight-bold {
  font-weight: bold;
}
.font-italic {
  font-style: italic;
}
</style>`;
