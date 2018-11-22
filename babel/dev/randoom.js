Array.prototype.randomSort = function() {
  return this.sort((a, b) => 0.5 - Math.random())
}

const SPECIAL_CHARS = ".-_$*()#@!%/".split("")

class randoom {
  constructor(options = {}) {
    this.SETTINGS = { ...this.SETTINGS, ...options }
    const { text, amount } = this.SETTINGS
    this.setVowels(text)
    this.setConsonants(text)
    return this.newFilledArr(amount < 1 ? 1 : amount).map(_ => this.generate())
  }

  allowedSpecialCharsLen = _ => SPECIAL_CHARS.length - 1

  SETTINGS = {
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
  }

  consonants = []
  setConsonants = consonants => {
    consonants = consonants.match(/[^aeiou]/gi)
    this.consonants = consonants != null ? consonants.randomSort() : []
  }

  vowels = []
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
      let randPos = this.roundedRand(conLen)
      if (arrPos.indexOf(randPos) < 0) arrPos.push(randPos)
      if (arrPos.length === voLen) break
    }
    return con
      .map((consonant, i) =>
        arrPos.indexOf(i) >= 0 ? consonant + vo[arrPos.indexOf(i)] : consonant
      )
      .join("")
  }

  consonantVowel = _ =>
    this.consonantsTop
      ? this.consonantVowelSort(this.vowels, this.consonants)
      : this.vowels
          .map((vowel, i) =>
            this.consonants[i] ? this.consonants[i] + vowel : vowel
          )
          .randomSort()
          .join("")

  newFilledArr = size => new Array(size).fill(0)
  randomVowel = _ => ["a", "e", "i", "o", "u"][this.roundedRand(4)]
  generate = _ => {
    const sett = this.SETTINGS
    if (sett.text == "") {
      let { digits, specialChars, lowerCase, upperCase } = sett
      digits = lowerCase + upperCase + specialChars <= 0 ? true : digits
      let seedSize = sett.seedSize
      let optionsOn = digits + specialChars + lowerCase + upperCase
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

      if (upperCase) {
        upperCase = this.newFilledArr(chunkSizeArr[currChunkPos])
          .map(_ =>
            [0, 1, 2, 3, 4, 0][
              sett.almostReadableSeed ? this.roundedRand(5) : 1
            ]
              ? String.fromCharCode(65 + this.roundedRand(25))
              : this.randomVowel().toUpperCase()
          )
          .join("")
        ++currChunkPos
      } else upperCase = ""

      if (lowerCase) {
        lowerCase = this.newFilledArr(chunkSizeArr[currChunkPos])
          .map(_ =>
            [0, 1, 2, 3, 4, 0][
              sett.almostReadableSeed ? this.roundedRand(5) : 1
            ]
              ? String.fromCharCode(97 + this.roundedRand(25))
              : this.randomVowel()
          )
          .join("")
        ++currChunkPos
      } else lowerCase = ""

      if (specialChars) {
        let specialCharsLen = Math.round(
          chunkSizeArr[currChunkPos] * (optionsOn <= 1 ? 1 : 0.6)
        )
        specialChars =
          this.newFilledArr(specialCharsLen)
            .map(
              _ =>
                SPECIAL_CHARS[this.roundedRand(this.allowedSpecialCharsLen())]
            )
            .join("") +
          new randoom({
            ...this.SETTINGS,
            specialChars: false,
            seedSize: chunkSizeArr[currChunkPos] - specialCharsLen,
            amount: 0
          })[0]
        ++currChunkPos
      } else specialChars = ""

      if (digits)
        digits = this.newFilledArr(chunkSizeArr[currChunkPos])
          .map(_ => this.roundedRand(9))
          .join("")
      else digits = ""

      let response = [lowerCase, upperCase, digits, specialChars]
        .randomSort()
        .join("")
      if (sett.lowerCase + sett.upperCase > 1 && sett.consonantVowel) {
        this.setVowels(response)
        this.setConsonants(response)
        return this.consonantVowel()
      }
      return response
        .split("")
        .randomSort()
        .join("")
    } else {
      let response = sett.text
      let availPosLeft = sett.seedSize - response.length
      let randomPosLeft = this.roundedRand(availPosLeft)
      randomPosLeft = randomPosLeft > 0 ? randomPosLeft : 0
      if (sett.fixedText) {
        let len = sett.text.length
        response = new randoom({
          ...this.SETTINGS,
          text: ""
        })[0]
        if (sett.consonantVowel) {
          this.setVowels(response)
          this.setConsonants(response)
          response = this.consonantVowel()
        }
        return (
          response.substr(0, randomPosLeft) +
          sett.text +
          response.substr(randomPosLeft + len - 1)
        )
      }
      if (sett.seedSize > response.length) {
        response =
          response +
          new randoom({
            ...this.SETTINGS,
            text: "",
            seedSize: availPosLeft
          })[0]
      }

      if (sett.consonantVowel) {
        this.setVowels(response)
        this.setConsonants(response)
        return this.consonantVowel()
      }

      return response
        .split("")
        .reverse()
        .randomSort()
        .join("")
    }
  }
}

console.log(
  new randoom({
    text: "dennyportillo",
    consonantVowel: true
  })
)

console.log(
  new randoom({
    text: "dennyportillo"
  })
)

console.log(
  new randoom({
    seedSize: 10,
    text: "dennyportillo",
    amount: 3,
    consonantVowel: true
  })
)

console.log(
  new randoom({
    seedSize: 20,
    almostReadableSeed: true,
    consonantVowel: true,
    digits: true,
    specialChars: true
  })
)

console.log(
  new randoom({
    seedSize: 20,
    digits: true,
    lowerCase: false
  })
)

console.log(
  new randoom({
    specialChars: true,
    lowerCase: false
  })
)
