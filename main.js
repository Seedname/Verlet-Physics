var possible;
var lines = [];

function setup() { 
	createCanvas(document.body.clientWidth, window.innerHeight); 
    system = new System(width-40, 40, -1, 0);
    // for (let i = 0; i < 10)
    lines.push(new Line(0, 0, width, height));
    // possible = [color(0, 255, 255), color(128, 0, 128), color(255, 0, 255)];
    possible = [color(0, 0, 255), color(0, 0, 200), color(0, 100, 200), color(0, 150, 200)]

    for (var i = 0; i < 100; i++) {
        system.x = random(6, width-6);
        system.y = random(6, height-6)
        system.addBall(possible[~~(Math.random()*possible.length)]);
    }
    start = millis();

    
}
var scl = 1;

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.p0 = createVector(x1, y1);
    this.p1 = createVector(x2, y2);
    
    this.normal = createVector(y2 - y1, x1 - x2);
    this.normal.normalize();

    this.display = function() {
        line(this.x1, this.y1, this.x2, this.y2);
    }

    this.collide = function(ball){
        //P(t) = A + (B-A)*t {0 <= t <= 1}
        //P*P = r^2
        //D*D*t^2 + 2*A*D + A*A - r^2 = 0
        var A = p5.Vector.sub(this.p0, ball.pos);
        var B = p5.Vector.sub(this.p1, ball.pos);
        var D = p5.Vector.sub(B, A);
        
        var a = D.dot(D);
        var b = A.dot(D) * 2;
        var c = A.dot(A)-sq(ball.r);

        if(sq(b) - 4*a*c > 0) {
            var t = (-b + sqrt(sq(b) - 4*a*c))/(2*a);
            if(0 <= t && t <= 1) {
                
                // var d =  ball.r;
                var p = p5.Vector.add(this.p0, p5.Vector.mult(p5.Vector.sub(this.p1, this.p0), t));
                // ellipse(p.x, p.y, 100, 100);
                // print(p);
                var line = p5.Vector.sub(ball.pos, p);
                var dist = line.mag();
                // print(dist);
                // print(dist);

                var vel = p5.Vector.sub(ball.old, ball.pos);

                var n = p5.Vector.div(line, dist);
                var delta = ball.r-dist;

                // ball.old.set(p5.Vector.add(p, p5.Vector.mult(this.normal, ball.r)));
                // ball.pos.add(p5.Vector.mult(this.normal, 1));
                // ball.pos.x += ReadableByteStreamController.

                var inside = p5.Vector.mult(n, 2*delta);
                print(inside);
                var angle = atan2(this.y2-this.y1, this.x2-this.x1);

                ball.pos.add(vel);
                ball.pos.add(inside);
                // ball.accelerate(createVector(50*cos(angle), 50*sin(angle)));
                // print(p);
                // var v = ball.vel,
                // a2 = v.dot(v), 
                // b2 = p.dot(v) * 2,
                // c2 = p.dot(p) - d*d,
                // t2 = (-b2 + sqrt(b2*b2 - 4*a2*c2)) / (2*a2);
    
                // // ball.pos.add(p5.Vector.mult(ball.vel, t2));
                
                // var vf = p5.Vector.mult(this.normal, -2*ball.vel.dot(this.normal));
                // ball.vel.add(vf);
                
                // ball.pos.add(p5.Vector.mult(ball.vel, -t2));
            }
        }
    };
}
function clr(red, green, blue) {
    if(red && !green) {
        let r = (red >> 16) & 0xFF;
        let green = (red >> 8) & 0xFF;
        let blue = red & 0xFF;
        return color(r, green, blue);
    } else {
        let rgb = red;
        rgb = (rgb << 8) + green;
        rgb = (rgb << 8) + blue;
        return rgb;
    }
}

