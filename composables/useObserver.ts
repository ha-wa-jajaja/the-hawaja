import { type Ref } from "vue";

export const useObserver = (el: any, func: Function) => {
    const target = el;
    const options = {
        threshold: [0.25],
    };
    let callback = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                func();
            }
        });
    };
    let observer = new IntersectionObserver(
        callback,
        options
    );
    observer.observe(target);
};
