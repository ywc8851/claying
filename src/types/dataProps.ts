export interface DataProps {
	video_id: string;
	section: string;
	summary_data: {
		headline_title: string;
		headline_sub_title: string;
		short_summary: string;
	};
	channel_details: {
		channel_id: string;
		channel_name: string;
		channel_subscribers: number;
		channel_video_count: number;
		channel_view_count: number;
		channel_thumbnail: string;
		channel_banner: string;

		section: TemplateSummary[];
	};
	score: number;
	// 주석 위쪽이 24-09-12 version
	template_summary: TemplateSummary[];
	title: string;
	upload_date: string;
	duration: string;
	thumbnail: string;
	channel_id: string;
	detail_category: string;
	views: number;
	likes: number;
	comments: number;
	engagement_score: number;
	composite_score: number;
	channel_name: string;
	channel_thumbnail: string;
	channel_subscribers: number;
	channel_video_count: number;
	channel_view_count: number;
	channel_banner: string;
}

interface TemplateSummary {
	title: string;
	start_time: string;
	detail_contents: string;
	explanation_keyword: string;
	explanation_description: string;
}

export interface DetailDataProps {
	video_id: string;
	title: string;
	section: string;
	upload_date: string;
	duration: string;
	thumbnail: string;
	views: number;
	likes: number;
	comments: number;
	subscribers: number;
	score: number;
	summary_data: SummaryData;
	channel_details: ChannelDetails;
}

interface SummaryData {
	headline_title: string;
	headline_sub_title: string;
	short_summary: string;
	section: Section[];
	views: number;
	likes: number;
	comments: number;
	subscribers: number;
	score: number;
}

interface Section {
	title: string;
	detail_contents: string;
	start_time: string;
	explanation_keyword: string;
	explanation_description: string;
}

interface ChannelDetails {
	channel_id: string;
	channel_name: string;
	channel_subscribers: number;
	channel_video_count: number;
	channel_view_count: number;
	channel_thumbnail: string;
	channel_banner: string;
}
