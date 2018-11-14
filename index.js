let cosonantVowel = true
let seed = {
  active: false,
  digits: false,
  includeLowerCase: false,
  specialChars: true,
  includeUpperCase: false,
  len: 500
}
// seed is not active, if active evaluates if has lowUpCase digits and speciealChars

Array.prototype.randomStuff = function() {
  return this.sort((a, b) => 0.5 - Math.random())
}
//add the random sorting (randomStuff) function to Array class

let randomize = txt => {
  let randomMeMoreBabe = (vo, con) => {
    const conL = con.length - 1
    const voL = vo.length
    let arrPos = []
    while (true) {
      let randPos = Math.round(Math.random() * conL)
      if (arrPos.indexOf(randPos) < 0) arrPos.push(randPos)
      if (arrPos.length === voL) break
    }
    return consonants
      .map((consonant, i) =>
        arrPos.indexOf(i) >= 0 ? consonant + vo[arrPos.indexOf(i)] : consonant
      )
      .join("")
  }

  let vowels = txt.match(/[aeiou]/gi).randomStuff()
  let consonants = txt.match(/[^aeiou]/gi).randomStuff()
  consonantsTop = consonants.length >= vowels.length
  if (seed.active) {
    let { digits, specialChars, includeLowerCase, includeUpperCase } = seed
    let l = seed.len
    let lQ = Math.round(
      l / (digits + specialChars + includeLowerCase + includeUpperCase)
    )
    let lQArr = new Array(Math.round(l / lQ)).fill(lQ)
    if (lQArr.length > 1)
      lQArr
        .splice(0, 1, l - lQ)
        .sort(e => 0.5 - Math.random() * lQArr.length - 1)
    let lQPos = 0
    if (includeUpperCase) {
      includeUpperCase = new Array(lQArr[lQPos])
        .fill(0)
        .map(e => String.fromCharCode(65 + Math.round(Math.random() * 25)))
        .join("")
      ++lQPos
    } else includeUpperCase = ""
    if (includeLowerCase) {
      includeLowerCase = new Array(lQArr[lQPos])
        .fill(0)
        .map(e => String.fromCharCode(97 + Math.round(Math.random() * 25)))
        .join("")
      ++lQPos
    } else includeLowerCase = ""
    if (specialChars) {
      specialChars = new Array(lQArr[lQPos])
        .fill(0)
        .map(e =>
          String.fromCharCode(
            [
              33 + Math.round(Math.random() * 14),
              58 + Math.round(Math.random() * 6),
              91 + Math.round(Math.random() * 5),
              123 + Math.round(Math.random() * 3)
            ][Math.round(Math.random() * 3)]
          )
        )
      ++lQPos
    } else specialChars = ""
    if (digits)
      digits = new Array(lQArr[lQPos])
        .fill(0)
        .map(e => Math.round(Math.random() * 9))
        .join("")
    else digits = ""

    let r = includeLowerCase + includeUpperCase + digits + specialChars
    return r
      .split("")
      .sort(e => 0.5 - Math.random())
      .join("")
  } else if (cosonantVowel)
    return consonantsTop
      ? randomMeMoreBabe(vowels, consonants)
      : vowels
          .map((vowel, i) => (consonants[i] ? consonants[i] + vowel : vowel))
          .randomStuff()
          .join("")
  else
    return txt
      .split("")
      .randomStuff()
      .sort((a, b) => Math.random() - 0.5)
      .join("")
}

console.log(randomize("facebook"))
