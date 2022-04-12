---
title: XMLHttpRequest
---

```js
function requestPOST(url, data) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.responseText);
      }
    };
  });
}
```

```js
function uploadFile(url, file) {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append("file", file);
    let xhr = new XMLHttpRequest();
    xhr.onload = function (event) {
      console.log("上传成功");
    };
    xhr.open("POST", url, true);
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = xhr.responseText;
        resolve(JSON.parse(response));
      }
    };
  });
}
```
