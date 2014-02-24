(function() {
  'use strict';

  function Snake(game, length, speed) {
    this.name = 'snake';
    this.game = game;
    this.length = length || 5;
    this.speed = speed || 500;
    this.direction = { x: 0, y: -1 };
    this.segments = [];
    this.sprites = null;
    this.keys = {};
  }

  Snake.prototype = {
    create: function() {
      // set up initial position
      var x = this.game.width / 2
        , y = this.game.height / 2;
      while(x % 50 !== 0) {
        x--;
      }
      while(y % 50 !== 0) {
        y--;
      }

      // set up initial segment placement
      for (var i = 0; i < this.length; i++) {
        this.segments.push(i);
      }

      // create sprite group and initialize locations
      this.sprites = this.game.add.group(null, this.name);
      this.sprites.createMultiple(this.length, this.name, null, true);
      var segmentY = y;
      this.sprites.forEachAlive(function(segment) {
        segment.reset(x, segmentY);
        segmentY += 50;
      }, this);

      this.timer = this.game.time.events.loop(this.speed, this.move, this);
    },

    update: function() {
      var keyboard = this.game.input.keyboard;

      if (keyboard.justPressed(Phaser.Keyboard.UP)) {
        this.direction = { x: 0, y: -1 };
      } else if (keyboard.justPressed(Phaser.Keyboard.DOWN)) {
        this.direction = { x: 0, y: 1 };
      } else if (keyboard.justPressed(Phaser.Keyboard.LEFT)) {
        this.direction = { x: -1, y: 0 };
      } else if (keyboard.justPressed(Phaser.Keyboard.RIGHT)) {
        this.direction = { x: 1, y: 0 };
      }
    },

    move: function() {
      var neck = this.sprites.getAt(this.segments[0]);
      this.segments.unshift(this.segments.pop());
      var x = neck.x + 50 * this.direction.x;
      var y = neck.y + 50 * this.direction.y;
      this.sprites.getAt(this.segments[0]).reset(x, y);

      // testing
      if (Math.random() * 100 > 85) {
        this.grow();
      }
    },

    grow: function() {
      var seg1 = this.sprites.getAt(this.segments[this.length - 2]);
      var seg2 = this.sprites.getAt(this.segments[this.length - 1]);
      var diffx = seg2.x - seg1.x;
      var diffy = seg2.y - seg1.y;
      var x = seg2.x,
          y = seg2.y;
      this.segments.push(this.length);
      this.length += 1;
      this.sprites.create(x + diffx, y + diffy, this.name);
    },

    log: function() {
      console.log('##############################');
      console.log(this.segments);
      console.log('length: ' + this.length);
      this.sprites.forEachAlive(function(segment) {
        var i = this.sprites.getIndex(segment);
        console.log(i + ': ' + '(' + segment.x + ', ' + segment.y + ')');
      }, this);
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Entities = window['snake'].Entities || {};
  window['snake'].Entities.Snake = Snake;
}());

