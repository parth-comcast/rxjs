import { Observable, Observer } from 'rxjs';

let numbers = [1, 10, 20, 30];
let source = Observable.from(numbers);

class MyObserver implements Observer<number> {
    
    next(value) {
        console.log("This is Value:", value);
    }

    error(e) {
        console.log("This is Error", e);
    }
    
    complete() {
        console.log("This is completion of observable!");
    }    
}

source.subscribe(new MyObserver());