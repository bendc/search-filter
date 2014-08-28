document.addEventListener("DOMContentLoaded", function() {
  "use strict"

  var style = ""
    + "<style>"
    +   "input.animated-search-filter {"
    +     "-webkit-tap-highlight-color: transparent;"
    +   "}"
    +   ".animated-search-filter .hidden {"
    +     "opacity: 0;"
    +     "pointer-events: none;"
    +   "}"
    +   ".animated-search-filter > * {"
    +     "position: absolute;"
    +     "transition: .5s;"
    +   "}"
    + "</style>"

  document.head.insertAdjacentHTML("beforeend", style)

  var items = document.querySelectorAll(".animated-search-filter > *")
  var itemHeight = items[0].offsetHeight
  var texts = []
  var i = -1
  var len = items.length
  var transform = "transform" in document.body.style ? "transform" : "webkitTransform"

  while (++i < len) {
    texts.push(items[i].textContent.trim())
    items[i].style[transform] = "translateY(" + i*itemHeight +"px)"
  }

  document.querySelector("input.animated-search-filter").addEventListener("input", function() {
    var re = new RegExp(this.value, "i")
    texts.forEach(function(element, index) {
      if (re.test(element)) {
        items[index].classList.remove("hidden")
      }
      else {
        items[index].classList.add("hidden")
      }
      var i = -1
      var position = 0
      while (++i < len) {
        if (items[i].className != "hidden") {
          items[i].style[transform] = "translateY(" + position++ * itemHeight + "px)"
        }
      }
    })
  })
})
