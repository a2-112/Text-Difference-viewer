# LCS Text Difference Viewer

A JavaScript-based text comparison tool that uses the **Longest Common Subsequence (LCS)** algorithm to compare two pieces of text and visually highlight the characters they have in common and the characters that differ.

## ✨ Features

* Compare two different texts
* Find the **Longest Common Subsequence (LCS)**
* Highlight matching characters
* Highlight different characters
* Display the matched text separately
* Handle emoji and other Unicode characters more safely
* Responsive interface for different screen sizes
* Clear, visual representation of text differences

## 🧠 How It Works

The project uses the **Longest Common Subsequence (LCS)** algorithm.

LCS finds the longest sequence of characters that appears in both texts **in the same order**, without requiring the characters to be next to each other.

For example:

```text
Text 1:  ABCDE
Text 2:  AXYDE

LCS:     ADE
```

The characters `A`, `D`, and `E` appear in both texts in the same order, so they form the longest common subsequence.

### LCS Logic

The algorithm compares characters at two positions:

* If the characters match, the character is included in the result and both positions move forward.
* If they do not match, two possibilities are explored:

  * Skip the current character from the first text.
  * Skip the current character from the second text.
* The longer resulting subsequence is kept.

The project uses **memoization** to remember results that have already been calculated.

```js
sequence[`${i},${j}`]
```

This prevents the same problem from being solved repeatedly.

## 🔄 Project Flow

```text
User enters two texts
        ↓
Text is converted into Unicode-aware characters
        ↓
LCS algorithm compares both texts
        ↓
Memoized results are reused
        ↓
Matching character positions are identified
        ↓
Characters are wrapped in HTML spans
        ↓
Matches and differences are highlighted
        ↓
Results are displayed in the interface
```

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Recursion
* Memoization
* Longest Common Subsequence (LCS)
* Map
* DOM Manipulation
* Event Listeners
* Unicode-aware character iteration

## 📚 JavaScript Concepts Practiced

This project brought together several concepts I have been learning:

* Functions
* Recursion
* Dynamic Programming
* Memoization
* Arrays
* Strings
* Maps
* Template Literals
* DOM Manipulation
* Event Handling
* `innerHTML`
* Unicode-aware iteration using the spread operator
* Conditional logic
* State management

## 🌍 Unicode Handling

JavaScript strings use UTF-16 internally, which means some characters, especially certain emoji, can occupy more than one UTF-16 code unit.

Instead of relying directly on:

```js
str[i]
```

the project converts strings into arrays using:

```js
[...str]
```

This allows characters such as many emoji to be handled as complete Unicode code points rather than being split into separate pieces.

## 🎨 Interface

The interface uses a dark navy-to-teal gradient with contrasting colors for matches and differences.

### Highlighting

**Matched characters**

```text
Green highlight
```

**Different characters**

```text
Red/pink highlight
```

The goal is to make the comparison easy to understand at a glance.

## 📂 Project Structure

```text
lcs-text-difference-viewer/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Running the Project

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Open `index.html` with Live Server or open it directly in a browser.
4. Enter text into both text areas.
5. Click **Compare**.
6. View the highlighted differences and matched text.

## 🎯 Why I Built This

This project was created as a practical way to apply **Dynamic Programming, recursion, and memoization** to a real problem.

Instead of only practicing algorithms as isolated exercises, I wanted to understand how an algorithm could become part of a useful application.

The project also challenged me to think about:

* How recursive algorithms work in a real application
* How memoization improves repeated calculations
* How to represent matching positions
* How to dynamically generate HTML
* How JavaScript handles Unicode characters
* How algorithmic logic connects to the user interface

## 🔮 Possible Future Improvements

* Add a **Clear** button
* Display character counts
* Display the percentage of matching characters
* Add a match/difference legend
* Improve handling of complex Unicode grapheme clusters
* Improve the alignment of repeated characters
* Add downloadable comparison results
* Add side-by-side synchronized scrolling
* Add a dark/light theme option
* Add automated tests

## 💡 What I Learned

Building this project helped me move from understanding algorithms theoretically to using them to solve an actual problem.

The biggest lesson was that an algorithm is not just something to memorize. It can become the logic behind a real feature when combined with JavaScript, the DOM, and a user interface.

---

**Built with JavaScript by Judy — Code, create, inspire: my journey.**
