import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, "click");

function load(url: string) {

    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.response);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open('GET', url);
        xhr.send();
    // take an observabel and return an observable
    }).retryWhen(retryStrategy({ attempts: 3, delay: 1500 }));
}

function retryStrategy({attempts = 4, delay = 1000}) {
    return function(error) {
        return error
            .scan((acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }, 1)
            // stop observable!!
            .takeWhile((acc) => acc < attempts )
            .delay(delay);
    }
}

function renderMovies(movies) {
    movies.forEach(movie => {
        let div = document.createElement("div");
        div.innerText = movie.title;
        output.appendChild(div);
    });
}

click.flatMap(data => load("movies.json"))
    .subscribe(
        data => renderMovies(data),
        e => console.log("This is Error:", e),
        () => console.log("This is completion of observable!"));