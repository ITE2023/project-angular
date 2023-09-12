export class Utils {
  public static isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }

  public static isDate(obj: any): boolean {

    return true;
    // return !/Invalid|NaN/.test(new Date(obj).toString());
  }

  public static isNotNull(obj: any): boolean {
    return (obj !== undefined) && (obj !== null);
  }

  public static isNull(obj): boolean {
    return !this.isNotNull(obj);
  }

  public static lengthGreaterThanZero(obj): boolean {
    return (obj !== undefined)
      && (obj !== null)
      && (obj.length > 0);
  }

  public static checkValidDecimal(decimal) {
    let result = true;
    if (!decimal) {
      return true;
    }
    const arr = decimal.split('.');
    if (arr.length === 1) {
      return true;
    }
    if (arr.length > 2) {
      result = false;
    }
    if (!arr[0] || !arr[1]) {
      result = false;
    }
    return result;
  }

  public static removeComma(amount: string): string {
    if (!amount) {
      return '';
    }
    return amount.replace(/,/g, '');
  }
  public static count(originalString: string, searchString: string): number {
    return originalString.split(searchString).length - 1;
  }
}


