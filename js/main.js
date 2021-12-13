const main = $("#main");
let fullPage = null;
//함수 선언  hoisting
loadJson("../data/bigbang.json");
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      const clockList = res.clock;
      let output = "";
      $.each(clockList, function (idx, item) {
        //console.log(item);
        output += `
          <div class="section" style="background-image:url(${item.bg})">
            <div class="info">
              <p class="category" data-splitting>${item.category}</p>
              <h2 class="title" data-splitting>${item.title}</h2>
              <p class="depth" data-splitting><strong>${item.depth}</strong> mm</p>
              <p class="price" data-splitting>CHF ${item.price}</p>
            </div>
          </div>
          `;
      });
      main.html(output);
      Splitting();
      charMotion(`.section:nth-child(1) .char`);
      //      $.fn.fullpage.destroy("all");
      if (fullPage !== null) {
        $.fn.fullpage.destroy("all");
      }
      $("#main").fullpage({
        scrollBar: true,
        onLeave: function (origin, destination, direction) {
          charMotion(`.section:nth-child(${destination.index + 1}) .char`);
        },
      });
      fullPage = $.fn.fullpage;
      console.log(fullPage);
    },
  });
}

function charMotion(char) {
  gsap.from(char, {
    y: -200,
    opacity: 0,
    ease: "bounce",
    duration: 1.5,
    delay: 0.5,
    stagger: {
      //each: 0.01, // 개별갯수
      amount: 0.25, // 전체갯수
      from: "random",
    },
  });
}

// $.get("../data/bigbang.json").done(function (res) {
//   console.log(res);
// });

// loadJson("../data/bigbang.json");
// particlesJS.load("bgParticle", "../data/particlesjs-config.json");

// $("#gnb li a").on("click", function (e) {
//   e.preventDefault();
//   if ($(this).hasClass("selected")) return;
//   $(this).addClass("selected").parent().siblings("li").find("a").removeClass("selected");
//   const jsonFile = $(this).data("json");
//   loadJson(jsonFile);
// });

// function addZero(num) {
//   if (num < 10) {
//     return "0" + num;
//   } else {
//     return "" + num;
//   }
// }

//1번째 배열....
/*
const jsonFileList = ["../data/bigbang.json", "../data/classic.json"];
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const idx = $(this).index();
  console.log(idx);
  loadJson(jsonFileList[0]);
});
*/
const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
  e.preventDefault();
  const jsonFile = $(this).data("json");
  //console.log(jsonFile);
  if ($(this).hasClass("selected")) {
    return;
  }
  $(this).addClass("selected").siblings("li").removeClass("selected");
  loadJson(jsonFile);
});
