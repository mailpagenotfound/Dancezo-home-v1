import {CardsParallax, type iCardItem} from "@/components/ui/scroll-cards";

const cardItems: iCardItem[] = [
	{
		title: "Classical Fusion",
		description: "Strict technical alignment posture, expressiveness, mudras, and historical grace precision.",
		tag: "classical",
		src: "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?q=80&w=1200&auto=format&fit=crop",
		link: "#",
		color: "#121212",
		textColor: "#d4af37",
	},
	{
		title: "Contemporary Flow",
		description: "Fluid floor release techniques, expressive emotional waves, and gravity-defying balances.",
		tag: "contemporary",
		src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1200&auto=format&fit=crop",
		link: "#",
		color: "#181818",
		textColor: "#ffffff",
	},
	{
		title: "Hip Hop & Popping",
		description: "Old-school break foundations, isolation mechanics, complex beat-grooves, and jam style.",
		tag: "hiphop",
		src: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop",
		link: "#",
		color: "#0a0a0a",
		textColor: "#ffffff",
	},
	{
		title: "Freestyle Jam",
		description: "Improvisational stage choreography design, personal style signature, and rhythm creation.",
		tag: "freestyle",
		src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
		link: "#",
		color: "#1c1c1c",
		textColor: "#ffffff",
	},
	{
		title: "Bollywood Fusion",
		description: "High-energy cinematic theatrical coordination, fast-paced choreo, and expressive stage setups.",
		tag: "bollywood",
		src: "https://images.unsplash.com/photo-1535528746647-021179ef05f9?q=80&w=1200&auto=format&fit=crop",
		link: "#",
		color: "#1a1a1a",
		textColor: "#d4af37",
	},
	{
		title: "Jazz & Kids Dance",
		description: "Focuses on basic musicality rhythm introduction, motor confidence games, and elegant lines.",
		tag: "jazz",
		src: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1200&auto=format&fit=crop",
		link: "#",
		color: "#111111",
		textColor: "#ffffff",
	},
];

const DemoOne = () => {
  return (
	<CardsParallax items={cardItems} />
  );
};

export { DemoOne };
