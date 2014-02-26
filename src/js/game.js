(function() {
  'use strict';

  function Game() {
    this.snake = null;
    this.food = null;
  }

  Game.prototype = {

    create: function () {
      this.snake = new this.game.entities.Snake(this.game, 5);
      this.snake.create();

      this.food = new this.game.entities.Food(this.game, this.snake);
      this.food.create();

      this.input.onDown.add(this.onInputDown, this);

      this.game.score = 0;
      var style = { font: '20px Arial', fill: '#ffffff' };
      this.labelScore = this.add.text(5, 5, '0', style);
      this.scoreTime = this.game.time.now / 1000;
    },

    update: function () {
      this.snake.update();
      if (this.game.physics.overlap(this.food.sprite, this.snake.head)) {
        this.snake.grow();
        this.food.reset();

        this.updateScore();
      }

      if (this.snake.dead) {
        this.game.state.start('menu');
      }
    },

    shutdown: function() {
      this.snake.destroy();
      this.food.destroy();
    },

    updateScore: function() {
      var elapsed = Math.floor(this.game.time.elapsedSecondsSince(this.scoreTime));
      this.scoreTime = this.game.time.now;
      var points = this.snake.length - elapsed;
      points = points >= 1 ? points : 1;
      this.game.score += points;
      this.labelScore.content = this.game.score;
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
