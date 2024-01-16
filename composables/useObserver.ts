import { type Ref } from "vue";

export const useObserver = (
    el: Ref,
    func: Function,
    runOnce?: Boolean
) => {
    const target = el.value;
    const options = {
        threshold: [0.5],
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
