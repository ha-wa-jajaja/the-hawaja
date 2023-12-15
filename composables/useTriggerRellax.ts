import { type Ref } from "vue";
import gsap from "gsap";

export const useTriggerRellax = (
    el: Ref,
    currPer: number,
    triggerPt: number,
    pxPer: number,
    speed: number
) => {
    if (currPer < triggerPt) return;

    const maxTrans = pxPer * 10;
    const availableTrans = maxTrans * speed;
    const transProgress =
        (currPer - triggerPt) / (1 - triggerPt);

    el.value.style = `transform: translateY(${
        transProgress * availableTrans
    })px`;
};
