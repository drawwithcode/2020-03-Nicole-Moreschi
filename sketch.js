let peopleInSpace = [];
let int = 0;

let song1;
// let song2;
let analyzer;

function preload() {
  song1 = loadSound("music1.mp3");
  // song2 = loadSound("music2.mp3");
  myData = loadJSON("peopleinspace.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  console.log(myData)

  analyzer = new p5.Amplitude();

  analyzer.setInput(song1);

  song1.loop();

  for (let i = 0; i < myData.people.length; i++) {
    addPeople(
      random(windowWidth),
      random(windowHeight),
      myData.people[i].music,
      myData.people[i].rate,
    )
  }

}




function draw() {
  background(255)
  let volume = 0;


  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 20, width / 2)

  console.log(volume);

  push()
  noStroke();
  fill(50, 50, 50, 10)
  ellipse(width / 2, height / 2, volume * 2);
  pop()

  push()
  fill(100);
  textAlign(CENTER);
  text("Click to play music", width / 2, height - 100)
  pop()

  for (let i = 0; i < peopleInSpace.length; i++) {
    peopleInSpace[i].run();
  }
}


function addPeople(x, y, size, music, rate) {
  let bubbleColor;
  if (music == "1") {
    bubbleColor = "orange";
  } else {
    bubbleColor = "teal";
  }
  const aNewBubble = new Bubble(x, y, bubbleColor)
  peopleInSpace.push(aNewBubble);

}

function mouseClicked() {
  if (song1.isPlaying() == false) {
    song1.play()
    int = 1;
  } else {
    song1.stop()
    int = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


class Bubble {
  constructor(temp_x, temp_y, temp_color, vol) {
    this.x = temp_x;
    this.y = temp_y;
    this.color = temp_color;
    // this.music = myData.people.music;
    // this.rate = myData.people.rate;
    this.size = vol;
    vol = analyzer.getLevel();
    vol = map(this.size, 0, 1, 1, 20)

    this.speed = 2;
    this.yDir = 1;
    this.xDir = 1;
  }

  display() {
    push();
    noStroke();
    fill(color(this.color));
    ellipse(this.x, this.y, 10);
    pop();
  }


  updatePosition() {
    this.x += this.speed * this.xDir;
    this.y += this.speed * this.yDir;
    if (this.y >= height || this.y <= 0) {
      this.yDir *= -1;
    }
    if (this.x >= width || this.x <= 0) {
      this.xDir *= -1;
    }
  }

  run() {
    if (int === 1) {
      this.updatePosition()
    };
    this.display();
  }
}
