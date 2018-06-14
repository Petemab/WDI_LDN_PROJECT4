
![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)


#Project 4: Stand Up Soirée

<hr>

###Overview
Stand Up Soirée allows users to plan a night out based around watching stand-up comedy. Users can sign in, create an event then search for pubs nearby and then save.


###Project Brief

##### Technical Requirements


* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design**
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end, and _at least_ one classical and one functional component on the front-end.

##### Necessary Deliverables

* A **working app** hosted on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
* **A `readme.md` file**

###[Heroku](https://standupsoiree.herokuapp.com/)

###[GitHub Repo](https://github.com/Petemab/WDI_LDN_PROJECT4)

 ---


###Technologies:

For this project I have used the following technologies:

* HTML5
* SCSS
* JavaScript (ECMAScript 6)
* React
* Node JS
* express
* mongoose
* bcrypt
* Git
* GitHub
* Heroku
* Trello
* Balsamiq
* Webpack
* Yarn
* Chai
* Mocha
* nyc
* supertest

---

###APIs Used:

For this project I have used the following APIs:

* Google Maps API
* Google Places
* Skiddle

---

###Wireframes
I used Balsamiq to wireframe my project before I started and the end results were pretty similar:

![]()


---

###Trello

I used Trello to much better effect on this project than in my previous ones. I was much better able to keep across what needed to be done and not get blocked.

TRELLO SCREEN SHOT HERE

---

###Screenshots
Some Screen shots
Home Page:
Home Page Image here

Registration Page: 10fregister

Login Page: 4flogin

Current Donations Page: 5fdonations

Add a Donation: 6fdonationadd

Donation Show Page: 7fdonationshow

Charity Page displaying nearby vendors with available food: 8fvendorshowpage

---

###Challenges and Problems

* While I had used Google Maps/Places in my previous project with some success I found was surprisingly time-consuming trying to get it to do what I wanted.

* Trying to create both a user show page (to display the details of the user who created an event) and also a profile show page (to display the current user details) was tricky. At several points I thought I had solved this issue before discovering something was still up! While I eventualy overcame the issue, as a newcomer to React it was quite difficult trying to understand why State and Props would not always function in the way I had presumed they would.

* After deployment on Heroku I discovered an issue with making my axios requests thanks to CORS. While the final solution of using 'cors-anywhere' in the url was relatively simple, I struggled with various possible solutions before coming up with this.

* Minor issues I assumed would be easy, such as the formatting of times and addresses, proved awkward as well.

---

###Wins

* I was pleased that for this final project I was able to create a plan and braodly stick to it and stay on schedule.

* I was also fairly happy with the styling as I had often found this took me far longer than expected.

---

###Future Features

Features I would have liked to include:

* I would have loved to have included a feature to share the events via email/text with something like nodemailer.

* Adding Google Routes to show distance between bars and venues would also lift the app a bit.

* I would have also like dot have expanded the app to allow users to save favourite comedians and search for events specific to that comic. Ideally also it would have been fun to try and create a 'night in' feature, where users could search for comedy shows on TV/Netflix and perhaps also browse take-aways via the Just Eat api!
