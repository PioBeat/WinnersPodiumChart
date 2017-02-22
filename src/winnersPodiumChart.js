/**
 * winner's podium class
 *
 * MIT License
 *
 * Version: 0.5-alpha-2
 *
 * Dominik Grzelak
 * Copyright 2017
 */
var WinnersPodiumChart = (function () {

    var _id = null;
    var _mtArr;

    function WinnersPodiumChart($element) {
        this.rootDiv = $element;

        _id = "#" + $element.attr("id");
        // console.log("_id", _id);

        this._titleContainer = $("<div></div>").addClass("wpc-chart wpc-title").appendTo(this.rootDiv);

        this._icon = "./icon/trophy.png";
        this._icon2 = "./icon/medal.png";

        this._innerStepContainer = $("<div></div>");
        this._innerStepContainer.addClass("wpc-chart wpc-main-container").height(this.rootDiv.height());
        this._innerStepContainer.appendTo(this.rootDiv);

        this._footerContainer = $("<div></div>").addClass("wpc-chart wpc-footer").appendTo(this.rootDiv);

        this._childs = [];

        this._maximum = 0;
        this._minimum = 0;

        this._data = null;
        this._colours = ["#425BAB", "#3FAB59", "#8A48AB"];
    }

    /**
     * getter / setter for data set
     * @param _ specify the data set which is used to draw the columns. if no argument is given than the
     * current data set is returned
     * @returns {*|null}
     */
    WinnersPodiumChart.prototype.data = function (_) {
        if (arguments.length == 0) {
            return this._data;
        }
        this._data = _;
        this.invalidateData();
    };

    /**
     * getter / setter for colour array
     * @param _ specify colour array or get the current colour set
     * @returns {Array|[string,string,string]}
     */
    WinnersPodiumChart.prototype.colours = function (_) {
        if (arguments.length == 0) {
            return this._colours;
        }
        _colours = _;
    };

    WinnersPodiumChart.prototype.icon = function (_) {
        if (arguments.length == 0) {
            return this._icon;
        }
        this._icon = _;
    };

    /**
     * recalculate the maximum value of the data set
     */
    WinnersPodiumChart.prototype.invalidateData = function () {
        //sort and swap 1st and 2nd place
        this._data.sort(sortByValue);
        var buf = this._data[0];
        this._data[0] = this._data[1];
        this._data[1] = buf;
        //add indizes order for names in footer
        this._data[0].oldIx = 1;
        this._data[1].oldIx = 0;
        this._data[2].oldIx = 2;

        //calculate min and max values
        this._maximum = 0;
        this._minimum = this._data[0].value;
        var self = this;
        $.map(this._data, function (elem, ix) {
            self._maximum = self._maximum < elem.value ? elem.value : self._maximum;
            self._minimum = self._minimum > elem.value ? elem.value : self._minimum;
        });

        //normalize values
        var h = this._innerStepContainer.height();
        var b = h;
        var a = h * 0.35;
        this._data = $.map(this._data, function (elem, ix) {
            elem.valueNorm = ((elem.value - self._minimum) / (self._maximum - self._minimum)) * (b - a) + a;
            return elem;
        });
    };

    WinnersPodiumChart.prototype.draw = function () {
        var self = this;

        var h = this._innerStepContainer.height();

        // number of columns to draw
        var n = this._data.length;

        var w = Math.floor(100.0 / n + 0.5); // 100 = 100%

        _mtArr = [];
        this._data.map(function (obj, i) {
            var d = $("<div></div>");
            $(d).attr("data-name", obj.name).attr("data-value", obj.value);
            $(d).addClass("wpc-podium-column");
            $(d).css("background-color", self._colours[i % self._colours.length]);
            $(d).css("width", (w + (1 / n)) + "%");


            // var erg = calcNewHeight(obj.value, h, self._maximum);
            // console.log("erg", erg);
            // var newHeight = erg[0];
            // var mt = erg[1];
            var newHeight = obj.valueNorm;
            var mt = h - obj.valueNorm;

            $(d).css("height", newHeight + "px");
            $(d).css("margin-top", h + "px");

            var numdiv = $("<div></div>");
            numdiv.html(obj.value);
            numdiv.addClass("number");

            numdiv.appendTo(d);

            $(d).appendTo(self._innerStepContainer);
            self._childs.push(d);
            _mtArr.push(mt);

            var dn = $("<div class='names'></div>");
            var objToFind = $.grep(self._data, function (e) {
                return e.oldIx == i;
            });
            var name = $("<span>" + objToFind[0].name + "</span>");
            // var name = $("<span>" + self._data[i*0.5 + 1].name + "</span>");
            name.appendTo(dn);

            dn.appendTo(self._footerContainer);
        });
        var imgTrophy = $("<img/>").attr("src", this._icon).width((w + 1 / n) / 2 + "%").addClass("trophy");
        imgTrophy.appendTo(this._titleContainer);


        this.animate();
    };

    /**
     * Main function to animate the whole chart. Use this method to re-animate the chart in case of new data for instance.
     * The order of animation is as follows: columns, trophy, footer.
     */
    WinnersPodiumChart.prototype.animate = function () {
        anime({
            targets: _id + " div.wpc-podium-column",
            easing: "easeOutElastic",
            'margin-top': function (el, index) {
                return _mtArr[index];
            },
            delay: function (el, index) {
                return index * 145;
            },
            complete: function () {
                animateTrophy();
            },
            loop: false
        });
    };

    /**
     * sort function for the data set (descending)
     * @return {number}
     */
    function sortByValue(a, b) {
        var x = a.value;
        var y = b.value;
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }

    /**
     * helper function to animate the trophy above the chart
     */
    function animateTrophy() {
        $(_id + " .trophy").css("opacity", "1");
        var fc = $(_id + " > .wpc-footer");
        anime({
            targets: _id + " .trophy",
            scale: 0.8,
            easing: "easeOutBounce",
            direction: "both",
            complete: function () {
                animateFooter(fc);
            }
        })
    }

    /**
     * helper function to animate the footer
     * @param fc
     */
    function animateFooter(fc) {
        fc.css("display", "block");
        anime({
            targets: _id + ' .wpc-footer > .names',
            translateX: 100 + "px",
            opacity: [1, 0],
            // scale: [.75, .9],
            delay: function (el, index) {
                return index * 380;
            },
            direction: 'reverse'
        });
    }

    // /**
    //  * helper function to calculate the column height in respect to the div container height.
    //  * The resulting top margin is also returned because it is the css property which is animated.
    //  * @param itemHeight
    //  * @param h
    //  * @param maximum
    //  * @returns {[*,*]}
    //  */
    // function calcNewHeight(itemHeight, h, maximum) {
    //     var frac = itemHeight / maximum;
    //     var newHeight = h * frac;
    //     var mt = h - newHeight;
    //     return [newHeight, mt];
    // }

    return WinnersPodiumChart;
})();

