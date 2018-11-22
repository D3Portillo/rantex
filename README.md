# rantex
Library to generate random stuff, can use seeds, or create completely random text

## USE

```javascript
console.log(new rantex({text: "facebook"}))
// can out: kkeqocfabo
//randoms "facebook" string chars

console.log(new rantex({text: "facebook", consonantVowel: true}))
// can out: cokabyofer
//randoms "facebook" but sorts to vowel + consonant

console.log(new rantex())
// can out: xbbxstdlms
//complete random text , default seedSize: 10

console.log(new rantex({moreVowels: true}))
// can out: uuneewginz
//generates random stuff but, includes more vowels /randomly/ , due to size of alphabet randomzity

console.log(new rantex({moreVowels: true, consonantVowel: true}))
// can out: abwrguseli
//random text + moreVowels + sorted by consonant + vowel

console.log(new rantex({seedSize: 20, fixedText: true, text: "awesome", moreVowels: true, consonantVowel: true}))
// can out: thhoawesomepuqlkiqmnx => thho awesome puqlkiqmnx
//if text has a seedSize, means you want more random text
```
