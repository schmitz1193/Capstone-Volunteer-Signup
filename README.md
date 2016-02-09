NASHVILLE SOFTWARE SCHOOL FRONT END CAPSTONE-Volunteer-Signup

Project is a culmination of the first 3 months spent at Nashville Software School.  While the motivation for the project was to allow ease for scheduling volunteers, the application can be applied to any situation where scheduling is required.

The UI Calendar Directive for the Arshaw FullCalendar, along with Moment was utilized in building this app.

There are two levels of authorization used in the app.  A volunteer coordinator and a volunteer can both sign-in (and subsequently log-in) using an email address and a password.  The coordinator is assigned special credentials that allows them upon log-in to go in a path that differs from the volunteer.

Upon successful log-in/sign-in the volunteer path is as follows:

-Calendar that is populated with all volunteer opportunities they can sign up for

-When an assignment is clicked, a modal displays with info about the assignment and allows them to sign up for the event and register with their t-shirt size.

-They can also opt to look at a "my assignments" view which will show all events they have committed to.  If they click on an event they will be reminded  of the details.

Upon successful log-n /sign-in the coordinators path is as follows:

-Calendar that is populated with volunteer opportunities.

-When a date is clicked, a new event can be added to the calendar.

-They can also opt to look at a "filled assignment" view which shows them the events that have been filled by a volunteer.  If they click on the event the name and t-shirt size of the volunteer will be displayed.

Future enhancements include allowing events to be deleted and/or rescheduled and the ability to email volunteers confirmation of signup as well as any changes made to the details of their event.

To run this application:

npm init

npm install

bower init

bower install jquery --save

bower install requirejs --save

bower install bootstrap --save

bower install fullcalendar

bower install --save angular-ui-calendar

bower install


