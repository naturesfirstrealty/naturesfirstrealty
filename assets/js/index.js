/*
Theme Name: Farmus - Agriculture and Organic Farm HTML5 Template
Theme URI: https://themeforest.net/user/techsometimes/portfolio
Design by: techsometimes
Developed by: A N Abdullah Al Numan
Version: 1.0
License: 
Tags: 
*/


(($) => {
  ("use strict");

  menuBar();

  bgImg();

  venoBox();

  shuffle();

  animeCounterUp();

  testimonial();

  clientLogo();

  postSlider();

  wow();

  mySelect();

  htmlFatchFrom();

  preloderOption();

  bottomToTop();

  /*====== Active Plugins ======

        1 Menu Bar

        2 BG Img

        3 VenoBox

        4 Shuffle

        5 Anime Counter Up

        6 Testimonial

        7 Client Logo

        8 Post Slider

        9 Wow

        10 My Select

        11 HTML Fatch From 

        12 Preloder Option

        13 Bottom To Top

    =============================*/

  /*=====================
        1 Menu Bar
    =======================*/

  function menuBar() {

    let copyMenuLogo = $(".top-bar.v1 .top-bar-logo").html();
    let copyMenuList = $(".menu-bar.v1 .menu-bar-content").html();

    $(".menu-bar.v1 .menu-bar-content").parent().append(`
        <div class="mobile-header">
          <div class="mobile-menu-logo">
            ${copyMenuLogo}
          </div>
          <div class="mobile-menu-right">
            <button class="search-open-btn d-xl-none">
              <span class="my-icon icon-magnifying-glass"></span>
            </button>
            <button class="mobile-menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div class="mobile-menu-bar">
            <div class="mobile-menu-header">
              <div class="mobile-logo">${copyMenuLogo}</div>
              <button class="close-mobile-btn"><span class="my-icon icon-angle-left"></span></button>
            </div>
            <div class="mobile-main-manu">
                ${copyMenuList}
            </div>
          </div>
          <div class="mobile-menu-overlay"></div>
        </div>
      `);

    $(".menu-bar.v1 .mobile-menu-btn").on("click", function () {
      $(this).addClass("active");
      $(this).parents(".mobile-header").find(".mobile-menu-bar, .mobile-menu-overlay").addClass("active");
    });
    
    $(".menu-bar.v1 .mobile-header .close-mobile-btn").on("click", function () {
      $(this).parents(".mobile-header").find(".mobile-menu-bar, .mobile-menu-btn, .mobile-menu-overlay").removeClass("active");
    });

    $(".menu-bar.v1 .mobile-menu-overlay").on("click", function () {
      $(this).removeClass("active");
      $(this).parents(".mobile-header").find(".mobile-menu-btn, .mobile-menu-bar , .mobile-menu-overlay").removeClass("active");
    });

    $(".top-bar.v1 .search-open-btn").on("click", function () {
      $(this).parent().addClass("active");
    });
    
    $(".menu-bar.v1 .mobile-header .search-open-btn").on("click", function () {
      $(this).parents("header").children(".top-bar.v1").find(".top-display-info").toggleClass("active");
    });

    $(".top-bar.v1 .top-bar-info .search-close").on("click", function () {
      $(this).parents(".top-display-info").removeClass("active");
    });

    $(".menu-bar.v1 .mobile-main-manu .main-menu").on("click", "li a", function (e) {
      const { target } = e;
      const href = target.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        const $parent = $(target).parent("li");
        const $siblings = $parent.siblings("li");
        const isActive = $parent.hasClass("active");
        if (isActive) {
          $parent.removeClass("active");
          $(target).siblings("ul").slideUp();
        } else {
          $parent.addClass("active");
          $siblings.removeClass("active")
          $siblings.find("ul:visible").slideUp();
          $(target).siblings("ul").slideDown();
        }
      }
    });

    $(".menu-bar.v1 .mobile-main-manu .main-menu .has-dropdown").find(".active").parent().slideDown();

    const handleScroll = () => {
      const $this = $(window);
      const $topBar = $(".top-bar.v1");
      const $menuBar = $(".menu-bar.v1");
      const topBarHeight = $topBar.outerHeight();
      const menuBarHeight = $menuBar.outerHeight();

      if ($this.scrollTop() > topBarHeight) {
        $topBar.add($menuBar).addClass("sticky-header");
        $topBar.css({ "margin-top": menuBarHeight });
      } else {
        $topBar.add($menuBar).removeClass("sticky-header");
        $topBar.css({ "margin-top": "auto" });
      }
      
    };

    $(window).on("scroll", handleScroll);
  }

  /*=====================
        2 BG Img
    =======================*/
  function bgImg() {
    document.querySelectorAll("[data-background]").forEach((element) => {
      element.style.backgroundImage = `url(${element.getAttribute(
        "data-background"
      )})`;
    });
  }

  /*=====================
        3 VenoBox
    =======================*/
  function venoBox() {
    new VenoBox();
  }

  /*========================
        4 Shuffle
    =======================*/

  function shuffle() {
    if($(".projects-gallery").hasClass("box-shuffle")){
      window.onload = function () {
        let Shuffle = window.Shuffle;
        let element = document.querySelector(".gallery-items");
  
        let shuffleInstance = new Shuffle(element, {
          itemSelector: '.gallery-items > div'
        }); 
        $(".projects-gallery .gallery-btns button").on('click',function(e){
          e.preventDefault();
          $(".projects-gallery .gallery-btns button").removeClass('active');
          $(this).addClass('active'); 
          let keyword = $(this).attr('data-target');
          shuffleInstance.filter(keyword);
        });
      }
    }
  }

  /*========================
        5 Anime Counter Up
    =======================*/

  function animeCounterUp() {
    const $counterElements = $(".counter");

    function animateElement() {
      $counterElements.each(function () {
        anime({
          targets: this,
          innerHTML: [
            parseInt(this.dataset.countMin) || 0,
            parseInt(this.dataset.countMax),
          ],
          round: 1,
          easing: "linear",
          duration: parseInt(this.dataset.countDuration) || 1000,
          delay: parseInt(this.dataset.countDelay) || 500,
        });
      });
    }

    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const handleScroll = () => {
      $counterElements.each(function () {
        if (isElementInViewport(this)) {
          animateElement();
          $(window).off("scroll", handleScroll);
        }
      });
    };

    $(window).on("scroll", handleScroll);
  }
  /*=====================
        6 Testimonial
    =======================*/

    function testimonial() {
    let testimonialSlider1 = new Swiper(".testimonial.v1 .slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
          centeredSlides: true,
        },
      },
    });

    let testimonialSlider2 = new Swiper(".testimonial.v2 .slider", {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: ".prev-btn",
        nextEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      },
    });
  }
  /*=====================
        7 Client Logo
    =======================*/

    function clientLogo() {
    let clientLogoSlider1 = new Swiper(".client-logo.v1 .slider", {
      slidesPerView: 5,
      spaceBetween: 50,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 5,
          centeredSlides: true,
        },
      },
    });
  }

  /*=====================
      8 Post Slider
    =======================*/

  function postSlider() {
    let postSlider = new Swiper(".blog-post.v1 .slider", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: ".prev-btn",
        nextEl: ".next-btn",
      },
    });
  }


  /*=====================
        9 Wow
    =======================*/

  function wow() {
    wow = new WOW({
      animateClass: "animate__animated",
      offset: 0,
    });
    wow.init();
  }

  /*=====================
        10 My Select
    =======================*/
  function mySelect() {
    const $mySelectElements = $("select");

    $mySelectElements.each((index, selectElement) => {
      const $mySelectContainer = $("<div>").addClass("my-select");

      const $selectedOption = $("<button>")
        .addClass("current")
        .attr("type", "button")
        .html(selectElement.options[selectElement.selectedIndex].innerHTML);

      const $optionsList = $("<ul>").addClass("list");

      for (const option of selectElement.options) {
        const $myOption = $("<li>").html(option.innerHTML);
        $myOption.on("click", () => {
          $selectedOption.html(option.innerHTML);
          $optionsList.removeClass("open");
          $selectedOption.removeClass("open");
        });
        $optionsList.append($myOption);
      }

      $selectedOption.on("click", () => {
        $optionsList.toggleClass("open");
        $selectedOption.toggleClass("open");
      });

      $mySelectContainer.append($selectedOption);
      $mySelectContainer.append($optionsList);
      $(selectElement).before($mySelectContainer).hide();

      // Hide options when user clicks outside of select
      $(document).on("click", (event) => {
        if (
          !$mySelectContainer.is(event.target) &&
          $mySelectContainer.has(event.target).length === 0
        ) {
          $optionsList.removeClass("open");
          $selectedOption.removeClass("open");
        }
      });
    });
  }

  /*=====================
      11 HTML Fatch From 
    =======================*/
  function htmlFatchFrom() {
    if ($("form").hasClass("message-form")) {
      // Get the form.
      const form = document.querySelector(".message-form");

      // Get the messages div.
      const formMessages = $(".response");

      // Set up an event listener for the contact form.
      form.addEventListener("submit", (event) => {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        const formData = new FormData(form);

        // Submit the form using Fetch.
        fetch(form.action, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((responseText) => {
            // Make sure that the formMessages div has the 'success' class.
            formMessages.removeClass("error");
            formMessages.addClass("success");

            // Set the message text.
            formMessages.text(responseText);
            form.reset();

            const timeline = anime.timeline();
            timeline
              .add({
                targets: formMessages[0],
                opacity: [0, 1],
                translateY: [50, 0],
                easing: "easeInOutQuad",
                duration: 400,
              })
              .add({
                targets: formMessages[0],
                opacity: [1, 0],
                translateY: [0, -50],
                easing: "easeInOutQuad",
                duration: 400,
                delay: 6000,
                complete: () => {
                  formMessages.empty();
                  formMessages.removeClass("success");
                },
              });
          })
          .catch((error) => {
            const timeline = anime.timeline();
            timeline.add({
              targets: formMessages[0],
              opacity: [0, 1],
              translateY: [50, 0],
              easing: "easeInOutQuad",
              duration: 400,
            });

            // Make sure that the formMessages div has the 'error' class.
            formMessages.removeClass("success");
            formMessages.addClass("error");

            formMessages.text(
              `${
                error
                  ? error
                  : "Oops! An error occurred and your message could not be sent."
              }`
            );
          });
      });
    }
  }

  /*=====================
        12 Preloder Option
    =======================*/
  function preloderOption() {
    $("body .preloder").prepend(` <ul class="corners"><li></li><li></li><li></li><li></li></ul>`);

    const preloader = $("body .preloder");

    $(window).on("load", () => {
      anime({
        targets: preloader[0],
        opacity: [1, 0],
        easing: "easeInOutQuad",
        duration: 400,
        delay: 400,
        complete: () => {
          preloader.remove();
        },
      });
    });
  }

  /*============================
        13 Bottom To Top
    =============================*/

  function bottomToTop() {
    $("body footer").append(
      `<button class="scroll-bottom-Top"><span class="my-icon icon-arrow-down"</button>`
    );

    const scrollTop = $(".scroll-bottom-Top");
    const sectionScrollHeight = $("main section").first().outerHeight();

    $(window).scroll(() => {
      if ($(window).scrollTop() > sectionScrollHeight) {
	scrollTop.addClass("show");
      } else {
	scrollTop.removeClass("show");
      }
    });

    scrollTop.on("click", (e) => {
      e.preventDefault();
      anime({
        targets: "html, body",
        scrollTop: 0,
        easing: "easeInOutCubic",
        duration: 1000,
      });
    });
  }
})(jQuery);
