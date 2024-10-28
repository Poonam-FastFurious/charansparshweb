// $(document).ready(function () {
//       "use strict";

//       /*--------------------- Main Slider ---------------------- */

//       /*--------------------- Language and Currency Click to Active ---------------------- */
//       $(document).ready(function () {
//             $(".header-top-lan li").on("click", function () {
//                   $(this).addClass("active").siblings().removeClass("active");
//             });
//             $(".header-top-curr li").on("click", function () {
//                   $(this).addClass("active").siblings().removeClass("active");
//             });
//       });

//       /*--------------------- Day of the deal Slider (offer section) ---------------------- */

//       /*--------------------- tabs-products-Tailwindcss ---------------------------------*/
//       $("#myproTabTwo li:nth-child(2)").addClass("active");
//       $(".tab-pro-pane").hide();
//       $(".tab-pro-pane:nth-child(2)").show();
//       $("#myproTabTwo li").on("click", function () {
//             $("#myproTabTwo li").removeClass("active");
//             $(this).addClass("active");
//             $(".tab-pro-pane").hide();
//             var activeTab = $(this).find("a").attr("href");
//             $(activeTab).fadeIn();
//             return false;
//       });

//       /*--------------------- Trending, Top Rated Start Slider ----------------------- */

//       /*--------------------- Blog slider (Home Page) ---------------------- */
//       $(".gi-blog-carousel").owlCarousel({
//             margin: 24,
//             loop: true,
//             dots: false,
//             nav: false,
//             smartSpeed: 1000,
//             autoplay: false,
//             items: 3,
//             responsiveClass: true,
//             responsive: {
//                   0: {
//                         items: 1,
//                   },
//                   481: {
//                         items: 2,
//                   },
//                   768: {
//                         items: 2,
//                   },
//                   992: {
//                         items: 3,
//                   },
//                   1200: {
//                         items: 4,
//                   },
//                   1400: {
//                         items: 5,
//                   },
//             },
//       });

//       /*--------------------- Newsletter popup Homepage ---------------------- */
//       setTimeout(function () {
//             $("#gi-popnews-bg").fadeIn();
//             $("#gi-popnews-box").fadeIn();
//       }, 5000);
//       $("#gi-popnews-close").on("click", () => {
//             $("#gi-popnews-bg").fadeOut();
//             $("#gi-popnews-box").fadeOut();
//       });

//       $("#gi-popnews-bg").on("click", () => {
//             $("#gi-popnews-bg").fadeOut();
//             $("#gi-popnews-box").fadeOut();
//       });
// });
