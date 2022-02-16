var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;


// add to run
var canvasWidth;
var canvasHeight;
var canvas_square;
var canvas_square_center_offset;
var canvas_square_radius;
var small_food_remain;
var medium_food_remain;
var large_food_remain;
var max_score;
var food_remain;
var NUMBER_OF_BALLS;
var GAME_TIME;
var BALL_5_COLOR;
var BALL_15_COLOR;
var BALL_25_COLOR;
var UP_BUTTON_CODE;
var DOWN_BUTTON_CODE;
var LEFT_BUTTON_CODE;
var RIGHT_BUTTON_CODE;
var UP_BUTTON_NAME;
var DOWN_BUTTON_NAME;
var LEFT_BUTTON_NAME;
var RIGHT_BUTTON_NAME;
var Settings_canvas;
var SIZE_OF_BOARD;
var half_board;
var lost_life = false;
var first_time;
var game_runing = false;
var USER_NAME;
/////////////////////

// music and sounds
var beginning_game_sound;
var death_sound;
var eat_cherry_sound;
var eat_point_sound;
var eat_ghost_sound;
var wining_song;
var gameSong;

//////////////

// my ghost add
var ghosts_x_and_y_center;
var ghosts_last_move_arr;
var NUM_OF_GHOSTS;
var ghosts_color;
var FEET_NUM_OF_GHOST = 3;
var EYES_NUM_OF_GHOST = 2;
var GHOST_HEAD_R;
var GHOST_FEET_R;
var GHOST_FEET_OFFSET;
var GHOST_EYE_OFFSET;
var GHOST_PUPIL_LEFT_OFFSET;
var GHOST_PUPIL_RIGHT_OFFSET;
var GHOST_EYE_HOLE_R;
var GHOST_PUPIL_R;
var GHOST_EYE_COLOR = "blue";
var GHOST_NUM_OF_INTERVAL_TO_WAIT = 3;
var Ghost_interval_count = 0;
//////////////////////

// my pacman add
var pacman_lives;
var pacman_lives_color;
var lives_canvas;
////////////////

//my cherry
var cherry_change_intervals;
var cherry_interval_count;
var cherry_i;
var cherry_j;
var cherry_eaten;
var cherry_remain;
/////////////////

// add to my clock
var clock_change_intervals;
var clock_interval_count;
var clock_i;
var clock_j;
var clock_eaten;
var clock_remain;
var CLOCK_IMAGE;
////////////////

// my moved eatable ghost
var eatable_ghost_intervals;
var eatable_ghost_count;
var eatable_ghost_i;
var eatable_ghost_j;
var eatable_ghost_eaten;
var eatable_ghost_remain;
var FEET_NUM_OF_EATABLE_GHOST = 4;
var EYES_NUM_OF_EATABLE_GHOST = 2;
var EATABLE_GHOST_HEAD_R;
var EATABLE_GHOST_FEET_R;
var EATABLE_GHOST_FEET_OFFSET;
var EATABLE_GHOST_EYE_OFFSET;
var EATABLE_GHOST_EYE_COLOR = "black";
///////////////////////////


