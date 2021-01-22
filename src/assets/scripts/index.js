import * as $ from "jquery";
import Swiper, { Navigation, Pagination } from "swiper";

const headerTop = document.querySelector(".header__top");
const headerMiddle = document.querySelector(".header__middle");
const headerBottom = document.querySelector(".header__bottom");
const shadow = document.querySelector(".shadow");
const dop = document.querySelector(".dropdown__phone");
const dom = document.querySelector(".dropdown__mail");

//slider

Swiper.use([Navigation, Pagination]);

const swiper = new Swiper(".swiper-container", {
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
});

//accordion

const btnMoreInfo = document.querySelector(".more-inf");
btnMoreInfo.addEventListener("click", () => {
  const accBody = document.querySelector(".acc-body");
  accBody.classList.toggle("open");
  btnMoreInfo.classList.toggle("active");
});

//contacts accordion

let contactsAccordion = () => {
  let contactsAll = document.querySelector(".contacts__container");
  contactsAll.addEventListener("click", (e) => {
    let target = e.target;
    const item = target.closest(".contacts__col");
    const items = document.querySelectorAll(".contacts__col");
    if (target.className === "contacts__head") {
      if (!item.classList.contains("active")) {
        for (let i = 0; i < items.length; i++) {
          items[i].classList.remove("active");
        }
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  });
};
contactsAccordion();

/// recomm content

function checkWidth() {
  const brand = document.getElementsByClassName("recommendation__brand")[0];
  const slogan = document.getElementsByClassName("recommendation__slogan")[0];

  const brandTwo = document.getElementsByClassName("recommendation__brand")[2];
  const equipmentTwo = document.getElementsByClassName(
    "recommendation__equipment"
  )[2];
  const sloganTwo = document.getElementsByClassName(
    "recommendation__slogan"
  )[2];

  const pageWidth = document.documentElement.clientWidth;

  if (pageWidth < 767) {
    brand.textContent = "unox";
    slogan.textContent =
      "Благодаря своей универсальности пароконвектоматы быстро завоевывают пользователей по всему миру.";
    brandTwo.textContent = "hallde";
    equipmentTwo.textContent = "Овощерезки";
    sloganTwo.textContent =
      "Мощный двигатель переводит высокий крутящий момент на режущий инструмент";
  } else {
    brand.textContent = "rational";
    slogan.textContent =
      "Педантичность и преданность своему делу делает продукцию Rational идеальной для тех, кто ищет надежность и долговечность.";
    brandTwo.textContent = "hicold";
    equipmentTwo.textContent = "Холодильные столы";
    sloganTwo.textContent =
      "Многофункциональность оборудования позволяет оптимизировать пространство на кухне, сделать работу персонала максимально удобной и эффективной.";
  }
}
checkWidth();

window.addEventListener("resize", checkWidth);

// shadow

function activeShadow() {
  shadow.classList.add("active");
}

function disableShadow() {
  shadow.classList.remove("active");
}

//disable all actives

function disableAllActive() {
  const allActive = document.querySelectorAll(".active");
  allActive.forEach((item) => item.classList.remove("active"));
}
document.addEventListener("click", (e) => {
  if (e.target === shadow || e.target === search) {
    disableAllActive();
    headerMiddle.style.position = "";
    headerTop.style.position = "";
    headerBottom.style.position = "";
  }
});
// search bar

document.addEventListener("click", (e) => {
  let target = e.target;
  const search = document.querySelector(".categories-text");
  const searchSelect = document.querySelector(".search-select");

  function openCategory() {
    searchSelect.classList.add("open");
  }
  function closeCategory() {
    searchSelect.classList.remove("open");
  }

  if (target === search) {
    openCategory();
  } else {
    closeCategory();
  }
});

// phone modal window

const phone = document.querySelectorAll(".nav__item")[10];
phone.addEventListener("mouseenter", () => {
  disableAllActive();
  dop.classList.add("active");
  headerBottom.style.position = "";
  headerMiddle.style.position = "";
  headerTop.style.position = "relative";
  activeShadow();
});
document.addEventListener("click", (e) => {
  const closeBar = document.querySelector(".close-bar");

  if (e.target === closeBar) {
    dop.classList.remove("active");
    headerTop.style.position = "";
    disableShadow();
  }
});

//mail

const mail = document.querySelectorAll(".nav__item")[9];
document.addEventListener("click", (e) => {
  let target = e.target;
  function openMail() {
    dom.classList.add("active");
  }
  function disableMail() {
    dom.classList.remove("active");
  }
  while (target && target !== mail) {
    target = target.parentNode;
  }
  if (target === mail) {
    openMail();
  } else {
    disableMail();
  }
});

// copy mail

const copyButton = document.querySelector(".btn__copy");

copyButton.addEventListener("click", function () {
  const emailAdress = document.querySelector(".nav__link--mail");

  const range = document.createRange();
  window.getSelection().removeAllRanges();
  range.selectNode(emailAdress);
  window.getSelection().addRange(range);

  document.execCommand("copy");
  window.getSelection().removeAllRanges();
});

//selects list

const selectList = document.querySelector(".select__list");

selectList.addEventListener("click", (e) => {
  const target = e.target;
  const text = document.querySelector(".categories-text");

  if (target !== selectList) {
    text.textContent = target.textContent;
  }
});

// mobile content

const triggers = document.querySelectorAll(".trigger");
const blocks = document.querySelectorAll(".trigger-content");
const body = document.body;
triggers.forEach((trigger, index) => {
  trigger.addEventListener("click", function () {
    if (blocks[index].classList.contains("active")) {
      blocks[index].classList.remove("active");
      body.style.overflow = "inherit";
    } else {
      blocks.forEach((block) => block.classList.remove("active"));
      blocks[index].classList.add("active");
      body.style.overflow = "hidden";
    }
  });
});

//sort-list item

const sortItems = document.querySelectorAll(".sort-list__item");
const sortMenu = document.querySelectorAll(".sort-list__item .dropdown-menu");

sortItems.forEach((sortItem, index) => {
  sortItem.addEventListener("click", function (e) {
    e.preventDefault();
    sortMenu.forEach((item) => item.classList.remove("active"));
    disableShadow();
    sortMenu[index].classList.add("active");
    activeShadow();
    headerMiddle.style.position = "relative";
    headerTop.style.position = "relative";
    headerBottom.style.position = "relative";
  });
});

// trigg active

triggers.forEach((trigger, index) => {
  trigger.addEventListener("click", function () {
    if (triggers[index].classList.contains("active")) {
      triggers[index].classList.remove("active");
    } else {
      triggers.forEach((trigger) => trigger.classList.remove("active"));
      triggers[index].classList.add("active");
    }
  });
});

// search

const search = document.querySelector(".input-search");
const matchList = document.querySelector(".match-list");

const searchItems = async (searchText) => {
  const res = await fetch("./items.json");
  const items = await res.json();

  //get matches to current text input

  let matches = items.filter((item) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return item.desc.match(regex) || item.type.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
    
  }
  outputHtml(matches);
};

// show results in HTML

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
     <div class="match-list__item">
      <div class="match-list__desc">${match.desc}</div>
      <div class="match-list__type">${match.type}</div>
     </div>
    `
      )
      .join("");
    matchList.innerHTML = html;
    matchList.classList.add('active');
    headerMiddle.style.position = "relative";
    headerTop.style.position = "relative";
    activeShadow();
  } else {
    headerMiddle.style.position = "";
    headerTop.style.position = "";
    matchList.classList.remove('active');
    disableShadow();
  }
};

search.addEventListener("input", () => {
  searchItems(search.value);
});
