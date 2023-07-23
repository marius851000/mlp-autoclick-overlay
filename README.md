# MLP overlay autoclick

A TamperMonkey user script that goes with the MLP overlay for r/place 2023.

Installation instructions:

1. Install the MLP r/place overlay following those instruction: https://github.com/r-ainbowroad/2023-minimap
2. Open the url at https://github.com/marius851000/mlp-autoclick-overlay/raw/main/loader.user.js in your browser
3. install the script

usage instruction:
1. Go to https://www.reddit.com/r/place/?screenmode=fullscreen&cx=274&cy=142&px=2453
2. Wait a bit. If all goes well, it should automatically place the template, and place pixels when avalaible (might need to wait 30 seconds for it to enter into effect)

It won’t place any pixel if the current progess (as displated in the minimap) is greater or equal to 95%. In that case, you can still manually place pixel.

If it doesn’t work after 1 minutes, there is a problem. You should try to look at the javascript console in the web browser development tools, or ask for help on help on the secret r/place brownies Discord server: https://discord.gg/6BPJ6xYk

Note that this script include an auto-reload function: it first check that it is up-to-date enought to be considered safe to reload. If the page reload, it should be considered normal, and operation should restart (unless there is an important issue that hasn’t been already fixed)

## for developper/maintainers

The way that auto-refresh is simple:
Every time the script attempt to place a pixel, it’ll first download the ``min_version.txt`` file. If the version in that file is greater than the version in script.js, the page will reload after a certain amount of time (less than 1 minutes), until that condition is true again.

As such, if the overlay become invalid, you can first increase the number in ``min_version.txt`` to the version in ``script.js`` + 1, then once the overlay is fixed, make the version in ``script.js``be the same than the one in ``min_version``