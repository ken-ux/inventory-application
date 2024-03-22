# inventory-application

This is an inventory management app built with Express.js and MongoDB for its backend, and Pug (Jade) as its templating engine. Users can view individual categories that items are separated into, then view item details such as unit price and stock. Users can also add, update, or delete categories and items.

Initial items included in the database are [fish found in Animal Crossing](https://nookipedia.com/wiki/Fish/New_Horizons).

Live version of the app can be found here: [https://inventory-application-production-c0ab.up.railway.app/catalog](https://inventory-application-production-c0ab.up.railway.app/catalog)

## Database Schema

![database schema](/database_schema.svg)

## Lessons Learned

- Defining models using [Mongoose's Schema interface](https://mongoosejs.com/docs/schematypes.html).
- Connecting a MongoDB database via Mongoose.
- Loading environment variables in Node.js; built-in support for environment variables was released with Node.js version 20.6.0, so there was no need to use a dependency from a third-party.
- Populating a MongoDB database through a script rather than the Atlas UI. The script I wrote is the file named `populatedb.js`.
- Planning browser routes and defining them in controller scripts.
- Creating Pug templates and extending them for reusability and dynamically added content.
- Validating and sanitizing input values from form submissions with the [express-validator](https://express-validator.github.io/docs/) package.

## Disclaimer

This project is deployed on a platform with limited free hosting (Railway) so it's possible that the link is no longer live by the time you're accessing it.
