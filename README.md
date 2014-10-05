yabot
=====

Yet another Bot (game)

First version of a bot-based game framework which is divided into a quite well documented and coded PHP backend
and a not so serious Javascript frontend playground to get more in touch with the current browser technologies.

The code is currently merged together to something running and so you can add an explorer-bot to a battlefield.

Backend
=======

Offers backend actions to create/delete/update persistent users and games where bots can join and do some actions.
There is a MazeGenerator which creates validated battle fields where no player has to stuck in random walls.
Take a look at the controller and their handler for all available actions.
It should be no problem but the time to offer additional methods like:
 - atackPos(posX, posY, botWeapon="lazer");
 - add/changeWeapon(botWeapon, weaponMode)
 - scanNeighborFieldsFor(numRounds);
 - useItem(medipack/upgrade);
 - defendUntilNextRound();
 - dropItem(bomb/sensor);
 - ...

The first main idea, which is currently quite ignored, was to offer the possibilty to modify the algorithms of the bots.
So the client-side explorer-bot and even more the server-controller game-bot operate by random (more under Frontend).
You could think of tuning a bot by implementing a more intelligent next-move strategy on maybe a depth-search.
 - registerNextMoveCallback(botId, nextMoveCallback) // the question is which side will execute the bot logic

The rediska implementation works so far and is connected via PubSub channels with the nodejs server listening on 8080.
Once an user connects to a game, it establishes a private Websocket connection to get gamefield updates in push mode.
The protocol here is not really designed yet and will depend on how the game framework is developing.

There is the idea of an abstract storage engine which implements the persistent stuff in \BotGame\Storage\Interface.
Take a look at the buggy UML diagram in the docs dir, the package Interface should move out of the Rediska namespace.
A propel schema is available and you could think of a text-based storage if no database and cache system is available.


Frontend
========

Hard times without using Applet FU in a sane way and the right time to fell in love (again) with JavaScript.
Code should be divided into Controller, Model and Views but a lot of event handling is messed up in the View. 
The UI-component constructors are located under lib and it would be nice to use more of them and to centralize
their event-handling - a good candidate was the (Game)StatusConsole with generic buttons, TextFields and a CLI.
You could think of automatically registering specific methods for updating select-boxes, printing some text on
a console and maybe also updating some thing in the cache. There is the need for more intelligent objects.
The code was under heavy movement due to iterative refactorings but should be documented in the next step.

All available backend actions can be triggered with some buttons in the corresponding TabViews.
You can register accounts, login, create games, connect to and display a preview or the complete Battlefield.

There are bugs in the workkflow with (auto-)connect to a game, adding a game-bot and establishing the Websocket-
connection with the nodejs server but is possible to get the clicks in the correct order to also add an explorer-
bot which starts in a corner of the field and explores it step by step.
There are sliders to adjust the time between two rounds and to set the amount of energy the bot has for a move.

You could think of building or equipping bots for different costs in the BotLab which is not implemented yet.
Then you could use the resources for bot moves, attacks or adding multiple bots into the game.

The concept of what the framework on both sides should offer is not fixed at this moment.

