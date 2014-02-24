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
      var rows = this.game.height / this.sprite.height;
      var cols = this.game.width / this.sprite.width;
      var row, col;
      do {
        row = Math.floor(Math.random() * rows);
        col = Math.floor(Math.random() * cols);
        this.sprite.reset(col * this.sprite.width, row * this.sprite.height);
      } while (this.game.physics.overlap(this.sprite, this.snake.sprites));
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Entities = window['snake'].Entities || {};
  window['snake'].Entities.Food = Food;
}());
