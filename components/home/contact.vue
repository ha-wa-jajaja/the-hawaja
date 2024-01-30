<template>
    <div
        class="w-screen h-[100dvh] container contact"
        ref="contact"
    >
        <main class="flex flex-col items-center">
            <UiTextRevealer
                ref="title"
                class="mb-10"
                :content="$t('contact')"
            />
            <div class="flex items-center">
                <a
                    href="mailto:a0930710766@gmail.com"
                    target="_blank"
                >
                    <iconMail />
                </a>

                <a
                    href="https://www.linkedin.com/in/jeffrey-ha-311311233/"
                    target="_blank"
                >
                    <iconLinkedin :filled="true" />
                </a>
            </div>
        </main>
    </div>
</template>
<script setup>
import gsap from "gsap";
import iconMail from "@/public/contact-icons/mail.svg";
import iconLinkedin from "@/public/contact-icons/linkedin.svg";

const contact = ref();
const title = ref();

let tl;
let ctx;
function setupAnim() {
    ctx = gsap.context((self) => {
        let paths = self.selector("path");
        paths.forEach((path) => {
            let l = path.getTotalLength();
            gsap.set(path, {
                opacity: 0,
                strokeDasharray: l + 10,
                strokeDashoffset: l + 10,
            });
        });

        tl = gsap
            .timeline({
                paused: true,
                defaults: { ease: "expo.out" },
            })
            .to(paths, {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 5,
            });
    }, contact.value);
}
function playAnim() {
    title.value.playAnim().then(() => tl.play());
}

onMounted(() => {
    setupAnim();
    useObserver(contact, playAnim);
});
</script>
<style lang="scss" scoped>
.contact {
    @apply flex items-center justify-center;
    a {
        transition: transform 0.2s ease-in-out;
        &:hover {
            transform: translateY(-10%);
        }
        &:nth-child(1) {
            @apply mr-10;
            svg {
                @apply w-[100px] h-[100px];
                @screen max-lg {
                    @apply w-[60px] h-[60px];
                }
            }
        }

        &:nth-child(2) {
            svg {
                @apply w-[75px] h-[75px];
                @screen max-lg {
                    @apply w-[48px] h-[48px];
                }
            }
        }

        &:deep(svg) {
            path {
                fill: none;
                stroke: white;
                stroke-width: 1;
            }
        }
    }
}
</style>
