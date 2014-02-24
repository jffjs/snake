(function() {
  'use strict';

  function Food(game, snake) {
    this.name = 'food';
    this.game = game;
    this.snake = snake;
    this.sprite = null;
  }

  Food.prototype = {
    create: function() {
      this.sprite = this.game.add.sprite(0, 0, 'food');
      this.reset();
    },

    reset: function() {
      var rows = this.game.height / 50;
      var cols = this.game.width / 50;
      var row, col;
      do {
        row = Math.floor(Math.random() * (rows + 1));
        col = Math.floor(Math.random() * (cols + 1));
        this.sprite.reset(col * 50, row * 50);
      } while (this.game.physics.overlap(this.sprite, this.snake.sprites));
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Entities = window['snake'].Entities || {};
  window['snake'].Entities.Food = Food;
}());
