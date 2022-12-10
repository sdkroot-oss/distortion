import { createSignal, onCleanup, onMount } from "solid-js"

const COLLECTIONS = [
    "Build a Solana + Rust App", "buildspace.so"
]

const sleep = async (ms: number) => {
    await new Promise(r => setTimeout(r, ms));
}

const pageheader = () => {

    const [text, setText] = createSignal("")
    const [cleanup, setCleanup] = createSignal(false)
    const [isDeleting, setDeleting] = createSignal(false)
    const [curIdx, setCurIdx] = createSignal(0)

    let i = 0

    const ticker = async () => {
        while (!cleanup()) {
            const HEADER = COLLECTIONS[curIdx()]

            while (!isDeleting() && i < HEADER.length && HEADER[i] === ' ') i++

            let subString = HEADER.substring(0, i)

            setText(subString)

            i = isDeleting() ? i - 1 : i + 1
            i = i % HEADER.length

            if (i > HEADER.length) {
                setDeleting(true)
                await sleep(700)
            } else if (i === 0) {
                setDeleting(false)
                setCurIdx((curIdx() + 1) % COLLECTIONS.length)
            }

            await sleep(isDeleting() ? 100 : 300)
        }
    }


    onMount(async () => {
        ticker()
    })

    onCleanup(() => {
        setCleanup(true)
    })


    return (
        <div class="shadow-4xl flex h-48 flex-col justify-center items-center mb-8">
            <div class="text-center w-full">
                <p class="text-green-500 text-bold text-6xl md:text-8xl font-serif font-['Output']"><span class="blinking-text">{text()}</span></p>
            </div>
        </div>
    )
}


export default pageheader