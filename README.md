## Lessons

* [Lesson One](../../tree/master/lesson-one)
* [Lesson Two](../../tree/master/lesson-two)






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