var mapSprite = [[-16711936,-16711936,-16711936,-16711936,-16711936,-65536,-65536,-65536,-65536,-16711936,-16711936,-16711936,-16711936,-16711936],[-16711936,-16711936,-16711936,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-16711936,-16711936,-16711936],[-16711936,-16711936,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-16711936,-16711936],[-16711936,-65536,-1,-1,-65536,-65536,-65536,-65536,-1,-1,-65536,-65536,-65536,-16711936],[-16711936,-1,-1,-1,-1,-65536,-65536,-1,-1,-1,-1,-65536,-65536,-16711936],[-16711936,-14408452,-14408452,-1,-1,-65536,-65536,-14408452,-14408452,-1,-1,-65536,-65536,-16711936],[-65536,-14408452,-14408452,-1,-1,-65536,-65536,-14408452,-14408452,-1,-1,-65536,-65536,-65536],[-65536,-65536,-1,-1,-65536,-65536,-65536,-65536,-1,-1,-65536,-65536,-65536,-65536],[-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536],[-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536],[-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536],[-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536],[-65536,-65536,-65536,-65536,-16711936,-65536,-65536,-65536,-65536,-16711936,-65536,-65536,-65536,-65536],[-16711936,-65536,-65536,-16711936,-16711936,-16711936,-65536,-65536,-16711936,-16711936,-16711936,-65536,-65536,-16711936]];
function Ball(x, y, color) {
    this.pos = createVector(x, y);
    this.old =  createVector(x, y);
    this.acc = createVector(0, 0);
    this.r = random(5, 8);
    
    this.color = color;

    this.friction = 1;
    
    this.update = function(dt) {
        var vel = p5.Vector.sub(this.pos, this.old);
        this.old.set(this.pos);
        
        this.pos.add(vel);

        this.pos.add(p5.Vector.mult(this.acc, dt*dt));

        this.acc.set(0, 0);
    };
    
    this.accelerate = function(acc) {
        this.acc.add(acc);
    };
    
    this.display = function() {
        fill(this.color);
        // fill(255);
        // stroke(this.color);
        ellipse(this.pos.x, this.pos.y, 2*this.r, 2*this.r);    
        // rect(this.pos.x-this.r, this.pos.y-this.r, 2*this.r, 2*this.r, 3)
    };
}
function System(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    
    var gravity = createVector(0, 0.1);
    this.balls = [];
    
    this.samples = 8;
    
    this.addBall = function(color) {
        this.balls.push(new Ball(this.x, this.y, color));
    };
    
    this.update = function() {
        var subDt = 1/this.samples;
        
        for(var i = this.samples; i >= 0; i--) {
            // this.addGrid();
            
            this.accelerate(gravity);
            
            if(mouseIsPressed) {
                this.attract(mouseX, mouseY);
            }
            // this.attract(width/2, height/2);
            this.constrain();
            this.collide();
            this.move(subDt);

        }
        
        noStroke();
        this.display();
    };
    
    // this.addGrid = function() {
    //   grid = Array(n).fill(Array(m).fill([]));
       
    //     for (var i = 0; i < this.balls.length; i++) {
    //         var i1 = ~~(this.balls[i].pos.x/w);
    //         var j1 = ~~(this.balls[i].pos.y/w);
    //         grid[i1][j1].push(i);
    //     }
    // };
    
    this.move = function(dt) {
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].update(dt);
        }
    };
    
    this.accelerate = function() {
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].accelerate(gravity);
        }
    };
    
    this.display = function() {
        // ellipse(300, 300, 2*200, 2*200);
        // ellipse(this.x, this.y, 100, 100);
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].display();
        }
    };
    
    this.constrain = function() {
        for (var i = 0; i < this.balls.length; i++) {
            var ball = this.balls[i];
  
            if(ball.pos.x+ball.r > width) {
                ball.pos.x = width-ball.r;
                // ball.applyFriction(groundFriction);
            } else if(ball.pos.x-ball.r < 0) {
                ball.pos.x = ball.r;
                // ball.applyFriction(groundFriction);
            }
            
            if(ball.pos.y+ball.r > height) {
                ball.pos.y = height-ball.r;
                // ball.applyFriction(groundFriction);
            } else if(ball.pos.y-ball.r < 0) {
                ball.pos.y = ball.r;
                // ball.applyFriction(groundFriction);
            }
        }
    };
    
    // this.checkCollision = function(cell1, cell2) {
    //     for (var i = 0; i < cell1.length; i++) {
    //         var ball1 = this.balls[cell1[i]];
    //         for(var j = 0; j < cell2.length; j++) {
    //             var ball2 = this.balls[cell2[j]];
                
    //             if (ball1 !== ball2) {
    //                 var line = p5.Vector.sub(ball1.pos, ball2.pos);
    //                 var dist = line.mag();
                    
    //                 if(dist < ball1.r + ball2.r) {
    //                     var n = p5.Vector.div(line, dist);
    //                     var delta = ball1.r+ball2.r-dist;
                        
    //                     var inside = p5.Vector.mult(n, 0.5*delta);
    //                     ball1.pos.add(inside);
    //                     ball2.pos.sub(inside);   
    //                 }
    //             }
    //         }
    //     }
    // };
    
    this.collide = function() {
        // for (var i = 1; i < n-1; i++) {
        //     for (var j = 1; j < m-1; j++) {
        //         var cell1 = grid[i][j];
        //         if(cell1.length > 0) {
        //             for (var dx = -1; dx <= 1; dx++) {
        //                 for (var dy = -1; dy <= 1; dy++) {
        //                     var cell2 = grid[i+dx][j+dy];
        //                     if(cell2.length > 0) {
        //                         this.checkCollision(cell1, cell2);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        
        for (var i = 0; i < this.balls.length; i++) {
            var ball1 = this.balls[i];
            for(var j = i+1; j < this.balls.length; j++) {
                var ball2 = this.balls[j];
                
                if (ball1 !== ball2) {
                    var line = p5.Vector.sub(ball1.pos, ball2.pos);
                    var dist = line.mag();
                    // print(dist);
                    if(dist < ball1.r + ball2.r && dist > 0) {
                        var n = p5.Vector.div(line, dist);
                        var delta = ball1.r+ball2.r-dist;
                        
                        var inside = p5.Vector.mult(n, 0.5*delta);
                        ball1.pos.add(inside);
                        ball2.pos.sub(inside);   

                        if(frameCount < 10) {
                            ball1.old.set(ball1.pos);
                            ball2.old.set(ball2.pos);
                        }
                        
                        // ball1.applyFriction(collisionFriction);
                        // ball2.applyFriction(collisionFriction);
                    }
                }
            }

            // for (let j = 0; j < lines.length; j++) {
            //     lines[j].collide(ball1);
                
            //     // if (lines[i].collide(ball1)) {

            //     // }
            // }
        }
        
    };

    this.attract = function(x, y) {
        var pos = createVector(x, y);
        for(var i = 0; i < this.balls.length; i++) {
            var ball = this.balls[i];
            
            var diff = p5.Vector.sub(pos, ball.pos);
            var unit = p5.Vector.normalize(diff);
    
            var dot = diff.dot(diff);
            dot = constrain(dot, sq(2 * (40)), Infinity);
            
            var force = p5.Vector.mult(unit, (8000 * 0.25 * 10) / dot);
            // println(force);
            ball.accelerate(p5.Vector.div(force, 1));
        }
    };
    
}

