[![CircleCI](https://circleci.com/gh/saglamcem/pomotodo.svg?style=shield&circle-token=cc7b11ccd3b389ed67d4c9d29f50cf53a49cc570)](https://circleci.com/gh/saglamcem/workflows/pomotodo)

# Pomotodo 

## Goal 
Playing around with Angular concepts, whilst seeking to learn best practices 

## To implement

### - Styling - 
* Drag and drop should be more elegant: 
    * The todo list probably shouldn't be displayed on mobile version 

* Should support mobile design 
    * Decide on a css grid util library 

### - Content -
* Better explain what the Pomodoro technique is, and how the application will be used  
    * Add content [from here](https://francescocirillo.com/pages/pomodoro-technique).

### - Features - 

#### -- Priorities -- 
* [#2] - Todo list management 
    * Flow 
        * How to transition from "To do" to "Current focus"? 
    * Styling 
        * Use @font-faces for Montserrat and Open Sans  
        * [FUTURE] - Maybe not use cdn? 
        * Improve scrollbar css if text height exceeds a limit 

* [#3] - Timer recovery 
    * Remember where the counter was and continue from there in case of refresh  
    * LocalStorage is a possible solution 
    
* [#4] - Update browser title on timer state/seconds count change 
    * PWA & Service workers 

#### -- Future Versions -- 
* [#5] - Language support 
    * i18n with transloco 
    * [See here](https://ngneat.github.io/transloco/)  

* [#6] - Accessibility 
    * Aria tags, to start with the least. Go for Medium articles and official Angular documentation. 

* [#7] - Tutorial 
    * Step by step "How to use" guide to show users how the application works 
    
* [#8] - Zen Mode 
    * By default, the navigation bar can contain links in terms of 
        * what the Pomodoro technique is 
        * what the application does 
        * how it can be used (#7)
    * A button somewhere in the application can toggle Zen mode, hiding distracting parts of the application, thus enabling the user to focus on just work 

## Bugs to fix 
* [FIXED] #1 - State transition 
    * Start -> pause -> done (now in counting state) 
    * If we click pause now, the PAUSED state shows a red background, and we can see DONE (instead of SKIP) 
