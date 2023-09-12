$(window).on("load", function () {
  "use strict";
  $(".megamenu-li").parent(".container").parent("ul").addClass("mega-menu");
  $(".banner-wrap").parent(".container").parent("ul").addClass("bottom-banner");
  $(".menu-banner").parent(".container").parent("ul").addClass("banner-menu");
  $(".submenu-li").parent(".container").parent("ul").addClass("sub-menu");

  $(".submenu-li").parent("ul").addClass("sub-menu");
  $(".megamenu-li").parent("ul").addClass("mega-menu");
  $(".bannermenu-li").parent("ul").addClass("banner-menu");

  $(".slow-window").fadeOut("slow");

  var popup = localStorage.getItem("popup_value");
  if (popup != 1) {
    $("#news-letter-modal").modal("show");
  }

  $("#popup-close").on("click", function () {
    localStorage.setItem("popup_value", "1");
  });
  $("button.navbar-toggle").on("click", function () {
    $(".main-menu-area").addClass("active");
    $(".mm-fullscreen-bg").addClass("active");
    $("body").addClass("hidden");
  });

  $(".close-box").on("click", function () {
    $(".main-menu-area").removeClass("active");
    $(".mm-fullscreen-bg").removeClass("active");
    $("body").removeClass("hidden");
  });

  $(".shopping-cart a.cart-count").on("click", function () {
    $(".mini-cart").addClass("show");
    $(".mm-fullscreen-bg").addClass("active");
  });

  $(".shopping-cart-close i").on("click", function () {
    $(".mini-cart").removeClass("show");
    $(".mm-fullscreen-bg").removeClass("active");
    $("body").removeClass("hidden");
  });

  $(".ajax-spin-cart").on("click", function () {
    window.setTimeout(function () {
      $(".mini-cart").addClass("show");
      $(".mm-fullscreen-bg").addClass("active");
      $("body").addClass("hidden");
    }, 1000);
  });

  // filter button js
  $("button.filter-button").on("click", function () {
    $(".filter-sidebar").addClass("active");
    $(".mm-fullscreen-bg").addClass("active");
  });

  $("button.close-filter-sidebar").on("click", function () {
    $(".filter-sidebar").removeClass("active");
    $(".mm-fullscreen-bg").removeClass("active");
  });

  $(".mm-fullscreen-bg").on("click", function () {
    $(".mini-cart").removeClass("show");
    $(".main-menu-area").removeClass("active");
    $(".mm-fullscreen-bg").removeClass("active");
    $(".filter-sidebar").removeClass("active");
    $("body").removeClass("hidden");
  });

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  $(".play-button, .popup-vimeo, .popup-gmaps").magnificPopup({
    tClose: "Close (Esc)",
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  $("#top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 0);
    return false;
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 1000) {
    $("#top").fadeIn();
  } else {
    $("#top").fadeOut();
  }

  var sticky = $(".header-bottom-wrap"),
    sticky2 = $(".header-area"),
    scroll = $(window).scrollTop();
  if (scroll >= 150) {
    sticky.addClass("is-sticky");
    sticky2.addClass("sticky-m");
  } else {
    sticky.removeClass("is-sticky");
    sticky2.removeClass("sticky-m");
  }

  $("label.box-area").on("click", function () {
    if ($(".cust-checkbox").is(":checked")) {
      $(".agree").removeClass("disabled");
    } else {
      $(".agree").addClass("disabled");
    }
  });
});

//Acqua products
var acqua_tb_products = {};

try {
  document
    .querySelectorAll(".swiper-container:not(.swiper-product-main)")
    .forEach(function (el) {
      new Swiper(el, {
        autoHeight: true,
        slidesPerView: 1,
        loop: false,
        navigation: {
          nextEl: el.nextElementSibling.nextElementSibling,
          prevEl: el.nextElementSibling,
        },
      });
    });

  var swiper_product_main = new Swiper(".swiper-product-main", {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        var currentVideo = $(
          "[data-swiper-slide-index=" + this.realIndex + "]"
        ).find("video");

        currentVideo.trigger("play");
      },
    },
  });

  var sliderVideos = jQuery(".swiper-slide video");

  swiper_product_main.on("slideChange", function () {
    sliderVideos.each(function (index) {
      this.currentTime = 0;
    });

    var prevVideo = jQuery(
        "[data-swiper-slide-index=" + this.previousIndex + "]"
      ).find("video"),
      currentVideo = jQuery(
        "[data-swiper-slide-index=" + this.realIndex + "]"
      ).find("video");

    prevVideo.trigger("stop");
    currentVideo.trigger("play");
  });
} catch (error) {
  console.log(error);
}

