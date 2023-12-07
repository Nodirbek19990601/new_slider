class slider {
  constructor({ slider, sliderLine, prev, next, direction,autoPlayTime,autoPlay }) {
    this.slider = document.querySelector(slider);
    this.sliderLine = document.querySelector(sliderLine);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.dir = direction == undefined ? "X" : direction.toUpperCase() == "Y" ? 'Y' : 'X'
    this.slides = [...this.sliderLine.children];
    this.sliderLine.style = `block-size: ${this.height()}px; overflow: hidden ` ;
    this.active = 0
    this.time = autoPlayTime || 5000
    this.moveSize = this.dir == 'X' ? this.sliderLine.clientWidth : this.height()
    this.slides = [...this.sliderLine.children]

    this.slides.forEach((slide, i) => {
      if (this.active != i) {
        slide.style.transform = `translate${this.dir}(${this.moveSize}px)`
      }
      if (i == this.slides.length - 1) {
        slide.style.transform = `translate${this.dir}(${-this.moveSize}px)`
      }
    })
    this.next.addEventListener('click', () =>{
      this.move(this.next)
      clearInterval(this.play)
    })
    this.prev.addEventListener('click', () => {
      this.move(this.prev)
      clearInterval(this.play)
    })
    if (autoPlay) {
      this.play = setInterval(() => {
        this.move(this.next)
      }, this.time);
    }
  }
   
  disableBtn(){
    this.prev.disabled = true 
    this.next.disabled = true 
    setTimeout(() => {
      this.prev.disabled = false
      this.next.disabled = false
    }, 1100);
  }
   
  move(btn) {
    this.disableBtn()
    const moveSlide = btn == this.next ? -this.moveSize : this.moveSize
    this.slides.forEach((slide, i) => {
      if (this.active != i) {
        slide.style.transform = `translate${this.dir}(${-moveSlide}px)`
        slide.style.transition = `0s`
      }
    })
    this.slides[this.active].style.transform = `translate${this.dir}(${moveSlide}px)`
    this.slides[this.active].style.transition = `1s`
    this.changeActive(btn) 
    this.slides[this.active].style.transform = `translate(0)`
    this.slides[this.active].style.transition = `1s`
  }
  changeActive(btn){
    if (btn==this.next) {
      this.active++
      if (this.active >  this.slides.length - 1) {
        this.active = 0
      }
    }
    else if (btn==this.prev) {
      this.active--
      if (this.active<0) {
        this.active = this.slides.length - 1
      }
    }
  }

  height() {
    const size = this.slides.map(slide => slide.clientHeight)
    return Math.max(...size)
  }
};

new slider({
  slider: '.slider',
  sliderLine: '.slider__line',
  prev: '.slider__prev ',
  next: '.slider__next',
  direction: "X",
  autoPlay :true,
  autoPlayTime:3000
})