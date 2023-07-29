import data from './books.json' assert {type:'json'};
const a=Math.floor(Math.random()*10);
// console.log(data[a]);

document.getElementById('title').placeholder=data[a].title;
document.getElementById('author').placeholder=data[a].author;
document.getElementById('isbn').placeholder=data[a].isbn;
