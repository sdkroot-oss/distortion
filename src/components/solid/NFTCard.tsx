import { onMount } from "solid-js";

export interface NFTCardProps {
	title: string;
	time: number;
	price: string;
	unit: string;
	body: string;
	href: string;
}

const nftCard = (props: NFTCardProps) => {

	const timeLeft = (time: number) => {
		const SECOND = 1
		const MINUTE = SECOND * 60
		const HOUR = MINUTE * 60
		const DAY = HOUR * 24

		if (time > DAY) {
			const days = Math.floor(time / DAY)
			return `${days} day${days > 1 ? 's' : ''} left`
		} else if (time > HOUR) {
			const hours = Math.floor(time / HOUR)
			return `${hours} hour${hours > 1 ? 's' : ''} left`		
		} else if (time > MINUTE) {
			const minutes = Math.floor(time / MINUTE)
			return `${minutes} hour${minutes > 1 ? 's' : ''} left`		
		} else {
			const seconds = Math.floor(time / SECOND)
			return `${seconds} second${seconds > 1 ? 's' : ''} left`
		}
	}

	const time = Math.random() * (3600 * 24 * 90) + 1
	const price = (Math.random() / 10).toPrecision(4)

	return (
		<div
			style="background-color: hsl(216, 50%, 16%)"
			class="mx-auto transition ease-in-out delay-15 hover:scale-110 lg:hover:scale-105 xl:hover:scale-110 shadow-sm flex flex-col w-[320px] h-[500px] justify-content align-items rounded-2xl pt-4 px-4 pb-[40px]"
		>
			<img class="h-[288px] w-[288px] rounded-lg" src={props.href} />
			<p
				class="text-white font-semibold pt-6 pb-4 font-['Outfit'] text-[18px]"
			>
				{props.title}
			</p>
			<p
				class="text-gray-400 pb-4 font-normal font-['Outfit'] text-[18px]"
			>
				{props.body}
			</p>
			<div class="flex">
				<div class="flex mr-auto  align-items"><img class="mx-auto my-auto pr-2" src="/icon-ethereum.svg" /><span class="text-teal-400">{price} {props.unit}</span></div>
				<div class="ml-auto text-gray-400">{timeLeft(time)}</div>
			</div>
			<hr style="border-color: hsl(215, 32%, 27%)" />
			<p class="pt-4 font-light text-[0.8rem] text-gray-400">Creation of <a class="text-white hover:cursor-pointer">SDK Root</a></p>
		</div>)
}


export default nftCard