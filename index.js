const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const slider = document.querySelector(".slider");

const bgImg = new Image();
bgImg.src = "./images/bg.png";

const parrotImage = new Image();
parrotImage.src = "./images/parrot.png";

const ravenImage = new Image();
ravenImage.src = "./images/raven.png";

const sparrowImage = new Image();
sparrowImage.src = "./images/sparrow.png";

const woodpeckerImage = new Image();
woodpeckerImage.src = "./images/woodpecker.png";

const emuImage = new Image();
emuImage.src = "./images/emu.png";

const selectBar = document.querySelector(".select-bar");

selectBar.addEventListener("input", () => {
  const value = selectBar.value;
  global.selected = value;
  playBirdSound();
});

slider.addEventListener("input", () => {
  let value = Number(slider.value);
  global.speed = value;
  const result = convertValue(value);
  global.birds.forEach((bird) => (bird.interval = result));
});

function convertValue(value) {
  let newValue;
  if (value === 10) newValue = 1;
  if (value === 9) newValue = 2;
  if (value === 8) newValue = 3;
  if (value === 7) newValue = 4;
  if (value === 6) newValue = 5;
  if (value === 5) newValue = 6;
  if (value === 4) newValue = 7;
  if (value === 3) newValue = 8;
  if (value === 2) newValue = 9;
  if (value === 1) newValue = 10;
  return newValue;
}

const global = {
  selected: null,
  speed: 5,
  birds: [],
  backgrounds: [],
};

class Parrot {
  constructor() {
    this.width = 300;
    this.height = 300;
    this.sx = 0;
    this.sy = 0;
    this.x = -100;
    this.y = canvas.height / 2 - this.height / 2 - 10;
    this.count = 0;
    this.interval = global.speed;
    this.frame = 1;
    this.oldFrame = 0;
    this.visible = false;
  }

