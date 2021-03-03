# Game Context

With the Game Context you develop games faster and more effectively. It lets you create game objects that you can dynamically modify and render them on your website using Game Context.

## Structure

The Game Context consists of two main modules: the Game Context and the Game Object. The Game Context has the task to contain all created Game Objects and to render them if necessary. The Game Objects describe how objects behave and must be rendered.

## Game Context Module

This module contains and manages all game objects and draws them on the canvas. It also provides a function that repeats the game loop at given time intervals.

### Create a GameContext

To do this, you just need to initialize the class and consider required arguments: CanvasRenderingContext, width of the canvas, height of the canvas.

### Add / remove a GameObject

To add or remove one or more GameObjects, you can simply manipulate the `gameObjects` property.

### Update all GameObjects

To do this, call the `update` method. You also need to specify a callable updater function. This function is executed for each specified GameObject and contains the following parameters: The current GameObject and the GameContext.

### Draw all GameObjects

To achieve this, you must call the `draw` method. Similar to the 'update' method, a draw function can be specified here, which then receives the following parameters: The current GameObject, the GameContext and the CanvasRenderingContext (ctx). However, this does not have to be the case. If no drawing function is specified. The GameContext draws the GameObject with given coordinates and background itself.

## GameObject

This module describes how objects behave and are drawn in the game.

### Creating a GameObject

To create a GameObject, you need to initialize the class and observe the following configuration as an object.

### Configuration

The configuration should be specified as the first argument in an object.

- `width:number` - width of the object
- `height:number` - height of the object
- `position:{x: number, y:number}?` - position of the object - default: {x:0,y:0}
- `background:string|CanvasImageSource?` - background of the object - default: 'black'.

### Event system

The GameObject offers to listen for certain events. When an event is triggered, the specified functions are executed. To create an EventListener you need to execute the `addEventListener` method. The first argument of the method is the type of the event as string and the function that should be executed then. This function receives the following parameters: The GameObject and possibly additional parameters (depending on the event). To trigger an event you have to call the following function `triggerListener` with the type of the event as string.

### Events

- `newposition`
- `draw`
