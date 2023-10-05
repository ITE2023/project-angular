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
    id: 52,
    name: "breadcrumb.manage-job-post",
    url: "/admin/job-post",
    icon: "list_alt",
    children: [
      {}
    ]
  },
];