const single_option_selector = ".acqua-single-option-selector";
var current_product,
  product_variants,
  selected_values,
  variant,
  current_options,
  current_options_elms,
  $box_product;

function showImage(carrossel, index) {
  carrossel.find("img").hide();
  carrossel.find("img").eq(index).show();

  var productImage = carrossel.closest(".product-image");
  productImage
    .find(".dot-prod-imgs")
    .removeClass("active")
    .eq(index)
    .addClass("active");
}

$(document).ready(function () {
  $(".single-product-wrap .product-image .pro-img").each(function () {
    var carrossel = $(this);
    carrossel.data("index", 0);
    showImage(carrossel, 0);

    var dotsContainer = $('<div class="dots-prod-imgs"></div>');
    carrossel.closest(".product-image").append(dotsContainer);

    carrossel.find("img").each(function (index) {
      var dot = $('<span class="dot-prod-imgs"></span>');
      dotsContainer.append(dot);

      if (index === 0) {
        dot.addClass("active");
      }

      dot.on("click", function () {
        carrossel.data("index", index);
        showImage(carrossel, index);
      });
    });
  });

  $(".single-product-wrap .product-image .pro-img").on(
    "mousedown touchstart",
    function (e) {
      var carrossel = $(this);
      var initialX = e.originalEvent.touches
        ? e.originalEvent.touches[0].clientX
        : e.originalEvent.clientX;

      carrossel.on("mousemove touchmove", function (e) {
        var currentX = e.originalEvent.touches
          ? e.originalEvent.touches[0].clientX
          : e.originalEvent.clientX;
        var diffX = initialX - currentX;
        var index = carrossel.data("index");

        if (Math.abs(diffX) > 50) {
          if (diffX > 0 && index < 2) {
            // Arrastou para a esquerda
            index++;
          } else if (diffX < 0 && index > 0) {
            // Arrastou para a direita
            index--;
          }

          carrossel.data("index", index);
          showImage(carrossel, index);

          initialX = null;
          carrossel.off("mousemove touchmove");
        }
      });

      carrossel.on("mouseup touchend", function () {
        carrossel.off("mousemove touchmove");
      });
    }
  );

  $(".box-product .image").each(function () {
    var $elm = $(this);
    $elm.magnificPopup({
      type: "image",
      delegate: "a",
      gallery: {
        enabled: true,
      },
      callbacks: {
        beforeOpen: function (e) {
          var imageIndex =
            parseInt(
              $elm.find(".featured-container").find("img").attr("data-position")
            ) || 0;
          imageIndex++;
          this.goTo(imageIndex);
        },
      },
    });
  });
});