function Start() {
	context = canvas.getContext("2d");
	lives_canvas = lblLives.getContext("2d");
	Settings_canvas = game_setting_canvas.getContext("2d");

	beginning_game_sound = document.getElementById("beginning_game");
	death_sound = document.getElementById("pacman_death");
	eat_cherry_sound = document.getElementById("pacman_eatfruit");
	eat_point_sound = document.getElementById("pacman_chomp");
	eat_ghost_sound = document.getElementById("pacman_eatghost");
	wining_song = document.getElementById("wining_sound");
	gameSong = document.getElementById("game_song");

	// board and draw settings
	SIZE_OF_BOARD = 12;
	half_board = Math.floor(SIZE_OF_BOARD/2);
	first_time = true;
	canvasHeight = canvas.height;
	canvasWidth = canvas.width;
	canvas_square = canvasWidth/SIZE_OF_BOARD;
	canvas_square_center_offset = canvas_square/2;
	canvas_square_radius = canvas_square/2;
	board = new Array();
	score = 0;
	var cnt = 100;
	// food settings
	food_remain = NUMBER_OF_BALLS;
	small_food_remain = Math.floor(food_remain * 0.1);
	medium_food_remain = Math.floor(food_remain * 0.3);
	large_food_remain = Math.floor(food_remain * 0.6);
	while(food_remain != (small_food_remain + medium_food_remain + large_food_remain) ){
		large_food_remain++;
	}
	// add cherry
	cherry_remain = 1;
	food_remain++;
	cherry_change_intervals = 15;
	cherry_interval_count = 15;	
	cherry_eaten = false;
	
	// add clock
	clock_remain = 1;
	clock_change_intervals = 15;
	clock_interval_count = 15;
	clock_eaten = false;
	CLOCK_IMAGE = document.getElementById("clock_image");

	// eatable ghost settings
	eatable_ghost_remain = 1;
	eatable_ghost_change_intervals = 2;
	eatable_ghost_interval_count = 0;	
	eatable_ghost_eaten = false;
	eatable_ghost_i = half_board;
	eatable_ghost_j = half_board;
	EATABLE_GHOST_HEAD_R = canvas_square_radius/2;
	EATABLE_GHOST_FEET_R = canvas_square_radius/8;
	EATABLE_GHOST_FEET_OFFSET =canvas_square_radius/4;
	EATABLE_GHOST_EYE_OFFSET = canvas_square_radius/6;

	
	max_score = 50*eatable_ghost_remain + 35* cherry_remain + 25*small_food_remain + 15*medium_food_remain + 5*large_food_remain;
	// pacman settings
	var pacman_remain = 1;
	pac_color = "yellow";
	pacman_lives_color = "yellow";
	pacman_lives = 5;
	DrawPacmanLives();
	// ghost settings
	ghosts_color = ["red","orange","purple","green"];
	GHOST_HEAD_R = canvas_square_radius* (3/5);
	GHOST_FEET_R = canvas_square/10;
	GHOST_FEET_OFFSET = canvas_square/5;
	GHOST_EYE_OFFSET = canvas_square/10;
	GHOST_PUPIL_LEFT_OFFSET = canvas_square/15;
	GHOST_PUPIL_RIGHT_OFFSET = canvas_square_radius/3.75;
	GHOST_EYE_HOLE_R = canvas_square_radius/6;
	GHOST_PUPIL_R = canvas_square_radius/15;
	ghosts_x_and_y_center = [[0,0],[0,(SIZE_OF_BOARD-1)],[(SIZE_OF_BOARD-1),0],[(SIZE_OF_BOARD-1),(SIZE_OF_BOARD-1)]];
	ghosts_last_move_arr = [null,null,null,null];
	

	drawSettings();
	start_time = new Date();
	for (var i = 0; i < SIZE_OF_BOARD; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < SIZE_OF_BOARD; j++) {
			if (
				
				(i == 2 && j == 2) ||
				(i == 3 && j == 2) ||
				(i == 4 && j == 2) ||
				(i == 5 && j == 2) ||
				(i == 6 && j == 2) ||
				(i == 7 && j == 2) ||
				(i == 8 && j == 2) ||
				(i == 9 && j == 2) ||

				(i == (SIZE_OF_BOARD-4) && j == half_board-1) ||
				(i == (SIZE_OF_BOARD-4) && j == half_board) ||
				(i == (SIZE_OF_BOARD-4) && j == half_board+1) ||
				(i == half_board-3 && j == half_board-1) ||
				(i == half_board-3 && j == half_board) ||
				(i == half_board-3 && j == half_board+1) ||

				(i == 2 && j == (SIZE_OF_BOARD-3)) ||
				(i == 3 && j == (SIZE_OF_BOARD-3)) ||
				(i == 4 && j == (SIZE_OF_BOARD-3)) ||
				(i == 5 && j == (SIZE_OF_BOARD-3)) ||
				(i == 6 && j == (SIZE_OF_BOARD-3)) ||
				(i == 7 && j == (SIZE_OF_BOARD-3)) ||
				(i == 8 && j == (SIZE_OF_BOARD-3)) ||
				(i == 9 && j == (SIZE_OF_BOARD-3))
			) {
				board[i][j] = "wall";
			}
			else if((i == 0 && j == 0)||
					(i == 0 && j == (SIZE_OF_BOARD-1))||
					(i == (SIZE_OF_BOARD-1) && j == 0)||
					(i == (SIZE_OF_BOARD-1) && j == (SIZE_OF_BOARD-1))
				){
					board[i][j] = "ghostsStartSpot";
			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					let randomNum_0_to_9 = Math.floor(Math.random() * 10);
					if(randomNum_0_to_9 >= 8 && large_food_remain > 0){
						food_remain--;
						large_food_remain--;
						board[i][j] = "largeFood";
					}
					else if(randomNum_0_to_9 >= 6 && medium_food_remain > 0){
						food_remain--;
						medium_food_remain--;
						board[i][j] = "mediumFood";
					}
					else if(randomNum_0_to_9 > 3 && small_food_remain > 0){
						food_remain--;
						small_food_remain--;
						board[i][j] = "smallFood";
					}
					else if(randomNum_0_to_9 >= 2 && cherry_remain > 0){
						food_remain--;
						cherry_remain--;
						cherry_i = i;
						cherry_j = j;
						board[i][j] = "cherry";
					}
					else if(randomNum_0_to_9 >= 1 && clock_remain > 0){
						clock_remain--;
						clock_i = i;
						clock_j = j;
						board[i][j] = "clock";
					}
					else{
						board[i][j] = "empty";
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					shape.faceSide = "Right";
					shape.open = true;
					pacman_remain--;
					board[i][j] = "pacman";
				} 
				else {
					board[i][j] = "empty";
				}
				cnt--;
			}
		}
	}

	while(pacman_remain > 0){
		let emptyCell_for_pacman = findRandomEmptyCell(board);
		shape.i = emptyCell_for_pacman[0];
		shape.j = emptyCell_for_pacman[1];
		shape.faceSide = "Right";
		shape.open = true;
		pacman_remain--;
		board[shape.i][shape.j] = "pacman";
	}
	if(clock_remain > 0){
		let emptyCell_for_clock = findRandomEmptyCell(board);
		board[emptyCell_for_clock[0]][emptyCell_for_clock[1]] = "clock";
		clock_remain--;
		clock_i = emptyCell_for_clock[0];
		clock_j = emptyCell_for_clock[1];
	}
	while (food_remain > 0) {
		let emptyCell_for_food = findRandomEmptyCell(board);
		if(large_food_remain > 0){
			board[emptyCell_for_food[0]][emptyCell_for_food[1]] = "largeFood";
			large_food_remain--;
		}
		else if(medium_food_remain > 0){
			board[emptyCell_for_food[0]][emptyCell_for_food[1]] = "mediumFood";
			medium_food_remain--;
		}
		else if(small_food_remain > 0){
			board[emptyCell_for_food[0]][emptyCell_for_food[1]] = "smallFood";
			small_food_remain--;
		}
		else{
			board[emptyCell_for_food[0]][emptyCell_for_food[1]] = "cherry";
			cherry_remain--;
			cherry_i = emptyCell_for_food[0];
			cherry_j = emptyCell_for_food[1];
		}
		food_remain--;
	}
	
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	// interval = setInterval(UpdatePosition, 250);
	game_runing = true;	

	interval = setInterval(UpdatePosition, 200);
	$("#gameFrame_div").show();
	
}
function DrawPacmanLives(){
	lives_canvas.clearRect(0,0,lblLives.width,lblLives.height);
	let center_x = lblLives.width/25;
	let center_y = lblLives.height/2;
	let pacman_radius = center_y - 1;
	let pacman_eye_offset_up = pacman_radius/2;
	let pacman_eye_offset_right = pacman_radius  * (3/14);
	let lives_to_draw = pacman_lives;
	let pacman_center_offset = lblLives.width/12;
	while(lives_to_draw > 0){
		lives_canvas.beginPath();
		lives_canvas.arc(center_x, center_y, pacman_radius, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
		lives_canvas.lineTo(center_x, center_y);
		lives_canvas.fillStyle = pacman_lives_color; //color
		lives_canvas.closePath();
		lives_canvas.fill();

		lives_canvas.beginPath();
		lives_canvas.arc(center_x + pacman_eye_offset_right, center_y - pacman_eye_offset_up, 1, 0, 2 * Math.PI);
		lives_canvas.fillStyle = "black"; //color
		lives_canvas.fill();
		
		lives_to_draw--;
		center_x = center_x + pacman_center_offset;
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (SIZE_OF_BOARD-1) + 1);
	var j = Math.floor(Math.random() * (SIZE_OF_BOARD-1) + 1);
	while (board[i][j] != "empty") {
		i = Math.floor(Math.random() * (SIZE_OF_BOARD-1) + 1);
		j = Math.floor(Math.random() * (SIZE_OF_BOARD-1) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[LEFT_BUTTON_CODE]) {
		return "LEFT";
	}
	if (keysDown[UP_BUTTON_CODE]) {
		return "UP";
	}
	if (keysDown[RIGHT_BUTTON_CODE]) {
		return "RIGHT";
	}
	if (keysDown[DOWN_BUTTON_CODE]) {
		return "DOWN";
	}

}

function DrawBorders() { 
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(0, half_board*canvas_square);
	// context.lineTo(0, 4*canvas_square);

	context.lineTo(2*canvas_square, half_board*canvas_square);
	// context.lineTo(2*canvas_square, 4*canvas_square);

	context.moveTo(0, (half_board+1)*canvas_square);
	// context.moveTo(0, 5*canvas_square);

	context.lineTo(2*canvas_square, (half_board+1)*canvas_square);
	// context.lineTo(2*canvas_square, 5*canvas_square);
;
	context.moveTo(0, (half_board+1)*canvas_square);
	// context.moveTo(0, 5*canvas_square);

	context.lineTo(0, SIZE_OF_BOARD*canvas_square);
	// context.lineTo(0, 13*canvas_square);

	context.lineTo(SIZE_OF_BOARD*canvas_square, SIZE_OF_BOARD*canvas_square);
	// context.lineTo(13*canvas_square, 13*canvas_square);

	context.lineTo(SIZE_OF_BOARD*canvas_square, (half_board+1)*canvas_square);
	// context.lineTo(13*canvas_square, 5*canvas_square);

	context.lineTo((SIZE_OF_BOARD-2)*canvas_square, (half_board+1)*canvas_square);
	// context.lineTo(11*canvas_square, 5*canvas_square);
	
	context.moveTo(SIZE_OF_BOARD*canvas_square, half_board*canvas_square);
	// context.moveTo(13*canvas_square, 4*canvas_square);

	context.lineTo((SIZE_OF_BOARD-2)*canvas_square, half_board*canvas_square);
	// context.lineTo(11*canvas_square, 4*canvas_square);

	context.moveTo(SIZE_OF_BOARD*canvas_square, half_board*canvas_square);
	// context.moveTo(13*canvas_square, 4*canvas_square);

	context.lineTo(SIZE_OF_BOARD*canvas_square, 0);
	// context.lineTo(13*canvas_square, 0);

	context.moveTo(0,0);
	context.lineTo(SIZE_OF_BOARD*canvas_square, 0);
	// context.lineTo(13*canvas_square, 0);

	context.closePath();
	context.stroke();
}

function DrawPacman(centerX, centerY) {
	let pacman_radius = canvas_square_radius * (14/15);
	context.beginPath();
	if(shape.faceSide === "Right"){
		if(shape.open){
			context.arc(centerX, centerY, pacman_radius, 0.02 * Math.PI, 1.98 * Math.PI); // half circle
			shape.open = false;
		}
		else{
			context.arc(centerX, centerY, pacman_radius, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
			shape.open = true;
		}
	}
	else if(shape.faceSide === "Left"){
		if(shape.open){
			context.arc(centerX, centerY, pacman_radius, 1.02 * Math.PI, 0.98 * Math.PI); // half circle
			shape.open = false;
		}
		else{
			context.arc(centerX, centerY, pacman_radius, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
			shape.open = true;
		}
	}
	else if(shape.faceSide === "Up"){
		if(shape.open){
			context.arc(centerX, centerY, pacman_radius, 1.52 * Math.PI, 1.48 * Math.PI); // half circle
			shape.open = false;
		}
		else{
			context.arc(centerX, centerY, pacman_radius, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
			shape.open = true;
		}
	}
	else{
		if(shape.open){
			context.arc(centerX, centerY, pacman_radius, 0.52 * Math.PI, 0.48 * Math.PI); // half circle
			shape.open = false;
		}
		else{
			context.arc(centerX, centerY, pacman_radius, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
			shape.open = true;
		}
	}
	context.lineTo(centerX, centerY);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	if(shape.faceSide === "Right"){context.arc(centerX + canvas_square_radius/6, centerY - canvas_square_radius/2, canvas_square_radius/10, 0, 2 * Math.PI);}
	else if(shape.faceSide === "Left"){context.arc(centerX - canvas_square_radius/6, centerY - canvas_square_radius/2, canvas_square_radius/10, 0, 2 * Math.PI);}
	else if(shape.faceSide === "Up"){context.arc(centerX + canvas_square_radius/2, centerY + canvas_square_radius/6, canvas_square_radius/10, 0, 2 * Math.PI);}
	else{context.arc(centerX - canvas_square_radius/2, centerY + canvas_square_radius/6, canvas_square_radius/10 , 0, 2 * Math.PI);}
	context.fillStyle = "black"; //color
	context.fill();
}

function DrawLargeFood(centerX, centerY){
	let large_food_text_size = Math.floor(canvas_square_radius/3);
	context.beginPath();
	context.arc(centerX, centerY, canvas_square_radius/2, 0, 2 * Math.PI); // circle
	context.fillStyle = BALL_5_COLOR; //color
	context.fill();
	context.font = 'bolder '+ large_food_text_size + 'pt Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
	context.fillText('+5', centerX, centerY + canvas_square_radius/10);
}
function DrawMediumFood(centerX, centerY){
	let medium_food_text_size = Math.floor(canvas_square_radius * (4/15));
	context.beginPath();
	context.arc(centerX, centerY, canvas_square/5 , 0, 2 * Math.PI); // circle
	context.fillStyle = BALL_15_COLOR; //color
	context.fill();
	context.font = 'bolder '+ medium_food_text_size + 'pt Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
	context.fillText('+15', centerX, centerY + canvas_square_radius/10);
}
function DrawSmallFood(centerX, centerY){
	let small_food_text_size = Math.floor(canvas_square_radius/5);
	let smallFoodRadius = canvas_square_radius * (3/10);
	context.beginPath();
	context.arc(centerX, centerY, smallFoodRadius, 0, 2 * Math.PI); // circle
	context.fillStyle = BALL_25_COLOR; //color
	context.fill();            
	context.font = 'bolder '+ small_food_text_size + 'pt Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
	context.fillText('+25', centerX, centerY + canvas_square_radius/10);
}
function DrawCherry(centerX, centerY){
	let right_cherry_x = canvas_square_radius/15;
	let right_cherry_y =canvas_square_radius * (17/30);
	let left_cherry_x = canvas_square_radius/2.5;
	let left_cherry_y = canvas_square_radius/2.5;
	let cherry_radius = canvas_square_radius/3.75;
	context.beginPath();
	context.moveTo(centerX - left_cherry_x, centerY + left_cherry_y);
	context.bezierCurveTo(centerX-(canvas_square_radius/2), centerY+(canvas_square_radius/3), centerX+(canvas_square_radius/3)
							,centerY-(canvas_square_radius/3), centerX+(canvas_square_radius/3.75), centerY-(canvas_square_radius/1.5));
	context.lineWidth = 1;

	// line color
	context.strokeStyle = '#006600';
	context.stroke();

	context.beginPath();
	context.moveTo(centerX + right_cherry_x, centerY + right_cherry_y);
	context.bezierCurveTo(centerX-(canvas_square_radius/30), centerY+(canvas_square_radius/2), centerX+(canvas_square_radius/3)
						,centerY-(canvas_square_radius/3), centerX+(canvas_square_radius/3.75), centerY-(canvas_square_radius/1.5));
	context.lineWidth = 1;

	// line color
	context.strokeStyle = '#006600';
	context.stroke();

	context.beginPath();
	context.arc(centerX - left_cherry_x, centerY + left_cherry_y, cherry_radius, 0, 2 * Math.PI); // circle
	context.fillStyle = 'rgb(210, 4, 45)';//color
	context.fill();
	context.lineWidth= 1;
	context.strokeStyle= '#000000';
	context.stroke();
	context.beginPath();
	context.arc(centerX + right_cherry_x , centerY + right_cherry_y, cherry_radius , 0, 2 * Math.PI); // circle
	context.fillStyle = 'rgb(210, 4, 45)';//color
	context.fill();
	context.lineWidth= 1;
	context.strokeStyle= '#000000';
	context.stroke();
}
function DrawClock(centerX, centerY){
	context.drawImage(CLOCK_IMAGE,centerX - canvas_square_radius/1.5, centerY - canvas_square_radius/1.5 , canvas_square_radius*1.5, canvas_square_radius*1.5 );
}
function DrawWall(centerX, centerY){
	context.beginPath();
	context.rect(centerX - canvas_square_radius, centerY - canvas_square_radius, canvas_square, canvas_square);
	context.fillStyle = "grey"; //color
	context.fill();
}

function DrawAllGhosts() {
	for(let i = 0; i < NUM_OF_GHOSTS ; i++){
		let ghost_centerX = ghosts_x_and_y_center[i][0]* canvas_square + canvas_square_radius;
		let ghost_centerY = ghosts_x_and_y_center[i][1]* canvas_square + canvas_square_radius;
		let ghost_color = ghosts_color[i];
		DrawGhost(ghost_centerX, ghost_centerY, ghost_color);
	}
	if(!eatable_ghost_eaten){
		let eatable_ghost_centerX = eatable_ghost_i * canvas_square + canvas_square_radius;
		let eatable_ghost_centerY = eatable_ghost_j * canvas_square + canvas_square_radius;
		DrawEatableGhost(eatable_ghost_centerX , eatable_ghost_centerY);
	}
}
function DrawEatableGhost(ghost_centerX, ghost_centerY){
	
	// head
	context.beginPath();
	context.arc(ghost_centerX, ghost_centerY, EATABLE_GHOST_HEAD_R, 0, 2 * Math.PI); // circle
	context.fillStyle = "cyan"; //color
	context.fill();

	// body
	context.beginPath();
	context.rect(ghost_centerX - EATABLE_GHOST_HEAD_R, ghost_centerY, 2*EATABLE_GHOST_HEAD_R, EATABLE_GHOST_HEAD_R);
	context.fillStyle = "cyan"; //color
	context.fill();

	// feet
	let footPost = ghost_centerX - 1.5*EATABLE_GHOST_FEET_OFFSET;
	for(let i = 0 ; i < FEET_NUM_OF_EATABLE_GHOST; i++){
		context.beginPath();
		context.arc(footPost, ghost_centerY + EATABLE_GHOST_HEAD_R, EATABLE_GHOST_FEET_R, 0, 2 * Math.PI); // circle
		context.fillStyle = "cyan"; //color
		context.fill();
		footPost = footPost + EATABLE_GHOST_FEET_OFFSET;
	}
	// eyes
	let eye_x = ghost_centerX - 2.5*EATABLE_GHOST_FEET_R;
	let eye_y = ghost_centerY - 2*EATABLE_GHOST_FEET_R;
	for(let i = 0 ; i < EYES_NUM_OF_EATABLE_GHOST; i++){
		// eyes hole
		context.beginPath();
		context.moveTo(eye_x, eye_y);
		context.lineTo(eye_x + 1.5*EATABLE_GHOST_FEET_R, eye_y + 1.5*EATABLE_GHOST_FEET_R);
		context.moveTo(eye_x + 1.5*EATABLE_GHOST_FEET_R, eye_y);
		context.lineTo(eye_x, eye_y + 1.5*EATABLE_GHOST_FEET_R);
		context.strokeStyle = 'black';
		context.closePath();
		context.stroke();
		eye_x = ghost_centerX + EATABLE_GHOST_FEET_R;
	}
	// mouth
	let mouth_x = ghost_centerX - 3*EATABLE_GHOST_FEET_R;
	let mouth_y = ghost_centerY + 3*EATABLE_GHOST_FEET_R;
	context.beginPath();
	context.moveTo(mouth_x, mouth_y);
	context.lineTo(mouth_x + EATABLE_GHOST_FEET_R, mouth_y - EATABLE_GHOST_FEET_R);

	context.moveTo(mouth_x + EATABLE_GHOST_FEET_R, mouth_y - EATABLE_GHOST_FEET_R);
	context.lineTo(mouth_x + 2*EATABLE_GHOST_FEET_R, mouth_y);

	context.moveTo(mouth_x + 2*EATABLE_GHOST_FEET_R, mouth_y);
	context.lineTo(mouth_x + 3*EATABLE_GHOST_FEET_R, mouth_y - EATABLE_GHOST_FEET_R);

	context.moveTo(mouth_x + 3*EATABLE_GHOST_FEET_R, mouth_y - EATABLE_GHOST_FEET_R);
	context.lineTo(mouth_x + 4*EATABLE_GHOST_FEET_R, mouth_y);

	context.moveTo(mouth_x + 4*EATABLE_GHOST_FEET_R, mouth_y);
	context.lineTo(mouth_x + 5*EATABLE_GHOST_FEET_R, mouth_y - EATABLE_GHOST_FEET_R);

	context.moveTo(mouth_x + 5*EATABLE_GHOST_FEET_R, mouth_y - EATABLE_GHOST_FEET_R);
	context.lineTo(mouth_x + 6*EATABLE_GHOST_FEET_R, mouth_y);
	
	context.strokeStyle = 'black';
	context.closePath();
	context.stroke();

}
function DrawGhost(ghost_centerX, ghost_centerY, ghost_color) {
	// head
	context.beginPath();
	context.arc(ghost_centerX, ghost_centerY, GHOST_HEAD_R, 0, 2 * Math.PI); // circle
	context.fillStyle = ghost_color; //color
	context.fill();
	// body
	context.beginPath();
	context.rect(ghost_centerX - GHOST_HEAD_R, ghost_centerY, 2*GHOST_HEAD_R, GHOST_HEAD_R);
	context.fillStyle = ghost_color; //color
	context.fill();
	// feet
	let footPost = ghost_centerX - GHOST_FEET_OFFSET;
	for(let i = 0 ; i < FEET_NUM_OF_GHOST; i++){
		context.beginPath();
		context.arc(footPost, ghost_centerY+GHOST_HEAD_R, GHOST_FEET_R, 0, 2 * Math.PI); // circle
		context.fillStyle = ghost_color; //color
		context.fill();
		footPost = footPost + GHOST_FEET_OFFSET;
	}
	// eyes
	let eye_x = ghost_centerX - GHOST_FEET_R;
	let pupil_x = ghost_centerX - GHOST_PUPIL_LEFT_OFFSET;
	for(let i = 0 ; i < EYES_NUM_OF_GHOST; i++){
		// eyes hole
		context.beginPath();
		context.arc(eye_x, ghost_centerY,GHOST_EYE_HOLE_R, 0, 2 * Math.PI); // circle
		context.fillStyle = "white"; //color
		context.fill();
		eye_x = ghost_centerX + GHOST_FEET_R;

		//pupil
		context.beginPath();
		context.arc(pupil_x, ghost_centerY, GHOST_PUPIL_R, 0, 2 * Math.PI); // circle
		context.fillStyle = GHOST_EYE_COLOR; //color
		context.fill();
		pupil_x = ghost_centerX + GHOST_PUPIL_RIGHT_OFFSET;
	}
}

function Draw() { 
	canvas.width = canvas.width; //clean board
	context.rect(0,0,canvas.width,canvas.height);
	context.fillStyle = "white";
	context.fill();
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblUserName.value = USER_NAME;
	DrawBorders();
	for (var i = 0; i < SIZE_OF_BOARD; i++) {
		for (var j = 0; j < SIZE_OF_BOARD; j++) {
			var center = new Object();
			center.x = i * canvas_square + canvas_square_center_offset;
			center.y = j * canvas_square + canvas_square_center_offset;
			if (board[i][j] === "pacman") {
				DrawPacman(center.x, center.y);
			} else if(board[i][j] === "largeFood"){
				DrawLargeFood(center.x, center.y);
			} else if(board[i][j] === "mediumFood"){
				DrawMediumFood(center.x, center.y);
			} else if (board[i][j] === "smallFood") {
				DrawSmallFood(center.x, center.y);
			} else if (board[i][j] === "cherry") {
				DrawCherry(center.x, center.y);
			} else if(board[i][j] === "clock"){
				DrawClock(center.x, center.y);
			} else if (board[i][j] === "wall") {
				DrawWall(center.x, center.y);
			}
		}
	}
	DrawAllGhosts();
}
function updateCherryPos(){
	let emptyCell_for_cherry = findRandomEmptyCell(board);
	board[cherry_i][cherry_j] = "empty";
	cherry_i = emptyCell_for_cherry[0];
	cherry_j = emptyCell_for_cherry[1];
	board[cherry_i][cherry_j] = "cherry"
	cherry_interval_count = cherry_change_intervals;
}
function updateClockPos(){
	let emptyCell_for_clock = findRandomEmptyCell(board);
	board[clock_i][clock_j] = "empty";
	clock_i = emptyCell_for_clock[0];
	clock_j = emptyCell_for_clock[1];
	board[clock_i][clock_j] = "clock"
	clock_interval_count = clock_change_intervals;
}

function UpdatePosition() {
	board[shape.i][shape.j] = "empty";

	var x = GetKeyPressed();
	if (x === "UP") {
		shape.faceSide = "Up";
		if (shape.j > 0 && board[shape.i][shape.j - 1] != "wall") {
			if(!(shape.i == 0 && (shape.j == half_board || shape.j == half_board+1))
				&& (!(shape.i == 1 && (shape.j == half_board || shape.j == half_board+1)))
				&& (!(shape.i == (SIZE_OF_BOARD-2) && (shape.j == half_board || shape.j == half_board+1)))
				&& (!(shape.i == (SIZE_OF_BOARD-1) && (shape.j == half_board || shape.j == half_board+1)))){
				shape.j--;
			}
		}
	}
	if (x === "DOWN") {
		shape.faceSide = "Down";
		if (shape.j < (SIZE_OF_BOARD-1) && board[shape.i][shape.j + 1] != "wall") {
			if(!(shape.i == 0 && (shape.j == half_board-1 || shape.j == half_board))
			&& (!(shape.i == 1 && (shape.j == half_board-1 || shape.j == half_board)))
			&& (!(shape.i == (SIZE_OF_BOARD-2) && (shape.j == half_board-1 || shape.j == half_board)))
			&& (!(shape.i == (SIZE_OF_BOARD-1) && (shape.j == half_board-1 || shape.j == half_board)))){
				shape.j++;
			}
		}
	}
	if (x === "LEFT") {
		shape.faceSide = "Left";
		if(shape.j == half_board && shape.i == 0){
			shape.i = (SIZE_OF_BOARD-1);
		}
		else if (shape.i > 0 && board[shape.i - 1][shape.j] != "wall") {
			shape.i--;
		}
	}
	if (x === "RIGHT") {
		shape.faceSide = "Right";
		if(shape.j == half_board && shape.i == (SIZE_OF_BOARD-1)){
			shape.i = 0;
		}
		else if (shape.i < (SIZE_OF_BOARD-1) && board[shape.i + 1][shape.j] != "wall") {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] === "largeFood") {
		score += 5;
	}
	else if(board[shape.i][shape.j] === "mediumFood"){
		score += 15;
	}
	else if(board[shape.i][shape.j] === "smallFood"){
		score += 25;

	}
	else if(board[shape.i][shape.j] === "cherry"){
		score += 35;
		cherry_eaten = true;
		playAudio(eat_cherry_sound);
	}
	else if(board[shape.i][shape.j] === "clock"){
		clock_eaten = true;
		GAME_TIME = GAME_TIME + 10;
		drawSettings();
		playAudio(eat_cherry_sound);
	}
	cherry_interval_count--;
	clock_interval_count--;
	if(cherry_interval_count == 0 && !cherry_eaten){
		updateCherryPos();
	}
	if(clock_interval_count == 0 && !clock_eaten){
		updateClockPos();
	}
	if(shape.i == eatable_ghost_i && shape.j == eatable_ghost_j && !eatable_ghost_eaten){
		score += 50;
		eatable_ghost_eaten = true;
		playAudio(eat_ghost_sound);
	}

	
	board[shape.i][shape.j] = "pacman";
	UpdateGhostsPosition();
	if(!eatable_ghost_eaten){
		UpdateEatableGhostPosition();
	}
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 100 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == max_score) {
		playAudio(wining_song);
		game_runing = false;
		window.clearInterval(interval);
		window.alert("Winner!!!!");
	}
	else if(time_elapsed >= GAME_TIME){
		window.clearInterval(interval);
		game_runing = false;
		if(score < 100){
			let loser_message = "You are Better Than " + score.toString() + " points!"
			window.alert(loser_message);
		}else{
			window.alert("Loser!");
		}

	}
	else {
		if((NUM_OF_GHOSTS > 0 && ghosts_x_and_y_center[0][0] == shape.i && ghosts_x_and_y_center[0][1] == shape.j)
		|| (NUM_OF_GHOSTS > 1 && ghosts_x_and_y_center[1][0] == shape.i && ghosts_x_and_y_center[1][1] == shape.j)
		|| (NUM_OF_GHOSTS > 2 && ghosts_x_and_y_center[2][0] == shape.i && ghosts_x_and_y_center[2][1] == shape.j)
		|| (NUM_OF_GHOSTS > 3 && ghosts_x_and_y_center[3][0] == shape.i && ghosts_x_and_y_center[3][1] == shape.j)
		){
			pacman_lives--;
			score -= 10;
			max_score -= 10;

			if(pacman_lives <= 0){
				window.clearInterval(interval);
				window.alert("Loser!");
				pauseAudio(gameSong)
				game_runing = false;
			}
			else{
				board[shape.i][shape.j] = "empty";
				let emptyCellForPacman = findRandomEmptyCell(board);
				shape.i = emptyCellForPacman[0];
				shape.j = emptyCellForPacman[1];
				board[shape.i][shape.j] = "pacman";
				shape.faceSide = "Right";
				shape.open = true;
				ghosts_x_and_y_center = [[0,0],[0,(SIZE_OF_BOARD-1)],[(SIZE_OF_BOARD-1),0],[(SIZE_OF_BOARD-1),(SIZE_OF_BOARD-1)]];
				ghosts_last_move_arr = [null,null,null,null];
				eatable_ghost_i = half_board;
				eatable_ghost_j = half_board;
				DrawPacmanLives();
				lost_life = true;
			}
		}
		if(lost_life){
			Draw();
			lost_life = false;
			window.clearInterval(interval);
			playAudio(death_sound);
			syncDelay(2000);
			interval = setInterval(UpdatePosition, 200);
		}
		else if(first_time){
			Draw();
			first_time = false;
			playAudio(beginning_game_sound);
			window.clearInterval(interval);
			setTimeout(function(){ interval = setInterval(UpdatePosition, 200); }, 5000);
			setTimeout(function(){playAudio(gameSong);},5100);
		}
		else{
			Draw();
		}
	}
}
function syncDelay(milliseconds){
	let start = new Date().getTime();
	let end=0;
	while( (end-start) < milliseconds){
		end = new Date().getTime();
	}
}

function playAudio(src) { 
	src.play(); 
} 
  
function pauseAudio(src) { 
	src.pause(); 
} 

function UpdateEatableGhostPosition(){
	if(eatable_ghost_interval_count != eatable_ghost_change_intervals){
		eatable_ghost_interval_count++;
		return;
	}
	eatable_ghost_interval_count = 0;
	let to_go_array = [];
	let ghost_col = eatable_ghost_i;
	let ghost_row = eatable_ghost_j;
	if(ghost_row > 0 && board[ghost_col][ghost_row - 1] != "wall"   //up
		&& !(ghost_col == 0 && (ghost_row == half_board || ghost_row == half_board+1))
		&& (!(ghost_col == 1 && (ghost_row == half_board || ghost_row == half_board+1)))
		&& (!(ghost_col == (SIZE_OF_BOARD-2) && (ghost_row == half_board || ghost_row == half_board+1)))
		&& (!(ghost_col == (SIZE_OF_BOARD-1) && (ghost_row == half_board || ghost_row == half_board+1)))
	){
		to_go_array.push("UP");
	}
	if(ghost_row < (SIZE_OF_BOARD-1) && board[ghost_col][ghost_row + 1] != "wall"	//down 
		&& !(ghost_col == 0 && (ghost_row == half_board-1 || ghost_row == half_board))
		&& (!(ghost_col == 1 && (ghost_row == half_board-1 || ghost_row == half_board)))
		&& (!(ghost_col == (SIZE_OF_BOARD-2) && (ghost_row == half_board-1 || ghost_row == half_board)))
		&& (!(ghost_col == (SIZE_OF_BOARD-1) && (ghost_row == half_board-1 || ghost_row == half_board)))
	){ 
		to_go_array.push("DOWN");
	}
	if(ghost_col > 0 && board[ghost_col - 1][ghost_row] != "wall"){ 	//left
		to_go_array.push("LEFT");
	}
	if(ghost_col < (SIZE_OF_BOARD-1) && board[ghost_col + 1][ghost_row] != "wall"){  //right
		to_go_array.push("RIGHT");
	}

	let indx = Math.floor(Math.random()*to_go_array.length);
	let to_go = to_go_array[indx];
	if(to_go === "UP"){
		eatable_ghost_j--;
	}
	else if(to_go === "DOWN"){
		eatable_ghost_j++;
	}
	else if(to_go === "LEFT"){
		eatable_ghost_i--;
	}
	else if(to_go === "RIGHT"){
		eatable_ghost_i++;
	}
}

function UpdateGhostsPosition(){
	if(Ghost_interval_count != GHOST_NUM_OF_INTERVAL_TO_WAIT){
		Ghost_interval_count++;
		return;
	}
	Ghost_interval_count = 0;
	let pacman_row = shape.j; //row
	let pacman_col = shape.i; //col
	// board[col][row]
	for(let i = 0 ; i < NUM_OF_GHOSTS ; i++){
		let ghost_col = ghosts_x_and_y_center[i][0]; //col
		let ghost_row = ghosts_x_and_y_center[i][1]; //row
		let MD_array = []; // [up, down, left, right]
		if(ghost_row > 0 && board[ghost_col][ghost_row - 1] != "wall"   //up
			&& !(ghost_col == 0 && (ghost_row == half_board || ghost_row == half_board-1))
			&& (!(ghost_col == 1 && (ghost_row == half_board || ghost_row == half_board-1)))
			&& (!(ghost_col == (SIZE_OF_BOARD-2) && (ghost_row == half_board || ghost_row == half_board-1)))
			&& (!(ghost_col == (SIZE_OF_BOARD-1) && (ghost_row == half_board || ghost_row == half_board-1)))
		){ 
			MD_array.push(ManhattanDistanceCalculation(pacman_row , pacman_col , ghost_row - 1, ghost_col));
		}else{
			MD_array.push(Number.POSITIVE_INFINITY);
		}
		
		if(ghost_row < (SIZE_OF_BOARD-1) && board[ghost_col][ghost_row + 1] != "wall"	//down 
			&& !(ghost_col == 0 && (ghost_row == half_board-1 || ghost_row == half_board))
			&& (!(ghost_col == 1 && (ghost_row == half_board-1 || ghost_row == half_board)))
			&& (!(ghost_col == (SIZE_OF_BOARD-2) && (ghost_row == half_board-1 || ghost_row == half_board)))
			&& (!(ghost_col == (SIZE_OF_BOARD-1) && (ghost_row == half_board-1 || ghost_row == half_board)))
		){ 
			MD_array.push(ManhattanDistanceCalculation(pacman_row , pacman_col , ghost_row + 1, ghost_col));
		}else{
			MD_array.push(Number.POSITIVE_INFINITY);
		}
		
		if(ghost_col > 0 && board[ghost_col - 1][ghost_row] != "wall"){ 	//left
			MD_array.push(ManhattanDistanceCalculation(pacman_row , pacman_col, ghost_row, ghost_col - 1));
		}else{
			MD_array.push(Number.POSITIVE_INFINITY);
		}
		
		if(ghost_col < (SIZE_OF_BOARD-1) && board[ghost_col + 1][ghost_row] != "wall"){  //right
			MD_array.push(ManhattanDistanceCalculation(pacman_row , pacman_col, ghost_row, ghost_col + 1));
		}else{
			MD_array.push(Number.POSITIVE_INFINITY);
		}
		if(ghosts_last_move_arr[i] === "UP"){
			MD_array[0] = Number.POSITIVE_INFINITY; 
		}
		else if(ghosts_last_move_arr[i] === "DOWN"){
			MD_array[1] = Number.POSITIVE_INFINITY; 
		}
		else if(ghosts_last_move_arr[i] === "LEFT"){
			MD_array[2] = Number.POSITIVE_INFINITY; 
		}
		else if(ghosts_last_move_arr[i] === "RIGHT"){
			MD_array[3] = Number.POSITIVE_INFINITY; 
		}
		
		let minIndex = MD_array.indexOf(Math.min.apply(null, MD_array));
		if(minIndex == 0){ //up
			ghosts_x_and_y_center[i][1]--;
			ghosts_last_move_arr[i] = "DOWN";
		}
		else if(minIndex == 1){ //down
			ghosts_x_and_y_center[i][1]++;
			ghosts_last_move_arr[i] = "UP";
		}
		else if(minIndex == 2){ //left
			ghosts_x_and_y_center[i][0]--;
			ghosts_last_move_arr[i] = "RIGHT";
		}
		else{ //right
			ghosts_x_and_y_center[i][0]++;
			ghosts_last_move_arr[i] = "LEFT";
		}	
	}
}

function ManhattanDistanceCalculation(pacman_row, pacman_col, ghost_row, ghost_col){
	let absX = Math.abs(pacman_row-ghost_row);
	let absY = Math.abs(pacman_col-ghost_col);
	return absX + absY;
}

function drawSettings(){
	game_setting_canvas.width = game_setting_canvas.width; //clean board
	Settings_canvas.rect(0,0,game_setting_canvas.width,game_setting_canvas.height);
	Settings_canvas.fillStyle = "white";
	Settings_canvas.fill();
	Settings_canvas.fillStyle = 'black';
	Settings_canvas.font = "22px Verdana";
	Settings_canvas.fillText("Settings", 50, 30);
	Settings_canvas.font = "14px Verdana";
	Settings_canvas.fillText("Number Of Game Balls :   ", 10, 60);
	Settings_canvas.fillStyle = 'red';
	Settings_canvas.fillText(NUMBER_OF_BALLS, 200, 60);
	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("Game Time :   ", 10, 90);
	Settings_canvas.fillStyle = 'red';
	if(!clock_eaten){
		Settings_canvas.fillText(GAME_TIME, 120, 90);
	}
	else{
		Settings_canvas.fillText((GAME_TIME-10) + "   +   10", 120, 90);
	}
	

	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("Number of Ghosts :   ", 10, 120);
	Settings_canvas.fillStyle = 'red';
	Settings_canvas.fillText(NUM_OF_GHOSTS, 170, 120);

	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("Up Button :   ", 10, 150);
	Settings_canvas.fillStyle = 'red';
	Settings_canvas.fillText(UP_BUTTON_NAME, 120, 150);

	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("Down Button :   ", 10, 180);
	Settings_canvas.fillStyle = 'red';
	Settings_canvas.fillText(DOWN_BUTTON_NAME, 120, 180);

	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("Left Button :   ", 10, 210);
	Settings_canvas.fillStyle = 'red';
	Settings_canvas.fillText(LEFT_BUTTON_NAME, 120, 210);

	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("Right Button :   ", 10, 240);
	Settings_canvas.fillStyle = 'red';
	Settings_canvas.fillText(RIGHT_BUTTON_NAME, 120, 240);


	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("5 Points Ball Color :   ", 10, 270);
	Settings_canvas.beginPath();
	Settings_canvas.rect(170,255,20,20);
	Settings_canvas.fillStyle = BALL_5_COLOR; //color
	Settings_canvas.fill();

	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("15 Points Ball Color :   ", 10, 300);
	Settings_canvas.beginPath();
	Settings_canvas.rect(170,285,20,20);
	Settings_canvas.fillStyle = BALL_15_COLOR; //color
	Settings_canvas.fill();

	Settings_canvas.fillStyle = 'black';
	Settings_canvas.fillText("25 Points Ball Color :   ", 10, 330);
	Settings_canvas.beginPath();
	Settings_canvas.rect(170,315,20,20);
	Settings_canvas.fillStyle = BALL_25_COLOR; //color
	Settings_canvas.fill();
}

function stopGame(){
	if(game_runing){
		window.clearInterval(interval);
		pauseAudio(gameSong)
	}
}


function newGameHandler(){
	// stop currect game
	stopGame();
	// switch to settings div
	$("#gameFrame_div,#settings_div").toggle();
		
}

