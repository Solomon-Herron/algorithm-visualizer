![logo](/docs/logo.png)

[![App](https://img.shields.io/badge/Live%20App-heroku-purple?style=for-the-badge)](http://sherron-algorithm-visualizer.herokuapp.com/)

![Demo](/docs/projectdemo.gif)
This project is a was created as a means to visualize how certain algorithms work. It should be noted that the intended scope of this project is fairly large, I plan to continue improving it until I graduate university. All of the intended functionality would be impossible to complete within a single semester. 

**Version 1.4.10**
___
## Installation
1.) Download Node.js. Once successfully installed, open the terminal and run: 
```javascript
npm install
```
All of the neccesary dependencies are in the package.json file so this should get you up and running.

2.) After installing dependencies,  run:
```javascript
npm app.js
```
or
```javascript
npm start
```
3.) Navigate to 127.0.0.1:3000 in your browser.
___
## Issues


I am a novice with Javascript and have come across a few challenges while working on this project up to this point, and my code has a few quirks that were created as quick work arounds.

The first of which is the following code snippet:
![code snippit](/docs/blocking.png)

I am terminate a script upon a click event, so whenever a demonstration is running, if you click a sort button again, a second instance of a sorting algorithm will beginning along side the previously executing demonstration. To work around this issue, all of my interactive buttons contain a small code block to stop the corresponding event handler from running if there is already an algorithm demonstration executing. 
___
I have not mastered callback functions yet. I need to spend a week or so studying the subject. Once I do I am reasonably sure most of my issues with this project will be resolved. 

Anywho, because I don't understand callbacks and asynch javascript very well, you will see this line of code paste everywhere:
![code snippit](/docs/callback.png)

The intended  function is to set a small delay inbetween the execution of functions. I need to learn callbacks so I can have certain functions execute immediately after others, instead of having an arbitrary amount of time pass over before executing the new code block. This is obviously not very scalable and would likely cause a huge bottleneck irl.

___
I cannot get my mongoDB connection to work. Why? Because I don't know how frigging callback functions work so I don't now how to properly use the methods provided by mongoose.I keep getting errors during my user.save() command. If anybody is reading this, please help.

This is my DB access set up (I didn't get very far): 
![code snippit](/docs/brokenLogin.png)

# Road Map
-Classes

-Mobile version

-Backend

-Master callback functions

-Pathfinding algorithms

-Data structure visualizer

## License & copyright
© Solomon N Herron, University of Texas at Dallas | Collin College

