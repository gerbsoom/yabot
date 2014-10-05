/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

var imageList = getImageListForLoading();
var imagesLoaded = false;
var loadedImages = [];

function loadAllImages()
{
    loadNextImage(null, 0, this.imageList.length);
}

function loadNextImage(_image, _index, _maxIndex)
{
    if (_index != 0) loadedImages.push(_image);
    if (_index != _maxIndex)
    {
        // modify progress bar
        var image = createImage(imageList[_index]);
        image.onload = loadNextImage(image, parseInt(_index) + 1, _maxIndex);
    }
    else imagesLoaded = true;
}

function getImageListForLoading()
{
    var imageArray = [];
    imageArray.push("img/tileset/0_item_random.png");
    imageArray.push("img/tileset/1_field_neutral.png");
    imageArray.push("img/tileset/2_field_blue_bot.png");
    imageArray.push("img/tileset/3_field_black_bot.png");
    imageArray.push("img/tileset/4_field_lightblue_bot.png");
    imageArray.push("img/tileset/5_field_lightblack_bot.png");
    imageArray.push("img/tileset/6_wall_brick.png");
    imageArray.push("img/tileset/7_wall_vertical.png");
    imageArray.push("img/tileset/8_wall_horizontal.png");
    imageArray.push("img/tileset/9_wall_connector.png");
    imageArray.push("img/bots/explorerbot.png");
    imageArray.push("img/bots/bot1.png");
    return imageArray;
}
