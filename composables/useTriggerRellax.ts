import { type Ref } from "vue";
import gsap from "gsap";

export const useTriggerRellax = (
    el: string,
    currPer: number,
    triggerPt: number,
    speed: number
) => {
    if (currPer < triggerPt) return;

    // max translate is 100%
    const availableTrans = 100 * speed;
    const transProgress =
        (currPer - triggerPt) / (1 - triggerPt);

    gsap.to(el, {
        yPercent: Math.ceil(availableTrans * transProgress),
    });
};
