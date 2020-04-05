import { Observable } from 'rxjs';

let numbers = [1, 10, 20, 30];
let source = Observable.create(observer => {

    numbers.forEach(element => {

        // Try to print Error block of observable
        if (element >= 5) {
            observer.error("Element is Greater than expected!!!");
        }
        
        observer.next(element);
    })

    observer.complete();
});

source.subscribe(
    value => console.log("This is Value:", value),
    e => console.log("This is Error:", e),
    () => console.log("This is completion of observable!")
);
