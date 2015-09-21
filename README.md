# Fall 2015

| Concepts | Topics |
|------|--------|
| Introduction | Class expectations and introduction to programming |
| Functions | Using and writing functions |
| Types &amp; Logic | Working with strings, numbers, arrays, objects, etc. |
| Events &amp; interactivity | Reacting to events and changes |
| DOM-ination | Manipulating the webpage |
| HTML &amp; CSS | Displaying and styling content |
| AJAX &amp; APIs | Talking to other sites |


# Spring 2016

A semester long real-world project practicing

| Concepts | Topics |
|----------|--------|
| Project introductions | Learn about the projects |
| Collaborating | git, Github, pull requests, forks, merging |
| Using libraries and frameworks | Bootstrap, lodash, package management |
| Understanding requirements | Communicating ideas and features |




## To build locally

1. clone
  * [hs-utils](https://github.com/codeparkhouston/hs-utils)
    * Common utils for lessons like reveal, lodash, video nav, etc.
  * [hs-fall-2015](https://github.com/codeparkhouston/hs-fall-2015)
    * Curriculum stuffs
  * Common exercises
    * [code-lion](https://github.com/codeparkhouston/code-lion)
1. make a new local dir
1. `cd ` into the local dir
  * `ln -s ../hs-utils/dist/ ./hs-utils`
    * you may need to checkout the `gh-pages` branch
  * `ln -s ../hs-fall-2015/ ./hs-fall-2015`
  * `ln -s ../code-lion/ ./code-lion`
  * run a local server
    * i.e. `http-server -p 4000`
 
TODO: replace method above and set up git subtrees instead
