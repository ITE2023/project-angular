export const CommonConstants = {
  URL_PATTERN: "https?://.+",
  EMAIL_PATTERN: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}",
  PHONE_PATTERN: "(09|\\+84|03[0-9])+([0-9]{7,10})",
  EMPTY_GUID: "00000000-0000-0000-0000-000000000000",
  YES: "Yes",
  NO: "No",
  NA: "Not Available",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DATE_TIME_FORMAT: "dd MMM yyyy, hh:mm a",
  DATE_TIME_FORMAT_STANDARD: "dd MMM yyyy  h:mm a",
  DATE_TIME_FORMAT_FULL: "dd/MM/yyyy  hh:mm:ss",
  DATE_TIME_FORMAT_LIST: "dd/MM/yyyy  hh:mm",
  DATE_FORMAT: "dd/MM/yyyy",
  DATE_FORMAT_DATEPICKER: "DD/MM/YYYY",
  MONTH_FORMAT_DATEPICKER: "MM/YYYY",
  UAUC_INSIGHT_DATE_FORMAT_STANDARD: "d MMM yyyy",
  UAUC_INSIGHT_DATE_TIME_FORMAT_STANDARD: "d MMM yyyy HH:mm",
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE_SIZE_5: 5,
  DEFAULT_PAGE_INDEX: 1,
  DEFAULT_PAGE_SIZE_OPTION: [10, 25, 50, 100],
  VIETNAMESE_CURRENCY: "VNĐ",
  EXPIRE_TIME_CONFIG_IN_MINUTES: 180,
  ACCOUNT_ACTIVE_STATUS_CONST: "1004",
  ACCOUNT_LOCKED_STATUS_CONST: "1005",
  MAX_FILE_SIZE: 2097152,
};
export const CommonErrorCode = {
  REQUIRED: "error.require",
  EMAIL_PATTERN: "error.email-pattern",
  PHONE_PATTERN: "error.phone-pattern",
  NOT_FORMATTED: "error.not-formatted",
  MINLENGTH_6: "error.minlength-6",
  MAXLENGTH: "error.maxlength",
  INVALID_FORMAT: "error.invalid-format",
  INVALID_URL: "error.invalid-format-url",
  INVALID_FORMAT_IP: "error.invalid-format-ip",
  NOT_MATCH: "error.not_match",
};
export const formRules = {
  fullName:
    '^[^\\s|\\~|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|\\+|\\=|\\[|\\{|\\]|\\}|\\||\\\\|\\<|\\,|\\.|\\>|\\?|\\/|\\""|\\;|\\:]+(\\s{1}[^\\s|\\~|\\!|\\@|\\#|\\$|\\%|\\^|\\&|\\*|\\(|\\)|\\+|\\=|\\[|\\{|\\]|\\}|\\||\\\\|\\<|\\,|\\.|\\>|\\?|\\/|\\""|\\;|\\:]+)*$',
  nonEmpty: "[a-zA-Z0-9]+([]?[a-zA-Z0-9])*$",
  usernameMin: 5,
  passwordMin: 6,
  phone: "(09|\\+84|03[0-9])+([0-9]{7,10})",
};
export const langSettings = [
  {
    lang_code: "vi",
    lang_name: "TIẾNG VIỆT",
    flag: "assets/images/flag/Vietnam.png",
  },
  {
    lang_code: "en",
    lang_name: "ENGLISH",
    flag: "assets/images/flag/United-Kingdom.png",
  },
];
export const EXPORT = {
  page: 1,
  size: 10000000,
};

// export const PHONE_REGEX = /^[0][0-9]{9,10}$/;
export const PHONE_REGEX =
  /^(([+]84|0|84)(24|28)(\d{8})|([+]84|0|84)(296|216|211|270|207|294|273|234|237|208|227|276|212|299|233|203|255|235|232|257|210|259|238|229|228|272|214|205|263|213|260|297|258|221|218|293|225|220|239|226|219|269|277|251|215|261|262|236|206|292|290|252|271|274|256|275|222|291|204|209|254)(\d{7})|([+]84|0|84)(86|96|97|98|32|33|34|35|36|37|38|39|89|90|93|70|79|77|76|78|88|91|94|83|84|85|81|82|92|56|58)(\d{7}))$/;
export const TAX_CODE = /^\d{10}(\d{3})?$/;

// email format based on RFC 2822
export const EMAIL_REGEX =
  /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/;

export const DATE_CONFIG = {
  dateInputFormat: "DD/MM/YYYY",
  isAnimated: true,
  customTodayClass: "custom-today-class",
  adaptivePosition: true,
  showWeekNumbers: false,
  containerClass: "custom-datepicker",
};

export const MONTH_CONFIG = {
  dateInputFormat: "MM/YYYY",
  isAnimated: true,
  customTodayClass: "custom-today-class",
  adaptivePosition: true,
  showWeekNumbers: false,
  containerClass: "custom-datepicker",
};

export const YEAR_CONFIG = {
  dateInputFormat: "YYYY",
  isAnimated: true,
  customTodayClass: "custom-today-class",
  adaptivePosition: true,
  showWeekNumbers: false,
  containerClass: "custom-datepicker",
};

export const ID_NUMBER = /^[0-9]{9}$|^[0-9]{12}$/;
export const USERNAME_REGEX = /^[A-Za-z0-9_.\-@]*$/;
export const ACCOUNT_NUMBER = /^([0-9]|711A)[0-9]*$/;
export const URL =
  /^http(s)?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const IP_REGEX =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
export const BANK_NUMBER =
  /(^(9704|62|81|3528|3529|51|52|53|54|55|4|34|37)[0-9]*$)|(^35[3-8][0-9]*$)/;
export const TEXT_NUMBER = /^[A-Za-z0-9]*$/;
export const BIN_CODE = /^[0-9]{1,8}(,[0-9]{1,8})*$/;

export const SESSION_TIME = 120;
export const SIGNATURE_KEY = "ad64f33fc648302731e80bf1bec517f6";
export const LOGIN_PASSWORD_HASHTAG = "BD92B044F961C09164CD1F6B7837992E";
export const BROWSER_INFO = {
  LOCATION: {
    LONG: "location.long",
    LAT: " location.lat",
  },
  OS: {
    NAME: "os.name",
    VERSION: "os.version",
  },
  BROWSER: {
    NAME: "browser.name",
    VERSION: "browser.version",
  },
  IP_ADD: "ip",
};
export const DefaultAvatar = "/assets/images/default-user.png";

export const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
