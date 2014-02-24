(function() {
  'use strict';

  function Snake(game, start, length, speed) {
    this.game = game;
    this.start = start;
    this.length = length || 5;
    this.speed = speed || 500;
    this.direction = { x: 0, y: -1 };
    this.name = 'snake';
    this.sprites = null;
    this.keys = {};
  }

  Snake.prototype = {
    create: function() {
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
      //this.timer = this.game.time.events.loop(2500, this.grow, this);
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
      var neck = this.sprites.getAt(this.head);
      this.head = this.tail;
      this.tail = this.tail - 1 >= 0 ? this.tail - 1 : this.length - 1;
      //console.log("moving " + this.head + " to head");
      //console.log("head: " + this.head);
      //console.log("tail: " + this.tail);
      var x = neck.x + 50 * this.direction.x;
      var y = neck.y + 50 * this.direction.y;
      this.sprites.getAt(this.head).reset(x, y);
      if (Math.random() * 100 > 85)
        this.grow();
      //this.log();
    },

    grow: function() {
      var nextTail = this.tail === 0 ? this.length - 1 : this.tail - 1;
      var s1 = this.sprites.getAt(nextTail);
      var s2 = this.sprites.getAt(this.tail);
      var diffx = s2.x - s1.x;
      var diffy = s2.y - s1.y;
      var x = s2.x,
          y = s2.y;
      this.length += 1;
      var s3 = this.sprites.create(x + diffx, y + diffy, this.name);
      console.log("s1: " + s1.x +  ", " + s1.y);
      console.log("s2: " + s2.x +  ", " + s2.y);
      console.log("s3: " + s3.x +  ", " + s3.y);
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