$(document).on("change", ".acqua-single-option-selector", function (e) {
  // Encontre a caixa do produto
  var $box_product = $(this).parents(".box-product");

  // Verifique se é um item-top-prod
  var isTopProd = $box_product.hasClass("item-top-prod");

  // Obtenha o produto atual
  var current_product = JSON.parse(
    $box_product.find("[id^='ProductJson-']").html()
  );

  //Get master dropdown
  $master_variant_dropdown = $box_product.find("[id^='ProductSelect-']");

  //Fixed carts
  $cart_error = $box_product.find(".cart-error");
  $product_prices = $box_product.find("[class^='.product-single__price']");
  $add_to_cart = $box_product.find("[id^='AddToCart']");
  $add_to_cart_text = $box_product.find("[id^='AddToCartText']");
  $cart_buttons = $box_product.find("[id^='CartButtons']");
  $compare_price = $box_product.find("[id^='ComparePrice']");
  $original_price = $box_product.find("[id^='ProductPrice']");

  if (current_product) {
    //Get current options elements
    current_options_elms = $box_product.find(".acqua-single-option-selector");

    if (current_options_elms) {
      //Get Current options
      current_options = $.map(current_options_elms, function (element) {
        var $element = $(element);
        var type = $element.attr("type");
        var currentOption = {};

        if (type === "radio" || type === "checkbox") {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data("index");
            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data("index");
          return currentOption;
        }
      });

      selected_values = current_options;
      product_variants = current_product.variants;

      //Recorrer cada una de las variantes
      var found = false;

      product_variants.forEach(function (variant) {
        var satisfied = true;
        var options = variant.options;

        selected_values.forEach(function (option) {
          if (satisfied) {
            satisfied = option.value === variant[option.index];
          }
        });

        if (satisfied) {
          found = variant;
        }
      });

      //Se encuentro variante
      if (found) variant = found;

      // No hay variante
      if (!variant) {
        return;
      }

      //Actualizar dropdown variantes maestras
      $master_variant_dropdown[0].value = variant.id;

      //Actualizar imagenes de variaciones
      if (variant.featured_image) {
        var $thumbnail = $(
          ".acqua_product-single__thumbnail" +
            '[data-image-id="' +
            variant.featured_image.id +
            '"]'
        );
        var $thumbnailImage = $thumbnail.find("img");
        var $productImage = $box_product.find("[id^='ProductImage-']");

        $productImage.attr({
          src: $thumbnailImage.data("default"),
          alt: $thumbnailImage.attr("alt"),
          srcset: "",
          "data-src": $thumbnailImage.data("src-pattern"),
          "data-aspectratio": $thumbnailImage.data("aspectratio"),
          "data-position": $thumbnailImage.data("position"),
          "data-max-width": $thumbnailImage.data("max-width"),
          "data-widths": "[" + $thumbnailImage.data("widths") + "]",
          "data-id": $productImage.data("id"),
          "data-sizes": $productImage.data("sizes"),
        });
      }

      //Update Add to cart buttons
      if (variant) {
        $cart_error.hide();
        $product_prices
          .removeClass("visibility-hidden")
          .attr("aria-hidden", "true");

        if (variant.available) {
          $add_to_cart.removeClass("disabled").prop("disabled", false);
          $add_to_cart_text.text("SELECT THIS OPTION");
          $cart_buttons.addClass("cart-buttons__enabled");
          $cart_buttons.addClass("hidemessage");
        } else {
          $add_to_cart.addClass("disabled").prop("disabled", true);
          $add_to_cart_text.text("SOLD OUT");
          $cart_buttons.removeClass("cart-buttons__enabled");
          $cart_buttons.removeClass("hidemessage");
        }

        // Nova lógica para adicionar/remover a classe 'disable-option'
        $(".swatch-item").removeClass("disable-option");

        product_variants.forEach(function (variantItem) {
          if (!variantItem.available) {
            var optionIndex = 1;
            var selectorParts = variantItem.options.map(function (option) {
              var part = "option" + optionIndex + '="' + option + '"';
              optionIndex++;
              return part;
            });
            var selector = ".swatch-item[" + selectorParts.join("][") + "]";
            $(selector).addClass("disable-option");
          }
        });
      } else {
        $add_to_cart.addClass("disabled").prop("disabled", true);
        $add_to_cart_text.text("SOLD OUT");
        $product_prices
          .addClass("visibility-hidden")
          .attr("aria-hidden", "false");
        $cart_buttons.removeClass("cart-buttons__enabled");
        $cart_buttons.removeClass("hidemessage");
      }
    }

    if (isTopProd && variant) {
      // Encontre todos os box-products que são item-bottom-prod
      var $bottomProds = $(".item-bottom-prod");

      $bottomProds.each(function () {
        var $bottomProd = $(this);
        var $bottomSelectors = $bottomProd.find(
          ".acqua-single-option-selector"
        );

        // Atualize cada seletor no item-bottom-prod para corresponder ao valor do item-top-prod
        current_options.forEach(function (option) {
          if (option.index === "option2") {
            var $correspondingSelector = $bottomSelectors
              .filter('[data-index="' + option.index + '"]')
              .filter('[value="' + option.value + '"]');
            $correspondingSelector.prop("checked", true).trigger("change");
          }
        });
      });
    }
  } else {
    return false;
  }
});

