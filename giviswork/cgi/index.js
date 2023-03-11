const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const url = require('url');

const fileName = "index.js";
var currentFunc = "";

function globalPathFinder(folderList, requestedFile) {
    currentFunc = "globalPathFinder";
    try {
        var count = 0;
        var folderPath = "";
        if (folderList !== [] || folderList !== {} || typeof folderList == 'object') {
            for (var i = 0; i < folderList.length; i++) {
                if (typeof folderList[i] === 'string') {
                    var currentFolder = folderList[i];
                    var pathKeeper = null;
                    if (folderPath == "") {
                        pathKeeper = "./" + currentFolder;
                    } else {
                        pathKeeper = folderPath + currentFolder;
                    }
                    if (fs.existsSync(pathKeeper)) {
                        folderPath = folderPath + currentFolder + "/";
                    } else {
                        i = i - 1;
                        folderPath = folderPath + "../";
                    }
                }
                count = count + 1;
                if (count == 100) {
                    return "";
                }
            }
        }
        if (typeof requestedFile == 'string') {
            return path.join(folderPath, requestedFile);
        }
        return "";
    } catch (e) {
        console.log(fileName + " " + currentFunc + "() ERROR: " + e);
        return "";
    }
}

function getExtension(type) {
    if (type === "script") {
        return "js";
    } else if (type === "style") {
        return "css";
    } else if (type === "html") {
        return "html";
    } else {
        return "html";
    }
}

app.get('/', function (req, res) {
    try {
        var infoFromURL = url.parse(req.url, true).query;

        var filePath;

        if ("page" in infoFromURL) {
            const page = infoFromURL.page;
            if (page == "" || typeof page !== "string") {
                filePath = globalPathFinder(["www"], "index.html");
            } else {
                if ("type" in infoFromURL) {
                    const type = infoFromURL.type;
                    if (type === "html") {
                        filePath = globalPathFinder(["www"], page + "." + type);
                    } else {
                        if (type === "script" || type === "style") {
                            filePath = globalPathFinder(["www", type], page + "." + getExtension(type));
                        } else {
                            filePath = globalPathFinder(["www"], "index.html");
                        }
                    }
                } else {
                    filePath = globalPathFinder(["www"], "index.html");
                }
            }
        } else {
            filePath = globalPathFinder(["www"], "index.html");
        }

        if (fs.existsSync(filePath)) { //checking if the file exists
            fs.readFile(filePath, 'utf-8', function (err, data) {
                res.write(data.toString());
                return res.end();
            });
        }
    } catch (error) {
        console.log("index.js ERROR: " + error);
    }

});
if (!module.parent) {
    app.listen(8091);
    console.log('Server running at http://127.0.0.1:8091/');
}