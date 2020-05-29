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
* Language support 
    * i18n with transloco 

* Timer recovery 
    * Remember where the counter was and continue from there in case of refresh 
    * LocalStorage is a possible solution 

* Update browser title on timer state/seconds count change 
    * PWA & Service workers 
    
* Accessibility 
    * Aria tags, to start with the least. Go for Medium articles and official Angular documentation.

#### -- Future Versions -- 
* Tutorial
    * Step by step "How to use" guide to show users how the application works 

## Bugs to fix 
* [FIXED] #1 - State transition
    * Start -> pause -> done (now in counting state)
    * If we click pause now, the PAUSED state shows a red background, and we can see DONE (instead of SKIP) 
