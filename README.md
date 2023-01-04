![alt text](https://i.imgur.com/Vdwyb1L.png)

# Halogens
This is the source code for www.halogensband.com the website for my band "Halogens". The entire application was written using the React.js framework.

# Features
* Responsive footer with social media links
* Responsive navbar (mobile friendly)
* Blog built using Google's Blogger API
* Custom built web audio player capable of playing playlsts/albums built using web audio API(OOP design)
  * Audio frequency/waveform visualiser with unique colours to each track's specification
  * Custom artwork for each album and single(if artwork is provided unique to each single)
  * Responsiveness and mobile friendly
  * Functional on all modern browsers(Firefox, Opera, Chrome, Edge, Safari) and devices
* About section
* Contact form built using EmailJs API

# Current Problems With The Website
* Not very SEO friendly
  Currently builds client side using React code and thus is not efficient for crawlers and bots
* Messy CSS
  While the final result looks rather nice the underlying CSS code can be a bit messy, i.e there are
  numerous classes with strange names to allow for classes to have modular CSS styles
* Not scalable(long term)
  Currently the website lacks a strong backend codebase and will need to have one implemented if I wish to scale it.
  
# Solutions To The Current Problems
* Next JS and SASS

# Features Coming In "Phase 2"
* MailChimp Email Subscription Component
* All round better SEO
* Better mobile friendly web player
* Make the web play more modular and available for download without using this particular git repo
* More detailed about page with portfolios for different credited people
* Use SASS
* Much tidier API masking third party api use in code
* Adding some plugins available for download (see my github profile)
* Comment section for blog (built using MERN stack)
