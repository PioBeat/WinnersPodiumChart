# WinnersPodiumChart

**Current Version: 0.5-beta-2**

*WinnersPodiumChart* is a tiny JavaScript library to display highscore statistics in a fun way.
It can be used to display the winners for the first, second, and third place.

Uses jquery 3.x and anime.js

**Features**

* [Add data and display highscore statistics]()
* [Animation]()
* [Customize chart]()

## Usage
First, specify a div container:

```html
<!-- This is where the chart will appended to -->
<div id="container" style="height: 300px;"></div>
```
Define height and width of the chart by setting the css height and width properties of the outer div with id *container*.
The chart will take 60% of space of the div container.

Second, pass the selection of the container the the constructor of the graph:
```javascript
var data = [
    {
        name: "Alice",
        value: 100
    },
    {
        name: "Bob",
        value: 30
    },
    {
        name: "Carl",
        value: 50
    }
];

var myChart = new winnerStepPlot($('#container'));
myChart.data(data);
myChart.draw();
```

### Data format

```javascript
    var data = [
        {
            name: "Anna",
            value: 100
        },
        {
            name: "Bob",
            value: 30
        },
        {
            name: "Carl",
            value: 50
        }
    ];
```

## Examples

See the example in [testPage.html](https://github.com/PioBeat/WinnersPodiumChart/tree/master/src/testPage.html)

<img src="/art/example_1.gif" width="49%" />

## Customize

You can change the base style with the css classes. All changes related to css classes and properties
are referring to the stylesheet [winnersPodiumChart.css](https://github.com/PioBeat/WinnersPodiumChart/tree/master/src/css/winnersPodiumChart.css).

### Font

Edit *font-family* property of css class ``.wpc-chart``

### Change colours
You can supply an array of colour values to the chart class with
```javascript
myChart.colours(["#425BAB", "#3FAB59", "#8A48AB"]);
```
The colours will be recycled if less than three colours are specified. Up to three colours are supported, more colours will not be used.
They are applied in the following way (from left to right): second place, first place, third place.

### Change medal icon

Modify the *background-image* property of the css class ``.wpc-footer > .names``

## API

### Data

see section data format for the data format.

``data(_)`` supply argument to set new data. If no argument is passed to the method, the current data set is returned.

### Change animation duration

### Redraw
Reset the animation. Useful if the chart is supplied with new data.
Set new data and call animate:
```javascript
myChart.data(newData);
myChart.reAnimate();
```

## Resources
The following resources were used:
<ul>
<li> Icons used: <a href="http://www.freepik.com">Designed by Freepik</a> </li>
</ul>

## Websites using the <i>winnersPodiumChart</i>

<p>( feel free to send me your website using this component! :) )</p>

* [Offbeat Math](http://mathe-app.offbeat-pioneer.net/)