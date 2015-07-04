# UserScripts

## airliners.net

* [Topic filter](https://github.com/MatthieuMichon/UserScripts/blob/master/airliners.net/forum_topic_filter/) - Hides posts written by an author with a RR below a given threshold.

## nyaa.se

* [Color by score](https://github.com/MatthieuMichon/UserScripts/blob/master/nyaa.se/color_by_score/) - Applies a background color depending on the score of each entry.

# Notes

## KeyboardEvent Object

Interacting with userscripts is usually done using the **KeyboardEvent** object through an **EventListener**:

```js
document.addEventListener("keydown", function(event){...});
```
Google Chrome currently doesn't implement the `KeyboardEvent.key()` method.
