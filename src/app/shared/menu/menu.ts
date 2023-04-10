import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  // {
  //     id: 1,
  //     label: 'Home',
  //     link: '/',
  // },
  {
    id: 2,
    label: 'MENUITEMS.SHOP.TEXT',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.SHOP.LIST.Shoplayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.ShopGridLeftSidebar',
            link: '/shop/grid-ls',
            parentId: 4
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.ShopGridRightSidebar',
            link: '/shop/grid-rs',
            parentId: 4
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.ShopGridFiltersonTop',
            link: '/shop/grid-ft',
            parentId: 4
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.ShopListLeftSidebar',
            link: '/shop/list-ls',
            parentId: 4
          },
          {
            id: 5,
            label: 'MENUITEMS.SHOP.LIST.ShopListRightSidebar',
            link: '/shop/list-rs',
            parentId: 4
          },
          {
            id: 6,
            label: 'MENUITEMS.SHOP.LIST.ShopListFiltersonTop',
            link: '/shop/list-ft',
            parentId: 4
          }
        ]
      },
      {
        id: 2,
        label: 'MENUITEMS.SHOP.LIST.Marketplace',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.SingleItemPage',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/single',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.VendorPage',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/vendor',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.Cart',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/cart',
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.Checkout',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/checkout',
          }
        ]
      },
      {
        id: 3,
        label: 'MENUITEMS.SHOP.LIST.Grocerystore',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.ProductCatalog',
            link: '/grocery/product-catalog',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.SingleProductPage',
            link: '/grocery/single-product',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.Checkout',
            link: '/grocery/checkout',
          }
        ]
      },
      {
        id: 4,
        label: 'MENUITEMS.SHOP.LIST.FoodDelivery',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.CategoryPage',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/food/category',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.SingleItem',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/food/restaurants',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.Cart',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/food/cart',
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.Checkout',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/food/checkout',
          }
        ]
      },
      {
        id: 5,
        label: 'MENUITEMS.SHOP.LIST.NFTMarketplace',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.Catalogv1',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/catalog_v1',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.Catalogv2',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/catalog_v2',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.SingleItemAuctionLive',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/auctionlive',
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.SingleItemAuctionEnded',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/auctionended',
          },
          {
            id: 5,
            label: 'MENUITEMS.SHOP.LIST.SingleItemBuyNow',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/auctionbuy',
          },
          {
            id: 6,
            label: 'MENUITEMS.SHOP.LIST.VendorPage',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/vendor',
          },
          {
            id: 7,
            label: 'MENUITEMS.SHOP.LIST.ConnectWallet',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/connectwallet',
          },
          {
            id: 8,
            label: 'MENUITEMS.SHOP.LIST.CreateNewItem',
            fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/createnewitem',
          }
        ]
      },
      {
        id: 6,
        label: 'MENUITEMS.SHOP.LIST.Shoppages',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.SHOP.LIST.ShopCategories',
            link: '/shop/categories',
          },
          {
            id: 2,
            label: 'MENUITEMS.SHOP.LIST.ProductPagev1',
            link: '/shop/single-v1',
          },
          {
            id: 3,
            label: 'MENUITEMS.SHOP.LIST.ProductPagev2',
            link: '/shop/single-v2',
          },
          {
            id: 4,
            label: 'MENUITEMS.SHOP.LIST.Cart',
            link: '/shop/cart',
          },
          {
            id: 5,
            label: 'MENUITEMS.SHOP.LIST.CheckoutDetails',
            link: '/shop/checkout-details',
          },
          {
            id: 6,
            label: 'MENUITEMS.SHOP.LIST.CheckoutShipping',
            link: '/shop/checkout-shipping',
          },
          {
            id: 7,
            label: 'MENUITEMS.SHOP.LIST.CheckoutPayment',
            link: '/shop/checkout-payment',
          },
          {
            id: 8,
            label: 'MENUITEMS.SHOP.LIST.CheckoutReview',
            link: '/shop/checkout-review',
          },
          {
            id: 9,
            label: 'MENUITEMS.SHOP.LIST.CheckoutComplete',
            link: '/shop/checkout-complete',
          },
          {
            id: 10,
            label: 'MENUITEMS.SHOP.LIST.OrderTracking',
            link: '/shop/order-tracking',
          },
          {
            id: 11,
            label: 'MENUITEMS.SHOP.LIST.ProductComparison',
            link: '/shop/comparison',
          }
        ]
      }
    ]
  },
  {
    id: 3,
    label: 'MENUITEMS.ACCOUNT.TEXT',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.ACCOUNT.LIST.ShopUserAccount',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.ACCOUNT.LIST.OrdersHistory',
            link: '/account/orders'
          },
          {
            id: 2,
            label: 'MENUITEMS.ACCOUNT.LIST.ProfileSettings',
            link: '/account/profile'
          },
          {
            id: 3,
            label: 'MENUITEMS.ACCOUNT.LIST.AccountAddresses',
            link: '/account/address'
          },
          {
            id: 4,
            label: 'MENUITEMS.ACCOUNT.LIST.PaymentMethods',
            link: '/account/payment'
          },
          {
            id: 5,
            label: 'MENUITEMS.ACCOUNT.LIST.Wishlist',
            link: '/account/wishlist'
          },
          {
            id: 6,
            label: 'MENUITEMS.ACCOUNT.LIST.MyTickets',
            link: '/account/tickets'
          },
          {
            id: 7,
            label: 'MENUITEMS.ACCOUNT.LIST.SingleTicket',
            link: '/account/single-ticket'
          }
        ]
      },
        {
          id: 2,
          label: 'MENUITEMS.ACCOUNT.LIST.VendorDashboard',
          subChild: [
            {
              id: 1,
              label: 'MENUITEMS.ACCOUNT.LIST.Settings',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/setting'
            },
            {
              id: 2,
              label: 'MENUITEMS.ACCOUNT.LIST.Purchases',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/purchase'
            },
            {
              id: 3,
              label: 'MENUITEMS.ACCOUNT.LIST.Favorites',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/favorites'
            },
            {
              id: 4,
              label: 'MENUITEMS.ACCOUNT.LIST.Sales',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/sales'
            },
            {
              id: 5,
              label: 'MENUITEMS.ACCOUNT.LIST.Products',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/product'
            },
            {
              id: 6,
              label: 'MENUITEMS.ACCOUNT.LIST.AddNewProduct',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/addproduct'
            },
            {
              id: 7,
              label: 'MENUITEMS.ACCOUNT.LIST.Payouts',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/marketplace/payout'
            }
          ]
        },
        {
          id: 3,
          label: 'MENUITEMS.ACCOUNT.LIST.NFTMarketplace',
          subChild: [
            {
              id: 1,
              label: 'MENUITEMS.ACCOUNT.LIST.ProfileSettings',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/setting'
            },
            {
              id: 2,
              label: 'MENUITEMS.ACCOUNT.LIST.WalletPayouts',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/setting'
            },
            {
              id: 3,
              label: 'MENUITEMS.ACCOUNT.LIST.MyItems',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/myitem'
            },
            {
              id: 4,
              label: 'MENUITEMS.ACCOUNT.LIST.MyCollections',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/mycollection'
            },
            {
              id: 5,
              label: 'MENUITEMS.ACCOUNT.LIST.Favorites',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/favorite'
            },
            {
              id: 6,
              label: 'MENUITEMS.ACCOUNT.LIST.Notifications',
              fulllink: 'https://themes.themesbrand.com/cartzilla/angular/nft-marketplace/notification'
            }
          ]
        },
      {
        id: 4,
        label: 'MENUITEMS.ACCOUNT.LIST.SignIn',
        link: '/account/signin'
      },
      {
        id: 5,
        label: 'MENUITEMS.ACCOUNT.LIST.PasswordRecovery',
        link: '/account/password-recovery'
      },
    ]
  },
  {
    id: 4,
    label: 'MENUITEMS.PAGES.TEXT',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.PAGES.LIST.NavbarVariants',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.PAGES.LIST.1LevelLight',
            link: '/navbar/level1-light'
          },
          {
            id: 2,
            label: 'MENUITEMS.PAGES.LIST.1LevelDark',
            link: '/navbar/level1-dark'
          },
          {
            id: 3,
            label: 'MENUITEMS.PAGES.LIST.2LevelLight',
            link: '/navbar/level2-light'
          },
          {
            id: 4,
            label: 'MENUITEMS.PAGES.LIST.2LevelDark',
            link: '/navbar/level2-dark'
          },
          {
            id: 5,
            label: 'MENUITEMS.PAGES.LIST.3LevelLight',
            link: '/navbar/level3-light'
          },
          {
            id: 6,
            label: 'MENUITEMS.PAGES.LIST.3LevelDark',
            link: '/navbar/level3-dark'
          },
          {
            id: 7,
            label: 'MENUITEMS.PAGES.LIST.ElectronicsStore',
            link: '/account/single-ticket'
          },
          {
            id: 8,
            label: 'MENUITEMS.PAGES.LIST.Marketplace',
            link: '/account/single-ticket'
          },
          {
            id: 9,
            label: 'MENUITEMS.PAGES.LIST.SideMenu',
            link: ''
          }
        ]
      },
      {
        id: 2,
        label: 'MENUITEMS.PAGES.LIST.AboutUs',
        link: '/pages/about'
      },
      {
        id: 3,
        label: 'MENUITEMS.PAGES.LIST.Contacts',
        link: '/pages/contacts'
      },
      {
        id: 4,
        label: 'MENUITEMS.PAGES.LIST.HelpCenter',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.PAGES.LIST.HelpCenter',
            link: '/pages/topic'
          },
          {
            id: 2,
            label: 'MENUITEMS.PAGES.LIST.SingleTopic',
            link: '/pages/single-topic'
          },
          {
            id: 3,
            label: 'MENUITEMS.PAGES.LIST.SubmitRequest',
            link: '/pages/submit-request'
          }
        ]
      },
      {
        id: 5,
        label: 'MENUITEMS.PAGES.LIST.404NotFound',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.PAGES.LIST.404SimpleText',
            link: '/pages/404-simple'
          },
          {
            id: 2,
            label: 'MENUITEMS.PAGES.LIST.404Illustration',
            link: '/pages/404-illustration'
          }
        ]
      },
      {
        id: 6,
        label: 'MENUITEMS.PAGES.LIST.StickyFooterDemo',
        link: '/pages/sticky-footer'
      },
    ]
  },
  {
    id: 5,
    label: 'MENUITEMS.BLOGS.TEXT',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.BLOGS.LIST.BlogListLayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.BLOGS.LIST.ListwithSidebar',
            link: '/blogs/list-sidebar'
          },
          {
            id: 2,
            label: 'MENUITEMS.BLOGS.LIST.ListnoSidebar',
            link: '/blogs/list'
          }
        ]
      },
      {
        id: 2,
        label: 'MENUITEMS.BLOGS.LIST.BlogGridLayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.BLOGS.LIST.GridwithSidebar',
            link: '/blogs/grid-sidebar'
          },
          {
            id: 2,
            label: 'MENUITEMS.BLOGS.LIST.GridnoSidebar',
            link: '/blogs/grid'
          }
        ]
      },
      {
        id: 3,
        label: 'MENUITEMS.BLOGS.LIST.SinglePostLayouts',
        subChild: [
          {
            id: 1,
            label: 'MENUITEMS.BLOGS.LIST.ArticlewithSidebar',
            link: '/blogs/single-sidebar'
          },
          {
            id: 2,
            label: 'MENUITEMS.BLOGS.LIST.ArticlenoSidebar',
            link: '/blogs/single'
          }
        ]
      },
    ]
  },
];

