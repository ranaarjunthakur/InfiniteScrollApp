import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { PaddleComponent } from "./paddle/paddle.component";
import { BallComponent } from "./ball/ball.component";
import { BrickComponent } from "./brick/brick.component";

@Component({
    selector: 'app-brick-breaker',
    standalone: true,
    templateUrl: './brick-breaker.component.html',
    styleUrl: './brick-breaker.component.scss',
    imports: [CommonModule, MaterialModule, PaddleComponent, BallComponent, BrickComponent]
})
export class BrickBreakerComponent implements OnInit {

  bricks!: any[];
  paddleX!: number;
  ballX!: number;
  ballY!: number;
  ballSpeedX!: number;
  ballSpeedY!: number;
  score!: number;
  lives!: number;
  gameOver!: boolean;
  gameWon!: boolean;


  constructor(private el:ElementRef, private renderer:Renderer2) { }

  ngOnInit(): void {
    this.initGame();
    this.gameLoop();
  }

  initGame(): void {
    this.bricks = []; // Initialize bricks array
    this.generateBricks(); // Generate bricks
    this.paddleX = 300; // Initial paddle position
    this.ballX = 400; // Initial ball position
    this.ballY = 300;
    this.ballSpeedX = 2; // Initial ball speed
    this.ballSpeedY = -2;
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.gameWon = false;
  }

  gameLoop(): void {
    setInterval(() => {
      this.update();
      this.render();
    }, 10);
  }

  update(): void {
    this.moveBall();
    this.checkCollisions();
    this.checkGameOver();
  }

  moveBall(): void {
    this.ballX += this.ballSpeedX;
    this.ballY += this.ballSpeedY;
  }

  checkCollisions(): void {
    // Ball collision with walls
    if (this.ballX + this.ballSpeedX > 800 || this.ballX + this.ballSpeedX < 0) {
      this.ballSpeedX = -this.ballSpeedX;
    }
    if (this.ballY + this.ballSpeedY < 0) {
      this.ballSpeedY = -this.ballSpeedY;
    }
    if (this.ballY + this.ballSpeedY > 600) { // Ball hits bottom
      if (this.ballX > this.paddleX && this.ballX < this.paddleX + 100) { // Ball hits paddle
        this.ballSpeedY = -this.ballSpeedY;
      } else { // Ball misses paddle
        this.lives--;
        if (this.lives === 0) {
          this.gameOver = true;
        } else {
          this.ballX = 400; // Reset ball position
          this.ballY = 300;
          this.ballSpeedX = 2; // Reset ball speed
          this.ballSpeedY = -2;
          this.paddleX = 300; // Reset paddle position
        }
      }
    }
    // Ball collision with bricks
    for (let i = 0; i < this.bricks.length; i++) {
      let brick = this.bricks[i];
      if (this.ballX > brick.x && this.ballX < brick.x + brick.width &&
          this.ballY > brick.y && this.ballY < brick.y + brick.height) {
        this.ballSpeedY = -this.ballSpeedY;
        this.score += 10;
        this.bricks.splice(i, 1);
        if (this.bricks.length === 0) {
          this.gameWon = true;
        }
        break;
      }
    }
  }

  checkGameOver(): void {
    if (this.lives === 0) {
      this.gameOver = true;
    }
  }
  