$(document).on("click", ".acqua-add-to-cart", function () {
  var $elm = $(this);
  var $box_product = $elm.parents(".box-product");
  var $tb_wrap = $elm.parents(".tops-and-bottoms-wrap");
  var tb_handle = $elm.data("tbtype");
  var selected_variant = $box_product
    .find("[id^='ProductSelect'] option:selected")
    .val();

  $tb_wrap
    .find(".acqua-add-to-cart")
    .removeClass("selected")
    .find("span")
    .text("SELECT THIS OPTION");

  $elm.addClass("selected").find("span").text("SELECTED");

  if (selected_variant) acqua_tb_products[tb_handle] = selected_variant;
  else delete acqua_tb_products[tb_handle];

  updateTbQuantity();
});

$(document).on("click", ".global-add-to-cart > button", function () {
  var cart_request = { items: [] },
    product_v_id;

  Object.keys(acqua_tb_products).forEach(function (key) {
    product_v_id = acqua_tb_products[key];

    cart_request.items.push({
      form_type: "product",
      utf8: "✓",
      quantity: 1,
      id: product_v_id,
      product_type: key,
      properties: {},
    });
  });

  cart_request.items.forEach((cart_item) => {
    let linked_pt = cart_item.product_type == "top" ? "bottom" : "top";
    cart_item.properties["linked_product"] = acqua_tb_products[linked_pt];
  });

  $.post("/cart/add.js", cart_request);

  setTimeout(function () {
    window.location.href = "/cart";
  }, 1000);
});

$(document).on("click", ".acqua-remove-from-cart", function (e) {
  e.preventDefault();
  var $elm = $(this),
    items_to_remove = [],
    cart_request = { updates: {} },
    ci = $elm.data("ci"),
    linked_ci = $elm.data("linkedci");

  items_to_remove.push(ci, linked_ci);

  items_to_remove.forEach((cart_item) => {
    cart_request.updates[cart_item] = 0;
  });

  $.post("/cart/update.js", cart_request);

  setTimeout(function () {
    window.location.href = "/cart";
  }, 1000);
});

function updateTbQuantity() {
  var acqua_tb_products_qty = 1,
    $acqua_tb_quantity_el = $(".acqua_tb_quantity"),
    $global_add_to_cart = $(".global-add-to-cart > button");

  Object.keys(acqua_tb_products).forEach(function (key) {
    if (key == "top" || key == "bottom") acqua_tb_products_qty++;
  });

  $acqua_tb_quantity_el.text(acqua_tb_products_qty);

  if (acqua_tb_products_qty == 2) {
    $global_add_to_cart.removeClass("disabled").prop("disabled", false);
    $global_add_to_cart.html("ADD SET TO BAG");
  } else {
    $global_add_to_cart.addClass("disabled").prop("disabled", true);
  }
}

jQuery(document).on(
  "click",
  ".thumbnails [class^='product-single__thumbnail--']",
  function (e) {
    e.preventDefault();

    var isVideo = false,
      $el = jQuery(this),
      $video_container = jQuery("[id^='AcquaProductVideo-']"),
      $image_container = jQuery("[id^='ProductPhoto-']"),
      clonedEl;

    if ($el.hasClass("video-thumbnail")) isVideo = true;

    if (isVideo) {
      clonedEl = $el.find("video").clone().attr("autoplay", true);
      $video_container.html(clonedEl);
      $video_container.show();
      $image_container.hide();
    } else {
      $video_container.html("");
      $video_container.hide();
      $image_container.show();
    }
  }
);
