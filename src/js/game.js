(function() {
  'use strict';

  function Game() {
    this.snake = null;
  }

  Game.prototype = {

    create: function () {
      this.snake = new this.game.entities.Snake(this.game, 5);
      this.snake.create();

      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {
      this.snake.update();
      if (this.snake.dead) {
        this.game.state.start('menu');
      }
    },

    shutdown: function() {
      this.snake.destroy();
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