  generateBricks(): void {
    const brickWidth = 80;
    const brickHeight = 30;
    const brickRows = 5;
    const brickCols = 10;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;
  
    for (let c = 0; c < brickCols; c++) {
      for (let r = 0; r < brickRows; r++) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        this.bricks.push({ x: brickX, y: brickY, width: brickWidth, height: brickHeight });
      }
    }
  }
  
  onMouseMove(event: MouseEvent): void {
    this.paddleX = event.clientX - 50; // Update paddle position
  }
  
  // render(): void {
  //   const gameBoard:any = document.querySelector('.game-board');
  //   gameBoard.innerHTML = ''; // Clear the previous state
  
  //   // Render paddle
  //   const paddleElement = document.createElement('div');
  //   paddleElement.className = 'paddle';
  //   paddleElement.style.left = this.paddleX + 'px';
  //   gameBoard.appendChild(paddleElement);
  
  //   // Render ball
  //   const ballElement = document.createElement('div');
  //   ballElement.className = 'ball';
  //   ballElement.style.left = this.ballX + 'px';
  //   ballElement.style.top = this.ballY + 'px';
  //   gameBoard.appendChild(ballElement);
  
  //   // Render bricks
  //   this.bricks.forEach(brick => {
  //     const brickElement = document.createElement('div');
  //     brickElement.className = 'brick';
  //     brickElement.style.left = brick.x + 'px';
  //     brickElement.style.top = brick.y + 'px';
  //     gameBoard.appendChild(brickElement);
  //   });
  
  //   // Check game over and game won conditions
  //   if (this.gameOver) {
  //     const gameOverElement = document.createElement('div');
  //     gameOverElement.className = 'game-over';
  //     gameOverElement.textContent = 'Game Over';
  //     gameBoard.appendChild(gameOverElement);
  //   } else if (this.gameWon) {
  //     const gameWonElement = document.createElement('div');
  //     gameWonElement.className = 'game-won';
  //     gameWonElement.textContent = 'You Won!';
  //     gameBoard.appendChild(gameWonElement);
  //   }
  
  //   // Update score and lives display
  //   const scoreElement:any = document.querySelector('.score');
  //   scoreElement.textContent = 'Score: ' + this.score;
  
  //   const livesElement:any = document.querySelector('.lives');
  //   livesElement.textContent = 'Lives: ' + this.lives;
  // }

  // render(): void {
  //   // Clear the previous game state
  //   this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '')
  
  //   // Render paddle
  //   const paddleElement = this.renderer.createElement('div')   as HTMLElement;
  //   this.renderer.addClass(paddleElement, 'paddle');
  //   this.renderer.setStyle(paddleElement, 'left', this.paddleX + 'px');
  //   this.renderer.appendChild(this.el.nativeElement, paddleElement);
  
  //   // Render ball
  //   const ballElement = this.renderer.createElement('div')  as HTMLElement;
  //   this.renderer.addClass(ballElement, 'ball');
  //   this.renderer.setStyle(ballElement, 'left', this.ballX + 'px');
  //   this.renderer.setStyle(ballElement, 'top', this.ballY + 'px');
  //   this.renderer.appendChild(this.el.nativeElement, ballElement);
  
  //   // Render bricks
  //   this.bricks.forEach(brick => {
  //     const brickElement = this.renderer.createElement('div')  as HTMLElement;
  //     this.renderer.addClass(brickElement, 'brick');
  //     this.renderer.setStyle(brickElement, 'left', brick.x + 'px');
  //     this.renderer.setStyle(brickElement, 'top', brick.y + 'px');
  //     this.renderer.appendChild(this.el.nativeElement, brickElement);
  //   });
  
  //   // Check game over and game won conditions
  //   if (this.gameOver) {
  //     const gameOverElement = this.renderer.createElement('div')  as HTMLElement;
  //     this.renderer.addClass(gameOverElement, 'game-over');
  //     this.renderer.setProperty(gameOverElement, 'textContent', 'Game Over');
  //     this.renderer.appendChild(this.el.nativeElement, gameOverElement);
  //   } else if (this.gameWon) {
  //     const gameWonElement = this.renderer.createElement('div')  as HTMLElement;
  //     this.renderer.addClass(gameWonElement, 'game-won');
  //     this.renderer.setProperty(gameWonElement, 'textContent', 'You Won!');
  //     this.renderer.appendChild(this.el.nativeElement, gameWonElement);
  //   }
  
  //   // Update score and lives display (assuming elements with class names 'score' and 'lives' exist)
  //   const scoreElement = this.el.nativeElement.querySelector('.score') as HTMLElement;
  //   scoreElement.textContent = 'Score: ' + this.score;
  
  //   const livesElement = this.el.nativeElement.querySelector('.lives')  as HTMLElement;
  //   livesElement.textContent = 'Lives: ' + this.lives;
  // }

  render(): void {
    const gameBoard = document.querySelector('.game-board');
    if (!gameBoard) return; // Exit if game board element is not found
  
    gameBoard.innerHTML = ''; // Clear the previous state
  
    // Render paddle
    const paddleElement = document.createElement('div');
    paddleElement.className = 'paddle';
    paddleElement.style.left = this.paddleX + 'px';
    gameBoard.appendChild(paddleElement);
  
    // Render ball
    const ballElement = document.createElement('div');
    ballElement.className = 'ball';
    ballElement.style.left = this.ballX + 'px';
    ballElement.style.top = this.ballY + 'px';
    gameBoard.appendChild(ballElement);
  
    // Render bricks
    this.bricks.forEach(brick => {
      const brickElement = document.createElement('div');
      brickElement.className = 'brick';
      brickElement.style.left = brick.x + 'px';
      brickElement.style.top = brick.y + 'px';
      gameBoard.appendChild(brickElement);
    });
  
    // Check game over and game won conditions
    if (this.gameOver) {
      const gameOverElement = document.createElement('div');
      gameOverElement.className = 'game-over';
      gameOverElement.textContent = 'Game Over';
      gameBoard.appendChild(gameOverElement);
    } else if (this.gameWon) {
      const gameWonElement = document.createElement('div');
      gameWonElement.className = 'game-won';
      gameWonElement.textContent = 'You Won!';
      gameBoard.appendChild(gameWonElement);
    }
  
    // Update score and lives display
    const scoreElement = document.querySelector('.score');
    if (scoreElement) scoreElement.textContent = 'Score: ' + this.score;
  
    const livesElement = document.querySelector('.lives');
    if (livesElement) livesElement.textContent = 'Lives: ' + this.lives;
  }

}
