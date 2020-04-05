import { Observable } from 'rxjs';

let numbers = [1, 10, 20, 30];
let source = Observable.create(observer => {

    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 2000);
        } else {
            observer.complete();
        }
    }

    produceValue();
});

source.subscribe(
    value => console.log("This is Value:", value),
    e => console.log("This is Error:", e),
    () => console.log("This is completion of observable!")
);
