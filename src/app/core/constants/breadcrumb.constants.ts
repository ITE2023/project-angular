export const BREADCRUMB_CONFIG = [
  {
    id: 1,
    name: "breadcrumb.dashboard",
    icon: "dashboard",
    url: "/admin/dashboard",
    parentId: undefined,
  },
  {
    id: 2,
    name: "breadcrumb.wallet",
    url: "/admin/wallet-account",
    icon: "account_box",
    children: [
      {
        id: 4,
        name: "breadcrumb.detail",
        url: "/admin/wallet-account/detail",
        parentId: 2,
      },
    ],
  },
  {
    id: 5,
    name: "Báo cáo",
    url: "",
    children: [
      {
        id: 6,
        name: "Tổng hợp giao dịch",
        url: "/admin/bao-cao/tong-hop-giao-dich",
        parentId: 5,
      },
      {
        id: 7,
        name: "Phí dịch vụ",
        url: "/admin/bao-cao/phi-dich-vu",
        parentId: 5,
      },
    ],
  },
  {
    id: 30,
    name: "breadcrumb.profile",
    url: "/profile",
    icon: "account_box",
  },
  {
    id: 31,
    name: "breadcrumb.transaction",
    url: null,
    icon: "attach_money",
    children: [
      {
        id: 310,
        name: "left-menu.transaction.payment",
        url: "/admin/transaction-payment",
        parentId: 31,
        icon: "payment",
        children: [
          {
            id: 3100,
            name: "breadcrumb.detail",
            url: "/admin/transaction-payment/detail",
            parentId: 310,
          },
        ],
      },
      {
        id: 311,
        name: "left-menu.transaction.refund",
        url: "/admin/transaction-refund",
        parentId: 31,
        icon: "keyboard_return",
        children: [
          {
            id: 3110,
            name: "breadcrumb.detail",
            url: "/admin/transaction-refund/detail",
            parentId: 311,
          },
        ],
      },
    ],
  },

  {
    id: 40,
    name: "breadcrumb.risk",
    icon: "warning",
    url: null,
    children: [
      {
        id: 401,
        name: "left-menu.ruin-manager.restrict-wallet",
        url: "/admin/risks-blacklist/account",
        parentId: 40,
        icon: "account_balance_wallet",
      },
      {
        id: 402,
        name: "left-menu.ruin-manager.restrict-bank-card",
        url: "/admin/risks-blacklist/card",
        parentId: 40,
        icon: "credit_card",
      },
      {
        id: 403,
        name: "left-menu.ruin-manager.restrict-bin-card",
        url: "/admin/risks-blacklist/bin",
        parentId: 40,
        icon: "card_membership",
      },
      {
        id: 404,
        name: "left-menu.ruin-manager.restrict-ip",
        url: "/admin/risks-blacklist/ip",
        parentId: 40,
        icon: "perm_scan_wifi",
      },
      {
        id: 405,
        name: "left-menu.ruin-manager.restrict-mcc",
        url: "/admin/risks-blacklist/business",
        parentId: 40,
        icon: "remove_shopping_cart",
      },
      {
        id: 406,
        name: "left-menu.ruin-manager.suspicious-trans",
        url: "/admin/risks-blacklist/transaction",
        parentId: 40,
        icon: "money_off",
      },
    ],
  },

  {
    id: 44,
    name: "left-menu.report.title",
    icon: "insert_chart_outlined",
    url: null,
    children: [
      {
        id: 440,
        name: "breadcrumb.report.for-volatility",
        url: "/admin/report-volatility",
        parentId: 44,
        icon: "speaker_group",
      },
      {
        id: 441,
        name: "breadcrumb.report.for-merchant",
        url: "/admin/report-merchant",
        parentId: 44,
        icon: "shop",
      },
      {
        id: 442,
        name: "breadcrumb.report.for-agency",
        url: "/admin/report-agency",
        parentId: 44,
        icon: "domain",
      },
    ],
  },
  {
    id: 45,
    name: "statistic.button",
    icon: "bar_chart",
    url: "/admin/statistic",
  },

  // Ngan hang nha nuoc
  {
    id: 50,
    name: "breadcrumb.state-bank",
    icon: "account_balance",
    url: null,
    children: [
      {
        id: 5001,
        name: "left-menu.state-bank.wallet-balance",
        url: "/admin/state-bank/wallet-balance",
        parentId: 50,
        icon: "account_balance_wallet",
      },
      {
        id: 5002,
        name: "left-menu.state-bank.guaranteed-balance",
        url: "/admin/state-bank/guaranteed-balance",
        parentId: 50,
        icon: "credit_card",
      },
      {
        id: 5003,
        name: "left-menu.state-bank.type-report",
        url: "/admin/state-bank/type-report",
        parentId: 50,
        icon: "assessment",
      },
      {
        id: 5004,
        name: "left-menu.state-bank.top-most",
        url: "/admin/state-bank/top-most",
        parentId: 50,
        icon: "broken_image",
      },
      {
        id: 5005,
        name: "left-menu.state-bank.top-highest",
        url: "/admin/state-bank/top-highest",
        parentId: 50,
        icon: "filter_hdr",
        children: [
          {
            id: 50050,
            name: "breadcrumb.detail",
            url: "/admin/state-bank/top-highest/detail",
            parentId: 5005,
          },
        ],
      },
      {
        id: 5006,
        name: "left-menu.state-bank.wallet-volatility",
        url: "/admin/state-bank/wallet-volatility",
        parentId: 50,
        icon: "trending_up",
      },
    ],
  },
];
