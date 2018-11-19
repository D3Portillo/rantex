class randoom {
  constructor(options = {text:""}) {
    this.SETTINGS = { ...options }
    this.setVowels(this.SETTINGS.text)
    this.setConsonants(this.SETTINGS.text)
    this.generate()
  }

  init() {
    Array.prototype.randomSort = function() {
      return this.sort((a, b) => 0.5 - Math.random())
    }
    window.allowedSpecialChars = ".-_$*()#@!%/".split("")
    window.allowedSpecialCharsLen = allowedSpecialChars.length - 1
  }

  SETTINGS = {
    text: "",
    digits: true,
    includeLowerCase: true,
    specialChars: false,
    includeUpperCase: false,
    size: 0,
    consonantVowel: false
  }

  consonants = ""
  setConsonants = consonants => {
    consonants = consonants.match(/[aeiou]/gi)
    this.consonants = consonants != null ? consonants.randomSort() : []
  }

  vowels = ""
  setVowels = vowels => {
    vowels = vowels.match(/[aeiou]/gi)
    this.vowels = vowels != null ? vowels.randomSort() : []
  }

  consonantsTop = _ => this.consonants.length >= this.vowels.length
  roundedRand = n => Math.round(Math.random() * n)
  consonantVowelSort = (vo, con) => {
    const conLen = con.length - 1
    const voLen = vo.length
    if (voLen <= 0) return con.join("")
    let arrPos = []
    while (true) {
      let randPos = roundedRand(conLen)
      if (arrPos.indexOf(randPos) < 0) arrPos.push(randPos)
      if (arrPos.length === voLen) break
    }
    return con
      .map((consonant, i) =>
        arrPos.indexOf(i) >= 0 ? consonant + vo[arrPos.indexOf(i)] : consonant
      )
      .join("")
  }

  newFilledArr = size => new Array(size).fill(0)
  generate = _ => {
    const sett = this.SETTINGS
    if (sett.text == "") {
      let { digits, specialChars, includeLowerCase, includeUpperCase } = sett
      let seedSize = sett.size
      let optionsOn =
        digits + specialChars + includeLowerCase + includeUpperCase
      let chunkSize = Math.ceil(seedSize / optionsOn)
      let chunkSizeArr = new Array(optionsOn).fill(chunkSize)
      chunkSizeArr.map(chunk => 1 + this.roundedRand(chunk))

      while (true) {
        let sum = chunkSizeArr.reduce((total, chunk) => total + chunk)
        if (sum - 1 < seedSize) break
        chunkSizeArr.sort((a, b) => b - a)
        chunkSizeArr[0] = chunkSizeArr[0] - 1
      }
      chunkSizeArr.randomSort()
      let currChunkPos = 0

      if (includeUpperCase) {
        includeUpperCase = this.newFilledArr(chunkSizeArr[currChunkPos])
          .map(_ => String.fromCharCode(65 + roundedRand(25)))
          .join("")
        ++currChunkPos
      } else includeUpperCase = ""

      if (includeLowerCase) {
        includeLowerCase = this.newFilledArr(chunkSizeArr[currChunkPos])
          .map(_ => String.fromCharCode(97 + roundedRand(25)))
          .join("")
        ++currChunkPos
      } else includeLowerCase = ""

      if (specialChars) {
        let noSpecialCharsLen = Math.round(chunkSizeArr[currChunkPos] * 0.6)
        specialChars =
          this.newFilledArr(noSpecialCharsLen)
            .map(
              _ =>
                window.allowedSpecialChars[
                  this.roundedRand(window.allowedSpecialCharsLen)
                ]
            )
            .join("") +
          randoom({
            ...this.SETTINGS,
            specialChars: false,
            size: chunkSizeArr[currChunkPos] - noSpecialCharsLen
          })
        ++currChunkPos
      } else specialChars = ""

      if (digits)
        digits = this.newFilledArr(chunkSizeArr[currChunkPos])
          .map(_ => roundedRand(9))
          .join("")
      else digits = ""

      return [includeLowerCase, includeUpperCase, digits, specialChars]
        .randomSort()
        .join("")
        .split("")
        .randomSort()
        .join("")
    } else if (sett.consonantVowel) {
      return this.consonantsTop
        ? this.consonantVowelSort(this.vowels, this.consonants)
        : this.vowels
            .map((vowel, i) =>
              this.consonants[i] ? this.consonants[i] + vowel : vowel
            )
            .randomSort()
            .join("")
    } else {
      return sett.text
        .split("")
        .randomSort()
        .reverse()
        .randomSort()
        .join("")
    }
  }
}

let r = new randoom()