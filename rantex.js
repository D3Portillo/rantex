"use strict";

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

Array.prototype.randomSort = function () {
  return this.sort(function (a, b) {
    return 0.5 - Math.random();
  });
};

var SPECIAL_CHARS = ".-_$*()#@!%/".split("");

var randoom = function randoom() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, randoom);

  _defineProperty(this, "allowedSpecialCharsLen", function (_) {
    return SPECIAL_CHARS.length - 1;
  });

  _defineProperty(this, "SETTINGS", {
    text: "",
    digits: false,
    lowerCase: true,
    specialChars: false,
    upperCase: false,
    seedSize: 10,
    almostReadableSeed: false,
    consonantVowel: false,
    fixedText: false,
    amount: 0
  });

  _defineProperty(this, "consonants", []);

  _defineProperty(this, "setConsonants", function (consonants) {
    consonants = consonants.match(/[^aeiou]/gi);
    _this.consonants = consonants != null ? consonants.randomSort() : [];
  });

  _defineProperty(this, "vowels", []);

  _defineProperty(this, "setVowels", function (vowels) {
    vowels = vowels.match(/[aeiou]/gi);
    _this.vowels = vowels != null ? vowels.randomSort() : [];
  });

  _defineProperty(this, "consonantsTop", function (_) {
    return _this.consonants.length >= _this.vowels.length;
  });

  _defineProperty(this, "roundedRand", function (n) {
    return Math.round(Math.random() * n);
  });

  _defineProperty(this, "consonantVowelSort", function (vo, con) {
    var conLen = con.length - 1;
    var voLen = vo.length;
    if (voLen <= 0) return con.join("");
    var arrPos = [];

    while (true) {
      var randPos = _this.roundedRand(conLen);

      if (arrPos.indexOf(randPos) < 0) arrPos.push(randPos);
      if (arrPos.length === voLen) break;
    }

    return con.map(function (consonant, i) {
      return arrPos.indexOf(i) >= 0 ? consonant + vo[arrPos.indexOf(i)] : consonant;
    }).join("");
  });

  _defineProperty(this, "consonantVowel", function (_) {
    return _this.consonantsTop ? _this.consonantVowelSort(_this.vowels, _this.consonants) : _this.vowels.map(function (vowel, i) {
      return _this.consonants[i] ? _this.consonants[i] + vowel : vowel;
    }).randomSort().join("");
  });

  _defineProperty(this, "newFilledArr", function (size) {
    return new Array(size).fill(0);
  });

  _defineProperty(this, "randomVowel", function (_) {
    return ["a", "e", "i", "o", "u"][_this.roundedRand(4)];
  });

  _defineProperty(this, "generate", function (_) {
    var sett = _this.SETTINGS;

    if (sett.text == "") {
      var digits = sett.digits,
          specialChars = sett.specialChars,
          lowerCase = sett.lowerCase,
          upperCase = sett.upperCase;
      digits = lowerCase + upperCase + specialChars <= 0 ? true : digits;
      var seedSize = sett.seedSize;
      var optionsOn = digits + specialChars + lowerCase + upperCase;
      var chunkSize = Math.ceil(seedSize / optionsOn);
      var chunkSizeArr = new Array(optionsOn).fill(chunkSize);
      chunkSizeArr.map(function (chunk) {
        return 1 + _this.roundedRand(chunk);
      });

      while (true) {
        var sum = chunkSizeArr.reduce(function (total, chunk) {
          return total + chunk;
        });
        if (sum - 1 < seedSize) break;
        chunkSizeArr.sort(function (a, b) {
          return b - a;
        });
        chunkSizeArr[0] = chunkSizeArr[0] - 1;
      }

      chunkSizeArr.randomSort();
      var currChunkPos = 0;

      if (upperCase) {
        upperCase = _this.newFilledArr(chunkSizeArr[currChunkPos]).map(function (_) {
          return [0, 1, 2, 3, 4, 0][sett.almostReadableSeed ? _this.roundedRand(5) : 1] ? String.fromCharCode(65 + _this.roundedRand(25)) : _this.randomVowel().toUpperCase();
        }).join("");
        ++currChunkPos;
      } else upperCase = "";

      if (lowerCase) {
        lowerCase = _this.newFilledArr(chunkSizeArr[currChunkPos]).map(function (_) {
          return [0, 1, 2, 3, 4, 0][sett.almostReadableSeed ? _this.roundedRand(5) : 1] ? String.fromCharCode(97 + _this.roundedRand(25)) : _this.randomVowel();
        }).join("");
        ++currChunkPos;
      } else lowerCase = "";

      if (specialChars) {
        var specialCharsLen = Math.round(chunkSizeArr[currChunkPos] * (optionsOn <= 1 ? 1 : 0.6));
        specialChars = _this.newFilledArr(specialCharsLen).map(function (_) {
          return SPECIAL_CHARS[_this.roundedRand(_this.allowedSpecialCharsLen())];
        }).join("") + new randoom(_objectSpread({}, _this.SETTINGS, {
          specialChars: false,
          seedSize: chunkSizeArr[currChunkPos] - specialCharsLen,
          amount: 0
        }))[0];
        ++currChunkPos;
      } else specialChars = "";

      if (digits) digits = _this.newFilledArr(chunkSizeArr[currChunkPos]).map(function (_) {
        return _this.roundedRand(9);
      }).join("");else digits = "";
      var response = [lowerCase, upperCase, digits, specialChars].randomSort().join("");

      if (sett.lowerCase + sett.upperCase > 1 && sett.consonantVowel) {
        _this.setVowels(response);

        _this.setConsonants(response);

        return _this.consonantVowel();
      }

      return response.split("").randomSort().join("");
    } else {
      var _response = sett.text;
      var availPosLeft = sett.seedSize - _response.length;

      var randomPosLeft = _this.roundedRand(availPosLeft);

      randomPosLeft = randomPosLeft > 0 ? randomPosLeft : 0;

      if (sett.fixedText) {
        var len = sett.text.length;
        _response = new randoom(_objectSpread({}, _this.SETTINGS, {
          text: ""
        }))[0];

        if (sett.consonantVowel) {
          _this.setVowels(_response);

          _this.setConsonants(_response);

          _response = _this.consonantVowel();
        }

        return _response.substr(0, randomPosLeft) + sett.text + _response.substr(randomPosLeft + len - 1);
      }

      if (sett.seedSize > _response.length) {
        _response = _response + new randoom(_objectSpread({}, _this.SETTINGS, {
          text: "",
          seedSize: availPosLeft
        }))[0];
      }

      if (sett.consonantVowel) {
        _this.setVowels(_response);

        _this.setConsonants(_response);

        return _this.consonantVowel();
      }

      return _response.split("").reverse().randomSort().join("");
    }
  });

  this.SETTINGS = _objectSpread({}, this.SETTINGS, options);
  var _this$SETTINGS = this.SETTINGS,
      text = _this$SETTINGS.text,
      amount = _this$SETTINGS.amount;
  this.setVowels(text);
  this.setConsonants(text);
  return this.newFilledArr(amount < 1 ? 1 : amount).map(function (_) {
    return _this.generate();
  });
};
