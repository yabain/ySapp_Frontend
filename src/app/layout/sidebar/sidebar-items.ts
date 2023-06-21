import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: []
  },
  {
    path: 'dashboard/home',
    title: 'home',
    icon: 'monitor',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: 'contact',
    title: 'contact',
    icon: 'users',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '',
    title: 'message',
    icon: 'mail',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      // {
      //   path: '/message/compose',
      //   title: 'compose-to-user',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   submenu: []
      // },
      {
        path: '/message/compose-to-group',
        title: 'compose-to-group',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/message/calendar',
        title: 'MENUITEMS.CALENDAR.TEXT',
        icon: '',
        class: 'ml-menu2',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/message/preset-msg',
        title: 'preloadMsg',
        icon: '',
        class: 'ml-menu2',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/message/web-chat',
        title: 'Web Chat',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      // {
      //   path: '/',
      //   title: 'auto-send',
      //   icon: '',
      //   class: 'ml-sub-menu',
      //   groupTitle: false,
      //   submenu: [
      //     {
      //       path: 'calendar',
      //       title: 'MENUITEMS.CALENDAR.TEXT',
      //       icon: '',
      //       class: 'ml-menu2',
      //       groupTitle: false,
      //       submenu: []
      //     },
      //     {
      //       path: '/message/read-mail',
      //       title: 'preloaderMsg',
      //       icon: '',
      //       class: 'ml-menu2',
      //       groupTitle: false,
      //       submenu: []
      //     },
      //   ]
      // },
    ]
  },
  {
    path: '',
    title: 'MENUITEMS.APPS.TEXT',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: []
  },
  {
    path: '/apps/contact-grid',
    title: 'organisations',
    icon: 'command',
    class: '',
    groupTitle: false,
    submenu: [
    ]
  },
  {
    path: '/extra-pages/profile',
    title: 'profile',
    icon: 'user',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/',
    title: 'support',
    icon: 'command',
    class: '',
    groupTitle: false,
    submenu: [
    ]
  },
  // {
  //   path: 'task',
  //   title: 'MENUITEMS.TASK.TEXT',
  //   icon: 'check-circle',
  //   class: '',
  //   groupTitle: false,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'MENUITEMS.MORE-APPS.TEXT',
  //   icon: 'command',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/apps/chat',
  //       title: 'MENUITEMS.MORE-APPS.LIST.CHAT',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/apps/dragdrop',
  //       title: 'MENUITEMS.MORE-APPS.LIST.DRAG-DROP',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/apps/contact-grid',
  //       title: 'MENUITEMS.MORE-APPS.LIST.CONTACT-GRID',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/apps/support',
  //       title: 'MENUITEMS.MORE-APPS.LIST.SUPPORT',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'MENUITEMS.COMPONENTS.TEXT',
  //   icon: '',
  //   class: '',
  //   groupTitle: true,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'MENUITEMS.WIDGETS.TEXT',
  //   icon: 'briefcase',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/widget/chart-widget',
  //       title: 'MENUITEMS.WIDGETS.LIST.CHART-WIDGET',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/widget/data-widget',
  //       title: 'MENUITEMS.WIDGETS.LIST.DATA-WIDGET',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'MENUITEMS.FORMS.TEXT',
  //   icon: 'layout',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/forms/form-controls',
  //       title: 'MENUITEMS.FORMS.LIST.CONTROLS',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/forms/advance-controls',
  //       title: 'MENUITEMS.FORMS.LIST.ADVANCE',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/forms/form-example',
  //       title: 'MENUITEMS.FORMS.LIST.EXAMPLE',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/forms/form-validation',
  //       title: 'MENUITEMS.FORMS.LIST.VALIDATION',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/forms/wizard',
  //       title: 'MENUITEMS.FORMS.LIST.WIZARD',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/forms/editors',
  //       title: 'MENUITEMS.FORMS.LIST.EDITORS',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'MENUITEMS.TABLES.TEXT',
  //   icon: 'grid',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/tables/basic-tables',
  //       title: 'MENUITEMS.TABLES.LIST.BASIC',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/tables/material-tables',
  //       title: 'MENUITEMS.TABLES.LIST.MATERIAL',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/tables/ngx-datatable',
  //       title: 'MENUITEMS.TABLES.LIST.NGX-DATATABLE',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'User Interface (UI)',
  //   icon: 'copy',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/ui/alerts',
  //       title: 'Alerts',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/badges',
  //       title: 'Badges',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/chips',
  //       title: 'Chips',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/modal',
  //       title: 'Modal',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/buttons',
  //       title: 'Buttons',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/expansion-panel',
  //       title: 'Expansion Panel',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/bottom-sheet',
  //       title: 'Bottom Sheet',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/dialogs',
  //       title: 'Dialogs',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/cards',
  //       title: 'Cards',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/labels',
  //       title: 'Labels',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/list-group',
  //       title: 'List Group',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/snackbar',
  //       title: 'Snackbar',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/preloaders',
  //       title: 'Preloaders',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/progressbars',
  //       title: 'Progress Bars',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/tabs',
  //       title: 'Tabs',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/typography',
  //       title: 'Typography',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/ui/helper-classes',
  //       title: 'Helper Classes',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Medias',
  //   icon: 'image',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/media/gallery',
  //       title: 'Image Gallery',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Charts',
  //   icon: 'pie-chart',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/charts/echart',
  //       title: 'Echart',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/charts/apex',
  //       title: 'Apex',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/charts/chartjs',
  //       title: 'ChartJS',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/charts/ngx-charts',
  //       title: 'Ngx-Charts',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/charts/gauge',
  //       title: 'Gauge',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Timeline',
  //   icon: 'git-pull-request',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/timeline/timeline1',
  //       title: 'Timeline 1',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/timeline/timeline2',
  //       title: 'Timeline 2',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Icons',
  //   icon: 'feather',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/icons/material',
  //       title: 'Material Icons',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/icons/font-awesome',
  //       title: 'Font Awesome',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: '-- Pages',
  //   icon: '',
  //   class: '',
  //   groupTitle: true,
  //   submenu: []
  // },
  // {
  //   path: '',
  //   title: 'Authentication',
  //   icon: 'user-check',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/authentication/signin',
  //       title: 'Sign In',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/signup',
  //       title: 'Sign Up',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/forgot-password',
  //       title: 'Forgot Password',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/locked',
  //       title: 'Locked',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/page404',
  //       title: '404 - Not Found',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/authentication/page500',
  //       title: '500 - Server Error',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Extra Pages',
  //   icon: 'anchor',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/extra-pages/profile',
  //       title: 'Profile',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/extra-pages/pricing',
  //       title: 'Pricing',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/extra-pages/invoice',
  //       title: 'Invoice',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/extra-pages/faqs',
  //       title: 'Faqs',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/extra-pages/blank',
  //       title: 'Blank Page',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Maps',
  //   icon: 'map-pin',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/maps/google',
  //       title: 'Google Map',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'Multi level Menu',
  //   icon: 'chevrons-down',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   submenu: [
  //     {
  //       path: '/multilevel/first1',
  //       title: 'First',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     },
  //     {
  //       path: '/',
  //       title: 'Second',
  //       icon: '',
  //       class: 'ml-sub-menu',
  //       groupTitle: false,
  //       submenu: [
  //         {
  //           path: '/multilevel/secondlevel/second1',
  //           title: 'Second 1',
  //           icon: '',
  //           class: 'ml-menu2',
  //           groupTitle: false,
  //           submenu: []
  //         },
  //         {
  //           path: '/',
  //           title: 'Second 2',
  //           icon: '',
  //           class: 'ml-sub-menu2',
  //           groupTitle: false,
  //           submenu: [
  //             {
  //               path: '/multilevel/thirdlevel/third1',
  //               title: 'third 1',
  //               icon: '',
  //               class: 'ml-menu3',
  //               groupTitle: false,
  //               submenu: []
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       path: '/multilevel/first3',
  //       title: 'Third',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       submenu: []
  //     }
  //   ]
  // }
];
