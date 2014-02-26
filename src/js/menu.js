(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'Snake', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'START', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.startTxt = this.add.bitmapText(5, 5, 'Score: ' + this.game.score, {font: '12px minecraftia', align: 'left'});
      this.startTxt = this.add.bitmapText(5, 25, 'High Score: ' + this.game.highScore, {font: '12px minecraftia', align: 'left'});
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['snake'] = window['snake'] || {};
  window['snake'].Menu = Menu;

}());
