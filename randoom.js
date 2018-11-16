let cosonantVowel = true
// if true it tries to respect "readable" text, example axxew => xewax
let seed = {
  active: true,
  digits: true,
  includeLowerCase: true,
  specialChars: true,
  includeUpperCase: true,
  len: 20
  //amount of chars
}
// seed is not active, if active evaluates if has lowUpCase digits and speciealChars

let allowedSpecialChars = ".-_$*()#@!%/".split("")
let allowedSpecialCharsLen = allowedSpecialChars.length - 1

Array.prototype.randomSort = function() {
  return this.sort((a, b) => 0.5 - Math.random())
}
//add the random sorting (randomSort) function to Array class

let randomMeMoreBabe = (vo, con) => {
  const conL = con.length - 1
  const voL = vo.length
  if (voL <= 0) return con.join("")
  let arrPos = []
  while (true) {
    let randPos = roundedRand(conL)
    if (arrPos.indexOf(randPos) < 0) arrPos.push(randPos)
    if (arrPos.length === voL) break
  }
  return con
    .map((consonant, i) =>
      arrPos.indexOf(i) >= 0 ? consonant + vo[arrPos.indexOf(i)] : consonant
    )
    .join("")
}

let roundedRand = n => Math.round(Math.random() * n)

let randomize = txt => {
  if (typeof txt != "string") {
    seed = {
      digits: txt.digits || false,
      includeLowerCase: txt.includeLowerCase || true,
      specialChars: txt.specialChars || false,
      includeUpperCase: txt.includeUpperCase || false,
      len: txt.includeUpperCase || seed.len
    }
    txt = txt.text || ""
  }
  let vowels = txt.match(/[aeiou]/gi)
  vowels = vowels != null ? vowels.randomSort() : []
  let consonants = txt.match(/[^aeiou]/gi)
  consonants = consonants != null ? consonants.randomSort() : []
  consonantsTop = consonants.length >= vowels.length
  if (seed.active) {
    let { digits, specialChars, includeLowerCase, includeUpperCase } = seed
    let l = seed.len
    let optionOn = digits + specialChars + includeLowerCase + includeUpperCase
    let lQ = Math.ceil(l / optionOn)
    let lQArr = new Array(optionOn).fill(lQ)
    lQArr.map(e => 1 + roundedRand(e))
    while (true) {
      let sum = lQArr.reduce((total, el) => total + el)
      if (sum - 1 < l) break
      lQArr.sort((a, b) => b - a)
      lQArr[0] = lQArr[0] - 1
    }
    lQArr.randomSort()
    let lQPos = 0
    if (includeUpperCase) {
      includeUpperCase = new Array(lQArr[lQPos])
        .fill(0)
        .map(e => String.fromCharCode(65 + roundedRand(25)))
        .join("")
      ++lQPos
    } else includeUpperCase = ""
    if (includeLowerCase) {
      includeLowerCase = new Array(lQArr[lQPos])
        .fill(0)
        .map(e => String.fromCharCode(97 + roundedRand(25)))
        .join("")
      ++lQPos
    } else includeLowerCase = ""
    if (specialChars) {
      let noSpecialCharsLen = Math.round(lQArr[lQPos] * 0.6)
      specialChars =
        new Array(noSpecialCharsLen)
          .fill(0)
          .map(e => allowedSpecialChars[roundedRand(allowedSpecialCharsLen)])
          .join("") +
        randomize({
          len: lQArr[lQPos] - noSpecialCharsLen,
          includeUpperCase: true,
          digits: true
        })
      ++lQPos
    } else specialChars = ""
    if (digits)
      digits = new Array(lQArr[lQPos])
        .fill(0)
        .map(e => roundedRand(9))
        .join("")
    else digits = ""
    return [includeLowerCase, includeUpperCase, digits, specialChars]
      .randomSort()
      .join("")
      .split("")
      .randomSort()
      .join("")
  } else if (cosonantVowel)
    return consonantsTop
      ? randomMeMoreBabe(vowels, consonants)
      : vowels
          .map((vowel, i) => (consonants[i] ? consonants[i] + vowel : vowel))
          .randomSort()
          .join("")
  else
    return txt
      .split("")
      .randomSort()
      .sort((a, b) => Math.random() - 0.5)
      .join("")
}

console.log(randomize("eeeeeeeiouuu"))
