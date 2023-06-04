# Getting started

1. Make sure you have the LTS version of Node.js installed on your computer.
2. [Download and install](https://nodejs.org/en/) it if necessary.
3. Download the project code from the repository.
4. Install the project's basic dependencies using the command `npm install`.
5. Create a configuration file `.env` in the root of the project with the
   confidential `REACT_APP_LS` and `REACT_APP_MAP`.

   `REACT_APP_LS` is a randomly generated key for data encryption.

   `REACT_APP_MAP` is a key to access Google Maps service by integrating the
   [Maps JavaScript API](https://console.cloud.google.com/apis/library/). It
   also requires enabling the Directions API, Geocoding API, and Places API.

6. Launch the development mode by running the `npm start` command.
7. Go to [http://localhost:3000](http://localhost:3000) in your browser. You can
   work with the app locally at this address. Or go to
   [https://fooddeliveryslk.netlify.app/](https://fooddeliveryslk.netlify.app/)
   in your browser.
