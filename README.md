First checkout to Master branch.

Then clone the project using git and run npm install to install the dependencies.

1.Run the server.js file from the directory using npm run dev and the server will be served at localhost:8080.

Routes and endpoints:



User Route: /api/users/


1.Signup route: example -- localhost:8080/api/users/create -- post method -- example -{ name,email, password }  in request body
2.signin route: localhost:8080/api/users/login -- get method -- example -{ email, password }  in request body
after signin user will get token which will be used for protected authenticated routes.

Station Route: /api/stations


1.creating station route -- localhost:8080/api/stations/create -- post method -- example -{ name, latitude, longitude } in request body
2.get stations details -- localhost:8080/api/stations/{stationId} -- get method -- example -{ id } to get the station
3.update stations details -- localhost:8080/api/stations/{stationId} -- put method -- example -{ id } to change the station details.

Train service Route: /api/trainServices


1.creating Train service route -- localhost:8080/api/trainServices/create -- post method -- example -- { name, type, schedule } in request body,where schedule is -- {
            stationId: stationId,
            arrivalTime: arrivalTime,
            departureTime: departureTime,
          }
2.get Train service details -- localhost:8080/api/trainServices/{trainServiceId} -- get method -- example -{ id } to get the Train service
3.update Train service details -- localhost:8080/apitrainServices/{trainServiceId} -- put method -- example -{ id } in params and { name, type, schedule } in request body to change the Train service.

Wallet Route: /api/funds


1.adding funds to user route -- localhost:8080/api/funds/add-funds -- post method -- example -- { userId, amount } in request body
2.get wallet balance details -- localhost:8080/api/funds/{userId} -- get method -- example -{ userid } in parameter to get the user balance details.


Ticket Route: /api/tickets


1.creating Ticket route -- localhost:8080/api/tickets/create -- post method -- example -- { userId, trainServiceId, stationIdStart, stationIdEnd, travelDate } in request body
2.Purchase Ticket  -- localhost:8080/api/tickets/purchase -- post method -- example -- { userId, ticketId } in request body


Notes: 1.use postman the check the routes.
      2.After signin use the token in the protected routes in header.



