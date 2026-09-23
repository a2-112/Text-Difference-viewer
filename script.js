const firstCon = document.getElementById("first");
const secondCon = document.getElementById("second");
const compare = document.getElementById("compare");
const history = document.getElementById("all");
const showHistory = document.getElementById("show");
const clearHistory = document.getElementById("clear");
const inputValue = document.getElementById("input-values");
const lcs_Percent = document.getElementById("match");
const warning = document.getElementById("warning");

// collect text and makes them reusable
let value1 = "";
let value2 = "";

//Store Sequence
let sequence = {};

const storage = () => {
  return JSON.parse(localStorage.getItem("result")) || [];
};
const renderHistory = (str1, str2, percent, match, date) => {
  const output = {
    id: crypto.randomUUID(),
    text1: str1,
    text2: str2,
    similarity: percent,
    matchedText: match,
    date: date.toDateString()
  };
  if (
    !output.text1 ||
    !output.text2 ||
    output.similarity === undefined||
    !output.matchedText ||
    !output.date
  )
    return;
  const result = storage();
  result.push(output);
  localStorage.setItem("result", JSON.stringify(result));
};

// finding longest common text sequence
function findLCS(str1, str2, i, j) {
  //base case(when nothing is left)
  if (i === str1.length || j === str2.length) return "";
  //if it exist in the sequence storage
  if (`${i},${j}` in sequence) {
    return sequence[`${i},${j}`];
  }
  //"These characters match. Keep this character, then recursively find the rest."
  if (str1[i] === str2[j]) {
    sequence[`${i},${j}`] = str1[i] + findLCS(str1, str2, i + 1, j + 1);
  }
  /* Not a match. skip character from the first string, and also 
try skipping the character from the second string.*/
  if (str1[i] !== str2[j]) {
    let result1 = findLCS(str1, str2, i + 1, j);
    let result2 = findLCS(str1, str2, i, j + 1);
    //Keep whichever character that has the longer subsequence produced by the two possible paths.
    if (result1.length > result2.length) {
      sequence[`${i},${j}`] = result1;
    } else {
      sequence[`${i},${j}`] = result2;
    }
  }
  return sequence[`${i},${j}`];
}
// used to find matches from lcs returned storage
const getMatches = (str, lcs) => {
  const chars = [...str];
  // Map stores the indexes of characters that matched
  const matches = new Map();
  //index value
  let i = 0;
  let j = 0;
  // Keep going while there are still characters available in BOTH the original text and the LCS.
  while (i < chars.length && j < lcs.length) {
    // if main text and match text are equal
    if (chars[i] === lcs[j]) {
      // save the index as a key and value as true
      matches.set(i, true);
      // increment count for both
      i++;
      j++;
    } else {
      // if false move only the main text forward
      i++;
    }
  }
  // return
  return matches;
};
// this is based on how the text will be highlighted in the browser
const highlight = (str, matches, i) => {
  // Convert the string into Unicode-aware characters
  // so characters like emoji are not split by str[i]
  const chars = [...str];
  // var that holds the html display result
  let output = "";
  //base case
  if (i === chars.length) return "";
  // if the index exist in matches object
  if (matches.has(i)) {
    //create a span of match for it
    output += `<span class="match">${chars[i]}</span>`;
  } else {
    // create a span of different
    output += `<span class="difference">${chars[i]}</span>`;
  }
  // return the format and rerun again
  return output + highlight(str, matches, i + 1);
};

const percentage = (str1, str2, lcs) => {
  const longest = Math.max(str1.length, str2.length);
  const percent = Math.floor((lcs.length / longest) * 100);
  return percent;
};

// mainly for displaying result in html
const display = (str1, str2, result, percent) => {
  inputValue.innerHTML = `
  <p><span>Original Text 1: </span>${str1}</p> 
  <p><span>Original Text 2: </span>${str2}</p>`;
  lcs_Percent.innerHTML = `
  <p><span>Matched Text: </span>${result}</p> 
  <p>${percent}%</p>`;
};

const displayHistory = () => {
  const items = storage();
  const all = items.map((item) => {
    return `
  <div class="card" data-id="${item.id}">
  <div class ="content">
  <ul>
  <li><span>Text 1: </span>${item.text1}</li>
  <li><span>Text 2: </span>${item.text2}</li>
  <li><span>Similarity: </span>${item.similarity}%</li>
  <li><span>Matched Text: </span>${item.matchedText}</li>
  <li><span>Date: </span>${item.date}</li>
  </ul>
  </div>
  <div class ="card-btn">
  <button class="delete">Delete</button>
  </div>
  </div>
  `;
  }).join("");
  history.innerHTML = all
}

const deleteFunction = (id) => {
  const memory = storage()
  const remove = memory.filter(item => item.id !== id)
  localStorage.setItem("result",JSON.stringify(remove))
}

// At new input clear Sequence
const clear = () => {
  sequence = {};
};
// at typing take it text
firstCon.addEventListener("input", () => {
  value1 = firstCon.value.toLowerCase();
});
// at typing take it text
secondCon.addEventListener("input", () => {
  value2 = secondCon.value.toLowerCase();
}); 

history.addEventListener("click", (e) => {
  if(e.target.closest(".delete")){
  const card = e.target.closest(".card").dataset.id
  deleteFunction(card)
    displayHistory()
  }
})

showHistory.addEventListener("click", () => {
   const isHidden= history.toggleAttribute("hidden");
  if(!isHidden){
    showHistory.innerText = "Close History"
      displayHistory()
  }else {
    showHistory.innerText = "Show History";
  }
})

clearHistory.addEventListener("click", () => {
  history.innerHTML = ""
  history.hidden = true
  showHistory.innerText = "Show History";
  localStorage.clear()
})

// Compare both texts and display the LCS result
compare.addEventListener("click", () => {
if (!value1 || !value2) {
  warning.innerText = "Please enter text in both fields.";
  return;
}
warning.innerText = "";
// Convert the string into Unicode-aware characters
  // so characters like emoji are not split by str[i]
  const chars1 = [...value1];
  const chars2 = [...value2];
  const result = findLCS(chars1, chars2, 0, 0);
  const matches = getMatches(value1, result);
  const matches2 = getMatches(value2, result);
  const main = highlight(value1, matches, 0);
  const main2 = highlight(value2, matches2, 0);
  const percent = percentage(chars1, chars2, result);
  const date = new Date();
  renderHistory(value1, value2, percent, result, date);
  display(main, main2, result, percent);
});
// in the body once there is a new type reset sequence storage
document.addEventListener("input", clear);
displayHistory()