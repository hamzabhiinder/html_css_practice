function loco() {
  console.log('hey')
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco()

function printingText(pageSelect,triggerScroll) {
  var clutter = ""

document.querySelector(pageSelect).textContent.split("").map((text) => {
  clutter += `<span>${text}</span>`
  console.log(`clutter ${clutter}`)
  document.querySelector(pageSelect).innerHTML = clutter;
})

gsap.to(triggerScroll, {
  scrollTrigger: {
    trigger: triggerScroll,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
  },
  stagger: .2,
  color: `#fff`
})
}
printingText("#page2>h1",`#page2>h1>span`)
function canvas() {
  const canvas = document.querySelector("#page3>canvas");
  
  const context = canvas.getContext("2d");
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  window.addEventListener('resize', () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    render();
  })

  function files(index) {
    var data = `
    ./assets/frames00007.png
    ./assets/frames00010.png
    ./assets/frames00013.png
    ./assets/frames00016.png
    ./assets/frames00019.png
    ./assets/frames00022.png
    ./assets/frames00025.png
    ./assets/frames00028.png
    ./assets/frames00031.png
    ./assets/frames00034.png
    ./assets/frames00037.png
    ./assets/frames00040.png
    ./assets/frames00043.png
    ./assets/frames00046.png
    ./assets/frames00049.png
    ./assets/frames00052.png
    ./assets/frames00055.png
    ./assets/frames00058.png
    ./assets/frames00061.png
    ./assets/frames00064.png
    ./assets/frames00067.png
    ./assets/frames00070.png
    ./assets/frames00073.png
    ./assets/frames00076.png
    ./assets/frames00079.png
    ./assets/frames00082.png
    ./assets/frames00085.png
    ./assets/frames00088.png
    ./assets/frames00091.png
    ./assets/frames00094.png
    ./assets/frames00097.png
    ./assets/frames00100.png
    ./assets/frames00103.png
    ./assets/frames00106.png
    ./assets/frames00109.png
    ./assets/frames00112.png
    ./assets/frames00115.png
    ./assets/frames00118.png
    ./assets/frames00121.png
    ./assets/frames00124.png
    ./assets/frames00127.png
    ./assets/frames00130.png
    ./assets/frames00133.png
    ./assets/frames00136.png
    ./assets/frames00139.png
    ./assets/frames00142.png
    ./assets/frames00145.png
    ./assets/frames00148.png
    ./assets/frames00151.png
    ./assets/frames00154.png
    ./assets/frames00157.png
    ./assets/frames00160.png
    ./assets/frames00163.png
    ./assets/frames00166.png
    ./assets/frames00169.png
    ./assets/frames00172.png
    ./assets/frames00175.png
    ./assets/frames00178.png
    ./assets/frames00181.png
    ./assets/frames00184.png
    ./assets/frames00187.png
    ./assets/frames00190.png
    ./assets/frames00193.png
    ./assets/frames00196.png
    ./assets/frames00199.png
    ./assets/frames00202.png
   `;
    return data.split('\n')[index];
  }

  const frameCount = 67;
  const image = [];
  const imageSeq = {
    frame: 1
  }

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    image.push(img);
  }

  gsap.to(imageSeq,{
    frame:frameCount-1,
    snap:"frame",
    ease:"none",
    scrollTrigger:{
      scrub:0.5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });


  image[1].onload=render;



  function render() {
    scaleImage(image[imageSeq.frame], context);
  }
  
  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
  
    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
  canvas()

  printingText("#page4>h1",`#page4>h1>span`)