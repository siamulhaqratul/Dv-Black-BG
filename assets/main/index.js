System.register("chunks:///_virtual/GameManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './PlayerController.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _createClass, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Prefab, CCInteger, Node, Label, Vec3, instantiate, Component, PlayerController;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      CCInteger = module.CCInteger;
      Node = module.Node;
      Label = module.Label;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      PlayerController = module.PlayerController;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "326d6DtDjZPxJ4SwTMVuYAe", "GameManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BlockType;

      (function (BlockType) {
        BlockType[BlockType["BT_NONE"] = 0] = "BT_NONE";
        BlockType[BlockType["BT_STONE"] = 1] = "BT_STONE";
      })(BlockType || (BlockType = {}));

      var GameState;

      (function (GameState) {
        GameState[GameState["GS_INIT"] = 0] = "GS_INIT";
        GameState[GameState["GS_PLAYING"] = 1] = "GS_PLAYING";
        GameState[GameState["GS_END"] = 2] = "GS_END";
      })(GameState || (GameState = {}));

      var GameManager = exports('GameManager', (_dec = ccclass("GameManager"), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: CCInteger
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: PlayerController
      }), _dec6 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);

        function GameManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "cubePrfb", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "roadLength", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_road", []);

          _initializerDefineProperty(_assertThisInitialized(_this), "startMenu", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "playerCtrl", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "stepsLabel", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = GameManager.prototype;

        _proto.start = function start() {
          var _this$playerCtrl;

          this.curState = GameState.GS_INIT;
          (_this$playerCtrl = this.playerCtrl) === null || _this$playerCtrl === void 0 ? void 0 : _this$playerCtrl.node.on('JumpEnd', this.onPlayerJumpEnd, this);
        };

        _proto.init = function init() {
          if (this.startMenu) {
            this.startMenu.active = true;
          }

          this.generateRoad();

          if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false);
            this.playerCtrl.node.setPosition(Vec3.ZERO);
            this.playerCtrl.reset();
          }
        };

        _proto.generateRoad = function generateRoad() {
          this.node.removeAllChildren();
          this._road = []; // startPos

          this._road.push(BlockType.BT_STONE);

          for (var i = 1; i < this.roadLength; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) {
              this._road.push(BlockType.BT_STONE);
            } else {
              this._road.push(Math.floor(Math.random() * 2));
            }
          }

          var linkedBlocks = 0;

          for (var j = 0; j < this._road.length; j++) {
            if (this._road[j]) {
              ++linkedBlocks;
            }

            if (this._road[j] == 0) {
              if (linkedBlocks > 0) {
                this.spawnBlockByCount(j - 1, linkedBlocks);
                linkedBlocks = 0;
              }
            }

            if (this._road.length == j + 1) {
              if (linkedBlocks > 0) {
                this.spawnBlockByCount(j, linkedBlocks);
                linkedBlocks = 0;
              }
            }
          }
        };

        _proto.spawnBlockByCount = function spawnBlockByCount(lastPos, count) {
          var block = this.spawnBlockByType(BlockType.BT_STONE);

          if (block) {
            this.node.addChild(block);
            block === null || block === void 0 ? void 0 : block.setScale(count, 1, 1);
            block === null || block === void 0 ? void 0 : block.setPosition(lastPos - (count - 1) * 0.5, -1.5, 0);
          }
        };

        _proto.spawnBlockByType = function spawnBlockByType(type) {
          if (!this.cubePrfb) {
            return null;
          }

          var block = null;

          switch (type) {
            case BlockType.BT_STONE:
              block = instantiate(this.cubePrfb);
              break;
          }

          return block;
        };

        _proto.onStartButtonClicked = function onStartButtonClicked() {
          this.curState = GameState.GS_PLAYING;
        };

        _proto.checkResult = function checkResult(moveIndex) {
          if (moveIndex < this.roadLength) {
            if (this._road[moveIndex] == BlockType.BT_NONE) {
              //跳到了空方块上
              this.curState = GameState.GS_INIT;
            }
          } else {
            // 跳过了最大长度
            this.curState = GameState.GS_INIT;
          }
        };

        _proto.onPlayerJumpEnd = function onPlayerJumpEnd(moveIndex) {
          if (this.stepsLabel) {
            this.stepsLabel.string = '' + (moveIndex >= this.roadLength ? this.roadLength : moveIndex);
          }

          this.checkResult(moveIndex);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _createClass(GameManager, [{
          key: "curState",
          set: function set(value) {
            var _this2 = this;

            switch (value) {
              case GameState.GS_INIT:
                this.init();
                break;

              case GameState.GS_PLAYING:
                if (this.startMenu) {
                  this.startMenu.active = false;
                }

                if (this.stepsLabel) {
                  this.stepsLabel.string = '0'; // 将步数重置为0
                }

                setTimeout(function () {
                  //直接设置active会直接开始监听鼠标事件，做了一下延迟处理
                  if (_this2.playerCtrl) {
                    _this2.playerCtrl.setInputActive(true);
                  }
                }, 0.1);
                break;

              case GameState.GS_END:
                break;
            }
          }
        }]);

        return GameManager;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cubePrfb", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "roadLength", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startMenu", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playerCtrl", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "stepsLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerController.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, SkeletalAnimation, systemEvent, SystemEvent, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SkeletalAnimation = module.SkeletalAnimation;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "ddfb1tkyx9BEqyM7xmfE5Db", "PlayerController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PlayerController = exports('PlayerController', (_dec = ccclass("PlayerController"), _dec2 = property({
        type: SkeletalAnimation
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerController, _Component);

        function PlayerController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "CocosAnim", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_startJump", false);

          _defineProperty(_assertThisInitialized(_this), "_jumpStep", 0);

          _defineProperty(_assertThisInitialized(_this), "_curJumpTime", 0);

          _defineProperty(_assertThisInitialized(_this), "_jumpTime", 0.3);

          _defineProperty(_assertThisInitialized(_this), "_curJumpSpeed", 0);

          _defineProperty(_assertThisInitialized(_this), "_curPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_deltaPos", new Vec3(0, 0, 0));

          _defineProperty(_assertThisInitialized(_this), "_targetPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_curMoveIndex", 0);

          return _this;
        }

        var _proto = PlayerController.prototype;

        _proto.start = function start() {};

        _proto.reset = function reset() {
          this._curMoveIndex = 0;
        };

        _proto.setInputActive = function setInputActive(active) {
          if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          }
        };

        _proto.onMouseUp = function onMouseUp(event) {
          if (event.getButton() === 0) {
            this.jumpByStep(1);
          } else if (event.getButton() === 2) {
            this.jumpByStep(2);
          }
        };

        _proto.jumpByStep = function jumpByStep(step) {
          if (this._startJump) {
            return;
          }

          this._startJump = true;
          this._jumpStep = step;
          this._curJumpTime = 0;
          this._curJumpSpeed = this._jumpStep / this._jumpTime;
          this.node.getPosition(this._curPos);
          Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0));

          if (this.CocosAnim) {
            this.CocosAnim.getState('cocos_anim_jump').speed = 3.5; //跳跃动画时间比较长，这里加速播放

            this.CocosAnim.play('cocos_anim_jump'); //播放跳跃动画
          } // if (this.BodyAnim) {
          //     if (step === 1) {
          //         //this.BodyAnim.play('oneStep');
          //     } else if (step === 2) {
          //         this.BodyAnim.play('twoStep');
          //     }
          // }


          this._curMoveIndex += step;
        };

        _proto.onOnceJumpEnd = function onOnceJumpEnd() {
          if (this.CocosAnim) {
            this.CocosAnim.play('cocos_anim_idle');
          }

          this.node.emit('JumpEnd', this._curMoveIndex);
        };

        _proto.update = function update(deltaTime) {
          if (this._startJump) {
            this._curJumpTime += deltaTime;

            if (this._curJumpTime > this._jumpTime) {
              // end
              this.node.setPosition(this._targetPos);
              this._startJump = false;
              this.onOnceJumpEnd();
            } else {
              // tween
              this.node.getPosition(this._curPos);
              this._deltaPos.x = this._curJumpSpeed * deltaTime;
              Vec3.add(this._curPos, this._curPos, this._deltaPos);
              this.node.setPosition(this._curPos);
            }
          }
        };

        return PlayerController;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "CocosAnim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./PlayerController.ts', './GameManager.ts'], function () {
  'use strict';

  return {
    setters: [null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});