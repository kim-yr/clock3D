const main = $("#main");
$.ajax({
  url: "../data/bigbang.json",
  success: function (res) {
    console.log(res);
    const clockList = res.clock;
    //forEach(function(item,idx){})
    let output = "";
    $.each(clockList, function (idx, item) {
      //console.log(item);
      output += `
      <div class="section">
        <div class="info">
          <p class="category">${item.category}</p>
          <h2 class="title">${item.title}</h2>
          <p class="depth">${item.depth}MM</p>
          <p class="price">CHF ${item.price}</p>
        </div>
      </div>
      `;
    });
    main.html(output);
  },
});

// $.get("../data/bigbang.json").done(function (res) {
//   console.log(res);
// });
