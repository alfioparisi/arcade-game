/* this is the select character screen */

function charSelection() {
    var cw = 505, //canvas width
        ch = 606, //canvas height
        slideNumber = 0,
        $slide,
        btn;

    //set a background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);

    //slideshow
    $slide = $(".slide");

    btn = $("[name=next]");
    btn.on("click", function() {
        $slide.hide();
        if (slideNumber === $slide.length - 1) {
            slideNumber = 0;
        } else {
            slideNumber++;
        }
        $($slide[slideNumber]).fadeIn();
        console.log($slide);
    });

    btn = $("[name=prev]");
    btn.on("click", function() {
        $slide.hide();
        if (slideNumber === 0) {
            slideNumber = $slide.length - 1;
        } else {
            slideNumber--;
        }
        $($slide[slideNumber]).fadeIn();
    });

    $($slide[slideNumber]).show();
}
