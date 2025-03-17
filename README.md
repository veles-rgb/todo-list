# 2DUE
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | ![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff) | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
|---|---|---|


A modular JavaScript-based todo list application built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list). The app allows users to create and manage multiple todo lists, with each list containing its own set of tasks. Tasks are dynamically added, displayed as individual elements within a task container, can be edited and deleted as needed. The app uses the Web Storage API to ensure todos persist across sessions. The modular structure keeps Todo and Task logic separate, ensuring clean and maintainable code.

## Features
- Simple user interface
- Create multiple todo lists (each represented as a Todo instance).
- Add tasks to specific todo lists, ensuring proper association.
- Add, edit and delete todos or tasks as needed.
- Add due dates to tasks.
- Add priority levels to tasks based on importance (!, !!, !!!).
- Display task information dynamically within the info container.
- Add notes to individual tasks within the info container.
- Uses date-fns to provide better due date displays.
- Local storage using Web Storage API.

## Dependencies
This project uses the following npm packages:

- [webpack](https://webpack.js.org/) – Module bundler  
- [date-fns](https://date-fns.org/) – Date utility library  

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [webpack](https://webpack.js.org/)
- [date-fns](https://date-fns.org/)

## Resources
- [Clock SVG](https://feathericons.com/) icon by feathericons
- [Jumper](https://www.dafont.com/jumper-3.font?text=Tasks+%28test%29) font by Måns Grebäck
- [Moogalator](http://dafont.com/moogalator.font?text=Tasks+%28test%29) font by Tup Wanders

## Authors
- [@veles-rgb](https://github.com/veles-rgb)
