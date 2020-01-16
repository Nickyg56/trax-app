# Trax Client

Trax is an application designed to make project management easier and more efficient. Users can quickly create an account and start managing projects with their peers. 

Live App: Coming soon.

Server Repo: [Trax Server](https://github.com/Nickyg56/trax-server)

## Overview

Core features and components

**some of the feature in the overview are still in development**

* Dashboard 
  - From here users can see their user information. 
  - The sidebar component gives users the ability to easily navigate to any of their projects, chat with members of a project or see which events are about to occur.
  - The search bar allows users to find any project on the site and view a visitor page for that project.
  - Access to personal user calendar

* ProjectsRoute
  - Viewable by members of a project
  - Certain actions are limited only to admins of the project 
  - View project specific calendar

* Calendar
  - Color coded so user can easily and intuitively see which days have passed, the current day, and upcoming days as well as which days have been marked unavailable, have events or have lists (see upcoming features below).
  - Month and year navigation to plan far in advance.

### Technologies
  - React
  - Momentjs (used to handle dates and critical to the calendar component)
  - Jwt-decode (used for authentication as well as persistence of essential user data)
  - socket.io-client (used to improve user experience with components such as the project search, user search and chat)

### Commands

- npm start
    - Runs application in development mode

- npm run build
    - Creates a build folder for deployment

- npm test
    - Launches test runner

- npm run eject
    - One way operation. Allows you to customize the configuration of the build to fit your needs.

#### Upcoming Features

Currently the Trax application is being developed with a specific set of user stories in mind. Once completed these features will be deployed and tested so they can be improved and iterated upon. After the core features have been proven to work smoothly and efficiently I will begin development of the features in this section.

- Email notifications for events 'day of'. 
  - nodemailer will be used to notify users of an event they are associated with
  - this feature will be optional (if the user doesn't wish to recieve email notifications, they won't!)

- The addition of lists to specific days.
  - similarly to how events are handled but geared more towards tasks an individual or group
  wishes to accomplish.
  - User will be able to click into a day on their calendar (as long as they are an admin of the project, or on their personal calendar) and be able to click an 'Add List' button to add a list to that day.
  - A list could be anything. Ex: Grocery List, Todo list etc.
  - Lists can be checked of one item at a time or wholesale marked complete.
  - A list can be saved to a users 'Lists' to be used again at anytime.
  - Lists can be deleted and edited by the user who created the list.
