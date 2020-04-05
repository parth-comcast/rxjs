// import { Observable } from 'rxjs';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

let numbers = [1, 10, 20, 30];
let source = Observable.create(observer => {

    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 250);
        } else {
            observer.complete();
        }
    }

    produceValue();
}).map(value => value * 10)
    .filter(value => value > 10);

source.subscribe(
    value => console.log("This is Value:", value),
    e => console.log("This is Error:", e),
    () => console.log("This is completion of observable!")
);
