document.addEventListener("DOMContentLoaded", function () {
  // Прелоадер
  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }, 1000);
  });

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Закрываем меню на мобильных устройствах
        if (document.querySelector(".burger").classList.contains("active")) {
          toggleMobileMenu();
        }
      }
    });
  });

  // Фиксированная шапка при скролле
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Показываем/скрываем кнопку "Наверх"
    toggleScrollTopButton();
  });

  // Мобильное меню
  const burger = document.querySelector(".burger");

  burger.addEventListener("click", toggleMobileMenu);

  function toggleMobileMenu() {
    burger.classList.toggle("active");
    document.querySelector(".nav").classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  // Анимация чисел в статистике
  const stats = document.querySelectorAll(".stat__number");

  if (stats.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((stat) => {
      observer.observe(stat);
    });
  }

  function animateValue(element) {
    const target = parseInt(element.getAttribute("data-count"));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Модальное окно
  const modal = document.getElementById("callback-modal");
  const modalTriggers = document.querySelectorAll(
    ".header__callback, .products__btn, .partners__btn"
  );
  const modalClose = document.querySelector(".modal__close");

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  modalClose.addEventListener("click", closeModal);
  document
    .querySelector(".modal__overlay")
    .addEventListener("click", closeModal);

  function openModal() {
    document.body.classList.add("no-scroll");
    modal.classList.add("active");
  }

  function closeModal() {
    document.body.classList.remove("no-scroll");
    modal.classList.remove("active");
  }

  // Кнопка "Наверх"
  function toggleScrollTopButton() {
    const scrollTopBtn = document.querySelector(".scroll-top");

    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  }

  document.querySelector(".scroll-top").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Анимация появления элементов при скролле
  const animateElements = document.querySelectorAll(".fade-in");

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // Отправка формы
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Здесь должна быть логика отправки формы
      // Для примера просто показываем сообщение
      alert(
        "Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время."
      );

      // Закрываем модальное окно, если форма в нем
      if (form.closest(".modal")) {
        closeModal();
      }

      // Очищаем форму
      form.reset();
    });
  });
});
