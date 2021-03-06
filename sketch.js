var VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
  VerletParticle2D = toxi.physics2d.VerletParticle2D,
  VerletSpring2D = toxi.physics2d.VerletSpring2D,
  VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D,
  Vec2D = toxi.geom.Vec2D,
  Rect = toxi.geom.Rect;

let GravityBehavior = toxi.physics2d.behaviors.ConstantForceBehavior;

const particles = [];
const springs = [];
const springRow = [];

let physics;

function setup() {
  physics = new VerletPhysics2D();
  // const gravity = new Vec2D(0, 1);
  // const gb = new GravityBehavior(gravity);
  // physics.addBehavior(gb);

  fill(50);
  createCanvas(600, 600);
  background(40);

  //The border around all of it.
  const border = 50;

  //The number of rows and columns.
  const columns = 20;
  const rows = 20;

  const x = (width - border * 2) / columns;
  const y = (height - border * 2) / rows;
  console.log(x, y);

  //Creates a grid of Verlet particles and pushes them to the particles array.
  for (let i = 0; i < rows; i++) {
    const particleRow = [];
    let yPos = y * i + border + y / 2;
    for (let j = 0; j < columns; j++) {
      let xPos = x * j + border + x / 2;
      let p = new Particle(xPos, yPos);
      particleRow.push(p);
      physics.addParticle(p);
    }
    particles.push(particleRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // console.log(i);
      particles[j][i].setAngleStart(i, j, columns);
    }
  }

  //Add a spring
  // 1. access two particles
  // let a = particles[i][j];
  // let b = particles[i][j + 1];
  // 2. Create a new spring (particle1, particle2, length?, springiness? ).
  // let s = new Spring(a, b, 20, 0.5);
  // 3. Add it to the springs array.
  // springs.push(s);
  // 4. Add it to the physics.
  // physics.addSpring(s);
}

let run = true;
function keyPressed(e) {
  if (keyCode === 32) {
    run = !run;
    run ? loop() : noLoop();
  }
}

function draw() {
  background(40);
  physics.update();

  particles.forEach((row) => {
    row.forEach((p) => {
      p.update();
      p.setPosition();
      // p.display();
      p.displayOffset();
    });
  });

  springs.forEach((s) => {
    s.display();
  });
}
