

const canvas = document.querySelector(".canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 51;

const currentFrame = (index) => `./EditedMontage/${(index + 1).toString()}.jpg`;
const images = [];
let pic = { frame : 0};

for (let i = 0; i < frameCount; i++){
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

console.log(images);

gsap.to(pic, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'ease-in-out',
    scrollTrigger: {
        scrub: true,
        pin:'canvas',
        end: '400%',
    },
    onUpdate: render,
});

// gsap.fromTo(".scroll-text", { opacity: 1}, { opacity: 0, scrollTrigger: {
//     scrub: true,
//     end: '5%',
//     },
//     onComplete: () => {
//         gsap.to(".scroll-text", {opacity: 0});
//     }

// })

images[0].onload = render;

function render() {

    context.canvas.width = images[0].width;
    context.canvas.height = images[0].height;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[pic.frame], 0, 0);
}



// SCROLL ANIM

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }   else {
            entry.target.classList.remove('show');
        }
    });
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));