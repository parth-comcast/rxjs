import { Observable } from 'rxjs';

// import { load, loadWithFetch } from './loader';


let source = Observable.merge(
    Observable.of(1),
    Observable.from([2,3,4]),
    Observable.throw(new Error("Caution Stop!!")),
    Observable.of(5),
).catch(e => {
    console.log("Error Caught!", e);
    return Observable.of(10);
});
    



source.subscribe(
    value => console.log("Value :", value),
    error => console.log("Error !", error),
    () => console.log("Complete observable!"),
);

// ON ERROR RESUME NEXT FUNCTION TRY
// let source = Observable.onErrorResumeNext(
//     Observable.of(1),
//     Observable.from([2,3,4]),
//     Observable.throw(new Error("Caution Stop!!")),
//     Observable.of(5),
// );

// let source = Observable.create(observer => {

//     observer.next(1);
//     observer.next(2);
//     observer.error("Something stop!!");
//     observer.complete();
// });

// let output = document.getElementById('output');
// let button = document.getElementById('button');

// let click = Observable.fromEvent(button, "click");



// function renderMovies(movies) {
//     movies.forEach(movie => {
//         let div = document.createElement("div");
//         div.innerText = movie.title;
//         output.appendChild(div);
//     });
// }

// load("movies.json");
// // subscribe(renderMovies);

// click.flatMap(data => loadWithFetch("movies.json"))
//     .subscribe(
//         data => renderMovies(data),
//         e => console.log("This is Error:", e),
//         () => console.log("This is completion of observable!"));