import { type Ref } from "vue";

export const useObserver = (
    el: any,
    func: Function,
    runOnce?: Boolean
) => {
    const target = el;
    const options = {
        threshold: [0.25],
    };
    let executed = false;
    let callback = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                if (runOnce && executed) return;
                func();
                executed = true;
            }
        });
    };
    let observer = new IntersectionObserver(
        callback,
        options
    );
    observer.observe(target);
};
