
!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;
        var scrolled = 20;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()

          if (!$('#header').hasClass('header-scrolled')) {
            scrollto += scrolled;
          }
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).on('click', '.menuListBar > a', function (e) {
      debugger;
      e.preventDefault();   
        setTimeout(function(){
            window.scrollTo({top: $('#menu').offset().top,
        left: 0,
        behavior: 'smooth'})
      },300);
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop() + 80;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });
   
    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
    $(".filter-CHICKEN").click();
    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox();
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Offer carousel
  $(".burger-offer-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initi AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });

  let foodImageArray = new Array();
  foodImageArray[0] = "assets/burger/classic-chicken-burger.jpg";
  foodImageArray[1] = "assets/burger/french-fries-side.png";
  foodImageArray[2] = "assets/burger/Cookie-Crunch-Sundae_thumb.png";
  foodImageArray[3] = "assets/burger/7up_thumb.png";
  let foodImageIndexId = 0;
  window.setInterval(function () {
    $("#ourFoodImage")
      .fadeOut(400, function () {
        $("#ourFoodImage").attr('src', foodImageArray[foodImageIndexId]);
      })
      .fadeIn(400);
    // $("#ourFoodImage").attr('src',foodImageArray[foodImageIndexId]);
    foodImageIndexId++; //increment data array id
    if (foodImageIndexId == 4) foodImageIndexId = 0; //repeat from start
  }, 3000);

  let visionImageArray = new Array();
  visionImageArray[0] = "assets/burger/burger-king-whopper.png";
  visionImageArray[1] = "assets/burger/BK-SundaeStrawberry-Thumb_0.png";
  visionImageArray[2] = "assets/burger/Cookie-Crumble-Shake_thumb.png";
  visionImageArray[3] = "assets/burger/pepsi-Thumb_0.png";
  let visionImageIndexId = 0;
  window.setInterval(function () {
    $("#ourVisionImage")
      .fadeOut(400, function () {
        $("#ourVisionImage").attr('src', visionImageArray[visionImageIndexId]);
      })
      .fadeIn(400);
    // $("#ourFoodImage").attr('src',visionImageArray[visionImageIndexId]);
    visionImageIndexId++; //increment data array id
    if (visionImageIndexId == 4) visionImageIndexId = 0; //repeat from start
  }, 3000);

  let menuData = [
    {imageUrl:"veg/classic_Burger.jpg",title:"Classic Burger",category:"VEGETARIAN"},
    {imageUrl:"veg/potato-veggie-burgers.jpg",title:"Potato veggie Burger",category:"VEGETARIAN"},
    {imageUrl:"veg/cinder.jpg",title:"Cinder Burger",category:"VEGETARIAN"},
    {imageUrl:"veg/yum-veggie.png",title:"Yum-veggie Burger",category:"VEGETARIAN"},

    {imageUrl:"chicken/deluxe.jpeg",title:"Deluxe Burger",category:"CHICKEN"},
    {imageUrl:"chicken/crusty.jpg",title:"Crusty Burger",category:"CHICKEN"},
    {imageUrl:"chicken/ultimate.jpg",title:"Ultimate Burger",category:"CHICKEN"},

    {imageUrl:"whopper/impossible.jpg",title:"Impossible Whopper",category:"WHOPPER"},
    {imageUrl:"whopper/burst.jpg",title:"Burst Whopper",category:"WHOPPER"},
    {imageUrl:"whopper/regular.jpg",title:"Regular Whopper",category:"WHOPPER"},
    {imageUrl:"whopper/premium.jpg",title:"Premium Whopper",category:"WHOPPER"},

    {imageUrl:"sides/fingerStripes.jpg",title:"Finger Stripes",category:"SIDES"},
    {imageUrl:"sides/Crispy_Chicken_Stripes.jpg",title:"Crispy Chicken Stripes",category:"SIDES"},
    {imageUrl:"sides/nuggets.jpeg",title:"Crispy Chicken Nuggets",category:"SIDES"},
    {imageUrl:"sides/french-fries.jpg",title:"French Fries",category:"SIDES"},
    {imageUrl:"sides/Crispy-Oven-Fries.jpg",title:"Crispy Oven Fries",category:"SIDES"},

    {imageUrl:"desserts/Crazy-Sundaes.jpg",title:"Crazy Sundaes",category:"DESSERTS"},
    {imageUrl:"desserts/Chocolate-Peanut-Butter-Milkshakes.jpg",title:"Chocolate Peanut Butter Milkshakes",category:"DESSERTS"},
    {imageUrl:"desserts/oreo_Milkshake.jpg",title:"Oreo Milkshake",category:"DESSERTS"},
    {imageUrl:"desserts/chocoChips.jpg",title:"Choco Chips Nut Icecream",category:"DESSERTS"},
    {imageUrl:"desserts/vanila.jpg",title:"Vanila",category:"DESSERTS"},

    {imageUrl:"drinks/7up.jpg",title:"7up",category:"DRINKS"},
    {imageUrl:"drinks/coca-cola.png",title:"Coca Cola",category:"DRINKS"},
    {imageUrl:"drinks/mirinda.jpg",title:"mirinda",category:"DRINKS"},

  ];
  let divData = "";
  for(let menuItem of menuData){
    divData += `<div class="col-lg-4 col-md-6 portfolio-item filter-`+menuItem.category+`">
    <div class="portfolio-wrap">
      <img src="assets/burger/`+menuItem.imageUrl+`" class="img-fluid" alt="">
      <div class="portfolio-info">
        <h4>`+menuItem.title+`</h4>
        <p>`+menuItem.category+`</p>
        <div class="portfolio-links">
          <a href="assets/burger/`+menuItem.imageUrl+`" data-gall="portfolioGallery" class="venobox" title=`+menuItem.title+`><i class="bx bx-zoom-in bx-tada"></i></a>
          <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
        </div>
      </div>
    </div>
  </div>`
  }

  $('#menuDivId').html(divData);

  let searchParams = new URLSearchParams(window.location.search)
  if(searchParams.has('user')){
    $("#loginAnchor").css('display','none');
    $("#userAnchor").css('display','block');
    $("#userAnchor").html("<i class='bx bx-user bx-tada pr-1' style='font-size: 18px;'></i>Welcome "+searchParams.get('user'))
  } else {
    $("#userAnchor").css('display','none');
  }

})(jQuery);

function selectedMenuItem(item){
  $(".filter-"+item).click();
}
