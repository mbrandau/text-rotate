var TextRotate = function(el, texts, options) {
  if (!options) options = {
    period: 2000,
    speed: 1.0
  };
  this.texts = texts;
  this.el = el;
  this.el.innerHTML = '<span class="wrap">' + this.text + '</span><span class="cursor"></span>';
  this.wrap = this.el.querySelector('.wrap');
  this.cursor = this.el.querySelector('.cursor');
  this.index = 0;
  this.period = parseInt(options.period, 10) || 2000;
  this.speed = parseInt(options.speed, 10) || 1.0;
  this.text = '';
  this.tick();
  this.deleting = false;
};

TextRotate.prototype.tick = function() {
  if(this.index>=this.texts.length)this.index = 0;
  var fullTxt = this.texts[this.index];

  if (this.deleting) this.text = fullTxt.substring(0, this.text.length - 1);
  else this.text = fullTxt.substring(0, this.text.length + 1);

  this.wrap.innerHTML = this.text;

  var that = this;
  var delta = 200 - Math.random() * 70;

  if (this.deleting) delta /= 2;
  delta /= this.speed;

  if (!this.deleting && this.text === fullTxt) {
    delta = this.period;
    this.deleting = true;
  } else if (this.deleting && this.text === '') {
    this.deleting = false;
    this.index++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('text-rotate');
  for (var i = 0; i < elements.length; i++) {
    var texts = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    var speed = elements[i].getAttribute('data-speed');
    if (texts) {
      new TextRotate(elements[i], JSON.parse(texts), {
        period: period,
        speed: speed
      });
    }
  }
};
