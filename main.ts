import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, "click");

click.subscribe(
    data => load("movies.json"),
    e => console.log("This is Error:", e),
    () => console.log("This is completion of observable!")
);

function load(url: string): void {
    let xhr = new XMLHttpRequest();

    console.log('xhr', xhr);
    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.response);

        movies.forEach(movie => {
            let div = document.createElement("div");
            div.innerText = movie.title;
            output.appendChild(div);
        });
    });

    xhr.open('GET', url);
    xhr.send();
}