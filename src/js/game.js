(function() {
  'use strict';

  function Game() {
    this.snake = null;
  }

  Game.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;

      this.snake = new this.game.entities.Snake(this.game, 5);
      this.snake.create();

      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {
      this.snake.update();
      //if (this.snake.getAt(0).inWorld === false) {
        //this.game.state.start('menu');
      //}
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Game = Game;

}());
