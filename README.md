# Getting started

1. Make sure you have the LTS version of Node.js installed on your computer.
2. [Download and install](https://nodejs.org/en/) it if necessary.
3. Download the project code from the repository.
4. Install the project's basic dependencies using the command `npm install`.
5. Create a configuration file `.env` in the root of the project that will
   contain the value of the `REACT_APP_LS` and `REACT_APP_MAP` variables. This
   information is confidential and should not be published on the Internet.

   `REACT_APP_LS` - is a key used for data encryption. It can be generated from
   any source that provides good randomness.

   `REACT_APP_MAP` - is the key used for accessing Google Maps service, by
   integrating (https://console.cloud.google.com/apis/library/)[Maps JavaScript
   API] into your project. You should also enable the following APIs -
   Directions API, Geocoding API, and Places API.

6. Launch the development mode by running the `npm start` command.
7. Go to [http://localhost:3000](http://localhost:3000) in your browser. You can
   work with the app locally at this address. Or go to
   [https://fooddeliveryslk.netlify.app/](https://fooddeliveryslk.netlify.app/)
   in your browser.
