import { Observable } from 'rxjs';


export function load(url: string) {
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

export function retryStrategy({attempts = 4, delay = 1000}) {
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

export function loadWithFetch(url: string) {
    return Observable.defer(() => {
        return Observable.fromPromise(fetch(url).then(r =>  r.json()));
    });
}