var system, start;
var index = 0;

function mapToSprite(sprite) {
    var w = width/sprite.length;
    var h = height/sprite[0].length;
    
    var colors = [];
    for (var k = 0; k < system.balls.length; k++) {
        var ball = system.balls[k];
        var i = ~~(ball.pos.x/w);
        var j = ~~(ball.pos.y/h);

        ball.color = clr(sprite[j][i]);
        if(sprite[j][i] == -16711936 || !ball.color) {
            ball.color = color(40, 40, 40);
            sprite[j][i] = clr(40, 40, 40);
        }
        colors.push(sprite[j][i]);
    }
    
    var json = (function(w) { return this[w]; })("JSON");
    print(json.stringify(colors));

}

var colors = [-65536,-1,-65536,-65536,-65536,-65536,-65536,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-14408452,-65536,2631720,-14408452,-65536,-65536,-65536,2631720,-1,-65536,-65536,2631720,-14408452,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-14408452,-65536,-1,2631720,-65536,-65536,-65536,2631720,-65536,-65536,2631720,-65536,2631720,2631720,-65536,-14408452,2631720,-65536,-65536,-65536,-14408452,-1,-65536,-65536,-65536,-65536,-65536,-1,-65536,-65536,-1,-14408452,-65536,-14408452,-65536,-65536,-65536,2631720,-65536,-1,-65536,-65536,-65536,-65536,-1,-65536,-1,-65536,-1,-65536,-65536,-65536,-65536,-65536,-65536,-1,-65536,-65536,-65536,-1,-1,-14408452,-1,2631720,-1,-65536,-65536,-65536,-65536,2631720,2631720,-65536,-14408452,2631720,-65536,-65536,-65536,-65536,-65536,-65536,2631720,-65536,-65536,-65536,2631720,-65536,-14408452,2631720,-65536,-1,-65536,-65536,2631720,-1,-1,-65536,-65536,-1,2631720,-65536,2631720,-65536,2631720,-65536,-65536,-65536,-65536,2631720,-65536,-1,-65536,-1,-65536,-65536,2631720,-1,2631720,2631720,2631720,2631720,-65536,2631720,-65536,-65536,-14408452,2631720,2631720,2631720,2631720,2631720,2631720,2631720,2631720,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-1,2631720,2631720,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,2631720,-65536,-65536,-14408452,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-1,-1,-65536,-65536,-65536,-65536,-65536,-65536,-65536,2631720,-14408452,-65536,-1,-1,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-1,2631720,-14408452,-65536,-65536,-65536,-65536,-65536,-14408452,-14408452,-65536,-65536,-65536,-65536,-65536,-1,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-14408452,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-1,-1,-65536,-1,-65536,-65536,-65536,-14408452,-65536,-65536,-65536,-1,-65536,-65536,-1,-14408452,-1,-65536,-65536,-1,-14408452,-65536,-65536,-65536,-65536,-1,-65536,-1,-65536,-1,-1,-65536,-65536,-1,-65536,-65536,-65536,-65536,-65536,-65536,-65536,2631720,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,2631720,-65536,-65536,2631720,-65536,-65536,-65536,2631720,-65536,2631720,-65536,-65536,-65536,-65536,2631720,-65536,-65536,-65536,-65536,-65536,-65536,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,2631720,-65536,2631720,2631720,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,2631720,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-1,-1,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-65536,-1,-1,-65536,-65536,-65536,-1,-65536,-1,-1,-65536,-1,-1,-65536,-1,-1,-1,-65536,-65536,-1,2631720,-65536,2631720,-65536,-65536,-65536,-65536,2631720,-65536,-65536,-65536,2631720,-65536,-65536,2631720,2631720,-65536,-65536,2631720,2631720,2631720,2631720,2631720,2631720,2631720];
colors = [];
var index = 0;
var snapshot = false;
var delay = 10;
var finished = 0;
 

function draw() {
    var elapsed = millis()-start;
    if(system.balls.length < 250) {
        system.x = width/2 + width/2 * Math.cos(elapsed);
        system.y = height/2 + height/2 * Math.sin(elapsed);
        if(frameCount % 1 === 0) {
            system.addBall(possible[~~(Math.random()*possible.length)]);
            index ++;
        }
    }
    // } else if(!snapshot && finished != 0 && elapsed > finished+delay) {
    //     snapshot = true;
    //     mapToSprite(mapSprite);
    // } else {
    //     finished = elapsed;
    // }

    background(0);
    system.update();
    // stroke(255);
    // for(let i = 0; i < lines.length; i++) {
    //     lines[i].display();
    // }
}
