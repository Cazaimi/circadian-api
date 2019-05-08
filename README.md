# circadian-api

This API is a personal way for me to track my Circadian rhythym throughout the day. Tracking Circadian rhythms helps one to identify the productive parts of their day.

This could have been done using a simple spreadsheet, but I like APIs! I wanted to work with [Express.JS](http://expressjs.com) and [SQLite](https://www.sqlite.org) , so this was a learning project. Also, sometimes I like to do things the hard way. 🤷‍♂️

You can find the API documentation [here](https://documenter.getpostman.com/view/4520909/S1LvWoaC)

## How to run

1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## Additional info

To remind myself about filling this every hour or so, I made a `crontab` trigger a bash script.

### Crontab

```
0 7-21 * * 1-5 bash ~/circadian.sh
```

“At minute 0 past every hour from 7 through 21 on every day-of-week from Monday through Friday.”

### Bash script

[circadian.sh](https://github.com/Cazaimi/circadian-api/blob/master/circadian.sh)

This script runs an [Apple script](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) internally which sounds a chime and speaks a reminder.

[notif.scpt](https://github.com/Cazaimi/circadian-api/blob/master/notif.scpt)
