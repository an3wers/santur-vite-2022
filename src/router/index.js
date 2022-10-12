import { createRouter, createWebHistory } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import { useAuthStore } from "@/stores/auth";
import { useMainStore } from "@/stores/main";
import { useAppMessage } from "../stores/appMessage";

// import Category from '@/pages/catalog/category.vue'

const Home = () => import("@/pages/home.vue");
const Catalog = () => import("@/pages/catalog/index.vue");
const Category = () => import("@/pages/catalog/category.vue");
const Registration = () => import("@/pages/registration.vue");
const Cart = () => import("@/pages/cart.vue");
const Checkout = () => import("@/pages/checkout.vue");
const Thank = () => import("@/pages/thank.vue");
const Uikit = () => import("@/pages/uikit.vue");
const Product = () => import("@/pages/product/index.vue");
const UserInfo = () => import("@/pages/profile/userinfo.vue");
const Company = () => import("@/pages/profile/company.vue");
const Office = () => import("@/pages/profile/office.vue");
const Delivery = () => import("@/pages/profile/delivery.vue");
const Favorites = () => import("@/pages/profile/favorites.vue");
const Feedback = () => import("@/pages/profile/feedback.vue");
const OrderHistory = () => import("@/pages/profile/orderhistory/index.vue");
const Order = () => import("@/pages/profile/orderhistory/order.vue");
const Search = () => import("@/pages/search.vue");
const News = () => import("@/pages/about/news/index.vue");
const NewsItem = () => import("@/pages/about/news/item.vue");
const Contacts = () => import("@/pages/contact.vue");
const NotFound = () => import("@/pages/404.vue");

const routes = [
  { path: "/", component: Home },
  { path: "/catalog", component: Catalog },
  { path: "/catalog/:id", component: Category },
  { path: "/product/:id", component: Product },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },
  { path: "/thank", name: "thank", component: Thank },
  { path: "/registration", component: Registration },
  { path: "/uikit", component: Uikit },
  { path: "/profile/userinfo", component: UserInfo },
  { path: "/profile/company", component: Company },
  { path: "/profile/office", component: Office },
  { path: "/profile/delivery", component: Delivery },
  { path: "/profile/favorites", component: Favorites },
  { path: "/profile/feedback", component: Feedback },
  { path: "/profile/orderhistory", component: OrderHistory },
  { path: "/profile/orderhistory/:id", component: Order },
  { path: "/search", component: Search },
  { path: "/contact", component: Contacts },
  { path: "/about/news", component: News },
  { path: "/about/news/:id", component: NewsItem },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // console.log("beforeEach");
  const catalogStore = useCatalogStore();
  const authStore = useAuthStore();
  const mainStore = useMainStore();
  const appMessageStroe = useAppMessage();

  if (catalogStore.$state.isMenu) {
    catalogStore.handleMenu();
  }

  if (authStore.getIsOpenAuthModal) {
    authStore.closeAuthModal();
  }

  if (document.body.classList.contains("modal-open")) {
    document.body.classList.remove("modal-open");
  }

  if (mainStore.searchValueStore && !to.query.search) {
    mainStore.searchValueStore = "";
    // mainStore.searchResultStore = []
  }

  if (appMessageStroe.isShow && appMessageStroe.type === "error") {
    appMessageStroe.close();
  }

  next();
});

// router.afterEach((to, from) => {
//   // console.log('afterEach')
//   // // const mainStore = useMainStore()
//   // // mainStore
//   // console.log("to", to)
//   // console.log("from", from)

// })

// router.beforeResolve((to, from, next) =>{
//   console.log('beforeResolve')
//   next()
// })

export default router;
