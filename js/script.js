///////////////////
//variables
///////////////////
const drawerBtn = document.querySelector(".js-drawer-btn");
const drawer = document.querySelector(".js-drawer");
const heartBtn = document.querySelectorAll(".js-heart-btn");
const progressBarPurple = document.querySelector(".js-progress-bar div");
const header = document.querySelector(".js-header");
const fv = document.querySelector(".js-fv");

//works - common
const categoryBtns = document.querySelectorAll("button[data-category]");
const allBtns = document.querySelectorAll("button[data-category='all']");
const cards = document.querySelectorAll(".js-cards .c-card");
//works - sp
const openCategoryBtn = document.querySelector(".js-open-category");
const openTagBtn = document.querySelector(".js-open-tag");
const closeBtn = document.querySelectorAll(".js-close-btn");
//works - pc
const filterBtn = document.querySelector(".js-filter-btn button");
const cardContainer = document.querySelector(".js-cards");

let activeCategories = new Set();

///////////////////
//functions
///////////////////

function handleScroll() {
  const fvRect = fv.getBoundingClientRect();
  const fvBottom = fvRect.bottom + window.scrollY - 200;
  console.log("window scrollY:", window.scrollY);
  console.log("fv bottom:", fvBottom);
  if (window.scrollY >= fvBottom) {
    header.classList.add("is-scrolling");
  } else {
    header.classList.remove("is-scrolling");
  }
}

function openDrawer(e) {
  e.preventDefault();
  drawer.classList.toggle("is-open");
  this.classList.toggle("is-open");
}
function toggleHeart(e) {
  e.preventDefault();
  this.classList.toggle("is-active");
}
function onSwipe() {
  const swiper = new Swiper(".p-swiper", {
    speed: 5000,
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    initialSlide: 0,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    breakpoints: {
      1000: {
        spaceBetween: 32,
      },
    },
    pagination: {
      el: ".p-swiper__progress-bar",
      type: "progressbar",
    },
  });
}

function toggleBtns(e) {
  // e.preventDefault();
  if (e.target.classList.contains("js-open-category")) {
    document.querySelector(".js-category").classList.toggle("is-open");
  }
  if (e.target.classList.contains("js-open-tag")) {
    document.querySelector(".js-tag").classList.toggle("is-open");
  }
  if (e.target.classList.contains("js-close-btn")) {
    e.target.parentNode.classList.remove("is-open");
  }
}

function handleCategoryBtnClick(e) {
  let category = e.target.dataset.category;
  allBtns.forEach((allBtn) => {
    if (allBtn.classList.contains("is-active")) {
      activeCategories.clear();
      allBtn.classList.remove("is-active");
    }
  });
  if (activeCategories.has(category)) {
    activeCategories.delete(category);
    e.target.classList.remove("is-active");
  } else {
    activeCategories.add(category);
    e.target.classList.add("is-active");
  }

  //PCのボータンを押したらSPのボタンも押されるようにする
  let sameCategoryBtns = document.querySelectorAll(`[data-category="${category}"]`);
  sameCategoryBtns.forEach((btn) => {
    if (activeCategories.has(category)) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });

  if (activeCategories.size === 0) {
    handleAllBtnClick();
  }
  if (window.innerWidth < 768) {
    filterCards();
  }
}

function handleAllBtnClick(e) {
  categoryBtns.forEach((btn) => {
    btn.classList.remove("is-active");
  });
  activeCategories.clear();

  allBtns.forEach((allBtn) => {
    allBtn.classList.add("is-active");
  });
  activeCategories.add("all");

  filterCards();
}

function filterCards() {
  cardContainer.classList.add("anima");
  setTimeout(() => {
    cardContainer.classList.remove("anima");
  }, 300);

  // サイトにアクセスして何もクリックしなかった場合
  if (activeCategories.size === 0) {
    cards.forEach((card) => {
      card.classList.remove("is-hidden");
      card.classList.remove("is-hidden-sm");
    });
    return;
  }

  cards.forEach((card) => {
    let category = card.dataset.category.split(" ");
    // console.log("Card category:", category);
    // console.log(
    //   "Has :",
    //   category.some((cat) => activeCategories.has(cat))
    // );
    if (category.some((cat) => activeCategories.has(cat)) || activeCategories.has("all")) {
      card.classList.remove("is-hidden");
      card.classList.remove("is-hidden-sm");
    } else {
      card.classList.add("is-hidden");
    }
  });
}

///////////////////
// event & function execute
///////////////////
onSwipe();
drawerBtn.addEventListener("click", openDrawer);
heartBtn.forEach((heart) => {
  heart.addEventListener("click", toggleHeart);
});
openCategoryBtn.addEventListener("click", toggleBtns);
openTagBtn.addEventListener("click", toggleBtns);
closeBtn.forEach((btn) => {
  btn.addEventListener("click", toggleBtns);
});

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", handleCategoryBtnClick);
});
allBtns.forEach((allBtn) => {
  allBtn.addEventListener("click", handleAllBtnClick);
});
filterBtn.addEventListener("click", filterCards);

window.addEventListener("scroll", handleScroll);

///////////////////
// debounce 関数
///////////////////
// function debounce(func, wait) {
//   let timeout;

//   return function executedFunction() {
//     const later = function () {
//       clearTimeout(timeout);
//       func();
//     };

//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }

// function onResizeComplete() {
//   console.log("리사이즈가 완료되었습니다.");
// }

// window.addEventListener("resize", debounce(onResizeComplete, 250));
