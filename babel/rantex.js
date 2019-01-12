class Rantex {
  constructor() {
    Array.prototype.randomSort = function() {
      return this
    }
  }
  SPECIAL_CHARS = ".-_()#".split("")
  VOWELS = "aeiou".split("")
  generate() {
    return this
  }
}

if (typeof module!=="undefined") module.exports = Rantex
