##### How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
Time spent - 10 hours.
Things to add:
1. Due to the number of cities, search box could perform badly if typed rapidly, adding a throttle could help with this.
2. Style the app to look better.
3. More and better tests.
4. Better responsive design.
##### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
Arrow function
```javascript
const handleScroll = () => {
  if (listEl.current.scrollHeight - listEl.current.clientHeight === listEl.current.scrollTop) {
    getMoreRestaurants();
  }
}
```
Destructuring assignment
```javascript
const Card = ({ restaurant: { address, area, image_url, name, phone, postal_code, price, reserve_url }}) => {
  // ...
}
```
Although not from the latest JavaScript, but they are from the big es6 update.
##### How would you track down a performance issue in production? Have you ever had to do this?
1. Use performance tab in chrome devtools to check what is causing the issue, ie. render, script
2. Check network tab in chrome devtools to check if cause is by network, ie. redundant requests, slow requests
##### How would you improve the API that you just used?
One problem I had with the API is it doesn't take properties like restaurant name, so when filtering by restaurant name it's impossible to know for example how many restaurants have name starts with the letter 'A'.
Because of this it's hard to use pagination for traversing list of restaurant, which is why I did a pull down to refresh.
This type of filter should happen during select from db.
##### Please describe yourself using JSON.
```json
{
  "name": "Hecheng Li",
  "education": {
    "degree": "Bachelor of Computer Science",
    "school": "University of Waterloo",
    "graduation_date": "2016/06"
  },
  "employment": [
    {
      "company": "Accuenergy",
      "position": "Front End Developer",
      "start_date": "2018/12",
      "end_date": null
    },
    {
      "company": "WinTao Tel.",
      "position": "Full Stack Developer",
      "start_date": "2017/12",
      "end_date": "2018/12"
    }
  ]
}
```