# TVMLTestApp
TVML test app for a bug with carousel element

IMPORTANT: no server need, the js will be loaded from the bundle.

How to test:

in the AppDelegate.swift, line 125, change this constant:

let carousel = false // true = carousel, false = grid

If you want test the carousel set to true, else false for the grid.
As you can see the grid works, but the carousel not.

In the application.js there is the logic that switch from the grid template to carousel template.
