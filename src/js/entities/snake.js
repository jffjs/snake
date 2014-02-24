(function() {
  'use strict';

  function Snake(game, start, length, speed) {
    this.game = game;
    this.start = start;
    this.length = length || 5;
    this.speed = speed || 500;
    this.direction = { x: 0, y: -1 };
    this.segments = [];
    this.name = 'snake';
    this.sprites = null;
    this.keys = {};
  }

  Snake.prototype = {
    create: function() {
      for (var i = 0; i < this.length; i++) {
        this.segments.push(i);
      }

      this.sprites = this.game.add.group(null, this.name);
      this.sprites.createMultiple(this.length, this.name, null, true);

      var segmentY  = this.start.y;
      this.sprites.forEachAlive(function(segment) {
        segment.reset(this.start.x, segmentY);
        segmentY += 50;
      }, this);
      this.head = 0;
      this.tail = this.length - 1;

      this.keys.up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.keys.down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.keys.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.keys.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      this.keys.up.onDown.add(this.moveUp, this);
      this.keys.down.onDown.add(this.moveDown, this);
      this.keys.left.onDown.add(this.moveLeft, this);
      this.keys.right.onDown.add(this.moveRight, this);
      
      this.timer = this.game.time.events.loop(this.speed, this.move, this);
    },

    moveUp: function() {
      this.direction = { x: 0, y: -1 };
    },
    moveDown: function() {
      this.direction = { x: 0, y: 1 };
    },
    moveLeft: function() {
      this.direction = { x: -1, y: 0 };
    },
    moveRight: function() {
      this.direction = { x: 1, y: 0 };
    },

    move: function() {
      var neck = this.sprites.getAt(this.segments[0]);
      this.segments.unshift(this.segments.pop());
      var x = neck.x + 50 * this.direction.x;
      var y = neck.y + 50 * this.direction.y;
      this.sprites.getAt(this.segments[0]).reset(x, y);

      // testing
      if (Math.random() * 100 > 85)
        this.grow2();
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
      console.log('head: ' + this.head);
      console.log('tail: ' + this.tail);
      console.log('length: ' + this.length);
      this.sprites.forEachAlive(function(segment) {
        var i = this.sprites.getIndex(segment);
        console.log(i + ": " + "(" + segment.x + ", " + segment.y + ")");
      }, this);
    }

  };

  window['snake'] = window['snake'] || {};
  window['snake'].Entities = window['snake'].Entities || {};
  window['snake'].Entities.Snake = Snake;
}());
