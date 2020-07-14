# SuicaExtract: モバイルSuicaの利用履歴をダウンロード

このBookmarkletはモバイルSuicaのSF（電子マネー）利用履歴のページから利用履歴をJSON形式のファイルでダウンロードします。

#### Bookmarklet

下のブックマークレットをブックマークバーに追加するだけです。

```javascript
javascript:(function(){var el=document.createElement('script');el.src='https://hikch.github.io/SuicaExtract/suica_extract.js';document.body.appendChild(el);})();
```
