# School Wellness App

# Description of the Project
-> Our app offers a shift away from the traditional school rating and review websites. Too often not enough emphasis is placed on the student wellness atmosphere within schools. Just like a student is more than a test score, a school is more than its pass rate. Starting with cafeteria health inspection scores, we built a platform that gives DC parents a quick snapshot of key wellness indicators. In the future, we're looking forward to adding other key indicators, such as nearby police reports, fire safety violations, and playground conditions. Additionally, a planned slideshow featuring instagram photos uploaded on and around school grounds, gives helicopter parents the ultimate insiders look into their child's current or prospective school.

# General Approach
-> In the planning stage, the group was drawn to the idea of using of leveraging government data in a way that is relevant to an individual. We knew a geographic component (a map) would make the rendered data in a more digestable format for users. We settled on the top three ideas: (1) a geographic political sentiment index, providing users with insight into the feelings (positive, negative, etc) of twitter users regarding a particular topic or candidate; (2) attempt to depicting the crime victimization survey in a new light, to provide users with better understanding of criminal activity within a neighborhood, beyond what's collected in police reports; (3) a new approach to reviewing and rating schools.

-> Ultimately, we went with the third option -- a new approach to reviewing and rating schools. We were most excited by the opportunity to "scrape" a government website that is in a very user-unfriendly format. If you refer to the foodEstablishmentInspection html file in planning, you'll notice that the electronic pdf is arranged in a VERY, VERY unorganized manner making the scrapping process a painful process. After cycling through the urls (and crashing several times), we had a json file with pertinent data. When constructing the database, we split the data into two separate tables. With the database converted into a JSON format, we created an API of DC school cafeterias that simply didn't exist before. Using the same technique, we could scrape other food prep areas (i.e. food trucks) or other websites entirely.

-> Our user stories were all from the perspective of DC area parents. This informed our all of our design decisions. After the frustration with the slow DC health department website, we prioritized speed and smoothness for our front-end. A single-page app was the logical choice. However, rendering everything through a client-side approach made the coding and debugging process particularly cumbersome.

# Installation Instructions
-> To run locally, please ensure all dependencies are installed (thru running npm install). Additionally, please create a database called deluder. Our program is configured using postgresql (and a sequelize dependency). Run node config/migrate.js and node config/seeds.js to finish database setup. When setup is finished, run the app (nodemon app.js). You'll find the app running (if all goes well) on localhost:4000

# Description of Unresolved Problems and Major Hurdles Overcome
-> We ran into numerous bugs resulting from difficulty integrating the work from four separate coders. In some cases, a model, controller, and view were written by three different coders. As a result, it made switching gears and understanding the other coder's logic very difficult. After a challenging merge conflict causing a detrimental bug, we began documenting our work and conducting pair "merging" exercises.

-> A minor glitch to resolve would be the stray schools in Tennessee and Maryland need to be corralled.

-> As it is coded currently, the assignment of a foreign key (schoolId) to health report wouldn't necessarily work when the website is regularly updated scrapped information. Linking future tables to their associated schoolIds will force us to reconsider our approach.

-> Hand-rolled user authentication (via passport) was a particular challenge to get off the ground initially. The absence of built in middleware made it a good puzzle to solve.

-> Due to the relative "newness" of node.js, express, and oojs concepts for the coders, establishing basic CRUD functionality especially challenging. Practice, practice, practice!
