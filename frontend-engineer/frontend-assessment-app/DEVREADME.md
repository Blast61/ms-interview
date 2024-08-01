# How to Start Submission
- Ensure you are in the correct directory ```frontend-engineer/frontend-assessment-app```
- Run ```npm install```
- From your terminal run the following bash script: ```./run-app-and-tests.sh``` 
- This should start the application and open it in your default browser at ```localhost:3000```, as well as run all test suites, once the tests have ran if you wish to terminate the application press ```control + C``` on mac. 


# Technical Decision
1. I chose to utilize React.js as my framework of choice because of its component based architecture. It is a well documented and widely supported framework containing a rich ecosystem of supporting documentation. 

I originally had opted to implement Remix.js as my frontend framework for its powerful SSR capabilities in an attempt to have a higher performant solution. I decided to pivot back to React.js due to a lack of framework maturity and a lack of a widely supported testing frameworks built for Remix.js; Compared to React that has many more widely supported testing frameworks. Another factor in my decision to pivot came when I realized that the abstraction that Remix.js creates can cause the source code to be slightly more difficult to digest, especially to developers that do not use Remix.js. I wanted to provide a solution that the dev team is deeply knowledgeable of and easily recognizes. 


# Tech Stack
1. Language: JavaScript/TypeScript
2. Library: React
3. API's: Mapbox-Gl, Highcharts
4. Testing Framework: Jest

# Testing Coverage
1. Testing coverage consists of three total test suites for my custom hook ```useDataLoader.tsx```, ```Chart.tsx``` component, and ```Map.tsx``` component.
 
2. My testing suite for the Map.tsx component is incomplete, as the only tests that pass currently ensure that the Map container and instance is rendered correctly as well as it is unmounting correctly.

3. Technical Challenges: Initially I kept getting a terminal error "map.on is not a function" indicating that I was not correctly creating a mock map instance. After sifting through different forums I found this suggestion: ```jest.mock('mapbox-gl', () => ({
  Map: jest.fn()
}));
mapboxgl.Map.prototype = {
  remove: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};```
at this repo: ```https://github.com/mapbox/mapbox-gl-js/issues/10583```
Which I modified to fit my implementation in Map.test.tsx lines 70-78, upon which allowed the map container and instance to mount as well as unmount. 

4. I was unable to find documentation or any forum suggestion support for the problem of mocking the addLayer/addSource calls that is done in the Map.tsx component. When running the application the layers/source functionality seems to be working as they render on the map with the appropriate visualization colors. In terms of being able to mock it and test these elements of the mapbox-gl API I could not find a working solution(after quite a bit of debugging and reworking). I left my implementation in the solution containing my debugging approach of logging the flow of test execution to find where the disconnect was happening. If I had been in a working professional environment I would have requested another engineer that may have more experience writing unit testing for this framework; help and hopefully through a collaborative effort we would successfully work past this block. 

5. I lastly added logic for iniatilizing a map with the testMode option to run tests without an access token, however I still am unable to find a solution for my current block of accurately mocking the calls to the addSource/addLayer functions. 

## Integrity Guidelines Disclosure
    * I believe in development efficiency and utilize the assistance of Large Language Models such as ChatGPT for debugging, syntax concerns, and logic related questions. Any code snippets pulled from online sources are noted in the documentation.






