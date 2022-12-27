![alt text](https://i.imgur.com/Vdwyb1L.png)

#Halogens
This is the source code for www.halogensband.com the website for my band "Halogens". The entire application was written using the React.js framework.

#Features
*Responsive footer with social media links
*Responsive navbar (mobile friendly)
*Blog built using Google's Blogger API
*Custom built web play capable of playing playlsts/albums built using web audio API
  *Audio frequency/waveform visualiser with unique colours to each track's specification
  *Custom artwork for each album and single(if artwork is provided unique to each single)
  *Responsiveness and mobile friendly
  *Functional on all modern browsers(Firefox, Opera, Chrome, Edge, Safari)
*About section
*Contact form built with EmailJs API

#Current Problems With The Website
*Not very SEO friendly
  Currently builds client side using React code and thus is not efficient for crawlers and bots
*Messy CSS
  While the final result looks rather nice the underlying CSS code can be a bit messy, i.e there are
  numerous classes with strange names to allow for classes to have modular CSS styles
*Not scalable(long term)
  Currently the website lacks a strong backend codebase and will need to have one implemented if I wish to scale it.
  
#Solutions To The Current Problems
Next Js is the framework I am currently learning. It seems to be the solution to all the issues listed above. I intend to host the website
Vercel from a new Git repository from this one. This repository can be seen as "Phase 1" of halogensband.com and while I am proud of it and I 
believe it does a solid job at the scope it is working within, I do believe it could be better.

This website was my project to improve my HTML5, CSS, JavaScrip and most importantly React Js and HTTP skills. I believe I have learned a lot from building it,
but now it is time to start "phase 2". 

#Features Coming In "Phase 2"
*MailChimp Email Subscription Component
*SEO friendly Blog interface with Next Js server side props hooks.
*Better mobile support for the web player and improved scalable of the web play to perhaps be used by other developers. I'd like to make it open source and
available to node package manager where musicians/artists/developers can use it and customise without having to worry about the underlying audio code / cross browser compatibility.
*Better about page which is more like a profile for each person credited on the album or anyone in the future who works with us.
