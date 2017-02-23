## ToDo

- enable/disable numbers in columns
- enable/disable numbers in footer beside names
- provide example to start animation if page scroll is showing the div containing the chart

# [0.5-beta-1] 2017-02-23
- animation of chart can be reset (all animation properties are reset)
- chart class works now with multiple instances on different div containers
    - problem with static id member variables in class
    - data set is deep-copied before assignment to member variable _data

# [0.5-alpha-2] 2017-02-22
- sorted data set: first place is in the middle, second place at the left, third place the last column
- values for highscores are normalized so that the distribution doesn't get skewed
    - minimum height is 35% of the height of div containing the chart

# [0.5-alpha-1] 2017-02-22

Project start