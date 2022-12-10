import { createSignal, For, onCleanup, onMount, Show } from "solid-js"
import NFTCard from "./NFTCard"

const array = [...Array(19)]

const nftGallery = () => {

    const [wallet, setWallet] = createSignal("")
    const connectWallet = () => {
        if (!wallet()) {
            let { solana } = window
            if (solana) {
                solana.connect({})
                    .then((response) => {
                        setWallet(response.publicKey.toString())
                        return
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        }
    }

    const onLoad = async () => {
        let { solana } = window
        if (solana) {

            try {
                const response = await solana.connect({ onlyIfTrusted: true })
                setWallet(response.publicKey.toString())
            } catch (error) {
                console.log(error)
                console.log("phantom wallet extension exists but app is not trusted. login required")

            }
        }
    };

    onMount(() => {
        window.addEventListener('load', onLoad);
    })

    onCleanup(() => {
        window.removeEventListener('load', onLoad);
    })

    return (
        <div>
            <Show
                when={wallet()}
                fallback={<div class="flex"><button class="shadow-4xl text-white bg-gradient-to-r from-purple-800 to-purple-600 hover:to-purple-700 rounded-lg mx-auto my-auto button justify-content align-items px-16 py-2" onClick={connectWallet}>Connect Wallet</button></div>}
            >
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6 6xl:grid-cols-7 7xl:grid-cols-9 in-h-screen min-w-screen gap-8">
                    <For each={array}>{(_, i) =>
                        <NFTCard
                            href={`/nfts/Unknown-${i() + 1}.jpg`}
                            title={`Distortion #${i() + 1}`}
                            price="0.041"
                            time={3600 * 24 * 3}
                            unit="SOL"
                            body="Distortion collection for Buildspace"
                        />
                    }</For>
                </div>
            </Show>
        </div>
    )
}


export default nftGallery