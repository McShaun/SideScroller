float canvasx = screen.width;//13001
float canvasy = screen.height;//600
float x = 1360;
//cloud variables
float minimum_speed = -0.001;//0.001
float max_speed = -1;// 1

float minimum_y = 50;
float maximum_y = 100;

float minimum_x = 10000 + screen.width;
float minimum_y = 75 + screen.width;

float t = 1;
float r = 1;
var clouds = [];
float cloudspeed = 1;
boolean sun_animate = false;
boolean balls_animate = false;

// Xsize of ball,    Ysize of ball,    total vertical displacement of ball,   "Gravity" (The higher the number the lower gravity is)
// Overall speed of ball,   X speed,   starting x,   cut rate (1.005 "Deflated" -> 1.001 "Inflated")
Ball first = new Ball(100, 100, 500, 25, 2, 17, 500, 1.002);
Ball second = new Ball(20, 20, 500, 25, 2, 17, 200, 1.001);
Ball third = new Ball(35, 35, 600, 50, 2, 20, 100, 1.005);
Ball fourth = new Ball(33.567, 33.567, 500, 25, 2, 17, 700, 1.003);
Ball fifth = new Ball(50, 50, 500, 25, 2, 17, 48, 1.004);
Ball Sixth = new Ball(24, 24, 700, 45, 3, 78, 5, 1.001);
//player main_player = new player(5);

noStroke();



void setup() {
	size(canvasx, canvasy);
	for(var i = 0; i < 25; i++){
		clouds.push({x:random(50, screen.width), y:random(minimum_y, maximum_y), speed:random(minimum_speed, max_speed)});
	}
}
void draw() {
	// White Ground
	background(186, 255, 232);
	if(sun_animate === true){
		sun();
	}
	fill(255, 255, 255);
	rect(0, canvasy / 1.18153846, canvasx + 10, canvasy / 2);
	// Clouds
	updatecloud(clouds);
	drawcloud(clouds);
	if(balls_animate === true){
		// Ball Animation
		first.animate();
		second.animate();
		third.animate();
		fourth.animate();
		fifth.animate();
	}
	if(sun_animate === true){
		fill(0, 0, 0, (100*sin(t * 0.01))+50);
		rect(0, 0, canvasx, canvasy);
	}
	//main_player.draw_player();
	
	while(clouds.length < 25){
		clouds.push({x:random(minimum_x, minimum_y), y:random(minimum_y, maximum_y), speed:random(minimum_speed, max_speed)});
		console.log("New cloud created");
	}
	t += 1;
}
void sun(){
	fill(255, (abs(250*sin(t * 0.01)))+100, 0);
	ellipse(400*cos(t * .01)+650, 390*sin(t * .01)+((canvasy / 1.18153846)-10), 250, 250);
}
void mouseClicked() {
	for(var i = 0; i < 5; i++){
		clouds.push({x:random(-1000, -50), y:random(5, 400), speed:random(0.6, 1)});
	};
}
//Cloud functions
void updatecloud(c){
    for (var i = 0; i < c.length; i += 1){
        if(c[i].x < -50){
            c.splice(i, 1);
        }else{
            c[i].x += c[i].speed;
        }
    }
}
void drawcloud(b) {
	fill(0, 0, 0);
	
	for (var i = 0; i < b.length; i++){ 
		if(abs(b[i].speed) < 0.3){
			r = 0.5;
		}else{
			r = 1;
		}
		
		cloud(b[i].x, b[i].y, r);
	}
}
void cloud(x, y, size){
	fill(255, 255, 255);
	ellipse(x, y, 200 * size, 25 * size);
	ellipse(x - 66 * size, y - 5 * size, 70 * size, 30 * size);
	ellipse(x - 25 * size, y - 10 * size, 75 * size, 40 * size);
	ellipse(x + 25 * size, y - 10 * size, 75 * size, 40 * size);
	ellipse(x + 67 * size, y - 5 * size, 70 * size, 30 * size);
}


class Ball{
	float ball_x, ball_y, total_height, ball_speed, overall_speed, x_speed, complete_x, cut_rate;
	Ball(float x, float y, float h, float bas, float ovs, float xsp, float cx, float cr){
		ball_x = x;
		ball_y = y;
		total_height = h;
		ball_speed = bas;
		overall_speed = ovs;
		x_speed = xsp;
		complete_x = cx;
		cut_rate = cr;
	}
	
	float t = 0.5;
	void animate() {
		float ground = canvasy / (12 / 11);//(canvasy / (6 / 5)) + ball_y;
		
		total_height = total_height / cut_rate;
		x_speed = x_speed / cut_rate;
		complete_x = complete_x + x_speed;
		if (complete_x + ball_y > canvasx){
			x_speed = -x_speed;
		} else if(complete_x - ball_y < 0){
			x_speed = abs(x_speed);
		}

		// Shaddow
		var shaddow_equ = abs((total_height / 4 * sin(t / ball_speed)));
		var equate = abs((total_height * (total_height / 1500)) * sin(t / ball_speed));
		// Ball
		var correctedY = -abs((total_height * sin(t / ball_speed)));
		var completex_size = 0.5 * abs((total_height / 4 * cos(t / ball_speed))) + ball_x;
		var completey_size = 0.5 * shaddow_equ + ball_y;
	
		
		// Shaddow
		fill(100, 100, 100, 200 - (shaddow_equ * 1.5));//ellipse(complete_x, ground, equate + ball_x, 10); //ellipse(complete_x, ground + 22, equate + 50, 10);

		// Actuall Ball
		fill(0, 0, 0);
		fill(71, 117, 255);
		ellipse(complete_x, correctedY + ground - (ball_y / 2), completex_size, completey_size);
		t += overall_speed;
		
		if (abs(x_speed) < 0.15){
			t = 0.5;
			if (x_speed < 0){
				x_speed = random(-30, -10);
			}else if (x_speed > 0){
				x_speed = random(10, 30);
				
			}
			total_height = canvasy / random(1, 2); // 1.536
		}
	}
}
