import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  timeLeft = 5;
  timerInterval:any;
  playerModeSelected: boolean = false;
  computerModeSelected: boolean = false;
  showCountDown: boolean = false;
  showAction: string = 'rock';
  showResult: boolean = false;

  showAction1: string = '';
  showAction2: string = '';

  setOpacityRock: boolean = false;
  setOpacityPaper: boolean = false;
  setOpacityScissors: boolean = false;

  player1: number = 0;
  accouncment: string = '';

  ngOnInit(): void {}

  playerMode() {
    this.playerModeSelected = !this.playerModeSelected;
  }

  computerMode() {
    this.computerModeSelected = !this.computerModeSelected;
    this.countdown();
    this.player1 = this.generateRandomNumber();
    let player2 = this.generateRandomNumber();
    console.log(this.player1, player2)
    this.imageSelection(this.player1, 1);
    this.imageSelection(player2, 2);
    this.finalResult(player2, true);
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  showRandowAction() {
    let number = this.generateRandomNumber();
    console.log(number);
    this.imageSelection(number);
    this.finalResult(number);
    console.log(this.showAction);
  }

  imageSelection(number: number, computerMode: number = 0) {
    let selectAction = '';
    if (number === 1) {
      selectAction = 'rock';
    } else if (number == 2) {
      selectAction = 'paper';
    } else {
      selectAction = 'scissors';
    }
    this.showResult = true;
    this.showAction = `../../../assets/images/${selectAction}.png`;
    if (computerMode == 1) {
      this.showAction1 = `../../../assets/images/${selectAction}.png`;
    }
    if (computerMode == 2) {
      this.showAction2 = `../../../assets/images/${selectAction}.png`;
    }
  }

  //  1,2  1,3  2,1  2,3  3,1 3,2

  finalResult(computerSelection: number, computerMode = false) {
    if (computerSelection === this.player1) {
      this.accouncment = 'DRAW';
    } else {
      if (this.player1 === 1 && computerSelection === 2) {
        this.accouncment = computerMode ? 'PLAYER 2 WIN' : 'YOU LOSE';
      } else if (this.player1 === 1 && computerSelection === 3) {
        this.accouncment = computerMode ? 'PLAYER 1 WIN' : 'YOU WIN';
      } else if (this.player1 === 2 && computerSelection === 1) {
        this.accouncment = computerMode ? 'PLAYER 1 WIN' : 'YOU WIN';
      } else if (this.player1 === 2 && computerSelection === 3) {
        this.accouncment = computerMode ? 'PLAYER 2 WIN' : 'YOU LOSE';
      } else if (this.player1 === 3 && computerSelection === 1) {
        this.accouncment = computerMode ? 'PLAYER 2 WIN' : 'YOU LOSE';
      } else if (this.player1 === 3 && computerSelection === 2) {
        this.accouncment = computerMode ? 'PLAYER 1 WIN' : 'YOU WIN';
      }
    }
  }

  selectUserAction(action: string) {
    this.countdown();
    if (action === 'rock') {
      this.player1 = 1;
      this.setOpacityRock = false;
      this.setOpacityPaper = true;
      this.setOpacityScissors = true;
    } else if (action === 'paper') {
      this.player1 = 2;
      this.setOpacityRock = true;
      this.setOpacityPaper = false;
      this.setOpacityScissors = true;
    } else {
      this.player1 = 3;
      this.setOpacityRock = true;
      this.setOpacityPaper = true;
      this.setOpacityScissors = false;
    }
  }

  countdown() {
    this.showCountDown = true;
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft == 0) {
        clearInterval(this.timerInterval);
        this.showCountDown = false;
        if(!this.computerModeSelected)
          this.showRandowAction();
      }
    }, 1000);
  }

  playAgain() {
    if(this.computerModeSelected){
       this.clear();
      this.computerMode();
    return}
    this.clear();
    this.playerMode()
  
  }

  changeMode() {
    this.clear();
    window.location.href = '/';
  }

  clear() {
    clearInterval(this.timerInterval);
    this.timeLeft = 5;
    this.playerModeSelected = false;
    this.computerModeSelected = false;
    this.showCountDown = false;
    this.showAction = 'rock';
    this.showResult = false;

    this.setOpacityRock = false;
    this.setOpacityPaper = false;
    this.setOpacityScissors = false;

    this.player1 = 0;
    this.accouncment = '';
  }
}
