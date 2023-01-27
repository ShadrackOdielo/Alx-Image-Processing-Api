# Image Processing Api
## Description
This project that allow one to process images in a node and express application using sharp. Though the app only supports resizing and uploading of images through a simple frontend interface, it is designed with scalability in mind.
## Installation
To start the project, unzip the project folder and run the following commands in the terminal:

```npm install``` to install all the dependencies.

The project was created on ubuntu 22.10 and uses unix file paths. it has not been tested on windows or mac. This may cause issues.

## Usage
To start the project, run the following command in the terminal:

```npm start```

The project will start on port 3000. To access the frontend, go to [localhost:3000](http://localhost:3000) which has a simple form to upload images and a link to the list of available in the images folder also accessible by appending `api/images` to url.

the `api/images` endpoint accepts the following query parameters:
1. `filename` - the name of the image file to be processed
2. `width` - the width of the image to be processed
3. `height` - the height of the image to be processed

Clicking on the image in the list or inputting the filename in the url as a query parameter will display the full image.

### Example
- To view sample.jpg modify the url like this: [http://localhost:3000/api/images?filename=sample.jpg](http://localhost:3000/api/images?filename=sample.jpg) or click on the sample.jpg link at [http://localhost:3000/api/images](http://localhost:3000/api/images)


Manually resizing the image is also possible by adding the width and height parameters to the url.

### Example
To resize sample.jpg to 200px width and 200px height, modify the url like this [http://localhost:3000/api/images?filename=sample.jpg&width=200&height=200](http://localhost:3000/api/images?filename=sample.jpg&width=200&height=200)

```npm run dev``` will start the project in development mode. This will start the project using nodemon which will restart the server on any changes to the code.

## Testing
To run the tests, run the following command in the terminal:

```npm test```

## scripts
The following scripts are available:
1. `npm start` - starts the project in production mode
2. `npm test` - runs the tests
3. `npm run dev` - starts the project in development mode
4. `npm run lint` - runs eslint on the project
5. `npm build` - deletes the dist folder and thumb/ files and builds the project
6. `npm jasmine` - runs the tests using jasmine
7. `npm run prettier` - runs prettier on the project

## Author
This project was created by **Shadrack Omondi**

## License
 



