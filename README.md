<!-- backend -->
cd backend
pip3 install -r requirements.txt
python3 manage.py runserver



<!-- frontend -->
cd ..
cd frontend/blue-soft-event-management
nvm install v20.14.0
nvm use v20.14.0
npm install
npm run dev 


Event Model

title: Stores the title of the event (e.g., "Birthday Party", "Team Meeting").
description: Holds a detailed description of the event.
date: Represents the date of the event.
location: Stores the location where the event will take place.
user: Represents the user who created the event. It establishes a foreign key relationship with the User model, meaning each event is associated with a single user.
invitees: Establishes a many-to-many relationship with the User model, allowing multiple users to be invited to an event and multiple events to have multiple invitees.


Creating Events: When a user creates an event, they provide values for title, description, date, location, and the user field automatically associates the event with the logged-in user.

Inviting Users: The invitees field allows the event creator to select and invite other users to the event. This is managed through the many-to-many relationship, enabling flexibility in managing event attendees.


Introduced an invitees field in the Event model to store users invited to an event.
Utilized a many-to-many relationship between Event and User models to manage invitations (backend/core/models.py).

Created a custom action invite in the EventViewSet to handle invitations (backend/core/views.py).
Implemented logic to fetch users based on provided user_ids and associate them with the event (backend/core/views.py).


Assumed that invitations are managed only by providing user IDs without additional invitation workflows (e.g., acceptance notifications).
