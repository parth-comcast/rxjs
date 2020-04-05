import { Observable } from 'rxjs';

let numbers = [1, 10, 20, 30];
let source = Observable.from(numbers);

source.subscribe(
    value => console.log("This is Value:", value),
    e => console.log("This is Error:", e),
    () => console.log("This is completion of observable!")
);
