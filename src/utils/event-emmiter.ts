export class EventEmmiter<T> {
    private lisnters: ((event: T) => void)[] = [];
    addListner(listner: (event: T) => void) {
        this.lisnters.push(listner);
    }
    removeListner(listner: (event: T) => void) {
        let index = this.lisnters.indexOf(listner);
        if (index > 0) {
            this.lisnters.splice(index, 1);
        }
    }
    emit(event: T) {
        this.lisnters.forEach(listner => listner(event));
    }
}
