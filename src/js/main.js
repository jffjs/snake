window.onload = function () {
  'use strict';

  var game
    , ns = window['snake'];

  game = new Phaser.Game(650, 500, Phaser.AUTO, 'snake-game');
  game.entities = ns.Entities;
  game.score = 0;
  game.highScore = 0;
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};
