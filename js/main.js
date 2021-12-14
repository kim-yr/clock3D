const main = $("#main");
const itemUL = $("#main #itemList");
let fullPage = null;
//함수 선언  hoisting
// loadJson("../data/bigbang.json");
function loadJson(jsonFile) {
  $.ajax({
    url: jsonFile,
    success: function (res) {
      const clockList = res.clock;
      let output = "";
      $.each(clockList, function (idx, item) {
        //console.log(item);
        output += `
        <li>
        <div class="card">
          <div class="front face">
            <div class="img"><img src="${item.bg}" alt="" /></div>
          </div>
          <div class="back face">
            <div class="info">
              <p class="category">${item.category}</p>
              <h2 class="title">${item.title}</h2>
              <div class="depth">${item.depth}</div>
              <div class="price">${item.price} CHN</div>
            </div>
          </div>
        </div>
      </li>
          `;
      });
      itemUL.html(output);
    },
  });
}

loadJson("../data/bigbang.json");

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
//ajax는 비동기인데 비동기에는 이벤트 못 검
// $("#itemList li .card").on("click", function(){}) <- 이거 작동 안됨
//ajax안에 쓰든지, 이벤트 위임(아래)
$("#itemList").on("click", "li .card", function () {
  const tr = !$(this).parent().hasClass("on") ? 180 : 0;
  console.log(tr);
  $(this).parent().toggleClass("on");
  gsap.to(this, { rotateY: tr, duration: 1, ease: "back.inOut" });
});
