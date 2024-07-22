import AllIcon from "@/assets/all.svg?react";
import ChartIcon from "@/assets/chart.svg?react";
import HouseIcon from "@/assets/house.svg?react";
import CoinIcon from "@/assets/coin.svg?react";
import EconomyIcon from "@/assets/economy.svg?react";
import HealthIcon from "@/assets/health.svg?react";
import ScienceIcon from "@/assets/science.svg?react";
import ItTechIcon from "@/assets/itTech.svg?react";
import CarIcon from "@/assets/car.svg?react";
import DevelopIcon from "@/assets/develop.svg?react";
import CookIcon from "@/assets/cook.svg?react";
import MarriageIcon from "@/assets/marriage.svg?react";
import ManFashionIcon from "@/assets/manFashion.svg?react";
import WomanFashionIcon from "@/assets/womanFashion.svg?react";
import FitnessIcon from "@/assets/fitness.svg?react";
import TripIcon from "@/assets/trip.svg?react";
import AiIcon from "@/assets/ai.svg?react";
import HistoryIcon from "@/assets/history.svg?react";
import BeautyIcon from "@/assets/beauty.svg?react";

export const YOUTUBE_TOPICS = [
	{
		topic: "전체",
		icon: <AllIcon />,
	},
	{
		topic: "주식",
		icon: <ChartIcon />,
	},
	{
		topic: "부동산",
		icon: <HouseIcon />,
	},
	{
		topic: "가상자산",
		icon: <CoinIcon />,
	},
	{
		topic: "경제",
		icon: <EconomyIcon />,
	},
	{
		topic: "건강",
		icon: <HealthIcon />,
	},
	{
		topic: "정치",
		icon: <EconomyIcon />,
	},
	{
		topic: "과학",
		icon: <ScienceIcon />,
	},
	{
		topic: "IT/테크",
		icon: <ItTechIcon />,
	},
	{
		topic: "자동차",
		icon: <CarIcon />,
	},
	{
		topic: "자기계발",
		icon: <DevelopIcon />,
	},
	{
		topic: "요리",
		icon: <CookIcon />,
	},
	{
		topic: "연애/결혼",
		icon: <MarriageIcon />,
	},
	{
		topic: "남자 패션",
		icon: <ManFashionIcon />,
	},
	{
		topic: "여자 패션",
		icon: <WomanFashionIcon />,
	},
	{
		topic: "피트니스",
		icon: <FitnessIcon />,
	},
	{
		topic: "여행",
		icon: <TripIcon />,
	},
	{
		topic: "인공지능",
		icon: <AiIcon />,
	},
	{
		topic: "역사",
		icon: <HistoryIcon />,
	},
	{
		topic: "뷰티/메이크업",
		icon: <BeautyIcon />,
	},
];

export const TOPIC_TAGS = YOUTUBE_TOPICS.filter(({ topic }) => topic !== "전체").map(({ topic }) => topic);