  draw() {
    this.count++;

    // increment count to interval to determine picture change
    if (this.count >= this.interval) {
      this.count = 0;
      this.frame++;
    }

    // using a verbose way to cycle through images
    if (this.frame === 1) {
      this.sx = 0;
      this.sy = 0;
    } else if (this.frame === 2) {
      this.sx = 640;
      this.sy = 0;
    } else if (this.frame === 3) {
      this.sx = 1280;
      this.sy = 0;
    } else if (this.frame === 4) {
      this.sx = 0;
      this.sy = 640;
    } else if (this.frame === 5) {
      this.sx = 640;
      this.sy = 640;
    } else if (this.frame === 6) {
      this.sx = 1280;
      this.sy = 640;
    } else if (this.frame === 7) {
      this.sx = 0;
      this.sy = 1280;
    } else if (this.frame === 8) {
      this.sx = 640;
      this.sy = 1280;
    } else if (this.frame === 9) {
      this.sx = 1280;
      this.sy = 1280;
    } else if (this.frame === 10) {
      this.frame = 1;
    }

    let sWidth = 640;
    let sHeight = 640;

    ctx.drawImage(
      parrotImage,
      this.sx,
      this.sy,
      sWidth,
      sHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move() {
    const targetX = canvas.width / 2 - this.width / 2 - 20;
    if (this.x <= targetX) this.x += 5;
  }

  update() {
    if (global.selected === "Parrot") {
      this.draw();
      this.move();
    } else {
      this.x = -100;
    }
  }
}

class Raven {
  constructor() {
    this.width = 292.68;
    this.height = 300;
    this.x = -100;
    this.y = canvas.height / 2 - this.height / 2;
    this.sx = 0;
    this.sy = 0;
    this.count = 0;
    this.interval = global.speed;
    this.frame = 0;
  }

  draw() {
    let sWidth = 200.33;
    const sHeight = 205.33;
    this.count++;

    // cycle through images. there is only 1 row so it's pretty easy
    if (this.oldFrame !== this.frame && this.frame <= 8) {
      this.sx = this.frame * 200;
    }

    if (this.frame === 9) this.frame = 0;

    // increment count to interval to determine picture change
    if (this.count >= this.interval) {
      this.count = 0;
      this.frame++;
    }

    ctx.drawImage(
      ravenImage,
      this.sx,
      this.sy,
      sWidth,
      sHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move() {
    const targetX = canvas.width / 2 - this.width / 2;

    if (this.x <= targetX) this.x += 5;
  }

  update() {
    if (global.selected === "Raven") {
      this.draw();
      this.move();
    } else {
      this.x = -100;
    }
  }
}

class Sparrow {
  constructor() {
    this.height = 300;
    this.width = 300;
    this.x = -100;
    this.y = canvas.height / 2 - this.height / 2;
    this.sx = 0;
    this.sy = 0;
    this.count = 0;
    this.interval = global.speed;
    this.frame = 0;
    this.oldFrame = 0;
  }

  draw() {
    this.count++;

    // increment count to interval to determine picture change
    if (this.count >= this.interval) {
      this.count = 0;
      this.frame++;
    }

    // cycle through images of first row
    if (this.oldFrame !== this.frame && this.frame < 5) {
      this.oldFrame = this.frame;
      this.sx += 400;
    }

    // increase sy to target second row images
    if (this.frame === 5) {
      this.sy += 400;
      this.sx = 0;
      this.frame = 6;
    }

    // cycle through images of second row
    if (this.oldFrame !== this.frame && this.frame < 10 && this.frame > 5) {
      this.oldFrame = this.frame;
      this.sx += 400;
    }

    // set sy=0 and sx=0 to target first row images again
    if (this.frame === 9) {
      this.oldFrame = 0;
      this.frame = 0;
      this.sx = 0;
      this.sy = 0;
    }

    const sWidth = 400;
    const sHeight = 400;
    ctx.drawImage(
      sparrowImage,
      this.sx,
      this.sy,
      sWidth,
      sHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move() {
    const targetX = canvas.width / 2 - this.width / 2;
    if (this.x <= targetX) this.x += 5;
  }

  update() {
    if (global.selected === "Sparrow") {
      this.draw();
      this.move();
    } else {
      this.x = -100;
    }
  }
}

class Woodpecker {
  constructor() {
    this.width = 100;
    this.height = 100;
    this.x = -100;
    this.y = canvas.height / 2 - this.height / 2;
    this.sx = 0;
    this.sy = 0;
    this.count = 0;
    this.interval = global.speed;
    this.frame = 0;
    this.oldFrame = 0;
  }

  draw() {
    const sWidth = 100;
    const sHeight = 100;
    this.count++;

    // increment count to interval to determine picture change
    if (this.count >= this.interval) {
      this.frame++;
      this.count = 0;
    }

    // cycle through the first row of sprites
    if (this.oldFrame !== this.frame && this.frame <= 4 && this.frame > 0) {
      this.oldFrame = this.frame;
      this.sy = 0;
      this.sx += sWidth;
    }

    // move to second row
    if (this.oldFrame !== this.frame && this.frame === 5) {
      this.oldFrame = this.frame;
      this.sy = 100;
      this.sx = 0;
    }

    // cycle through second row of sprites
    if (this.oldFrame !== this.frame && this.frame <= 9 && this.frame > 5) {
      this.oldFrame = this.frame;
      this.sx += sWidth;
    }

    // move to third row
    if (this.oldFrame !== this.frame && this.frame === 10) {
      this.sx = 0;
      this.sy = 200;
    }

    // cycle through third row of sprites
    if (this.oldFrame !== this.frame && this.frame > 10) {
      this.oldFrame = this.frame;
      this.sx += sWidth;
    }

    // return to first row and reset
    if (this.frame === 14) {
      this.frame = 0;
      this.oldFrame = this.frame;
      this.sx = 0;
      this.sy = 0;
    }

    ctx.drawImage(
      woodpeckerImage,
      this.sx,
      this.sy,
      sWidth,
      sHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move() {
    const targetX = canvas.width / 2 - this.width / 2;
    if (this.x <= targetX) this.x += 5;
  }

  update() {
    if (global.selected === "Woodpecker") {
      this.draw();
      this.move();
    } else {
      this.x = -100;
    }
  }
}

class Emu {
  constructor() {
    this.height = 200;
    this.width = 200;
    this.x = -100;
    this.y = canvas.height - 200;
    this.sx = 0;
    this.sy = 0;
    this.count = 0;
    this.interval = global.speed;
    this.frame = 0;
  }

  draw() {
    const sWidth = 125;
    const sHeight = 125;

    this.count++;

    // increment count to interval to determine picture change
    if (this.count >= this.interval) {
      this.count = 0;
      this.frame++;
    }

    // cycle through first row of sprites
    if (this.oldFrame !== this.frame && this.frame <= 5 && this.frame > 0) {
      this.oldFrame = this.frame;
      this.sx += sWidth;
    }

    // move down to second row of sprites
    if (this.frame === 6) {
      this.sy = 125;
      this.sx = 0;
    }

    // cycle through second row of sprites
    if (this.oldFrame !== this.frame && this.frame > 6) {
      this.oldFrame = this.frame;
      this.sx += sWidth;
    }

    // move back to first row of sprites and reset
    if (this.frame === 12) {
      this.sx = 0;
      this.sy = 0;
      this.frame = 0;
    }

    ctx.drawImage(
      emuImage,
      this.sx,
      this.sy,
      sWidth,
      sHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move() {
    const targetX = canvas.width / 2 - this.width / 2;
    if (this.x <= targetX) this.x += 5;
  }

  update() {
    if (global.selected === "Emu") {
      this.draw();
      this.move();
    } else {
      this.x = -100;
    }
  }
}

function createBirds() {
  const parrot = new Parrot();
  global.birds.push(parrot);

  const raven = new Raven();
  global.birds.push(raven);

  const sparrow = new Sparrow();
  global.birds.push(sparrow);

  const woodpecker = new Woodpecker();
  global.birds.push(woodpecker);

  const emu = new Emu();
  global.birds.push(emu);
}

class BackgroundImage {
  constructor(x) {
    this.x = x;
    this.y = 0;
  }

  draw() {
    if (global.selected !== "Select a Bird" && global.selected !== null) {
      this.x--;
    }

    ctx.drawImage(bgImg, this.x, this.y);

    if (this.x <= -672) this.x = 672;
  }

  update() {
    this.draw();
  }
}

function playBirdSound() {
  const value = global.selected;

  if (value === "Parrot") {
    const audio = new Audio("./audio/parrot.mp3");
    audio.volume = 0.3;
    audio.play();
  }
  if (value === "Raven") {
    const audio = new Audio("./audio/raven.mp3");
    audio.volume = 0.2;
    audio.play();
  }
  if (value === "Sparrow") {
    const audio = new Audio("./audio/sparrow.mp3");
    audio.volume = 0.2;
    audio.play();
  }
  if (value === "Woodpecker") {
    const audio = new Audio("./audio/woodpecker.mp3");
    audio.volume = 0.3;
    audio.play();
  }
  if (value === "Emu") {
    const audio = new Audio("./audio/emu.mp3");
    audio.volume = 0.3;
    audio.play();
  }
}

const bg1 = new BackgroundImage(0);
global.backgrounds.push(bg1);
const bg2 = new BackgroundImage(672);
global.backgrounds.push(bg2);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  global.backgrounds.forEach((background) => background.update());
  global.birds.forEach((bird) => bird.update());
  window.requestAnimationFrame(animate);
}

animate();
createBirds();
