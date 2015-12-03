# Install Git

1. Go to [git-scm.com](http://git-scm.com)
1. Click on the download button on the right.
1. Once downloaded, run the file.
1. Click "Next" on all the options.
1. Installation should run.

# First commands

Let's first try a few things in this "Terminal".

1. We ask the computer where we are by typing

  ```bash
  pwd
  ```

  Press <kbd>Enter</kbd> to run the command.

  This stands for **p**rint **w**orking **d**irectory.  The terminal has automatically put us in our "home" folder, or directory.

1. Let's ask the computer to **l**i**s**t what we have in this directory by typing

  ```bash
  ls
  ```

  Once again, press <kbd>Enter</kbd> to run the command.

1. Neat! Let's **m**a**k**e a **dir**ectory by typing and running

  ```bash
  mkdir hello
  ```

1. Type and run

  ```bash
  ls
  ```

  again.  You should see ```hello``` listed in the results.

| Command | What it means | What it does |
| ------- | ------------- | ------------ |
| `pwd` | **p**rint **w**orking **d**irectory | Tells us where we are |
| `ls` | **l**i**s**t | List the things that are in this directory |
| `mkdir` | **m**a**k**e a **dir**ectory | make a new directory in we are |


# Telling git about our project

1.  **C**hange **d**irectory into ```project-folder-path``` by typing and running

  ```bash
  cd project-folder-path
  ```

1. Type and run

  ```bash
  ls
  ```
  and you'll see your project files.

1. Type and run

  ```bash
  git init
  ```

  This will **init**ialize the project folder that we are in to be tracked.

1. We can see what `git` knows about our project

  ```bash
  git status
  ```

1. We see that `git` knows about our files, but is it "untracked."  This means that git is not yet tracking the changes in this file.  We have to tell git to **add** this file to a list of files it'll keep an eye on.

  ```bash
  git add -A
  ```

  This will add all the files.

1. We can tell git to save, or **commit** our changes to it's memory, with a **m**essage describing what we did.

  ```bash
  git commit -m "code for my character game"
  ```

  Once git has done this, it'll tell us what it tracked.

Now that git knows abut our project, we can use it to put the code online.


# Signing up for [github.com](https://github.com)

1. Sign up on the form on the right: [github.com](https://github.com)

1. If it asks about a plan, pick the free one.

1. You're all signed up!

# Make a repository online

1. Click on the plus sign by your username.

1. Click on `New Repository` from the drop-down.

1. Let's name our repository the same as our directory name.

1. Click 'Create Repository'.

# Connect the repository on our computer to it's new online home.

1. GitHub shows some code like this:

  ```bash
  git remote add origin https://github.com/pandafulmanda/hello.git
  git push -u origin master
  ```

  You can click on the clipboard button on the right to copy the code to your clipboard.

1. Press <kbd>Enter</kbd> to run the code. We will be asked to login.  Once we do, the code will get put online.  Now, if refresh the page, we'll see our code!

# Hosting our site on github

Something cool we can do, is tell github to host our site online for us. We can do this by:

1. Make a new branch locally called `gh-pages`

  ```bash
  git branch gh-pages
  ```

1. Checkout the `gh-pages` branch

  ```bash
  git checkout gh-pages
  ```

1. Push the `gh-pages` to github so that there is a `gh-pages` branch/parallel universe on github as well.

  ```bash
  git push
  ```

1. Github will then process our code, and host it at an address in this format:

  ```
  my-username.github.io/my-repo-name
  ```

That's it!  You're live and online!


# Resources
[More here](https://github.com/codeparkhouston/materials/tree/master/lesson-8)

[GitHub For Beginners](http://readwrite.com/2013/09/30/understanding-github-a-journey-for-beginners-part-1)
